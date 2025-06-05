Suport Tècnic : GLOBAL - ALTRES - SOAP-Ui  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [02 - FAQ's serveis](26313393.html)
4.  [FAQ's Global](28705585.html)

Suport Tècnic : GLOBAL - ALTRES - SOAP-Ui
=========================================

Created by Unknown User (oteccmorales), last modified by OTEC ST JAlejandro Cardete Postigo on 12 December 2022

Breu explicació per configurar els WSDLs amb capçaleres de seguretat WSS o per MTOM (SSL)

  

[ST-13318](https://contacte.aoc.cat/browse/ST-13318?src=confmacro) - Data cannot be retrieved due to an unexpected error.

[ST-13096](https://contacte.aoc.cat/browse/ST-13096?src=confmacro) - Data cannot be retrieved due to an unexpected error.

Certificats de proves prestadors

(Sharepoint) Tecnologia - SUPORT\_TECNIC\\DOCUMENTACIO\\certs de proves prestadors

  

Descripció

SOAP-Ui  és una eina, desenvolupada en java, per a la realització de proves a aplicacions amb arquitectura orientada a servei i transferència d'estat representacional. Suporta múltiples protocols com SOAP, REST, HTTP, JMS, AMF i JDBC.

En el nostre cas, per tal de poder oferir un millor servei de suport, explicarem com configurar el nostre SOAP-ui amb els WSDL i configurant un certificat per tal de poder reproduir un circuit sencer de petició AOC:

![](attachments/41523727/41523728.png)

1.  Generem XML que apunta a l'endpoint del servei que volem consumir (APP, IOP, NT)
2.  Amb la petició signada WSS o per canal SSL enviem l'XML que passarà per les passes:
    1.  Validació SIRI (capa seguretat per validar que l'autenticació sigui correcte)
    2.  Una vegada validat, es passa la petició a la MTI per orquestrar a quin servei s'ha d'enviar
    3.  S'envia al servei
    4.  S'envia cap a l'emissor (es fa el consum)

  

Preparem el SOAP-ui

Configurar projecte

Ens descarreguem el paquet (projecte i arxius) que està en [https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI](https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI) - IO → [https://consorciaoc.github.io/Integracio-AOC-SOAPUI/](https://consorciaoc.github.io/Integracio-AOC-SOAPUI/)

![](attachments/41523727/41523997.png)

  

Aquí tindrem tot el que necessitem per configurar el SOAP-ui amb el WSDL modificat (tindrem un WSDL per IOP, APP i NT → Pel moment està IOP)

Quan tinguem tot en la carpeta al nostre PC, configurem el SOAP:

1.  Importem el projecte (és el .xml)
2.  Una vegada el tenim carregat, hem de configurar el WSDL:
    1.  ![](attachments/41523727/41523998.png)
        
        WSDL Adaptats
        
        Tenim un WSDL adaptat amb els .xsd dels diferents serveis per fer la validació dels XML tant per missatgeria específica com per missatgeria genèrica
        
        En aquest cas, per carregar el wsdl, ens el tindrem que descarregar de la web i carregar el SOAP-ui
        
3.  [Configurem els certificats](#GLOBALALTRESSOAPUi-cert)
    1.  Tambè tenim informació al GitHub
        
        [https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI#configuraci%C3%B3-certificat-per-fer-els-consums](https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI#configuraci%C3%B3-certificat-per-fer-els-consums)
        
4.  Validem que funcionen els consums.

  

logs

En cas d'error en carregar el WSDL, els logs els podrem trobar en:

![](attachments/41523727/41523751.png)

Aquesta ruta pot variar segons on s'hagi instal·lat (ex: C:\\Users\\(usuario windows)\\AppData\\Local\\Programs\\SmartBear\\SoapUI-5.6.0)

Carregar WSDL Adaptat

Ens tindrem que descarregar el wsdl que tenim en aquesta web i les carpetes amb els .xsd en local

[![wsdl](https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI/raw/main/capturas/soap0.png)](https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI/blob/main/capturas/soap0.png)

En el nostre projecte, click al botó dret del ratolí i seleccionem "ADD WSDL"

[![wsdl](https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI/raw/main/capturas/soap1.png)](https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI/blob/main/capturas/soap1.png)

Carreguem el WSDL

[![wsdl](https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI/raw/main/capturas/soap2.png)](https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI/blob/main/capturas/soap2.png)

 [![wsdl](https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI/raw/main/capturas/soap3.png)](https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI/blob/main/capturas/soap3.png)

Configurem el certificat

A nivell de PCI hi ha dues vies per autoritzar els consums:

*   Presentant un certificat de client autoritzat pel canal ssl.
*   Adjuntant les capçaleres WSS amb la signatura corresponent de la petició amb el certificat autoritzat

  

Configuració per canal SSL

per MTOM

    La configuració per SSL es recomana per MTOM, no obstant, tambè es factible per serveis no MTOM

  

En l'apartat de "Preferences anirem a "SSL Settings" i configurem el certificat. En aquest cas és el SEGELL\_AOC.jks (pdt informar ruta on està + contrasenya certificat)

El certificat de proves (Serveis\_Administracio\_Electronica.cer) el podem trobar en la ruta de xarxa : _**(Sharepoint) Tecnologia - SUPORT\_TECNIC\\CERTIFICATS\\SEGELL\\Segell Administracio Electronica\_Gener\_2019**_

_La Clau la tenim en el keepass (Consorci AOC - Servei Administracio Electronica)_

  

![](attachments/41523727/41523736.png)

  

  

Configuració per capçelera de seguretat

En el projecte que hem generat, donem doble click en la carpeta i anem a "WS-Security Configurations"

![](attachments/41523727/41523737.png)

Afegim el certificat, en l'apartat de "keystore"

![](attachments/41523727/41523978.png)

Premem el "+" i afegim Signature amb nom "SEGELL\_AOC" i en keysotre seleccionem el que hem configurat.

![](attachments/41523727/41523904.png)

  

la clau és marcar "use single cert for signing" d'aquesta manera el valor ValueType="[http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3](http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3)".

![](attachments/41523727/41523905.png)

Premem el "+" i afegim el "Timestamp" on el TTL ha de ser 300

[![wsdl](https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI/raw/main/capturas/wss4.png)](https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI/blob/main/capturas/wss4.png)

El Timestamp sempre ha d'anar el primer!

afegir capçelera de seguretat WSS

En la petició XML afegim capçelera de seguretat, anem a "Auth (Basic) i seleccionem el certificat que hem configurat per WSS.

[![wsdl](https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI/raw/main/capturas/wss5.png)](https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI/blob/main/capturas/wss5.png)

  

  

Consum per MTOM

Per consumir per MTOM, no ha de tindre Capçalera de seguretat. Hem fet la configuració tal qual indica : [https://www.soapui.org/docs/soap-and-wsdl/attachments/](https://www.soapui.org/docs/soap-and-wsdl/attachments/)

Enable MTOM  → True

Disable multiparts → True

Els adjunts, els fiquem dintre del tag Ficheros i en "Contenido" (1) (tal com indica la imatge i en el "+" afegim el document a adjuntar (2).

![](https://contacte.aoc.cat/secure/attachment/62677/62677_image-2021-06-18-15-47-48-108.png)

  

tag "hash"

Tinguem en compte que el tag "hash" és B64 i no accepta que s'informi com MTOM. 

![](attachments/41523727/41523976.png)

  

A tindre en comptes que si informen el tag "Contenido" com XOP és correcte. Però el HASH no, millor que no l'informin o que l'informin en B64

FP#433513 

Actualitzar GitHub

Sobre el que tenim documentat en el GitHub del projecte SOAP. Si fem cap modificació (afegir nous serveis, modificacions del projecte...), haurem d'actualitzar el package que es mostra en el IO i el que tenim en el GitHub:

  

IO → [https://consorciaoc.github.io/Integracio-AOC-SOAPUI/](https://consorciaoc.github.io/Integracio-AOC-SOAPUI/)

![](attachments/41523727/64979495.png)

  

GitHub normal:

[https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI](https://github.com/ConsorciAOC/Integracio-AOC-SOAPUI)

![](attachments/41523727/64979496.png)

  

Les accions que fem, es anar a Releases :

![](attachments/41523727/64979497.png)

Veiem un 2, perquè ara mateix tenim 2 (la primera que es va fer a l'inici i la final amb tota la informació).

  

Anem a Draft a new Release:

![](attachments/41523727/64979498.png)

![](attachments/41523727/64979499.png)

Omplim les dades:

**Tag** : Pugem 1 versió (si ara estem a V 2.0, generem la V 3.0)

**Title**: AOC - IOP, APP i NT - SOAPUI PRJ

**Descripció** : 

Projecte SOAPUI per al consum de modalitats de servei del cluster IOP, APP i NT del consorci AOC, amb exemples de les diferents peticions.

Release v2.0

**Adjuntem en un .zip els 3 projectes soap-ui en un .zip**: Integracio-AOC-SOAPUI.zip

![](attachments/41523727/64979500.png)

  

[GLOBAL - ALTRES - SOAP-Ui - WSDL amb import dades especifiques](GLOBAL---ALTRES---SOAP-Ui---WSDL-amb-import-dades-especifiques_41523742.html)

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2021-6-29\_10-24-1.png](attachments/41523727/41523728.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-6-29\_10-33-19.png](attachments/41523727/41523729.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-6-29\_10-34-0.png](attachments/41523727/41523730.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-6-29\_10-34-41.png](attachments/41523727/41523731.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-6-29\_11-17-24.png](attachments/41523727/41523736.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-6-29\_11-24-33.png](attachments/41523727/41523737.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-6-29\_11-25-59.png](attachments/41523727/41523738.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-6-29\_11-26-51.png](attachments/41523727/41523739.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-6-29\_11-28-57.png](attachments/41523727/41523740.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-7-1\_11-3-38.png](attachments/41523727/41523751.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-7-22\_13-15-44.png](attachments/41523727/41523904.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-7-22\_13-16-15.png](attachments/41523727/41523905.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-7-22\_13-16-52.png](attachments/41523727/41523906.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-7-22\_13-17-39.png](attachments/41523727/41523907.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-8-2\_14-25-5.png](attachments/41523727/41523975.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-8-2\_14-25-14.png](attachments/41523727/41523976.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-8-3\_11-52-24.png](attachments/41523727/41523978.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-8-13\_13-11-31.png](attachments/41523727/41523997.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-8-13\_13-14-38.png](attachments/41523727/41523998.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-17\_9-28-42.png](attachments/41523727/64979494.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-17\_9-29-11.png](attachments/41523727/64979495.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-17\_9-29-48.png](attachments/41523727/64979496.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-17\_9-30-30.png](attachments/41523727/64979497.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-17\_9-32-7.png](attachments/41523727/64979498.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-17\_9-32-43.png](attachments/41523727/64979499.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-17\_9-36-37.png](attachments/41523727/64979500.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:55

[Atlassian](http://www.atlassian.com/)