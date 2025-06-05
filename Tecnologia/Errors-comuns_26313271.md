Suport Tècnic : Errors comuns  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [04 - Tècnica de sistemes + 24x7 + Padró](26313202.html)
4.  [Revisió de serveis](36340340.html)
5.  [PADRO - Revisions i Restabliment](PADRO---Revisions-i-Restabliment_118554712.html)
6.  [Padró - Instal·lació i manteniment](26313622.html)
7.  [PADRO - Instal·lació de l'aplicació](26313260.html)

Suport Tècnic : Errors comuns
=============================

Created by Unknown User (obernalp), last modified by Unknown User (otecjcolomer) on 11 March 2024

A continuació, veurem un llistat d'errors comuns en el PADRO i com solucionar-los. Si trobes un nou error o nova informació, s'hauria d'ampliar aquesta informació:

Error: Signature: error during message

**Problema:**

WSDoAllSender: Signature: error during message [procesingorg.apache.ws](http://procesingorg.apache.ws/).security.WSSecurityException: General security error (Unexpected number of X509Data: for Signature)

**Solució:**

En el fitxer _c:/aoc\_padro/appHome/webRoot/WEB-INF/server-config.wsdd_ s'ha de modificar l'atribut user perquè coincideixi amb l'àlies del certificat CDA.

Variable d'entorn JRE\_HOME mal configurada

**Problema:**

Quan intentem iniciar el tomcat, ens sortirà l'error The JRE\_HOME environment variable is not defined correctly

![](attachments/26313271/26317068.png)

**Solució:**

Per solucionar aquest error, dins del fitxer Catalina.bat configurarem aquesta variable d'entorn. Copiarem la ruta del JRE sense modificar-la o traduir-la. El resultat serà semblant a:

![](attachments/26313271/26317067.png)

Una vegada configurada la variable d'entorn, tornarem a iniciar el tomcat.

Per actualitzar les variables d'entorn, reiniciar el cmd (consola de windows)

El recurso requerido no está disponible

**Problema:**

Si intentem accedir des del navegador, trobarem un error semblant a:

![](attachments/26313271/26317066.png)

Si accedim des de SOAPUI, l'error serà semblant a:

<!DOCTYPE html>  
<html>  
 <head>  
 <title>Apache Tomcat/8.0.41 - Informe de Error</title>  
 <style type="text/css">...</style>  
 </head>  
 <body>  
 <h1>Estado HTTP 404 - /aoc-padro/services/dispatcher</h1>  
 <div class="line"/>  
 <p>  
 <b>type</b> Informe de estado</p>  
 <p>  
 <b>mensaje</b>  
 <u>/aoc-padro/services/dispatcher</u>  
 </p>  
 <p>  
 <b>descripción</b>  
 <u>El recurso requerido no está disponible.</u>  
 </p>  
 <hr class="line">  
 <h3>Apache Tomcat/8.0.41</h3></body></html>

  

**Solució:**

El problema està en l'arxiu C:\\aoc\_padro\\tomcat-8\\conf\\Catalina\\localhost\\aoc-padro.xml. Probablement, aquest fitxer no existeix.

El nombre jdbc/myoracle no este asociado a este contexto

**Problema:**

Quan iniciem el tomcat, aquest acabarà iniciar, però apareixerà aquest error al log:

![](attachments/26313271/26317065.png)![](attachments/26313271/26317063.png)

**Solució:**

Extreure la base de dades dels següents fitxers:

*   C:\\aoc\_padro\\appHome\\cfg\\config.xml
*   C:\\aoc\_padro\\tomcat-8\\conf\\Catalina\\localhost\\aoc-padro
*   C:\\aoc\_padro\\appHome\\codeLocal\\convivencia\\V1\_0\\convivencia-1\_0.cfg
*   C:\\aoc\_padro\\appHome\\codeLocal\\padron\\V2\_0\\padron-2\_0.cfg

Problemes de la base de dades a l'hora de crear la connexió

**Problema:**

Llencem una petició amb el SOAP UI i ens retorna l'error Cannot create PoolableConnectionFactory (Error de E/S: The Network Adapter could not establish the connection)

![](attachments/26313271/26317062.png)

**Solució:**

Hi ha un problema a l'hora de connectar amb la base de dades. Aquest problema potser un problema d'accés a aquesta o les dades són incorrectes.

En el meu cas, l'host estava malament. Exemple:

*   Host amb error: _jdbc:oracle:thin:@**altair**:1521:ORC10_
*   Host sense error: _jdbc:oracle:thin:@**altair.ajdespi.local**:1521:ORC10_

Problemes arrencar tomcat

**Problema:**

A l'hora d'iniciar el tomcat amb la comanda catalina.bat run > tomcat.log 2>&1 i apareix el següent al log creat:

  

Using CATALINA\_BASE: C:\\aoc\\apache-tomcat-4.1.40  
Using CATALINA\_HOME: C:\\aoc\\apache-tomcat-4.1.40  
Using CATALINA\_TMPDIR: C:\\aoc\\apache-tomcat-4.1.40\\temp  
Using JAVA\_HOME: C:\\Program Files\\Java\\jdk1.6.0\_45  
Exception during startup processing  
java.lang.reflect.InvocationTargetException  
 at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)  
 at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:39)  
 at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)  
 at java.lang.reflect.Method.invoke(Method.java:597)  
 at org.apache.catalina.startup.Bootstrap.main(Bootstrap.java:151)  
Caused by: java.lang.NoClassDefFoundError: Could not initialize class javax.crypto.SunJCE\_b  
 at javax.crypto.Cipher.getInstance(DashoA13\*..)  
 at [com.sun.net](http://com.sun.net/).ssl.internal.ssl.JsseJce.getCipher(JsseJce.java:180)  
 at [com.sun.net](http://com.sun.net/).ssl.internal.ssl.CipherBox.<init>(CipherBox.java:85)  
 at [com.sun.net](http://com.sun.net/).ssl.internal.ssl.CipherBox.newCipherBox(CipherBox.java:119)  
 at [com.sun.net](http://com.sun.net/).ssl.internal.ssl.CipherSuite$BulkCipher.newCipher(CipherSuite.java:369)  
 at [com.sun.net](http://com.sun.net/).ssl.internal.ssl.CipherSuite$BulkCipher.isAvailable(CipherSuite.java:407)  
 at [com.sun.net](http://com.sun.net/).ssl.internal.ssl.CipherSuite$BulkCipher.isAvailable(CipherSuite.java:386)  
 at [com.sun.net](http://com.sun.net/).ssl.internal.ssl.CipherSuite.isAvailable(CipherSuite.java:144)  
 at [com.sun.net](http://com.sun.net/).ssl.internal.ssl.CipherSuiteList.buildAvailableCache(CipherSuiteList.java:215)  
 at [com.sun.net](http://com.sun.net/).ssl.internal.ssl.CipherSuiteList.getDefault(CipherSuiteList.java:239)  
 at [com.sun.net](http://com.sun.net/).ssl.internal.ssl.SSLServerSocketFactoryImpl.getDefaultCipherSuites(SSLServerSocketFactoryImpl.java:84)  
 at [org.apache.tomcat.util.net](http://org.apache.tomcat.util.net/).jsse.JSSESocketFactory.getEnabledCiphers(JSSESocketFactory.java:198)  
 at [org.apache.tomcat.util.net](http://org.apache.tomcat.util.net/).jsse.JSSE14SocketFactory.init(JSSE14SocketFactory.java:120)  
 at [org.apache.tomcat.util.net](http://org.apache.tomcat.util.net/).jsse.JSSESocketFactory.createSocket(JSSESocketFactory.java:95)  
 at [org.apache.tomcat.util.net](http://org.apache.tomcat.util.net/).PoolTcpEndpoint.initEndpoint(PoolTcpEndpoint.java:293)  
 at org.apache.coyote.http11.Http11BaseProtocol.init(Http11BaseProtocol.java:139)  
 at org.apache.coyote.tomcat4.CoyoteConnector.initialize(CoyoteConnector.java:1323)  
 at org.apache.catalina.core.StandardService.initialize(StandardService.java:532)  
 at org.apache.catalina.core.StandardServer.initialize(StandardServer.java:2269)  
 at org.apache.catalina.startup.Catalina.start(Catalina.java:483)  
 at org.apache.catalina.startup.Catalina.execute(Catalina.java:371)  
 at org.apache.catalina.startup.Catalina.process(Catalina.java:134)  
 ... 5 more

  

**Solució:**

Comprovar que els següents fitxers:

*   jre\\lib\\security\\local\_policy.jar

*   jre\\lib\\security\\US\_export\_policy.jar

Server error

**Problema**

Quan executem les proves amb Soap UI, obtenim un Server error.

Si arranquem el tomcat amb catalinta.bat run >;; tomcat.log 2>;;&1, i llancem la prova, en el log tomcat.log podem veure que falta un certificat.

  

**Solució**

Afegir el certificat en la ruta corresponent.

Error Driver base de dades

**Problema**

Executem un soap Ui i a l'error ens indica que no troba el driver corresponent de la base de dades.

  

**Solució**

S'ha de descarregar el driver de la pàgina oficial i col·locar el driver descarregat (.jar) en la següent ruta: C:\\aoc\_padro\\appHome\\webRoot\\WEB-INF\\lib

Error conexions Base de dades

**Problema**

Executem el Soap UI i ens apareix el següent error:

Cannot create PoolableConnectionFactory (Error de E/S: The Network Adapter could not establish the connection)

  

**Solució:**

S'ha de canviar la versió del driver que està utilitzant. En el meu cas, la versió de Oracle es 11 i del JDK és 8. Com podem veure en aquestes taules, no són compatibles:

![](attachments/26313271/26317061.png)

Error Reloj

**Problema:**

Als logs ens apareixerà el següent error:

[org.apache.ws](http://org.apache.ws/).security.WSSecurityException: An error was discovered processing the <wsse:Security> header. (WSSecurityEngine: Invalid timestamp The security semantics of message have expired)

  

**Solució:**

Modificar l'hora del rellotge per l'actual, o que s'actualitzi automàticament

Catalina.stop: LifecycleException: El conector Coyote no ha sido arrancado

**Problema:**

Apareix el següent error quan engeguem el tomcat:

Catalina.stop: LifecycleException: El conector Coyote no ha sido arrancado

  

**Solució:**

Revisar el fitxer server.xml i aoc-padro.xml.

Per exemple, en el meu cas la configuració de l'aplicació web en un tomcat 4 no era correcta.

javax.naming.NameNotFoundException: El nombre iSeries no este asociado a este contexto

**Problema**:

Apareix el següent error quan engeguem el tomcat:

javax.naming.NameNotFoundException: El nombre iSeries no este asociado a este contexto

  

**Solució:**

Revisar el fitxer server.xml i aoc-padro.xml.

Per exemple, en el meu cas afegir <ResourceLink name="jdbc/iSeries" global="jdbc/iSeries"/> a la configuració de les bases de dades configurades dins de l'aplicació web en un tomcat 4.

wrong name: com/tecsidel/aoc/wsaytos/padron/V2\_0/AytosVolantPadro

**Problema**:

Apareix el següent error quan llancem una petició:

ERROR - com.tecsidel.aoc.wsnegocio.padron.V2\_0.Padron.ejecutar(...) :: Error com.tecsidel.aoc.wsnegocio.padron.V2\_0.Padron: com/tecsidel/aoc/wsnegocio/padron/V2\_0/AytosVolantPadro (wrong name: com/tecsidel/aoc/wsaytos/padron/V2\_0/AytosVolantPadro)

  

**Solució:**

Fixar-nos en els arxius padron-2\_0.cfg i el convivencia-1\_0.cfg, i veure que les rutes i les carpetes estiguin ben indicades. Si no haurem de renombrar. 

noNamespace/SDocument$Factory

**Problema**:

Apareix el següent error quan llancem una petició:

ERROR - com.tecsidel.aoc.wsnegocio.padron.V2\_0.Padron.ejecutar(...) :: Error com.tecsidel.aoc.wsnegocio.padron.V2\_0.Padron: **noNamespace/SDocument$Factory**

  

**Solució:**

Falten llibreries a la ruta \\aoc\_padro\\appHome\\webRoot\\WEB-INF\\lib. S'ha de tenir en compte que si es fa un canvi de connector segurament hem de modificar les llibreries i afegir-ne. Hem de disposar del repositori de les llibreries dels diferents proveïdors per volcar la que pertoqui.

java.net.NoRouteToHostException: No route to host: connect

**Problema**:

Apareix el següent error quan llancem una petició:

ERROR - com.tecsidel.aoc.wsnegocio.padron.V2\_0.Padron.ejecutar(...) :: Error com.tecsidel.aoc.wsnegocio.padron.V2\_0.Padron: ; nested exception is:

                **[java.net](http://java.net).NoRouteToHostException: No route to host: connect**

  

**Solució:**

No hi ha connectivitat amb el padró. El proveïdor ha de revisar el connector. Agafarem la url dispatcher del webadmin:

![](attachments/26313271/100009703.png)

  

I anirem a la màquina del back i llançarem un wget +url dispatcher del webadmin:

  

![](attachments/26313271/100009704.png)

  

Com indicàvem abans, no hi ha connectivitat. Haurem d'enviar el següent correu a l'entitat:

  

Correu a enviar

Bona tarda,

  

El que teniu configurat i que ha de revisar el vostre proveïdor és el següent:

  

![](attachments/26313271/100009705.png)

  

La connectivitat funciona entre nosaltres, nosaltres també podem accedir a [vpn1.elvendrell.net](http://vpn1.elvendrell.net):12201.

Entenem que el proveïdor ha de revisar la vostra aplicació que es conecta a un altre endpoint, que és propi del connector i l’integrador.

  

Salutacions,

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2018-3-8\_14-5-32.png](attachments/26313271/26317068.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-3-8\_16-28-50.png](attachments/26313271/26317063.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-3-8\_16-29-23.png](attachments/26313271/26317065.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-3-8\_16-24-8.png](attachments/26313271/26317066.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-3-8\_14-7-10.png](attachments/26313271/26317067.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-4-26\_12-54-53.png](attachments/26313271/26317061.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-3-14\_12-17-50.png](attachments/26313271/26317062.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-3-11\_9-24-53.png](attachments/26313271/100009703.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-3-11\_9-29-17.png](attachments/26313271/100009704.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-3-11\_9-30-55.png](attachments/26313271/100009705.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:14

[Atlassian](http://www.atlassian.com/)