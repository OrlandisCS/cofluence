Suport Tècnic : PCI3 - WL12 - Desplegament  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [04 - Tècnica de sistemes + 24x7 + Padró](26313202.md)
4.  [Plataformes](Plataformes_41520520.md)
5.  [PCI3 - WL12](PCI3---WL12_41520942.md)

Suport Tècnic : PCI3 - WL12 - Desplegament
==========================================

Created by Unknown User (otecobernal), last modified by Joan Riquelme on 10 April 2025

Informació sobre el desplegament
--------------------------------

### Pas 1 : Revisió nodes WL12 a través de l'admin.

Revisar que tots els nodes estiguin en un estat correcte, per **PRE** o bé per **PRO**, segons l'entorn en el que despleguem.

![](attachments/41520944/41521474.png)

Si veiem algun node en un estat inconsistent o en Warning, reiniciarem per deixar-lo correcte abans de desplegar.

  

### Pas 2 : Pre-requisits per poder desplegar (aquests només haurem de fer-los la primera vegada, són tota la instal·lació)

Instal·lació de Gradle

Els desplegaments a Weblogic12 es fan des del local, utilitzant Gradle.

A continuació expliquem com **descarregar i configurar Gradle**:

Download gradle version 2.11 → [https://gradle.org/releases/](https://gradle.org/releases/)  
![](attachments/41520944/41521475.png)

  

Ficar-ho al nostre ordinador. (Exemple: C://gradle)  
  
Fer modificacions a les variables d'entorn de l'ordinador.

Per fer-ho buscarem al buscador de Windows:

![](attachments/41520944/100009259.png)![](attachments/41520944/100009261.png)

  

Un cop dins, anirem a Path i farem click a Editar:  
![](attachments/41520944/100009263.png)  
  
Un cop dins, farem click a Nuevo i després afegirem la ruta on es troba el Gradle (fins a la carpeta bin):  
![](attachments/41520944/100009264.png)  
  
Finalment, afegirem una nova variable de sistema, que es dirà GRADLE\_HOME:  
  
![](attachments/41520944/100009265.png)  
  
A la variable de path afegir al final **_,\[ruta gradle\]_**: EXEMPLE  
C:\\Users\\XXXXXX\\Desktop\\Desplegaments i carregas\\Tasca Desplegaments\\gradle-2.11  
  

Descarregar el següent fitxer i descomprimir-ho a la ruta que haguem escollit. En el cas de l'exemple: _C:\\gradle-2.11  
_Deixo el fitxer a continuació: _[GRADLE WL12 - DEPLOYER\_v2.zip](attachments/41520944/128647385.zip)_

  

Per últim, en la carpeta on tinguem el gradle, substituirem el fitxer build.gradle que tenim, per aquest: [build.gradle](attachments/41520944/100009267.gradle)

  

  

Addicionalment, haurem de **configurar algunes variables** per tal que el build.gradle pugui descarregar les dependències de **AWS**.

Modificar el fitxer .aws/credentials, que normalment podem trobar a C://Usuaris/nom\_usuari

Afegir el següent bloc (demanar les dades al Joan o al David):

\[AOC\_LEGACY\]  
aws\_access\_key\_id = XXXX  
aws\_secret\_access\_key = XXX

  

Després hem de definir el profile aquest al fitxer .aws/config:

\[profile AOC\_LEGACY\]  
sso\_session = AOC  
region = eu-west-1

El valor _sso\_session_ és el que nosaltres tinguem definit en aquest mateix fitxer.

  

  

### Pas 3 : Desplegament

Trobarem els paquets que hem de desplegar a la següent ruta: **\\\\192.168.166.135\\Desplegaments****_\\2021\\Pendents._** Agafem els paquets que toca desplegar i els copiem en la ruta: **_\\\\192.168.166.135\\Desplegaments\\**2021\\Mes\\ddmmyyyy**._**

En local ens dirigim a la ruta: **_C:\\gradle-2.11\\GRADLE WL12 - DEPLOYER\_v2\\wars_** i dins copiem només el paquet (fitxer.war/ear)**_._** La ruta pot variar en funció de com haguem configurat el graddle.

Anem una carpeta enrere i a la barra de direccions escriurem _**cmd.**_ S'obrirà un terminal.

Un cop al terminal, executem les següents comandes, una a una:

aws sso login

FOR /F "tokens=\*" %g IN ('aws.exe codeartifact get-authorization-token --domain aoc --domain-owner 316202850224 --region eu-west-1 --query authorizationToken --output text --profile=AOC\_LEGACY') do (SET CODEARTIFACT\_AUTH\_TOKEN=%g)

gradle deploy

Nota: si no volem fer el backup per alguna raó, executem amb l'opció:

gradle deploy -PnoBackup

Un cop ficat l'entorn, haurem d'indicar quin war/ear volem desplegar. Sortirà un llistat de tots els paquets que tinguem a la ruta: _**C:\\gradle-2.11\\GRADLE WL12 - DEPLOYER\_v2\\wars.**_ Indiquem el número del paquet i fem intro.

Es recomana només tenir el paquet o paquets que toca desplegar per evitar embolics.

  

![](attachments/41520944/41521482.png)

  

El pròxim és triar el clúster on volem desplegar el paquet. Normalment s'indica al tiquet del JIRA, en cas de que no, es pot mirar a l'admin de WebLogic 12, expliquem com al final.

![](attachments/41520944/41521483.png)

  

Un cop triat el clúster, ens farà un petit resum de les opcions escollides i haurem de confirmar que tot està bé. Llavors, començarà a desplegar el paquet.

Haurem de comprovar que es desplega correctament.

![](attachments/41520944/41521484.png)

El backup es realitza de manera automàtica, el podrem trobar a la carpeta del gradle: _C:\\gradle-2.11\\GRADLE WL12 - DEPLOYER\_v2_ un cop finalitzi el desplegament. La ruta pot variar segons la manera com haguem instal·lat el gradle.

![](attachments/41520944/41521485.png)

Agafarem el backup i el copiarem a la carpeta de xarxa que toqui. Exemple: **_\\\\192.168.166.33\\Desplegaments\\2021\\Mes\\ddmmyyyy._**

Pas 4: Validacions internes.
----------------------------

Hi han dues maneres diferents de realitzar les validacions:

*   A nivell de fitxers → Revisar que tots els fitxers i carpetes s'han modificat correctament
*   Validació JIRA → Realitzar validació que indiquen al JIRA →  Normalment s'encarrega l'OT

Bonus Track
-----------

  

Com revisar a quin clúster estan els paquets

Anem a la consola d'administració de WebLogic 12. **En cas de necessitar usuari/password revisar keepass.**

PRO: [http://10.120.1.163:7001/console/login/LoginForm.jsp](http://10.120.1.163:7001/console/login/LoginForm.jsp)

PRE: [http://10.120.2.125:7001/console/login/LoginForm.jsp](http://10.120.2.125:7001/console/login/LoginForm.jsp)

A la part esquerra trobarem un menú anomenat "_Estructura de Dominio_". Fem click a "_Despliegues_" trigarà una mica en carregar.

**![](attachments/41520944/41521486.png)  
**

  

En aquesta pàgina podrem veure tots els paquets que hi ha desplegats a WebLogic 12. Si ens fixem en la columna "_Destinos_" és el clúster que escollim quan executem la comanda _gradle deploy._ Sempre podem revisar aquesta pàgina si no tenim clar quin clúster escollir. Segurament estem pujant un paquet que és actualització d'un que ja està pujat.

![](attachments/41520944/41521487.png)

  

Possibles errors

Quedarà molt clar quan el desplegament falla, en comptes d'aparèixer **BUILD SUCCESFULL** apareix una altre frase de color vermell. A més, dóna una mica d'informació de l'error.

L'error més típic es causat per el nom del paquet. Per saber quin nom ha de tenir, podem revisar al pàgina dels desplegaments, comentada a dalt, i buscar pel nom del paquet o un similar.

  

Creació d'un datasource

Per crear un nou datasource hem d'accedir en el menú del WL12 a Servicios → Orígenes de datos i tenir bloquejat el WL12:

  

![](attachments/41520304/41520305.png)

  

Comentem el cas només per afegir un nou datasource associat a un esquema de BB.DD. d'oracle 12.

  

Farem un nou origen de dades de tipus Gridlink.

  

Primera pantalla:

![](attachments/41520304/41520306.png)

  

Segona Pantalla:

![](attachments/41520304/41520307.png)

  

Tercera pantalla:

  

![](attachments/41520304/41520308.png)

  

Quarta pantalla:

![](attachments/41520304/41520309.png)

  

S'haurà d'afegir la URL correcta pel servei que pertoqui... si disposa d'un service\_name propi, doncs s'haurà de modificar.

I les dades de la BB.DD i la seva respectiva contrasenya.

URLs d'entorn

PRE → jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS\_LIST=(LOAD\_BALANCE=on)(FAILOVER=ON)(ADDRESS=(PROTOCOL=TCP)(HOST=ora12pre-scan.aoc.cat)(PORT=1521)))(CONNECT\_DATA=(SERVER=DEDICATED)(SERVICE\_NAME=ORA12PRE)))

PRO → jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS\_LIST=(LOAD\_BALANCE=on)(FAILOVER=ON)(ADDRESS=(PROTOCOL=TCP)(HOST=ora12pro-scan.aoc.cat)(PORT=1521)))(CONNECT\_DATA=(SERVER=DEDICATED)(SERVICE\_NAME=ORA12PRO)))

  

La següent pantalla és un resum i podem fer un test de que la configuració està bé:

![](attachments/41520304/41520311.png)

  

  

Sisena pantalla:

![](attachments/41520304/41520312.png)

  

ONS per entorn

DEV → aoc-l-ora12-01-dev:6200; aoc-l-ora12-02-dev:6200

PRE → aoc-l-ora12-01-pre:6200; aoc-l-ora12-02-pre:6200

PRO → aoc-l-ora12-01-pro:6200; aoc-l-ora12-02-pro:6200

  

Al igual que en l'anterior, al passar a la següent pantalla podem fer una prova de que els ONS funcionen correctament:

  

![](attachments/41520304/41520313.png)

  

I finalment, a on s'ha de desplegar:

  

![](attachments/41520304/41520314.png)

  

Un cop finalitzat, s'han d'activar els canvis:

![](attachments/41520304/41521936.png)

  

Si cal modificar el dimensionament dels pools s'haurà de fer a continuació.

  

Així que haurem d'anar al datasource en concret i tornar a bloquejar l'edició i desde la pantalla Configuración → Pool de Conexiones.

![](attachments/41520304/41520316.png)

  

En la part inferior apareixen per desplegar les propietats avançades si calgués:

  

![](attachments/41520304/41520319.png)

  

Un cop fet els canvis, els Guardem i activem els canvis.

  

  

  

Parar o eliminar una aplicació

Com eliminar un paquet de desplegament a Web Logic 12 per web.

1.  Accedim a l'admin de Web Logic 12: [http://10.120.1.163:7001/console/login/LoginForm.jsp](http://10.120.1.163:7001/console/login/LoginForm.jsp)
2.  Premem el botó _Bloquear y Editar._  
    ![](attachments/26313484/26317768.png)  
      
    
3.  Anem a l'opció _Despliegues._  
    ![](attachments/26313484/26317766.png)
4.  Sortirà una pantalla amb totes les aplicacions. Fem click a l'aplicació que volem eliminar.  
    ![](attachments/26313484/26314004.png)  
      
    
5.  Anirem a una pantalla on hi ha un petit resum de l'aplicació. Fem click a l'apartat _Destinos_ i desmarquem els destins de l'aplicació.  
    ![](attachments/26313484/26314020.png)  
      
    
6.  Marquem el paquet que volem suprimir i premem el botó _Liberar Configuración._  
    ![](attachments/26313484/26314066.png)  
      
    
7.  Per últim fem el desplegament amb el [gradle](https://steps.everis.com/confluence/display/AOC/PCIv3+-+WebLogic12).

  

  

  

Undeploy d'una aplicació amb Gradle

Ens dirigim a la ruta on tenim instal·lat el gradle, la ruta serà una semblant a aquesta: C:\\gradle-2.11\\GRADLE WL12 - DEPLOYER\_v2

Obrim el fitxer **build.gradle**

![](attachments/41519822/41519825.png)

Comentem la part del fitxer que es veu a la imatge i el guardem. Un cop realitzades aquestes passes tornem a executar l'script, aquesta vegada només farà la part del undeploy.

Un cop fet això recordeu posar-ho com estava inicialment per tal de desplegar-ho tot correctament.

  

  

  

  

  

  

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2019-1-16\_15-33-41.png](attachments/41520944/41521474.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-5-28\_16-37-28.png](attachments/41520944/41521475.png) (image/png)  
![](images/icons/bullet_blue.gif) [GRADLE WL12 - DEPLOYER\_v2.rar](attachments/41520944/64979288.rar) (application/octet-stream)  
![](images/icons/bullet_blue.gif) [image2019-11-19\_17-43-39.png](attachments/41520944/41521482.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-19\_17-55-25.png](attachments/41520944/41521483.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-5-28\_17-0-43.png](attachments/41520944/41521484.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-12-5\_12-36-51.png](attachments/41520944/41521485.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-19\_18-4-49.png](attachments/41520944/41521486.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-19\_18-7-23.png](attachments/41520944/41521487.png) (image/png)  
![](images/icons/bullet_blue.gif) [GRADLE WL12 - DEPLOYER\_v2.rar](attachments/41520944/41521481.rar) (application/octet-stream)  
![](images/icons/bullet_blue.gif) [image2024-2-14\_13-28-48.png](attachments/41520944/100009259.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-14\_13-29-41.png](attachments/41520944/100009261.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-14\_13-30-46.png](attachments/41520944/100009263.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-14\_13-34-28.png](attachments/41520944/100009264.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-14\_13-38-49.png](attachments/41520944/100009265.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-14\_13-41-40.png](attachments/41520944/100009266.png) (image/png)  
![](images/icons/bullet_blue.gif) [build.gradle](attachments/41520944/100009268.gradle) (application/octet-stream)  
![](images/icons/bullet_blue.gif) [build.gradle](attachments/41520944/128647386.gradle) (application/octet-stream)  
![](images/icons/bullet_blue.gif) [image2024-2-14\_13-44-21.png](attachments/41520944/100009269.png) (image/png)  
![](images/icons/bullet_blue.gif) [GRADLE WL12 - DEPLOYER\_v2.zip](attachments/41520944/128647385.zip) (application/zip)  
![](images/icons/bullet_blue.gif) [build.gradle](attachments/41520944/100009267.gradle) (application/octet-stream)  

Document generated by Confluence on 02 June 2025 11:16

[Atlassian](http://www.atlassian.com/)