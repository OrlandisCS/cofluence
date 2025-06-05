Suport Tècnic : SIRI - ALTRES - Errors comuns  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [02 - FAQ's serveis](26313393.html)
4.  [FAQ's SIRI](26313612.html)

Suport Tècnic : SIRI - ALTRES - Errors comuns
=============================================

Created by Unknown User (otecjriquelme), last modified by Unknown User (oteccmorales) on 15 November 2022

Com validar si una petició ha passat el Siri. Per Base de Dades:

**ORA12**

select \* from siri.aoc\_pci\_siri\_registre
where id\_peticio='XXXXXXXXXXXXX'
and funcionari\_nif='xxxxxxxxx'

-- A la columna "AUTORITZADA" veurem si la petició ha passat del SIRI o no (0 no ha passat el SIRI, 1 si que ha passat). Per veure més detalls de l'error, caldrà cercar-la pels logs. Cerquem per hora.

  

Ruta logs → [SIRI - ALTRES - LOGS](SIRI---ALTRES---LOGS_30870093.html)

Errors de Siri més comuns:
--------------------------

  

Pes màxim XML

La _PCI_ té una restricció on el missatge _XML_ de la petició complet no pot superar els **2MB**.

Si el XML de petició supera aquesta mida, el SIRI no el deixarà passar.

  

Error en el procés d'autorització. Organismes \[......\] no autenticats ni amb el CIF (.......) ni amb el certificat ......

Aquest error es retorna quan el certificat CDA amb què està signada la petició XML no coincideix amb el que l'entitat té carregat per bbdd.

El que fa el SIRI és bàsicament agafar el INE10 informat en el tag <_IdentificadorSolicitante_\> i cercar quins certificats té carregats per bbdd:

**cerca de CDA**

select \* from siri.aoc\_pci\_siri\_autenticacio
where codi\_ens='IdentificadorSolicitante'

Si en troba, farà el match entre el CDA amb què s'ha signat la petició i les dades que apareixen a la columna ASSUMPTE quan executem la query.

Exemple d'error a logs

08 Oct 2019 00:48:44,262 INFO  \[SIRI PROXY\] : Validació d'schema de petició requerida...

08 Oct 2019 00:48:44,268 INFO  \[SIRI PROXY\] : La petició compleix l'schema!

08 Oct 2019 00:48:44,284 ERROR \[SIRI PROXY\] : Error en el procés d'autorització. Organismes \[805430008\] no autenticats ni amb el CIF (P0805300A) ni amb el certificat (CN=Firmadoc BPM, OID.2.5.4.5=P0805300A, OID.2.5.4.42=MARIA JOSEP, OID.2.5.4.4=FERNÁNDEZ RUIZ - DNI 46668490H, OU=Certificat de segell electrònic nivell mig, OID.2.5.4.97=VATES-P0805300A, O=Ajuntament de Castellbisbal, C=ES) presentats. : per a la petició \[IdPeticion='CONV\_AYTOS805430008\_454971'; IdentificadorSolicitante='805430008'; IdSolicitanteOriginal=''; CodigoProducto='MUX'; CodigoCertificado='MUX\_CONSULTA'; Finalidad='PROVES'; NumElementos='1'; NifFuncionario='null'; NombreCompletoFuncionario='null'; NumeroExpediente='1'; Frontal='Sincron';\]


08 Oct 2019 00:48:44,293 DEBUG \[SIRI PROXY\] : Temps total verificació de l'estat d'autorització : 32ms

  

  

  

Error en el procés d'autenticació. No s'ha pogut validar el certificat presentat degut a problemes tècnics.

Aquest és l'error genèric per la validació de certificat.

Pot ser degut a diversos factors, com per exemple un error puntual a PSIS, temps alts a la MSC, etc.

Normalment vénen acompanyats d'un TimeOut a MSC. Per més informació podríem mirar el log sencer, sempre cercant per data i hora.

També mirar a la [MSC](http://10.120.4.57/pci3-mti-admin/peticions/msc), filtrant per SIRI && VALIDAR CERTIFICAT i buscar per data i hora.

Exemple d'error als logs

02 Oct 2019 08:05:55,765 INFO \[SIRI PROXY\] : Credencial recuperada :  
02 Oct 2019 08:05:55,765 INFO \[SIRI PROXY\] : \[CN=Sistema o aplicació de prova, SERIALNUMBER=Q0000000J, GIVENNAME=Persona, SURNAME=de la Peça de Prova - DNI 00000000T  
, OU=Certificat de segell electrònic nivell mig, OID.2.5.4.97=VATES-Q0000000J, O=Organització de prova, C=ES, 4eb549257b7719ec\]  
02 Oct 2019 08:05:55,765 INFO \[SIRI PROXY\] : Recuperant resultat de la validació amb key = 'F8E161BAEDD17884B16FCD37642BE36AC020187D2CCD2A7A937132E599E0D625AA052E2A3FD  
CB1F2'  
02 Oct 2019 08:05:55,790 INFO \[SIRI PROXY\] : Usant el codi d'organisme '7996100033' detectat al camp IdentificadorSolicitante per a invocar el MSC de validació de cert  
ificats  
02 Oct 2019 08:06:15,795 ERROR \[SIRI PROXY\] : Error a la invocació del MSC de validació de certificats per a la petició amb IdentificadorSolicitante='7996100033', IdPet  
icion='mux.consulta\_20190116\_1569996352977', : missatgeError=[java.net](http://java.net).SocketTimeoutException: Read timed out  
[javax.xml.ws](http://javax.xml.ws).WebServiceException: [java.net](http://java.net).SocketTimeoutException: Read timed out  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.client.HttpClientTransport.readResponseCodeAndMessage(HttpClientTransport.java:210)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.client.HttpTransportPipe.createResponsePacket(HttpTransportPipe.java:237)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.client.HttpTransportPipe.process(HttpTransportPipe.java:228)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.client.HttpTransportPipe.processRequest(HttpTransportPipe.java:143)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.DeferredTransportPipe.processRequest(DeferredTransportPipe.java:139)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.\_\_doRun(Fiber.java:961)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.\_doRun(Fiber.java:910)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.doRun(Fiber.java:873)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.runSync(Fiber.java:775)  
at [com.sun.xml.ws](http://com.sun.xml.ws).client.Stub.process(Stub.java:429)  
at [com.sun.xml.ws](http://com.sun.xml.ws).client.sei.SEIStub.doProcess(SEIStub.java:168)  
at [com.sun.xml.ws](http://com.sun.xml.ws).client.sei.SyncMethodHandler.invoke(SyncMethodHandler.java:119)  
at [com.sun.xml.ws](http://com.sun.xml.ws).client.sei.SyncMethodHandler.invoke(SyncMethodHandler.java:102)  
at [com.sun.xml.ws](http://com.sun.xml.ws).client.sei.SEIStub.invoke(SEIStub.java:151)  
at $Proxy2850.procesa(Unknown Source)  
at cat.aoc.siri.psis.CertificateValidator.valida(CertificateValidator.java:114)  
at cat.aoc.siri.auth.GenericAuthHandler.handleMessage(GenericAuthHandler.java:108)  
at [com.sun.xml.ws](http://com.sun.xml.ws).handler.HandlerProcessor.callHandleMessage(HandlerProcessor.java:289)  
at [com.sun.xml.ws](http://com.sun.xml.ws).handler.HandlerProcessor.callHandlersRequest(HandlerProcessor.java:140)  
at [com.sun.xml.ws](http://com.sun.xml.ws).handler.ServerSOAPHandlerTube.callHandlersOnRequest(ServerSOAPHandlerTube.java:138)  
at [com.sun.xml.ws](http://com.sun.xml.ws).handler.HandlerTube.processRequest(HandlerTube.java:127)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.\_\_doRun(Fiber.java:961)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.\_doRun(Fiber.java:910)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.doRun(Fiber.java:873)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.runSync(Fiber.java:775)

at [com.sun.xml.ws](http://com.sun.xml.ws).server.WSEndpointImpl$2.process(WSEndpointImpl.java:386)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.HttpAdapter$HttpToolkit.handle(HttpAdapter.java:640)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.HttpAdapter.handle(HttpAdapter.java:263)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.servlet.ServletAdapter.invokeAsync(ServletAdapter.java:218)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.servlet.WSServletDelegate.doGet(WSServletDelegate.java:159)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.servlet.WSServletDelegate.doPost(WSServletDelegate.java:194)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.servlet.WSServlet.doPost(WSServlet.java:80)  
at javax.servlet.http.HttpServlet.service(HttpServlet.java:637)  
at javax.servlet.http.HttpServlet.service(HttpServlet.java:717)  
at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:290)  
at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:206)  
at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:233)  
at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:191)  
at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:127)  
at com.googlecode.psiprobe.Tomcat60AgentValve.invoke(Tomcat60AgentValve.java:30)  
at org.apache.catalina.ha.session.JvmRouteBinderValve.invoke(JvmRouteBinderValve.java:227)  
at org.apache.catalina.ha.tcp.ReplicationValve.invoke(ReplicationValve.java:347)  
at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:103)  
at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:109)  
at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:293)  
at org.apache.jk.server.JkCoyoteHandler.invoke(JkCoyoteHandler.java:190)  
at org.apache.jk.common.HandlerRequest.invoke(HandlerRequest.java:311)  
at org.apache.jk.common.ChannelSocket.invoke(ChannelSocket.java:776)  
at org.apache.jk.common.ChannelSocket.processConnection(ChannelSocket.java:705)  
at org.apache.jk.common.ChannelSocket$SocketConnection.runIt(ChannelSocket.java:898)  
at org.apache.tomcat.util.threads.ThreadPool$ControlRunnable.run(ThreadPool.java:690)  
at java.lang.Thread.run(Thread.java:662)  
Caused by: [java.net](http://java.net).SocketTimeoutException: Read timed out  
at [java.net](http://java.net).SocketInputStream.socketRead0(Native Method)  
at [java.net](http://java.net).SocketInputStream.read(SocketInputStream.java:129)  
at [java.io](http://java.io).BufferedInputStream.fill(BufferedInputStream.java:218)  
at [java.io](http://java.io).BufferedInputStream.read1(BufferedInputStream.java:258)  
at [java.io](http://java.io).BufferedInputStream.read(BufferedInputStream.java:317)  
at [sun.net](http://sun.net).www.http.HttpClient.parseHTTPHeader(HttpClient.java:687)  
at [sun.net](http://sun.net).www.http.HttpClient.parseHTTP(HttpClient.java:632)  
at [sun.net](http://sun.net).www.protocol.http.HttpURLConnection.getInputStream(HttpURLConnection.java:1200)  
at [java.net](http://java.net).HttpURLConnection.getResponseCode(HttpURLConnection.java:379)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.client.HttpClientTransport.readResponseCodeAndMessage(HttpClientTransport.java:206)

... 51 more  
02 Oct 2019 08:06:41,260 INFO \[SIRI PROXY\] : Temps total de validació contra PSIS : 45495ms  
02 Oct 2019 08:06:41,265 WARN \[SIRI PROXY\] : Error en el procés d'autenticació. No s'ha pogut validar el certificat presentat degut a problemes tècnics.  
02 Oct 2019 08:06:41,266 DEBUG \[SIRI PROXY\] : cat.aoc.siri.auth.ssl.SSLAuthHandler : Temps total de validació : 45503ms

  

Error en el procés d'autorització. Organismes \[XXXXXXXXXX\] inactius

Aquest error es retorna quan els organismes no estan actius a nivell de SIRI.

Exemple d'error als logs

09 Dec 2019 00:40:50,855 ERROR \[SIRI PROXY\] : Error en el procés d'autorització. Petició no autoritzada. : per a la petició \[IdPeticion='RIhQReV3MpvsShh8'; IdentificadorSolicitante='4305090004'; IdSolicitanteOriginal=''; CodigoProducto='  
MUX'; CodigoCertificado='MUX\_DESCARREGA'; Finalidad='REGISTRE'; NumElementos='1'; NifFuncionario='null'; NombreCompletoFuncionario='null'; NumeroExpediente='null'; Frontal='Sincron';\]  
09 Dec 2019 01:05:02,135 ERROR \[SIRI PROXY\] : Error en el procés d'autorització. Organismes \[7007750006\] inactius. : per a la petició \[IdPeticion='CONV\_AYTOS7007750006\_5901043'; IdentificadorSolicitante='7007750006'; IdSolicitanteOrigina  
l=''; CodigoProducto='MUX'; CodigoCertificado='MUX\_CONSULTA'; Finalidad='REGISTRE'; NumElementos='1'; NifFuncionario='null'; NombreCompletoFuncionario='null'; NumeroExpediente='1'; Frontal='Sincron';\]  
09 Dec 2019 01:05:02,461 ERROR \[SIRI PROXY\] : Error en el procés d'autorització. Organismes \[7007750006\] inactius. : per a la petició \[IdPeticion='CONV\_AYTOS7007750006\_5901045'; IdentificadorSolicitante='7007750006'; IdSolicitanteOrigina  
l=''; CodigoProducto='MUX'; CodigoCertificado='MUX\_CONSULTA'; Finalidad='REGISTRE'; NumElementos='1'; NifFuncionario='null'; NombreCompletoFuncionario='null'; NumeroExpediente='1'; Frontal='Sincron';\]  
09 Dec 2019 01:05:03,093 ERROR \[SIRI PROXY\] : Error en el procés d'autorització. Organismes \[7007750006\] inactius. : per a la petició \[IdPeticion='CONV\_AYTOS7007750006\_5901049'; IdentificadorSolicitante='7007750006'; IdSolicitanteOrigina  
l=''; CodigoProducto='MUX'; CodigoCertificado='MUX\_CONSULTA'; Finalidad='REGISTRE'; NumElementos='1'; NifFuncionario='null'; NombreCompletoFuncionario='null'; NumeroExpediente='1'; Frontal='Sincron';\]  
09 Dec 2019 01:05:03,549 ERROR \[SIRI PROXY\] : Error en el procés d'autorització. Organismes \[7007750006\] inactius. : per a la petició \[IdPeticion='CONV\_AYTOS7007750006\_5901052'; IdentificadorSolicitante='7007750006'; IdSolicitanteOrigina  
l=''; CodigoProducto='MUX'; CodigoCertificado='MUX\_CONSULTA'; Finalidad='REGISTRE'; NumElementos='1'; NifFuncionario='null'; NombreCompletoFuncionario='null'; NumeroExpediente='1'; Frontal='Sincron';\]  
09 Dec 2019 01:05:04,133 ERROR \[SIRI PROXY\] : Error en el procés d'autorització. Organismes \[7007750006\] inactius. : per a la petició \[IdPeticion='CONV\_AYTOS7007750006\_5901056'; IdentificadorSolicitante='7007750006'; IdSolicitanteOrigina  
l=''; CodigoProducto='MUX'; CodigoCertificado='MUX\_CONSULTA'; Finalidad='REGISTRE'; NumElementos='1'; NifFuncionario='null'; NombreCompletoFuncionario='null'; NumeroExpediente='1'; Frontal='Sincron';\]  
09 Dec 2019 01:05:04,414 ERROR \[SIRI PROXY\] : Error en el procés d'autorització. Organismes \[7007750006\] inactius. : per a la petició \[IdPeticion='CONV\_AYTOS7007750006\_5901059'; IdentificadorSolicitante='7007750006'; IdSolicitanteOrigina  
l=''; CodigoProducto='MUX'; CodigoCertificado='MUX\_CONSULTA'; Finalidad='REGISTRE'; NumElementos='1'; NifFuncionario='null'; NombreCompletoFuncionario='null'; NumeroExpediente='1'; Frontal='Sincron';\]  
09 Dec 2019 01:05:04,696 ERROR \[SIRI PROXY\] : Error en el procés d'autorització. Organismes \[7007750006\] inactius. : per a la petició \[IdPeticion='CONV\_AYTOS7007750006\_5901061'; IdentificadorSolicitante='7007750006'; IdSolicitanteOrigina  
l=''; CodigoProducto='MUX'; CodigoCertificado='MUX\_CONSULTA'; Finalidad='REGISTRE'; NumElementos='1'; NifFuncionario='null'; NombreCompletoFuncionario='null'; NumeroExpediente='1'; Frontal='Sincron';\]  
09 Dec 2019 01:05:04,961 ERROR \[SIRI PROXY\] : Error en el procés d'autorització. Organismes \[7007750006\] inactius. : per a la petició \[IdPeticion='CONV\_AYTOS7007750006\_5901063'; IdentificadorSolicitante='7007750006'; IdSolicitanteOrigina  
l=''; CodigoProducto='MUX'; CodigoCertificado='MUX\_CONSULTA'; Finalidad='REGISTRE'; NumElementos='1'; NifFuncionario='null'; NombreCompletoFuncionario='null'; NumeroExpediente='1'; Frontal='Sincron';\]  
09 Dec 2019 01:05:05,860 ERROR \[SIRI PROXY\] : Error en el procés d'autorització. Organismes \[7007750006\] inactius. : per a la petició \[IdPeticion='CONV\_AYTOS7007750006\_5901068'; IdentificadorSolicitante='7007750006'; IdSolicitanteOrigina  
l=''; CodigoProducto='MUX'; CodigoCertificado='MUX\_CONSULTA'; Finalidad='REGISTRE'; NumElementos='1'; NifFuncionario='null'; NombreCompletoFuncionario='null'; NumeroExpediente='1'; Frontal='Sincron';\]  
09 Dec 2019 01:05:06,301 ERROR \[SIRI PROXY\] : Error en el procés d'autorització. Organismes \[7007750006\] inactius. : per a la petició \[IdPeticion='CONV\_AYTOS7007750006\_5901071'; IdentificadorSolicitante='7007750006'; IdSolicitanteOrigina  
l=''; CodigoProducto='MUX'; CodigoCertificado='MUX\_CONSULTA'; Finalidad='REGISTRE'; NumElementos='1'; NifFuncionario='null'; NombreCompletoFuncionario='null'; NumeroExpediente='1'; Frontal='Sincron';\]  
09 Dec 2019 01:05:06,724 ERROR \[SIRI PROXY\] : Error en el procés d'autorització. Organismes \[7007750006\] inactius. : per a la petició \[IdPeticion='CONV\_AYTOS7007750006\_5901074'; IdentificadorSolicitante='7007750006'; IdSolicitanteOrigina  
l=''; CodigoProducto='MUX'; CodigoCertificado='MUX\_CONSULTA'; Finalidad='REGISTRE'; NumElementos='1'; NifFuncionario='null'; NombreCompletoFuncionario='null'; NumeroExpediente='1'; Frontal='Sincron';\]  
09 Dec 2019 01:13:11,522 ERROR \[SIRI PROXY\] : S'ha produit un error invocant la MTI per a la petició IdPeticion='CONV\_AYTOS823620002\_5901248'; IdentificadorSolicitante='823620002'; IdSolicitanteOriginal=''; CodigoProducto='MUX'; CodigoCe  
rtificado='MUX\_CONSULTA'; Finalidad='REGISTRE'; NumElementos='1'; NifFuncionario='null'; NombreCompletoFuncionario='null'; NumeroExpediente='1'; Frontal='Sincron';

Podem comprovar si un organisme està actiu amb la següent query a BBDD (BBDD: ORA12, Esquema: SIRI):

**Comprovem si un ens està actiu**

select codi, nom, actiu from siri.aoc\_pci\_siri\_organisme
where codi ='XXXXXXXXXX' --INE10 de l'ens que obté l'error

Actiu = 0 ==> No està actiu

Actiu = 1 ==> Sí que està actiu

Si veiem que no està actiu i si que hauria d'estar-ho, podem fer l'update per la bbdd:

**Update per activar un ens**

update siri.aoc\_pci\_siri\_organisme
set actiu = 1
where codi ='XXXXXXXXXX' --INE10 de l'ens que obté l'error

Amb aquest canvi el problema hauria d'haver quedat resolt.

  

FP exemple: FP #316122

  

The creation time is ahead of current time

Aquest error es retorna quan el SIRI en llegir el TimeStamp veu una data futura a l'actual.

Exemple d'error als logs

20 Jan 2020 00:22:20,455 ERROR \[SIRI PROXY\] : WSS0227: **The creation time is ahead of current time**  
20 Jan 2020 00:22:20,455 ERROR \[SIRI PROXY\] : Error en el procés d'autenticació. WS-Security > {0}  
com.sun.xml.wss.impl.WssSoapFaultException: The creation time is ahead of the current time.  
at [com.sun.xml.ws](http://com.sun.xml.ws).security.opt.impl.util.SOAPUtil.newSOAPFaultException(SOAPUtil.java:161)  
at com.sun.xml.wss.impl.misc.DefaultSecurityEnvironmentImpl.defaultValidateCreationTime(DefaultSecurityEnvironmentImpl.java:1090)  
at com.sun.xml.wss.impl.misc.DefaultSecurityEnvironmentImpl.validateTimestamp(DefaultSecurityEnvironmentImpl.java:1238)  
at com.sun.xml.wss.impl.misc.DefaultSecurityEnvironmentImpl.validateTimestamp(DefaultSecurityEnvironmentImpl.java:1206)  
at com.sun.xml.wss.impl.filter.TimestampFilter.process(TimestampFilter.java:238)  
at com.sun.xml.wss.impl.HarnessUtil.processWSSPolicy(HarnessUtil.java:103)  
at com.sun.xml.wss.impl.HarnessUtil.processDeep(HarnessUtil.java:278)  
at com.sun.xml.wss.impl.SecurityRecipient.processMessagePolicy(SecurityRecipient.java:1034)  
at com.sun.xml.wss.impl.SecurityRecipient.processMessagePolicy(SecurityRecipient.java:822)  
at com.sun.xml.wss.impl.SecurityRecipient.validateMessage(SecurityRecipient.java:261)  
at com.sun.xml.wss.impl.misc.XWSSProcessor2\_0Impl.verifyInboundMessage(XWSSProcessor2\_0Impl.java:156)  
at cat.aoc.siri.auth.soap.SOAPAuthHandler.extractCredentials(SOAPAuthHandler.java:69)  
at cat.aoc.siri.auth.GenericAuthHandler.handleMessage(GenericAuthHandler.java:91)  
at [com.sun.xml.ws](http://com.sun.xml.ws).handler.HandlerProcessor.callHandleMessage(HandlerProcessor.java:289)  
at [com.sun.xml.ws](http://com.sun.xml.ws).handler.HandlerProcessor.callHandlersRequest(HandlerProcessor.java:140)  
at [com.sun.xml.ws](http://com.sun.xml.ws).handler.ServerSOAPHandlerTube.callHandlersOnRequest(ServerSOAPHandlerTube.java:138)  
at [com.sun.xml.ws](http://com.sun.xml.ws).handler.HandlerTube.processRequest(HandlerTube.java:127)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.\_\_doRun(Fiber.java:961)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.\_doRun(Fiber.java:910)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.doRun(Fiber.java:873)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.runSync(Fiber.java:775)  
at [com.sun.xml.ws](http://com.sun.xml.ws).server.WSEndpointImpl$2.process(WSEndpointImpl.java:386)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.HttpAdapter$HttpToolkit.handle(HttpAdapter.java:640)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.HttpAdapter.handle(HttpAdapter.java:263)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.servlet.ServletAdapter.invokeAsync(ServletAdapter.java:218)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.servlet.WSServletDelegate.doGet(WSServletDelegate.java:159)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.servlet.WSServletDelegate.doPost(WSServletDelegate.java:194)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.servlet.WSServlet.doPost(WSServlet.java:80)  
at javax.servlet.http.HttpServlet.service(HttpServlet.java:637)  
at javax.servlet.http.HttpServlet.service(HttpServlet.java:717)  
at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:290)  
at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.j

Podem comparar la data informada en l'XML al tag TimeStamp amb la data en què s'escriuen els logs i veure si efectivament la primera és més gran que la segona.

En cas que sigui així, informar a l'ens del problema per tal que ho revisin. Són ells els que generen el XML.

FP Exemple: 320629

  

Error en el procés d'autorització. No s'ha pogut recuperar cap certificat de la petició.

Aquest error es retorna quan el SIRI quan es realitza un consum per MTOM amb connexió SSL i no s'està realitzant correctament.

Exemple d'error als logs

  

Id de petició             : CSUC202001291419536792953

Codi d'organisme          : 812130008

Codi d'organisme original : 812130008

Codi de producte          : PSCP

Codi de modalitat         : PSCP

Codi de finalitat         : PROVES

Num. sol·licituds         : 1

Nif funcionari            : null

Nom funcionari            : null

Numero expedient          : null

Frontal                   : Sincron

\---------------------------------------------------------

29 Jan 2020 14:19:54,313 INFO  \[SIRI PROXY\] : Validació d'schema de petició requerida...

29 Jan 2020 14:19:54,320 INFO  \[SIRI PROXY\] : La petició compleix l'schema!

29 Jan 2020 14:19:54,508 ERROR \[SIRI PROXY\] : Error en el procés d'autorització. No s'ha pogut recuperar cap certificat de la petició. : per a la petició \[IdPeticion='CSUC202001291419536792953'; IdentificadorSolicitante='812130008'; IdSolicitanteOriginal='812130008'; CodigoProducto='PSCP'; CodigoCertificado='PSCP'; Finalidad='PROVES'; NumElementos='1'; NifFuncionario='null'; NombreCompletoFuncionario='null'; NumeroExpediente='null'; Frontal='Sincron';\]

29 Jan 2020 14:19:54,518 DEBUG \[SIRI PROXY\] : Temps total verificació de l'estat d'autorització : 208ms

En aquest cas comentar amb l'usuari que es tracta d'un error de SSL segurament, que per la nostra banda tenim tot correctament configurat i que validim amb el client Java que tenim, ja que així si que funciona i comparin amb el que ells tenen.

FP Exemple: 318334

Petició no autoritzada.

Aquest error es retorna quan l'entitat en qüestió no té activa l'autorització al SIRI.

**Exemple d'error als logs:**

25 Oct 2020 10:54:04,259 ERROR \[SIRI PROXY\] : Error en el procés d'autorització. Petició no autoritzada. : per a la petició \[IdPeticion='4303854019\_INEM\_6268831'; Ident
ificadorSolicitante='4303854019'; IdSolicitanteOriginal='4303854019'; CodigoProducto='INEM'; CodigoCertificado='VERIF\_IMPORTS\_ACTUALS'; Finalidad='2883'; NumElementos='
1'; NifFuncionario='44998640Z'; NombreCompletoFuncionario='Vanessa Jiménez Rebollo'; NumeroExpediente='TM 55020 2020'; Frontal='Sincron';\]

Amb la query següent podem veure si l'entitat té activa l'autorització:

**Query autoritzacions actives.**

\-- Mirem si tenen autorització
SELECT o.codi, o.nom, 
       p.NOM  as NOM\_PRODUCTE,
       p.CODI as CODI\_PRODUCTE,
       m.NOM  as NOM\_MODALITAT,
       m.CODI as CODI\_MODALITAT,
       f.NOM  as NOM\_FINALITAT,
       f.CODI as CODI\_FINALITAT,
       p.actiu as ACTIU\_PRODUCTE,
       m.activa as ACTIU\_MODALITAT,
       f.activa as ACTIU\_FINALITAT,
       a.actiu as AUTORITZACIO,
       a.data\_alta
  FROM SIRI.AOC\_PCI\_SIRI\_AUTORITZACIO a,
       SIRI.AOC\_PCI\_SIRI\_ORGANISME    o,
       SIRI.AOC\_PCI\_SIRI\_PRODUCTE     p,
       SIRI.AOC\_PCI\_SIRI\_MODALITAT    m,
       SIRI.AOC\_PCI\_SIRI\_FINALITAT    f
WHERE a.ID\_ORGANISME = o.ID
   AND a.ID\_MODALITAT = m.ID
   AND a.ID\_FINALITAT = f.ID
   AND m.ID\_PRODUCTE = p.ID
   --AND o.codi='7976100028'
   --AND f.codi ='AJUTSUBV'
   AND p.codi = 'CDOMICILI'
   --AND p.codi LIKE '%IMSERSO%'
   --AND f.codi='PROVES'
   --and o.nom LIKE '%Cadastre%'
   --AND f.codi ='2883'
   order by a.data\_alta desc

No s'ha pogut recuperar cap certificat de client per a la connexió SSL. Verifiqueu que en disposeu dun correctament configurat

Aquest error és perquè l'Ens no envia cap tipus de credencial SSL ni WSS. Al ser per SSL segurament sigui un consum MTOM i en aquest no es signen les peticions, s'envia el certificat per realitzar la connexió

En cas de consumir els serveis que requereixen funcionalitats de transferència de fitxers via MTOM, les peticions no s’han de signar seguint l’estàndard WS-Security. En aquest cas, la política d’autenticació es realitza presentant el certificat a l’hora d’establir el canal HTTPS. Anàlogament al cas anterior, el certificat a presentar ha de ser vàlid i ha d’estar autoritzat a la plataforma PCI (pot ser el mateix que s’usa per signar les peticions WSSecurity en les integracions que no requereixen del suport MTOM d’enviament de fitxers adjunts).

Amb la següent query podem revisar quins certificats tenim a la base de dades:

**Query certificats carregats**

\-- Buscar certificats carregats per INE10

Select \* from siri.aoc\_pci\_siri\_autenticacio aa
Where aa.codi\_ens = 'XXXXXXXX'

-- Buscar certificat per número de sèrie

Select \* from siri.aoc\_pci\_siri\_autenticacio aa
Where aa.valor = 'XXXXXXXX'

Exemple de capçaleres de seguretat a la petició XML

Si ens adjunten els XML amb les capçaleres de seguretat, podem extreure el certificat a través del següent camp del XML al final:

**![](attachments/28705167/61931614.png)**

**Trobarem el certificat al final d'aquest camp**

<wsse:BinarySecurityToken ValueType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3" EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" wsu:Id="SecurityToken-19a367e6-6ae2-4d89-97f3-0c55e4e446fd">MIIIHDCCBwSgAwIBAgIIU6r05yaBZTYwDQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYTAkVTMTMwMQYDVQQKDCpDT05TT1JDSSBBRE1JTklTVFJBQ0lPIE9CRVJUQSBERSBDQVRBTFVOWUExKjAoBgNVBAsMIVNlcnZlaXMgUMO6YmxpY3MgZGUgQ2VydGlmaWNhY2nDszEYMBYGA1UEAwwPRUMtU2VjdG9yUHVibGljMB4XDTE5MDIxNTExNDk0OFoXDTIyMDIxNDExNDk0OFowgf0xCzAJBgNVBAYTAkVTMSIwIAYDVQQKDBlBanVudGFtZW50IGRlIFZpbGFibGFyZWl4MRgwFgYDVQRhDA9WQVRFUy1QMTcyMjkwMEYxNDAyBgNVBAsMK0NlcnRpZmljYXQgZGUgc2VnZWxsIGVsZWN0csOybmljIG5pdmVsbCBtaWcxJzAlBgNVBAQMHlZpbGFsdGEgQ29kb255IC0gRE5JIDQwMjk5NTU4UTEOMAwGA1UEKgwFSmF1bWUxEjAQBgNVBAUTCVAxNzIyOTAwRjEtMCsGA1UEAwwkU2VydmVpcyBFbGVjdHLDsm5pY3MgZGUgbCdBanVudGFtZW50MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz8O0IYOtRXq1HHlepoGbe6VlDqRaUrL4gVQeT+NaeBWO5n+dyV+LehaNRRfHsp4ovTqaqJPhUQFf+xIJ60nDWAjPF4GLLh9gWicGn9s0/2/XJyZmOT7Ru1DFuo/QKcu36bVC1H449vmdFhnxEMjqBCrQ5rrWTJQD4sX1E2nitCyE7/1vPb7CFYxyVqOo+PHWJfUUOg7eCin669zGu6AD/edfzm9ERClyu2UahuqeNoJEtIdKn7BvGNvXoetgZHhBKZNl3rAyR0tDOevvuiWCz6iKLLGs7Xj51D7WS63hIFVG9ljBc/pxs6OJkoVqd6+VCMlNNa//OpYNxNO0rhE4HwIDAQABo4IEETCCBA0wdgYIKwYBBQUHAQEEajBoMEEGCCsGAQUFBzAChjVodHRwOi8vd3d3LmNhdGNlcnQuY2F0L2Rlc2NhcnJlZ2EvZWMtc2VjdG9ycHVibGljLmNydDAjBggrBgEFBQcwAYYXaHR0cDovL29jc3AuY2F0Y2VydC5jYXQwHQYDVR0OBBYEFMtTADfQljk/gLuky9fq5hP6GQVeMAwGA1UdEwEB/wQCMAAwHwYDVR0jBBgwFoAURzzeFHe7ak9HkakC/9QG4XPc4tkwcAYIKwYBBQUHAQMEZDBiMAgGBgQAjkYBATALBgYEAI5GAQMCAQ8wEwYGBACORgEGMAkGBwQAjkYBBgIwNAYGBACORgEFMCowKBYiaHR0cHM6Ly93d3cuYW9jLmNhdC9jYXRjZXJ0L3Bkc19lbhMCZW4wge0GA1UdIASB5TCB4jCByAYMKwYBBAH1eAEDAgYCMIG3MDEGCCsGAQUFBwIBFiVodHRwczovL3d3dy5hb2MuY2F0L0NBVENlcnQvUmVndWxhY2lvMIGBBggrBgEFBQcCAjB1DHNDZXJ0aWZpY2F0IGRlIHNlZ2VsbCBlbGVjdHLDsm5pYyBuaXZlbGwgbWlnLiBBZHJlw6dhIGkgTklGIGRlbCBwcmVzdGFkb3I6IFZpYSBMYWlldGFuYSAyNiAwODAwMyBCYXJjZWxvbmEgUTA4MDExNzVBMAoGCGCFVAEDBQYCMAkGBwQAi+xAAQEwQQYDVR0fBDowODA2oDSgMoYwaHR0cDovL2Vwc2NkLmNhdGNlcnQubmV0L2NybC9lYy1zZWN0b3JwdWJsaWMuY3JsMA4GA1UdDwEB/wQEAwIF4DAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwQwggFvBgNVHREEggFmMIIBYoEbdmlsYWJsYXJlaXhAdmlsYWJsYXJlaXguY2F0pIIBQTCCAT0xOjA4BglghVQBAwUGAgEMK0NlcnRpZmljYXQgZGUgc2VnZWxsIGVsZWN0csOybmljIG5pdmVsbCBtaWcxKDAmBglghVQBAwUGAgIMGUFqdW50YW1lbnQgZGUgVmlsYWJsYXJlaXgxGDAWBglghVQBAwUGAgMMCVAxNzIyOTAwRjEYMBYGCWCFVAEDBQYCBAwJNDAyOTk1NThRMTMwMQYJYIVUAQMFBgIFDCRTZXJ2ZWlzIEVsZWN0csOybmljcyBkZSBsJ0FqdW50YW1lbnQxFDASBglghVQBAwUGAgYMBUphdW1lMRYwFAYJYIVUAQMFBgIHDAdWaWxhbHRhMRUwEwYJYIVUAQMFBgIIDAZDb2RvbnkxJzAlBglghVQBAwUGAgkMGGp2aWxhbHRhQHZpbGFibGFyZWl4LmNhdDANBgkqhkiG9w0BAQsFAAOCAQEAfkeL/w65LbaCDfQ4cqbp3QRAZ69NxauDh5Ez2kVmpvu+Q/JfkCQ5CoGG2UlktQlDYpsKVXOl4HNqlMZnIxdjb0ahECen4ArPCAQh53OYiu4WiFAVY7izgLbrpeK2+3ms+g7SXWjxuvNvNRhJ15pDyNlvfAISCUKA6tS6A8hXlEnBSAc5eP0SOffkHiCbnDsfWtBCoEf1HEra3DNA8hv8rHXz3FVwDAhvJTbCZPqSwOVi5HN1xo6TP1mZ3N7gP0HXfWdsP7Ugwd8DG5hp7dQiqXUOO13to7L09DhjANQSu+m4VxNnj2HzmNGIPXbHJRlUnrqifJfap5TuB4AxuIg3Ow==</wsse:BinarySecurityToken>

Ho passem a un altra fulla del editor de text i ho guardem com .crt o .cer. Així podrem veure amb quin certificat firmen les peticions XML.

En aquest cas, hem d'indicar a l'usuari que per la nostra part està tot correctament configurat i que revisin si estan signant correctament les peticions XML.

Missatge tipus:

Bon dia,

L'error **No s'ha pogut recuperar cap certificat de client per a la connexió SSL. Verifiqueu que en disposeu dun correctament configurat** ve precedit perquè no s'estan firmant correctament les peticions XML. Això provoca que els nostres sistemes no puguin recuperar el vostre CDA i comprovar si està configurat als nostres sistemes.

Podríeu comprovar si esteu signant correctament les peticions XML i tornar a provar, si us plau?

Per la nostra banda està tot bé configurat. Us adjuntem FAQ on trobareu el client java per realitzar proves, ja que com us hem indicat, l'error és perquè no s'està firmant correctament les peticions XML.

[https://suport-integradors.aoc.cat/hc/ca/articles/7352984409757-Documentaci%C3%B3-gen%C3%A8rica-per-a-integrar-se-a-la-PCI](https://suport-integradors.aoc.cat/hc/ca/articles/7352984409757-Documentaci%C3%B3-gen%C3%A8rica-per-a-integrar-se-a-la-PCI)

Moltes gràcies i salutacions cordials.

.rwui\_text\_box.rwui\_id\_406bb4d5-0ddf-493c-b7e9-fbbab973db9a {background-color: #E2F0F9; color: #305F7A;}.rwui\_text\_box.rwui\_id\_406bb4d5-0ddf-493c-b7e9-fbbab973db9a \*:not(.rwui\_content) {color: #305F7A;}.rwui\_text\_box.rwui\_id\_406bb4d5-0ddf-493c-b7e9-fbbab973db9a span.rwui\_icon {color: #305F7A;}

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2021-9-15\_15-0-27.png](attachments/28705167/61931614.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:00

[Atlassian](http://www.atlassian.com/)