Suport Tècnic : Monitor OMI - AWS - PSIS\_VALIDAR\_CERTIFICAT\_AWS  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [03 - Monitorització - Revisions globals](26313327.md)
4.  [Monitors OMI (CTTI)](26313608.md)
5.  [AWS](AWS_100008616.md)

Suport Tècnic : Monitor OMI - AWS - PSIS\_VALIDAR\_CERTIFICAT\_AWS
==================================================================

Created by Oriol Bernal, last modified by OTEC ST JAlejandro Cardete Postigo on 21 May 2024

24X7INTEGRACIO

Tipus: **24x7**

Accés: **Ciutadà**

Documents enviats al CTTI: C:\\Users\\obernal\\Consorci Administració Oberta de Catalunya\\Operacions - Documentos\\General\\SUPORT\_TECNIC\\MONITORITZACIO\\Monitors CTTI\\1- Circuits ENVIATS\\circuits\\AWS\\PSIS\_VALIDAR\_CERTIFICAT\_AWS

Creació:  [ST-21828](https://contacte.aoc.cat/browse/ST-21828?src=confmacro) - Data cannot be retrieved due to an unexpected error.

AJS.toInit(function() { aptis.plugins.serverStatus.startAjaxRequestHttpRequestWithExpectedContent('APTIS\_67125', 'https://confluence.aoc.cat/rest/serverStatus/1.0/service/httpRequestWithExpectedContent', 'https://psis.aoc.cat/psis/catcert/dss ', '120', 'PSIS', 'RegEx'); AJS.$('#APTIS\_67125').click(function(e) { if (!AJS.$('#APTIS\_67125').hasClass('loading')) { aptis.plugins.serverStatus.updateUserInterface("loading", "", 'APTIS\_67125'); aptis.plugins.serverStatus.startAjaxRequestHttpRequestWithExpectedContent('APTIS\_67125', 'https://confluence.aoc.cat/rest/serverStatus/1.0/service/httpRequestWithExpectedContent', 'https://psis.aoc.cat/psis/catcert/dss ', '120', 'PSIS', 'RegEx'); } }); });

**CIRCUIT**

El circuit és basa en una petició XML al servei SOAP DSS de PSIS desplegat a AWS:

1.  **Request**
    
    POST [https://psis.aoc.cat/psis/catcert/dss](https://psis.aoc.cat/psis/catcert/dss) 
    
    **Headers**
    
    Accept-Encoding: gzip,deflate  
    Content-Type: text/xml;charset=UTF-8  
    SOAPAction: ""  
    Host: psis.aoc.cat  
    Connection: Keep-Alive
    
    **Body**
    
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:oasis:names:tc:dss:1.0:core:schema" xmlns:xd="http://www.w3.org/2000/09/xmldsig#">
      <Body>
        <urn:VerifyRequest Profile="urn:oasis:names:tc:dss:1.0:profiles:XSS">
          <urn:SignatureObject>
            <urn:Other>
              <xd:X509Data>
                <xd:X509Certificate>MIIG9zCCBd+gAwIBAgIQWAdi8ftjCEyVpTsw38dMJzANBgkqhkiG9w0BAQsFADCB
    iDELMAkGA1UEBhMCRVMxMzAxBgNVBAoMKkNPTlNPUkNJIEFETUlOSVNUUkFDSU8g
    T0JFUlRBIERFIENBVEFMVU5ZQTEqMCgGA1UECwwhU2VydmVpcyBQw7pibGljcyBk
    ZSBDZXJ0aWZpY2FjacOzMRgwFgYDVQQDDA9FQy1TZWN0b3JQdWJsaWMwHhcNMjAx
    MTEzMTI0NzA4WhcNMjQxMTEzMTI0NzA4WjCCASYxCzAJBgNVBAYTAkVTMR8wHQYD
    VQQKDBZPcmdhbml0emFjacOzIGRlIHByb3ZhMRgwFgYDVQRhDA9WQVRFUy1RMDAw
    MDAwMEoxKDAmBgNVBAsMH1BlcnNvbmEgdmluY3VsYWRhIGRlIG5pdmVsbCBtaWcx
    GTAXBgNVBAwMEEPDoHJyZWMgZGUgcHJvdmExLTArBgNVBAQMJGRlIGxhIFBlw6dh
    IGRlIFByb3ZhIC0gRE5JIDAwMDAwMDAwVDEQMA4GA1UEKgwHUGVyc29uYTEYMBYG
    A1UEBRMPSURDRVMtMDAwMDAwMDBUMTwwOgYDVQQDDDNQZXJzb25hIGRlIGxhIFBl
    w6dhIGRlIFByb3ZhIC0gRE5JIDAwMDAwMDAwVCAoVENBVCkwggEiMA0GCSqGSIb3
    DQEBAQUAA4IBDwAwggEKAoIBAQCTT48krKo7znooyw0U9YFzbMBaHl6dv5wEA/FQ
    kNF6uUuu2pkaUmTBWy2vcZjkynzOPOB4O++eTB32DNPh9UqeaDzrYUFzA9qrp3BG
    TzsCVrxrKD+Sdkw6TqeNMIMQo/1xgK/tIYhF32OAzsh+BHTFvlBXJakCg0EDb/ky
    I2LxoJwMLB0GEJRP0xOwGtt5CYapA+jYw4/VCps5D+DmeBGuhtaRoJyiNsqgaSkn
    ao5kwqLR3u8ZN9FGhS5yEVqGC+hJ2ms9pVwUypn4NR6q0D0Ht1vpU1+GaI/K6uf7
    3bf0/EeozE/K+ob/TuvnD+lqaQLhhsrq1o44csDXlFbRAx8pAgMBAAGjggK6MIIC
    tjAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFEc83hR3u2pPR5GpAv/UBuFz3OLZ
    MHYGCCsGAQUFBwEBBGowaDBBBggrBgEFBQcwAoY1aHR0cDovL3d3dy5jYXRjZXJ0
    LmNhdC9kZXNjYXJyZWdhL2VjLXNlY3RvcnB1YmxpYy5jcnQwIwYIKwYBBQUHMAGG
    F2h0dHA6Ly9vY3NwLmNhdGNlcnQuY2F0MBYGA1UdEQQPMA2BC3NjZEBhb2MuY2F0
    MIHxBgNVHSAEgekwgeYwgdgGDCsGAQQB9XgBAwJWATCBxzAxBggrBgEFBQcCARYl
    aHR0cHM6Ly93d3cuYW9jLmNhdC9DQVRDZXJ0L1JlZ3VsYWNpbzCBkQYIKwYBBQUH
    AgIwgYQMgYFDZXJ0aWZpY2F0IGVsZWN0csOybmljIGRlIHBlcnNvbmEgdmluY3Vs
    YWRhIGRlIG5pdmVsbCBtaWcuIEFkcmXDp2EgaSBOSUYgZGVsIHByZXN0YWRvcjog
    VmlhIExhaWV0YW5hIDI2IDA4MDAzIEJhcmNlbG9uYSBRMDgwMTE3NUEwCQYHBACL
    7EABADAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwQwcAYIKwYBBQUHAQME
    ZDBiMAgGBgQAjkYBATALBgYEAI5GAQMCAQ8wEwYGBACORgEGMAkGBwQAjkYBBgEw
    NAYGBACORgEFMCowKBYiaHR0cHM6Ly93d3cuYW9jLmNhdC9jYXRjZXJ0L3Bkc19l
    bhMCZW4wQQYDVR0fBDowODA2oDSgMoYwaHR0cDovL2Vwc2NkLmNhdGNlcnQubmV0
    L2NybC9lYy1zZWN0b3JwdWJsaWMuY3JsMB0GA1UdDgQWBBT0cb8JHASNYqG/3qp2
    DuzQuT2vSzAOBgNVHQ8BAf8EBAMCBeAwDQYJKoZIhvcNAQELBQADggEBACqY/f92
    e9zepzkla8bUUDrXhXBz3siRqz5WtaDdJatXEyv8NqyHCbETl0vybFSFjBc+a3Js
    q7m5K6dE58jGEmLF1vVdS8STm0f/V5SH8WPs1K3o/jGmaXQ40RtWrrJ3K9gMdKps
    uprckdvA651p3Paxa0obd9BpzrVRHkjrBWy4uPDlSz0v/1748bC6ZymTi+vX164X
    BVpxf0gKoorc08T/Tdj3LyVkGpKGn8J2jHo39vu1QR1SkjkU9f2KAahnE81Nl88S
    SuqOTCMPEJWkDWbXuAsC0ftqBXY4+9xp7X5c25EUFx61hc0Qmqb1QGga/1S0oPR3
    wqiu/Bvsou3qexg=</xd:X509Certificate>
              </xd:X509Data>
            </urn:Other>
          </urn:SignatureObject>
        </urn:VerifyRequest>
      </Body>
    </Envelope>
    
2.  **Response**
    
    **Body**
    
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
       <soapenv:Body>
          <dss:VerifyResponse Profile="urn:oasis:names:tc:dss:1.0:profiles:XSS" xmlns:dss="urn:oasis:names:tc:dss:1.0:core:schema">
             <dss:Result>
                <dss:ResultMajor>urn:oasis:names:tc:dss:1.0:resultmajor:Success</dss:ResultMajor>
                <dss:ResultMinor>urn:oasis:names:tc:dss:1.0:profiles:XSS:resultminor:valid:certificate:Definitive</dss:ResultMinor>
             </dss:Result>
             <dss:OptionalOutputs/>
          </dss:VerifyResponse>
       </soapenv:Body>
    </soapenv:Envelope>           
    

**PROCEDIMENT**

Haurem d'obrir un tiquet a Claranet (proveïdor) perquè ho revisin i ens indiquin que ha passat: 

*   Plataforma d'obertura de tiquets de Claranet: [https://online.claranet.es/ticketing](https://online.claranet.es/ticketing)
*   Posar en còpia a [aalcaide@aoc.cat](mailto:aalcaide@aoc.cat) i [suporttecnic@aoc.cat](mailto:suporttecnic@aoc.cat)

  

Información Obligatoria Tiquets Claranet

Segons si el tiquet és de **Sistemes** o de **Xarxa**, s'ha d'indicar la següent informació que indiquem més a baix, i en el comentari copiem si es tracta d'un problema de Sistemes o de Xarxes.

Si es pot incorporar captures de pantalla i proves, molt millor, així com redactar el tiquet en **castellà**.

**Sistemas:**

*   Aplicación afectada:
*   Fecha y hora de inicio del problema:
*   Impacto en negocio:
*   Persona responsable de contacto de AOC:
*   Test realizados
    *     Comportamiento anómalo detectado
    *     Evidencias del error alertado (sonda, servicio integrador...) Si es una sonda, el detalle de que comprueba la sonda.

**Redes**

*   Aplicación afectada:
*   Fecha y hora de inicio del problema:
*   Impacto en negocio:
*   Persona responsable de contacto de AOC:
*   Test realizados
*   IP origen o servidor origen donde no hay conectividad
    *   IP destino o servidor al que no se accede
    *   Si es un servidor, enviar resultado de MTR o TRACEPATH
    *   ¿Es intermitente o constante?

**NOTA:** En el cas de les guàrdies de 24x7, quan creiem que sigui necessari fer un **redeploy** o **reinici** del servei, s'ha d'indicar.

Un cop obert el tiquet a Claranet, i sempre que sigui horari de **24x7** (o sigui, fora de l'horari d'oficina) s'ha de trucar a un d'aquests números i avisar de l'obertura del tiquet: Tel: **+34 934 452 699 / +34 933 933 991**

  

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2020-4-17\_10-52-56.png](attachments/100009214/100009215.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-17\_17-8-55.png](attachments/100009214/100009216.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:05

[Atlassian](http://www.atlassian.com/)