Suport Tècnic : Sondes ST - ALTRES  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [03 - Monitorització - Revisions globals](26313327.html)
4.  [03 - Monitorització - OLD](128647245.html)
5.  [Sondes S.T.](Sondes-S.T._30869120.html)

Suport Tècnic : Sondes ST - ALTRES
==================================

Created by Unknown User (otecobernal), last modified by Unknown User (otecrjurado) on 17 December 2019

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

.rwui\_text\_box.rwui\_id\_8c2cbc81-6cba-464d-8aef-d995ffd4ab31 {background-color: #F2F2F2; color: #666666;}.rwui\_text\_box.rwui\_id\_8c2cbc81-6cba-464d-8aef-d995ffd4ab31 \*:not(.rwui\_content) {color: #666666;}.rwui\_text\_box.rwui\_id\_8c2cbc81-6cba-464d-8aef-d995ffd4ab31 span.rwui\_icon {color: #666666;}

  

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

Document generated by Confluence on 02 June 2025 11:11

[Atlassian](http://www.atlassian.com/)