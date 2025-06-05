Suport Tècnic : Sondes ST - REPRESENTA  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [03 - Monitorització - Revisions globals](26313327.html)
4.  [03 - Monitorització - OLD](128647245.html)
5.  [Sondes S.T.](Sondes-S.T._30869120.html)
6.  [Sondes ST - Old](Sondes-ST---Old_41522507.html)

Suport Tècnic : Sondes ST - REPRESENTA
======================================

Created by Unknown User (otecagonzalez), last modified on 29 October 2019

  

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

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2019-10-29\_14-2-51.png](attachments/28706731/28706740.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:11

[Atlassian](http://www.atlassian.com/)