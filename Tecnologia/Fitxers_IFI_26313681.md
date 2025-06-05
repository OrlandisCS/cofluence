Suport Tècnic : Fitxers\_IFI  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [01 - Gestió Operativa](26313391.html)
4.  [Tasques complementàries](26313409.html)

Suport Tècnic : Fitxers\_IFI
============================

Created by Unknown User (obernalp), last modified by OTEC ST JAlejandro Cardete Postigo on 12 December 2022

Primeres configuracions
=======================

Configurar l'entorn per poder descarregar els documents

En cas de ser el primer cop que es realitza la tasca, anar a  **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\DOCUMENTACIO\\IFI** i copiar la carpeta **Cliente IFI** **4.10** a **C:\\**

També haurem de copiar la carpeta **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\DOCUMENTACIO\\IFI\\jce\_policy-8** al directori **C:\\Program Files (x86)\\Java\\**

Si no ens funciona, obrirem l'arxiu Cliente IFI amb un editor:

![](attachments/26313681/26315852.png)

i ens assegurarem que la següent ruta existeix:

![](attachments/26313681/26315864.png)

  
Step-by-step guide
---------------------

A continuació s'explicarà el procediment a seguir per transferir els fitxers IFI.

1.  Rebre email.
    
2.  Connectar-se a la màquina de l'AOC
    
3.  Descarregar i comprimir fitxers  en extensió .rar
    
4.  Transferir fitxers sFTP en carpeta xarxa.
    
5.  Enviar correu de notificació
    
6.  Registrar la tasca
    

 1. Rebre Mail
--------------

A Suport es rep un email de [GISS.PAFI@GISS.SEG-SOCIAL.ES](mailto:GISS.PAFI@GISS.SEG-SOCIAL.ES) on ens comuniquen que tenim disponibles nous fitxers mensuals.

El correu es mourà automàticament a la carpeta 05 - IFI > IFI - PENDENT. D'aquesta manera tindrem localitzats els IFI's pendents de gestionar:

![](attachments/26313681/26317659.png)

 2. Descarregar els fitxers
---------------------------

Accedim a la ruta **_C:\\Cliente IFI 4.10_** i obrim amb doble click el fitxer _**ClienteIFI.bat**_

Es detectaran automàticament els fitxers i es descarregaran.

Possible error: "Error de conexión con el servidor."

En cas d'obtenir el següent error:

![](attachments/26313681/26316706.png)

Haurem de clicar al símbol de l'endoll i introduir la contrasenya del KeePass per poder-nos connectar. KeePaas: CAOC\_v2\_Everis, haurem de buscar IFI

![](attachments/26313681/26317550.png)

  

Màquina del AOC

En cas de no poder accedir al client per algun problema, podem intentar-ho des de la màquina de l'AOC

  

 3. Descarregar i comprimir fitxers  en extensió .rar
-----------------------------------------------------

Una vegada descarregats els fitxers, els podrem trobar a la ruta: _**C:\\Cliente IFI 4.10\\recibidos**_

Crearem una carpeta amb la data del dia actual (seguint l'esquema adequat)  on posarem el/s fitxers descarregats. La carpeta creada també la copiarem al directori: **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\DOCUMENTACIO\\IFI_\\00 - Descarregats_**

Aquest directori està compartit amb l'AOC i es podrà accedir des de la seva màquina. Haurem de comprimir cada fitxer IFI descarregat en una extensió **.rar**. Si no disposem del programa per fer-ho al nostre ordinador local ho podrem fer des de la màquina de l'AOC. Per fer-ho podem utilitzar el **Remote Desktop** o **Conexión a Escritorio Remoto** que és un programa que ja ve instal·lat en Windows. Un cop iniciada la sessió amb el nostre usuari accedirem a la ruta dels arxius i els comprimirem un a un.

En cas de que no es descarreguin els fitxers

Si veiem que arriba el correu d'IFIs però no es descarrega cap fitxer, els haurem de sol·licitar:

![](attachments/26313681/36340717.png)

Podem agafar el nom del fitxer del propi correu que ens arriba

![](attachments/26313681/36340718.png)

Un cop seleccionat el fitxer que toca fem clic a **Detalle** i després a **Solicitar Reenvío**

![](attachments/26313681/36340719.png)

D'aquesta manera, el proper cop que iniciem el programa, descarregarà aquest fitxer.

  

 4. Transferir fitxers sFTP en carpeta xarxa.
---------------------------------------------

Màquina del AOC

Per evitar possibles problemes, ho podem realitzar des de la màquina de l'AOC

Obrirem un client FTP anomenat **Filezilla**. Si ens demana credencials, les podrem trobar al **KeePass** (10.127.17.110 ) o ifi.

Obrirem una _Conexión rápida_ introduint les següents dades als requadres de la part superior, tal com es mostra a la imatge:

Servidor: sftp://10.127.17.110

Nombre de usuario: PICA\_SFTP\_IFI\_CAO

Contraseña: Podem trobar-la al **Keepass**. Username en el Keepass: **PICA\_SFTP\_IFI\_CAO**

Puerto: Deixar en blanc.

![](attachments/26313681/26314725.png)

A dalt a l'esquerra, obrirem una connexió anomenada FTPPICA tal com es mostra a la imatge:

  

![](attachments/26313681/26314691.png)

  

Un cop tinguem accés, accedirem al repositori de la PICA anomenat _**fitxers\_carregues**_. Després arrosegarem els arxius .rar a la carpeta com es mostra a la imatge:

(Si no trobem els fitxers accedir a la ruta: **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\DOCUMENTACIO\\IFI\\00 - Descarregats\\**)

![](attachments/26313681/26316999.png)

5\. Enviar correu de notificació
--------------------------------

Finalment, enviarem un mail notificant que els fitxers IFI estan disponibles. El mail haurà de ser tipus:

De: OTSuportTecnic   
Enviado el: lunes, 6 de noviembre de 2017 17:04  
Para: Aguilera Moreno, Santiago (santiago.aguilera@gencat.cat); [jlrodriguez@gencat.cat](mailto:jlrodriguez@gencat.cat); [OTPICA@viewnext.com](mailto:OTPICA@viewnext.com)  
CC: Rubén Cortés; [suporttecnic@aoc.cat](mailto:suporttecnic@aoc.cat)  
Asunto: AOC\_Suport : Fitxers IFI

  

Bona tarda,

Us informem que s’ha enviat una nova remesa de fitxers.

Els fitxers es troben empaquetats en format .RAR.

Els fitxers són els següents :

*   IFI.DAS0901R.D171102.N001  (BARCELONA)                                         
    
*   IFI.DAS0902R.D171102.N001  (GERONA)                                            
    
*   IFI.DAS0903R.D171102.N001  (LERIDA)                                            
    
*   IFI.DAS0904R.D171102.N001  (TARRAGONA)                                         
    

**DESCRIPCION**:  INFORMACION DE ASISTENCIA SANITARIA CATALUÑA                     

**DESTINO**: AREA DE SERVICIOS Y CALIDAD                                           

         DIVISION DE ATENCION AL CLIENTE                                       

         OFICINA DE LA TARJETA SANITARIA                                       

         Sº CATALAN DE LA SALUD - CATSALUT                                     

        TRAVESIA DE LAS CORTES, 131-139                                                                              

Salutacions cordials.

Podrem trobar el template del mail a: **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\DOCUMENTACIO\\IFI**

 6. Registrar la tasca
----------------------

Un cop enviat el correu podrem registrar la tasca a un tiquet mensual del JIRA, per exemple: [ST-2687](https://contacte.aoc.cat/browse/ST-2687) i moure els correus a la carpeta IFI - REALITZATS:

![](attachments/26313681/26317662.png)

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2017-11-6\_17-34-21.png](attachments/26313681/26316999.png) (image/png)  
![](images/icons/bullet_blue.gif) [2017\_11\_09\_16\_58\_31\_192.168.166.115\_Conexión\_a\_Escritorio\_remoto.png](attachments/26313681/26314691.png) (image/png)  
![](images/icons/bullet_blue.gif) [2018\_01\_08\_16\_16\_26\_Intercambio\_de\_Ficheros\_Institucionales..png](attachments/26313681/26316706.png) (image/png)  
![](images/icons/bullet_blue.gif) [2018\_01\_08\_16\_19\_00\_Intercambio\_de\_Ficheros\_Institucionales..png](attachments/26313681/26316705.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-3-9\_9-47-39.png](attachments/26313681/26315849.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-3-9\_9-58-45.png](attachments/26313681/26315852.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-3-9\_9-59-29.png](attachments/26313681/26315864.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-4-9\_16-19-21.png](attachments/26313681/26317555.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-4-9\_16-21-12.png](attachments/26313681/26317550.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-6-6\_15-28-26.png](attachments/26313681/26315658.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-8-6\_11-13-10.png](attachments/26313681/26314725.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-3-11\_9-57-19.png](attachments/26313681/26317659.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-3-11\_9-58-11.png](attachments/26313681/26317662.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-9\_11-26-24.png](attachments/26313681/36340717.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-9\_11-28-35.png](attachments/26313681/36340718.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-9\_11-29-54.png](attachments/26313681/36340719.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:47

[Atlassian](http://www.atlassian.com/)