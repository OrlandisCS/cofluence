Suport Tècnic : Errors DCOC  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [01 - Gestió Operativa](26313391.md)
4.  [Tasques complementàries](26313409.md)

Suport Tècnic : Errors DCOC
===========================

Created by Unknown User (cmoralea), last modified by Unknown User (otecagonzalez) on 06 April 2020

Els objectius del document són poder explicar la tasca a realitzar quan l’Ajuntament de BCN ens envia Mail amb els errors del DCOC els Dimarts i els Divendres.

L'ajuntament de Barcelona envia una sèrie de peticions realitzades a diferents col·legis que han finalitzat amb errors o no han finalitzat. Haurem de realitzar una anàlisi d'aquestes peticions i informar els col·legis quan sigui necessari.

1- Entrada per tiquet Footprints
--------------------------------

Aquesta tasca la rebem via tiquet Footprints

En aquest tiquet poden haver-hi fins a 2 Excels adjunts: 

  

Peticions pendents de descarregar

Les peticions pendents de descarregar, són peticions que ha llançat l'ajuntament de Barcelona i en els seus sistemes encara els detecten com a pendents de descarregar, o bé han fallat durant la descarrega.

  

### Anàlisi de les peticions

Per realitzar l'anàlisi utilitzarem la següent eina: [VO - DCOC - ALTRES - DCOC Toolsv2 (Eina funional)](36340597.md), executant el JAR

Podreu revisar el funcionament de l'eina en la següent documentació: [VO - DCOC - ALTRES - DCOC Toolsv2 (Eina funional)](36340597.md) - Manual d'usuari.

  

a) Un cop tenim l'eina preparada per realitzar l'anàlisi, haurem de revisar l'Excel "Peticions pendents de descàrrega".

b) Les **peticions** que ja estan **finalitzades correctament** no caldrà que fem res.

c) Les **peticions** que estiguin **pendent de descàrrega**, les podríem reiniciar un cop i ens assegurem que no estan enganxades en el procés de descàrrega.

d) Les **peticions** que estiguin **Finalitzades** **amb error**, les reiniciarem.

  

El **procés de reinici pot durar varis minuts** depenent del número de peticions a reiniciar, **recomanem que es realitzi el reinici i en esperem una estona fins tornar a revisar el resultat** d'aquestes peticions per tal de tenir novament el nou estat d'aquestes.

### Reportar error al col·legi

Posteriorment de reinicar, i hem obtingut el nou estat haurem d'identificar les peticions que han quedat en error. **Aquestes que tornen a quedar en estat d'error i mai es reinicien, les haurà de revisar el col·legi**.

*   Per fer-ho podem anar a:  
    [Contactes tècnics](28704779.md) i aqui trobarem els contactes de cada col·legi.

*   També haurem de posar en CC a:  
    AM Obres <[AM.Obres@everis.com](mailto:AM.Obres@everis.com)\>; CARNE VILA, ANNA MARIA <acarnev@bcn.cat>

*   Enviarem un correu al col·legi que tingui la petició/ns en error.
*   El correu l'enviarem amb el compte de [OTSuportTecnic@aoc.cat](mailto:OTSuportTecnic@aoc.cat)
    *   En aquest compte podem localitzar unes subcarpetes on hi ha el fil amb les comunicacions amb cada col·legi:  
        ![](attachments/26313477/36340564.png)  
        _Enviarem el correu en el fil "**RE: AOC\_SUPORT: Error en peticions DCOC - COEIC**"_  
          
        

Exemple de correu:

Bon dia,

Les següents peticions ens retornen l’error: **El temps de permanència de la petició asíncrona s'ha exhaurit**

NUM\_EXPEDIENT

DATA\_ALTA

NUM\_REFERENCIA

ID\_PETICIO

CODI\_ECA

ESTAT

03-2017CI64145

11/12/2017

ENS-2017-B-536171-P

DCOC\_BCN\_567234

COEIC

Finalitzat amb errors

05-2017CI64163

11/12/2017

ENS-2017-B-536287-P

DCOC\_BCN\_567258

COEIC

Finalitzat amb errors

09-2017CI64160

11/12/2017

ENS-2017-B-536059-P

DCOC\_BCN\_567256

COEIC

Finalitzat amb errors

05-2017CI64156

11/12/2017

ENS-2017-B-536285-P

DCOC\_BCN\_567251

COEIC

Finalitzat amb errors

  
Si us plau, ho podríeu revisar?

Salutacions

.rwui\_text\_box.rwui\_id\_7715a0df-0f22-41f1-b590-f454e6a8d5ff {background-color: #F2F2F2; color: #666666;}.rwui\_text\_box.rwui\_id\_7715a0df-0f22-41f1-b590-f454e6a8d5ff \*:not(.rwui\_content) {color: #666666;}.rwui\_text\_box.rwui\_id\_7715a0df-0f22-41f1-b590-f454e6a8d5ff span.rwui\_icon {color: #666666;}

  

Crear el report

Un cop tinguem les peticions analitzades crearem el report que posteriorment enviarem a l'Ajuntament de Barcelona. El report el podrem generar des de la mateixa eina.

L'eina generarà el report amb tota la informació que necessitem, menys els comentaris de les accions realitzades. Aquest pas el podrem fer de dues maneres:

  

1.  Crear el report amb l'eina i desar-lo en un directori reconegut.  
    Posteriorment obrim el fitxer i modificaríem els _camps necessaris_ de la columna "Comentaris".  
    ![](attachments/26313477/36340587.png)  
      
    
2.  Modificar els camps necessaris de la columna "Comentaris" en la mateixa eina, al crear el report s'obtenen aquestes modificacions.

![](attachments/26313477/36340588.png)

  

Els **_camps necessaris_** a modificar són aquells que hem tingut de fer alguna acció amb la petició per exemple:

*   Si reportem al col·legi l'error, posarem: **Reportat al col·legi**
*   Si necessitem detallar alguna informació especifica per la petició ho podrem posar en aquest camp,

  

  

Peticions a revisar

Aquesta revisió és possible que no la tinguem de fer, si no ens passen casos.

Exemple Excel:

![](attachments/26313477/36340591.png)

  

Les **peticions** que ens reporta l'ajuntament de BCN **pendents a revisar** són peticions de la **modalitat de consulta que han finalitzat malament.**

En aquest Excel ens adjunten menys informació. Pel moment no ens estan passant l'ID de petició de la PCI, per tant es molt difícil detectar l'error.

  

Així que directament ens posarem en contacte amb el col·legi:

*   Per fer-ho podem anar a:  
    [Contactes tècnics](28704779.md) i aqui trobarem els contactes de cada col·legi.

*   També haurem de posar en CC a:  
    AM Obres <[AM.Obres@everis.com](mailto:AM.Obres@everis.com)\>; CARNE VILA, ANNA MARIA <acarnev@bcn.cat>

*   Enviarem un correu al col·legi que tingui la petició/ns en error.
*   El correu l'enviarem amb el compte de [OTSuportTecnic@aoc.cat](mailto:OTSuportTecnic@aoc.cat)
    *   En aquest compte podem localitzar unes subcarpetes on hi ha el fil amb les comunicacions amb cada col·legi:  
        ![](attachments/26313477/36340590.png)  
        _Enviarem el correu en el fil "**RE: AOC\_Suport: Error en peticions a revisar DCOC - XXXXXNom del col·legi**"_

_Exemple correu:_

Bon dia,

Les següents peticions de consulta no finalitzen correctament:

ECA

NUM\_EXPEDIENT

DATA\_ALTA

NUM\_REFERENCIA

CODI\_ECA

03-2017CI64145

11/12/2017

ATI-2020-2020000003P

ECA\_ATI

05-2017CI64163

11/12/2017

ATI-2020-2020004303P

ECA\_ATI

  
Si us plau, ho podríeu revisar?

Salutacions

.rwui\_text\_box.rwui\_id\_af33159e-cdfe-4860-91c7-b52297675c74 {background-color: #F2F2F2; color: #666666;}.rwui\_text\_box.rwui\_id\_af33159e-cdfe-4860-91c7-b52297675c74 \*:not(.rwui\_content) {color: #666666;}.rwui\_text\_box.rwui\_id\_af33159e-cdfe-4860-91c7-b52297675c74 span.rwui\_icon {color: #666666;}

2- Resposta a l'ajuntament de Barcelona
---------------------------------------

Resposta Footprints

Un cop finalitzada la revisió i ens haguem posat en contacte amb els col·legis necessaris perquè puguin revisar les peticions amb error, podrem respondre el footprints i adjuntar els dos reports Excels.

  

Missatge tipus:

Bon dia,

Us adjuntem les accions realitzades.

Salutacions,

3- Registrar tasca. 
--------------------

Registrar tiquet mensual

Per acabar imputarem les hores realitzades en el tiquet del JIRA mensual: _Extra-tiquet - Revisió d'errors DCOC AJ BCN - XX/2020 - Resolució_

  

---

4- Altres revisions
-------------------

Revisió manual (sense eina funcional)

En cas que requereixi analitzar alguna petició manualment podem utilitzar a següent informació:

1.  1.  Web admin: [http://10.120.4.57/pci3-mti-admin/peticions/mti](http://10.120.4.57/pci3-mti-admin/peticions/mti)
    2.  Procés per reiniciar les peticions per SQL:
        

\-- Reiniciar a la base de dades del DCOC
DELETE FROM DCOC.AOC\_DCOC\_PROJECTE WHERE ID\_PROJECTE in ('AUC-2018-004387P');
DELETE FROM DCOC.AOC\_DCOC\_PETICIO WHERE ID\_PETICIO in ('DCOC\_BCN\_807417');
DELETE FROM DCOC.AOC\_DCOC\_RESPOSTA WHERE ID\_PETICIO in ('DCOC\_BCN\_807417');
DELETE FROM DCOC.AOC\_DCOC\_EV\_PETICIO WHERE ID\_PETICIO in ('DCOC\_BCN\_807417');
DELETE FROM DCOC.AOC\_DCOC\_EV\_RESPOSTA WHERE ID\_PETICIO in ('DCOC\_BCN\_807417');
DELETE FROM DCOC.AOC\_DCOC\_EV\_CALLBACK WHERE ID\_PROJECTE in ('AUC-2018-004387P');
 
 -- Reiniciar a la PCI30
UPDATE PCI30IOP.PCI\_MTI\_SOLICITUD
   SET ESTAT = 0
 WHERE ID\_PETICIO in
       (SELECT ID
          FROM PCI30IOP.PCI\_MTI\_PETICIO
         WHERE ID\_PETICIO in ('DCOC\_BCN\_807417'));
		 
UPDATE PCI30IOP.PCI\_MTI\_PETICIO
   SET ESTAT = 2
 WHERE ID\_PETICIO in ('DCOC\_BCN\_807417');

 DELETE FROM PCI30IOP.PCI\_MTI\_XML
 WHERE TIPUS IN (4, 5)
   AND ID\_PETICIO IN
       (SELECT ID
          FROM PCI30IOP.PCI\_MTI\_PETICIO
         WHERE ID\_PETICIO in ('DCOC\_BCN\_807417'));
		 
INSERT INTO PCI30IOP.PCI\_MTI\_LOG
  (ID, DATA, ID\_PETICIO, ID\_SOLICITUD, TIPUS, MSG)
VALUES
  (SEQ\_PCI\_MTI\_ID.NEXTVAL,
   SYSDATE,
   (SELECT ID
      FROM PCI30IOP.PCI\_MTI\_PETICIO
     WHERE ID\_PETICIO = 'DCOC\_BCN\_807417'),
   (SELECT ID
      FROM PCI30IOP.PCI\_MTI\_SOLICITUD
     WHERE ID\_PETICIO in
           (SELECT ID
              FROM PCI30IOP.PCI\_MTI\_PETICIO
             WHERE ID\_PETICIO = 'DCOC\_BCN\_807417')),
   0,
   'Sol- licitud reiniciada correctament');

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2017-11-21\_15-45-14.png](attachments/26313477/26315115.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-11-21\_15-51-16.png](attachments/26313477/26315123.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-11-21\_15-55-20.png](attachments/26313477/26315140.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-11-21\_15-57-1.png](attachments/26313477/26315137.png) (image/png)  
![](images/icons/bullet_blue.gif) [2017\_11\_21\_15\_56\_19\_ST\_34\_Ajuntament\_BCN\_Peticions\_pendents\_descàrrega\_de\_documentació\_Contacte\_.png](attachments/26313477/26315138.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-11-21\_15-58-29.png](attachments/26313477/26315136.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-11-21\_15-59-55.png](attachments/26313477/26315133.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-11-21\_16-0-30.png](attachments/26313477/26315134.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-11-21\_16-1-44.png](attachments/26313477/26315148.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-11-21\_16-11-42.png](attachments/26313477/26314917.png) (image/png)  
![](images/icons/bullet_blue.gif) [2017\_11\_21\_16\_10\_23\_ORAPRO\_LECTURA\_CAT\_PL\_SQL\_Developer\_select\_from\_AOC\_DCOC\_RES\_....png](attachments/26313477/26314919.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-11-21\_16-17-4.png](attachments/26313477/26314927.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-11-21\_16-20-42.png](attachments/26313477/26314936.png) (image/png)  
![](images/icons/bullet_blue.gif) [2017\_11\_21\_16\_21\_01\_Administració\_PCI\_2.0\_MTI.png](attachments/26313477/26314934.png) (image/png)  
![](images/icons/bullet_blue.gif) [2017\_11\_21\_16\_21\_01\_Administració\_PCI\_2.0\_MTI.png](attachments/26313477/26314931.png) (image/png)  
![](images/icons/bullet_blue.gif) [2017\_11\_21\_16\_38\_36\_DCOC.xls\_Modo\_de\_compatibilidad\_Excel.png](attachments/26313477/26314960.png) (image/png)  
![](images/icons/bullet_blue.gif) [2017\_11\_21\_16\_42\_19\_DCOC.xls\_Modo\_de\_compatibilidad\_Excel.png](attachments/26313477/26314965.png) (image/png)  
![](images/icons/bullet_blue.gif) [mail final.png](attachments/26313477/26315568.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_10-34-21.png](attachments/26313477/26317663.png) (image/png)  
![](images/icons/bullet_blue.gif) [reiniciarPeticionsDCOC.zip](attachments/26313477/26315079.zip) (application/zip)  
![](images/icons/bullet_blue.gif) [image2018-8-6\_12-11-27.png](attachments/26313477/26315076.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-8-6\_12-20-1.png](attachments/26313477/26315101.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-8-6\_12-38-0.png](attachments/26313477/26315128.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-8-6\_12-39-40.png](attachments/26313477/26315121.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-3\_15-7-35.png](attachments/26313477/36340564.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-6\_13-24-28.png](attachments/26313477/36340587.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-6\_13-26-2.png](attachments/26313477/36340588.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-6\_13-34-19.png](attachments/26313477/36340590.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-6\_13-36-29.png](attachments/26313477/36340591.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:47

[Atlassian](http://www.atlassian.com/)