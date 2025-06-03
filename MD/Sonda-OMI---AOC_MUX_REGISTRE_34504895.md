Suport Tècnic : Sonda OMI - AOC\_MUX\_REGISTRE  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [03 - Monitorització - Revisions globals](26313327.html)
4.  [Monitors OMI (CTTI)](26313608.html)
5.  [Sondes OMI - Old](Sondes-OMI---Old_41519617.html)

Suport Tècnic : Sonda OMI - AOC\_MUX\_REGISTRE
==============================================

Created by Unknown User (otecagonzalez), last modified by Unknown User (jxnieto) on 07 January 2022

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

![](plugins/servlet/confluence/placeholder/unknown-attachment)

### Pas 1: Executar SoapUI i esperar OK:

Executar el TestCase MUX\_REGISTRE:

![](attachments/34504895/64979023.png)

### Revisar que rebem un Codi -1:

**Resposta bona**

<ns3:DatosEspecificos>
                     <res:RespostaRegistre idTransaccio="16373bf-17714c75e93-320d" xmlns:res="http://net.aocat/MUX2/RespostaRegistre" xmlns:ns0="http://net.aocat/MUX2/registres" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                        <res:Resultat codi="KO">
                           <res:Errors>
                              <res:Error>
                                 <res:Codi>-1</res:Codi>
                                 <res:Descripcio>; nested exception is: 
	java.net.UnknownHostException: dummy.cat</res:Descripcio>
                              </res:Error>
                           </res:Errors>
                        </res:Resultat>
                     </res:RespostaRegistre>
                  </ns3:DatosEspecificos>

Màquines a revisar en cas de caiguda

### Màquines MUX

[PCI2 - APP - BEA8 - Revisió](41520849.html)
--------------------------------------------

[PCI2 - BEA - BEA8 - Reinici](PCI2---BEA---BEA8---Reinici_41520848.html)
------------------------------------------------------------------------

### MTI - PCI3

Tot hi que el MUX vagi per PCI2 la traçabilitat va per la MTI i aquesta esta desplegada en el WL12.

Caldrà revisar els nodes del WL12 i que les peticions de la MTI estiguin finalitzant correctament.

**Si detectem que els error es produeixen en aquesta part de les operacions, caldrà reinciar el WL12 IOP.**

[PCI3 - WL12 - Revisió](41520946.html)
--------------------------------------

[PCI3 - WL12 - Reinici](PCI3---WL12---Reinici_41520945.html)
------------------------------------------------------------

Procediment

**Revisió modalitat - Registre**

Hem de revisar que la modalitat estigui donant servei correctament. Per fer-ho caldrà:

1- Revisar Registre

*   Consultem algun assentament aleatori per l'eina OracleQry o bé per l'admin del MUX > auditoria peticions [http://admin.iop.aoc.cat/prjMUXWebAdmin/inici.do](http://admin.iop.aoc.cat/prjMUXWebAdmin/inici.do)
*   Si veiem que s'estan registrant assentaments és que el MUX\_Registra funciona correctament.
*   Exemple:

![](https://intranet.aoc.cat/plugins/servlet/confluence/placeholder/unknown-attachment?locale=es_ES&version=2)

### CASOS D'ERROR

Si durant la revisió veiem que no es reprodueix el resultat esperat i detectem que els **erros són deguts a l'aplicació del MUX, haurem de revisar logs i provar de reiniciar els BEA.**

**PROCEDIMENT:** 

**[Revisió MUX](41518245.html)**
--------------------------------

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

![](images/icons/bullet_blue.gif) [MUX\_REGISTRE\_PRO.xml](attachments/34504895/34504897.xml) (text/xml)  
![](images/icons/bullet_blue.gif) [image2020-2-6\_12-8-21.png](attachments/34504895/34504898.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-6\_12-11-40.png](attachments/34504895/34504899.png) (image/png)  
![](images/icons/bullet_blue.gif) [MUX\_CONSULTA\_PRO.xml](attachments/34504895/34504905.xml) (text/xml)  
![](images/icons/bullet_blue.gif) [image2020-2-6\_12-34-8.png](attachments/34504895/34504906.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-6\_12-34-54.png](attachments/34504895/34504907.png) (image/png)  
![](images/icons/bullet_blue.gif) [MUX\_CONSULTA\_PER\_DATES.xml](attachments/34504895/34504908.xml) (text/xml)  
![](images/icons/bullet_blue.gif) [image2020-2-6\_12-43-46.png](attachments/34504895/34504909.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-6\_12-45-33.png](attachments/34504895/34504910.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-4\_14-38-26.png](attachments/34504895/36339865.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-1-18\_13-18-30.png](attachments/34504895/41520399.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-1-18\_13-22-49.png](attachments/34504895/41520400.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-27\_10-30-13.png](attachments/34504895/64979023.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:07

[Atlassian](http://www.atlassian.com/)