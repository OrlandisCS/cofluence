Suport Tècnic : OVER - FLUX DEL SERVEI - ERRORS - PICA - Errors  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [02 - FAQ's serveis](26313393.md)
4.  [FAQ's OVER](28705589.md)

Suport Tècnic : OVER - FLUX DEL SERVEI - ERRORS - PICA - Errors
===============================================================

Created by Unknown User (cmoralea), last modified by Unknown User (oteccmorales) on 05 March 2020

Diferents errors que ens podem trobar en consums d'OVER de la PICA

Casos d'errors:
---------------

GsitGADResposta - Error processant el resultat

Primer de tot hem de tenir en comptes que la PICA ens ha d'indicar l'entorn afectat (PRE o PRO) i ens ha d'adjuntar l'XML que s'envia a l'AOC, normalment és del tipus "GsitGADXXXXX". En aquest cas és "GsitGADResposta"

Un cop tinguem la informació que ens traslladen amb la data i hora cerquem als logs (On mirar els logs? → **SOA està en PCI30** al fitxer **OVER\_TRAMITS\_PICA\_APPNODO?\_SOA.log**)
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Quan tinguem els logs, cerquem pel "IdInstanciaTramit"

java.sql.SQLException: ORA-12899: value too large for column "OVER2"."OVER\_SERVEI\_INSTANCIA\_INFO"."VALOR"

Cercant als logs per "idInstanciaTramit" trobem aquest error.

Per exemple:

**petició resposta PICA**

<ns:CrearApuntResposta xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://gencat.net/scsp/esquemes/productes/gad/servei" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
 <ns0:GsitGADResposta xmlns:ns0="http://gencat.net/scsp/esquemes/productes/gad/resposta">
 <ns0:CodiResposta>KO</ns0:CodiResposta>
 <ns0:DataPeticio>2019-06-12T13:06:54.000+02:00</ns0:DataPeticio>
 <ns0:DataResposta>2019-06-12T13:07:03.000+02:00</ns0:DataResposta>
 <ns0:Missatges>
 <ns0:Resultat xsi:type="res:TipusMissatgeGAD\_CE">
 <ns0:CodiResultat>KO</ns0:CodiResultat>
 <ns0:Errors>
 <pic:PICAError xmlns:pic="http://gencat.net/scsp/esquemes/PicaError">
 <pic:CodiError>KO</pic:CodiError>
 <pic:Error>Error processant el resultat</pic:Error>
 <pic:Descripcio>Error processant el resultat</pic:Descripcio>
 <pic:Causa>Error processant el resultat</pic:Causa>
 </pic:PICAError>
 </ns0:Errors>
 <ns0:CodiEstatPublic/>
 </ns0:Resultat>
 </ns0:Missatges>
 <ns0:IdentificadorsEACAT>
 <ns0:IdInstanciaServei>3512036</ns0:IdInstanciaServei>
 <ns0:IdInstanciaTramit>3867036</ns0:IdInstanciaTramit>
 </ns0:IdentificadorsEACAT>
 </ns0:GsitGADResposta>
 
</ns:CrearApuntResposta>

  

idInstanciaTramit = **3867036**

  

**Logs**

12 jun 2019 13:06:54,584 INFO  GestorApuntsDiferits: crearApunt(). CrearApuntPeticio: <ns3:CrearApuntPeticio xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="http://gencat.net/scsp/esquemes/productes/gad/servei" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:ns3="http://gencat.net/scsp/esquemes/productes/gad/servei" xmlns:soap-env="http://www.w3.org/2003/05/soap-envelope" xmlns:gads="http://gencat.net/scsp/esquemes/productes/gad/sollicitud">
	<gads:GsitServeisIntegracio xmlns:gads="http://gencat.net/scsp/esquemes/productes/gad/sollicitud" xmlns:soap-env="http://www.w3.org/2003/05/soap-envelope" xmlns:ns3="http://gencat.net/scsp/esquemes/productes/gad/servei" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns="http://gencat.net/scsp/esquemes/productes/gad/servei" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
		<gads:Resultat>
			<gads:Capcalera>
				<gads:CodiTramit>TRPATR</gads:CodiTramit>
				<gads:CodiModalitat>SOLC</gads:CodiModalitat>
				<gads:VersioNegoci>201701</gads:VersioNegoci>
			</gads:Capcalera>
			<gads:Cos>
				<gads:FitxerAdjunt>
					<gads:FitxerUrl>/TRAMITACIO/TRAGE/TRPATRSOLC/EACAT-3512/EACAT-36-3867036/3512036\_3867036\_12\_06\_2019\_13\_05\_48\_155.pdf</gads:FitxerUrl>
				</gads:FitxerAdjunt>
				<gads:NumeroRegistre>29138</gads:NumeroRegistre>
				<gads:CodiUR>9015</gads:CodiUR>
				<gads:Any>2019</gads:Any>
				<gads:DataRegistre>2019-06-12T13:06:52.779+02:00</gads:DataRegistre>
				<gads:ComentariPublic>Us enviem, adjunt, l'informe de la Sub-direcció general d'Assistència Jurídica i d'Innovació a l'Administració Local en relació amb la Permuta de la finca situada al número 13 del Raval de Montserrat, de Terrassa, propietat de la Fundació Institut Industrial i Comercial, SA, qualificada urbanísticament d'equipament cultural (Clau E.7) a canvi de la finca de titularitat municipal emplaçada al carrer Marconi número 217, de Terrassa, qualificada d'ús industrial (Clau A8.0).</gads:ComentariPublic>
				<gads:Gestio>
					<gads:DataResultat>2019-06-12T12:58:08.000+02:00</gads:DataResultat>
				</gads:Gestio>
				<gads:IdentificadorsEACAT>
					<ns4:IdInstanciaServei xmlns:ns4="http://gencat.net/scsp/esquemes/productes/gad/sollicitud/tipus">3512036</ns4:IdInstanciaServei>
					<ns4:IdInstanciaTramit xmlns:ns4="http://gencat.net/scsp/esquemes/productes/gad/sollicitud/tipus">3867036</ns4:IdInstanciaTramit>
				</gads:IdentificadorsEACAT>
				<gads:NumExpedient>GAH\_2019\_EXP\_TRPATRSOLC\_00000225</gads:NumExpedient>
			</gads:Cos>
		</gads:Resultat>
	</gads:GsitServeisIntegracio>
</ns3:CrearApuntPeticio>
12 jun 2019 13:07:03,613 ERROR GRDMngrImpl    : java.sql.SQLException: ORA-12899: value too large for column "OVER2"."OVER\_SERVEI\_INSTANCIA\_INFO"."VALOR" (actual: 501, maximum: 500)

	at oracle.jdbc.driver.DatabaseError.throwSqlException(DatabaseError.java:112)
	at oracle.jdbc.driver.T4CTTIoer.processError(T4CTTIoer.java:331)
	at oracle.jdbc.driver.T4CTTIoer.processError(T4CTTIoer.java:288)
	at oracle.jdbc.driver.T4C8Oall.receive(T4C8Oall.java:743)
	at oracle.jdbc.driver.T4CPreparedStatement.doOall8(T4CPreparedStatement.java:216)
	at oracle.jdbc.driver.T4CPreparedStatement.executeForRows(T4CPreparedStatement.java:955)
	at oracle.jdbc.driver.OracleStatement.doExecuteWithTimeout(OracleStatement.java:1168)
	at oracle.jdbc.driver.OraclePreparedStatement.executeInternal(OraclePreparedStatement.java:3316)
	at oracle.jdbc.driver.OraclePreparedStatement.execute(OraclePreparedStatement.java:3422)
	at weblogic.jdbc.wrapper.PreparedStatement.execute(PreparedStatement.java:104)
	at com.bea.wlw.runtime.core.control.DatabaseControlImpl.invoke(DatabaseControlImpl.jcs:2645)
	at com.bea.wlw.runtime.core.dispatcher.DispMethod.invoke(DispMethod.java:377)
	at com.bea.wlw.runtime.core.container.Invocable.invoke(Invocable.java:433)
	at com.bea.wlw.runtime.core.container.Invocable.invoke(Invocable.java:406)
	at com.bea.wlw.runtime.jcs.container.JcsProxy.invoke(JcsProxy.java:388)
	at $Proxy211.createServeiInstanciaInfo(Unknown Source)
	at processes.tramits.pica.over.OVERMngrImpl.updateServeiInstanciaInfo(OVERMngrImpl.jcs:272)
	at sun.reflect.GeneratedMethodAccessor349.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
	at java.lang.reflect.Method.invoke(Method.java:331)
	at com.bea.wlw.runtime.core.dispatcher.DispMethod.invoke(DispMethod.java:371)
	at com.bea.wlw.runtime.core.container.Invocable.invoke(Invocable.java:433)
	at com.bea.wlw.runtime.core.container.Invocable.invoke(Invocable.java:406)
	at com.bea.wlw.runtime.jcs.container.JcsProxy.invoke(JcsProxy.java:381)
	at $Proxy208.updateServeiInstanciaInfo(Unknown Source)
	at processes.tramits.pica.OVERPICAMngrImpl.tractarAccio(OVERPICAMngrImpl.jcs:77)
	at sun.reflect.GeneratedMethodAccessor490.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
	at java.lang.reflect.Method.invoke(Method.java:331)
	at com.bea.wlw.runtime.core.dispatcher.DispMethod.invoke(DispMethod.java:371)
	at com.bea.wlw.runtime.core.container.Invocable.invoke(Invocable.java:433)
	at com.bea.wlw.runtime.core.container.Invocable.invoke(Invocable.java:406)
	at com.bea.wlw.runtime.jcs.container.JcsProxy.invoke(JcsProxy.java:381)
	at $Proxy209.tractarAccio(Unknown Source)
	at processes.tramits.pica.GRDMngrImpl.GRD\_Sollicitud\_resultat\_enregistrar(GRDMngrImpl.jcs:231)
	at sun.reflect.GeneratedMethodAccessor1106.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
	at java.lang.reflect.Method.invoke(Method.java:331)
	at com.bea.wlw.runtime.core.dispatcher.DispMethod.invoke(DispMethod.java:371)
	at com.bea.wlw.runtime.core.container.Invocable.invoke(Invocable.java:433)
	at com.bea.wlw.runtime.core.container.Invocable.invoke(Invocable.java:406)
	at com.bea.wlw.runtime.jcs.container.JcsProxy.invoke(JcsProxy.java:381)
	at $Proxy207.GRD\_Sollicitud\_resultat\_enregistrar(Unknown Source)
	at processes.tramits.pica.AccioMngrImpl.GRD\_crearApuntPeticio(AccioMngrImpl.jcs:136)
	at sun.reflect.GeneratedMethodAccessor488.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
	at java.lang.reflect.Method.invoke(Method.java:331)
	at com.bea.wlw.runtime.core.dispatcher.DispMethod.invoke(DispMethod.java:371)
	at com.bea.wlw.runtime.core.container.Invocable.invoke(Invocable.java:433)
	at com.bea.wlw.runtime.core.container.Invocable.invoke(Invocable.java:406)
	at com.bea.wlw.runtime.jcs.container.JcsProxy.invoke(JcsProxy.java:381)
	at $Proxy205.GRD\_crearApuntPeticio(Unknown Source)
	at processes.tramits.pica.serveis.GestorApuntsDiferits.crearApunt(GestorApuntsDiferits.jws:29)
	at sun.reflect.GeneratedMethodAccessor487.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
	at java.lang.reflect.Method.invoke(Method.java:331)
	at com.bea.wlw.runtime.core.dispatcher.DispMethod.invoke(DispMethod.java:371)
	at com.bea.wlw.runtime.core.container.Invocable.invoke(Invocable.java:433)
	at com.bea.wlw.runtime.core.container.Invocable.invoke(Invocable.java:406)
	at com.bea.wlw.runtime.core.container.Invocable.invoke(Invocable.java:249)
	at com.bea.wlw.runtime.core.bean.BaseContainerBean.invokeBase(BaseContainerBean.java:224)
	at com.bea.wlw.runtime.core.bean.SLSBContainerBean.invoke(SLSBContainerBean.java:109)
	at com.bea.wlwgen.StatelessContainer\_ly05hg\_ELOImpl.invoke(StatelessContainer\_ly05hg\_ELOImpl.java:153)
	at com.bea.wlwgen.GenericStatelessSLSBContAdpt.invokeOnBean(GenericStatelessSLSBContAdpt.java:62)
	at com.bea.wlw.runtime.core.bean.BaseDispatcherBean.runAsInvoke(BaseDispatcherBean.java:175)
	at com.bea.wlw.runtime.core.bean.BaseDispatcherBean.invoke(BaseDispatcherBean.java:55)
	at com.bea.wlw.runtime.core.bean.SyncDispatcherBean.invoke(SyncDispatcherBean.java:168)
	at com.bea.wlw.runtime.core.bean.SyncDispatcher\_k1mrl8\_EOImpl.invoke(SyncDispatcher\_k1mrl8\_EOImpl.java:46)
	at com.bea.wlw.runtime.core.dispatcher.Dispatcher.remoteDispatch(Dispatcher.java:161)
	at com.bea.wlw.runtime.core.dispatcher.Dispatcher.dispatch(Dispatcher.java:49)
	at com.bea.wlw.runtime.core.dispatcher.HttpServerHelper.executePostRequest(HttpServerHelper.java:713)
	at com.bea.wlw.runtime.core.dispatcher.HttpServer.doPost(HttpServer.java:49)
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:760)
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:853)
	at weblogic.servlet.internal.ServletStubImpl$ServletInvocationAction.run(ServletStubImpl.java:1077)
	at weblogic.servlet.internal.ServletStubImpl.invokeServlet(ServletStubImpl.java:465)
	at weblogic.servlet.internal.ServletStubImpl.invokeServlet(ServletStubImpl.java:348)
	at weblogic.servlet.internal.WebAppServletContext$ServletInvocationAction.run(WebAppServletContext.java:7047)
	at weblogic.security.acl.internal.AuthenticatedSubject.doAs(AuthenticatedSubject.java:321)
	at weblogic.security.service.SecurityManager.runAs(SecurityManager.java:121)
	at weblogic.servlet.internal.WebAppServletContext.invokeServlet(WebAppServletContext.java:3902)
	at weblogic.servlet.internal.ServletRequestImpl.execute(ServletRequestImpl.java:2773)
	at weblogic.kernel.ExecuteThread.execute(ExecuteThread.java:224)
	at weblogic.kernel.ExecuteThread.run(ExecuteThread.java:183)

Segons ens va comentar l'OT en el tiquet 277397 aquest error és causat → _**l'objecte comentari públic no pot superar els 450 caràcters.**_

  

**Tag dels logs**

<gads:ComentariPublic>Us enviem, adjunt, l'informe de la Sub-direcció general d'Assistència Jurídica i d'Innovació a l'Administració Local en relació amb la Permuta de la finca situada al número 13 del Raval de Montserrat, de Terrassa, propietat de la Fundació Institut Industrial i Comercial, SA, qualificada urbanísticament d'equipament cultural (Clau E.7) a canvi de la finca de titularitat municipal emplaçada al carrer Marconi número 217, de Terrassa, qualificada d'ús industrial (Clau A8.0).</gads:ComentariPublic>

  
  

  

Related articles
----------------

  

Related issues

FP#288302 ,277397

Document generated by Confluence on 02 June 2025 10:57

[Atlassian](http://www.atlassian.com/)