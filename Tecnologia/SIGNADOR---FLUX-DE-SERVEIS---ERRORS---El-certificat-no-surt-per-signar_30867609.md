Suport Tècnic : SIGNADOR - FLUX DE SERVEIS - ERRORS - El certificat no surt per signar  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [02 - FAQ's serveis](26313393.html)
4.  [FAQ's SIGNADOR](30867480.html)
5.  [SIGNADOR - FLUX DEL SERVEI - ERRORS - Errors comuns al signar](SIGNADOR---FLUX-DEL-SERVEI---ERRORS---Errors-comuns-al-signar_41519394.html)

Suport Tècnic : SIGNADOR - FLUX DE SERVEIS - ERRORS - El certificat no surt per signar
======================================================================================

Created by Unknown User (otecagonzalez), last modified on 13 November 2019

**Comprovar certificats carregats**

En el cas que l'usuari en informi que no se li mostren els certificats a l'hora de triar-ne un per signar, podrem fer les revisions següents:

  

1- Anar a: [https://usuari.enotum.cat/webCiutada/](https://usuari.enotum.cat/webCiutada/) i accedim amb certificat.

D'aquesta manera veurem els certificats que tenim carregats al magatzem de certificats:

![](attachments/30867609/30867610.png)

  

2- Revisar magatzems de certificats **Windows:**

*   *   Opciones de Intenet **>** Contenido **>** Certificados  
        ![](attachments/30867609/30867662.png)

  

3- En cas que l'usuari tingui un SO diferent a windows o al instal·lar l'app nativa va decidir obtenir els certs del magatzem de **FireFox** podrem revisar aquest magatzem seguint els següents passos:

*   *   Obrir Firefox **\>** a la barra del navegador enganxem "about:preferences#privacy" **\>** Busquem l'apartat certificats **\>** Mostra els certificats:  
        ![](attachments/30867609/30867663.png)

  

  

**Instal·lar certificat**

En el cas de que detectem que no tenen el certificat ben carregat podem seguir la FAQ següent on explica com instal·lar un certificat al magatzem de Windows i Firefox:

****[https://github.com/ConsorciAOC/signador/blob/master/guiaUsuaris/nativa.md#5-installar-certificat](https://github.com/ConsorciAOC/signador/blob/master/guiaUsuaris/nativa.md#5-installar-certificat)****

**Paràmetres de filtratge de certificats (app integrada amb signador)**

Quan una aplicació integra el signador es permet configurar uns paràmetres de negoci per el procés de signatura.

En aquests paràmetres es poden filtrar quins tipus de certificats ha d'utilitzar l'usuari per signar.

_Per exemple:_ El DNI sigui un concret, la UO sigui una explícita, el certificat sigui de signatura i no de autorització....

  

Per saber més al detall els paràmetres de filtratge consultar la [FAQ](https://github.com/ConsorciAOC/signador#27-filtres-de-certificats-certs_cfg).

allowed\_CAs

Permet filtrar mitjançant el _CommonName_ de l'_IssuerDistinguishedName_ del certificat. Es poden indicar múltiples entrades separades per punts i comes `;`. El filtre és _case insensitive_. Exemple: `“EC-SAFP;EC-idCAT”`.

allowed\_OIDs

Permet filtrar mitjançant l'identificador de la directiva de certificat que apareix a l'extensió _Bases del certificat_. Es poden indicar múltiples entrades separades per punts i comes `;`.

selected\_alias

Permet filtrar per l'àlies del certificat. Es comprova que existeixi en el dispositiu / magatzem seleccionat.

selected\_CN

Permet filtrar per el _CommonName_ dins del _SubjectDistinguishedName_ del certificat.

subject\_Text

Permet filtrar per una cadena de text que ha d'estar present dins de qualsevol dels camps del _SubjectDistinguishedName_ del certificat. El filtre és _case insensitive_. Exemple: `“Director General”`

required\_nif

Aquest paràmetre no permet el filtrage a priori, sinó que el que fa és realitzar una comprovació contra [PSIS](http://web.aoc.cat/blog/serveis/validador/) previa a la realització de la signatura, validant que el certificat seleccionat per l'usuari és correspon amb el _NIF_ indicat en aquest camp. Cas que no sigui així l'applet no continuarà amb l'operació de signatura i mostrarà el missatge d'error corresponent.

psis\_validation

Igual que el paràmetre required\_nif aquest paràmetre fa una validació previa del certificat abans de realitzar la signatura. Simplement valida que el certificat sigui reconegut per [PSIS](http://web.aoc.cat/blog/serveis/validador/).

keyUsage

Permet filtrar per l'ús de la clau del certificat. Els possibles valors d'aquest atribut són:

*   FD : Firma digital.
*   NR : Non repudiation.

Es poden indicar múltiples entrades separades per punts i comes `;`. El filtre es _case insensitive_. Per defecte filtra per les dues opcions. Exemple: `"NR; FD"`.

**Important**: Si esta com NR → El certificat només pot ser de signatura, i no de Autorització (AUT)

  

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2019-11-12\_18-16-27.png](attachments/30867609/30867610.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-13\_10-32-18.png](attachments/30867609/30867662.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-13\_10-38-19.png](attachments/30867609/30867663.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:59

[Atlassian](http://www.atlassian.com/)