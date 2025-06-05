Suport Tècnic : Sonda OMI - PSIS\_Validacio\_certificat\_SectorPublic  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [03 - Monitorització - Revisions globals](26313327.html)
4.  [Monitors OMI (CTTI)](26313608.html)
5.  [Sondes OMI - Old](Sondes-OMI---Old_41519617.html)

Suport Tècnic : Sonda OMI - PSIS\_Validacio\_certificat\_SectorPublic
=====================================================================

Created by Unknown User (otecagonzalez), last modified by OTEC ST JAlejandro Cardete Postigo on 12 April 2024

SERVEI 24X7

COMUNIQUEM

D'aquest servei depen moltes aplicacions. Si detectem que esta fallant el PSIS haurem de comunicar en la web de l'AOC!

**Serveis afectats**:

e-NOTUM

 e-TAULER

 e-TRAM

 e-VALISA

 e.FACT 

EACAT 

Perfil de contractant (PSCP)

 Registre Públic de Contractes (RPC)

Registre unificat (MUX)

Transparència i SEU-e

 VÀLid (Validador-PSIS, Signador centralitzat, etc.)

Via Oberta.

  

A l'hora de marcar els serveis del comunicat, marcar també INTEGRACIÓ.

Circuit que fa la sonda

**Pas 1: Execució SOAP UI**

Executar SOAP UI i esperar com resultat:

**Resposta OK**

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

Comprova el TAG ResultMajor, que sigui Succes, perquè així evitem falsos errors quan el certificat o la signatura caduquin.

Màquines a revisar en cas de caiguda

### Màquines PSIS

[PSIS - ALTRES - Revisió + Restabliment servei](36339911.html)

Procediment

1 - Reproduïm el circuit de la sonda, executant la mateixa petició soap.

**[Sondes PSIS.zip](attachments/36340168/41521745.zip)**

_Només cal importar el projecte al SoapUi, està tot configurat per llançar la petició._

  

2- Revisem que el resultat sigui l'esperat.

  

3- En cas que falli haurem de seguir la FAQ de revisió i restabliment del servei.

[PSIS - ALTRES - Revisió + Restabliment servei](36339911.html)

  

Avís

En el correu que s'envia el detall de l'actuació, també afegirem a l'Àurea en còpia. 

  

Revisar Sonda AMBIT

psis-intranet

[http://psis-intranet.catcert.cat/psis/catcert/dss](http://psis-intranet.catcert.cat/psis/catcert/dss) és el domini de DR que utilitza justícia en cas de caiguda d'internet a la infraestructura de la Generalitat

La sonda AMBIT de PSIS fa la monitorització des de la xarxa de XCAT (com les altres de CPD), però amb la diferència de que les proves es llancen contra un endpoint diferent:

*   **Endpoint internet** → [http://psis.catcert.net/psis/catcert/dss](http://psis.catcert.net/psis/catcert/dss)
*   **Enpoint intranet(AMBIT)**→ [http://psis-intranet.catcert.cat/psis/catcert/dss](http://psis-intranet.catcert.cat/psis/catcert/dss)

En el cas que la sondes estiguin:

*   AMBIT KO
*   Internet OK 

Actuació

**1- Revisar PSIS - Kyndryl**

Actualment, PSIS intranet no té un sistema de contingència eficientment desplegat. Per tant, els consums que es facin a través de el DNS d'intranet apuntaran cap els frontals del PSIS de Kyndryl. 

**En casos de caigudes de la sonda, per molt que la URL [http://psis.catcert.net/psis/catcert/dss](http://psis.catcert.net/psis/catcert/dss) resolgui per Nexica, en aquest cas haurem de revisar Kyndryl.**

**2- En el cas que detectem que el servei esta operant correctament, però no hem pogut recurperar la sonda àmbit**

En els casos que ens truquin perquè aquesta sonda no funcioni i estiguin fent "soroll" perquè algun servei extern no funciona correctament:

1. Validem que PSIS funciona

2\. Indiquem al CTTI que el servei funciona correctament, i que l'origen de l'error no prové del servei PSIS, per internet PSIS funciona correctament.

3\. En el cas que ens diguin que algun servei extern no funciona correctament, proposem:

\- Validar si aquest servei ataca a: [http://psis-intranet.catcert.cat/psis/catcert/dss](http://psis-intranet.catcert.cat/psis/catcert/dss)

\- En cas que ataquin aquest DNS, proposem que el canviïn a: [http://psis.catcert.net/psis/catcert/dss](http://psis.catcert.net/psis/catcert/dss) temporalment.

  

El pròxim dia laborable, traslladarem aquest cas a sistemes perquè ho pugui revisar.

4- En el cas que el servei extern ataqui per internet "[http://psis.catcert.net/psis/catcert/dss](http://psis.catcert.net/psis/catcert/dss)" però per la xarxa XCAT, indiquem que l'error es en la xarxa XCAT i ho hauran de tractar internament.

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2020-2-6\_12-34-54.png](attachments/36340168/36340169.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-6\_12-34-8.png](attachments/36340168/36340170.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-6\_12-45-33.png](attachments/36340168/36340171.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-6\_12-43-46.png](attachments/36340168/36340172.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-4\_14-38-26.png](attachments/36340168/36340173.png) (image/png)  
![](images/icons/bullet_blue.gif) [PSIS-Sonda-CTTI.xml](attachments/36340168/36340193.xml) (text/xml)  
![](images/icons/bullet_blue.gif) [Sondes PSIS.zip](attachments/36340168/41521745.zip) (application/zip)  

Document generated by Confluence on 02 June 2025 11:07

[Atlassian](http://www.atlassian.com/)