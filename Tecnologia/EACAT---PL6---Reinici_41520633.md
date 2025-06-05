Suport Tècnic : EACAT - PL6 - Reinici  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [04 - Tècnica de sistemes + 24x7 + Padró](26313202.html)
4.  [Plataformes](Plataformes_41520520.html)
5.  [EACAT - PL6](EACAT---PL6_41520630.html)

Suport Tècnic : EACAT - PL6 - Reinici
=====================================

Created by Unknown User (otecobernal), last modified by Unknown User (otecajgalasso) on 28 November 2023

**JIRA on deixar registre del reinici**

Per deixar registre d'aquest reinici, obrirem un JIRA amb aquesta plantilla: 

PRE: [http://10.120.1.242:8081/veureTicket/6349540440beb9d3f41b51c7](http://10.120.1.242:8081/veureTicket/6349540440beb9d3f41b51c7)

PRO: [http://10.120.1.242:8081/veureTicket/63494d1140beb9d3f41b51b6](http://10.120.1.242:8081/veureTicket/63494d1140beb9d3f41b51b6)

**Aturar el Tomcat**

/etc/init.d/tomcat7 stop

**Eliminar temporals**

rm -rf /apps/tomcat/work/\*
rm -rf /apps/tomcat/temp/\*

  
Comprovar que el tomcat estigui aturat:

**Revisar el procés**

ps -aux | grep -i tomcat

  

*   Per eliminar el procés (en cas que amb l'stop no s'elimini) es pot executar un kill on **XXXX** serà l'**id** del **procés**:
    
    **Matar el procés (només si cal)**
    
    kill "XXXX"
    
*   Si la comanda no funciona després de 3 o 4 intents:
    
    **Matar el procés forçant-lo (només si cal)**
    
    kill -9 "XXXX"
    

  

Un cop el tomcat estigui aturat, es podrà aixecar:

Abans d'aixecar el tomcat

Haurem de renombrar l'arxiu de logs posant la data actual al final del nom. Exemple: catalina.out.20230405

Per fer-ho.

**Netejar log**

mv /apps/tomcat/logs/catalina.out /apps/tomcat/logs/catalina\_XXXXXdataXXXXX.out

  

**Aixecar el Tomcat**

/etc/init.d/tomcat7 start && tail -f /apps/tomcat/logs/catalina.out

i esperem que els logs del server.log ens mostrin com el tomcat s'ha aixecat:

  

Unable to load memory clustered jobs from master in 10 seconds, you might need to increase value set to "clusterable.advice.call.master.timeout"

The Scheduler has been shutdown --> En aquest cas haurem de reiniciar el segon node i esperar que recuperi la connexió.

  

**log complet**

14:24:48,008 ERROR \[localhost-startStop-1\]\[ClusterSchedulerEngine:604\] Unable to load memory clustered jobs from master in 10 seconds, you might need to increase value set to "clusterable.advice.call.master.timeout", will retry again  
java.util.concurrent.ExecutionException: java.lang.reflect.InvocationTargetException  
        at com.liferay.portal.cluster.ClusterMasterExecutorImpl$RemoteFuture.get(ClusterMasterExecutorImpl.java:309)  
        at com.liferay.portal.scheduler.ClusterSchedulerEngine.initMemoryClusteredJobs(ClusterSchedulerEngine.java:566)  
        at com.liferay.portal.scheduler.ClusterSchedulerEngine.start(ClusterSchedulerEngine.java:396)  
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)  
        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)  
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)  
        at java.lang.reflect.Method.invoke(Method.java:606)  
        at com.liferay.portal.spring.aop.ServiceBeanMethodInvocation.proceed(ServiceBeanMethodInvocation.java:115)  
        at com.liferay.portal.spring.transaction.TransactionInterceptor.invoke(TransactionInterceptor.java:48)  
        at com.liferay.portal.spring.aop.ServiceBeanMethodInvocation.proceed(ServiceBeanMethodInvocation.java:111)  
        at com.liferay.portal.spring.aop.ChainableMethodAdvice.invoke(ChainableMethodAdvice.java:56)  
        at com.liferay.portal.spring.aop.ServiceBeanMethodInvocation.proceed(ServiceBeanMethodInvocation.java:111)  
        at com.liferay.portal.spring.aop.ChainableMethodAdvice.invoke(ChainableMethodAdvice.java:56)  
        at com.liferay.portal.spring.aop.ServiceBeanMethodInvocation.proceed(ServiceBeanMethodInvocation.java:111)  
        at com.liferay.portal.spring.aop.ChainableMethodAdvice.invoke(ChainableMethodAdvice.java:56)  
        at com.liferay.portal.spring.aop.ServiceBeanMethodInvocation.proceed(ServiceBeanMethodInvocation.java:111)  
        at com.liferay.portal.cache.ThreadLocalCacheAdvice.invoke(ThreadLocalCacheAdvice.java:51)  
        at com.liferay.portal.spring.aop.ServiceBeanMethodInvocation.proceed(ServiceBeanMethodInvocation.java:111)  
        at com.liferay.portal.spring.aop.ChainableMethodAdvice.invoke(ChainableMethodAdvice.java:56)  
        at com.liferay.portal.spring.aop.ServiceBeanMethodInvocation.proceed(ServiceBeanMethodInvocation.java:111)  
        at com.liferay.portal.spring.aop.ChainableMethodAdvice.invoke(ChainableMethodAdvice.java:56)  
        at com.liferay.portal.spring.aop.ServiceBeanMethodInvocation.proceed(ServiceBeanMethodInvocation.java:111)  
        at com.liferay.portal.spring.aop.ChainableMethodAdvice.invoke(ChainableMethodAdvice.java:56)  
        at com.liferay.portal.spring.aop.ServiceBeanMethodInvocation.proceed(ServiceBeanMethodInvocation.java:111)  
        at com.liferay.portal.spring.aop.ChainableMethodAdvice.invoke(ChainableMethodAdvice.java:56)  
        at com.liferay.portal.spring.aop.ServiceBeanMethodInvocation.proceed(ServiceBeanMethodInvocation.java:111)  
        at com.liferay.portal.spring.aop.ChainableMethodAdvice.invoke(ChainableMethodAdvice.java:56)  
        at com.liferay.portal.spring.aop.ServiceBeanMethodInvocation.proceed(ServiceBeanMethodInvocation.java:111)  
        at com.liferay.portal.spring.aop.ChainableMethodAdvice.invoke(ChainableMethodAdvice.java:56)  
        at com.liferay.portal.spring.aop.ServiceBeanMethodInvocation.proceed(ServiceBeanMethodInvocation.java:111)  
        at com.liferay.portal.spring.aop.ServiceBeanAopProxy.invoke(ServiceBeanAopProxy.java:175)  
        at com.sun.proxy.$Proxy285.start(Unknown Source)  
        at com.liferay.portal.scheduler.SchedulerEngineHelperImpl.start(SchedulerEngineHelperImpl.java:691)  
        at com.liferay.portal.kernel.scheduler.SchedulerEngineHelperUtil.start(SchedulerEngineHelperUtil.java:307)  
        at com.liferay.portal.kernel.scheduler.SchedulerLifecycle.doPortalInit(SchedulerLifecycle.java:30)  
        at com.liferay.portal.kernel.util.BasePortalLifecycle.portalInit(BasePortalLifecycle.java:44)  
        at com.liferay.portal.kernel.util.PortalLifecycleUtil.flushInits(PortalLifecycleUtil.java:50)  
        at com.liferay.portal.servlet.MainServlet.initPlugins(MainServlet.java:870)  
        at com.liferay.portal.servlet.MainServlet.init(MainServlet.java:405)  
        at javax.servlet.GenericServlet.init(GenericServlet.java:160)  
        at org.apache.catalina.core.StandardWrapper.initServlet(StandardWrapper.java:1280)  
        at org.apache.catalina.core.StandardWrapper.loadServlet(StandardWrapper.java:1193)  
        at org.apache.catalina.core.StandardWrapper.load(StandardWrapper.java:1088)  
        at org.apache.catalina.core.StandardContext.loadOnStartup(StandardContext.java:5176)  
        at org.apache.catalina.core.StandardContext.startInternal(StandardContext.java:5460)  
        at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)  
        at org.apache.catalina.core.ContainerBase.addChildInternal(ContainerBase.java:901)  
        at org.apache.catalina.core.ContainerBase.addChild(ContainerBase.java:877)  
        at org.apache.catalina.core.StandardHost.addChild(StandardHost.java:633)  
        at org.apache.catalina.startup.HostConfig.deployDirectory(HostConfig.java:1113)  
        at org.apache.catalina.startup.HostConfig$DeployDirectory.run(HostConfig.java:1671)  
        at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:471)  
        at java.util.concurrent.FutureTask.run(FutureTask.java:262)  
        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)  
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)  
        at java.lang.Thread.run(Thread.java:745)  
Caused by: java.lang.reflect.InvocationTargetException  
        at sun.reflect.GeneratedMethodAccessor2280.invoke(Unknown Source)  
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)  
        at java.lang.reflect.Method.invoke(Method.java:606)  
        at com.liferay.portal.kernel.util.MethodHandler.invoke(MethodHandler.java:61)  
        at com.liferay.portal.cluster.ClusterRequestReceiver.processClusterRequest(ClusterRequestReceiver.java:208)  
        at com.liferay.portal.cluster.ClusterRequestReceiver.doReceive(ClusterRequestReceiver.java:70)  
        at com.liferay.portal.cluster.BaseReceiver.receive(BaseReceiver.java:70)  
        at org.jgroups.JChannel.invokeCallback(JChannel.java:749)  
        at org.jgroups.JChannel.up(JChannel.java:710)  
        at org.jgroups.stack.ProtocolStack.up(ProtocolStack.java:1025)  
        at org.jgroups.protocols.RSVP.up(RSVP.java:188)  
        at org.jgroups.protocols.FRAG2.up(FRAG2.java:181)  
        at org.jgroups.protocols.FlowControl.up(FlowControl.java:418)  
        at org.jgroups.protocols.FlowControl.up(FlowControl.java:400)  
        at org.jgroups.protocols.pbcast.GMS.up(GMS.java:896)  
        at org.jgroups.protocols.pbcast.STABLE.up(STABLE.java:245)  
        at org.jgroups.protocols.UNICAST2.handleDataReceived(UNICAST2.java:797)  
        at org.jgroups.protocols.UNICAST2.up(UNICAST2.java:420)  
        at org.jgroups.protocols.pbcast.NAKACK2.up(NAKACK2.java:606)  
        at org.jgroups.protocols.VERIFY\_SUSPECT.up(VERIFY\_SUSPECT.java:147)  
        at org.jgroups.protocols.FD\_ALL.up(FD\_ALL.java:187)  
        at org.jgroups.protocols.FD\_SOCK.up(FD\_SOCK.java:288)  
        at org.jgroups.protocols.MERGE3.up(MERGE3.java:290)  
        at org.jgroups.protocols.Discovery.up(Discovery.java:359)  
        at org.jgroups.protocols.TP.passMessageUp(TP.java:1263)  
        at org.jgroups.protocols.TP$IncomingPacket.handleMyMessage(TP.java:1825)  
        at org.jgroups.protocols.TP$IncomingPacket.run(TP.java:1793)  
        ... 3 more  
Caused by: com.liferay.portal.kernel.scheduler.SchedulerException: Unable to get jobs  
        at com.liferay.portal.scheduler.quartz.QuartzSchedulerEngine.getScheduledJobs(QuartzSchedulerEngine.java:225)  
        at sun.reflect.GeneratedMethodAccessor2279.invoke(Unknown Source)  
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)  
        at java.lang.reflect.Method.invoke(Method.java:606)  
        at com.liferay.portal.kernel.messaging.proxy.ProxyRequest.execute(ProxyRequest.java:85)  
        at com.liferay.portal.kernel.messaging.proxy.ProxyMessageListener.receive(ProxyMessageListener.java:51)  
        at com.liferay.portal.kernel.messaging.InvokerMessageListener.receive(InvokerMessageListener.java:72)  
        at com.liferay.portal.kernel.messaging.sender.DirectSynchronousMessageSender.send(DirectSynchronousMessageSender.java:62)  
        at com.liferay.portal.kernel.messaging.sender.DefaultSingleDestinationSynchronousMessageSender.send(DefaultSingleDestinationSynchronousMessageSender.java:42)  
        at com.liferay.portal.kernel.messaging.proxy.BaseProxyBean.synchronousSend(BaseProxyBean.java:51)  
        at com.liferay.portal.messaging.proxy.MessagingProxyInvocationHandler.invoke(MessagingProxyInvocationHandler.java:47)  
        at com.sun.proxy.$Proxy283.getScheduledJobs(Unknown Source)  
        at com.liferay.portal.scheduler.ClusterSchedulerEngine.getScheduledJobs(ClusterSchedulerEngine.java:168)  
        at sun.reflect.GeneratedMethodAccessor2279.invoke(Unknown Source)  
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)  
        at java.lang.reflect.Method.invoke(Method.java:606)  
        at com.liferay.portal.spring.aop.ServiceBeanMethodInvocation.proceed(ServiceBeanMethodInvocation.java:115)  
        at com.liferay.portal.spring.transaction.TransactionInterceptor.invoke(TransactionInterceptor.java:48)  
        at com.liferay.portal.spring.aop.ServiceBeanMethodInvocation.proceed(ServiceBeanMethodInvocation.java:111)  
        at com.liferay.portal.spring.aop.ChainableMethodAdvice.invoke(ChainableMethodAdvice.java:56)  
        at com.liferay.portal.spring.aop.ServiceBeanMethodInvocation.proceed(ServiceBeanMethodInvocation.java:111)  
        at com.liferay.portal.spring.aop.ServiceBeanAopProxy.invoke(ServiceBeanAopProxy.java:175)  
        at com.sun.proxy.$Proxy285.getScheduledJobs(Unknown Source)  
        at com.liferay.portal.scheduler.SchedulerEngineHelperImpl.getScheduledJobs(SchedulerEngineHelperImpl.java:519)  
        at com.liferay.portal.kernel.scheduler.SchedulerEngineHelperUtil.getScheduledJobs(SchedulerEngineHelperUtil.java:206)  
        ... 30 more  
Caused by: org.quartz.SchedulerException: The Scheduler has been shutdown.  
        at org.quartz.core.QuartzScheduler.validateState(QuartzScheduler.java:749)  
        at org.quartz.core.QuartzScheduler.getJobGroupNames(QuartzScheduler.java:1392)  
        at org.quartz.impl.StdScheduler.getJobGroupNames(StdScheduler.java:442)  
        at com.liferay.portal.scheduler.quartz.QuartzSchedulerEngine.getScheduledJobs(QuartzSchedulerEngine.java:205)  
        ... 54 more

  

Document generated by Confluence on 02 June 2025 11:15

[Atlassian](http://www.atlassian.com/)