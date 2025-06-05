Suport Tècnic : Sondes ST - ETAULER  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [03 - Monitorització - Revisions globals](26313327.html)
4.  [03 - Monitorització - OLD](128647245.html)
5.  [Sondes S.T.](Sondes-S.T._30869120.html)

Suport Tècnic : Sondes ST - ETAULER
===================================

Created by Unknown User (otecobernal), last modified by Unknown User (oteccmorales) on 14 November 2022

**Sondes Funcionals**

PCI-Edictes\_amb\_incidencies\_en\_alguna\_operacio

  

**Query:**

SELECT count(\*) FROM ETAULER3PCI.ET\_EDICTE WHERE REINTENTS >= 5 AND ESTAT != 2 AND REINTENTS < 20;

**Descripció:** 

Aquesta sonda consulta els edictes de la PCI que presenten algun error:

*   L'edicte no està retirat (estat diferent de 2)
*   L'edicte té 5 o més reintents, que significat que s'han realitzat tots els intents permesos.
*   L'edicte té menys de 20 reintents per no agafar edictes de la blacklist (entre altres casuístiques)

  

**Actuació:** 

VALIDAT

certificat caducat

Les entitats amb el certificat caducat al trustedX no podran despublicar anuncis. No obstant si que poden publicar anuncis si no es troben a la blacklist.

Passes a seguir:
----------------

1.  **Buscar l'edicte:**
    
    Haurem de buscar l'edicte en qüestió:
    
    Edictes enviats per l'EACAT:
    
    **Query**
    
    select PE.\*,
           --EE.\*,
           (case
             when PE.estat = '0' then
              'Pendent de publicar'
             when PE.estat = '1' then
              'Publicat'
             when PE.estat = '2' then
              'Retirat'
             when PE.estat = '-1' then
              'En procés a BEA'
           end) as estat\_pci,
           (case
             when EE.estat = '0' then
              'Esborrany'
             when EE.estat = '1' then
              'Per vistiplau'
             when EE.estat = '2' then
              'Programat'
             when EE.estat = '3' then
              'Publicat'
             when EE.estat = '4' then
              'Retirat'
             when EE.estat = '5' then
              'Esborrat (de moment no implementat)'
           end) as estat\_etauler
      from ETAULER3PL.ET\_EDICTE EE
      left join ETAULER3PCI.ET\_EDICTE PE
        on to\_char(EE.Id) = PE.ID\_EDICTE
     where pe.codi\_ens = '1703910007';
    
      
    
    Edictes enviats per WS:
    
    **Query**
    
    select PE.\*,
           (case
             when PE.estat = '0' then
              'Pendent de publicar'
             when PE.estat = '1' then
              'Publicat'
             when PE.estat = '2' then
              'Retirat'
             when PE.estat = '-1' then
              'En procés a BEA'
           end) as estat\_pci
      from ETAULER3PCI.ET\_EDICTE PE
     where pe.codi\_ens = '1703910007';
    
    Sincronització d'edictes
    
    L'estat que mana és el de la PCI. Amb aquest document s'explica com actuar en cas que l'estat de la PCI no sigui el correcte.
    
    Si l'estat de la PCI és correcte i el que falla és l'estat del PORTLET, és un problema de sincronització.
    
    Possibles causes:
    
    1.  Menys de 5 reintents: Si hi ha menys de 5 reintents haurem d'esperar o bé revisar l'RDBMS associat.
    2.  **Estat = -1 permanent**: Si l'estat a la PCI és -1 i no canvia, l'haurem de posar a l'estat anterior de l'edicte perquè es torni a processar.  
        Si la data de retirada ja ha passat, llavors l'haurem de posar a estat = 1  
        Si la data de retirada encara no ha arribat, llavors l'haurem de posar a estat = 0

  

1.  **Mirar si té el certificat al trustedX caducat:**
    
    Si el certificat que tenen carregat al trustedX està caducat, els edictes finalitzaran amb errors en intentar retirar-se (No es podran signar les diligències generades). 
    
    **Query**
    
    SELECT \* FROM SSC\_AOC.ROL WHERE ROL = 'ETAULER' AND ENS = 'O=1703910007'
    
2.  **Mirar si està a la blacklist:**
    
    Si el certificat està caducat, l'ens hi hauria d'aparèixer a la blacklist. 
    
    select \* from ETAULER3PCI.et\_blacklist where codi\_ens = '1703910007';
    
    Missatge tipus
    
    Si el certificat està caducat i l'ens està a la blacklist, podrem enviar el següent missatge tipus per avisar-los:
    
    El certificat que teníeu carregat a l'e-Tauler està caducat. Hauríeu de sol·licitar un nou certificat per tornar a activar el servei.
    
    Al següent link trobareu les instruccions de com cedir un certificat al Consorci AOC.
    
    [https://suport-tcat.aoc.cat/hc/ca/articles/4413912715025-Com-puc-sol-licitar-un-Segell-Electr%C3%B2nic-de-l-AOC-](https://suport-tcat.aoc.cat/hc/ca/articles/4413912715025-Com-puc-sol-licitar-un-Segell-Electr%C3%B2nic-de-l-AOC-)
    
3.  **Eliminar el procés si ja s'ha creat:  
    **En funció de si l'edicte no es publica o no es despublica, haurem de buscar el procés associat. L'operació 0 està associada al procés de publicació i l'operació 1 al de despublicació. 
    
    Si volem publicar l'anunci i existeix un procés de publicació, l'haurem d'eliminar.
    
    \-- PUBLICAR
    select \* from ETAULER3PCI.Et\_Proces where operacio = 0 and id=239764;
    delete from ETAULER3PCI.Et\_Proces where operacio = 0 and id=239764;
    
    
    --DESPUBLICAR
    select \* from ETAULER3PCI.Et\_Proces where operacio = 0 and id=239764;
    delete from ETAULER3PCI.Et\_Proces where operacio = 1 and id=239764;
    
4.  **Canviar l'estat si escau**
    
    En funció de si l'edicte està en un estat que no és el correcte l'haurem de canviar. Si l'edicte no es publica, l'haurem de canviar a estat pendent, si l'edicte no es despublica, l'haurem de canviar a estat publicat.
    
5.  **Baixar els reintents:**  
    Finalment haurem de baixar els reintents a 3 perquè es torni a intentar l'acció de publicar/despublicar.
    
    update ETAULER3PCI.ET\_EDICTE PE set reintents = 3 where id=119541;
    
6.  **Revisar que es genera la diligència.**  
    TO DO
    
7.  **Revisar els logs:**  
    ![](attachments/26313382/26315249.png)  
      
    cd /apps/aoc/APP/logs  
    grep 193451 MC-ETAULER\_APPNODO\*.log (Buscar per la columna ID de la ET\_EDICTE de la PCI)  
    ![](attachments/26313382/26315247.png)  
    Descarregar el fitxer i mirar l'error que apareix:  
    ![](attachments/26313382/26315265.png)

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

PL-Edictes\_no\_publicats\_en\_la\_data\_establerta

  

**Query:**

SELECT count(\*) FROM ETAULER3PL.ET\_EDICTE WHERE SYSDATE > (DATA\_INICI\_EXPOSICIO + 15/24/60) AND ESTAT = 2 AND (REINTENTS < 20 or reintents is null);

**Descripció:** 

Aquesta sonda consulta els edictes del PORTLET que no s'han publicat en la data establerta:

*   L'edicte està pendent de publicar (estat igual a 2).
*   La data de publicació és menor a la data actual amb un marge de 15 minuts.
*   L'edicte té 5 o més reintents, que significa que s'han realitzat tots els intents permesos.
*   L'edicte té menys de 20 reintents per no agafar edictes de la blacklist (entre altres casuístiques).

  

**Actuació:** 

Primer de tot localitzarem els edictes amb un estat incorrecte, en aquest cas, els que haurien d'estar publicats i no ho estan. Farem servir la següent consulta:

SELECT \* FROM ETAULER3PL.ET\_EDICTE WHERE SYSDATE > (DATA\_INICI\_EXPOSICIO + 15/24/60) AND ESTAT = 2 AND (REINTENTS < 20 or reintents is null);

D'aquest llistat ens interessa el camp **ID**.

**![](attachments/28705330/30869701.png)**

Un cop tenim el llistat d'edictes, copiem tots els ID's.

Molt d'ull, ara canviem de BBDD, d'**ETAULER3PL** a **ETAULER3PCI**.

La següent consulta mostra el procés de **publicació** de tots els edictes que li indiquem.

Select pci.id\_edicte "ID PL", pci.reintents, proces.\*
  from etauler3pci.et\_edicte pci, etauler3pci.et\_proces proces
 where pci.id = proces.id\_edicte
   and pci.estat = '1'
   and pci.eacat = '1'
   and pci.reintents != '99'
   and pci.id\_edicte in ('234366', '654321', '123456'); --> Aquí posem els ID's de la primera consulta, es poden posar tants com vulguem.

Exemple d'un possible resultat quan executem la consulta anterior:

![](attachments/28705330/30869703.png)

**El més comú és que la base de dades de PCI i la de PL no se sincronitzin de manera correcta, és a dir, en PCI mostrarà l'estat correcte i en la PL mostrarà un estat incorrecte.**

**Per a solucionar aquesta casuística "forçarem" la sincronització canviant el camp SINCRONITZAT\_EACAT a 0.**

La següent consulta canvia l'estat del camp **SINCRONITZAT\_EACAT** dels processos que li indiquem a **0**.

Update etauler3pci.et\_proces proces
   set proces.sincronitzat\_eacat = '0'
 where id in ('363504'); --> Sempre informarem l'ID de la taula ETAULER3PCI.ET\_PROCES per evitar confusions.

**logs:** 

*   **Servidor:** Tomcat 8 - EACAT
*   **Ruta:** /mnt/storage30/aoc/APP/logs
*   **Nom:**  aoc-l-tomcat8-01-pro

PL-Edictes\_no\_retirats\_en\_la\_data\_establerta

  

**Query:**

SELECT count(\*) FROM ETAULER3PL.ET\_EDICTE WHERE SYSDATE > (DATA\_FI\_EXPOSICIO + 15/24/60 + 1) AND ESTAT = 3 AND (REINTENTS < 20 or reintents is null);

**Descripció:** 

Aquesta sonda consulta els edictes del PORTLET que no s'han despublicat en la data establerta:

*   L'edicte està publicat (estat igual a 3).
*   La data de retirada és menor a la data actual amb un marge de 15 minuts.
*   L'edicte té 5 o més reintents, que significat que s'han realitzat tots els intents permesos.
*   L'edicte té menys de 20 reintents per no agafar edictes de la blacklist (entre altres casuístiques).

  

**Actuació:** 

Buscar els edictes afectats i amb estat incorrecte:

select \*
  from etauler3pl.et\_edicte pl
 where pl.data\_fi\_exposicio < to\_date('03/01/2022', 'dd/mm/yyyy') -- Dia actual
   and pl.estat = '3'
   AND (pl.REINTENTS < 20 or pl.reintents is null)
   and pl.data\_fi\_exposicio > to\_date('01/01/2019', 'dd/mm/yyyy') -- Aquí fiquem un data límit, normalment el primer dia de l'any.

D'aquesta consulta agafarem tots els IDs dels edictes que apareguin i els fiquem en la següent consulta:

select pci.id\_edicte "ID PL", proces.\*
  from etauler3pci.et\_edicte pci, etauler3pci.et\_proces proces
 where pci.id = proces.id\_edicte
      and proces.operacio = '1' -- Filtrem per l'operació despublicar (0=Publicar i 1=Despublicar)
      --and pci.reintents != '99' -- Filtrem per les entitats que no estan a la blacklist
   and pci.eacat = '1'
   and pci.id\_edicte in ('227822', '227824')

Si trobem el camp SINCRONITZAT\_EACAT està a 1, el tornem a posar a 0 i esperem que el gestor de tasques actuï.

update ETAULER3PCI.et\_proces p
set p.sincronitzat\_eacat = '0'
where p.id = 173797

**logs:** 

*   **Servidor:** Tomcat 8 - EACAT
*   **Ruta:** /mnt/storage30/aoc/APP/logs
*   **Nom:**  aoc-l-tomcat8-01-pro

EDICTES\_EXTERNS(PL-Edictes\_externs\_no\_processats)

  

**Query:**

SELECT count(\*) FROM ETAULER3PL.ET\_EDICTE\_EXTERN where ESTAT=2;

**Descripció:** 

Aquesta sonda consulta els edictes externs que es troben descartats per reintents.

L’e-Tauler és un servei que permet gestionar els propis edictes i rebre edictes d’altres ens registrats a **l’EACAT** però no permet fer l’enviament d’edictes.

Es poden enviar edictes a altres ens fent servir la plataforma EACAT sempre que el receptor estigui adherit a l’e-Tauler

  

El camp EDICTE\_ID de la taula de referència al CAMP ID de la taula ET\_EDICTE (del Portlet).

Hi ha dos tipus de registres dins de la taula:

*   Tipus 0: Són edictes
*   Tipus 1: Són Diligències

  

**Actuació:** 

**Per validar procediment amb ST (fer proposta i enviar)**

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

EDICTES\_EXTERNS\_No\_creats\_al\_eTauler (PL-Edictes\_externs\_no\_creats\_al\_eTauler)

  

**Query:**

select count(\*) from ETAULER3PL.ET\_EDICTE\_EXTERN where SYSDATE > (DATA + 15/24/60 ) AND ESTAT = 0

**Descripció:** 

Aquesta sonda consulta els edictes externs que no s'han processat però haurien d'haver-se processat (que fa un dia i 15 minuts que haurien d'estar en estat processat).

L’e-Tauler és un servei que permet gestionar els propis edictes i rebre edictes d’altres ens registrats a **l’EACAT** però no permet fer l’enviament d’edictes.

Es poden enviar edictes a altres ens fent servir la plataforma EACAT sempre que el receptor estigui adherit a l’e-Tauler

  
El camp EDICTE\_ID de la taula de referència al CAMP ID de la taula ET\_EDICTE (del Portlet).

Hi ha dos tipus de registres dins de la taula:

*   Tipus 0: Són edictes
*   Tipus 1: Són Diligències

  

**Actuació:** 

**Per validar procediment amb ST (fer proposta i enviar)**

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

Peticions\_ETAULER\_pendents\_de\_sincronitzacio\_-Gestor-tasques(PCI-Edictes\_pendents\_de\_sincronitzacio)

  

**Query:**

SELECT count(\*) FROM ETAULER3PCI.ET\_PROCES WHERE SINCRONITZAT\_EACAT = 0 AND DATA >= sysdate-1200/(24\*60\*60);

**Descripció:** 

Aquesta sonda consulta els processos de sincronització dels edictes, per tal que tinguin el mateix estat a la PCI i al PORTLET:

  

**Actuació:** 

Els edictes no es sincronitzen al PL i per tant no surten publicats/despublicats a l'EACAT.

El procés encarregat de sincronitzar l’estat d’EACAT (PL) i la PCI, es troba dins l’EACAT. Correspon al Gestor de tasques d’EACAT:

*   Monitor PRO: [ORACLE\_QUERY\_OTAP-GESTOR\_DE\_TASQUES\_CAT\_81374](https://op5-aoc.atlasit.com/monitor/index.php/extinfo/details?type=service&host=HA00668_CAT&service=ORACLE_QUERY_OTAP-GESTOR_DE_TASQUES_CAT_81374)
*   Monitor PRE: [ORACLE\_QUERY\_OTAP-GESTOR\_DE\_TASQUES\_CATPRE\_85021](https://op5-aoc.atlasit.com/monitor/index.php/extinfo/details?type=service&host=HA00178_CATPRE&service=ORACLE_QUERY_OTAP-GESTOR_DE_TASQUES_CATPRE_85021)

. Per aquesta raó ens haurem de connectar amb l’usuari AdminCSI i una vegada a dins anar al gestor de tasques.

Per accedir al gestor de tasques seguir les passes de la FAQ : [EACAT - EINES DEL SERVEI - Accedir al Gestor de Tasques d'EACAT](https://confluence.aoc.cat/display/SII/EACAT+-+EINES+DEL+SERVEI+-+Accedir+al+Gestor+de+Tasques+d%27EACAT)

1.   Anem a la tasca “eTauler Sincronitza Edictes i revisem que no estigui en procés (en la columna “En execució” sortirà un dibuix ![](attachments/26313665/26316903.png) ). Si ho està, clicar el botó d'“Aturar” i tornar a clicar en “Executa”. 
    
      
    ![](attachments/26313665/26316905.png)
2.  Realitzades les accions anteriors, si no se soluciona el problema, hem de seguir les següents passes:
    
    *   Revisar els logs de l’eTauler: **_/apps/aoc/APP/logs/ ETAULER\_AppNodo?.log_**
    *   Revisar també la web d’admin de la PCI per veure si entren peticions de sincronització i veure si es processen.\*Hem de tenir en compte que en l’XML si no hi ha res a sincronitzar, sortirà com a codiResultat a 0, però si existeixen dades, sortiran les dades dels edictes pendents a sincronitzar. 

  

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

**RDBMS**

Com revisar els RDBMS?

  

**Descripció:** 

Si un RDBMS té els registres molt alts, haurem de revisar si l'RDBMS està funcionant correctament. Per fer-ho podem anar a la [webAdmin dels RDBMS](http://admin3.app.aoc.cat/pci3-rdbmseg-admin/), buscar el desitjat i clicar sobre el raig per verificar si processa registres:

  

**Actuació:** 

  

El RDBMS, s'encarrega de fer una qua de totes les peticions, per a que es pugin processar lentament i aixì no es saturi el servei.

Revisar - si el RDBMS està enganxat

Per revisar si el RDBMS està enganxat es pot revisar desde 00 SONDES → GENERAL  i podem veure que no s'estàn procesant les peticions. Aparenment segons el correu sembla que totes estiguin enganchades.

![](attachments/41521689/41521706.png)![](attachments/41521689/41521708.png)

Per a revisar-ho manualment caldrà anar al admin.

[http://10.120.4.57/pci3-mti-admin/peticions/mti](http://10.120.4.57/pci3-mti-admin/peticions/mti)

a l'apartat de RDBMS Admin.

![](attachments/41521689/41521699.png)

I podrem fer clic al rayito per executar una consulta, que fa un count de totes les peticions que estàn a la cua, per tal de ser procesades. 

![](attachments/41521689/41521709.png)

Executarem i verem que no baixa, (hauria de baixar cada timeInterval, en aquest cas 3 segons).

I amb això ja hem revisat si està funcionant o no, en cas de que no funcioni i els registres no baixin caldrà realitzar procedimentar amb el reinici del RDBMS.

  

Reiniciar - si el RDBMS està enganxat

  

Un cop verificat que el RDBMS, no funciona, caldrà procedir a "reiniciarlo", per això caldrà crearlo de nou amb un nom diferent, donat qué la BBDD té cache i si es posa el mateix nom, no funcionarà.

Procedirem a aturar el RDBMS.

![](attachments/41521689/41521711.png)

I crearem un de nou copiant totes les dades, del RDBMS antic al nou. 

Aquí es poden trobar totes les dades que té el RDBMS,

*   **timeInterval**, el temps amb el que envia a que les peticions es procesin, 
*   **query**, la consulta que fa per contar les peticions encuades.
*   **postQuery**, la query que llança per a que les petis encuades, es comencin a procesar.
*   **undoPostQuery**, no estic del tot segur, em podries comentar que es el que fa joan?.

Dades del RDMBS 

Creació nou RDMBS

![](attachments/41521689/41521712.png)

![](attachments/41521689/41521713.png)

  
Un cop creat caldrà tornar a revisar si funciona, per això caldrà fer click al rayito, i revisar la consulta.

![](attachments/41521689/41521715.png)

Podem veure que s'estàn procesant les peticions encuades i podrem procedir a esborrar l'antic RDBMS que estava en suspendend. 

![](attachments/41521689/41521717.png)

I amb això ja ens quedaría el RDBMS, funcionant.

  

  

  

  

  

  

  

Quins RDBMS hi han configurats?

SELECT \* FROM AOC\_RDBMS\_EVENT\_GENERATOR
WHERE TYPE = 'RDBMS'
AND IS\_SUSPENDED = 0
AND DATASOURCE\_NAME = 'ETAULER'

Informació rellevant del servei

**Estat**

**PCI**

PORLET

**EDICTES EXTERNS**

\-1

En procés del BEA

\-

\-

0

Pendent de publicar

Esborrany

No processat

1

Publicat

Per vistiplau

Processat

2

Retirat

Programat

Descartat per reintents

3

\-

Publicat

Ens destí sense e-TAULER

4

\-

Retirat

\-

5

\-

Esborrat 

\-

<a href="https://confluence.aoc.cat/plugins/servlet/gadgets/ifr?container=atlassian&amp;mid=1885526753280&amp;country=GB&amp;lang=en&amp;view=default&amp;view-params=%7B%22writable%22%3A%22false%22%7D&amp;st=atlassian%3A863Fl38ikKqY2M25S7cDmgTyAjOgh%2B5ZmJmA2KgJtp3roqIvtJuI58CfUF1OxvRiJvTxpezhp%2F%2BIoBfZq4vUeMA3uet79nTn826irH5bNHNhRnDpi88jd917Kg7m2uS9%2FxpjPuzSHQuem1oTDbKC2tsjcSJWQxlzNhMj89TpfOUtLukFTZAVFrNXCICDfsdUpx2toEvsphFEwJywNzWO7tlxOu2hHl9Wc31rXsrET93zHqSOmX1JHlVGXvgYlzpvKKR20QORF9nPw4bWFHmYK8vvR81PrMJ%2F8%2FkqxSdG7pGXOxMUXPxEm2ZETyvePQv69YD2GBrXGfBGmtvs7Nv5Bs%2FHjbGdQCgkNhacoUUeYoM%2BnIgR&amp;up\_isConfigured=true&amp;up\_spaceName=&amp;up\_spaceKey=SII&amp;up\_pageName=e-TAULER+%28Tauler+electr%C3%B2nic%29&amp;up\_pageId=26313455&amp;up\_showLink=true&amp;up\_refresh=false&amp;up\_isEditable=false&amp;url=https%3A%2F%2Fconfluence.aoc.cat%2Frest%2Fgadgets%2F1.0%2Fg%2Fcom.atlassian.confluence.plugins.gadgets%3Aconfluence-page-gadget%2Fgadgets%2Fconfluence-page-gadget.xml&amp;libs=auth-refresh#rpctoken=1919939777">\_\_MSG\_gadget.confluence.page.title\_\_</a>

###   
![](https://intranet.aoc.cat/plugins/servlet/confluence/placeholder/unknown-attachment?locale=es_ES&version=2)![](https://intranet.aoc.cat/plugins/servlet/confluence/placeholder/unknown-attachment?locale=es_ES&version=2)

PCI:

![](plugins/servlet/confluence/placeholder/unknown-attachment)

  

PL:

![](plugins/servlet/confluence/placeholder/unknown-attachment)

[https://suport-etauler.aoc.cat/hc/ca/articles/4405128045213-Documentaci%C3%B3-de-suport-a-la-integraci%C3%B3-amb-el-servei-web-d-e-Tauler](https://suport-etauler.aoc.cat/hc/ca/articles/4405128045213-Documentaci%C3%B3-de-suport-a-la-integraci%C3%B3-amb-el-servei-web-d-e-Tauler)

[P](https://www.aoc.cat/wp-content/uploads/2019/04/comunicacio-de-domicili-2-0-manual-dusuari.pdf)endent

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2019-2-18\_15-59-51.png](attachments/28705319/28705322.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-2-18\_16-0-0.png](attachments/28705319/28705323.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:11

[Atlassian](http://www.atlassian.com/)