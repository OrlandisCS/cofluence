Suport Tècnic : Sonda OMI - ETRAM2  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [03 - Monitorització - Revisions globals](26313327.md)
4.  [Monitors OMI (CTTI)](26313608.md)

Suport Tècnic : Sonda OMI - ETRAM2
==================================

Created by OTEC ST Alessandro Trombin Martinez, last modified by Joan Riquelme on 25 March 2025

SERVEI 24X7

Circuit que fa la sonda

Comprovar el correcte funcionament del servei ETRAM2

Per fer-ho es provarà d’accedir a la web d’ETRAM2 i es comprovarà que es mostri correctament.

  

**PASSOS SONDA:**

Pas 1: Accedir a l'URL→ Carregar l'URL:  [https://seu-e.cat/tramits/7996100001/instancia-generica](https://seu-e.cat/tramits/7996100001/instancia-generica "Seguir el enlace")

Pas 2: Fer login mitjançant Vàlid amb certificat de proves. (_(Sharepoint) Tecnologia - SUPORT\_TECNIC\\MONITORITZACIO\\Monitors CTTI\\2- Certificat i credencials Sondes_)

Pas 3: Validar que veiem correctament la informació del tràmit.

![](attachments/64980000/64980004.png)

Màquines a revisar en cas de caiguda

### NOTA: Vàlid i eTram2 estan connectats, per tant, és possible que hàgim de revisar els 2  
  
Revisió Vàlid

Si falla en el pas 2, revisem VÀLID.

Seguim el procediment de revisió i restabliment del servei descrit a l'apartat de Sistemes i 24x7

[Revisió VALid](36340625.md)  
  

###   
Revisió Tomcat8

Si falla en el pas 3 **o les alertes són intermitents**, revisem Tomcat8 (_és molt probable que **un dels 2 nodes tingui problemes de rendiment**_).

Connexió al servidor

Servidors 
==========

*   Node1: **aoc-l-mygov-01 → 10.120.1.37 [](https://pam.aoc.cat/SecretServer/app/#/secrets/4390/general)** 
    
*   Node2: **aoc-l-mygov-02** **→ 10.120.1.38 [](https://pam.aoc.cat/SecretServer/app/#/secrets/4392/general)** 
*   User: **tomcat8**

*   Node1: **aoc-l-mygov-01-pre** **→ 10.120.2.138 [](https://pam.aoc.cat/SecretServer/app/#/secrets/4387/general)** 
    
*   Node2: **aoc-l-mygov-02-pre** **→ 10.120.2.139 [](https://pam.aoc.cat/SecretServer/app/#/secrets/4389/general)** 
*   User: **tomcat8**

Revisió del Tomcat8

Revisió dels logs
=================

Per revisar errors podem mirar els logs del tomcat:

*   _/apps/tomcat8/logs/mygov.out_ 

Revisió del rendiment dels nodes
================================

Podem fer servir les comandes Linux de "top" i "sar" per revisar quin és l'estat de la CPU.

*   _La comanda top, ens permet veure en temps real el % que està utilitzant el sistema, exemple:__  
    ![](attachments/41520766/93357375.png)_
*   _La comanda sar, en canvi, ens permet veure els % que s'esta utilitzant del node, desglossat per temps, fet que ens pot ajudar a trobar si algun dels nodes és el causant de la incidència (per exemple, mirant a quina hora ha saltat la sonda OMI i comparant amb la informació que extrèiem d'aquesta comanda.  
    ![](attachments/41520766/93357376.png)  
    _

Revisió dels probe
==================

Per revisar els probe via web:

*   [http://10.120.1.37:8080/probe/](http://10.120.1.37:8080/probe/)
*   [http://10.120.1.38:8080/probe/](http://10.120.1.38:8080/probe/)

  

1.  Comprovar que les aplicacions estiguin **RUNNING:**  
    **![](attachments/41520766/41520784.png)  
    **  
    
2.   Revisar que els Thread Pool són inferiors als Max. Thread:  
      
    [![](attachments/41520766/41520785.png)](https://intranet.aoc.cat/pages/resumedraft.action?draftId=41519470&draftShareId=0f3532e1-81cb-4dce-8fac-bcaf3b047389&)
    
    [![](attachments/41520766/41520786.png)](https://intranet.aoc.cat/pages/resumedraft.action?draftId=41519470&draftShareId=0f3532e1-81cb-4dce-8fac-bcaf3b047389&)[![](attachments/41520766/41520787.png)](https://intranet.aoc.cat/pages/resumedraft.action?draftId=41519470&draftShareId=0f3532e1-81cb-4dce-8fac-bcaf3b047389&)

Si els **Current Threads Busy** superen el màxim establert (**Max Threads**), caldrà reiniciar el node.

  

  

  

Exemples d'errors
=================

Click here to expand...

  

Procediment

### VALID

  

Reinici VALID

Infraestructura de VALID:
-------------------------

El servei de vàlid s'ofereix des d'una plataforma **AÏLLADA** i única per aquest servei. Aquesta plataforma consta de **4 parts:**

Plataforma

FRONT

BROKER

BEA

BACK

**Aplicacions**

Apache

CORE VALid

SMS

Paraula de pas

BDSeu

**Logs**

identitats.aoc.cat-ssl-access.20200217.log

identitats.aoc.cat-ssl-error.20200217.log

VALId-OAuth-nodeX.log

SC-SMS\_PCINodoX.log  
SC-ParaulesPas\_PCINodoX.log

SC-BDSeu\_nodeX.log

**NOTA**: Els logs del FRONTAL són els logs del Apache. Mostraran les connexions que hi han hagut (access) i les connexions amb error (error)

  

Relació entre els seus components:

Esquema del funcionament:

![](attachments/36340625/41522793.png)

1 - La petició arriba al apache

2 - Des del apache va cap al broker. El Broker és qui orquestra tota la lògica de Vàlid. I des d'allà té **tres opcions:**

2.1 - Dirigir la petició cap al **BACK**: És on es tracten les peticions de BDSeu.

2.2 - Dirigir la petició contra el **BEA**. És on es tracten peticions de: SMS, Paraula de pas. És on hi hauria també la MSC pròpia del VALid.

2.3 - Re-dirigir la petició contra el propi **BROKER**. El BROKER és el que porta la gran càrrega de treball de vàlid, tota la resta de peticions, i per tant és el que té més números de fallar.

3 - Es dóna resposta.

Comprovar per quin VALid estem donant servei
--------------------------------------------

VALid té actius dos DNS, un principal i un de DR:

Principal: identitats.aoc.cat

DR: identitats-dr.aoc.cat

Per saber per quina infraestructura respon cada DNS, consultar la següent FAQ: [VÀLid - Revisions i Restabliment](https://confluence.aoc.cat/pages/viewpage.action?pageId=41523197)

Revisió del servei component per component:
-------------------------------------------

BROKER
======

El Broker és la peça que connecta amb cl@ve → /apps/tomcat7/webapps/o/WEB-INF/classes → application.properties

\# CLAVE
# #####
clave.cfgPath=/apps/aoc/APP/VALId/cfgClave/
clave.providerName=q0801175a\_a09006303
clave.returnURL=https://identitats-dr.aoc.cat/o/oauth2/auth
#clave.returnURL=https://identitats.aoc.cat/o/oauth2/auth
clave.application=AOC-VALID
clave.pepsURL=https://pasarela.clave.gob.es/Proxy2/ServiceProvider

La propietat **clave.returnURL** és una URL de callback, tal com està implementat el client del VÀLid, només suporta una URL (o identitats o identitats-dr). Per tant, hi pot haver problemes quan es canvia un dels dos entorns (NX o MC) per problemes a la plataforma.

El broker és l'encarregat d'orquestrar tot el VÀLID. És el seu principal component, així que és el primer que revisarem en detall. 

Connexió al servidor

Servidors 
==========

*   Node1: **aoc-l-broker-valid01 → 10.124.70.6**
    
*   Node2: **aoc-l-broker-valid02 → 10.124.70.7**
*   User: **tomcat7**

*   Node1: **aoc-l-broker-pre01 → 10.120.2.190**
    
*   Node2: **aoc-l-broker-pre02** **→ 10.120.2.191**
*   User: **tomcat7**

Revisió del BROKER

Revisió dels logs
=================

Per revisar errors podem mirar els logs d'aplicació del que hi ha al Broker:

*   /mnt/sto1/lhnfs/aoc/APP/logs/VALId-OAuth-node?.log

Si veiem que es repeteix molt un error, que un node té molts més errors que l'altre, que es printa un error quan intentem fer el circuit, etc. Podem valorar el reinici.

  

Revisió dels PROBE
==================

*   PROBE node 1: [http://10.124.70.6:8080/probe/](http://10.124.70.6:8080/probe/)
*   PROBE node 2:  [http://10.124.70.7:8080/probe/](http://10.124.70.7:8080/probe/)

1.  Comprovar que les aplicacions estiguin **RUNNING:**  
    **![](attachments/41520566/41520579.png)  
    **  
    
2.   Revisar que els Thread Pool són inferiors als Max. Thread:  
    ![](attachments/41520566/41520580.png)![](attachments/41520566/41520581.png)  
      
    Si els **Current Threads Busy** superen el màxim establert (**Max Threads**), caldrà reiniciar el node.  
      
    

Revisió connexions a BDD que es fan des del Broker
==================================================

Les connexions des del BROKER són les que es fan directament contra l'esquema propi del Vàlid.

La manera més ràpida de veure el nombre de connexions establerts és mirant a cada node les connexions de xarxa amb la següent comanda:

**Connexions establertes a BBDD**

netstat -ant | grep 1528 | wc –l

Aquí veurem el màxim que ha tingut, **no implica que siguin actualment les actives**.

Per assegurar les actives s’hauria de reiniciar el servidor i executar la comanda contínuament, per comprovar que pugen.

  

Reinici del BROKER

  

**JIRA on deixar registre del reinici**

Per deixar registre d'aquest reinici, obrirem un JIRA amb aquesta plantilla: [http://10.120.1.242:8081/veureTicket/63494d1140beb9d3f41b51b5](http://10.120.1.242:8081/veureTicket/63494d1140beb9d3f41b51b5)

**Aturar el tomcat**

sudo /usr/bin/systemctl stop tomcat7

  

Comprovar que el Tomcat estigui realment aturat:

**Revisar el procés**

ps -aux | grep -i tomcat

  

*   Per eliminar el procés (en cas que amb l'stop no s'elimini) es pot executar un kill on **XXXX** serà l'**id** del **procés**:
    
    **Matar el procés (només si cal)**
    
    kill -9 "XXXX"
    

  
Eliminar els directoris **work** i **temp**:

**Neteja de directoris**

rm -rf /apps/tomcat7/work/\*
rm -rf /apps/tomcat7/tmp/\*

  

Un cop el tomcat estigui aturat, es podrà aixecar:

**Aixecar el Tomcat**

sudo /usr/bin/systemctl start tomcat7 && tail -f /apps/tomcat7/logs/catalina.out

Enviament SMS i paraules de pas
===============================

El BEA conté serveis com enviament SMS, Paraula de pas. Si fallen només aquests serveis, és possible que hi hagi un problema al BEA aïllat.

Connexió al servidor

Servidors 
==========

*   Node1: **aoc-l-app1-valid → 10.124.70.2**
    
*   Node2: **aoc-l-app2-valid** **→ 10.124.70.3**
*   User: **bea**

*   Node1: ****aoc-l-app1-pre** → 10.120.2.80**
    
*   Node2: ****aoc-l-app1-pre**** **→ 10.120.2.81**
*   User: **bea**

Revisió del BEA8

Revisió dels logs
=================

Per revisar errors podem mirar els logs d'aplicació del que hi ha desplegat al BEA:

*   /mnt/sto1/lhnfs/aoc/APP/logs/SC-SMS\_PCINodo?.log
*   /mnt/sto1/lhnfs/aoc/APP/logs/SC-ParaulesPas\_PCINodo2.log  
      
    

Si veiem que es repeteix molt un error, que un node té molts més errors que l'altre, que es printa un error quan intentem fer el circuit, etc. Podem valorar el reinici

  

Revisió de la consola
=====================

*   [http://10.124.70.2:8001/console](http://10.124.70.2:8001/console)  
      
    

1.  Comprovar que els nodes estiguin **RUNNING:**  
    **![](attachments/41520561/41520607.png)  
    **
    
    Si aquesta URL no carrega, és possible que hi hagi un problema amb l'ADMIN i podem mirar de reiniciar-lo.
    
2.  Revisar els Threada:
    
    Accedir al node que vulguem revisar: Servers >> PCINodoX >> Monitoring >> Monitor all Active Queues:
    
    ![image2020-2-14_13-7-23.png](https://intranet.aoc.cat/download/attachments/34505038/image2020-2-14_13-7-23.png?version=1&modificationDate=1581682044274&api=v2)
    
    Veurem una taula que ens mostrarà els Threads del node.
    
    *   El número de **Idle Threads** hauria de ser molt proper al número de Threads
    *   La **Queue Lengh** hauria de ser 0
    
    Exemple de funcionament correcte:
    
    ![](attachments/41520561/41520608.png)
    
    Exemple de funcionament amb Incidècia:
    
    ![](attachments/41520561/41520609.png)
    
3.  Revisar els pools a BDD:
    
    Tornem a la Pàgina principal de l'admin del BEA aïllat i, en comptes d'accedir a SERVERS, accedim a Connection Pools:
    
    ![](https://intranet.aoc.cat/download/thumbnails/34505038/image2020-2-14_13-23-57.png?version=1&modificationDate=1581683037934&api=v2)
    
    Una vegada dins se'ns mostrarà una taula amb tots **els Pools que es fan a les BBDD**, no n'hauríem de veure massa.
    
    La columna **CONNECTIONS** hauria d'estar entre 0 i 15 i anar baixant.
    
    A continuació mostrem la diferència entre comportament normal i comportament anormal:
    
    Comportament **NORMAL** (realment no té per què estar a zero, però si que vagi baixant):
    
    ![](attachments/41520561/41520610.png)
    
    Comportament **d'incidència** (hi ha moltes connexions i es mantenen altes):
    
    ![](attachments/41520561/41520611.png)
    
    En cas que veiem que hi ha aquests problemes, haurem de discernir si es:
    
    A. Problema del BEA per interactuar amb la BBDD  
    B. Problema de la BBDD en si.
    
    Per diferenciar entre les dues possibilitats, podem provar a **connectar-nos a la BBDD** de Vàlid:
    
    ![](attachments/41520561/41520612.png)
    
    En cas que ens poguem connectar sense problemes, podem valorar la possibilitat de reiniciar el BEA8 → [VALID - Procediments de reinicis](/pages/createpage.action?spaceKey=SII&title=VALID+-+Procediments+de+reinicis&linkCreation=true&fromPageId=41520561)
    
    Si reiniciant el BEA8 no s'arregla, potser és un tema de BBDD → Podem revisar també OP5 a veure si hi veiem alguna cosa sospitosa...
    
    En cas que veiem un problema clar de BBDD → Escalar a Claranet
    

Reinici del BEA8

  

**JIRA on deixar registre del reinici**

Per deixar registre d'aquest reinici, obrirem un JIRA amb aquesta plantilla: [http://10.120.1.242:8081/veureTicket/63494d1140beb9d3f41b51b5](http://10.120.1.242:8081/veureTicket/63494d1140beb9d3f41b51b5)

  

  

Accedir a la ruta dels scripts de reinici:

**Ruta per reiniciar**

cd /apps/bea/beaplat/user\_projects/domains/PCIDomain

  

En primera instància, s'haurà d'aturar i aixecar l'**ADMIN**:

**Reinici**

./BEA\_STOP\_ADMIN.sh
./BEA\_START\_ADMIN.sh

  

Després, es podran aturar i encendre els nodes, de manera ordenada i esperant a que les accions finalitzin:

  

*   **Node 1**:
    
    **Reinici**
    
     ./BEA\_STOP\_NODO1.sh
    ./BEA\_START\_NODO1.sh
    
*   **Node 2**:
    
    **Reinici**
    
    ./BEA\_STOP\_NODO2.sh
    ./BEA\_START\_NODO2.sh
    

Dependència amb tercers en l'enviament de SMS

El servei d'enviament de SMS depèn en última instància de tercers (CTTI/Generalitat).

Això vol dir que al final del flux ens estem integrant amb el servei d'enviament massiu de SMS's que pertany al CTTI.

En cas que per la nostra banda ho veiem tot bé, les nostres plataformes involucrades estiguin bé, i el que falli sigui l'enviament de SMS, podem obrir tiquet a CTTI preguntant si tenen alguna incidència detectada.

Per obrir REMEDY: [https://pautic.gencat.cat/arsys/forms/vip\_remedy\_users\_pro/SRS:ServiceRequestConsole/Default+Administrator+View/?cacheid=b77528c9](https://pautic.gencat.cat/arsys/forms/vip_remedy_users_pro/SRS:ServiceRequestConsole/Default+Administrator+View/?cacheid=b77528c9)

![](attachments/36340625/64981776.png)

  

Connectivitat amb BDSEU
=======================

El Back tracta les peticions de BDSeu.

Atenció!!!

El back de BDSEU en PRE es troba a WL12, caldria revisar aquí en cas de problemes

[PCI3 - WL12 - Revisió](https://confluence.aoc.cat/pages/viewpage.action?pageId=41520946)

  

Connexió al servidor

Servidors 
==========

*   Node1: **aoc-l-back-valid01 → 10.124.70.4**
    
*   Node2: **aoc-l-back-valid02** **→ 10.124.70.5**
*   User: **tomcat6**

*   Node1: **aoc-cl-valid-back01 → 10.123.5.198**
    
*   Node2: **aoc-cl-valid-back02** **→ 10.123.5.198**
*   User: **tomcat6**

*   Node1: **aoc-l-back01-pre → 10.120.2.28**
    
*   Node2: **aoc-l-back02-pre → 10.120.2.29**
*   User: **tomcat6**

Revisió del BACK

Revisió dels logs
=================

Per revisar errors podem mirar els logs d'aplicació de la part del Back (BDSEU):

*   /mnt/sto1/lhnfs/aoc/APP/logs/SC-BDSeu\_nodeX.log

Si veiem que es repeteix molt un error, que un node té molts més errors que l'altre, que es printa un error quan intentem fer el circuit, etc. Podem valorar el reinici.

  

Revisió dels PROBE
==================

*   PROBE node 1: [http://10.124.70.4:8082/probe](http://10.124.70.4:8082/probe)
*   PROBE node 2:  [http://10.124.70.5:8082/probe](http://10.124.70.5:8082/probe)

1.  Comprovar que les aplicacions estiguin **RUNNING:**  
    **![](attachments/41520556/41520602.png)  
    **  
    
2.   Revisar que els Thread Pool són inferiors als Max. Thread:  
    ![](attachments/41520556/41520603.png)![](attachments/41520556/41520604.png)  
      
    Si els Threads superen el màxim establert, caldrà reiniciar el node.
    

Reinici del BACK

  

**JIRA on deixar registre del reinici**

Per deixar registre d'aquest reinici, obrirem un JIRA amb aquesta plantilla: [http://10.120.1.242:8081/veureTicket/63494d1140beb9d3f41b51b5](http://10.120.1.242:8081/veureTicket/63494d1140beb9d3f41b51b5)

**Aturar el tomcat**

sudo /etc/init.d/tomcat6 stop

  
Comprovar que el Tomcat estigui realment aturat:

**Revisar el procés**

ps -aux | grep -i tomcat

  

*   Per eliminar el procés (en cas que amb l'stop no s'elimini) es pot executar un kill on **XXXX** serà l'**id** del **procés**:
    
    **Matar el procés (només si cal)**
    
    kill -9 "XXXX"
    

Un cop el tomcat estigui aturat, es podrà aixecar:

**Aixecar el Tomcat**

sudo /etc/init.d/tomcat6 start && tail -f /apps/tomcat6/logs/catalina.out

  

  

Frontals
========

En els FRONTALS tan sols hi ha un apache que rep les peticions i balanceja contra els BROKERS. És extremadament estrany que falli el VALID per culpa del frontal.

Connexió al servidor

Servidors 
==========

*   Node1: **aoc-l-web1-valid → 10.124.70.8**
    
*   Node2: **aoc-l-web2-valid** **→ 10.124.70.9**
*   User: **aoc**

*   Node1: **aoc-l-web1-pre→ 10.120.2.85**
    
*   Node2: **aoc-l-web2-pre****→ 10.120.2.86**
*   User: **tomcat**

Revisió del FRONT

Revisió dels logs
=================

Per revisar errors podem mirar els logs:

*   identitats.aoc.cat-ssl-access.20200217.log

Si veiem que es repeteix molt un error, que un node té molts més errors que l'altre, que es printa un error quan intentem fer el circuit, etc. Podem valorar el reinici.

Tot i que al ser els access log, _tampoc ens donen massa informació_.

  

Revisió del procés Apache
=========================

Per comprovar si el servei està aixecat podem executar la següent comanda:

**Estat de l'Apache**

service httpd status

Si ala resposta veiem un missatge tipus:

`httpd (pid  xxxxx) is [running...](https://intranet.aoc.cat/display/SII/running...)`

El servei estarà funcionant.

  

Sondes Apache
=============

Tenim les següents sondes:

**NODE 1: [http://10.124.70.8/server-status](http://10.124.70.8/server-status)**

**NODE 2: [http://10.124.70.9/server-status](http://10.124.70.9/server-status)**

Obtindrem una informació semblant a això:

![](attachments/41520571/41520615.png)

Els puntets són Threads lliures.

Si no hi ha Threads lliures → Segurament el Broker tingui problemes i les peticions s'estiguin quedant enganxades a l'apache esperant.

Reinici del FRONT

  

NO REINICIAR EL NODE 1

**NO ATURAR l'APACHE del NODE 1:**

En aquest frontal està el **proxysms.aoc.cat** per enviar SMS a la GENE:

*   ubicacio: **/etc/httpd/conf.d/sites/smsproxy.aoc.cat.conf**

**JIRA on deixar registre del reinici**

Per deixar registre d'aquest reinici, obrirem un JIRA amb aquesta plantilla: [http://10.120.1.242:8081/veureTicket/63494d1140beb9d3f41b51b5](http://10.120.1.242:8081/veureTicket/63494d1140beb9d3f41b51b5)

  

En cas de necessitar reiniciar el NODE 2 (_normalment no es fa, com recomanació, preguntem primer abans_), utilitzarem les següents comandes:

**Aturar l'Apache**

sudo /etc/init.d/httpd stop

  

**Iniciar l'Apache**

sudo /etc/init.d/httpd start

BROKER
======

El Broker és la peça que connecta amb cl@ve → /apps/tomcat7/webapps/o/WEB-INF/classes → application.properties

\# CLAVE
# #####
clave.cfgPath=/apps/aoc/APP/VALId/cfgClave/
clave.providerName=q0801175a\_a09006303
clave.returnURL=https://identitats-dr.aoc.cat/o/oauth2/auth
#clave.returnURL=https://identitats.aoc.cat/o/oauth2/auth
clave.application=AOC-VALID
clave.pepsURL=https://pasarela.clave.gob.es/Proxy2/ServiceProvider

La propietat **clave.returnURL** és una URL de callback, tal i com està implementat el client del VÀLid, només suporta una URL (o identitats o identitats-dr). Per tant, hi pot haver problemes quan es canvia un dels dos entorns (NX o MC) per problemes a la plataforma.

El broker és l'encarregat d'orquestrar tot el VÀLID. És el seu principal component, així que és el primer que revisarem en detall.

Connexió al servidor

Servidors 
==========

*   Node1: cl-validbroker1**→ 10.123.5.200**
    
*   Node2: cl-validbroker2**→ 10.123.5.201**
*   Node3: cl-validbroker3**→ 10.123.5.213**
*   Node4: cl-validbroker4**→ 10.123.5.215**
*   User: **tomcat7**

*   No hi ha entorn de PRE pel Valid Aïllat.
    

Revisió del BROKER

Per revisar errors podem mirar els logs d'aplicació del que hi ha al Broker:

*   /mnt/aoc/APP/logs/VALId-OAuth-node?.log

Si veiem que es repeteix molt un error, que un node té molts més errors que l'altre, que es printa un error quan intentem fer el circuit, etc. Podem valorar el reinici.

Revisió dels PROBE
==================

*   PROBE node 1: [http://10.123.5.200:8080/probe/](http://10.123.5.200:8080/probe/)
*   PROBE node 2:  [http://10.123.5.201:8080/probe/](http://10.123.5.201:8080/probe/)
*   PROBE node 3:  [http://10.123.5.213:8080/probe/](http://10.123.5.213:8080/probe/)
*   PROBE node 4:  [http://10.123.5.215:8080/probe/](http://10.123.5.215:8080/probe/)

Comprovar que les aplicacions estiguin **RUNNING:**

**![](attachments/41522221/41522254.png)**

 Revisar que els Thread Pool són inferiors als Max. Thread:

![](attachments/41522221/41522255.png)![](attachments/41522221/41522256.png)

  

Si els **Current Threads Busy** superen el màxim establert (**Max Threads**), caldrà reiniciar el node.

  

  

  

  

  

  

Reinici del BROKER

  

**JIRA on deixar registre del reinici**

Per deixar registre d'aquest reinici, obrirem un JIRA amb aquesta plantilla: [http://10.120.1.242:8081/veureTicket/63494b2140beb9d3f41b51b3](http://10.120.1.242:8081/veureTicket/63494b2140beb9d3f41b51b3)

**Aturar el tomcat**

sudo systemctl stop tomcat7

Comprovar que el Tomcat estigui realment aturat:

**Revisar el procés**

ps -aux | grep -i tomcat

Per eliminar el procés (en cas que amb l'stop no s'elimini) es pot executar un kill on **XXXX** serà l'**id** del **procés**:

**Matar el procés (només si cal)**

kill -9 "XXXX"

Eliminar els directoris **work** i **temp**:

**Neteja de directoris**

rm -rf /apps/tomcat7/work/\*
rm -rf /apps/tomcat7/temp/\*

Un cop el tomcat estigui aturat, es podrà aixecar:

**Aixecar el Tomcat**

sudo systemctl start tomcat7 && tail -f /apps/tomcat7/logs/catalina.out

Enviament SMS i paraules de pas
===============================

El BEA conté serveis com enviament SMS, Paraula de pas. Si fallen només aquests serveis, és possible que hi hagi un problema al BEA aïllat.

Connexió al servidor

Servidors 
==========

*   Node1: cl-valid-app1**→ 10.123.5.196**
    
*   Node2: cl-valid-app2**→ 10.123.5.197**
*   Node3: cl-valid-app3**→ 10.123.5.202**
*   Node4: cl-valid-app4**→ 10.123.5.203**
*   User: **bea**

*   No hi ha entorn de PRE pel Valid Aïllat
    

Revisió del BEA8

Revisió dels logs
=================

Per revisar errors podem mirar els logs d'aplicació del que hi ha desplegat al BEA:

*   /mnt/aoc/APP/logs/SC-SMS\_PCINodo?.log
*   /mnt/aoc/APP/logs/SC-ParaulesPas\_PCINodo2.log  
      
    

Si veiem que es repeteix molt un error, que un node té molts més errors que l'altre, que es printa un error quan intentem fer el circuit, etc. Podem valorar el reinici.

  

Revisió de la consola
=====================

*   [http://10.123.5.196:8001/console](http://10.123.5.196:8001/console)

Comprovar que els nodes estiguin RUNNING:

![](attachments/41522228/41522270.png)

Si aquesta URL no carrega, és possible que hi hagi un problema amb l'ADMIN i podem mirar de reiniciar-lo.

Accedir al node que vulguem revisar: Servers >> PCINodoX >> Monitoring >> Monitor all Active Queues:

![image2020-2-14_13-7-23.png](https://intranet.aoc.cat/download/attachments/34505038/image2020-2-14_13-7-23.png?version=1&modificationDate=1581682044274&api=v2)

Veurem una taula que ens mostrarà els Threads del node.

*   El número de **Idle Threads** hauria de ser molt proper al número de Threads
*   La **Queue Lengh** hauria de ser 0

  

Exemple de funcionament correcte:

![](attachments/41522228/41522271.png)

Exemple de funcionament amb Incidècia:

![](attachments/41522228/41522272.png)

  

Revisar els pools a BDD:

Tornem a la Pàgina principal de l'admin del BEA aïllat i, en comptes d'accedir a SERVERS, accedim a Connection Pools:

![](https://intranet.aoc.cat/download/thumbnails/34505038/image2020-2-14_13-23-57.png?version=1&modificationDate=1581683037934&api=v2)

  

Una vegada dins se'ns mostrarà una taula amb tots **els Pools que es fan a les BBDD**, no n'hauríem de veure massa.

La columna **CONNECTIONS** hauria d'estar entre 0 i 15 i anar baixant.

A continuació mostrem la diferència entre comportament normal i comportament anormal:

Comportament **NORMAL** (realment no té per què estar a zero, però si que vagi baixant):

![](attachments/41522228/41522273.png)

Comportament **d'incidència** (hi ha moltes connexions i es mantenen altes):

![](attachments/41522228/41522274.png)

  

En cas que veiem que hi ha aquests problemes, haurem de reiniciar el server que tingui connexions enganxades.

Si amb el reinici no es resol, podria haver un problema a nivell de BBDD. Comentar internement o si estem en guàrdia contactar amb NTT.

  

Reinici del BEA8

  

**JIRA on deixar registre del reinici**

Per deixar registre d'aquest reinici, obrirem un JIRA amb aquesta plantilla: [http://10.120.1.242:8081/veureTicket/63494b2140beb9d3f41b51b3](http://10.120.1.242:8081/veureTicket/63494b2140beb9d3f41b51b3)

  

Accedir a la ruta dels scripts de reinici:

**Ruta per reiniciar**

cd /apps/bea/beaplat/user\_projects/domains/PCIDomain

  

En primera instància, s'haurà d'aturar i aixecar l'**ADMIN**:

**Reinici**

./BEA\_STOP\_ADMIN.sh
./BEA\_START\_ADMIN.sh

  

Després, es podran aturar i encendre els nodes, de manera ordenada i esperant a que les accions finalitzin:

  

*   **Node 1**:
    
    **Reinici**
    
     ./BEA\_STOP\_NODO1.sh
    ./BEA\_START\_NODO1.sh
    
*   **Node 2**:
    
    **Reinici**
    
    ./BEA\_STOP\_NODO2.sh
    ./BEA\_START\_NODO2.sh
    
*   I així amb tots els nodes.

Connectivitat amb BDSEU
=======================

El Back tracta les peticions de BDSeu.

Connexió al servidor

Servidors 
==========

*   Node1: cl-valid-back01**→ 10.123.5.198**
    
*   Node2: cl-valid-back02**→ 10.123.5.199**
*   User: **tomcat6**

*   No hi ha entorn de PRE pel VALid Aïllat.
    

Revisió del BACK

Per revisar errors podem mirar els logs d'aplicació de la part del Back (BDSEU):

*   /mnt/aoc/APP/logs/SC-BDSeu\_node?.log

Si veiem que es repeteix molt un error, que un node té molts més errors que l'altre, que es printa un error quan intentem fer el circuit, etc. Podem valorar el reinici.

Revisió dels PROBE
==================

*   PROBE node 1: [http://10.123.5.198:8082/probe/](http://10.123.5.198:8082/probe/)
*   PROBE node 2:  [http://10.123.5.199:8082/probe/](http://10.123.5.199:8082/probe/)

Comprovar que les aplicacions estiguin **RUNNING:**

**![](attachments/41522235/41522247.png)**

 Revisar que els Thread Pool són inferiors als Max. Thread:

**![](attachments/41522235/41522248.png)![](attachments/41522235/41522249.png)**

Si els Threads superen el màxim establert, caldrà reiniciar el node.

  

  

  

Reinici del BACK

  

**JIRA on deixar registre del reinici**

Per deixar registre d'aquest reinici, obrirem un JIRA amb aquesta plantilla: [http://10.120.1.242:8081/veureTicket/63494b2140beb9d3f41b51b3](http://10.120.1.242:8081/veureTicket/63494b2140beb9d3f41b51b3)

**Aturar el tomcat**

sudo systemctl stop tomcat6

  

Comprovar que el Tomcat estigui realment aturat:

**Revisar el procés**

ps -aux | grep -i tomcat

Per eliminar el procés (en cas que amb l'stop no s'elimini) es pot executar un kill on **XXXX** serà l'**id** del **procés**:

**Revisar el procés**

kill -9 "XXXX"

Un cop el tomcat estigui aturat, es podrà aixecar:

**Revisar el procés**

/etc/init.d/tomcat6 start && tail -f /apps/tomcat6/logs/catalina.out

Frontals
========

En els FRONTALS tan sols hi ha un apache que rep les peticions i balanceja contra els BROKERS. És extremadament estrany que falli el VALID per culpa del frontal.

Connexió al servidor

Servidors 
==========

*   Node1: cl-valid-web01**→ 10.123.5.194**
    
*   Node2: cl-valid-web02**→ 10.123.5.195**
*   Node3: cl-valid-web03**→ 10.123.5.211**
*   Node4: cl-valid-web04****→ 10.123.5.212  
      
    ****
    
    FRONTALS PÚBLICS
    
    **\- ALERTA: NOSALTRES NO TENIM ACCÉS A AQUESTES MÀQUINES, SI VEIEM QUE SALTEN EN OP5, CAL CREAR UN TICKET A NTT**, més info en la FAQ: [Com obrir un ticket NTT OLD](https://confluence.aoc.cat/display/SII/Com+obrir+un+ticket+NTT+OLD)
    
    *   Node5: cl-valid-web05**→ 10.123.7.130**
    *   Node6: cl-valid-web06**→ 10.123.7.131**
    *   Node7: cl-valid-web07**→ 10.123.7.132**
    *   Node8: cl-valid-web08**→ 10.123.7.133**
    
*   User: **aoc**

*   No hi ha entorn de PRE pel VALid Aïllat
    

Revisió del FRONT

Revisió dels logs
=================

Per revisar errors podem mirar els logs:

*   identitats.aoc.cat-ssl-access.20200217.log

Si veiem que es repeteix molt un error, que un node té molts més errors que l'altre, que es printa un error quan intentem fer el circuit, etc. Podem valorar el reinici.

Tot i que al ser els access log, _tampoc ens donen massa informació_.

  

Revisió del procés Apache
=========================

Per comprovar si el servei està aixecat podem executar la següent comanda:

**Estat de l'Apache**

service httpd status

Si ala resposta veiem un missatge tipus:

`httpd (pid  xxxxx) is [running...](https://intranet.aoc.cat/display/SII/running...)`

El servei estarà funcionant.

  

Sondes Apache
=============

Tenim les següents sondes:

Node 1: [http://10.123.5.194/server-status](http://10.123.5.194/server-status)

Node 2: [http://10.123.5.195/server-status](http://10.123.5.194/server-status)

Node 3: [http://10.123.5.211/server-status](http://10.123.5.194/server-status)

Node 4: [http://10.123.5.211/server-status](http://10.123.5.194/server-status)

Node 5: [http://10.123.7.130/server-status](http://10.123.5.194/server-status)

Node 6: [http://](http://10.123.5.194/server-status)[10.123.7.13](http://10.123.5.194/server-status)1[/server-status](http://10.123.5.194/server-status)

Node 7: [http://](http://10.123.5.194/server-status)[10.123.7.13](http://10.123.5.194/server-status)2[/server-status](http://10.123.5.194/server-status)

Node 8: [http://](http://10.123.5.194/server-status)[10.123.7.13](http://10.123.5.194/server-status)3[/server-status](http://10.123.5.194/server-status)

  

Obtindrem una informació semblant a això:

![](attachments/41522242/41522279.png)

Els puntets són Threads lliures.

Si no hi ha Threads lliures → Segurament el Broker tingui problemes i les peticions s'estiguin quedant enganxades a l'apache esperant.

  

Reinici del FRONT

  

  

Revisions extra:
----------------

Revisions addicionals del servei

En cas que estigui fallant els registres a l'i**dCat mòbil** caldrà que revisem si prové de tercers com catSalut, DGP, etc.

Els tercers que poden influir a l'hora de realitzar un registre a idCAT Mobil:

*   Cat Salut: Per consultar la identitat del DNI que s’informa en el formulari
*   DGP: Per comprovar el número de Targeta Sanitaria (TSI)
*   BDSEU: Per consultar i si s’escau associar les dades de l’alta

**En cas que alguna petició dirigida a aquestes entitats retorni error l'alta no es realitzarà.**

Per identificar els errors, podem revisar logs:

Entitat

Plataforma

Ruta

Contacte

CatSalut

SOA ( aoc-l-soaX-pro)

/aoc/apps/IOP/logs/MC-RCA\_IOPNODO?\_SOA.log

[sau.tic@gencat.cat](mailto:sau.tic@gencat.cat)

DGP

SOA ( aoc-l-soaX-pro)

/aoc/apps/IOP/logs/MC-DGP\_IOPNODO?\_SOA.log

[https://ssweb.seap.minhap.es/ayuda/consulta/CAID](https://ssweb.seap.minhap.es/ayuda/consulta/CAID)

BDSEU

SOA ( aoc-l-soaX-pro)

/aoc/apps/APP/logs/MSC-BDSEU\_APPNODO1\_SOA.log

[sau.tic@gencat.cat](mailto:sau.tic@gencat.cat)

**Revisar les petisions a la MSC/MTI**

BDSEU: MSC

![](attachments/36340752/36340759.png?effects=drop-shadow)

**DGP MTI**:

Veure consums de SCSP\_DGP i DGP\_IDENTITAT

![](attachments/36340752/36340760.png?effects=drop-shadow)

**CATSalut MTI:**

![](attachments/36340752/36340761.png?effects=drop-shadow)

En el cas d'identificar algun error per aquestes entitats haurem d'obrir un tiquet a l'entitat en qüestió.

Haurem de fer un comunicat indicant que estan havent-hi problemes amb el registre de l'idCat Mòbil.

  

  

Revisió d'Altes a l'idCAT Mòbil
===============================

En el procés d’alta d’un idCATMòbil intervenen varis tercers:

1)      Primer es fa una consulta a la modalitat DGP **IDENTITAT\_DADES** per comprovar que les dades de la persona física són correctes. Pot haver fallat i es veu en l’evidència tipus 5. Si falla se li explica que ha estat error puntual del tercer prestador (**DGP**)

2)      Fa una consulta al Servei **RCA\_VERIFICACIO\_TSI** (evidència tipus 4) per comprovar que el número de targeta Sanitària existeix i coincideix amb aquella persona física. Si no està ben posada o no existeix se li explica o que no ho ha posat bé en el formulari o si ha fallat el servei prestador tercer (CATSalut)

3)      Fa una consulta la BDSeu (**BDSEU\_CONSULTAR\_DADES**) per veure si ja estava donada d’alta prèviament (evidència tipus 2)

4)      Finalment s’intenta l’alta a la BDSeu (evidència tipus 3) amb la modalitat **BSEU\_ASSOCIAR\_DADES**

  

Revisar un procés d'alta a idCAT Mòbil

**![](attachments/36340752/64981057.png)**

  

**Incidència tipus 1**: usuari/a ha esgotat els 10 intents de donar-se d’alta telemàticament al idCATMòbil:

*   Anar a BBDD del Broker
*   Consultar a la taula IDCATSMS\_REGISTRE pel NIF que ens indiquin, en la columna DOCUMENT
*   Modificar totes les entrades que surtin, posant el valor del NIF seguit de \_ (per tant NIF\_) (així és com si no s’hagués fet mai cap intent amb el NIF original)
*   Commit

  

**Incidència tipus 2**: usuari s’ha donat d’alta telemàticament però no ha pogut descarregar el rebut PDF conforme s’ha donat d’alta: 

*   Anar a BBDD del Broker
*   Consultar a la taula IDCATSMS\_REGISTRE pel NIF que ens indiquin, en la columna DOCUMENT
*   A partir del ID de la fila (retornarà varies rows, però solament val la que el camp data\_alta estigui omplert) on es vegi que la columna de data\_alta estigui omplerta amb una data correcte, fer una select:
    
    select \* from IDCATMOBIL.IDCATSMS\_EVIDENCIA where ID\_IDCATSMS\_REGISTRE=XXXXX
    
    ![](attachments/36340752/64981056.png)
    
*   Del resultat mirar el que tingui el camp tipus=3, per agafar el tag <rebut> en BASE64, posar-lo en un notepad++ i decodificar-lo a binari per passar-li amb extensió .pdf en el tiquet a l’usuari  
    ![](attachments/36340752/64981055.png)
    
*   Si no existeix aquest tag de <rebut> (a vegades si PSIS ha fallat i no ha pogut signar, o el livecycle no ha pogut generar el PDF), se li diu que el procés de PDF va fallar i no es va generar PDF. Que a primers de Juliol li podrem generar de nou el PDF però que poden utilitzar les seves dades d’idCATMòbil sense problema perquè l’alta a anat bé.
    

  

**Incidència tipus 3**: han fet l’alta de forma presencial i no s’ha generat el rebut PDF correctament

*   Doncs bé, aquí no s’ha de mirar a nivell de BBDD, sinó que s’ha de saber l’hora exacta de l’alta i mirar l’assentament que es va fer amb l’aplicació IDCATSMS:  
    ![](attachments/36340752/64981054.png)
*   D’aquí fer clik en aquell ID per revisar la lupa que ha generat l’assentament. Allà trobarem el rebut:  
    ![](attachments/36340752/64981053.png)  
    per agafar el tag <rebut> en BASE64, posar-lo en un notepad++ i decodificar-lo a binari per passar-li amb extensió .pdf en el tiquet a l’usuari
*   Si no existeix aquest tag de <rebut> (a vegades si PSIS ha fallat i no ha pogut signar, o el livecycle no ha pogut generar el PDF), se li diu que el procés de PDF va fallar i no es va generar PDF. Que a primers de Juliol li podrem generar de nou el PDF però que poden utilitzar les seves dades d’idCATMòbil sense problema perquè l’alta a anat bé.

  

**Incidència tipus 4**: ha fallat el procés d’alta telemàtic i volen saber el perquè

*   Anar a BBDD del Broker
*   Consultar a la taula IDCATSMS\_REGISTRE pel NIF que ens indiquin, en la columna DOCUMENT
*   A partir del ID de la fila (retornarà varies rows, però solament val la que el camp data\_alta estigui omplert) on es vegi que la columna de data\_alta estigui omplerta amb una data correcte, fer una select:
    
    select \* from IDCATMOBIL.IDCATSMS\_EVIDENCIA where ID\_IDCATSMS\_REGISTRE=XXXXX
    
    ![](attachments/36340752/64981052.png)
    

  

  

  

  

  

  

Per quin node del BROKER estem accedint?

Per saber el node al qual estem accedint haurem d'anar a la plana del VÀLid (MC o NX) i obrir les opcions del desenvolupador i accedir a:

**Application > Cookies > [https://identitats.aoc.cat](https://identitats.aoc.cat) > JSESSIONID**  
![](attachments/36340625/64979463.png)

En aquest cas, podem veure que hem accedit pel node 2.

Si volem accedir per un altre node, haurem d'esborrar la cookie i prémer F5

Validació del servei:
---------------------

Splunk: [http://10.120.1.235/en-US/app/SOA/validaillat](http://10.120.1.235/en-US/app/SOA/validaillat)

Circuit: [https://identitats.aoc.cat/o/oauth2/auth?response\_type=code&client\_id=enotum-pro.aoc.cat&redirect\_uri=https://usuari.enotum.cat/webCiutada/valid/redirect&scope=autenticacio\_usuari&state=&access\_type=online&approval\_prompt=auto](https://identitats.aoc.cat/o/oauth2/auth?response_type=code&client_id=enotum-pro.aoc.cat&redirect_uri=https://usuari.enotum.cat/webCiutada/valid/redirect&scope=autenticacio_usuari&state=&access_type=online&approval_prompt=auto)

**Fer login amb certificat o paraula de pas**

Splunk: [http://10.123.4.52:8000/en-US/app/search/frontals\_de\_valid\_nx](http://10.123.4.52:8000/en-US/app/search/frontals_de_valid_nx)

Circuit: [https://identitats-dr.aoc.cat/o/oauth2/auth?response\_type=code&client\_id=enotum-pro.aoc.cat&redirect\_uri=https://usuari.enotum.cat/webCiutada/valid/redirect&scope=autenticacio\_usuari&state=&access\_type=online&approval\_prompt=auto](https://identitats-dr.aoc.cat/o/oauth2/auth?response_type=code&client_id=enotum-pro.aoc.cat&redirect_uri=https://usuari.enotum.cat/webCiutada/valid/redirect&scope=autenticacio_usuari&state=&access_type=online&approval_prompt=auto)

**Fer login amb certificat o paraula de pas**

  

### TOMCAT8

  

Reinici del Tomcat8

  

**Aturar el tomcat**

sudo systemctl stop tomcat8

  

Comprovar que el tomcat estigui aturat:

**Revisar el procés**

ps -aux | grep -i tomcat

  

*   Per eliminar el procés (en cas que amb l'stop no s'elimini) es pot executar un kill on **XXXX** serà l'**id** del **procés**:
    
    **Matar el procés (només si cal)**
    
    kill -9 "XXXX"
    
*   Si la comanda no funciona després de 3 o 4 intents:
    
    **Matar el procés forçant-lo (només si cal)**
    
    kill -9 "XXXX"
    

  

Un cop el tomcat estigui aturat, es podrà aixecar:

**Aixecar el Tomcat**

sudo systemctl start tomcat8 && tail -f /apps/tomcat8/logs/catalina.out

Feedback

Attachments:
------------

![](images/icons/bullet_blue.gif) [image-2022-02-02-13-05-28-291.png](attachments/64980000/64980004.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:06

[Atlassian](http://www.atlassian.com/)