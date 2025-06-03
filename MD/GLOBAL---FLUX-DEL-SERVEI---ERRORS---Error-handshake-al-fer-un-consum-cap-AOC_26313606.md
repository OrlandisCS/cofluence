Suport Tècnic : GLOBAL - FLUX DEL SERVEI - ERRORS - Error handshake al fer un consum cap AOC  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [02 - FAQ's serveis](26313393.html)
4.  [FAQ's Global](28705585.html)

Suport Tècnic : GLOBAL - FLUX DEL SERVEI - ERRORS - Error handshake al fer un consum cap AOC
============================================================================================

Created by Unknown User (cmoralea), last modified by Unknown User (oteccmorales) on 09 March 2021

L'error de handshake és un error de confiança entre servidors. Es pot donar per diverses casuístiques

Step-by-step guide
------------------

Quan ens traslladen un error de handshake a l'hora de fer un consum cap a l'AOC, l'usuari ha de tenir configurades les arrels de l'AOC (informació que adjuntem per exemple en les [altes del MUX](26313555.html)) en el seu trustore de PRE i PRO.

1.  Accions a realitzar:  
    1.  Compilar la classe en el servidor (
        
        [SSLPoke.java](attachments/26313606/30868408.java)
        
        )
    2.  executar la següent comanda:  
          
        
        java SSLPoke serveis-pre.iop.aoc.cat 443
        
2.  Si no està instal·lat cap certificat en la JDK, surt un error:
    
    C:\\Feina\\Dades\\PCI>java SSLPoke serveis-pre.iop.aoc.cat 443
    javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
            at sun.security.ssl.Alerts.getSSLException(Unknown Source)
            at sun.security.ssl.SSLSocketImpl.fatal(Unknown Source)
            at sun.security.ssl.Handshaker.fatalSE(Unknown Source)
            at sun.security.ssl.Handshaker.fatalSE(Unknown Source)
            at sun.security.ssl.ClientHandshaker.serverCertificate(Unknown Source)
            at sun.security.ssl.ClientHandshaker.processMessage(Unknown Source)
            at sun.security.ssl.Handshaker.processLoop(Unknown Source)
            at sun.security.ssl.Handshaker.process\_record(Unknown Source)
            at sun.security.ssl.SSLSocketImpl.readRecord(Unknown Source)
            at sun.security.ssl.SSLSocketImpl.performInitialHandshake(Unknown Source)
            at sun.security.ssl.SSLSocketImpl.writeRecord(Unknown Source)
            at sun.security.ssl.AppOutputStream.write(Unknown Source)
            at sun.security.ssl.AppOutputStream.write(Unknown Source)
            at SSLPoke.main(SSLPoke.java:23)
    Caused by: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
            at sun.security.validator.PKIXValidator.doBuild(Unknown Source)
            at sun.security.validator.PKIXValidator.engineValidate(Unknown Source)
            at sun.security.validator.Validator.validate(Unknown Source)
            at sun.security.ssl.X509TrustManagerImpl.validate(Unknown Source)
            at sun.security.ssl.X509TrustManagerImpl.checkTrusted(Unknown Source)
            at sun.security.ssl.X509TrustManagerImpl.checkServerTrusted(Unknown Source)
            ... 10 more
    Caused by: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
            at sun.security.provider.certpath.SunCertPathBuilder.build(Unknown Source)
            at sun.security.provider.certpath.SunCertPathBuilder.engineBuild(Unknown Source)
            at java.security.cert.CertPathBuilder.build(Unknown Source)
            ... 16 more
    
3.  En un servidor on tenim les arrels instal·lades:
    
    root@integracio02:/tmp# java SSLPoke serveis-pre.iop.aoc.cat 443
    Successfully connected
    
      
    
4.  Si en el servidor el resultat és correcte, que es faci un reinici perquè quedi correctament els certificats instal·lats.
5.  En cas d'error, és perquè no està indicat correctament el certificat en el fitxer on es troben els certificats de confiança.

Missatge tipus:

Per saber si està tot correcte des del vostre servidor, podeu realitzar la següent prova.

  

Us adjunto una classe que només cal compilar en el vostre servidor.

  

Un cop compilada només cal executar la següent comanda:

  

java SSLPoke serveis-pre.iop.aoc.cat 443

  

Jo he pogut testejar-ho.

  

En el meu ordinador en local no tinc cap certificat instal·lat en la jdk i m'apareix el següent error:

  

C:\\Feina\\Dades\\PCI>java SSLPoke serveis-pre.iop.aoc.cat 443  
[javax.net](http://javax.net).ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target  
        at sun.security.ssl.Alerts.getSSLException(Unknown Source)  
        at sun.security.ssl.SSLSocketImpl.fatal(Unknown Source)  
        at sun.security.ssl.Handshaker.fatalSE(Unknown Source)  
        at sun.security.ssl.Handshaker.fatalSE(Unknown Source)  
        at sun.security.ssl.ClientHandshaker.serverCertificate(Unknown Source)  
        at sun.security.ssl.ClientHandshaker.processMessage(Unknown Source)  
        at sun.security.ssl.Handshaker.processLoop(Unknown Source)  
        at sun.security.ssl.Handshaker.process\_record(Unknown Source)  
        at sun.security.ssl.SSLSocketImpl.readRecord(Unknown Source)  
        at sun.security.ssl.SSLSocketImpl.performInitialHandshake(Unknown Source)  
        at sun.security.ssl.SSLSocketImpl.writeRecord(Unknown Source)  
        at sun.security.ssl.AppOutputStream.write(Unknown Source)  
        at sun.security.ssl.AppOutputStream.write(Unknown Source)  
        at SSLPoke.main(SSLPoke.java:23)  
Caused by: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target  
        at sun.security.validator.PKIXValidator.doBuild(Unknown Source)  
        at sun.security.validator.PKIXValidator.engineValidate(Unknown Source)  
        at sun.security.validator.Validator.validate(Unknown Source)  
        at sun.security.ssl.X509TrustManagerImpl.validate(Unknown Source)  
        at sun.security.ssl.X509TrustManagerImpl.checkTrusted(Unknown Source)  
        at sun.security.ssl.X509TrustManagerImpl.checkServerTrusted(Unknown Source)  
        ... 10 more  
Caused by: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target  
        at sun.security.provider.certpath.SunCertPathBuilder.build(Unknown Source)  
        at sun.security.provider.certpath.SunCertPathBuilder.engineBuild(Unknown Source)  
        at java.security.cert.CertPathBuilder.build(Unknown Source)  
        ... 16 more

  

  

En un servidor on tenim les arrels instal·lades:

  

root@[integracio02:/tmp#](http://integracio02/tmp) java SSLPoke serveis-pre.iop.aoc.cat 443  
Successfully connected

  

Si en el vostre servidor us connecta, proveu de reiniciar el servidor per tal que agafi correctament els certificats instal·lats.

  

Si no us connecta, significaria que no esteu indicant correctament el fitxer on es troben els certificats de confiança.

  

  

  

Error: 

PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target

si estanfent la integració amb Java, heu d'afegir l'Arrel i intermitja en el procés java (al cacerts de la jvm que executa el servidor).

  

FP#409022

Related articles
----------------

  

Related issues

FP#266545

Attachments:
------------

![](images/icons/bullet_blue.gif) [SSLPoke.java](attachments/26313606/30868408.java) (text/x-java-source)  

Document generated by Confluence on 02 June 2025 10:55

[Atlassian](http://www.atlassian.com/)