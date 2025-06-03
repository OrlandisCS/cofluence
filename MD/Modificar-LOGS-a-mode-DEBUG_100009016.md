Suport Tècnic : Modificar LOGS a mode DEBUG  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [01 - Gestió Operativa](26313391.html)
4.  [Tasques complementàries](26313409.html)

Suport Tècnic : Modificar LOGS a mode DEBUG
===========================================

Created by Unknown User (otecjcolomer), last modified on 01 February 2024

  

Creem aquesta FAQ arran del tiquet ZD#154897 on l'emissor de les dades, el MINHAP, ens va reclamar que desencriptéssim les dades de la petició per tal que la poguessin revisar:

  

![](attachments/100009016/100009017.png)

  

Primer de tot, haurem de saber on està l'aplicació que busquem, en aquest cas, estaríem parlant de l'aplicació del servei de l'INSS. Aquesta aplicació viu al Weblogic12 (WL12). Haurem d'esbrinar la ruta on està l'aplicació. Tot i que podríem fer-ho per WinSCP, fer-ho per aquesta via requereix més coneixements. La via més ràpida i assequible serà entrar a l'admin del WL12:

[http://10.120.1.163:7001/console/login/LoginForm.jsp](http://10.120.1.163:7001/console/login/LoginForm.jsp)

  

Un cop a dins haurem d'anar a l'apartat _Despliegues_: 

  

![](attachments/100009016/100009018.png)

  

Per trobar l'aplicació, podem fer un CTRL + F i indicar el servei. En aquest cas, cerquem inss (veiem que no és case sensitive): 

  

![](attachments/100009016/100009019.png)

  

Cliquem sobre el servei desitjat i veurem moltes dades rellevants sobre l'aplicació. El que ens interessa per canviar els logs és la ruta on està desplegada l'aplicació:

  

![](attachments/100009016/100009020.png)

  

Agafem aquesta ruta i ens l'emportem al Notepad per treure-li els espais:

  

/apps/soa/service/wls12214/wlsdomain/PCIDomain/servers/ADMINSERVER/upload/CAOC-PCI30-MC-INSS/app/

  

Obrim ara al WinSCP i entrem al node de l'Admin del WL12, que és el node1 (recordeu, si no accediu al node 1 no estareu accedint a l'Admin):

  

![](attachments/100009016/100009021.png)

  

Un cop a dins fiquem la ruta que hem copiat per anar al .war de l'aplicació desitjada:

  

![](attachments/100009016/100009022.png)

  

Un cop a la ruta, veurem l'arxiu WAR, que és amb el que treballarem i el que ens permetrà el mode dels logs. Ens passarem aquest arxiu .war al nostre local:

  

![](attachments/100009016/100009023.png)

  

Per modificar el nivell dels logs podríem descomprimir aquest arxiu .war, però llavors l'hauríem de tornar a compilar amb un Framework tipus IntelliJ. El que farem és obrir el .war i modificar-lo directament. Després si voleu podeu fer la prova descomprimint el .war per veure que els canvis s'han desat correctament.

Primer de tot, farem doble clic sobre el .war i l'obrirem:

  

![](attachments/100009016/100009026.png)

  

Ara anirem a l'arxiu on farem el canvi de nivell dels logs, d'error a debug.  **Però si obrim l'arxiu directament des d'aquí no ens deixarà desar els canvis**. Per poder treballar amb aquest arxiu i poder desar els canvis crearem una **carpeta backup** i hi **arrossegarem l'arxiu log4j.xml**, i d'aquest en farem còpia per treballar-hi i deixar el backup guardat per si de cas:

  

![](attachments/100009016/100009029.png)

  

Deixem el backup tranquil i obrim l'arxiu que haurem desat a una altra part:

  

![](attachments/100009016/100009030.png)

  

Obrim l'arxiu i veurem al namespace _<priority value="error"/>,_ que és la configuració predeterminada que tenen els logs per mostrar les traces.

  

![](attachments/100009016/100009031.png)

  

Per modificar-los i posar-los en mode DEBUG haurem de canviar el terme _error_ per la paraula _debug_,  i després desar els canvis a guardar:

  

![](attachments/100009016/100009033.png)

  

Ara haurem d'afegir l'arxiu **log4j.xml** al .war. Fem botó dret sobre el .war i l'obrirem:

  

![](attachments/100009016/100009026.png)

  

  

Afegim l'arxiu **log4j.xml** al .war:

  

![](attachments/100009016/100009036.png)

  

  

Un cop afegit el **log4j.xml** al .war:, ens podem assegurar d'haver fet bé el canvi si descomprimim l'arxiu .war:

  

![](attachments/100009016/100009024.png)

  

Dins de la carpeta que tenim descomprimida, haurem d'anar a la ruta de l'arxiu que haurem modificat, que serà la següent:

\\CAOC-PCI30-MC-INSS\\WEB-INF\\classes\\log4j.xml

![](attachments/100009016/100009025.png)

  

Obrim l'arxiu i veiem si està en el mode que desitgem.

  

Un cop tenim modificat l'arxiu .war l'haurem de modificar a la ruta que hem indicat abans, i per fer-ho haurem de fer un desplegament. En aquest cas, el desplegament el farem al WL12.

Per fer el desplegament seguiríem la següent FAQ: [PCI3 - WL12 - Desplegament](PCI3---WL12---Desplegament_41520944.html), però no el farem nosaltres...

  

IMPORTANT - DESPLEGAMENT

A l'hora de fer el desplegament és important comentar-ho abans amb l'equip, amb les persones que fan desplegaments, que són **Alessandro, Joan, Oriol o David**. Comentar-ho amb algú d'ells per saber qui farà el desplegament o si hi ha algun problema en fer-lo. 

**INDISPENSABLE**: un cop s'ha decidit que es fa el desplegament i qui el fa, s'ha de comunicar als diferents canals del Teams que es farà un desplegament.

  

  

  

  

  

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2024-2-1\_9-38-16.png](attachments/100009016/100009017.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_9-44-15.png](attachments/100009016/100009018.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_9-54-57.png](attachments/100009016/100009019.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_9-58-19.png](attachments/100009016/100009020.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_10-2-14.png](attachments/100009016/100009021.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_10-7-30.png](attachments/100009016/100009022.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_10-11-39.png](attachments/100009016/100009023.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_10-14-4.png](attachments/100009016/100009024.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_10-17-36.png](attachments/100009016/100009025.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_10-25-16.png](attachments/100009016/100009026.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_10-53-17.png](attachments/100009016/100009027.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_10-55-7.png](attachments/100009016/100009028.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_11-0-35.png](attachments/100009016/100009029.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_11-2-7.png](attachments/100009016/100009030.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_11-6-26.png](attachments/100009016/100009031.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_11-7-26.png](attachments/100009016/100009033.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-1\_14-21-31.png](attachments/100009016/100009036.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:48

[Atlassian](http://www.atlassian.com/)