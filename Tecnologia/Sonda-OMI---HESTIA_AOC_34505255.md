Suport Tècnic : Sonda OMI - HESTIA\_AOC  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [03 - Monitorització - Revisions globals](26313327.html)
4.  [Monitors OMI (CTTI)](26313608.html)

Suport Tècnic : Sonda OMI - HESTIA\_AOC
=======================================

Created by Unknown User (otecobernal), last modified by OTEC ST JAlejandro Cardete Postigo on 12 April 2024

SERVEI 24X7

Canvi de procediment temporal!!!!

Actualment fins a nou avís, en cas de la caiguda d'aquesta sonda, ens haurem de posar en contacte amb en Sergio Gutierrez:  675782816

  

Estem pendents de rebre un nou document amb el nou procediment de revisió mentrestant les incidències les traslladarem a ell. 

  

Circuit que realitza la sonda

Aquesta sonda accedeix a una URL ([https://hestia.aoc.cat/Hestia/MonitorISM.aspx](https://hestia.aoc.cat/Hestia/MonitorISM.aspx)) que **realitza** una **consulta** contra l’**Hèstia** passant per **totes** les **capes** de l’**arquitectura** de l’**Hèstia** (**IIS**, **AD** i **SQL**) de forma que si hi hagués algun problema en qualsevol component del servei, no retornaria el text “Servei Hestia funcionant correctament”.

Aquesta sonda realitza les següents accions:

1.  Accedir a l'URL: [https://hestia.aoc.cat/Hestia/MonitorISM.aspx](https://hestia.aoc.cat/Hestia/MonitorISM.aspx)
2.  Buscar el text "**Servei Hestia funcionant correctament**”

La sonda s'estructura en una transició:

1.  **01\_ENTRADA\_PORTAL-1:** Agrupa les dues pases.  
      
    

Màquines a revisar en cas de caiguda

La infraestructura de l’Hèstia es troba **virtualitzada** sobre una plataforma **Azure Stack** que en l’actualitat ens ofereix **Kyndryl**. Si és el primer cop que realitzem aquestes validacions, recomanem validar que podem accedir als servidors a través de les màquines de gestió, i que tenim correctament instal·lada l'aplicació, com s'explica als apartats corresponent d'aquesta mateixa entrada:

*   [Configuracions > Configuració dels servidors](#SondaOMIHESTIA_AOC-serverConfig)
*   [Configuracions > Configuració de l'aplicació](#SondaOMIHESTIA_AOC-appConfig)

En l'àmbit lògic, l’Hèstia està format per 3 components principals (2 servidors per cada component lògic):

*   **Frontal IIS 10 (IIS)**
*   **Active Directory (AD)**
*   **Base de dades SQL Server 2016 (BD)**

Per accedir als servidors ho haurem de fer a través de dos **servidors de gestió**:

*   **hestia-pro-gs01**
*   **hestia-pro-gs02**

  

Procediment

Primer haurem d'accedir als servidors de **gestió**:

*   **hestia-pro-gs01**
*   **hestia-pro-gs02**

Cadascun dels servidors permet com a molt la connexió simultània de dos usuaris. És possible que alguna d’aquestes sessions es quedi penjada i no sigui possible reciclar-la. En aquests casos cal intentar accedir amb l’altra sessió disponible i intentar forçar el tancament de la sessió penjada per tal que quedi disponible per a un futur accés.

En el cas que no fos possible accedir a un dels servidors de gestió, s’ha d’intentar amb l’altre servidor (recordant que tenim 2 possibles sessions concurrents) i si tampoc és possible (en molt rares ocasions ha passat) no hi ha cap altra opció que reiniciar els servidors de gestió segons el procediment:

  

1\. Reinici dels servidors de gestió:

Si en el moment d’intentar solucionar una incidència greu no fos possible accedir via escriptori remot a cap dels servidors de gestió (_hestia-pro-gs01_ i _hestia-pro-gs02_) perquè les 2 sessions prèvies estiguessin enganxades, haurem de forçar el seu reinici des del portal d’Azure Stack seguint el procediment que a continuació es detalla.

L’URL per poder accedir al portal d’Azure Stack on tenim desplegat l’Hèstia és el següent:

*   [https://portal.zne002.mediapro.cloud/](https://portal.zne002.mediapro.cloud/)

Únicament és possible l’autenticació en aquest portal amb credencials (en terminologia d’Azure Stack es coneix com a _Tenant_) nominals i disposant del doble factor d’autenticació a través de l’app _Microsoft Authenticator_.

****NOTA IMPORTANT:**** Tant les credencials nominals (el _tenant_ d’Azure Stack) com l’enregistrament de l’usuari a l’app Microsoft Authenticator s’haurà de gestionar prèviament amb els responsables del servei.

**NOTA IMPORTANT:** S’ha de vigilar molt a l’hora de realitzar qualsevol operativa dins el portal d’Azure Stack, ja que, si s’elimina per error un servidor, no hi ha cap possibilitat de recuperar-ho i els efectes poden ser irreversibles.

Una vegada autenticat al portal d’Azure Stack, caldrà accedir a l’apartat “Máquinas virtuales”

![](attachments/34505255/34505336.png)

I allà seleccionar el servidor que volem reiniciar:

![](attachments/34505255/34505337.png)

Finalment caldrà fer clic a l’opció _Reiniciar_

![](attachments/34505255/34505338.png)

  

Si no podem entrar al portal:

  

1.1 Portal d'Azure no disponible

Si no és possible accedir al portal Azure Stack, amb gairebé tota probabilitat, el servei Hèstia no estarà disponible. En aquest cas, caldrà reportar amb la màxima urgència possible al suport de Kyndryl la incidència d’acord amb el procediment acordat (veure dapartat [**Matriu d'escalats**](#SondaOMIHESTIA_AOC-escalats) d'aquesta mateixa entrada)

A continuació resumim el canal de comunicació establert amb Kyndryl per al report d’incidències crítiques:

1.  Enviar un correu a l’adreça [csc@mdcloud.es](mailto:csc@mdcloud.es) amb l’assumpte **_INC AOC AOC\_HÈSTIA PRO SERVEI NO DISPONIBLE_** i al cos del missatge indicar tota la informació que considerem rellevant.  
    
2.  En paral·lel es pot trucar als telèfons +34 934 806 166

Tant l’adreça de correu com el telèfon indicat estan disponibles en horari 24x7.

  

Un cop tinguem accés als servidors, haurem de revisar els logs de l’Hèstia (ubicats als frontals IIS), es pot accedir des de l'explorador de Windows dels servidors de gestió, accedint a la següent ruta:

*   [\\\\10.7.0.21\\c$\\Hestia\\Hestia](file://10.7.0.21/c$/Hestia/Hestia)
*   [\\\\10.7.0.22\\c$\\Hestia\\Hestia](file://10.7.0.22/c$/Hestia/Hestia)

![](attachments/34505255/34505352.png)

Si hi ha algun problema amb la base de dades, als logs hauria d'aparèixer errors tipus:

_1/30/2020 7:42:16 PM. Error obrint connexió amb la BD: Hestia - ServeiAcces - wjdGH34a - 10.7.0.41_  
_**The target database, 'Hestia', is participating in an availability group and is currently not accessible for queries**. Either data movement is suspended or the availability replica is not enabled for read access. To allow read-only access to this and other databases in_  
_the availability group, enable read access to one or more secondary availability replicas in the group. For more information, see the ALTER AVAILABILITY GROUP statement in SQL Server Books Online._  
_at System.Data.SqlClient.SqlInternalConnectionTds..ctor(DbConnectionPoolIdentity identity, SqlConnectionString connectionOptions, SqlCredential credential, Object providerInfo, String newPassword, SecureString newSecurePassword, Boolean redirectedUserInstance, SqlConnectionString userConnectionOptions, SessionData reconnectSessionData, DbConnectionPool pool, String accessToken, Boolean applyTransientFaultHandling, SqlAuthenticationProviderManager sqlAuthProviderManager)_  
_at System.Data.SqlClient.SqlConnectionFactory.CreateConnection(DbConnectionOptions options, DbConnectionPoolKey poolKey, Object poolGroupProviderInfo, DbConnectionPool pool, DbConnection owningConnection, DbConnectionOptions userOptions)_  
_at System.Data.ProviderBase.DbConnectionFactory.CreatePooledConnection(DbConnectionPool pool, DbConnection owningObject, DbConnectionOptions options, DbConnectionPoolKey poolKey, DbConnectionOptions userOptions)_  
_at System.Data.ProviderBase.DbConnectionPool.CreateObject(DbConnection owningObject, DbConnectionOptions userOptions, DbConnectionInternal oldConnection)_  
_at System.Data.ProviderBase.DbConnectionPool.UserCreateRequest(DbConnection owningObject, DbConnectionOptions userOptions, DbConnectionInternal oldConnection)_  
_at System.Data.ProviderBase.DbConnectionPool.TryGetConnection(DbConnection owningObject, UInt32 waitForMultipleObjectsTimeout, Boolean allowCreate, Boolean onlyOneCheckConnection, DbConnectionOptions userOptions, DbConnectionInternal& connection)_  
_at System.Data.ProviderBase.DbConnectionPool.TryGetConnection(DbConnection owningObject, TaskCompletionSource\`1 retry, DbConnectionOptions userOptions, DbConnectionInternal& connection)_  
_at System.Data.ProviderBase.DbConnectionFactory.TryGetConnection(DbConnection owningConnection, TaskCompletionSource\`1 retry, DbConnectionOptions userOptions, DbConnectionInternal oldConnection, DbConnectionInternal& connection)_  
_at System.Data.ProviderBase.DbConnectionInternal.TryOpenConnectionInternal(DbConnection outerConnection, DbConnectionFactory connectionFactory, TaskCompletionSource\`1 retry, DbConnectionOptions userOptions)_  
_at System.Data.SqlClient.SqlConnection.TryOpenInner(TaskCompletionSource\`1 retry)_  
_at System.Data.SqlClient.SqlConnection.TryOpen(TaskCompletionSource\`1 retry)_  
_at System.Data.SqlClient.SqlConnection.Open()_  
_at Connector.InitConnector()_

  

També és possible comprovar si estem davant aquesta incidència executant la següent consulta SQL que ens indicarà si el servidor és primari o secundari.

1.  _Des de algun dels dos servidors de gestió, executem el programa SQL Server Managment Studio_
2.  _Ens demanarà credencials de connexió:_

Servidor: node1 → 10.7.0.41 node2 → 10.7.0.42

Usuari: sa

Contrasenya: H3st1aPr02018!

  

_3\. Seguidament de connectar-nos, farem new query i executarem la consulta:_

  

If (IsNull(sys.fn\_hadr\_is\_primary\_replica ('Hestia'),0) = 1 )
Select 'Primario'   As Modo
Else
Select 'Secundario' As Modo

Si executem aquesta consulta en el servidor _hestia-pro-bd01_ (10.7.0.41) hauríem d'obtenir el següent resultat:

![](attachments/34505255/34505291.png)

I si l'executem en el servidor _hestia-pro-bd02_ (10.7.0.42) ens hauria de donar com a resultat:

![](attachments/34505255/34505292.png)

Si el resultat obtingut és justament el contrari, és a dir:

*   _hestia-pro-bd01_ (10.7.0.41) >> Secundari        
*   _hestia-pro-bd02_ (10.7.0.42) >> Primari

Haurem de procedir a reiniciar els servidors de base de dades:

  

2\. Reinici dels servidors de Base de dades:

Per a poder solucionar aquest problema bastarà amb connectar-se al servidor _hestia-pro-bd02_ (10.7.0.42) i forçar un reinici del servidor. El reinici provocarà que l’availability group automàticament i de forma immediata promocioni com a primari al servidor _hestia-pro-bd01_ recuperant la normalitat en el servei.

![](attachments/34505255/34505293.png)

Un cop fet això, hauríem de comprovar a través de qualsevol dels mecanismes indicats a l’apartat anterior que el servidor _hestia-pro-bd01_ consta com a primari i una vegada confirmat això, que el servei Hèstia torna a funcionar amb normalitat.

  

L’aplicació Hèstia és una aplicació d’escriptori que es distribueix i s’actualitza de forma automàtica fent ús de la tecnologia ClickOnce de Microsoft. ClickOnce el primer que fa quan s’executa l’Hèstia és comprovar si hi ha publicada una nova versió per descarregar-la i instal·lar-la de forma transparent a l’usuari. Si en obrir l’Hèstia no surt la pantalla de login o si surt i es tanca automàticament en pocs segons, és possible que un o els dos frontals estiguin caiguts o no responguin correctament, amb el que l’Hèstia no funcionarà. Aquest comportament es dóna quan el ClickOnce no aconsegueix accedir a la web de l’Hèstia ([http://hestia.aoc.cat](http://hestia.aoc.cat/)) per comprovar si hi ha una nova versió publicada i en aquest cas automàticament tanca el servei.

En aquests casos haurem de procedir a reiniciar els IIS.

  

3\. Reinici dels IIS:

En un primer moment, s’ha d’intentar provar de reiniciar els serveis IIS dels frontals _hestia-pro-is01_ i _hestia-pro-is02_. En aquest cas sí que estem obligats a accedir per escriptori remot a aquests servidors a través dels servidors de gestió _hestia-pro-gs01_ i _hestia-pro-gs02_.

**_Connexió IIS:_**

*   Des dels servidors de gestió ens haurem de connectar per "remote desktop.
*   IPS: **node1** → 10.7.0.21 **node2** → 10.7.0.22
*   Credencials: Les mateixes credencials nominals que en els servidor de gestió.

  

Una vegada dins el frontal, caldria executar la comanda _iisreset_ des de  la consola executada en mode administrador:

![](attachments/34505255/34505296.png)

També és possible reiniciar-ho executant l’ordre _Restart_ directament a l’IIS:

![](attachments/34505255/34505297.png)  

  

Si una vegada reiniciats els IISs l’Hèstia continua donant els mateixos problemes, **s’hauria de fer un reinici dels servidors sencers _hestia-pro-is01_ i _hestia-pro-is02_**.

Una vegada reiniciats els servidors s’ha d’activar el següent servei:

4\. Activar VPN:

L’Hèstia requereix per al seu funcionament de 3 connexions VPN amb el CPD corporatiu de l’AOC. Actualment es gestionen aquestes 3 connexions VPN amb un client _OpenVPN_ que està instal·lat en els següents servidors:

*   Frontals: **_hestia-pro-is01_** i **_hestia-pro-is02_**. La VPN es fa servir per a la sincronització entre l’Hèstia i Footprints, per a l’enviament dels correus i per a l’accés a la PCI.

Tots aquests usos són crítics per al bon funcionament de l’Hèstia i és molt important que les connexions VPN estiguin operatives en tot moment.

*   Servidor de gestió **_hestia-pro-gs01_** (servidor de gestió). La VPN s’utilitza per sincronitzar el backup de la BD amb l’entorn de DR que tenim al CPD de l’AOC. A diferència de les altres 2 connexions VPN de l’apartat anterior, aquest ús no és crític per al bon funcionament de l’Hèstia tot i que és molt recomanable que també estigui operativa.

Malauradament no és possible iniciar el client VPN de forma automatitzada (tot i que es pot configurar el client _OpenVPN_ com a servei de Windows i configurar-ho per executar-se de forma automatitzada a l’inici del servidor, en la pràctica la targeta de xarxa no acaba d’arrencar correctament i tot i que la connexió VPN s’estableix, no arriba a enrutar cap paquet). Per aquest motiu cada vegada que es reinicia algun d’aquests 3 servidors, caldrà iniciar manualment el client _OpenVPN_ d’acord amb el procediment que a continuació s’especifica:

Executar el client OpenVPN que es troba a l’escriptori, com a administrador:

![](attachments/34505255/34505344.png)

1.  Connectar la VPN mitjançant la icona que apareix al costat del rellotge de Windows:  
    ![](attachments/34505255/34505345.png)
2.  Apareixerà una nova finestra i caldrà esperar a veure el _Successful_:
    
    ![](attachments/34505255/34505346.png)
3.  Comprovar que la connexió VPN estigui establerta:
    
    Test VPN
    
    Tenir en compte a l'hora de la revisió:
    
    Si nosaltres no hem iniciat la sessió de la VPN no veurem amb el nostre usuari que la VPN estigui iniciada (pas a).
    
    Per realitzar les proves i saber que la VPN funciona hem de fer els pings de les ips que es detallen en el pas b.
    
      
    
    1.  Comprovar que el client estigui connectat:  
        ![](attachments/34505255/34505347.png)
    2.  Comprovar el ping a algunes de les IPs següents:
        
        serveis3 
        
        10.127.4.60
        
        serveis3 
        
        10.127.4.61
        
        relay.aoc.cat 
        
        10.127.4.90
        
        Footprints
        
        10.127.1.73
        
        EACAT
        
        10.127.1.251
        
        Hèstia 
        
        10.127.1.225
        
    
      
    

**NOTES**: Si hi hagués qualsevol problema amb la connexió, ja sigui perquè no s’obté el _Successful_ o perquè no s’arriba als PING, encara que el client aparegui com a _Connected_, cal seguir els següents passos:

1.  Desconnectar el client VPN:  
    ![](attachments/34505255/34505348.png)
    
2.  Obrir les Propietats de la targeta de xarxa de la VPN:  
    ![](attachments/34505255/34505349.png)
    
3.  Tanquem les Propietats, sense fer-hi cap canvi:
    
    ![](attachments/34505255/34505350.png)
    
4.  Connectem de nou el client VPN:
    
    ![](attachments/34505255/34505351.png)

  

5\. Reinici dels AD:

TODO!!!!

Matriu d'escalats

Davant la situació d’Incidència CRÍTICA/BLOQUEJANT, s’haurà de TRUCAR al CSC i en paral·lel enviar un correu; així es podrà agilitzar la gestió:

*   Telèfon: 93 480 61 66
*   Correu: [csc@mdcloud.es](mailto:csc@mdcloud.es)

Si no es pogués contactar amb el **CSC**, hauríem de trucar al següent nivell d'escalat, seguint la següent matriu:

![](attachments/34505255/34505258.png)

  

En enviar un correu elèctronic haurem d'indicar a la capçalera del missatge: **<Tipologia> <Client> <servei> <Entorn> <Descripció>** on:

*   **Tipologia:**
    *   **INC**: incidència
    *   **PET**: petició
    *   **CON**: consulta.
*   **Client** → Nom Client
*   **Servei** → AOC\_HÈSTIA
*   **Entorn:**
    *   **PRE**: Preproducció
    *   **PRO**: Producció

Configuracions

En cas que vulguem accedir al servei Hèstia com fan els usuaris, haurem de descarregar i instal·lar el client de l’Hèstia seguint els següents passos:

1.  Accedir a [http://hestia.aoc.cat/](http://hestia.aoc.cat/)
    
2.  Descarregar l'aplicació  
    ![](attachments/34505255/34505261.png)
3.  Obrir l'executable  
    ![](attachments/34505255/34505262.png)
4.  Instal·lar  
    ![](attachments/34505255/34505263.png)![](attachments/34505255/34505264.png)
5.  Accedir amb les credencials  
    ![](attachments/34505255/34505265.png)  
      
    

Accedir amb les següents dades (es tracta de la BD de formació que no conté cap dada real i podeu accedir sense problemes):

*   Entitat: **FORMACIO**
*   Usuari: **sonda**
*   Contrasenya: **gfr345AsAD** (Es pot canviar en qualsevol moment dins l’Hèstia o bé en la pantalla de login fent clic a “He oblidat la contrasenya”).

Per motius de seguretat, cap dels servidors (ni tan sols els frontals) disposa d’**IP pública**. Per poder realitzar qualsevol gestió sobre l’Hèstia s’ha d’accedir via **escriptori remot** a qualsevol dels 2 servidors de gestió que estan habilitats per a aquest propòsit: **_hestia-pro-gs01_** i **_hestia-pro-gs02_**.

Aquests 2 servidors actuen com a porta d’entrada a tota la infraestructura de l'Hèstia (**AD**, **BD**, **IIS**).

Només és possible accedir als servidors de gestió accedint des de la I**P pública d’oficines de l’AOC**. Això implica que si es requereix accedir-hi estant fora de l’oficina de l’AOC, s’haurà de tenir connectada la **VPN amb la xarxa de l’AOC**.

En l'àmbit lògic, l’Hèstia està format per 3 components principals (2 servidors per cada component lògic):

*   **Frontal IIS 10 (IIS)**
*   **Active Directory (AD)**
*   **Base de dades SQL Server 2016 (BD)**

Per accedir als servidors ho haurem de fer a través de dos **servidors de gestió**:

*   **hestia-pro-gs01**
*   **hestia-pro-gs02**

A continuació presentem un esquema de la infraestructura de l'Hèstia i la manera d'accedir als seus components:

![](attachments/34505255/34505280.png)

1.  Per accedir als servidors de gestió, haurem d'utilitzar l'escriptori remot...  
      
    **_a) Obrim l'aplicació de connexió remota:_**
    
    ![](attachments/34505255/36340017.png)
    
    **_b) La IP dels servidors són:_**
    
    **node1**: 40.127.138.8  
    **node2**: 13.79.132.169
    

Introduirem la IP del node al qual ens volem connectar. **_I farem click a connectar._**

**_c) Indiquem les credencials:_**

  

**Usuari**: Cada un té un usuari nominal que ens va crear el departament de sistemes.

Important: Davant de l'usuari hem d'indicar el domini _HESTIA_→ Ex: HESTIA\\agonzalez

  

**Password**: Si es la primera vegada que accedim hem de introduir el password que ens van donar quan ens van crear l'usuari nominal.

  

Exemple:

![](attachments/34505255/36340018.png)

_**d) Seguidament acceptem i ens connectarem al servidor.**_

e) En el cas que sigui el primer cop que ens connectem al servidor, haurem de canviar la contrasenya.

*   Anem a Control Panel\\User Accounts\\User Accounts
*   Veurem que en aquesta finestra ens diu que fem Ctrl+Alt+Del, però al estar en connexió remota no ens funcionarà.  
    En el nostre cas fem: Ctrl + Alt + Fin (Si no funciona, feu Ctrl + Alt + Fn+ Fin )
*   Se'ns mostrarà una pantalla blava amb diferents opcions, nosaltres farem Change a password:  
    ![](attachments/34505255/36340019.png)  
    ALERTA: El teclat esta en anglès, penseu que els caràcters especials són diferents.

1.  Per accedir a la **BD**, es pot accedir directament amb el client **SQL Server Management** que hi ha instal·lat a qualsevol dels 2 servidors de gestió:
    
    ![](attachments/34505255/34505279.png)
    
2.  Per accedir als **AD**, també es pot fer des dels servidors de gestió:  
    ![](attachments/34505255/34505281.png)  
      
    
3.  Per accedir als IIS...  
    TODO!!!!!
    

Informació addicional

[AOC\_Hèstia - Model de relació V1.pdf](attachments/34505255/34505259.pdf)

[Hèstia - procediment resolució d’incidències habituals V2.docx](attachments/34505255/34505260.docx)

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2020-1-4\_20-43-8.png](attachments/34505255/34505256.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_12-32-43.png](attachments/34505255/34505258.png) (image/png)  
![](images/icons/bullet_blue.gif) [AOC\_Hèstia - Model de relació V1.pdf](attachments/34505255/34505259.pdf) (application/pdf)  
![](images/icons/bullet_blue.gif) [Hèstia - procediment resolució d’incidències habituals V2.docx](attachments/34505255/34505260.docx) (application/vnd.openxmlformats-officedocument.wordprocessingml.document)  
![](images/icons/bullet_blue.gif) [image2019-11-12\_16-6-19.png](attachments/34505255/34505261.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-12\_16-8-3.png](attachments/34505255/34505262.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-12\_16-7-49.png](attachments/34505255/34505263.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-12\_16-7-53.png](attachments/34505255/34505264.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-12\_16-8-13.png](attachments/34505255/34505265.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_13-5-56.png](attachments/34505255/34505279.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_13-7-16.png](attachments/34505255/34505280.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_13-11-56.png](attachments/34505255/34505281.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_13-34-20.png](attachments/34505255/34505291.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_13-34-35.png](attachments/34505255/34505292.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_13-36-34.png](attachments/34505255/34505293.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_13-36-48.png](attachments/34505255/34505294.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_13-40-23.png](attachments/34505255/34505296.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_13-40-41.png](attachments/34505255/34505297.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_15-1-13.png](attachments/34505255/34505336.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_15-1-23.png](attachments/34505255/34505337.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_15-1-37.png](attachments/34505255/34505338.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_15-17-55.png](attachments/34505255/34505344.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_15-18-9.png](attachments/34505255/34505345.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_15-19-59.png](attachments/34505255/34505346.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_15-20-13.png](attachments/34505255/34505347.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_15-22-19.png](attachments/34505255/34505348.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_15-22-25.png](attachments/34505255/34505349.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_15-22-35.png](attachments/34505255/34505350.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_15-22-59.png](attachments/34505255/34505351.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-24\_15-23-29.png](attachments/34505255/34505352.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-12\_19-59-11.png](attachments/34505255/36340016.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-12\_20-0-37.png](attachments/34505255/36340017.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-12\_20-8-32.png](attachments/34505255/36340018.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-12\_20-16-1.png](attachments/34505255/36340019.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:06

[Atlassian](http://www.atlassian.com/)