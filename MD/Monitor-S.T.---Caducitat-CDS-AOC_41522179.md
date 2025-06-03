Suport Tècnic : Monitor S.T. - Caducitat CDS AOC  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [03 - Monitorització - Revisions globals](26313327.html)
4.  [Monitors S.T.](Monitors-S.T._41522177.html)

Suport Tècnic : Monitor S.T. - Caducitat CDS AOC
================================================

Created by David Tejada Admin, last modified by Oriol Bernal on 16 May 2024

Procediment 
============

Si es produeix una alerta a algun dels monitors, significa que un CDS gestionat per l'AOC està a punt de caducar.

Podem verificar la data de caducitat del certificat accedint a l'endpoint a través del nostre navegador:

![](attachments/41522179/41522191.gif)

1. Demanar la generació del CSR
-------------------------------

Haurem d'obrir un JIRA a Sistemes demanant que generin el CSR pel domini XXX.

Exemple: 

[SIS-2670](https://contacte.aoc.cat/browse/SIS-2670?src=confmacro) - Data cannot be retrieved due to an unexpected error.

[SIS-2671](https://contacte.aoc.cat/browse/SIS-2671?src=confmacro) - Data cannot be retrieved due to an unexpected error.

Un cop gestionat, la persona encarregada ens haurà d'adjuntar el fitxer generat (.csr) i la clau privada (.key).

**Generació CSR XXX\_Nom\_Domini\_XXX**

Bon dia companys,

Necessitaria que ens generéssiu el CSR per \*_Nom del domini del certificat a renovar_\* per a sol·licitar-ho a CESICAT.  
Les dades pel csr són les següents:  
{code:java}  
Common Name: _Nom del domini del certificat a renovar_  
Organization: Consorci Administracio Oberta de Catalunya  
Organization Unit: Area de Tecnologia  
Locality: Barcelona  
State: Barcelona  
Country: ES  
Email: [certificats@aoc.cat](mailto:certificats@aoc.cat)  
Key Size: 2048 bits  
{code}  
Si us plau, podeu adjuntar la key al tiquet?  
Salutacions 

2\. Parlar amb el cap de servei
-------------------------------

Haurem d'obrir un JIRA al cap de Servei específic, en funció del domini que s'hagi de renovar.

El Cap de servei ens haurà d'indicar amb quina CA s'ha de renovar el certificat.

Exemple:

[ST-7618](https://contacte.aoc.cat/browse/ST-7618?src=confmacro) - Data cannot be retrieved due to an unexpected error.

3\. Demanar certificat a CESICAT (Sectigo)
------------------------------------------

Com demanar permisos?

Per a sol·licitar permisos de Remedy per a l'apartat de Sol·licitud de Certificats s'ha d'escriure a: Sergio Grancha Ausejo <**sergio.grancha\_og2ext@gencat.cat**\>

[![](download/resources/com.atlassian.confluence.plugins.confluence-view-file-macro:view-file-macro-resources/images/placeholder-medium-file.png)Donar permisos a un usuari per demanar certificats SSL.msg](/download/attachments/41522179/Donar%20permisos%20a%20un%20usuari%20per%20demanar%20certificats%20SSL.msg?version=1&modificationDate=1668684560511&api=v2)

1.  Accedir al remedy, apartat: **Certificats Digitals SSL, Aplicació i Segell**

![](attachments/41522179/64979583.png)

2\. Omplir les dades i adjuntar l'arxiu .csr

![](attachments/41522179/64979584.png)![](attachments/41522179/64979585.png)![](attachments/41522179/64979586.png)

**Dades a Informar**

**Dades de contacte:**

**NIF**: DNI propi de la persona que genera el tiquet

**Empresa**: CONSORCI ADMINISTRACIÓ OBERTA DE CATALUNYA (AOC)

**Organització**: CONSORCI ADMINISTRACIÓ OBERTA DE CATALUNYA (AOC)

**Departament**: CONSORCI ADMINISTRACIÓ OBERTA DE CATALUNYA (AOC)

**Correu**: [OTSuportTecnic@aoc.cat](mailto:OTSuportTecnic@aoc.cat)

  

**Detall de la Petició:**

**Tipus de petició**: Alta

**Familia Servei Afectat**: APLICACIONS

*   **Cercar aplicació per**: Aplicació no es troba a Remedy
*   **Nom de l'aplicació**: _Nom del domini del certificat a renovar_
*   **Enviar certificat a peticionari:** Si

**Tipus de certificat**: SSL

**Common name**: _Nom del domini del certificat a renovar_

**Departament**: DEPARTAMENT DE LA PRESIDENCIA

**Entitat**: AOC

**Quantitat de Subject alternative names**: Deixar buit

**CSR cedit**: Si (Caldrà adjuntar el fitxer .CSR generat per l'equip de Sistemes

**Comentaris**: Sol·licitud d'un certificat SSL amb domini: _Nom del domini del certificat a renovar_

4\. Tramitar la instal·lació cap a sistemes 
--------------------------------------------

Per dur a terme un seguiment dels certificats que renovem, haurem de desar tant els fitxers .csr i .key (generats per sistemes) com el fitxer .crt (enviat pel CTTI) a la carpeta de xarxa:

*   (Sharepoint) Tecnologia - SUPORT\_TECNIC\\CERTIFICATS\\CDS\\CESICAT\\2022

Un cop tinguem resposta del CTTI i ens adjuntin el nou certificat (.crt) haurem de crear un tiquet nou a sistemes, enllaçant-lo amb els tiquets anteriors perquè procedeixin a instal·lar el nou certificat.

Exemples:  [SIS-5276](https://contacte.aoc.cat/browse/SIS-5276?src=confmacro) - Data cannot be retrieved due to an unexpected error.

**Instal·lació certificat XXX\_Nom\_Domini\_XXX**

Bon dia companys,

Obro tiquet per a la instal·lació del certificat _Nom del domini del certificat a renovar_.

Trobareu el certificat i la key a:

(Sharepoint) Tecnologia - SUPORT\_TECNIC\\CERTIFICATS\\CDS\\CESICAT\\2022\\_Nom del domini del certificat a renovar_

Moltes gràcies

5\. Info addicional 
--------------------

Click here to expand...

Com sol·licitar certificats de dispositiu?

1      Introducció
==================

Procediment que determina el diagrama de flux i les fases a seguir per sol·licitar els certificats de dispositiu.

Aquest procediment, que es gestiona des de la Subdirecció de tecnologia i serveis, concretament, des de Suport Tècnic per tal de securitzar els servidors/serveis de l’AOC.

S’atenen a través d’aquest procediment, la sol·licitud de certificats digitals tant de servidor com d’aplicació i programari.

Arran de la decisió publicada a: [https://www.aoc.cat/2019/06/03/el-consorci-aoc-deixar-demetre-certificats-ssl-al-2019/](https://www.aoc.cat/2019/06/03/el-consorci-aoc-deixar-demetre-certificats-ssl-al-2019/) hi ha dos escenaris, sol·licitud de certificats de dispositius via EACAT i l’altre escenari seria sol·licitar els certificats de servidor segur a un altre proveïdor, concretament:

*   Certificat de servidor segur  (CDS-1)
*   Certificat de servidor segur extended validation (CDSQ-1)
*   Certificat de seu electrònica de nivell mitjà (CDSNM-1)

1.1    Fases de sol·licitud de certificats de dispositiu
--------------------------------------------------------

1.  **Certificats de servidor segur**  
    
    A partir de 2020 tots els certificats de servidor segur es demanaran a CESICAT - que es va signar un conveni -.
    
    1.  *   Renovació de certificat de dispositiu  
            
    
           Des de Suport Tècnic, es disposa d’un llistat dels certificats de dispositiu que actualment tenen jerarquia de certificació de l’EC–SectorPublic i altres CA's. Veure: \\\\endreca.aoc.local\\TECNOLOGIA\\SUPORT\_TECNIC\\CERTIFICATS\\SSL Pressupost CESICAT.xlsx  
    
    1.  *   Nous certificats per a nous entorns
    
           En cas que siguin certificats de servidor segur s’han de sol·licitar aquests a CESICAT (proveïdor de certificats de diferents entitats de certificació), la petició ens arriba per un tiquet de JIRA a Suport Tècnic, per part o bé, de Sistemes, Projectes o bé d'Innovació. 
    
      
    
    **Conveni amb CESICAT**
    
2.  **Certificats de dispositiu menys els que són de servidor segur (Via EACAT)  
    **

*   *   *   Renovació de certificats:

Proactivament es realitza la renovació observant l’Excel de control dels certificats emesos per part de Consorci AOC (proveïdor: Firmaprofessional)

*   *   *   Nous certificats:

Via tiquet de JIRA ens arribarà a Suport Tècnic per a la sol·licitud de noves peticions.

1.  1.  **Descàrrega de certificats de dispositiu**

 Es rep un correu a la meva bústia (mdalvarez@aoc.cat) un cop sol·licitat, es reenvia correu a la bústia [certificats@aoc.cat](mailto:certificats@aoc.cat) (per tal que es pugui consultar si hi ha alguna incidència)

\-       Quan es passa uns dies es revisa l’aplicatiu **Carpeta del Subscriptor** (**[https://scd.aoc.cat](https://scd.aoc.cat)**) per tal de mirar si s’ha emès i està pendent de descàrrega.

\-       Es fa la descàrrega del certificat de l’apartat **Pendents de lliurar**.

![](attachments/24215591/64979574.png)

  

Es deixa el p12 a la carpeta: **\\\\endreca.aoc.local\\TECNOLOGIA\\SUPORT\_TECNIC\\CERTIFICATS\\CDA** o bé, **\\\\endreca.aoc.local\\TECNOLOGIA\\SUPORT\_TECNIC\\CERTIFICATS\\SEGELL** i el Password al **Keepass** de Tecnologia.

Posteriorment, es respon el tiquet de Suport Tècnic o bé, ens posem en contacte amb el Cap de projecte / Cap de servei del servei en concret.

 1.2    Canal urgent
--------------------

*   *   **Via Plataforma EACAT:**

Excepcionalment, si la sol·licitud és de caràcter urgent, s’ha d’avisar a Anna Giné per tal que ho aprovi i que es pugui informar a Firmaprofessional i així, es pot tramitar de forma urgent. Prèviament, s’ha de realitzar tots els passos comentats anteriorment com una tramitació normal via EACAT.

  

*   *   **Via CESICAT:**

Ens hauríem de posar en contacte amb el CESICAT, 

  

Nota: per a sol·licitar permisos de Remedy per a l'apartat de Sol·licitud de Certificats s'ha d'escriure a: Sergio Grancha Ausejo <sergio.grancha\_og2ext@gencat.cat>

Attachments:
------------

![](images/icons/bullet_blue.gif) [cds.gif](attachments/41522179/41522191.gif) (image/gif)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-18-39.png](attachments/41522179/64980625.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-18-49.png](attachments/41522179/64979584.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-18-57.png](attachments/41522179/64979585.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-19-7.png](attachments/41522179/64979586.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-19-35.png](attachments/41522179/64979587.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-19-42.png](attachments/41522179/64979588.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-19-48.png](attachments/41522179/64979589.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-19-56.png](attachments/41522179/64979590.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-20-13.png](attachments/41522179/64979591.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-20-24.png](attachments/41522179/64979592.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-20-35.png](attachments/41522179/64979593.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-18-39.png](attachments/41522179/64979583.png) (image/png)  
![](images/icons/bullet_blue.gif) [Donar permisos a un usuari per demanar certificats SSL.msg](attachments/41522179/81854931.msg) (application/vnd.ms-outlook)  

Document generated by Confluence on 02 June 2025 11:08

[Atlassian](http://www.atlassian.com/)