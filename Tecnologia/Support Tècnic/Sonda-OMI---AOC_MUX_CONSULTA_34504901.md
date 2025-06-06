Suport Tècnic : Sonda OMI - AOC\_MUX\_CONSULTA  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [03 - Monitorització - Revisions globals](26313327.md)
4.  [Monitors OMI (CTTI)](26313608.md)
5.  [Sondes OMI - Old](Sondes-OMI---Old_41519617.md)

Suport Tècnic : Sonda OMI - AOC\_MUX\_CONSULTA
==============================================

Created by Unknown User (otecagonzalez), last modified by Unknown User (otecobernal) on 27 October 2021

SERVEI 24X7

COMUNIQUEM

D'aquest servei depen moltes aplicacions que integren el registre del MUX. Si detectem que esta fallant el MUX haurem de comunicar en la web de l'AOC!

Ens afectats:

eNotum  
EACAT  
eFact  
Valisa  
eLICITA  
PSCP  
eTram

A l'hora de marcar els serveis del comunicat, marcar també INTEGRACIÓ.

Circuit que fa la sonda

### Revisar dades del soapUi

Hem de revisar que les dades que utilitza el soapUi retorni els valors esperats.

### Pas 0: Configuració del Test SoapUI

Importar el projecte SoapUI:

[![](download/resources/com.atlassian.confluence.plugins.confluence-view-file-macro:view-file-macro-resources/images/placeholder-medium-zip.png)MUX-OMI.zip](/download/attachments/34504901/MUX-OMI.zip?version=1&modificationDate=1635323208159&api=v2)

### Pas 1: Executar SoapUI i esperar OK:

Executar el TestCase MUX\_CONSULTA:

![](attachments/34504901/64979022.png)

Màquines a revisar en cas de caiguda

### Màquines MUX

El MUX està desplegat al BEA8 i al WL12 podem fer una **revisió de l'estat del BEA8 IOP**:

**[PCI2 - APP - BEA8 - Revisió](41520849.md)**
----------------------------------------------

**[PCI2 - BEA - BEA8 - Reinici](PCI2---BEA---BEA8---Reinici_41520848.md)**
--------------------------------------------------------------------------

  
Logs:

Màquines BEA8 (PCI2) (10.120.1.20 - 10.120.1.21)

cd /apps/aoc/IOP/logs
ls -lhart \*MUX\*

### Revisió MTI PCI3

Tot hi que el MUX vagi per PCI2 la traçabilitat va per la MTI i aquesta esta desplegada en el WL12.

Caldrà revisar els nodes del WL12 i que les peticions de la MTI estiguin finalitzant correctament.

**Si detectem que els error es produeixen en aquesta part de les operacions, caldrà reinciar el WL12 IOP**

Procediment

**Revisió modalitat - Consulta**

Hem de revisar que la modalitat estigui donant servei correctament.

Per fer-ho caldrà:

1- Realitzar una petició de MUX\_CONSULTA:

a) Consultem assentament per un ens concret i filtrant per dates:

Creem un altre "testCase" i executem el XML següent: [MUX\_CONSULTA\_PER\_DATES.xml](attachments/34504895/34504908.xml)

_En aquest xml podem escollir les dates, com més properes a avui més ràpida anirà la consulta._

_![](https://intranet.aoc.cat/plugins/servlet/confluence/placeholder/unknown-attachment?locale=es_ES&version=2)  
_

b) Si la en la resposta veiem que es retornen assentaments  o bé que es retorna un OK, és que el MUX\_CONSULTA funciona correctament. (**Si el test que fa la OMI falla i aquesta no, ÉS LA SONDA**):

**Resposta bona**

 <ns3:DatosEspecificos>
      <res:RespostaRegistre xmlns:res="http://net.aocat/MUX2/RespostaRegistre" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
               <res:Resultat codi="OK"/>
               <res:ConsultaAssentaments/>
      </res:RespostaRegistre>
 </ns3:DatosEspecificos>

### CASOS D'ERROR

Si durant la revisió veiem que no es reprodueix el resultat esperat i detectem que els **erros són deguts a l'aplicació del MUX, haurem de revisar logs i provar de reiniciar els BEA.**

  

**PROCEDIMENT:**

**[Revisió MUX](41518245.md)**
------------------------------

Feedback

ERROR intermitents per temps alts a les peticions en la MTI

#### [ST-8332](https://contacte.aoc.cat/browse/ST-8332?src=confmacro) - Data cannot be retrieved due to an unexpected error.

#### El cap de setmana del 29 feb 2020  vam detectar que la sonda del MUX queia de manera intermitent.

#### Realment després de realitzar les revisions vam interpretar que l'origen de l'error no venia de l'aplicació del MUX perquè les peticions en el MUX no fallaven i vèiem que el servei queia i es recuperava amb normalitat amb pocs minuts de diferència.

### Es va revisar:

#### 1- Circuit de la sonda

#### 2- Logs

#### 3- BEA8 (node i frontals)

#### 4- Altres revisions

#### **I no vam detectar el focus de l'error.**

#### **Com a mínim vam obrir un comunicat per informar que podien haver possibles errors intermitents en l'aplicació del MUX.**

### Detecció de l'error:

Al veure que l'error no provenia del MUX vam sospitar que fos algun problema de BBDD o de les operacions en les peticions que es realitzen en la PCI.

Seguidament vam detectar que les peticions de la MTI (IOP) estaven registrant temps molt alts (30 a 100 segons aprox.).

  

  

### Resolució:

Finalment ST va veure en el correu de les purges de la BBDD PCIIOP estava "reindexant en bucle".

Ho van veure perquè cada 10 minuts aproximadament estavem rebent un correu que ho notificava i **aquest correu només s'hauria d'haver enviar 1 cop el cap de setmana.**

  

Assumpte corrreu: INFO - PCI30IOP PRO - Starting tasks of rebuild and check indexes -

![](https://intranet.aoc.cat/plugins/servlet/confluence/placeholder/unknown-attachment?locale=es_ES&version=2)

  

[SIS-2900](https://contacte.aoc.cat/browse/SIS-2900?src=confmacro) - Data cannot be retrieved due to an unexpected error.

Posteriorment es van posar en contacte amb el Departament de sistemes de l'AOC i ells ho van solucionar, ja que són ells qui realitzen les gestions de les purgues en la BDD

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2020-2-6\_12-8-21.png](attachments/34504901/34504902.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-6\_12-11-40.png](attachments/34504901/34504903.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-6\_12-34-54.png](attachments/34504901/34504911.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-6\_12-34-8.png](attachments/34504901/34504912.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-6\_12-45-33.png](attachments/34504901/34504913.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-6\_12-43-46.png](attachments/34504901/34504914.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-4\_14-38-26.png](attachments/34504901/36339804.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-1-18\_13-11-23.png](attachments/34504901/41520376.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-1-18\_13-11-46.png](attachments/34504901/41520377.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-1-18\_13-12-57.png](attachments/34504901/41520379.png) (image/png)  
![](images/icons/bullet_blue.gif) [MUX-OMI.zip](attachments/34504901/64979021.zip) (application/zip)  
![](images/icons/bullet_blue.gif) [image2021-10-27\_10-28-23.png](attachments/34504901/64979022.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:07

[Atlassian](http://www.atlassian.com/)