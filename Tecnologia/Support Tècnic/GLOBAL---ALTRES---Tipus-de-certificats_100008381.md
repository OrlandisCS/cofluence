Suport Tècnic : GLOBAL - ALTRES - Tipus de certificats  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [02 - FAQ's serveis](26313393.md)
4.  [FAQ's Global](28705585.md)

Suport Tècnic : GLOBAL - ALTRES - Tipus de certificats
======================================================

Created by Unknown User (otecamoya), last modified by OTEC ST JAlejandro Cardete Postigo on 28 November 2023

EN DESENVOLUPAMENT![](https://intranet.aoc.cat/download/thumbnails/93356831/cropped-Favicon.png?version=1&modificationDate=1690390229873&api=v2)

  

**Que és un certificat digital  
**Es tracta d'un document digital que permet identificar a les persones en Internet. Conté les nostres dades identificatives que estiguin autenticades per un organisme oficial. El certificat digital permet la signatura electrònica de documents de manera que s'assegura la identitat de la persona. 

Com veure els certificats que tinc en el meu navegador?

### **Chrome:** 

1.  Aneu a chrome://settings.
2.  En la part esquerra, fes clic en Privacitat i seguretat.
3.  Fes clic en Seguretat.
4.  Desplaça't fins a Configuració avançada.
5.  Fes clic a Gestionar certificats.
6.  En la llista, cerca les autoritats de certificació.

**Firefox:**

1.  En la part superior de l'explorador, selecciona el botó "Eines"> "Opcions".
2.  Selecciona "Avançat".
3.  Fes clic en el botó "Veure Certificats" en la pestanya "Certificats".
4.  En la següent finestra es carregaran tots els certificats que té instal·lats en el navegador, dins de la pestanya "Els seus certificats".
5.  Per a veure de quina CA és el certificat digital i la vigència d'aquest, selecciona'l, i fes doble clic sobre ell.

  

**Els certificats amb format P12 inclouen tant la clau privada (solo usuari), com la clau pública que pot tenir qualsevol persona (metadades informació).**  
**En el moment d'instal·lar un P12 en l'ordinador, si se selecciona l'opció certificat exportable apareixerà una clau.**

Certificats P12

Si una entitat ens passa un certificat P12 per a ús propi amb la seva clau, cal **avisar immediatament** a aquesta entitat que no és correcte realitzar-lo i hem d'eliminar l'arxiu amb el certificat dels nostres sistemes per un tema de seguretat i protecció de dades.  
Un altre cas diferent és, que el P12 de l'entitat es generi cedit en exclusivitat perquè el Consorci pugui fer tràmits en el seu nom.

  

Existeixen diverses maneres per a identificar-se digitalment, com són el DNI electrònic, Signatura digital, etc. Però els més utilitzats són la **TCAT** i la **TCAT-P**.  
  
La **TCAT** o targeta física, té un xip i conté la clau pública i privada de l'usuari, però no té accés a aquesta última.  
En canvi, la **TCAT-P** (virtual), es pot instal·lar en un navegador i es pot accedir tant a la clau pública com a la privada.

 **Classificació segons el tipus d'identitat**  
 Segons aquest criteri podem classificar els certificats electrònics fonamentalment en dos:  
  
  **-Certificats de Persona Física**. Són els que incorporen la identitat d'un subjecte físic o ciutadà. Està orientat a ciutadans (és a dir, a tercers físics) i estan fonamentalment pensats per a tràmits personals encara que, en determinades circumstàncies, poden ser usats en l'àmbit professional.

  **-Certificats de Persona Jurídica**. Incorporen una identitat jurídica. El seu ús està pensat per a tota mena d'organitzacions, siguin empreses, administracions o un altre tipus d'organitzacions, totes elles amb una identitat de tipus jurídic.  
  **\-Certificats d'entitat sense personalitat jurídica.** Vinculen al seu subscriptor unes dades de verificació de signatura i confirma la seva identitat per a ser utilitzats únicament en les comunicacions i transmissions de dades per mitjans electrònics, informàtics i telemàtics en l'àmbit tributari.

  **\-CDA.** Certificat d'aplicació, segell de l'entitat

  

**Certificats AOC:**

*   **TCAT-P - EMÈS PER EC- SECTOR PÚBLIC.**
*   **IDESCAT - EMÈS PER EC- CIUTADANIA.**

  

**Com saber si un certificat està caducat**

![Cómo saber si un certificado digital está caducado paso a paso](https://cdn.urbantecno.com/urbantecno/2023/01/certificado-digital-2.jpg)

*   **Emès per a \[usuari\]**. Indica el nom de la persona per a la qual va ser emès el certificat. O dit d'una altra manera, mostra a qui identifica aquest certificat.
*   **Emès per \[entitat\]**. Revela l'entitat emissora del certificat, que és l'agent de confiança que confirma la teva identitat davant els organismes públics en Internet.
*   **Data d'expiració**. La data de caducitat del teu certificat. Si és anterior a l'actual, és evident que el certificat ja no és vàlid. A més de la validesa tindrà una **"x"** vermella que ho indica.

![](attachments/100008381/100008426.png)

  

**Certificat revocat**

Revocar un certificat és anul·lar la seva validesa abans de la data de caducitat que consta en aquest. La revocació pot ser sol·licitada en qualsevol moment, i especialment, quan el titular cregui que les seves claus privades són conegudes per uns altres.

![Certificado_Revocado_12.png](http://www.santiagobuitragoreis.com/wp-content/uploads/2016/04/Certificado_Revocado_12.png)

  

Es pot utilitzar, per exemple, **Signasuite** (valida PSIS), per a comprovar si el certificat està caducat o revocat (comprova la **CRL**, una llista que es publica amb els certificats revocats en una data en concret).

També es revisa en línia per a saber si un certificat en concret està revocat **(OSCP)**

  

![](attachments/100008381/100008428.png)

  

  

Artículos Relacionados
----------------------

  

  

  

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2023-11-21\_17-24-19.png](attachments/100008381/100008419.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2023-11-22\_14-53-22.png](attachments/100008381/100008426.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2023-11-22\_15-15-49.png](attachments/100008381/100008428.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:55

[Atlassian](http://www.atlassian.com/)