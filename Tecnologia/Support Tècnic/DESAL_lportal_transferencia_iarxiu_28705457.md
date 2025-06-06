Suport Tècnic : DESAL\_lportal\_transferencia\_iarxiu  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [03 - Monitorització - Revisions globals](26313327.md)
4.  [03 - Monitorització - OLD](128647245.md)
5.  [Sondes S.T.](Sondes-S.T._30869120.md)
6.  [Sondes ST - Old](Sondes-ST---Old_41522507.md)

Suport Tècnic : DESAL\_lportal\_transferencia\_iarxiu
=====================================================

Created by Unknown User (otecobernal), last modified by Unknown User (otecjriquelme) on 22 April 2020

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

Document generated by Confluence on 02 June 2025 11:11

[Atlassian](http://www.atlassian.com/)