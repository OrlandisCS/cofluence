Suport Tècnic : GLOBAL - INTEGRACIO - Client Java - Signatura XML  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [02 - FAQ's serveis](26313393.html)
4.  [FAQ's Global](28705585.html)

Suport Tècnic : GLOBAL - INTEGRACIO - Client Java - Signatura XML
=================================================================

Created by Unknown User (oteccmorales), last modified by OTEC ST JAlejandro Cardete Postigo on 02 March 2023

Informació sobre la signatura de les peticions

Què fa el client?
-----------------

**De:** David Tejada <[dtejada@aoc.cat](mailto:dtejada@aoc.cat)\>  
**Enviado el:** viernes, 23 de octubre de 2020 11:57  
**Para:** Albert Rifà <[arifa@ubintia.com](mailto:arifa@ubintia.com)\>  
**CC:** Xavier Giralt <[xgiralt@ubintia.com](mailto:xgiralt@ubintia.com)\>  
**Asunto:** RE: Integració PCI / HESTIA

  

Bon dia Albert,

He estant mirant el client nostre en java per tenir una referència de quines són les passes que es fan.

Evidentment no és php, però serveix de referència per saber com ho fem.

En aquest cas, en el client es veu que per una banda disposem dels xmls en format pla amb la informació requerida.

Per altre banda disposem d’un fitxer jks (on tenim emmagatzemat el certificat amb el que cal fer la signatura).

Al crear la signatura li estem passant tant el password d’aquest JKS per poder obrir-ho; l’alias del certificat que es vol emprar per fer la signatura (per si es vol disposar de més d’un certificat) i després el pin/password del certificat per fer realment la signatura.

Per tant, entenem que alguna cosa d’aquest procés no esteu realitzant correctament i en els nostres logs apareix la mateixa informació que us reenvia al fer la crida.

No tenim els coneixements suficients per donar suport a integracions fetes fora de Java, desconeixem quines són les llibreries que podeu utilitzar i no tenim cap integrador de referència que ho hagi fet en php per poder com a mínim preguntar-ho.

He trobat aquesta url on potser us podeu recolzar per poder realitzar correctament la signatura:

[https://www.example-code.com/phpext/xmldsig.asp](https://www.example-code.com/phpext/xmldsig.asp)

  

Espero que us pugui servir de referència.

Salutacions,

  

  

PHP

Tot i que no donem suport a PHP ens han traslladat:

**De:** Albert Rifà <[arifa@ubintia.com](mailto:arifa@ubintia.com)\>  
**Enviado el:** dilluns, 26 d’octubre de 2020 9:00  
**Para:** David Tejada <[dtejada@aoc.cat](mailto:dtejada@aoc.cat)\>  
**CC:** Xavier Giralt <[xgiralt@ubintia.com](mailto:xgiralt@ubintia.com)\>; Manel Torres <[mtorres@ubintia.com](mailto:mtorres@ubintia.com)\>  
**Asunto:** RE: Integració PCI / HESTIA

  

Bon dia David,

  

Finalment hem trobat el problema amb la firma de la petició i aquest apartat ja ens funciona, ara ens retorna un error específic d’Hestia, però això ja es veure com enviem aquestes dades especifiques.

  

Per si algú més us pregunta hem fet servir aquestes llibreries [https://github.com/robrichards/wse-php](https://github.com/robrichards/wse-php), per fer la programació en php.

  

Al final després de diverses proves i comparant el xml que teniu d’exemple vam veure que us enviament més elements dels que tocaven, per lo que sigui la llibreria els enviava sempre de forma automàtica. En el cas particular del vostre servei web feia que ens retornes l’error. Un cop trets aquestes elements extres ja va funcionar la validació de la firma perfctament.

  

De nou gracies per suport i l’ajuda.

  

Atentament,

  

**Albert Rifà**

Direcció Técnica

  

  

Ctra.Matadepera, 309 Local 17

08225 Terrassa (Barcelona)

T: 93.736.04.04

Fax: 93.380.85.83

[http://www.ubintia.com](http://www.ubintia.com/)

  

NOTA LEGAL: Aquest missatge i qualsevol arxiu adjunt està destinat únicament a qui es dirigeix i és confidencial. Si vostè ha rebut aquest missatge per error, comuniqui-li-ho al remitent i esborri-ho immediatament. La utilització, revelació i/o reproducció del missatge pot constituir un delicte.

  

PROTECCIÓ DE DADES - **Responsable:** APLICACIONS MULTIMEDIA INTERACTIVES, S.L. **Finalitat.** Enviament d'informació, resposta a consultes i contactes genèrics, mentre duri la nostra relació i tinguem el seu consentiment. **Destinataris.** No se cediran dades a tercers excepte obligació legal. **Drets.** Pot exercir els drets d'accés, rectificació, supressió i oposició, limitar el tractament de les seves dades, o directament oposar-se al tractament, o exercir el dret a la portabilitat d'aquestes. Tot això, mitjançant escrit, acompanyat de còpia de document oficial que li identifiqui, dirigit al RESPONSABLE. En cas de disconformitat amb el tractament, també té dret a presentar una reclamació davant l'Agència Espanyola de Protecció de Dades. També podrà oposar-se als nostres enviaments de comunicacions comercials (Art.21.2 de la LSSI) a través de la següent adreça de correu electrònic: [info@ubintia.com](mailto:info@amiprojects.com)

  

**De:** Albert Rifà  
**Enviado el:** viernes, 23 de octubre de 2020 12:41  
**Para:** David Tejada <[dtejada@aoc.cat](mailto:dtejada@aoc.cat)\>  
**CC:** Xavier Giralt <[xgiralt@ubintia.com](mailto:xgiralt@ubintia.com)\>; Manel Torres <[mtorres@ubintia.com](mailto:mtorres@ubintia.com)\>  
**Asunto:** RE: Integració PCI / HESTIA

  

Hola,

  

La web aquesta la hem mirada i ens va servir d’ajuda, però estem fent servir una altre classe, que venia més recomanada per altres usuaris, i que treballa directament amb el client SOAP del php que és el que crear tot el xml per firmar-lo.

  

Per lo que he pogut veure el jks (Java Key Store) és una cosa exclusiva del java, i d’aquí deu extreure tant la clau privada per fer la signatura com el certificat públic per incloure el token que s’envia juntament en el xml. Hem podríeu assegurar que el certificat públic que un enviem el teniu donat d’alta, pel client de Castelldefels?, es per assegurar coses.

  

Pesant que potser és un problema dels certificats en si, teniu algun certificat de proves que sabem que 100% que funcionaria, i així podem fer la petició amb aquest i que no retorni aquest error, encara que després en doni un error vostre controlat indicant que el certificat no es vàlid per l’usuari.

  

He mirat el programa client, i el fitxer “src\\main\\java\\cat\\aoc\\pci\\test\\Test.java”, veig que esta pensat per mostrar un menú per escollir diferents opcions, entenc que la primera opció que hauria d’escollir és : “Via Standard, sense attachments i signant la petició XML amb WSS”, però en el menú de la segona no hem queda clar ja que “HESTIA” no surt, però suposo que aquí serà una opció més genèrica, quina hauríem de fer servir?

  

Hem podries indicar quin és el fitxer de java que podem veure el procés?, a veure si així podem veure aquest procés que ens indiques?.

  

No ens podríeu passar un xml sencer signat amb tot lo que s’ha d’enviar i com, per intentar veure si ens deixem alguna cosa?.

  

Moltes gracies per l’ajuda.

Albert Rifà

  

[![](download/resources/com.atlassian.confluence.plugins.confluence-view-file-macro:view-file-macro-resources/images/placeholder-medium-file.png)RE Integració PCI HESTIA.msg](/download/attachments/41519656/RE%20%20Integraci%C3%B3%20PCI%20%20%20HESTIA.msg?version=1&modificationDate=1603893761834&api=v2)

Related articles
----------------

  

Related issues

FP#382947

  

  

  

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2018-3-20\_16-2-9.png](attachments/41519656/41519657.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-3-20\_15-59-42.png](attachments/41519656/41519658.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-3-20\_15-57-52.png](attachments/41519656/41519659.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-3-20\_15-56-47.png](attachments/41519656/41519660.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-3-20\_15-56-29.png](attachments/41519656/41519661.png) (image/png)  
![](images/icons/bullet_blue.gif) [RE Integració PCI HESTIA.msg](attachments/41519656/41519662.msg) (application/vnd.ms-outlook)  

Document generated by Confluence on 02 June 2025 10:55

[Atlassian](http://www.atlassian.com/)