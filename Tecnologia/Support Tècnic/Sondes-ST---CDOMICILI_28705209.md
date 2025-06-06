Suport Tècnic : Sondes ST - CDOMICILI  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [03 - Monitorització - Revisions globals](26313327.md)
4.  [03 - Monitorització - OLD](128647245.md)
5.  [Sondes S.T.](Sondes-S.T._30869120.md)
6.  [Sondes ST - Old](Sondes-ST---Old_41522507.md)

Suport Tècnic : Sondes ST - CDOMICILI
=====================================

Created by Unknown User (otecobernal), last modified on 25 March 2020

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

<a href="https://confluence.aoc.cat/plugins/servlet/gadgets/ifr?container=atlassian&amp;mid=1885519544320&amp;country=GB&amp;lang=en&amp;view=default&amp;view-params=%7B%22writable%22%3A%22false%22%7D&amp;st=atlassian%3A9a5vQXth69ZHsbp8FknfPd6kEq%2FccWE27OKflXM7PRSJim7C%2BWill0z7b7cVqdAFHRxYm5JkbbQg4PBpKLmoCQTVnn6cgI27HOkTyK65fiLGBjVggE4ah02Rrxp9LUweTZO%2BDSIOMGR0App49ljsGcFK%2B9%2FL5h8MqwnaP0%2FlZne1AXYCahlZAGWd5DByXegKIj5vcEenXDNylE4MsjjwrbAXIu1dIwVnRZO8S%2F0533jMvl4uYhe4yHVYNsrP2Qg%2FqrBgPSDkq36qArmX37aeoEuLunRPSA%2FEBJ0TBO7KbIF50Zafu%2B2NdWlxkAKkOEmbWgUekJd3u0s%2BGkc7nqVfu3WktXQ0E2HEYdVRSmUj%2B5FWkz8L&amp;up\_isConfigured=true&amp;up\_spaceName=&amp;up\_spaceKey=SII&amp;up\_pageName=CDOMICILI++%28Comunicaci%C3%B3+De+Domicili%29&amp;up\_pageId=26313213&amp;up\_showLink=true&amp;up\_refresh=false&amp;up\_isEditable=false&amp;url=https%3A%2F%2Fconfluence.aoc.cat%2Frest%2Fgadgets%2F1.0%2Fg%2Fcom.atlassian.confluence.plugins.gadgets%3Aconfluence-page-gadget%2Fgadgets%2Fconfluence-page-gadget.xml&amp;libs=auth-refresh#rpctoken=1180828276">\_\_MSG\_gadget.confluence.page.title\_\_</a>

Attachments:
------------

![](images/icons/bullet_blue.gif) [DI - Via Oberta - Comunicació de domicili.pdf](attachments/28705209/36340279.pdf) (application/pdf)  

Document generated by Confluence on 02 June 2025 11:11

[Atlassian](http://www.atlassian.com/)