Suport Tècnic : Monitor S.T. - EACAT - Adhesions per carregar  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [03 - Monitorització - Revisions globals](26313327.html)
4.  [Monitors S.T.](Monitors-S.T._41522177.html)
5.  [Monitor S.T. - OLD](Monitor-S.T.---OLD_118555256.html)

Suport Tècnic : Monitor S.T. - EACAT - Adhesions per carregar
=============================================================

Created by Unknown User (otecobernal), last modified on 26 November 2021

Què mesura aquest monitor?

Adhesions pendents de carregar per l'EACAT.

  

**Consulta**
============

* * *

USE Footprints

select COUNT(m.mrID) "Adhesions per carregar"
from master5 m
inner join MASTER5\_FIELDHISTORY mf on (m.mrID = mf.mrid)
where mf.mrNEWFIELDVALUE = 'Operacions'
and m.mrTITLE like '%Adhesi%'
and m.mrSTATUS in ('Operacions')

**Procediment**
===============

* * *

Tasca setmanal de realització de les Adhesions

Accions a realitzar:
--------------------

_**Resum:**_

1.  Revisar si les adhesions que tenim en Zendesk informen el INE10 de la entitat
2.  Habilitar espai al DESA'l (en producció i preproducció). **\*\*****IMPORTANT\*\*** **(Passar INE10 a Toni Llebaria que fa la tasca)**
3.  Habilitar per enviar i rebre tramesa genèrica.
4.  Configuració MUX3. Habitualment fa aquesta part Toni Llebaria.

_**Accions a realitzar:**_

**1 → REVISIÓ DE TICKETS ZENDESK**
----------------------------------

Els tickets d'adhesions els trobarem a **Zendesk**, aquí teniu una captura d'exemple d'adhesions ja realitzades, _totes tindran el format de **Adhesió EACAT** - **NOM** **ENS** - **CODI**_:

![](attachments/26313473/93356131.png)

Un cop els tinguem identificats, haurem de revisar si ens han informat el INE10 de l'entitat i en cas contrari, demanar-lo, exemple:

![](attachments/26313473/93356192.png)

  
2. **HABILITAR ESPAI DESA'L (en PRODUCCIÓ)** 
------------------------------------------------

**\*\*IMPORTANT\*\***
---------------------

**Aquesta tasca la realitza Toni Llebaria (facilitar INE10 Entitat, fins a una nova ordre)**

**De totes maneres, el procés està documentat a la FAQ:   [DESA'L - Comprovar i donar d'alta una entitat.](https://confluence.aoc.cat/pages/viewpage.action?pageId=77824069)**

Què fer en el cas que no ens proporcionin el DIR3 en el tiquet de l'adhesió.

Que fer en cas no ens proporcionin el DIR3 en l'adhesió

Els donarem d'alta amb dir3=L99999999

Exemple:

![](attachments/26313473/81855710.png)

NOTA: _Es poden afegir més d'una entitat de cop, només cal fer-ho separant per comes._

![](attachments/26313473/81855711.png)

3.→ **HABILITAR PER ENVIAR I REBRE TRAMESA GÈNERICA**:
------------------------------------------------------

1.  Configurem a la BBDD d'OVER2 (PRO) els ens que hem configurat al DESA'l (**el 0 a l'esquerre no s'esborren!**)  
    
    Per fer-ho, llençarem un procedure que ja tenim emmagatzemat a la BBDD. Aquest procedure es diu 'altatgen'.  
    Només hem de substituir el INE10 de la query que indico a continuació pel de l'ens que estiguem tractant.
    
    \---PARA PL/SQL DEVELOPER--- 
    begin
    altatgen('0813635010'); --INE10 d'exemple !!!
    end;
    
2.  Afegir les entitats al MUX amb les dades que podem trobar en el tiquet obert de l'adhesió o buscant a la BBDD:

Podem obtenir les dades de les entitats amb la següent query: 

select UEN\_CODI\_10,
       UEN\_CIF,
       UEN\_NOM\_COMPLERT,
       UEN\_NOM\_CURT,
       UEN\_CODI\_5,
       UEN\_CODI\_POSTAL,
       UEN\_CODI\_MUNICIPI
  from usu\_ens
 where UEN\_CODI\_10 in ('7971100053',
                       '7971100052',
                       '7971100051',
                       '7971100049'); 

  

  

**4 → CONFIGURACIÓ MUX3**
-------------------------

Normalment ho fa Toni Llebaria, però si calgués fer-ho....

També afegirem l'ens a **MUX3-PRO** ([http://pro-nlb-mux-ea8434eeccd99c5c.elb.eu-west-1.amazonaws.com:8090/admin/auditoria](http://pro-nlb-mux-ea8434eeccd99c5c.elb.eu-west-1.amazonaws.com:8090/admin/auditoria)), per fer-ho, farem click en el +:  
  
Per **MUX3-PRE** podem anar a l'enllaç: [http://pre-nlb-mux-67743e6fd731f32f.elb.eu-west-1.amazonaws.com:8090/admin/auditoria](http://pre-nlb-mux-67743e6fd731f32f.elb.eu-west-1.amazonaws.com:8090/admin/auditoria)

  

![](attachments/26313473/93356129.png)

  

Que ens obrirà el següent deplegable, que haurem d'omplir:

![](attachments/26313473/93356130.png)

  

  

  

  

Una vegada realitzades les accions, tanquem els tiquets (EACAT\_TRAMITS) amb el missatge tipus **(no el posem public, si no com a comentari intern):**

_Finalitzades les tasques de l'adhesió:_

_\- Configurada la tramesa genèrica._

 _Tanquem la petició._

 _Salutacions,_

Related articles
----------------

  

Related issues

_ZD : **74958**_

  

  

set serveroutput on

begin

altatgen('0813635010');

altatgen('0820095037');

altatgen('0808985013');

end;

  

  

**Informació addicional**
=========================

  

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [cds.gif](attachments/64979243/64979244.gif) (image/gif)  

Document generated by Confluence on 02 June 2025 11:09

[Atlassian](http://www.atlassian.com/)