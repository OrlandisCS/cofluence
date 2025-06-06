Suport Tècnic : SIR 2.0 - FLUX DEL SERVEI - ERRORS - Error en accedir al SIR a partir del REGISTRE  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [02 - FAQ's serveis](26313393.md)
4.  [FAQ's SIR 2.0](41523073.md)

Suport Tècnic : SIR 2.0 - FLUX DEL SERVEI - ERRORS - Error en accedir al SIR a partir del REGISTRE
==================================================================================================

Created by Unknown User (otecobernal), last modified on 02 December 2021

FP#431168 

Problema
--------

L'usuari accedeix a l'apartat de REGISTRE d'EACAT i en clicar sobre el tràmit d'un registre el redirigeix a l'aplicació del SIR 2.0, però aquest retorna un error que no s'ha trobat el registre.

![](attachments/41523493/41523501.gif)

  

Anàlisi
-------

Ens podem impersonar a l'EACAT i replicar tot el procés. Haurem de buscar el registre amb l'error, en aquest cas: **S/000009-2021**

En recrear el circuit, veurem que el link de la redirecció apareix l'identificador del sir: 

Podrem buscar l'identificador O00011862\_21\_00059921, tant a les taules de la PCI com a les de l'EACAT, i veurem que no retorna dades: [https://pl6.eacat.cat/group/aoc/sir?**ensActiu**\=8104240003&**id\_sir**\=O00011862\_21\_00059921](https://pl6.eacat.cat/group/aoc/sir?ensActiu=8104240003&id_sir=O00011862_21_00059921)

Revisant la informació del registre, veiem que la data és del dia 08/06/2021:

![](attachments/41523493/41523503.png)

Aquesta data ens pot ajudar per filtrar als logs:

grep -i O00011862\_21\_00059921 MC-SIR\_APPNODO?\_SOA.log.2021-06-08

  

**Error:**

08 Jun 2021 08:04:06,214 ERROR SIRMngr : javax.persistence.RollbackException: Exception \[EclipseLink-4002\] (Eclipse Persistence Services - 2.6.4.v20160829-44060b6): org.eclipse.persistence.exceptions.DatabaseException  
Internal Exception: java.sql.SQLIntegrityConstraintViolationException: ORA-00001: unique constraint (SIR\_PCI.UQ\_SIR\_INTERCANVI\_3) violated

Error Code: 1  
Call: INSERT INTO SIR\_INTERCANVI (ID, ACK\_ENVIAMENT, ACK\_ENVIAMENT\_REBUIG, ACK\_RECEPCIO, APLICACIO, CODI\_ENS, DATA, DATA\_ACTUALITZACIO, DESTI\_REGISTRE\_ENTRADA, DESTI\_REGISTRE\_ENTRADA\_DATA, EACAT, ESTAT, ID\_INTERCANVI, ID\_SIR, OFICINA\_DESTI, OFICINA\_INICIAL, OFICINA\_ORIGEN, ORIGEN\_REGISTRE\_ENTRADA, ORIGEN\_REGISTRE\_ENTRADA\_DATA, REGISTRE\_SORTIDA, REINTENTS, SICRES3, TIPUS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)  
bind => \[23 parameters bound\]  
Query: InsertObjectQuery(cat.aoc.pci30.modalitats.sir.entities.Intercanvi@58cadcd3)  
at org.eclipse.persistence.internal.jpa.transaction.EntityTransactionImpl.commit(EntityTransactionImpl.java:159)  
at cat.aoc.pci30.modalitats.sir.entities.SIR.persist(SIR.java:329)  
at cat.aoc.pci30.modalitats.sir.entities.SIR.persist(SIR.java:340)  
at cat.aoc.pci30.modalitats.sir.managers.SIRMngr.enregistra(SIRMngr.java:184)  
at cat.aoc.pci30.modalitats.sir.SIRModalitats.procesa(SIRModalitats.java:55)  
at cat.aoc.pci30.core.mti.fases.MTIFase4Impl.procesa(MTIFase4Impl.java:34)  
at sun.reflect.GeneratedMethodAccessor24230.invoke(Unknown Source)  
at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)  
at java.lang.reflect.Method.invoke(Method.java:498)  
at weblogic.wsee.jaxws.WLSInstanceResolver$WLSInvoker.invoke(WLSInstanceResolver.java:120)  
at weblogic.wsee.jaxws.WLSInstanceResolver$WLSInvoker.invoke(WLSInstanceResolver.java:93)  
at [com.sun.xml.ws](http://com.sun.xml.ws).server.InvokerTube$2.invoke(InvokerTube.java:149)  
at [com.sun.xml.ws](http://com.sun.xml.ws).server.sei.SEIInvokerTube.processRequest(SEIInvokerTube.java:88)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.\_\_doRun(Fiber.java:1136)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.\_doRun(Fiber.java:1050)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.doRun(Fiber.java:1019)  
at [com.sun.xml.ws](http://com.sun.xml.ws).api.pipe.Fiber.runSync(Fiber.java:877)  
at [com.sun.xml.ws](http://com.sun.xml.ws).server.WSEndpointImpl$2.process(WSEndpointImpl.java:419)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.HttpAdapter$HttpToolkit.handle(HttpAdapter.java:868)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.HttpAdapter.handle(HttpAdapter.java:422)  
at [com.sun.xml.ws](http://com.sun.xml.ws).transport.http.servlet.ServletAdapter.handle(ServletAdapter.java:169)  
at weblogic.wsee.jaxws.WLSServletAdapter.handle(WLSServletAdapter.java:229)  
at weblogic.wsee.jaxws.HttpServletAdapter$AuthorizedInvoke.run(HttpServletAdapter.java:667)  
at weblogic.security.acl.internal.AuthenticatedSubject.doAs(AuthenticatedSubject.java:368)  
at weblogic.security.service.SecurityManager.runAs(SecurityManager.java:163)  
at weblogic.wsee.util.ServerSecurityHelper.authenticatedInvoke(ServerSecurityHelper.java:108)  
at weblogic.wsee.jaxws.HttpServletAdapter$3.run(HttpServletAdapter.java:286)  
at weblogic.wsee.jaxws.HttpServletAdapter.post(HttpServletAdapter.java:295)  
at weblogic.wsee.jaxws.JAXWSServlet.doRequest(JAXWSServlet.java:128)  
at weblogic.servlet.http.AbstractAsyncServlet.service(AbstractAsyncServlet.java:103)  
at javax.servlet.http.HttpServlet.service(HttpServlet.java:790)  
at weblogic.servlet.internal.StubSecurityHelper$ServletServiceAction.run(StubSecurityHelper.java:286)  
at weblogic.servlet.internal.StubSecurityHelper$ServletServiceAction.run(StubSecurityHelper.java:260)  
at weblogic.servlet.internal.StubSecurityHelper.invokeServlet(StubSecurityHelper.java:137)  
at weblogic.servlet.internal.ServletStubImpl.execute(ServletStubImpl.java:350)  
at weblogic.servlet.internal.TailFilter.doFilter(TailFilter.java:25)  
at weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.java:78)  
at [oracle.security.jps.ee](http://oracle.security.jps.ee).http.JpsAbsFilter$1.run(JpsAbsFilter.java:141)  
at java.security.AccessController.doPrivileged(Native Method)  
at oracle.security.jps.util.JpsSubject.doAsPrivileged(JpsSubject.java:315)  
at [oracle.security.jps.ee](http://oracle.security.jps.ee).util.JpsPlatformUtil.runJaasMode(JpsPlatformUtil.java:650)  
at [oracle.security.jps.ee](http://oracle.security.jps.ee).http.JpsAbsFilter.runJaasMode(JpsAbsFilter.java:124)  
at [oracle.security.jps.ee](http://oracle.security.jps.ee).http.JpsAbsFilter.doFilter(JpsAbsFilter.java:232)  
at [oracle.security.jps.ee](http://oracle.security.jps.ee).http.JpsFilter.doFilter(JpsFilter.java:94)  
at weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.java:78)  
at oracle.dms.servlet.DMSServletFilter.doFilter(DMSServletFilter.java:248)  
at weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.java:78)  
at weblogic.servlet.internal.WebAppServletContext$ServletInvocationAction.wrapRun(WebAppServletContext.java:3683)  
at weblogic.servlet.internal.WebAppServletContext$ServletInvocationAction.run(WebAppServletContext.java:3649)  
at weblogic.security.acl.internal.AuthenticatedSubject.doAs(AuthenticatedSubject.java:326)

at weblogic.security.service.SecurityManager.runAsForUserCode(SecurityManager.java:197)  
at weblogic.servlet.provider.WlsSecurityProvider.runAsForUserCode(WlsSecurityProvider.java:203)  
at weblogic.servlet.provider.WlsSubjectHandle.run(WlsSubjectHandle.java:71)  
at weblogic.servlet.internal.WebAppServletContext.doSecuredExecute(WebAppServletContext.java:2433)  
at weblogic.servlet.internal.WebAppServletContext.securedExecute(WebAppServletContext.java:2281)  
at weblogic.servlet.internal.WebAppServletContext.execute(WebAppServletContext.java:2259)  
at weblogic.servlet.internal.ServletRequestImpl.runInternal(ServletRequestImpl.java:1691)  
at weblogic.servlet.internal.ServletRequestImpl.run(ServletRequestImpl.java:1651)  
at weblogic.servlet.provider.ContainerSupportProviderImpl$WlsRequestExecutor.run(ContainerSupportProviderImpl.java:270)  
at weblogic.invocation.ComponentInvocationContextManager.\_runAs(ComponentInvocationContextManager.java:348)  
at weblogic.invocation.ComponentInvocationContextManager.runAs(ComponentInvocationContextManager.java:333)  
at weblogic.work.LivePartitionUtility.doRunWorkUnderContext(LivePartitionUtility.java:54)  
at weblogic.work.PartitionUtility.runWorkUnderContext(PartitionUtility.java:41)  
at weblogic.work.SelfTuningWorkManagerImpl.runWorkUnderContext(SelfTuningWorkManagerImpl.java:640)  
at weblogic.work.ExecuteThread.execute(ExecuteThread.java:406)  
at weblogic.work.ExecuteThread.run(ExecuteThread.java:346)  
Caused by: Exception \[EclipseLink-4002\] (Eclipse Persistence Services - 2.6.4.v20160829-44060b6): org.eclipse.persistence.exceptions.DatabaseException  
Internal Exception: java.sql.SQLIntegrityConstraintViolationException: ORA-00001: unique constraint (SIR\_PCI.UQ\_SIR\_INTERCANVI\_3) violated

Error Code: 1  
Call: INSERT INTO SIR\_INTERCANVI (ID, ACK\_ENVIAMENT, ACK\_ENVIAMENT\_REBUIG, ACK\_RECEPCIO, APLICACIO, CODI\_ENS, DATA, DATA\_ACTUALITZACIO, DESTI\_REGISTRE\_ENTRADA, DESTI\_REGISTRE\_ENTRADA\_DATA, EACAT, ESTAT, ID\_INTERCANVI, ID\_SIR, OFICINA\_DESTI, OFICINA\_INICIAL, OFICINA\_ORIGEN, ORIGEN\_REGISTRE\_ENTRADA, ORIGEN\_REGISTRE\_ENTRADA\_DATA, REGISTRE\_SORTIDA, REINTENTS, SICRES3, TIPUS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)  
bind => \[23 parameters bound\]

Query: InsertObjectQuery(cat.aoc.pci30.modalitats.sir.entities.Intercanvi@58cadcd3)  
at org.eclipse.persistence.exceptions.DatabaseException.sqlException(DatabaseException.java:331)  
at org.eclipse.persistence.internal.databaseaccess.DatabaseAccessor.executeDirectNoSelect(DatabaseAccessor.java:902)  
at org.eclipse.persistence.internal.databaseaccess.DatabaseAccessor.executeNoSelect(DatabaseAccessor.java:964)  
at org.eclipse.persistence.internal.databaseaccess.DatabaseAccessor.basicExecuteCall(DatabaseAccessor.java:633)  
at org.eclipse.persistence.internal.databaseaccess.DatabaseAccessor.executeCall(DatabaseAccessor.java:560)  
at org.eclipse.persistence.internal.sessions.AbstractSession.basicExecuteCall(AbstractSession.java:2056)  
at org.eclipse.persistence.sessions.server.ClientSession.executeCall(ClientSession.java:306)  
at org.eclipse.persistence.internal.queries.DatasourceCallQueryMechanism.executeCall(DatasourceCallQueryMechanism.java:242)  
at org.eclipse.persistence.internal.queries.DatasourceCallQueryMechanism.executeCall(DatasourceCallQueryMechanism.java:228)  
at org.eclipse.persistence.internal.queries.DatasourceCallQueryMechanism.insertObject(DatasourceCallQueryMechanism.java:377)  
at org.eclipse.persistence.internal.queries.StatementQueryMechanism.insertObject(StatementQueryMechanism.java:165)  
at org.eclipse.persistence.internal.queries.StatementQueryMechanism.insertObject(StatementQueryMechanism.java:180)  
at org.eclipse.persistence.internal.queries.DatabaseQueryMechanism.insertObjectForWrite(DatabaseQueryMechanism.java:489)  
at org.eclipse.persistence.queries.InsertObjectQuery.executeCommit(InsertObjectQuery.java:80)  
at org.eclipse.persistence.queries.InsertObjectQuery.executeCommitWithChangeSet(InsertObjectQuery.java:90)  
at org.eclipse.persistence.internal.queries.DatabaseQueryMechanism.executeWriteWithChangeSet(DatabaseQueryMechanism.java:301)  
at org.eclipse.persistence.queries.WriteObjectQuery.executeDatabaseQuery(WriteObjectQuery.java:58)  
at org.eclipse.persistence.queries.DatabaseQuery.execute(DatabaseQuery.java:904)  
at org.eclipse.persistence.queries.DatabaseQuery.executeInUnitOfWork(DatabaseQuery.java:803)  
at org.eclipse.persistence.queries.ObjectLevelModifyQuery.executeInUnitOfWorkObjectLevelModifyQuery(ObjectLevelModifyQuery.java:108)  
at org.eclipse.persistence.queries.ObjectLevelModifyQuery.executeInUnitOfWork(ObjectLevelModifyQuery.java:85)  
at org.eclipse.persistence.internal.sessions.UnitOfWorkImpl.internalExecuteQuery(UnitOfWorkImpl.java:2896)  
at org.eclipse.persistence.internal.sessions.AbstractSession.executeQuery(AbstractSession.java:1857)  
at org.eclipse.persistence.internal.sessions.AbstractSession.executeQuery(AbstractSession.java:1839)  
at org.eclipse.persistence.internal.sessions.AbstractSession.executeQuery(AbstractSession.java:1790)  
at org.eclipse.persistence.internal.sessions.CommitManager.commitNewObjectsForClassWithChangeSet(CommitManager.java:227)  
at org.eclipse.persistence.internal.sessions.CommitManager.commitAllObjectsForClassWithChangeSet(CommitManager.java:194)  
at org.eclipse.persistence.internal.sessions.CommitManager.commitAllObjectsWithChangeSet(CommitManager.java:139)  
at org.eclipse.persistence.internal.sessions.AbstractSession.writeAllObjectsWithChangeSet(AbstractSession.java:4264)  
at org.eclipse.persistence.internal.sessions.UnitOfWorkImpl.commitToDatabase(UnitOfWorkImpl.java:1441)  
at org.eclipse.persistence.internal.sessions.UnitOfWorkImpl.commitToDatabaseWithChangeSet(UnitOfWorkImpl.java:1531)  
at org.eclipse.persistence.internal.sessions.RepeatableWriteUnitOfWork.commitRootUnitOfWork(RepeatableWriteUnitOfWork.java:278)  
at org.eclipse.persistence.internal.sessions.UnitOfWorkImpl.commitAndResume(UnitOfWorkImpl.java:1169)  
at org.eclipse.persistence.internal.jpa.transaction.EntityTransactionImpl.commit(EntityTransactionImpl.java:134)  
... 65 more  
Caused by: java.sql.SQLIntegrityConstraintViolationException: ORA-00001: unique constraint (SIR\_PCI.UQ\_SIR\_INTERCANVI\_3) violated

  
at oracle.jdbc.driver.T4CTTIoer.processError(T4CTTIoer.java:466)  
at oracle.jdbc.driver.T4CTTIoer.processError(T4CTTIoer.java:407)  
at oracle.jdbc.driver.T4C8Oall.processError(T4C8Oall.java:1113)  
at oracle.jdbc.driver.T4CTTIfun.receive(T4CTTIfun.java:546)  
at oracle.jdbc.driver.T4CTTIfun.doRPC(T4CTTIfun.java:269)  
at oracle.jdbc.driver.T4C8Oall.doOALL(T4C8Oall.java:603)  
at oracle.jdbc.driver.T4CPreparedStatement.doOall8(T4CPreparedStatement.java:234)  
at oracle.jdbc.driver.T4CPreparedStatement.doOall8(T4CPreparedStatement.java:55)  
at oracle.jdbc.driver.T4CPreparedStatement.executeForRows(T4CPreparedStatement.java:1006)  
at oracle.jdbc.driver.OracleStatement.doExecuteWithTimeout(OracleStatement.java:1316)  
at oracle.jdbc.driver.OraclePreparedStatement.executeInternal(OraclePreparedStatement.java:5010)  
at oracle.jdbc.driver.OraclePreparedStatement.executeUpdate(OraclePreparedStatement.java:5136)  
at oracle.jdbc.driver.OraclePreparedStatementWrapper.executeUpdate(OraclePreparedStatementWrapper.java:1519)  
at weblogic.jdbc.wrapper.PreparedStatement.executeUpdate(PreparedStatement.java:170)  
at org.eclipse.persistence.internal.databaseaccess.DatabaseAccessor.executeDirectNoSelect(DatabaseAccessor.java:892)  
... 97 more

08 Jun 2021 08:04:06,215 DEBUG SIRModalitats : <?xml version="1.0" encoding="UTF-8"?>  
<respostaEnviamentAssentament xmlns="[http://www.aoc.cat/sir](http://www.aoc.cat/sir)">  
<resultat>  
<codiResultat>0502</codiResultat>  
<descripcio>Error realizant l'operació. Si us plau, torneu a intentar-ho en uns instants. Si el problema persisteix poseu-vos en contacte amb el Servei d'Atenció a l'Usuari.</descripcio>  
</resultat>  
</respostaEnviamentAssentament>

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2021-5-17\_10-44-6.png](attachments/41523493/41523494.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-5-17\_11-47-42.png](attachments/41523493/41523495.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-5-17\_11-48-23.png](attachments/41523493/41523496.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-5-17\_11-56-48.png](attachments/41523493/41523497.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-5-17\_11-59-38.png](attachments/41523493/41523498.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-5-17\_12-0-6.png](attachments/41523493/41523499.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-5-17\_12-1-4.png](attachments/41523493/41523500.png) (image/png)  
![](images/icons/bullet_blue.gif) [Animation.gif](attachments/41523493/41523501.gif) (image/gif)  
![](images/icons/bullet_blue.gif) [image2021-6-9\_11-1-56.png](attachments/41523493/41523503.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:59

[Atlassian](http://www.atlassian.com/)