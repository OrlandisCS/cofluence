Projectes : Com eliminar un PKCS12 de signatura  

1.  [Projectes](index.md)
2.  [PSA](PSA_24216342.md)
3.  [PSA - WIKI](PSA---WIKI_24216306.md)
4.  [SQL](SQL_24216319.md)

Projectes : Com eliminar un PKCS12 de signatura
===============================================

Created by Áurea Alcaide, last modified on 29 julio 2019

Hi ha 2 maneres de fer-ho:

A) Canviar el número de sèrie del certificat a la taula CERTIFICATE\_T.

B) Eliminar-lo (opció més neta):

Per eliminar-lo executarem el procedure DELETE\_PKCS12, que té com a paràmetres:  
SERIAL\_NUMBER IN VARCHAR2 --> Número de sèrie del certificat en decimal.  
APPLICATION\_ID IN NUMBER --> Identificador de l'aplicació que té autorització sobre la clau.

Procedure:

**DELETE\_PKCS12**

create or replace 
PROCEDURE DELETE\_PKCS12 (SERIAL\_NUMBER IN VARCHAR2, APPLICATION\_ID IN NUMBER) AS
cert\_id number;
role\_id number;
app\_cert\_id number;
auth\_id number;
cert\_store\_id number;
key\_id number;
cert\_fields\_id number;
status\_cert\_tmp\_id number;
CURSOR signature\_acts (certificate\_role\_id in number) IS
 SELECT act.id
 FROM act\_t act
 where act.certificateroleid = certificate\_role\_id
 ORDER BY act.id ASC;
CURSOR signatures (act\_id in number) IS
 SELECT sign.id
 FROM signature\_t sign
 where sign.actid = act\_id
 ORDER BY sign.id ASC;
BEGIN
dbms\_output.put\_line('SERIAL\_NUMBER = ' || SERIAL\_NUMBER);
  dbms\_output.put\_line('APPLICATION\_ID = ' || APPLICATION\_ID);
-- cert id and certificate store id
  select c.id, c.certificatestoreid, c.certificatefieldsid into cert\_id, cert\_store\_id, cert\_fields\_id
    from certificate\_t c
    where lower(c.serialnumber) like lower(SERIAL\_NUMBER);
  dbms\_output.put\_line('CERT\_ID = ' || cert\_id);
  dbms\_output.put\_line('CERT\_STORE\_ID = ' || cert\_store\_id);
  dbms\_output.put\_line('CERT\_FIELDS\_ID = ' || cert\_fields\_id);
-- certificate role id
  select r.id into role\_id 
    from certificaterole\_t r
    where r.certificateid = cert\_id
      and r.roleid = 4; -- signer
  dbms\_output.put\_line('CERT\_ROLE\_ID = ' || role\_id);
-- delete signatures and signature acts
  FOR signature\_act IN signature\_acts(role\_id) LOOP
    dbms\_output.put\_line('ACT\_ID = ' || signature\_act.id);
    FOR signature IN signatures(signature\_act.id) LOOP
      DELETE FROM signature\_t WHERE id=signature.id;
      dbms\_output.put\_line('signature deleted -> SIGNATURE\_ID = ' || signature.id);
    END LOOP;
    DELETE FROM act\_t WHERE id=signature\_act.id;
    dbms\_output.put\_line('signature act deleted -> ACT\_ID = ' || signature\_act.id);
  END LOOP;
-- app cert id
  BEGIN
    select appcert.id into app\_cert\_id 
      from applicationcertificate\_t appcert
      where appcert.applicationid = APPLICATION\_ID
      and appcert.certificateid = cert\_id;
    dbms\_output.put\_line('APP\_CERT\_ID = ' || app\_cert\_id);
  EXCEPTION
    WHEN NO\_DATA\_FOUND THEN 
      dbms\_output.put\_line('No Data found for SELECT on APPLICATIONCERTIFICATE\_T');
  END;
IF(app\_cert\_id is not null) THEN
    -- auth id
    BEGIN
      select auth.id into auth\_id 
        from authorization\_t auth 
        where auth.applicationcertificateid = app\_cert\_id;
      dbms\_output.put\_line('AUTH\_ID = ' || auth\_id);
    EXCEPTION
      WHEN NO\_DATA\_FOUND THEN 
        dbms\_output.put\_line('No Data found for SELECT on AUTHORIZATION\_T --> AUTH\_ID = ' || auth\_id);
    END;
    -- delete authorization
    IF(auth\_id is not null) THEN      
      delete from authorization\_t auth where auth.id = auth\_id;
      dbms\_output.put\_line('authorization deleted --> AUTH\_ID = ' || auth\_id);
    END IF;
    -- delete cert from application
    delete from applicationcertificate\_t where id = app\_cert\_id;
    dbms\_output.put\_line('application certificate deleted -> APP\_CERT\_ID = ' || app\_cert\_id); 
  END IF;
-- key id
  select cs.keyid into key\_id
    from certificatestore\_t cs
    where cs.id = cert\_store\_id;
  dbms\_output.put\_line('KEY\_ID = ' || key\_id);
  -- update certificatestore\_t with keyid=null
  update certificatestore\_t cs set cs.keyid = null 
    where cs.keyid = key\_id 
    and cs.id = cert\_store\_id;
  -- delete key
  delete from key\_t k where k.id = key\_id;
  dbms\_output.put\_line('key deleted -> KEY\_ID = ' || key\_id);
-- update certificate\_t with certificatestoreid=null
  update certificate\_t c set c.certificatestoreid=null
    where c.id = cert\_id;
  -- delete certificate store
  delete from certificatestore\_t cs 
    where cs.id = cert\_store\_id;
  dbms\_output.put\_line('certificate store deleted -> CERT\_STORE\_ID = ' || cert\_store\_id);
IF cert\_fields\_id IS NOT NULL THEN
    -- update certificate\_t with certificatefieldsid=null
    update certificate\_t c set c.certificatefieldsid = null
      where c.id = cert\_id;
    -- delete certificate fields
    delete from certificatefields\_t cf 
      where cf.id = cert\_fields\_id
      and cf.serialnumber = SERIAL\_NUMBER;
    dbms\_output.put\_line('certificate fields deleted -> CERT\_FIELDS\_ID = ' || cert\_fields\_id);
  END IF;
delete from certificaterole\_t r where r.id = role\_id;
  dbms\_output.put\_line('certificate role deleted -> CERT\_ROLE\_ID = ' || role\_id);
-- delete cert status tmp
  BEGIN
  select s.id into status\_cert\_tmp\_id 
    from status\_cert\_tmp\_t s 
    where s.certificateid = cert\_id;
  delete from status\_cert\_tmp\_t s where s.certificateid = cert\_id;
  dbms\_output.put\_line('certificate status tmp deleted -> CERT\_ID = ' || cert\_id); 
  EXCEPTION
   WHEN NO\_DATA\_FOUND THEN 
        dbms\_output.put\_line('No Data found for SELECT on STATUS\_CERT\_TMP\_T -> CERT\_ID = ' || cert\_id);
  END;
-- delete certificate
  delete from certificate\_t c where c.id = cert\_id;
  dbms\_output.put\_line('certificate deleted -> CERT\_ID = ' || cert\_id);
EXCEPTION
 WHEN OTHERS THEN
 DBMS\_OUTPUT.PUT\_LINE (SQLCODE || ' ' || SQLERRM);
 ROLLBACK;
END DELETE\_PKCS12;

Document generated by Confluence on 07 junio 2025 00:00

[Atlassian](http://www.atlassian.com/)