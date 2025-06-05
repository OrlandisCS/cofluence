Suport Tècnic : Sondes S.T.  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [03 - Monitorització - Revisions globals](26313327.html)
4.  [03 - Monitorització - OLD](128647245.html)

Suport Tècnic : Sondes S.T.
===========================

Created by Unknown User (otecobernal), last modified on 17 December 2019

En aquest apartat s'expliquen les sondes gestionades per Suport Tècnic. També s'explica com gestionar els serveis/processos quan les sondes mostrin alertes.

NO COMPLETAT

e-NOTUM

Unable to render {include} The included page could not be found.

NO COMPLETAT

e-TAULER

  

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

<a href="https://confluence.aoc.cat/plugins/servlet/gadgets/ifr?container=atlassian&amp;mid=1885526753280&amp;country=GB&amp;lang=en&amp;view=default&amp;view-params=%7B%22writable%22%3A%22false%22%7D&amp;st=atlassian%3AIdEYjnSsXq%2FsZncwtbEV234Umozz37l7NGts8hlhbO2GT5EZ6FYVAbtwNUxNBbzdwfxndSSBGiWc7XvMDGRTssInh1%2FAeHhbVn%2FfuI6%2F9wfTunDvhnLSrdd20FtpRbqsl7HrBiOKAPkV2EQmeX2xLrTRQiSciy2vdaYSyRctlv18Dbrwq2gyaB2pOyo9iYha8I%2F1chQwPd%2FH%2BMVgEuO5QtSQwWsNI7tZYu4uIP6afVIbTccLhNbDkm0xO3HEFSTOrs3S9Db4xn6hZPlnvgfziulgHnwKXeND6I5Xoh%2Bwcxzq8rOmvcGHuV8W9Gm24Vo6pghpg0Z0pU9vct1TLnerJlSuwrmrpLR1tWOnBZS2bmvwsQvs&amp;up\_isConfigured=true&amp;up\_spaceName=&amp;up\_spaceKey=SII&amp;up\_pageName=e-TAULER+%28Tauler+electr%C3%B2nic%29&amp;up\_pageId=26313455&amp;up\_showLink=true&amp;up\_refresh=false&amp;up\_isEditable=false&amp;url=https%3A%2F%2Fconfluence.aoc.cat%2Frest%2Fgadgets%2F1.0%2Fg%2Fcom.atlassian.confluence.plugins.gadgets%3Aconfluence-page-gadget%2Fgadgets%2Fconfluence-page-gadget.xml&amp;libs=auth-refresh#rpctoken=1013035466">\_\_MSG\_gadget.confluence.page.title\_\_</a>

###   
![](https://intranet.aoc.cat/plugins/servlet/confluence/placeholder/unknown-attachment?locale=es_ES&version=2)![](https://intranet.aoc.cat/plugins/servlet/confluence/placeholder/unknown-attachment?locale=es_ES&version=2)

PCI:

![](plugins/servlet/confluence/placeholder/unknown-attachment)

  

PL:

![](plugins/servlet/confluence/placeholder/unknown-attachment)

[https://suport-etauler.aoc.cat/hc/ca/articles/4405128045213-Documentaci%C3%B3-de-suport-a-la-integraci%C3%B3-amb-el-servei-web-d-e-Tauler](https://suport-etauler.aoc.cat/hc/ca/articles/4405128045213-Documentaci%C3%B3-de-suport-a-la-integraci%C3%B3-amb-el-servei-web-d-e-Tauler)

[P](https://www.aoc.cat/wp-content/uploads/2019/04/comunicacio-de-domicili-2-0-manual-dusuari.pdf)endent

FINALITZAT

Canvi de Domicili

  

**Sondes Funcionals**

CDOMICILI - Volants en estat d'error

  

**Query:**

SELECT COUNT(ID) FROM CD\_TITULAR WHERE ESTAT=0 AND INTENTS=5

**Descripció:** 

Sonda funcional del CDOMICILI. Monitora la primera fase del servei, on es demana el volant d'empadronament de la persona que canviarà de domicili (TITULAR). En fases futures, s'enviarà aquest volant a l'emissor (MINHAP, CATSALUT, etc).

La sonda mostra les peticions del padró (TITULAR) que es troben en estat d'error i estan pendents de processar per l'RDBMS o han arribat a 5 reintents.

Podem extreure informació dels ens que han realitzat els consums amb la següent consulta:

SELECT ens.uen\_nom\_curt, proces.codi\_ens, count(\*) 
FROM CD\_TITULAR titular, CD\_PROCES proces, usu\_ens ens
WHERE proces.id = titular.id\_proces
AND proces.codi\_ens = ens.uen\_codi\_ens
AND titular.ESTAT = 0
AND titular.INTENTS = 5
group by ens.uen\_nom\_curt, proces.codi\_ens
order by count(\*) desc

Aquesta sonda està relacionada amb l'aplicació del padró de l'Ajuntament que realitza el canvi de domicili, ja que si el padró es troba **indisponible**, les peticions no funcionaran.

Podem buscar les comunicacions a la web admin: [http://admin3.iop.aoc.cat/pci3-cdomicili-admin/](http://admin3.iop.aoc.cat/pci3-cdomicili-admin/comunicacions/11)

o buscar una comunicació específica pel seu ID: [http://admin3.iop.aoc.cat/pci3-cdomicili-admin/comunicacions/](http://admin3.iop.aoc.cat/pci3-cdomicili-admin/comunicacions/11)ID

  

**Actuació:** 

Aquesta sonda està associada al **RDBMS CDOMICILI-VOLANT**. Quan aquesta sonda té els registres molt alts hi ha dues possibles casuístiques:

1.  Que els registres tinguin menys de 5 reintents: Probablement l'RDBMS no es trobi operatiu → Revisar que l'RDBMS processi a través de la [webAdmin](http://admin3.iop.aoc.cat/pci3-rdbmseg-admin/):  
    ![](attachments/28705217/28705219.png)
    
2.  Que els registres hagin arribat als reintents: Probablement el servei del padró de l'Ajuntament que realitza la consulta no es troba disponible. A l'intentar fer una petició de TITULAR, el servei web no respon i el PADRÓ falla.
    
    Si el servei del PADRÓ de l'Ajuntament no es troba disponible, primer haurem de solucionar el problema. Un cop es trobi disponible, podrem baixar els reintents perquè les peticions es tornin a intentar:
    
    update CD\_TITULAR t set intents = 4
    where t.ESTAT=0 AND t.INTENTS=5
    
3.  En qualsevol altre cas, haurem de revisar quin ha sigut l'error. Podrem reiniciar les peticions i fer ús dels logs de l'aplicació per revisar qualsevol altre tipus d'error i actuar.
    
    Si el volant del padró és un **NO\_CONSTA,** fallarà i haurem de contactar amb l'Ajuntament indicant que la persona no consta com a convivent al seu municipi.  
    
      
    
    És possible que surtin tants "errors" perquè les comunicacions es van fer de manera incorrecta (sense informar del NIF). Per comprovar aquesta casuística hem de mirar si els registres tenen el camp "DOCUMENTACIO" informat:
    
    ![](attachments/28705217/28705643.png)  
    
    En aquest cas el que s'ha de fer és pujar els reintents d'aquests registres a 10 perquè no tornin a aparèixer a la sonda.
    
    \-- Revisar si han informat el NIF
    SELECT documentacio, count(\*) FROM CD\_TITULAR WHERE ESTAT=0 AND INTENTS<=5
    group by documentacio
    
    
    -- Posar 10 reintents perquè no apareguin a la sonda
    update CD\_TITULAR t set intents = 10
    where t.ESTAT=0 AND t.INTENTS=5
    and t.DOCUMENTACIO is null
    
    En cas que els registres pertanyin al mateix ens, podrem enviar un correu informant-los de les comunicacions incorrectes que realitzen.
    

**logs:** 

*   **Servidor:** tomcat8@aoc-l-eacat8-?-pro - 10.120.1.65 (node 1)
*   **Ruta:** /apps/aoc/IOP/logs
*   **Nom:**  MC-CDOMICILI\_IOPNODO?.log

  
  

CDOMICILI - Comunicacions en estat d'error

  

**Query:**

SELECT COUNT(t.ID) FROM CD\_COMUNICACIO c, CD\_TITULAR t WHERE c.ID\_TITULAR=t.ID AND c.ESTAT=0 AND c.INTENTS<=5 AND t.ESTAT!=0

**Descripció:** 

Sonda funcional del CDOMICILI. Monitora la segona fase del servei, on s'envia el volant d'empadronament de la persona que canviarà de domicili (TITULAR) a l'emissor (MINHAP, CATSALUT, etc).

La sonda mostra les comunicacions que es troben en estat d'error i estan pendents de processar per l'RDBMS o han arribat a 5 reintents. 

Podem extreure informació de l'ens que ha realitzat el consum amb la següent consulta:

SELECT ens.uen\_nom\_curt, proces.codi\_ens, count(\*) 
FROM CD\_TITULAR titular, CD\_PROCES proces, CD\_COMUNICACIO comunicacio, usu\_ens ens
WHERE proces.id = titular.id\_proces
AND proces.codi\_ens = ens.uen\_codi\_ens
AND comunicacio.ID\_TITULAR = titular.ID 
AND comunicacio.ESTAT = 0 
AND comunicacio.INTENTS <= 5 
AND titular.estat = 1
group by ens.uen\_nom\_curt, proces.codi\_ens
order by count(\*) desc

  
Per obtenir més informació de l'error, podem buscar les peticions (s'informen a la taula procés) a la web admin: [http://admin3.iop.aoc.cat/pci3-cdomicili-admin/](http://admin3.iop.aoc.cat/pci3-cdomicili-admin/comunicacions/11)

Un cop trobem la petició podrem veure la resposta de l'emissor de les dades (Sol·licitud → Evidències → Resposta)

  

**Actuació:** 

Aquesta sonda esta associada al **RDBMS CDOMICILI-COMUNICACIO**. Quan aquesta sonda té els registres molt alts hi ha dues possibles casuístiques:

1.  Que els registres tinguin menys de 5 reintents: Probablement l'RDBMS no es trobi operatiu → Revisar que l'RDBMS processi a través de la [consola](http://admin3.iop.aoc.cat/pci3-rdbmseg-admin/):  
    ![](attachments/28705222/28705228.png)
    
2.  Que els registres hagin arribat als reintents: S'haurà de revisar l'error als logs i veure perquè la comunicació no finalitza.
    
    Aquesta sonda està associada a una altra sonda del CDOMICILI (**CDOMICILI-Volants en estat d'error**). Si veiem que les dues presenten registres alts, haurem d'arreglar primer l'altra sonda.
    
    En cas de voler intentar fer la comunicació un altre cop:
    
    update CD\_COMUNICACIO t set intents = 4
    where t.ESTAT=0 AND t.INTENTS=5
    
    Els errors de l'emissor estan relacionats amb el VOLANT del padró. Haurem de revisar el VOLANT del padró per mirar que no hi hagin dades incorrectes codis no normalitzats per l'INE, caràcters extranys, etc.
    

**logs:** 

*   **Servidor:** tomcat8@aoc-l-eacat8-?-pro - 10.120.1.65 (node 1)
*   **Ruta:** /apps/aoc/IOP/logs
*   **Nom:**  MC-CDOMICILI\_IOPNODO?.log

  

  

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
AND DATASOURCE\_NAME = 'CDOMICILI'

Informació rellevant del servei

Pendent de penjar per l'AOC.

De moment podem enviar:

[![](rest/documentConversion/latest/conversion/thumbnail/36340279/1)](/download/attachments/28705209/DI%20-%20Via%20Oberta%20-%20Comunicaci%C3%B3%20de%20domicili.pdf?version=1&modificationDate=1585126077099&api=v2)

[https://www.aoc.cat/wp-content/uploads/2019/04/comunicacio-de-domicili-2-0-manual-dusuari.pdf](https://www.aoc.cat/wp-content/uploads/2019/04/comunicacio-de-domicili-2-0-manual-dusuari.pdf)

<a href="https://confluence.aoc.cat/plugins/servlet/gadgets/ifr?container=atlassian&amp;mid=1885519544320&amp;country=GB&amp;lang=en&amp;view=default&amp;view-params=%7B%22writable%22%3A%22false%22%7D&amp;st=atlassian%3A4AocaR5PoJLLGxk5hlTs%2BQtL%2Fc5T%2BRTlfJ09hxID9Wq1k57oNJQ7GmWdT2A0Rr3aZ3ilp%2FV6PH6AFGygMRC1xj25wPkZPUJTf%2BbbyEY2Xw8ZQabeDH7Zma8rujj9blwIOHXl5V6Rx1Sg2Z5WY3IWPEO3mP2oBq9G3gAh6v%2BKxeVg7Djp7rGbgppESthCv1u94WJ%2B6LKNTAzugluhdkp60axXS90AGB%2Fr%2FSknA6XnMMyaT3MiIEp34ZnPctFSOBtPibknMGEZBbbLtJoOiLe4iE351XDq6Rg2qtY1%2FM1Dph6CpuFXZPfwaUnV%2FBysEzPJy55Gd20cC7YianKcRLDgV3%2BVmfmdWgxtA%2Bba%2BP1vIFFSU7jh&amp;up\_isConfigured=true&amp;up\_spaceName=&amp;up\_spaceKey=SII&amp;up\_pageName=CDOMICILI++%28Comunicaci%C3%B3+De+Domicili%29&amp;up\_pageId=26313213&amp;up\_showLink=true&amp;up\_refresh=false&amp;up\_isEditable=false&amp;url=https%3A%2F%2Fconfluence.aoc.cat%2Frest%2Fgadgets%2F1.0%2Fg%2Fcom.atlassian.confluence.plugins.gadgets%3Aconfluence-page-gadget%2Fgadgets%2Fconfluence-page-gadget.xml&amp;libs=auth-refresh#rpctoken=1471660068">\_\_MSG\_gadget.confluence.page.title\_\_</a>

FINALITZAT

iARXIU

  

**Sondes Funcionals**

IARXIU\_INGRES\_REINTENTS\_ESGOTATS

  

**Query:**

SELECT 'IARXIU\_INGRES\_REINTENTS\_ESGOTATS' OTAP, count(\*) REGISTRES FROM MSC.MSC\_IARXIU\_INGRES  WHERE REINTENTS=5 AND ESTAT=0

**Descripció:** 

**Pendent d'omplir**

SELECT 

  

**Actuació:** 

**Pendent d'omplir**

UPDATE

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

IARXIU\_PENDENTS\_INGRES\_1HORA

  

**Query:**

SELECT 'IARXIU\_PENDENTS\_INGRES\_1HORA' OTAP, count(\*) REGISTRES  FROM MSC.MSC\_IARXIU\_INGRES WHERE ESTAT=0 AND SYSDATE>(DATA\_RECEPCIO+(60/24/60))

**Descripció:** 

**Pendent d'omplir**

SELECT 

  

**Actuació:** 

**Pendent d'omplir**

UPDATE

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

  

IARXIU\_UPLOAD\_PENJATS

  

**Query:**

SELECT 'IARXIU\_UPLOAD\_PENJATS' OTAP, count(\*) REGISTRES FROM MSC.MSC\_IARXIU\_INGRES\_DOC  WHERE ESTAT=-1 AND SYSDATE>(DATA\_RECEPCIO+(60/24/60))

**Descripció:** 

**Pendent d'omplir**

SELECT 

  

**Actuació:** 

**Pendent d'omplir**

UPDATE

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

IARXIU\_UPLOAD\_REINTENTS\_ESGOTATS

  

**Query:**

SELECT count(\*) FROM MSC.MSC\_IARXIU\_INGRES\_DOC WHERE REINTENTS=5 AND ESTAT=0

**Descripció:** 

**Pendent d'omplir**

SELECT 

  

**Actuació:** 

**Pendent d'omplir**

UPDATE

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

**RDBMS**

Quins RDBMS hi han configurats?

Actuació

En cas de detectar registres alts haurem de revisar que l'RDBMS no estigui bloquejat. SI està bloquejat, l'haurem de recrear. Per més informació sobre aquest procediment podem consultar [RDBMS](/pages/createpage.action?spaceKey=SII&title=RDBMS&linkCreation=true&fromPageId=28705357)

**RDBMS iARXIU**

\--PCI2
SELECT 'IARXIU\_INGRES' RDBMS, COUNT(\*) REGISTRES FROM MSC.MSC\_IARXIU\_INGRES ingres WHERE ingres.ESTAT=0 AND ingres.REINTENTS<5 AND 0=(SELECT COUNT(\*) FROM MSC.MSC\_IARXIU\_INGRES\_DOC WHERE (ESTAT=0 OR ESTAT=-1) AND ID\_INGRES=ingres.id) ORDER BY ingres.DATA\_RECEPCIO ASC
UNION
SELECT 'IARXIU\_UPLOAD' RDBMS, COUNT(\*) REGISTRES FROM MSC.MSC\_IARXIU\_INGRES\_DOC WHERE ESTAT=0 AND REINTENTS<5 AND 0=(SELECT COUNT(\*) FROM MSC.MSC\_IARXIU\_INGRES\_DOC WHERE ESTAT=-1) ORDER BY ID ASC;

Informació rellevant del servei

[https://suport-iarxiu.aoc.cat/hc/ca/articles/4405582519709-En-qu%C3%A8-consisteix-la-integraci%C3%B3-amb-la-plataforma-iARXIU-](https://suport-iarxiu.aoc.cat/hc/ca/articles/4405582519709-En-qu%C3%A8-consisteix-la-integraci%C3%B3-amb-la-plataforma-iARXIU-)

[https://suport-iarxiu.aoc.cat/hc/ca/articles/4405582482845-Manuals-d-usuari-i-administrador-de-la-plataforma-iARXIU](https://suport-iarxiu.aoc.cat/hc/ca/articles/4405582482845-Manuals-d-usuari-i-administrador-de-la-plataforma-iARXIU)

Pendent de penjar

NO COMPLETAT

MUX

  

**Sondes Funcionals**

MUX2\_Peticions\_en\_Error

  

**Query:**

 SELECT  TRUNC(KO.KO/(KO.KO+OK.OK)\*100) "% kos"
  FROM 
  (SELECT count(\*) KO
           FROM MUX2.AOC\_MUX\_AUDIT\_DADES\_GENERALS 
          where (TRACE\_DATE > (SYSDATE - INTERVAL '15' MINUTE))
            AND ESTAT = 'KO'
            AND APLICACIO != 'DUMMY') KO,
                       
        (SELECT count(\*) OK
           FROM MUX2.AOC\_MUX\_AUDIT\_DADES\_GENERALS 
          where (TRACE\_DATE > (SYSDATE - INTERVAL '15' MINUTE))
            AND ESTAT = 'OK'
            AND APLICACIO != 'DUMMY') OK

  

**Descripció:** 

SELECT \*
FROM MUX2.AOC\_MUX\_AUDIT\_DADES\_GENERALS
WHERE ESTAT = 'KO'
AND (TRACE\_DATE > (SYSDATE - INTERVAL '15' MINUTE))
AND APLICACIO != 'DUMMY'
 ORDER BY trace\_date desc;

Veurem tota la informació sobre els registres que han donat KO. Com per exemple data i hora, aplicació, procedència o destí.

  

Per agrupar els errors per aplicació:

SELECT aplicacio, COUNT(aplicacio)
FROM MUX2.AOC\_MUX\_AUDIT\_DADES\_GENERALS
WHERE ESTAT = 'KO'
AND (TRACE\_DATE > (SYSDATE - INTERVAL '15' minute))
AND APLICACIO != 'DUMMY'
  GROUP BY aplicacio;

  

**Actuació:** 

Es tracta d'una sonda bastant general. L'actuació en aquest cas es basaria a fer l'anàlisi dels errors utilitzant la QUERY presentada a sobre. Analitzant la informació de cada una de les columnes podrem detectar si els KO's se centren en un/a destí/procedència concret/a o bé en un servei o bé en un interval de temps.

Per tal de revisar més a fons un error que registri la sonda, podem copiar l'ID únic de la taula i enganxar-lo a la web Admin del MUX → Auditoria de Peticions.

D'aquesta manera, podrem revisar els XML de petició i resposta i analitzar quin tipus d'error es retorna.

Pel que fa a revisions, també pot resultar útil llençar la següent QUERY, que ens mostrarà tots els registres del MUX (OK i KO) ordenats per hora, per tal de detectar pics d'errors que s'han donat en un moment puntual. També veurem si ara mateix les peticions s'estan tractant de manera normal al MUX.

**Tots els registres**

SELECT \* FROM MUX2.AOC\_MUX\_AUDIT\_DADES\_GENERALS WHERE (TRACE\_DATE > (SYSDATE - INTERVAL '1' HOUR)) AND APLICACIO != 'DUMMY' ORDER BY TRACE\_DATE DESC

**Logs:** 

*   **Servidor:** 10.120.1.20
*   **Ruta:** /apps/aoc/IOP/logs
*   **Nom:**  MUX2\_${weblogic.Name}.log

Informació rellevant del servei

[https://www.aoc.cat/wp-content/uploads/2014/11/manualUsuariRegistreUnificat.pdf](https://www.aoc.cat/wp-content/uploads/2014/11/manualUsuariRegistreUnificat.pdf)

[P](https://www.aoc.cat/wp-content/uploads/2019/04/comunicacio-de-domicili-2-0-manual-dusuari.pdf)endent

Pendent

NO COMPLETAT

OVER

  

**Sondes Funcionals**

OVER2\_REGSORTIDA\_OK\_AND\_REGENTRADA\_NULL

  

**Query:**

SELECT count(ID) FROM OVER2.OVER\_PICA\_ACCIO WHERE ESTAT = 2 AND INTENTS <= 5

**Descripció:** 

**TO DO: Pendent d'omplir**

SELECT 

  

**Actuació:** 

**TO DO: Pendent d'omplir**

UPDATE

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

OVER\_PICA\_A\_ESCALAR

  

**Query:**

SELECT count(ID) FROM OVER2.OVER\_TRAMIT\_INSTANCIA WHERE ESTAT=0 AND DESTI\_TIPUS\_ENS='institucio' AND REGISTRE\_SORTIDA IS NOT NULL AND REGISTRE\_ENTRADA IS NULL AND TRAMITAT=0

**Descripció:** 

**TO DO: Pendent d'omplir**

SELECT 

  

**Actuació:** 

Com podem veure, no filtra segons la data d'execució dels tràmits. No obstant això, si fem la consulta sense filtres, podem veure a quina data s'ha realitzat cada tràmit amb aquest error.

A finals de 2018, vam realitzar un UPDATE de la taula OVER2.OVER\_TRAMIT\_INSTANCIA per tal de "netejar" d'aquest registre els tràmits més antics d'un mes.

L'UPDATE que va realitzar-se va ser:

Mai realitzar l'UPDATE de la taula sense comentar-ho abans internament.

UPDATE OVER2.OVER\_TRAMIT\_INSTANCIA
SET ESTAT='9'
WHERE ESTAT=0 
AND DESTI\_TIPUS\_ENS='institucio' 
AND REGISTRE\_SORTIDA IS NOT NULL
AND REGISTRE\_ENTRADA IS NULL 
AND TRAMITAT=0
AND (DATA < (SYSDATE - INTERVAL '30' DAY))

En cas que aquesta QUERY superi els **100 registres**:

1.  Pot ser que siguin registres acumulats des de fa mesos, en aquest cas, comentar-ho internament per si ha de fer-se "neteja" una altra vegada.
2.  Si els registres són recents, cal buscar l'origen d'aquest error.

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

OVER\_INDEX\_PLUSVALUES

  

**Query:**

select count(ID) FROM MCPCIAPP.AOC\_MCNOTARIS\_INDEX WHERE REINTENTS >=5 AND ESTAT <> 2;

  
  

**Descripció:** 

**TO DO: Pendent d'omplir**

SELECT 

  

**Actuació:** 

**TO DO: Pendent d'omplir**

UPDATE

  

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
AND DATASOURCE\_NAME = 'OVER'

Actuació

En cas de detectar registres alts haurem de revisar que l'RDBMS no estigui bloquejat. SI està bloquejat, l'haurem de recrear. Per més informació sobre aquest procediment podem consultar [RDBMS](/pages/createpage.action?spaceKey=SII&title=RDBMS&linkCreation=true&fromPageId=28705264)

**RDBMS iARXIU**

\--PCI2
SELECT 'OVER2\_SIR' RDBMS, COUNT(\*) REGISTRES FROM OVER2.OVER\_SIR WHERE ESTAT\_REGISTRE > 0 AND ESTAT\_RDBMS=0 AND TIPUS=0 AND INTENTS < 5
 UNION
SELECT 'OVERPICA' RDBMS, COUNT(\*) REGISTRES FROM OVER2.OVER\_PICA\_ACCIO WHERE ESTAT=0 AND INTENTS < 5
--SELECT 'TRAMESA\_TR' RDBMS, COUNT(\*) REGISTRES FROM TROVER.TR\_EACAT\_TRAMESA WHERE ESTAT=0 AND INTENTS < 5 

Informació rellevant del servei

![](plugins/servlet/confluence/placeholder/unknown-attachment)

![](plugins/servlet/confluence/placeholder/unknown-attachment)

  

**![](attachments/28705264/28705265.png)**

  

<a href="https://confluence.aoc.cat/plugins/servlet/gadgets/ifr?container=atlassian&amp;mid=1885523148800&amp;country=GB&amp;lang=en&amp;view=default&amp;view-params=%7B%22writable%22%3A%22false%22%7D&amp;st=atlassian%3Apsx9twDhd0TS4RKB8dHtapl%2BOuzyV1hhyRAZIc4%2FU0qKiewmIYJ1DjMnsnVOPYgV7ZK9pdMe5V8rIh78caW8kUmD85wQlx%2Fk3g%2FmP%2Bb8tIw%2FN9yOkQZ2f1nId4reV84YA4exh10%2FWWFHdNVwtQawJdaRrvD%2FHbPCevgNPjeWcEeJnxTKkcHw4vKN4YLfPECHGJrHJwpQBeLXX%2FN%2BmvLijpjZ9BgIWguc9dSoGQmG3CRUkCoDqIE1Ie%2FmREo7Y%2FlkuZQP1s%2F2bney%2F9nR8CDBppHpNHFk7%2BX0%2BZcxlhGkCdsinzL6ISjIXLAzhQMPT%2BUm7jFMp5Wp%2FZYDXj%2FN7AD%2FXuRynsbl4HZob5B31H5dv9WWghJI&amp;up\_isConfigured=true&amp;up\_spaceName=&amp;up\_spaceKey=SII&amp;up\_pageName=OVER+%28Oficina+Virtual+d%27Emissi%C3%B3+i+Recepci%C3%B3%29&amp;up\_pageId=26313459&amp;up\_showLink=true&amp;up\_refresh=false&amp;up\_isEditable=false&amp;url=https%3A%2F%2Fconfluence.aoc.cat%2Frest%2Fgadgets%2F1.0%2Fg%2Fcom.atlassian.confluence.plugins.gadgets%3Aconfluence-page-gadget%2Fgadgets%2Fconfluence-page-gadget.xml&amp;libs=auth-refresh#rpctoken=283262671">\_\_MSG\_gadget.confluence.page.title\_\_</a>

  

FINALITZAT

PADRÓ

  

**Sondes Funcionals**

MTI\_TIMER\_MC\_PADRO\_TITULAR\_CERCA

  

**Query:**

select count(\*) FROM MCPCI.AOC\_MCPADRO\_CERCA WHERE ESTAT = 0;

**Descripció:** 

Aquesta sonda és de la PCI2. A efectes pràctics és com un RDBMS (és un timer). Si el nombre peticions amb estat a 0 no disminueix amb el temps, és que el timer no funciona.

  

**Actuació:** 

No està funcionant el timer [MC\_PADRO\_TITULAR\_CERCA](http://10.120.1.20:8001/wliconsole/timergen?c=316&egname=MC_PADRO_TITULAR_CERCA "MC_PADRO_TITULAR_CERCA"). Encara que posi que està _Running_ el timer no s’està executant. Cal entrar dins i fer Submit. Això fa que es torni a arrencar.

Al fer la consulta

select count(\*) from aoc\_mcpadro\_cerca where estat=0

si el nombre d’estat a 0 no disminueix amb el temps, és que no funciona.

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

MTI\_TIMER\_MC\_PADRO\_TITULAR\_CERCA\_PENJADES

  

**Query:**

select count(\*)
  FROM MCPCI.AOC\_MCPADRO\_CERCA
 WHERE ESTAT = '-1'
 ORDER BY ID\_PETICIO, DOCUMENTACIO, ORDRE;

**Descripció:** 

Aquesta sonda és de la PCI2. A efectes pràctics és com un RDBMS (és un timer). Si el nombre peticions amb estat a -1 no disminueix amb el temps és, que el timer no funciona.

  

**Actuació:** 

Quan es comença a tractar una petició es posa a estat -1. Si es queda en aquest estat, és que s’ha quedat la consulta enganxada.

Els llindars que s’han posat a la sonda són de 26 el warning i de 51 l’error, ja que el timer agafa grups de 25 en 25.

S’han de revisar els registres que estan en estat=-1 de la taula aoc\_mcpadro\_cerca i si  no s’estan tractant actualment, és que es van quedar enganxats per alguna caiguda de la PCI. S’hauran de posar a estat=0 per tal que el timer els torni a agafar.

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

**Sondes ÀUREA**

Ajuntaments més de 12 hores caiguts

select AJUNTAMENTS\_CAIGUTS.descripcio "ENS",
       (case
         --when AJUNTAMENTS\_CAIGUTS.ultim\_OK is null then CAST(sysdate - to\_date('01/11/2016 00:00:01', 'dd/mm/yyyy HH24:MI:SS') AS INT)
         when AJUNTAMENTS\_CAIGUTS.ultim\_OK <= sysdate -1 then CAST((sysdate - AJUNTAMENTS\_CAIGUTS.ultim\_OK) AS INT) || ' dies' -- Número de dies caiguts
         when AJUNTAMENTS\_CAIGUTS.ultim\_OK > sysdate -1 then CAST(24\*(sysdate - AJUNTAMENTS\_CAIGUTS.ultim\_OK) AS INT)|| ' hores' -- Número de hores caiguts
       end) as "TEMPS CAIGUT"
        from
(
select KOS.descripcio, KOS.ultim\_KO, OKS.ultim\_OK
  from
  -- Seleccionem els KOs
  (select indxa.ultim\_KO, indxa.descripcio, logs.resultat
          from monitors.estadistiques logs,
               (select max(logs.data) as ultim\_KO,
                       tt.descripcio,
                       logs.id\_transaccio
                  from monitors.estadistiques logs, monitors.transaccions tt
                 where logs.id\_transaccio = tt.id\_transaccio
                   and tt.id\_servei = 104
                   --and logs.id\_transaccio not in (2030, 2035)
                   and tt.Id\_Transaccio not in (2568, 2566, 2567, 2569, 2565)-- No afegim diputacions antigues, ni ens donats de baixa
                 group by logs.id\_transaccio, tt.descripcio) indxa
         where indxa.ultim\_KO = logs.data
           and indxa.id\_transaccio = logs.id\_transaccio
           and logs.resultat = 'KO') KOS,
    -- Seleccionem els OKs
    (select max(logs.data) as ultim\_OK, tt.descripcio, logs.id\_transaccio
          from monitors.estadistiques logs, monitors.transaccions tt
         where tt.id\_servei = 104
           and logs.id\_transaccio = tt.id\_transaccio
           and logs.resultat = 'OK'
           and logs.id\_transaccio not in (2030, 2035)
         group by logs.id\_transaccio, tt.descripcio) OKS
  -- juntem OKs amb KOs
 where OKS.descripcio(+) = KOS.descripcio
 -- més de 12 hores caiguts
 and 24 \* (sysdate - OKS.ultim\_OK) >= 12
 -- ordenem per temps que porten caiguts
 order by OKS.ultim\_OK asc
)AJUNTAMENTS\_CAIGUTS

Informació rellevant del servei

PADRÓ:

![](plugins/servlet/confluence/placeholder/unknown-attachment)

  

PADRÓ HISTÒRIC:

![](plugins/servlet/confluence/placeholder/unknown-attachment)

[https://www.aoc.cat/wp-content/uploads/2014/11/DI-ViaOberta-PADROHISTORIC.pdf](https://www.aoc.cat/wp-content/uploads/2014/11/DI-ViaOberta-PADROHISTORIC.pdf)

[https://www.aoc.cat/wp-content/uploads/2015/02/Viaoberta-Manual\_usuari.pdf](https://www.aoc.cat/wp-content/uploads/2015/02/Viaoberta-Manual_usuari.pdf)

Pendent

  

FINALITZAT

PCI i MTI

  

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

**IOP** Expand source

SELECT \* FROM AOC\_RDBMS\_EVENT\_GENERATOR
WHERE TYPE = 'RDBMS'
AND IS\_SUSPENDED = 0
AND DATASOURCE\_NAME = 'PCI30-IOP'

**APP** Expand source

SELECT \* FROM AOC\_RDBMS\_EVENT\_GENERATOR
WHERE TYPE = 'RDBMS'
AND IS\_SUSPENDED = 0
AND DATASOURCE\_NAME = 'PCI30-APP'

**NT** Expand source

SELECT \* FROM AOC\_RDBMS\_EVENT\_GENERATOR
WHERE TYPE = 'RDBMS'
AND IS\_SUSPENDED = 0
AND DATASOURCE\_NAME = 'PCI30-NT'

Informació rellevant del servei

**Estat**

**Petició**

Sol·licitud

**XML**

\-1

En procés del BEA

En procés del BEA

\-

0

Pendent

Pendent

Petició

1

Executada

Executada

Sol·licitud

2

Finalitzada

Finalitzada

Evidència Petició

3

Finalitzada amb errors

Finalitzada amb errors

Evidència Resposta

4

\-

\-

Resposta Sol·licitud

5

\-

\-

Resposta

Model de dades PCI:

![](plugins/servlet/confluence/placeholder/unknown-attachment)

  

Missatgeria PCI:

![](plugins/servlet/confluence/placeholder/unknown-attachment)

FINALITZAT

REPRESENTA

  

**Sondes Funcionals**

REPRESENTA\_NOTIFICACIO

  

**Query:**

SELECT 'REPRESENTA\_NOTIFICACIO' OTAP, count(n.UUID) REGISTRES
  FROM REPRESENTA.R\_NOTIFICACIO n, REPRESENTA.R\_PERSONA p
 WHERE n.destinatari\_uuid = p.uuid
   AND n.ENVIAT = 0
   AND n.IN\_PROGRESS = 0
   AND n.REINTENTS = 3
   AND n.DATAENVIAMENT\_PLANIFICAT <= current\_timestamp
   AND p.accepta\_avisos = 1;

_**NOTA:**_

_**S'ha afegit a la query una nova restricció "p.correuelectronic is not null" ja que els casos on està el camp a nul no es poden processar. Estem a la espera que el desenvolupadro ens digui alguna cosa ( [PRJ-7669](https://contacte.aoc.cat/browse/PRJ-7669?src=confmacro) - Data cannot be retrieved due to an unexpected error. ).**_

**Descripció:** 

Aquesta sonda funcional fa referència amb un RDBMS que mira si té correus per enviar.

Quan un poderdant dóna representació a un representant s'envia una notificació de que l'operació s'ha realitzat correctament.

  

Si en la taula hi ha un registre (avís a notificar) el RDBMS canvia l'estat de IN\_PROGRESS a 1. Si falla puja el reintent +1 i torna a deixar el IN\_PROGRESS a 0. Fa aquest procés fins a 3 reintents, un cop el registre té 3 reintents el RDBMS no el tornarà a executar i podrem entendre que aquell registre esta en estat d'error.

  

Estats dels camps de la taula R\_NOTIFICACIO

  

  

*   IN\_PROGRES 1= en curs. No s'hauria de veure aquest estat perquè es molt ràpida la operació. Si esta aquest estat es probable que hi hagi algun problema. 
    
*   ENVIAT 1= enviat 0 = no enviat
    
*   REINTENTS màxim 3
    
*   Hi ha un flag que els usuaris poden tenir la opció de desmarcar de tenir avisos. 1 = true  0 = false. 
    

  

QUERY RDBMS:

 SELECT UUID FROM R\_NOTIFICACIO WHERE ENVIAT=0 AND IN\_PROGRESS=0 AND REINTENTS < 3 AND DATAENVIAMENT\_PLANIFICAT <= current\_timestamp;

  

**Actuació:** 

Actuarem quan hi hagin 10 o més registres en la sonda.

En cas que les peticions es quedin en estat 3 "error", el més possible és que les haguem de reinciciar.

Farem la següent consulta per aconseguir els UUID de les peticions a reiniciar.

SELECT n.UUID FROM R\_NOTIFICACIO n, REPRESENTA.R\_PERSONA p WHERE n.destinatari\_uuid = p.uuid and n.ENVIAT=0 AND n.IN\_PROGRESS=0 AND n.REINTENTS = 3 AND n.DATAENVIAMENT\_PLANIFICAT <= current\_timestamp AND  p.accepta\_avisos = 1 GROUP BY n.UUID;

I podem fer un update massiu per reiniciar tots els enviaments:

UPDATE R\_NOTIFICACIO SET REINTENTS = 0, ENVIAT = 0 WHERE UUID IN ('XXXX',
'XXX');

En alguns casos es quedarán errors controlats i es podrà revisar en els logs de APP.

Tiquets Jira relacionants amb la tasca.

[ST-13029](https://contacte.aoc.cat/browse/ST-13029?src=confmacro) - Data cannot be retrieved due to an unexpected error.

**LOGS:**

SOA -> /apps/aoc/APP/logs/Representa\_APPNODO2\_SOA**.**log

            /apps/aoc/APP/logs/Representa-portal\_tomcat8-01.log

**Tomcats 8**:

aoc-l-tomcat8

**BBDD**:

BD de core: ORA12 (KeePass)

  

REPRESENTA\_SIGNATURA

  

**Query:**

 SELECT UUID FROM R\_SIGNATURA\_EVIDENCIA WHERE SIGNAT=0 AND IN\_PROGRESS=0 AND REINTENTS = 3;

**Descripció:** 

Aquesta sonda fa referència al RDBMS que tracta les signatures de peticions.

Quan es rep una petició es signa per donar una validesa conforme es va realitzar una petició per fer una representació.

Es genera la signatura amb un certificat del consorci. Aquesta operació es realitza pel modul del MSC de la PCI. I més baix nivell hi ha el trustedX per agafar el certificat. 

Aquesta operació es fa paral·lelament de la resposta de la petició. 

  

*   SIGNAT 1 = signat 0 =no signat
    
*   IN PROGRESS 1= en curs. No s'hauria de veure aquest estat perquè es molt ràpida la operació. Si esta aquest estat es probable que hi hagi algun problema. 
    
*   REINTENTS màxim 3.
    

  

QUERY RDMS:

 SELECT UUID FROM R\_SIGNATURA\_EVIDENCIA WHERE SIGNAT=0 AND IN\_PROGRESS=0 AND REINTENTS < 3;

  

**Actuació:** 

Actuarem quan hi hagin 10 o més registres en la sonda.

En cas que aquesta sonda registri peticions amb error, haurem de revisar l'estat del MSC si està tractant correctament la signatura.

En cas que no funcioni el MSC haurem de traspassar-ho a Suport Tècnic, ja que s'haurà d'actuar a la resolució amb la plataforma PCI i no tindrà per que ser error de REPRESENTA.

  

Si el MSC no falla, provarem de reinciar les peticions, ja que podrien ser errors puntuals.

UPDATE R\_SIGNATURA\_EVIDENCIA set reintents = 2 where UUID = XXX

  

INFO Provisional

En cas de veure aquest missatge és perquè encara no s'ha actuat davant d'aquesta sonda, el primer cop abans de reinciar ens posarem amb contacte amb el desenvolupador (Artur Barbeta) per fer-ho conjuntament.

  

Un cop ho haguem resolt podem eliminar aquest missatge i documentar l'actuació definitiva.

  

  

**LOGS:**

SOA -> /aoc/apps/APP/logs/Representa\_APPNODO2\_SOA**.**log

              /aoc/apps/APP/logs/Representa-portal\_tomcat8-01.log

**Tomcats 8**:

aoc-l-tomcat8

**BBDD**:

BD de core: ORA12 (KeePass)

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
AND DATASOURCE\_NAME = 'representa'

Informació rellevant del servei

[https://github.com/ConsorciAOC/Representa](https://github.com/ConsorciAOC/Representa)  

[P](https://www.aoc.cat/wp-content/uploads/2019/04/comunicacio-de-domicili-2-0-manual-dusuari.pdf)endent

![](attachments/28706731/28706740.png)

  

NO COMPLETAT

Altres sondes...

  

**Sondes Funcionals**

GESTOR\_TASQUES\_NO\_OPERATIU

  

**Query:**

SELECT count(ID\_PROGRAMACIO) FROM LPORTAL.gt\_programacio where to\_date('1970-01-01 00','yyyy-mm-dd hh24') + (proxim\_llancament+7600000+durada)/1000/60/60/24 < sysdate and bloqueig=0 and activa=1

**Descripció:** 

La consulta mostra les tasques del PL4 actives i que s'haurien d'haver executat **(proxim\_llançament** + **durada\_de\_la\_tasca** + **2,11\_hores\_de\_cortesia)** **<** **data\_actual**.

Els camps a la base de dades (**anterior\_llancament**, **proxim\_llancament**, **durada**) no tenen un format DATA, sinó NUMBER (són timestamps en milisegons, pel que per calcular les dates haurem de dividir per 1000 (obtenim els segons), per 60 (obtenim els minuts), per 60 (obtenim les hores) i per 24 (obtenim els dies). La següent consulta afegeix els camps en format data:

SELECT gt.\*,
       TO\_DATE('01-01-1970', 'dd-mm-yyyy') +
       (anterior\_llancament / 24 / 60 / 60 / 1000) "llancament\_anterior",
       TO\_DATE('01-01-1970', 'dd-mm-yyyy') +
       (proxim\_llancament / 24 / 60 / 60 / 1000) "llancament\_proxim",
       (interval / 60 / 60 / 1000) "interval\_en\_minuts"
  FROM LPORTAL.gt\_programacio gt

Nota: 7600000 equival a 2 hores, 6 minuts i 36 segons.

  

**Actuació:** 

Si veiem que les tasques no s'executen, les haurem de forçar, recrear o reiniciar.

Per més informació sobre el procediment, podem consultar la FAQ: **[Global - Accedir al Gestor de Tasques d'EACAT](https://intranet.aoc.cat/display/SII/Global+-+Accedir+al+Gestor+de+Tasques+d%27EACAT)**

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

GESTOR\_DE\_TASQUES\_CAT

  

**Query:**

SELECT count(ID\_PROGRAMACIO) FROM LPORTAL.gt\_programacio where to\_number(sysdate - to\_date('01-01-1970','dd-mm-yyyy' )) \*24 \*60\*60 \*1000 > proxim\_llancament+7200000+durada and bloqueig=1

**Descripció:** 

La consulta mostra les tasques del PL4 que es troben bloquejades i s'haurien d'haver executat **(proxim\_llançament** + **durada\_de\_la\_tasca** + **2\_hores\_de\_cortesia)** **<** **data\_actual**.

Els camps a la base de dades (**anterior\_llancament**, **proxim\_llancament**, **durada**) no tenen un format DATA, sinó NUMBER (són timestamps en milisegons, pel que per calcular les dates haurem de dividir per 1000 (obtenim els segons), per 60 (obtenim els minuts), per 60 (obtenim les hores) i per 24 (obtenim els dies). La següent consulta afegeix els camps en format data:

SELECT gt.\*,
       TO\_DATE('01-01-1970', 'dd-mm-yyyy') +
       (anterior\_llancament / 24 / 60 / 60 / 1000) "llancament\_anterior",
       TO\_DATE('01-01-1970', 'dd-mm-yyyy') +
       (proxim\_llancament / 24 / 60 / 60 / 1000) "llancament\_proxim",
       (interval / 60 / 60 / 1000) "interval\_en\_minuts"
  FROM LPORTAL.gt\_programacio gt

Nota: 7200000 equival a 2 hores.

  

**Actuació:** 

Si veiem que les tasques no s'executen, les haurem de forçar, recrear o reiniciar.

Per més informació sobre el procediment, podem consultar la FAQ: **[EACAT - EINES DEL SERVEI - Accedir al Gestor de Tasques d'EACAT](https://confluence.aoc.cat/display/SII/EACAT+-+EINES+DEL+SERVEI+-+Accedir+al+Gestor+de+Tasques+d%27EACAT)**

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

DOGC\_PRO\_PENJATS

  

**Query:**

SELECT count(\*) REGISTRES FROM MCPCIAPP.AOC\_MCDOGC\_PUBLICACIO WHERE ESTAT = -1 AND DATA\_RECEPCIO >= SYSDATE - 1

  

SELECT \*
  FROM MCPCIAPP.AOC\_MCDOGC\_PUBLICACIO
 WHERE ESTAT = -1
   AND DATA\_RECEPCIO >= SYSDATE - 1

  

**Actuació:** 

Actuacio

UPDATE MCPCIAPP.AOC\_MCDOGC\_PUBLICACIO
   SET ESTAT = 0
 WHERE ESTAT = -1
   AND DATA\_RECEPCIO >= SYSDATE - 1

Per tal de corregir els registres farem un update a l'estat anterior, en aquest caso el 0 per tal de que el registre es torni a agafar.

**logs:** 

*   **Servidor:** SOA PCI3
*   **Ruta:** /apps/aoc/APP/logs
*   **Nom:**  MC-DOGC\_APPNODO?\_SOA.log

BOE\_PUBLICACIONS\_NO\_SINCRONITZATS

  

**Query:**

SELECT count(BOE\_ID) FROM PL\_ETAULER\_V3.teu\_publicacio WHERE SYSDATE > (DATA\_INICI\_EXPOSICIO+8) AND ESTAT in('0','3') and eadop=0 ;

**Descripció:** 

**Pendent de realitzar:**

  

**Actuació:** 

Data publicació no informada

Passos a seguir per solucionar aquesta sonda:

  

1.  Obtenir els ids (BOE\_ID) amb problemes:  
      
    
    SELECT \*
    FROM teu\_publicacio 
    WHERE SYSDATE > (DATA\_INICI\_EXPOSICIO+1) AND
    ESTAT in('0','3') and eadop=0;
    
2.  Accedim a SITE (amb certificat)  
      
    
    [https://www.boe.es/tablon\_edictal\_unico/administraciones\_publicas/site.php](https://www.boe.es/tablon_edictal_unico/administraciones_publicas/site.php)  
      
    ![](attachments/28705451/28705473.png)
    
3.  Anem a la opció Gestion d'anuncios de notificación -> Consulta  
    ![](attachments/28705451/28705474.png)
    
4.  Indiquem les dades de Identificador de envio. És el camp BOE\_ID de la taula teu\_publicacio  
    ![](attachments/28705451/28705475.png)
5.  Si disposa de “Fecha de publicación” amb data d’avui, podem fer una actualització del registre per tal que el gestor de tasques ho torni a passar
    
    update teu\_publicacio set data\_actualitzacio=sysdate-1 where id=XXX
    
    o per fer-ho tots els ids d'una passada:  
      
    
    update teu\_publicacio set data\_actualitzacio=sysdate-1 where id in (SELECT idFROM teu\_publicacio WHERE SYSDATE > (DATA\_INICI\_EXPOSICIO+1) AND ESTAT in('0','3') and eadop=0);
    
6.  Si no té informada la “Fecha de publicación” no es tracta de cap errada, és bàsicament que el BOE no l’ha publicat encara en la data que havia dit.

Estat BOE "Devuelto", nostres BBDD estat diferent a 4(retornada)

Passos a seguir per solucionar cas de desincronització en el cas que el **edicte per part del boe estigui "devuelto" en la nostra BBDD estat diferent a 4(retornat)**:

1.  **Obtenir els ids (BOE\_ID) amb problemes:**

SELECT \*
FROM teu\_publicacio 
WHERE SYSDATE > (DATA\_INICI\_EXPOSICIO+1) AND
ESTAT in('0','3') and eadop=0;

  

**2\. Accedim a SITE (amb certificat)**

[https://www.boe.es/tablon\_edictal\_unico/administraciones\_publicas/site.php](https://www.boe.es/tablon_edictal_unico/administraciones_publicas/site.php)  
  
![](attachments/28705451/28705473.png)

  

**3\. a la opció Gestion de anuncios de notificación -> Consulta**

  
![](attachments/28705451/28705474.png)

  

**4\. Indiquem les dades de Identificador de envio. És el camp BOE\_ID de la taula teu\_publicacio**  
![](attachments/28705451/28705476.png)

  

**5- No disposarà de “Fecha de publicación” informada ja que l'edicte estara retornat i no es publicarà.**

  

_**Aquest cas es produïa perquè en la resposta del BOE a l'hora de retornar l'edicte hi havien caràcters estranys i en el siri donava error. Per part del dpt. de projectes(tractat al tiquet: [https://contacte.aoc.cat/browse/PRJ-2874](https://contacte.aoc.cat/browse/PRJ-2874)) s'ha realitzat un "parche" on filtra aquests caràcters. De totes maneres es possible que ens hi tornem a trobar amb altres caràcters estranys encara no tractats en el "parche".**_

  

**6- Identificar la petició a la MTI, per detectar possibles caràcters estranys:**

*   *   **[http://10.120.4.58/pci3-mti-admin/peticions/mti](http://10.120.4.58/pci3-mti-admin/peticions/mti) ← Accedir-ho**
    *   Executar la query següent per obtenir la data\_actualització:

SELECT \*
FROM teu\_publicacio 
WHERE SYSDATE > (DATA\_INICI\_EXPOSICIO+1) AND
ESTAT in('0','3') and eadop=0;

  

*   *   Filtar a la MTI per: Producte "BOE" i la data i hora del camp data\_actualització anterior. **L'organisme per filtrar serà el consorci del AOC (9821920002), ja que hem d'accedir a la sol·licitud per veure el organisme original.**  
        Ja que aquesta data i hora es quan es registra en la mti l'intent de sincronització.  
        El patró del id de petició d'aquestes peticions és: xxxx**con**xxxx  
          
        
    *   Accedir a la sol·licitud de la petició per identificar en l'element "<boe:idEnviamentBoe\>" que és l'edicte que busquem.  
          
        
    *   Accedir a la resposta, per validar en els elements descripció i observació de la resposta hi han caràcters estranys:  
        ![](attachments/28705451/28705477.png)
    *   Per validar cal entrar a veure el codi font. Botó dret > Ver código fuente:  
        ![](attachments/28705451/28705478.png)  
          
        
    *   Un cop identificats el caràcter estrany, entenem que si no es sincronitza és perquè el "parche" que van realitzar en el tiquet: [https://contacte.aoc.cat/browse/PRJ-2874](https://contacte.aoc.cat/browse/PRJ-2874) no tracta el caràcter i tindran de modificar-ho. Obrirem un altre tiquet fent referència al antic i demanem si poden modificar-ho  
          
        
    *   Un cop modificar el "parche" haurem de forçar la sincronització.  
          
        

**7- Forçar la sincronització:**

La sincronització es realitza de dos maneres:

*   *   Cada cop que l'usuari entra a consultar el detall → _Acció que es necessita certificat per realitzar-ho des de EACAT, és anar al BOE per EACAT entrar al edicte afectat. Necessitariem que David Tejada ens donés accés per fer-ho._

*   *   Automàticament Via el gestor de tasques a la matinada → El gestor de tasques revisa la data\_actualització si ens inferior a 24H. torna a actualitzar i força la sincronització.
        *   Accedir al gestor de tasques: [EACAT - EINES DEL SERVEI - Accedir al Gestor de Tasques d'EACAT](https://confluence.aoc.cat/display/SII/EACAT+-+EINES+DEL+SERVEI+-+Accedir+al+Gestor+de+Tasques+d%27EACAT)
            *   El procés del BOE en el gestor de tasques es realitza cada cinc minuts:  
                ![](attachments/28705451/28705479.png)
        *   Per fer que el gestor de tasques agafi els edictes, baixem un dia la data\_actulaitzacio del edicte:
            
            \--IMPORTANT! Fer un backUp del registre que modificarem.
            --Posem la data del edicte menys un dia.
            update PL\_ETAULER\_V3.teu\_publicacio
            set data\_actualitzacio =  to\_date('11-03-2019 00:00:52', 'dd-mm-yyyy hh24:mi:ss')
            where boe\_id in ('E12019021400113651');
            
        *   Esperem el temps que el procés del gestor de tasques torni a executar-se i revisem que l'edicte s'hagi sincronitzat.
            
            select \*
            from PL\_ETAULER\_V3.teu\_publicacio ee
            where ee.boe\_id in ('E12019021400113651');
            

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

ERRORS\_ENVIAMENTS\_FITXA\_FISCAL

  

**Query:**

SELECT 'ERRORS\_ENVIAMENTS\_FITXA\_FISCAL' OTAP, count(\*) REGISTRES FROM MCPCIAPP.AOC\_MCNOTARIS\_FITXA WHERE REINTENTS >=5 AND ESTAT <> 2 AND DATA>SYSDATE-1

**Descripció:** 

Descripcio:

SELECT 

  

**Actuació:** 

Com a primera comprovació podem llençar la següent query:

SELECT F.ID, F.ESTAT, F.REINTENTS, F.MISSATGE, F.ENS
FROM MCPCIAPP.AOC\_MCNOTARIS\_FITXA F
WHERE REINTENTS >=5 
AND ESTAT <> 2 
AND DATA>SYSDATE-1

On pot ser interessant veure si els errors es concentren en un ens en concret. També podrem veure la petició XML que ens arriba i per exemple comparar amb una que hagi acabat correctament.

Podem provar a baixar els reintents i veure si acaben correctament. En cas que no acabin correctament, podem revisar els logs en viu i veure quin error pinten.

UPDATE MCPCIAPP.AOC\_MCNOTARIS\_FITXA
set reintents = 2
where id = 'XXXXXXX';

**logs:** 

*   **Servidor:** PCI 2 (10.120.1.20 / 10.120.1.21)
*   **Ruta:** /mnt/sto1/lhnfs/aoc/APP/logs
*   **Nom:**  OVER-FitxaNotarial\_AppNodo?.log

DESAL\_lportal\_transferencia\_iarxiu

  

**Query (Esquema: LR6SERVEIS - DB: ORA12):**

SELECT 'Expedients avortats al transferir a iARXIU' ESTAT, count(\*) "Transferències errònies"
FROM DESAL\_TRANSFERENCIA\_IARXIU trans
WHERE trans.estat = 'avortat' 
and trans.DATA\_INSERCIO >= to\_date('01/01/2019','dd/mm/yyyy');

**Descripció:** 

Aquesta sonda monitora les transferències que han finalitzat en error del DESA'l al iARXIU:

**Actuació:** 

  

  

* * *

**Abans de res, caldria revisar si la sonda DESAL\_IARXIU continua estant operativa. En cas contrari, caldria garantir que es torni a sondar el servei.** 

La documentació següent es detalla el procediment a fer quan els documents que es transfereixen del DESA'L al iARXIU queden en estat d'error. 

* * *

  

Configuració BBDD’s (ORACLE SQL DEVELOPER)

*   *   DESA’l

![](attachments/26313355/41518877.png)

*   *   ALFRESCO

![](attachments/26313355/41518876.png)

#### **Primera consulta a realitzar:**

**Cerquem els expedients avortats**

SELECT \*
FROM DESAL\_TRANSFERENCIA\_IARXIU trans
WHERE trans.estat = 'avortat' and trans.DATA\_INSERCIO >= to\_date('01/05/2020','dd/mm/yyyy');

0 - Identificar errors
----------------------

Els errors els trobarem a la columna **DESCRIPCIO\_ERROR:**

#### Cas d'ERROR 1: 

**_Error realitzant l'operació:  CORE-PACKAGEVALIDATOR-OBJECTNOTFOUND:application/x-zip-compressed:The specified content type does not exist. Si us plau, torneu a intentar-ho en uns instants. Si el problema persisteix, poseu-vos en contacte amb el Servei d'Atenció a l'Usuari._**

 Aquest error l’hem de traslladar a Raimon Nualart obrint un JIRA i que ho revisi  l'OT d'iArxiu.

Cal passar-li el UUID (DESAL\_TRANSFERENCIA\_IARXIU), l’ID\_PETICIO (DESAL\_TRANSFERENCIA\_IARXIU) i el path del codi de classificació (ALF\_NODE\_PROPERTIES camp STRING\_VALUE amb el següent format:

![](attachments/26313355/26314887.png)

  

Una vegada ens doni resposta, hem de realitzar les passes indicades en 3.

#### Cas d'ERROR 2:

**Error realitzant l'operació:  CORE-PACKAGEVALIDATOR-SIGNATUREFORMAT::Error analyzing signature format. Si us plau, torneu a intentar-ho en uns instants. Si el problema persisteix poseu-vos en contacte amb el Servei d'Atenció a l'Usuari.**

**Ídem que el cas 1.**

  

  

1 - Resta d'ERRORS: 
--------------------

Cal localitzar l’expedient a DESA’L. Partim de l’UUID de DESAL\_TRANSFERENCIA\_IARXIU (filtrant per estat “avortat” i data >= “01/10/2018”) i el busquem a la BD d’Alfresco4 de PRO a la taula **ALF\_NODE** pel camp UUID i ens quedem amb el camp ID. I aquest valor el busquem en el camp node\_id de **ALF\_NODE\_PROPERTIES** i busquem la _STRING\_VALUE_;

  

**Realitzem query per obtenir UUID (LPORTAL)**

SELECT \*
FROM DESAL\_TRANSFERENCIA\_IARXIU trans
WHERE trans.estat = 'avortat' and trans.DATA\_INSERCIO >= to\_date('01/10/2018','dd/mm/yyyy');

**QUERYS PER OBTENIR LES DADES (BD: ALFRESCO i LPORTAL)**

\--1 Obtenir ID ALFRESCO
SELECT node.\*
FROM ALF\_NODE node
WHERE uuid in ('');

--2 OBTENIR RUTA FITXER
SELECT properties.NODE\_ID, properties.STRING\_VALUE --String\_value és la ruta d'on esta ubicat l'expedient en el desa'l
FROM ALF\_NODE\_PROPERTIES properties
WHERE properties.QNAME\_ID = '224'--224 Ruta --228 Usuari
and properties.NODE\_ID in ( select node.ID
                            from ALF\_NODE node
                            where node.uuid in (''));


--3 OBTENIR USUARI RELACIONAT
SELECT properties.NODE\_ID, properties.STRING\_VALUE
FROM ALF\_NODE\_PROPERTIES properties
WHERE properties.QNAME\_ID = '228'--224 Ruta --228 Usuari
and properties.NODE\_ID in ( select node.ID
                            from ALF\_NODE node
                            where uuid in ('83020e37-64b6-4a3b-a78e-f5a9b6c32916'));

  

**Realitzem query per obtenir el DNI de l'USUARI**

\--(DB: SIRI)
Select \* from usu\_usuari where nom like 'Nom obtigut en les queries anteriors';

  

Un cop arribats en aquest punt, tenim totes les dades extretes per poder procedir a fer els canvis necessaris i transferir els documents.

Per tenir organitzades les dades podem muntar una taula tipus: 

  

![](attachments/26313355/28705401.png)

2 - Actualització de UUID's
---------------------------

Per poder transferir, necessitem actualitzar els uuid, ja que en el pas de transferència des del desa'l es crearà un altre cop el mateix uuid per registre, i si ja existeix, no ens funcionarà. 

_**\- En la taula del DESA’l → DESAL\_TRANSFERENCIA\_IARXIU  →  updatejem el UUID afegint al final “\_OTAOC”.**_

**Busquem el uuid, comprovem que sigui únic**

SELECT \*
FROM DESAL\_TRANSFERENCIA\_IARXIU
WHERE UUID LIKE '8c6431e2-f87a-4401-84a1-1612a33fe718%';

**Updatejem el UUID afegint al final “\_OTAOC” .**

UPDATE DESAL\_TRANSFERENCIA\_IARXIU
SET UUID = '8c6431e2-f87a-4401-84a1-1612a33fe718\_OTAOC'
WHERE UUID = '8c6431e2-f87a-4401-84a1-1612a33fe718';

Si tenim molts registres a actualitzar podem executar aquesta query.

UPDATE DESAL\_TRANSFERENCIA\_IARXIU aa
SET UUID = CONCAT(UUID,'\_OTAOC')
WHERE UUID in ( '198e6493-3a58-4af9-8e73-af04ca95a8a1',
				'9709fc29-7654-40ed-a9b4-f1fb813089f2',
				'6544eb41-06b2-4a45-b791-2e48a904cec5',
				'dada8204-ffc5-4872-b193-d83d04ca4780'
												(....)
);

  

3 - Procediment manual DESA'L
-----------------------------

Un cop hem obtingut totes les dades i les hem actualitzar procedim a transferir els documents des del DESA'L. 

Per més informació sobre el DESA'L i fer aquest pas cliqueu [aquí.](https://steps.everis.com/confluence/display/AOC/DESA%27L+-+Revisions+comuns#DESA%27L%20-%20Revisions%20comuns%20!infodesal) 

**_\- Una vegada en el DESA’l, anem a la ruta que hem obtingut en les consultes:_**

Aquí veurem que dintre de les classes, hi ha diferents expedients (carpetes). Les que estan pendents de transferir a iArxiu són les que trobem en color Vermell.

*   Una vegada detectem l’expedient, en DESA’l ens sortirà el botó “Transf. iArxiu”. El premem (hem d’haver updatejat el UUID amb “\_OTAOC”). Això es de manera síncrona i generarà un nou registre amb el mateix UUID i trigarà 1h per passar a estat “Transferit” en BBDD.

![](attachments/26313355/26314884.png)

  

*   Consultem com s’ha creat un registre amb el uuid que teníem i sense el \_OTAOC:

![](attachments/26313355/26314882.png)

  

*     Una vegada aquest UUID està en estat “Transferit”, esborrem el registre que hem ficat com “UUID\_OTAOC”.

  

delete from DESAL\_TRANSFERENCIA\_IARXIU

where uuid like '%\_OTAOC';

  

*    Si dóna error, s’ha de revisar als logs del DESA’l al PL4.  
    Ruta /apps/liferay-tomcat/logs/desal.log → Cada node té el seu log, no estan compartits

  

Related issues

FP#**246255**

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

IDCATMOBIL\_MES\_10\_INTENTS

  

**Query:**

Esquema: ORA12

SELECT 'IDCATMOBIL\_MES\_10\_INTENTS' OTAP, count(\*) REGISTRES FROM ( SELECT DOCUMENT, COUNT(\*) FROM IDCATMOBIL.IDCATSMS\_REGISTRE WHERE DATA\_ACCES BETWEEN SYSDATE-7 AND SYSDATE GROUP BY DOCUMENT HAVING COUNT( DOCUMENT ) >= 10)

**Descripció:** 

Descripcio:

SELECT 

  

**Actuació:** 

Com a primera revisió per veure si el servei funciona amb normalitat, podem llençar la següent QUERY:

SELECT document, count(\*) as DNI
FROM IDCATMOBIL.IDCATSMS\_REGISTRE
where data\_alta is null
and data\_acces >= to\_date('XX/XX/XXXX','dd/mm/yyyy')
group by document
order by DNI desc

Aquesta QUERY ens mostrarà els DNI's que han intentat logejar-se i no han realitzat l'alta, amb el número d'intents per a cada DNI. Substituim XXXXX per la data a partir de la quqal ens interessi llençar la consulta, normalment serà suficient mirant el dia d'avui.

  

En el cas que aquesta sonda superi els 100 registres i tinguem de fer una revisió.Hem de tindre en compte: 

1- Controla els Usuaris que s'han intentat logejar més de 10 vegades (el sistema el bloqueja)

2- Si no desbloquegem l'usuari, no podrà accedir-hi. 

3- Desbloquejar usuari; Executarem la query: 

update idcatsms\_registre set document=document||'\_' where document in (
SELECT DOCUMENT FROM ( SELECT DOCUMENT, COUNT(\*) FROM IDCATMOBIL.IDCATSMS\_REGISTRE WHERE DATA\_ACCES BETWEEN SYSDATE-7 AND SYSDATE GROUP BY DOCUMENT HAVING COUNT( DOCUMENT ) >= 10));

4- En el segon correu de les sondes avisarem que hem realitzat aquesta query.

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

DCOC\_DESCARREGUES\_PENDENTS\_DE\_CALLBACK\_3\_DAYS

  

**Query:**

SELECT count(ID\_PROJECTE) from DCOC.AOC\_DCOC\_PROJECTE where ESTAT = 2 and ( to\_date(DATA\_ULTIMA\_PETICIO,'DD/MM/YY') < to\_date(SYSDATE-3,'DD/MM/YY' ))

**Descripció:** 

La sonda mostra els projectes que es troben pendents del callback de més de 3 dies (aquelles peticions cap als col·legis de les quals encara no tenim resposta).

SELECT \* from DCOC.AOC\_DCOC\_PROJECTE where ESTAT = 2 and ( to\_date(DATA\_ULTIMA\_PETICIO,'DD/MM/YY') < to\_date(SYSDATE-3,'DD/MM/YY' ))

La gestió del’estat del projecte es duu a terme a base de dades en la taula AOC\_DCOC\_PROJECTE mitjançant el camp ESTAT – estat de la descàrrega - que disposa dels següents valors:

Estat

Traducció

Descripció

0

Descarregat correctament

La descàrrega ha finalitzat sense cap tipus d'errors.

1

Descarregat amb error

La descripció de l’error es troba a la columna DESCRIPCIO\_ERROR.

2

Pendent de callback

El col·legi que emet les dades encara no ha enviat el callback.

3

Pendent de descarregar

El col·legi ha enviat el callback i el projecte s’ha encuat a la cua de descàrregues, però encara no s’ha tractat.

4

Descarregant

El projecte s’ha desencuat, i s’està tractant la petició de descàrrega.

  

**Actuació:** 

Haurem de reclamar al col·legi i preguntar si poden revisar el seu servei, ja que nosaltres ens trobem a l'espera de rebre una resposta per part seva.

També podem reiniciar les peticions seguint la FAQ [VO - DCOC - Reiniciar peticions](https://intranet.aoc.cat/display/SII/VO+-+DCOC+-+Reiniciar+peticions)

  

Executar amb cautela, estava explicat en un document de l'OP5 quan aquesta sonda es trobava allà:

delete from DCOC.AOC\_DCOC\_PROJECTE where ESTAT = 2

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

  

  

DCOC\_DESCARREGUES\_PENDENTS\_DE\_CALLBACK\_ACUMULADES\_GT\_15

  

**Query:**

SELECT count(ID\_PROJECTE) FROM DCOC.AOC\_DCOC\_PROJECTE where ESTAT = 2

**Descripció:** 

La sonda mostra els projectes que es troben pendents del callback (aquelles peticions cap als col·legis de les quals encara no tenim resposta).

SELECT \* from DCOC.AOC\_DCOC\_PROJECTE where ESTAT = 2 and ( to\_date(DATA\_ULTIMA\_PETICIO,'DD/MM/YY') < to\_date(SYSDATE-3,'DD/MM/YY' ))

La gestió del’estat del projecte es duu a terme a base de dades en la taula AOC\_DCOC\_PROJECTE mitjançant el camp ESTAT – estat de la descàrrega - que disposa dels següents valors:

Estat

Traducció

Descripció

0

Descarregat correctament

La descàrrega ha finalitzat sense cap tipus d'errors.

1

Descarregat amb error

La descripció de l’error es troba a la columna DESCRIPCIO\_ERROR.

2

Pendent de callback

El col·legi que emet les dades encara no ha enviat el callback.

3

Pendent de descarregar

El col·legi ha enviat el callback i el projecte s’ha encuat a la cua de descàrregues, però encara no s’ha tractat.

4

Descarregant

El projecte s’ha desencuat, i s’està tractant la petició de descàrrega.

  

**Actuació:** 

Haurem de reclamar al col·legi i preguntar si poden revisar el seu servei, ja que nosaltres ens trobem a l'espera de rebre una resposta per part seva.

També podem reiniciar les peticions seguint la FAQ [VO - DCOC - Reiniciar peticions](https://intranet.aoc.cat/display/SII/VO+-+DCOC+-+Reiniciar+peticions)

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

  

  

DCOC\_PENDENT\_DESCARREGAR\_PER\_AOC

  

**Query:**

SELECT 'DCOC\_PENDENT\_DESCARREGAR\_PER\_AOC' OTAP, count(\*) REGISTRES FROM DCOC.aoc\_dcoc\_projecte where estat=3

**Descripció:** 

No més es qüestió de deixar passar el temps i l’alerta desapareixerà sola.  
L’explicació es senzilla, son events que es troben en estat = 3, es a dir s’han executat correctament. No més es un problema de temps fins que el servidor entrega el fitxer demanat.

  

**Actuació:** 

N/A

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

DCOC\_PETICIONS\_EN\_ESTAT\_ERROR

  

**Query:**

SELECT count(ID\_PROJECTE) FROM DCOC.AOC\_DCOC\_PROJECTE where ESTAT = 1

**Descripció:** 

La sonda mostra els projectes que s'han descarregat amb errors. Per poder consultar els errors en detall podem revisar la columna **DESCRIPCIO\_ERROR** :

SELECT \* FROM DCOC.AOC\_DCOC\_PROJECTE  where ESTAT = 1

Les traduccions dels estats són les següents:

Estat

Traducció

Descripció

0

Descarregat correctament

La descàrrega ha finalitzat sense cap tipus d'errors.

1

Descarregat amb error

La descripció de l’error es troba a la columna DESCRIPCIO\_ERROR.

2

Pendent de callback

El col·legi que emet les dades encara no ha enviat el callback.

3

Pendent de descarregar

El col·legi ha enviat el callback i el projecte s’ha encuat a la cua de descàrregues, però encara no s’ha tractat.

4

Descarregant

El projecte s’ha desencuat, i s’està tractant la petició de descàrrega.

  

**Actuació:** 

En funció de l'error haurem de reclamar al col·legi o a l'emissor de les dades.

També podem reiniciar les peticions seguint la FAQ [VO - DCOC - ALTRES - Reiniciar peticions](https://confluence.aoc.cat/display/SII/VO+-+DCOC+-+ALTRES+-+Reiniciar+peticions)

**logs:** 

*   **Servidor:** aoc-l-app1 (PCI2)
*   **Ruta:** /apps/aoc/IOP/logs
*   **Nom:**  DCOC\_\*.log

SIRI-Exportacions no finalitzades

  

**Query:**

SELECT COUNT(ID) FROM AOC\_PCI\_SIRI\_INFORME WHERE ESTAT NOT IN (2,3) AND DATA <= TRUNC(SYSDATE)-2

**Descripció:** 

S'habilita al portlet del SIRI una nova funcionalitat per realitzar les exportacions de les consultes del SIRI.

  

**Actuació:** 

S'habilita al portlet del SIRI una nova funcionalitat per realitzar les exportacions de les consultes del SIRI.

  

![](attachments/26318906/26318913.png)

  

D'aquesta manera no es farà en rigurós directe, sino que és un informe que realitzarà el DWH. El DWH té un procés que revisa cada 5 minuts si hi ha algun informe pendent a tractar.

Es recolza sobre la taula AOC\_PCI\_SIRI\_INFORME de l'esquema SIRI.

Els camps de la taula i la seva descripció:

*   CODI\_ORGANISME: organisme que sol·licita l'informe.

*   CODI\_ORGANISME\_INFORME: organisme del que es sol·licita l'informe (normalment serà igual a CODI\_ORGANISME, només l'AOC pot consultar l'activitat d'altres organismes).

*   TIPUS: 0 interoperabilitat / 1: PMH.

*   ESTAT: 0 pendent / 1: en procés / 2: finalitzat / 3: finalitzat amb errors.

*   DATA\_INFORME: mes del qual es demana d'informe (p.e. Juny 2019 ==> 01/06/2019).

*   CODI\_PROVINCIA / CODI\_MUNICIPI: només si TIPUS = 1 (PMH). L'informe PMH només està disponible a organismes de tipus Ajuntament. Normalment coincidirà amb el codi de municipi + provincia de l'organisme que fa la consulta, només l'AOC pot consultar l'activitat de tots els Ajuntaments.

  

Caldrà revisar la següent sonda per veure que el funcionament és el correcte:

  

SELECT \* FROM AOC\_PCI\_SIRI\_INFORME WHERE ESTAT NOT IN (2,3) AND DATA <= TRUNC(SYSDATE)-2

.rwui\_text\_box.rwui\_id\_28f0b030-be31-46cd-8236-6c6b234e20d8 {background-color: #F2F2F2; color: #666666;}.rwui\_text\_box.rwui\_id\_28f0b030-be31-46cd-8236-6c6b234e20d8 \*:not(.rwui\_content) {color: #666666;}.rwui\_text\_box.rwui\_id\_28f0b030-be31-46cd-8236-6c6b234e20d8 span.rwui\_icon {color: #666666;}

  

### \--- Connexió amb màquina ---

Ens connectarem a la màquina: 

IP: **10.120.1.14**

Usuari: **logsdom**

Els informes un cop realitzats es guarden a /home/pci-pl/siri2/informes/codiOrganisme/idPeticio.csv.zip

![](attachments/26318906/41520184.png)

Tiquet amb una incidència a tindre en comptes:

  

[INN-1035](https://contacte.aoc.cat/browse/INN-1035?src=confmacro) - Data cannot be retrieved due to an unexpected error.

Error fitxer lock:

![](attachments/26318906/41520186.png)

codi eliminació

cd /mnt/storage/pci-pl/siri2/informes

sudo rm -rf LOCK

  

  

Què podem fer si les extraccions fallen a l'EACAT però tenim els fitxers .csv?
------------------------------------------------------------------------------

Un error que ens hem trobat és que a l'EACAT l'extracció finalitza amb errors:

![](attachments/26318906/41520300.png)

  

Haurem de revisar al la carpeta si disposem de l'extracció generada en format .csv:

![](attachments/26318906/41520301.png)

  

En tot cas podrem descarregar el fitxer i adjuntar-lo al tiquet de la incidència per passar-li a l'usuari.

També podem fer el següent → **Recomanem fer-ho des de les web amb usuari logsdom**:

1.  Descarregar el fitxer i zipejar-lo al nostre local:![](attachments/26318906/41520303.png)
2.  Pujar-lo a la carpeta /tmp amb l'ajuda del nostre client SFTP (WinsSCP, etc)
3.  Accedir al super usuari (root)
    
    sudo su
    
4.  Moure-ho a la carpeta específica del ens, en aquest cas **/mnt/storage/pci-pl/siri2/informes/810170005**
    
    mv /tmp/390.csv.zip /mnt/storage/pci-pl/siri2/informes/810170005/390.csv.zip
    
5.  Donar-li permissos root:
    
    chown root /mnt/storage/pci-pl/siri2/informes/810170005/390.csv.zip
    
6.  Modificar l'estat de la extracció a 2 (FINALIZADA):
    
    UPDATE set ESTAT = 2 FROM AOC\_PCI\_SIRI\_INFORME WHERE ESTAT = 3 AND ID = 390
    

Finalment, podrem recarregar la pàgina d'EACAT i veure com es pot descarregar el nou zip

  

Vinculo els tickets associats a aquesta funcionalitat.

Tipus

Ticket

Desplegament PRE

[DES-1932](https://contacte.aoc.cat/browse/DES-1932?src=confmacro) - Data cannot be retrieved due to an unexpected error.

Desplegament PRO

[DES-1933](https://contacte.aoc.cat/browse/DES-1933?src=confmacro) - Data cannot be retrieved due to an unexpected error.

Projectes definició

[PRJ-3429](https://contacte.aoc.cat/browse/PRJ-3429?src=confmacro) - Data cannot be retrieved due to an unexpected error.

  

  

  
  
  

  

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

CORPME-Sol·licituds sense resposta amb més de 24h

  

**Query:**

SELECT 'CORPME-Sol·licituds sense resposta amb més de 24h' OTAP, COUNT(p.ID) REGISTRES from PCI\_MTI\_solicitud s, PCI\_MTI\_PETICIO p where p.id = s.id\_peticio and p.codi\_producte = 'REGISTRE\_PROPIETAT' and s.estat = 5 and p.data\_recepcio <= sysdate - 1

**Descripció:** 

Aquesta sonda mesura les sol·licituds del CORPME (servei de pagament) de les quals no hem obtingut resposta. Com no podem reenviar les peticions perquè fer-ho costa diners, hem de revisar si realment tenim una resposta del CORPME i actualitzar-la.

  

**Actuació:** 

En el cas que es produís una aturada del servei (incidencia puntual, error en algún pase amb algún correctiu al respecte...) i consums realitzats finalitzesin abans d'obtenir resposta per part del CORPME. Abans de tornar a fer un consum (no fer-ho ja que es de pagament), amb la nova versió del servei, es consulta un callback amb les respostes obtingudes del CORPME.

Realitzar les següents accions:

1.  Ficar la fila de la taula pròpia de registradors per tal de fer un reenviament:
    
    update aoc\_mcregistradors\_id set reenviar=1 where id\_peticio='1568618047052924';
    
2.  Revisar que la resposta que genera el CORPME ens retorna el pdf.
    
    ![](https://intranet.aoc.cat/download/attachments/28704791/image2019-9-18_11-32-1.png?version=1&modificationDate=1568799121442&api=v2)
    
3.  Si ho retorna correctament, hem d’actualitzar la taula amb el valor de rebut a 1:
    
    update aoc\_mcregistradors\_id set rebuda=1 where id\_peticio='1568618047052924';
    
4.  Actualitzem la PCI correctament per tal que faci el processament de les dades.
    
    UPDATE
    PCI\_MTI\_PETICIO SET ESTAT=2 WHERE ID\_PETICIO='1568618047052924';
     
    UPDATE
    PCI\_MTI\_SOLICITUD SET ESTAT=5, EXECUTADA=0 WHERE ID\_PETICIO=(SELECT ID FROM
    PCI\_MTI\_PETICIO WHERE ID\_PETICIO='1568618047052924');
     
    DELETE FROm
    PCI\_MTI\_XML WHERE TIPUS=5 AND ID\_PETICIO=(SELECT ID FROM PCI\_MTI\_PETICIO WHERE
    ID\_PETICIO='1568618047052924');
     
    DELETE FROm
    PCI\_MTI\_XML WHERE TIPUS=4 AND ID\_PETICIO=(SELECT ID FROM PCI\_MTI\_PETICIO WHERE
    ID\_PETICIO='1568618047052924');
     
    commit;
    
5.  Si va tot bé, hauria de quedar-se en finalitzada a la PCI:  
    ![](https://intranet.aoc.cat/download/attachments/28704791/image2019-9-18_11-33-19.png?version=1&modificationDate=1568799199977&api=v2)
    

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

\-- APP WL8
SELECT 'ANCERT\_FTX\_PDIB' RDBMS, COUNT(\*) REGISTRES FROM MCPCIAPP.AOC\_MCNOTARIS\_FITXA WHERE (ESTAT=0 OR ESTAT=3) AND ENS='801930008' AND REINTENTS < 5
UNION
SELECT 'ANCERT\_IDXC\_EX' RDBMS, COUNT(\*) REGISTRES FROM MCPCIAPP.AOC\_MCNOTARIS\_IDX\_TRAMIT WHERE ESTAT=2 AND REINTENTS < 5
UNION
SELECT 'ANCERT\_IDXC\_PR' RDBMS, COUNT(\*) REGISTRES FROM MCPCIAPP.AOC\_MCNOTARIS\_IDX\_TRAMIT WHERE ESTAT=1 AND REINTENTS < 5
UNION
-- IOP WL8
SELECT 'PSCP\_PUBLIC' RDBMS, COUNT(\*) REGISTRES FROM MCPCI.AOC\_MCPSCP\_PUBLICACIONS WHERE ESTAT='PSCP\_0020' AND (REINTENTS=0 OR (REINTENTS >= 1 AND REINTENTS < 5 AND (DATA\_ACTUALITZACIO + (1/24/2)) < SYSDATE))
UNION
SELECT 'PSCP\_RECEP' RDBMS, COUNT(\*) REGISTRES FROM MCPCI.AOC\_MCPSCP\_PUBLICACIONS WHERE ESTAT='PSCP\_0000' AND (REINTENTS=0 OR (REINTENTS >= 1 AND REINTENTS < 5 AND (DATA\_ACTUALITZACIO + (1/24/2)) < SYSDATE))
UNION
-- DOGC
SELECT 'DOGC-PUBLICACIO' RDBMS, COUNT(\*) REGISTRES FROM MCPCIAPP.AOC\_MCDOGC\_PUBLICACIO WHERE ESTAT=0 AND REINTENTS=0
UNION
SELECT 'DOGC-REINTENTS' RDBMS, COUNT(\*) REGISTRES FROM MCPCIAPP.AOC\_MCDOGC\_PUBLICACIO WHERE ESTAT=0 AND REINTENTS >= 1 AND REINTENTS < 5 AND (DATA\_ACTUALITZACIO + (1/24/2)) < SYSDATE
UNION
-- EACAT
-- RDBMS DE EACAT\_LIFERAY
SELECT 'RDBMS - EACATPL\_LIFERAY' RDBMS, COUNT(\*) REGISTRES FROM LPORTAL.VO\_PETICIO WHERE ESTAT IN ('0001','0002') AND (TER < ((SYSDATE-DATA\_ACTUALITZACIO)\*24))

RDBMS - EACATPL\_LIFERAY

  

**Query:**

SELECT COUNT(\*) FROM LPORTAL.VO\_PETICIO WHERE ESTAT IN ('0001','0002') AND (TER < ((SYSDATE-DATA\_ACTUALITZACIO)\*24))

**Descripció:** 

RDBMS especial de l'EACAT PL. Aquest RDBMS està programat al propi liferay.

  

**Actuació:** 

Consultar amb ST ambans d'actualitzar

En cas de detectar registres alts haurem de modificar l'estat a '999' d'aquelles peticions antigues que puguin estar bloquejant el servei.

UPDATE LPORTAL.VO\_PETICIO
SETESTAT = '999' 
 WHERE ESTAT IN ('0001','0002') AND (TER < ((SYSDATE-DATA\_ACTUALITZACIO)\*24))

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

**Timers**

DCOC-TIMER\_DCOC\_DELETE\_DOCS\_PCI

  

**Query:**

select 'DCOC-TIMER\_DCOC\_DELETE\_DOCS\_PCI' TIMER, count(\*) REGISTRES FROM DCOC.AOC\_DCOC\_PROJECTE where SYSDATE > ROUND((DATA\_ULTIMA\_PETICIO + 6 + 0.5),'DD')

**Descripció:** 

El DCOC disposa d’un timer intern que es configura al ListenerStartup de l’aplicació i que s’executa en funció d’un paràmetre del fitxer de configuració (dcoc.timeout.timer). Cada execució farà la crida al thread de descàrrega.

SELECT 

  

**Actuació:** 

Actuacio

UPDATE

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

MTI\_TIMER\_CDOMICILIGENERATOR

  

**Query:**

select 'MTI\_TIMER\_CDOMICILIGENERATOR' TIMER, count(\*) REGISTRES FROM APPSPADRO.AOC\_CD\_PROCES WHERE DATA\_INICI>TO\_DATE(sysdate-7) AND ESTAT=0

**Descripció:** 

Descripcio:

SELECT 

  

**Actuació:** 

Actuacio

UPDATE

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

BOE-EACAT\_BOE\_CONSULTA\_PUBLICACIO

  

**Query:**

select 'EACAT\_BOE\_CONSULTA\_PUBLICACIO' TIMER, count(publicacio0\_.id) REGISTRES from ETAULER3PL.TEU\_PUBLICACIO publicacio0\_ left outer join TEU\_ANUNCI anuncis1\_ on publicacio0\_.id = anuncis1\_.PUBLICACIO\_ID where (publicacio0\_.ESTAT in (0, 3)) and (publicacio0\_.DATA\_ACTUALITZACIO is null or publicacio0\_.DATA\_ACTUALITZACIO < sysdate - 1) and (publicacio0\_.DATA\_INICI\_EXPOSICIO is null or publicacio0\_.DATA\_INICI\_EXPOSICIO <= sysdate - 1)

**Query Timer:**

select publicacio0\_.id as id1\_4\_0\_,
anuncis1\_.id as id1\_0\_1\_,
publicacio0\_.BOE\_ID as BOE\_ID2\_4\_0\_,
publicacio0\_.CODI\_ENS as CODI\_ENS3\_4\_0\_,
publicacio0\_.DATA\_ACTUALITZACIO as DATA\_ACTUALITZACIO4\_4\_0\_,
publicacio0\_.DATA\_CREACIO as DATA\_CREACIO5\_4\_0\_,
publicacio0\_.DATA\_INICI\_EXPOSICIO as DATA\_INICI\_EXPOSIC6\_4\_0\_,
publicacio0\_.DATA\_PUBLICACIO\_BOE as DATA\_PUBLICACIO\_BO7\_4\_0\_,
publicacio0\_.DATA\_REGISTRE\_BOE as DATA\_REGISTRE\_BOE8\_4\_0\_,
publicacio0\_.EADOP as EADOP9\_4\_0\_,
publicacio0\_.EMAIL as EMAIL10\_4\_0\_,
publicacio0\_.ESTAT as ESTAT11\_4\_0\_,
publicacio0\_.TITOL as TITOL12\_4\_0\_,
publicacio0\_.UPLOAD as UPLOAD13\_4\_0\_,
anuncis1\_.AVISOS as AVISOS2\_0\_1\_,
anuncis1\_.BOE\_ID as BOE\_ID3\_0\_1\_,
anuncis1\_.CAP\_NOTIFICATS as CAP\_NOTIFICATS4\_0\_1\_,
anuncis1\_.CONTINGUT as CONTINGUT5\_0\_1\_,
anuncis1\_.CONTINGUT\_CO as CONTINGUT\_CO6\_0\_1\_,
anuncis1\_.CVE\_BOE as CVE\_BOE7\_0\_1\_,
anuncis1\_.DADES\_PERSONALS as DADES\_PERSONALS8\_0\_1\_,
anuncis1\_.FIRMA as FIRMA9\_0\_1\_,
anuncis1\_.FORMA\_PUBLICACIO as FORMA\_PUBLICACIO10\_0\_1\_,
anuncis1\_.LGT as LGT11\_0\_1\_,
anuncis1\_.METADADES\_ID as METADADES\_ID12\_0\_1\_,
anuncis1\_.MOTIUS\_DEVOLUCIO as MOTIUS\_DEVOLUCIO13\_0\_1\_,
anuncis1\_.NBO\_BOE as NBO\_BOE14\_0\_1\_,
anuncis1\_.NOTIFICATS as NOTIFICATS15\_0\_1\_,
anuncis1\_.PROC\_PLURAL as PROC\_PLURAL16\_0\_1\_,
anuncis1\_.PROCEDIMENT as PROCEDIMENT17\_0\_1\_,
anuncis1\_.PUBLICACIO\_ID as PUBLICACIO\_ID18\_0\_1\_,
anuncis1\_.URL\_BOE as URL\_BOE19\_0\_1\_,
anuncis1\_.PUBLICACIO\_ID as PUBLICACIO\_ID18\_0\_0\_\_,
anuncis1\_.id as id1\_0\_0\_\_
from TEU\_PUBLICACIO publicacio0\_
left outer join TEU\_ANUNCI anuncis1\_ on publicacio0\_.id = anuncis1\_.PUBLICACIO\_ID
where (publicacio0\_.ESTAT in (0, 3))
and (publicacio0\_.DATA\_ACTUALITZACIO is null or publicacio0\_.DATA\_ACTUALITZACIO < sysdate - 1)
and (publicacio0\_.DATA\_INICI\_EXPOSICIO is null or publicacio0\_.DATA\_INICI\_EXPOSICIO <= sysdate - 1)
order by publicacio0\_.DATA\_REGISTRE\_BOE desc

**Descripció:** 

Si hi han registres és que el timer no esta sincronitzant els estats (GESTOR DE TASQUES propi - NO EACAT).

  

**Actuació:** 

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

**Sondes e-TRAM**

ETRAM-Error\_Generar\_PDF\_Sol·licitud

  

**Query:**

use WTRAM
go
 
SELECT COUNT(\*) REGISTRES
FROM WETTRAGEN T
INNER JOIN WETTRAMIT TR ON TR.WTRNOMTAB = T.WTGNOMTAB AND TR.WTRENTIDA = T.WTGENTIDA AND TR.WTRCODENS = T.WTGCODENS AND
TR.WTRTIPFRM = 'T'
INNER JOIN WETINEENT I ON I.WINCODENT = T.WTGENTIDA AND I.WINCODENS = T.WTGCODENS
LEFT JOIN WETFICADJ F ON T.WTGNOMTAB = F.WFANOMTAB AND T.WTGCODENT = F.WFACODENT AND T.WTGNUMINT = F.WFATRAGEN AND
T.WTGIDIOMA = F.WFAIDIOMA AND F.WFAPDFSOL ='S'
WHERE
(F.WFATRAGEN IS NULL OR F.WFAPDFGEN = 'C') AND
CONVERT(VARCHAR(10),WTGFECUSU,112)>='20190601' AND CONVERT(VARCHAR(10),WTGFECUSU,112)<='20190701'
ORDER BY WTGFECUSU DESC

  

**Descripció:** 

Aquesta sonda conta els errors que s'han produit al generar PDF's de sol·licitud per l'e-TRAM.

**Actuació:** 

Problema
--------

Error en el tràmit, que tot i que es genera per error no es genera el PDF de la sol·licitud.

Solució
-------

Hem de seguir les següents accions per regenerar els PDFs:

1.  Ens connectem a IIS: 
    
    Com connectar-nos al IIS
    
    Servidors 
    ==========
    
    *   Node1: **aoc-w-etram-pro1 → 10.120.1.231**
        
    *   Node2: **aoc-w-etram-pro2** **→ 10.120.1.232**
    *   User: **AOCPRO64\\custadmin**
    
    *   Node1: **aoc-w-etram-pre1** **→ 10.120.2.231**
        
    *   Node2: **aoc-w-etram-pre2** **→ 10.120.2.232**
    *   User: **AOCPRE64\\custadmin**
    
    **Instal·lació aplicació _Escritorio Remoto_ i configuració màquines**
    ----------------------------------------------------------------------
    
    1.  Primer de tot, haurem d'instal·lar (si no la tenim ja) l'aplicació que ens permetrà accedir a la màquina on executarem la tasca de regeneració de pdf's. Anirem a la Microsoft Store i descarregarem la següent aplicació:
    
       [https://www.microsoft.com/store/productId/9WZDNCRFJ3PS](https://www.microsoft.com/store/productId/9WZDNCRFJ3PS)
    
    ![](attachments/41520748/64981580.png)
    
    \-Executarem l’app i anirem al següent apartat => **+Agregar** = > **Equipos**
    
      **![](attachments/41520748/64981581.png)**
    
             -Configurarem la primera màquina:
    
     -A _nombre del equipo_ inserirem la IP:
    
    **10.120.1.231**
    
    ![](attachments/41520748/64981582.png)
    
     -A _nombre para mostrar_ posarem, per exemple, Etram PRO1
    
    ![](attachments/41520748/64981583.png)
    
    \-Se’ns crearà l’accés per entrar a la primera màquina:
    
    ![](attachments/41520748/64981584.png)
    
    \-Ara farem doble clic, i introduirem:
    
    Nombre de usuario:
    
    **AOCPRO64\\custadmin**
    
    Pass:
    
    **Consultar keypass** 
    
      
    
    2\. Ara configurarem la segona màquina:
    
    \-A _nombre del equipo_ inserirem la IP:
    
    **10.120.1.232**  (canvia el número final, posem un 2 enlloc d'un 1)
    
    \- A _nombre para mostrar_ posem Etram PRO2
    
    \-Se’ns crearà l’accés per entrar a la segona màquina.
    
    Ara farem doble clic, i introduirem a nombre de usuario(MATEIXES DADES QUE A LA MÀQUINA 1): 
    
    Nombre de usuario:
    
    **AOCPRO64\\custadmin**
    
    Pass:
    
    **Consultar keypass** 
    
      
    
2.  Anem a la **Consola d'Operacions**, Indicar que es l’entorn de PRO i l’opció **Generar PDF Sol·licitud**:  
    ![](attachments/26313451/26315909.png)
    
3.  En aquesta pantalla, cal fer les següents passes:
    1.  1.  1.  Seleccionar els ens del desplegable, queden indicats a la llista de la dreta.
            2.  Seleccionar els criteris de cerca
            3.  Clicar a cerca. En el llistat apareixen els tràmits amb el document PDF pendent
            4.  Seleccionar els documents del llistat que es volen generar (selecció múltiple)
            5.  Clicar Regenerar PDF. Es mostra a la barra inferior el % que sestà executant, i un missatge al final. El procés canvia automàticament l’estat de la generació del PDF.  
                  
                ![](attachments/26313451/26314476.png)
4.  Finalitzar amb el missatge tipus de la FAQ : [eTRAM - Error obrir sol- licitud PDF](#)

Related articles
----------------

  

Related issues

JIRA : [https://contacte.aoc.cat/browse/ST-4854](https://contacte.aoc.cat/browse/ST-4854)

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

  
  

Document generated by Confluence on 02 June 2025 11:10

[Atlassian](http://www.atlassian.com/)