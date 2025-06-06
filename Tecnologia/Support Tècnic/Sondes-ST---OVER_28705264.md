Suport Tècnic : Sondes ST - OVER  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [03 - Monitorització - Revisions globals](26313327.md)
4.  [03 - Monitorització - OLD](128647245.md)
5.  [Sondes S.T.](Sondes-S.T._30869120.md)
6.  [Sondes ST - Old](Sondes-ST---Old_41522507.md)

Suport Tècnic : Sondes ST - OVER
================================

Created by Unknown User (otecobernal), last modified on 16 October 2019

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

  

<a href="https://confluence.aoc.cat/plugins/servlet/gadgets/ifr?container=atlassian&amp;mid=1885523148800&amp;country=GB&amp;lang=en&amp;view=default&amp;view-params=%7B%22writable%22%3A%22false%22%7D&amp;st=atlassian%3AbWjA7zojsBF%2FENkK986MGOBPg8oV2G55xyZ%2BHTOSSO1obySo4OVVO05S2UzQyx52MOc8Pref1izixlDLsvVNwnSmfmfY0jVI%2FLgHbKRi8WX9vT7bZ1dFQg03T3aq6ymIFavHnqr843VMgeq7Dghso03e%2BiB8WcK5BiNWEgbeyHT1P82BhJ1Y%2F%2FtENJGNjLw24OR1BpHpIggt5XesXb1M2F8VYI2Akbl4mVKC5HaLswogkbhJtWLE12E6qwDm3Ff6FynwGW4xw1XmLFB8teRF7jFREOLgEnRh5wbT1K%2FeaGS4hkXKCXHFZR%2F4%2B7kg8Fwkt4yndbhpvf90XZLGw%2FeUOa1pGu%2BOigpPjcL%2FbLj45MLZOjKF&amp;up\_isConfigured=true&amp;up\_spaceName=&amp;up\_spaceKey=SII&amp;up\_pageName=OVER+%28Oficina+Virtual+d%27Emissi%C3%B3+i+Recepci%C3%B3%29&amp;up\_pageId=26313459&amp;up\_showLink=true&amp;up\_refresh=false&amp;up\_isEditable=false&amp;url=https%3A%2F%2Fconfluence.aoc.cat%2Frest%2Fgadgets%2F1.0%2Fg%2Fcom.atlassian.confluence.plugins.gadgets%3Aconfluence-page-gadget%2Fgadgets%2Fconfluence-page-gadget.xml&amp;libs=auth-refresh#rpctoken=667138405">\_\_MSG\_gadget.confluence.page.title\_\_</a>

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [BD\_ORA\_PRE\_OVER.png](attachments/28705264/28705265.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:11

[Atlassian](http://www.atlassian.com/)