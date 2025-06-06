Projectes : Schedulers  

1.  [Projectes](index.md)
2.  [PSA](PSA_24216342.md)
3.  [PSA - WIKI](PSA---WIKI_24216306.md)
4.  [Documentació Desenvolupament i Operacions](24216308.md)

Projectes : Schedulers
======================

Created by Áurea Alcaide on 29 julio 2019

**Controlador dels schedulers: _HASingleton with Barrier_**
-----------------------------------------------------------

Els schedulers de PSA estan deployats en mode HASingleton fent servir un controlador barrera (Barrier Controller). És a dir, estan deployats en ambdós nodes de PSA, però el controlador només s'executa des del node master. Si el node master cau, aleshores s'inicia a l'altre node, que passa a ser el master.

Al codi font per la generació de l'ear de PSA, la configuració dels schedulers la tenim a l'arxiu:

/psa-application/ear/src/main/resources/ **scheduler-service.xml**:

<server>
    <mbean code="org.jboss.varia.scheduler.Scheduler" 
        name="psa:service=Scheduler">

        ${scheduler.cluster.deploy}

        <attribute name="StartAtStartup">${scheduler.start.at.startup}</attribute>
        <attribute name="SchedulableClass">
            com.sadiel.catcert.psa.schedulers.StartUpSingletonScheduler
        </attribute>
        <attribute name="InitialStartDate">${scheduler.initial.start.date}</attribute>
        <attribute name="SchedulePeriod">${scheduler.period}</attribute>
        <attribute name="InitialRepetitions">${scheduler.initial.repetitions}</attribute>
        <depends>
            <mbean code="javax.management.timer.Timer" name="jboss:service=Timer" />
        </depends>
    </mbean>
</server>

Aquest XML es nodreix de:

/psa-application/ear/src/main/filters/ **filter-scheduler-true.properties**:

scheduler.module=<module><service>META-INF/scheduler-service.xml</service></module>
scheduler.start.at.startup=true
# Scheduler Period in ms (10800000=3h / 3600000=1h)
scheduler.period=3600000
scheduler.initial.start.date=NOW
scheduler.initial.repetitions=-1

Per tant:

<server>
    <mbean code="org.jboss.varia.scheduler.Scheduler" 
        name="psa:service=Scheduler">

        <depends>jboss.ha:service=HASingletonDeployer,type=Barrier</depends>

        <attribute name="StartAtStartup">true</attribute>
        <attribute name="SchedulableClass">
            com.sadiel.catcert.psa.schedulers.StartUpSingletonScheduler
        </attribute>
        <attribute name="InitialStartDate">NOW</attribute>
        <attribute name="SchedulePeriod">3600000</attribute>
        <attribute name="InitialRepetitions">-1</attribute>
        <depends>
            <mbean code="javax.management.timer.Timer" name="jboss:service=Timer" />
        </depends>
    </mbean>
</server>

Segons aquesta configuració, **el controlador de l'execució dels schedulers s'executa en deployar el servei** (és a dir, arrencar el JBoss), **i ho fa cada hora** (3600000 mseg) de manera indefinida.

**Base de dades**
-----------------

El controlador decideix doncs cada 3 hores des del moment d'arrencada del JBoss, quins schedulers s'han d'executar. Aquesta decisió es basa en la informació que tenim a la taula de base de dades **SCHEDULER\_T**:

ID        LOGICNAME                                PERIOD           LASTEXEC             STATUS      ACTIVE
  ----- ------------------------------------------- --------- ---------------------------- ---------  ----------
   1     ejb/OpenProcedureContextSchedulerBean        86400000 28/12/16 00:11:55,742607000      1           0 
   2     ejb/ClosedProcedureContextSchedulerBean      86400000 27/12/16 23:00:00,000000000      1           0 
   3     ejb/AuditCleanerSchedulerBean              2592000000 02/12/16 05:00:00,637201000      1           0 
   4     ejb/CertificateValidatorSchedulerBean        21600000 28/12/16 06:07:43,429748000      1           0 
   5     ejb/SignaturePolicySchedulerBean             21600000 28/12/16 06:07:35,469505000      1           0 
   6     ejb/ActiveSessionSchedulerBean               21600000 28/12/16 06:07:35,582986000      1           0 
   7     ejb/SignedAuditSchedulerBean                 86400000 28/12/16 03:00:00,000000000      1           0 
   8     ejb/AuthorizationSchedulerBean               21600000 28/12/16 06:07:35,505186000      1           0 
   9     ejb/PSISValidationTicketSchedulerBean        21600000 28/12/16 06:07:35,796416000      1           0 

El significat de cada columna és:

*   **LOGICNAME**: Nom del bean de l'scheduler.
*   **PERIOD**: Període d'execució de l'scheduler en mil·lisegons (p.ex.: 86400000 = 24 hores; 2592000000 = 30 dies).
*   **LASTEXEC**: Data de finalització de la darrera execució de l'scheduler.
*   **STATUS**: 1: actiu / 0: inactiu (no s'executa)
*   **ACTIVE**: 1: l'scheduler està en execució ara / 0: l'scheduler no s'està executant ara

_**NOTA**: Els schedulers ClosedProcedureContextScheduler i SignedAuditScheduler poden provocar problemes de bloqueigs en les taules del repositori. Per tant, com a solució provisional, hem activat un trigger que modifica la data final d'execució per a que l'hora sigui sempre en període nocturn. Així, quan el controlador llenci aquests schedulers, ho farà sempre per la nit. El trigger és: **SCHEDULER\_LASTEXEC**_

**JMS**
-------

El controlador de l'execució dels schedulers envía missatges per JMS als nodes de PSA per tal que executing els schedulers. La manera com ho fa és enviant un missatge per cada scheduler a cada node: primer scheduler a executar a un node, i el següent a l'altre, i així successivament. D'aquesta manera reparteix la feina entre els nodes.

La configuració de la cua de PSA està al fitxer següent del JBoss:

/opt/apps/jboss/server/psa/deploy-hasingleton/jms/ **jbossmq-destinations-service.xml**

<server>
  <!-- PSA Queue -->
  <mbean code="org.jboss.mq.server.jmx.Queue" name="jboss.mq.destination:service=Queue,name=psaQueue">
    <depends optional-attribute-name="DestinationManager">jboss.mq:service=DestinationManager</depends>
  </mbean>
</server>

La configuráció de JMS està al fitxer següent del JBoss:

/opt/apps/jboss/server/psa/conf/ **standardjboss.xml**

    <invoker-proxy-binding>
      <name>singleton-message-driven-bean</name>
      <invoker-mbean>default</invoker-mbean>
      <proxy-factory>org.jboss.ejb.plugins.jms.JMSContainerInvoker</proxy-factory>
      <proxy-factory-config>
        <JMSProviderAdapterJNDI>DefaultJMSProvider</JMSProviderAdapterJNDI>
        <ServerSessionPoolFactoryJNDI>StdJMSPool</ServerSessionPoolFactoryJNDI>
        <CreateJBossMQDestination>true</CreateJBossMQDestination>
        <!-- WARN: Don't set this to zero until a bug in the pooled executor is fixed -->
        <MinimumSize>1</MinimumSize>
        <MaximumSize>1</MaximumSize>
        <KeepAliveMillis>30000</KeepAliveMillis>
        <MaxMessages>1</MaxMessages>
        <MDBConfig>
          <ReconnectIntervalSec>10</ReconnectIntervalSec>
          <DLQConfig>
            <DestinationQueue>queue/DLQ</DestinationQueue>
            <MaxTimesRedelivered>10</MaxTimesRedelivered>
            <TimeToLive>0</TimeToLive>
          </DLQConfig>
        </MDBConfig>
      </proxy-factory-config>
    </invoker-proxy-binding>

  

[![](rest/documentConversion/latest/conversion/thumbnail/24216435/1)](/download/attachments/24216434/06-0435-DS-0001-06-Planificadors_PSA.pdf?version=1&modificationDate=1564402027184&api=v2)

  

  

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [06-0435-DS-0001-06-Planificadors\_PSA.pdf](attachments/24216434/24216435.pdf) (application/pdf)  

Document generated by Confluence on 07 junio 2025 00:00

[Atlassian](http://www.atlassian.com/)