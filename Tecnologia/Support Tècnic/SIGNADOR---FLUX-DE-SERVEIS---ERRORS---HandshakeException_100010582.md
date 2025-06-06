Suport Tècnic : SIGNADOR - FLUX DE SERVEIS - ERRORS - HandshakeException  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [02 - FAQ's serveis](26313393.md)
4.  [FAQ's SIGNADOR](30867480.md)
5.  [SIGNADOR - FLUX DEL SERVEI - ERRORS - Errors comuns al signar](SIGNADOR---FLUX-DEL-SERVEI---ERRORS---Errors-comuns-al-signar_41519394.md)

Suport Tècnic : SIGNADOR - FLUX DE SERVEIS - ERRORS - HandshakeException
========================================================================

Created by OTEC ST Robert Font Rubí, last modified by Joan Riquelme on 17 January 2025

  

**Als logs podem trobar la següent traça:  
  
** INFO LoggingConfig : **Caused by: [javax.net](http://javax.net).ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target**

  

**Exemple de traça d'error completa** Expand source

17 de gen. 2025 12:13:37,820 INFO  LoggingConfig  : javax.net.ssl.SSLHandshakeException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
17 de gen. 2025 12:13:37,820 INFO  LoggingConfig  : 	at sun.security.ssl.Alert.createSSLException(Alert.java:131)
17 de gen. 2025 12:13:37,820 INFO  LoggingConfig  : 	at sun.security.ssl.TransportContext.fatal(TransportContext.java:324)
17 de gen. 2025 12:13:37,820 INFO  LoggingConfig  : 	at sun.security.ssl.TransportContext.fatal(TransportContext.java:267)
17 de gen. 2025 12:13:37,820 INFO  LoggingConfig  : 	at sun.security.ssl.TransportContext.fatal(TransportContext.java:262)
17 de gen. 2025 12:13:37,820 INFO  LoggingConfig  : 	at sun.security.ssl.CertificateMessage$T12CertificateConsumer.checkServerCerts(CertificateMessage.java:654)
17 de gen. 2025 12:13:37,820 INFO  LoggingConfig  : 	at sun.security.ssl.CertificateMessage$T12CertificateConsumer.onCertificate(CertificateMessage.java:473)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at sun.security.ssl.CertificateMessage$T12CertificateConsumer.consume(CertificateMessage.java:369)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at sun.security.ssl.SSLHandshake.consume(SSLHandshake.java:377)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at sun.security.ssl.HandshakeContext.dispatch(HandshakeContext.java:444)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at sun.security.ssl.HandshakeContext.dispatch(HandshakeContext.java:422)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at sun.security.ssl.TransportContext.dispatch(TransportContext.java:182)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at sun.security.ssl.SSLTransport.decode(SSLTransport.java:152)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at sun.security.ssl.SSLSocketImpl.decode(SSLSocketImpl.java:1392)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at sun.security.ssl.SSLSocketImpl.readHandshakeRecord(SSLSocketImpl.java:1300)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at sun.security.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:435)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at sun.net.www.protocol.https.HttpsClient.afterConnect(HttpsClient.java:559)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at sun.net.www.protocol.https.AbstractDelegateHttpsURLConnection.connect(AbstractDelegateHttpsURLConnection.java:197)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at sun.net.www.protocol.http.HttpURLConnection.getOutputStream0(HttpURLConnection.java:1340)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at sun.net.www.protocol.http.HttpURLConnection.getOutputStream(HttpURLConnection.java:1315)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at sun.net.www.protocol.https.HttpsURLConnectionImpl.getOutputStream(HttpsURLConnectionImpl.java:264)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at org.catcert.net.HTTPSender.postMethod(HTTPSender.java:89)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at cat.aoc.signador.AplicacioSignatura.call(AplicacioSignatura.java:1719)
17 de gen. 2025 12:13:37,821 INFO  LoggingConfig  : 	at cat.aoc.signador.AplicacioSignatura.javascriptSignOK(AplicacioSignatura.java:1689)
17 de gen. 2025 12:13:37,822 INFO  LoggingConfig  : 	at cat.aoc.signador.AplicacioSignatura.javascript(AplicacioSignatura.java:1627)
17 de gen. 2025 12:13:37,822 INFO  LoggingConfig  : 	at cat.aoc.signador.AplicacioSignatura.getJSSignature(AplicacioSignatura.java:1405)
17 de gen. 2025 12:13:37,822 INFO  LoggingConfig  : 	at cat.aoc.signador.AplicacioSignatura.sign(AplicacioSignatura.java:700)
17 de gen. 2025 12:13:37,822 INFO  LoggingConfig  : 	at cat.aoc.signador.AplicacioSignatura.initProces(AplicacioSignatura.java:444)
17 de gen. 2025 12:13:37,822 INFO  LoggingConfig  : 	at cat.aoc.signador.AplicacioSignatura.signFromJS(AplicacioSignatura.java:346)
17 de gen. 2025 12:13:37,822 INFO  LoggingConfig  : 	at cat.aoc.app.rest.controllers.SignatureService.signature(SignatureService.java:61)
17 de gen. 2025 12:13:37,822 INFO  LoggingConfig  : 	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
17 de gen. 2025 12:13:37,822 INFO  LoggingConfig  : 	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
17 de gen. 2025 12:13:37,822 INFO  LoggingConfig  : 	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
17 de gen. 2025 12:13:37,822 INFO  LoggingConfig  : 	at java.lang.reflect.Method.invoke(Method.java:498)
17 de gen. 2025 12:13:37,822 INFO  LoggingConfig  : 	at com.sun.jersey.spi.container.JavaMethodInvokerFactory$1.invoke(JavaMethodInvokerFactory.java:60)
17 de gen. 2025 12:13:37,822 INFO  LoggingConfig  : 	at com.sun.jersey.server.impl.model.method.dispatch.AbstractResourceMethodDispatchProvider$ResponseOutInvoker.\_dispatch(AbstractResourceMethodDispatchProvider.java:205)
17 de gen. 2025 12:13:37,822 INFO  LoggingConfig  : 	at com.sun.jersey.server.impl.model.method.dispatch.ResourceJavaMethodDispatcher.dispatch(ResourceJavaMethodDispatcher.java:75)
17 de gen. 2025 12:13:37,822 INFO  LoggingConfig  : 	at com.sun.jersey.server.impl.uri.rules.HttpMethodRule.accept(HttpMethodRule.java:302)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at com.sun.jersey.server.impl.uri.rules.ResourceClassRule.accept(ResourceClassRule.java:108)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at com.sun.jersey.server.impl.uri.rules.RightHandPathRule.accept(RightHandPathRule.java:147)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at com.sun.jersey.server.impl.uri.rules.RootResourceClassesRule.accept(RootResourceClassesRule.java:84)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at com.sun.jersey.server.impl.application.WebApplicationImpl.\_handleRequest(WebApplicationImpl.java:1542)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at com.sun.jersey.server.impl.application.WebApplicationImpl.\_handleRequest(WebApplicationImpl.java:1473)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at com.sun.jersey.server.impl.application.WebApplicationImpl.handleRequest(WebApplicationImpl.java:1419)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at com.sun.jersey.server.impl.application.WebApplicationImpl.handleRequest(WebApplicationImpl.java:1409)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at com.sun.jersey.spi.container.servlet.WebComponent.service(WebComponent.java:409)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at com.sun.jersey.spi.container.servlet.ServletContainer.service(ServletContainer.java:558)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at com.sun.jersey.spi.container.servlet.ServletContainer.service(ServletContainer.java:733)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at javax.servlet.http.HttpServlet.service(HttpServlet.java:790)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at org.eclipse.jetty.servlet.ServletHolder.handle(ServletHolder.java:808)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at org.eclipse.jetty.servlet.ServletHandler.doHandle(ServletHandler.java:587)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at org.eclipse.jetty.server.session.SessionHandler.doHandle(SessionHandler.java:221)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at org.eclipse.jetty.server.handler.ContextHandler.doHandle(ContextHandler.java:1127)
17 de gen. 2025 12:13:37,823 INFO  LoggingConfig  : 	at org.eclipse.jetty.servlet.ServletHandler.doScope(ServletHandler.java:515)
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : 	at org.eclipse.jetty.server.session.SessionHandler.doScope(SessionHandler.java:185)
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : 	at org.eclipse.jetty.server.handler.ContextHandler.doScope(ContextHandler.java:1061)
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : 	at org.eclipse.jetty.server.handler.ScopedHandler.handle(ScopedHandler.java:141)
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : 	at org.eclipse.jetty.server.handler.HandlerWrapper.handle(HandlerWrapper.java:97)
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : 	at org.eclipse.jetty.server.Server.handle(Server.java:497)
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : 	at org.eclipse.jetty.server.HttpChannel.handle(HttpChannel.java:310)
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : 	at org.eclipse.jetty.server.HttpConnection.onFillable(HttpConnection.java:257)
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : 	at org.eclipse.jetty.io.AbstractConnection$2.run(AbstractConnection.java:540)
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : 	at org.eclipse.jetty.util.thread.QueuedThreadPool.runJob(QueuedThreadPool.java:635)
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : 	at org.eclipse.jetty.util.thread.QueuedThreadPool$3.run(QueuedThreadPool.java:555)
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : 	at java.lang.Thread.run(Thread.java:748)
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : Caused by: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : 	at sun.security.validator.PKIXValidator.doBuild(PKIXValidator.java:456)
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : 	at sun.security.validator.PKIXValidator.engineValidate(PKIXValidator.java:323)
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : 	at sun.security.validator.Validator.validate(Validator.java:271)
17 de gen. 2025 12:13:37,824 INFO  LoggingConfig  : 	at sun.security.ssl.X509TrustManagerImpl.validate(X509TrustManagerImpl.java:315)
17 de gen. 2025 12:13:37,825 INFO  LoggingConfig  : 	at sun.security.ssl.X509TrustManagerImpl.checkTrusted(X509TrustManagerImpl.java:223)
17 de gen. 2025 12:13:37,825 INFO  LoggingConfig  : 	at sun.security.ssl.X509TrustManagerImpl.checkServerTrusted(X509TrustManagerImpl.java:129)
17 de gen. 2025 12:13:37,825 INFO  LoggingConfig  : 	at sun.security.ssl.CertificateMessage$T12CertificateConsumer.checkServerCerts(CertificateMessage.java:638)
17 de gen. 2025 12:13:37,825 INFO  LoggingConfig  : 	... 59 more
17 de gen. 2025 12:13:37,825 INFO  LoggingConfig  : Caused by: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
17 de gen. 2025 12:13:37,825 INFO  LoggingConfig  : 	at sun.security.provider.certpath.SunCertPathBuilder.build(SunCertPathBuilder.java:141)
17 de gen. 2025 12:13:37,825 INFO  LoggingConfig  : 	at sun.security.provider.certpath.SunCertPathBuilder.engineBuild(SunCertPathBuilder.java:126)
17 de gen. 2025 12:13:37,825 INFO  LoggingConfig  : 	at java.security.cert.CertPathBuilder.build(CertPathBuilder.java:280)
17 de gen. 2025 12:13:37,825 INFO  LoggingConfig  : 	at sun.security.validator.PKIXValidator.doBuild(PKIXValidator.java:451)
17 de gen. 2025 12:13:37,825 INFO  LoggingConfig  : 	... 65 more
17 de gen. 2025 12:13:37,825 INFO  LoggingConfig  : org.catcert.net.HTTPSenderException: javax.net.ssl.SSLHandshakeException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
17 de gen. 2025 12:13:37,825 INFO  LoggingConfig  : 	at org.catcert.net.HTTPSender.postMethod(HTTPSender.java:125)
17 de gen. 2025 12:13:37,825 INFO  LoggingConfig  : 	at cat.aoc.signador.AplicacioSignatura.call(AplicacioSignatura.java:1719)
17 de gen. 2025 12:13:37,826 INFO  LoggingConfig  : 	at cat.aoc.signador.AplicacioSignatura.javascriptSignOK(AplicacioSignatura.java:1689)
17 de gen. 2025 12:13:37,826 INFO  LoggingConfig  : 	at cat.aoc.signador.AplicacioSignatura.javascript(AplicacioSignatura.java:1627)
17 de gen. 2025 12:13:37,826 INFO  LoggingConfig  : 	at cat.aoc.signador.AplicacioSignatura.getJSSignature(AplicacioSignatura.java:1405)
17 de gen. 2025 12:13:37,826 INFO  LoggingConfig  : 	at cat.aoc.signador.AplicacioSignatura.sign(AplicacioSignatura.java:700)

Solució:
========

Per resoldre aquest problema cal que carreguem les arrels del certificat amb què vol signar al cacerts de JAVA.

Per fer-ho:

##### 1 - Accedim al gestor de certificats per exportar les arrels del certificat amb què vols signar:

![](attachments/100010582/118555100.png)

Certificados → Seleccionem el certificat amb què vol signar → Anem a "_Ruta de certificación_" i fem clic a l'arrel 2 (en aquest cas Sector Públic) → Ver vertificado, per obrir-lo → Detalles → Copiar en archivo → Exportem la part pública en algun lloc que tinguem a mà després.

  

##### 2 - Importar la part pública de les arrels al cacerts de JAVA.

Accedim al cacerts de java (Típicament: _C:\\Program Files (x86)\\Java\\jre1.8.0\_431\\lib\\security\\cacerts_).

L'obrim amb algun programa que ho permeti, per exemple KeystoreExplorer. La password sol ser _changeit_.

Arrosseguem el certificat que hem guardat en el pas anterior a dins del cacerts perquè hi confiï i guardem.

  

Seguint aquests passos el problema hauria d'haver quedat resolt.

  

  

Exemple de ticket ZD: [https://aoccat.zendesk.com/agent/tickets/239083](https://aoccat.zendesk.com/agent/tickets/239083)

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2025-1-17\_14-54-43.png](attachments/100010582/118555100.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:59

[Atlassian](http://www.atlassian.com/)