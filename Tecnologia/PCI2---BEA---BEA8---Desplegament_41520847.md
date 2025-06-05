Suport Tècnic : PCI2 - BEA - BEA8 - Desplegament  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [04 - Tècnica de sistemes + 24x7 + Padró](26313202.html)
4.  [Plataformes](Plataformes_41520520.html)
5.  [PCI2 - BEA - BEA8](PCI2---BEA---BEA8_41520845.html)

Suport Tècnic : PCI2 - BEA - BEA8 - Desplegament
================================================

Created by Unknown User (otecobernal), last modified by David Tejada Admin on 10 June 2021

Si despleguem al BEA...

Quan despleguem al BEA és molt possible que haguem de fer després aquest procediment: [VO - DCOC - FLUX DE SERVEI - Timer de descàrrega de documents](36341383.html)

Si no tenim prou coneixement, comentar-ho internament una vegada haguem finalitzat el desplegament

Accedim a WebLogic Integration Administration Console
-----------------------------------------------------

*   PRO:
    *   APP → [http://10.120.1.21:8101/wliconsole/main](http://10.120.1.21:8101/wliconsole/main)
    *   IOP → [http://10.120.1.20:8001/wliconsole/main](http://10.120.1.20:8001/wliconsole/main)
*   PRE:
    *   APP → [http://10.120.2.81:8101/wliconsole/main](http://10.120.2.81:8101/wliconsole/main)
    *   IOP → [http://10.120.2.80:8001/wliconsole/main](http://10.120.2.80:8001/wliconsole/main)

Totes les credencials les podem trobar al keepass.

Un cop hem accedit haurem d'eliminar els processos en _**aborted**._ Accedim a **_Process Instance Monitoring_**

![](attachments/41520847/41522310.png)

Al menú de l'esquerra cliquem en _**Advanced Search**_

_**![](attachments/41520847/41522311.png)**_

S'obrirà una pàgina com aquesta:

_**![](attachments/41520847/41522312.png)  
**_

Haurem de posar en els camps **_Service URI_** i **_Status_** el que es veu a la imatge i prémer **_Submit_**.

Apareixerà un llistat amb els _**aborteds.**_

Ens hem de fixar quants elements surten per pàgina. Recomanem que apareguin uns 500 o 1000 per pàgina. Quan es reinicia l’admin, en moltes ocasions es queda per defecte en 50. Per tant, feu el canvi i torneu a fer la cerca.

![](attachments/41520847/41522313.png)

Els marquem tots i anem al final de la pàgina i premem **_Terminate._** Ho haurem d’anar fent amb totes les pàgines.

Backup

Un cop fet això haurem de fer el backup del paquet a desplegar

Depenent d'on volem desplegar, el paquet es trobarà en una màquina o un altre.

**Clúster IOP PRO →** **Node1** (10.120.1.20 - aoc-l-app1) - _/apps/bea/beaplat/user\_projects/domains/PCIDomain/PCIAdmin/upload_

**Clúster APP PRO →** **Node2** (10.120.2.21 - aoc-l-app2) - _/apps/bea/beaplat/user\_projects/domains/AppDomain/AppAdmin/upload_

**Clúster IOP PRE →** **Node1** (10.120.1.80 - aoc-l-app1-pre) - _/apps/bea/beaplat/user\_projects/domains/PCIDomain/PCIAdmin/upload_

**Clúster APP PRE →** **Node2** (10.120.2.81 - aoc-l-app2-pre) - _/apps/bea/beaplat/user\_projects/domains/AppDomain/AppAdmin/upload_

Desplegament del nou paquet
---------------------------

Per desplegar paquets en BEA 8 anirem al Administration Console del BEA 8

*   PRO:
    *   APP → [http://10.120.1.21:8101/console/login/LoginForm.jsp](http://10.120.1.21:8101/console/login/LoginForm.jsp)
    *   IOP → [http://10.120.1.20:8001/console/login/LoginForm.jsp](http://10.120.1.20:8001/console/login/LoginForm.jsp)
*   PRE:
    *   APP → [http://10.120.2.81:8101/console/login/LoginForm.jsp](http://10.120.2.81:8101/console/login/LoginForm.jsp)
    *   IOP → [http://10.120.2.80:8001/console/login/LoginForm.jsp](http://10.120.2.80:8001/console/login/LoginForm.jsp)

Si es tracta d'un arxiu amb l'extensió **.ear** l'hem de localitzar a _Deployments_ → _Applications_

![](attachments/41520847/41522314.png)

Aquí trobarem totes les aplicacions desplegades.

![](attachments/41520847/41522315.png)

Si es tracta d'un webapp d'administració l'hem de localitzar a _Deployments_ → _Web Application Modules_

![](attachments/41520847/41522316.png)

Aquí trobarem tots els mòduls desplegats.

![](attachments/41520847/41522317.png)

Accedim al mòdul/aplicació que volem desplegar, per exemple **prjTramitsPICA.**

![](attachments/41520847/41522318.png)

Accedim a la pestanya _Deploy_ i premem a _Stop Aplication._

![](attachments/41520847/41522319.png)

Al cap d'uns segons la columna _Deployment Status_ hauria de canviar a _Unavailable._

![](attachments/41520847/41522320.png)

Un cop la columna _Deployment Status_ ha canviat a _Unavailable_ anem _Targets_ i deixem tots els camps buits. (Es recomana fer captura per recordar com estava)

![](attachments/41520847/41522321.png)  

Després haurem de tornar al menú on són totes les aplicacions i esborrar-la.

![](attachments/41520847/41522322.png)

Sense sortir d'aquesta pàgina fem clic a _Deploy a new Aplication_.

![](attachments/41520847/41522323.png)  

Fem click a upload your file(s).

![](attachments/41520847/41522324.png)

Seleccionarem l'arxiu a desplegar:

![](attachments/41520847/41522325.png)

Un cop cliquem a upload, ens deixarà configurar-ho, haurem de posar tot com estava abans.

Finalment ens assegurem que:

![](attachments/41520847/41522326.png)

Validacions internes.

Hi han dues maneres diferents de realitzar les validacions:

*   A nivell de fitxers → Revisar que tots els fitxers i carpetes s'han modificat correctament
*   Validació JIRA → Realitzar validació que indiquen al JIRA →  Normalment s'encarrega l'OT

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2019-11-25\_11-45-37.png](attachments/41520847/41522310.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-25\_11-47-25.png](attachments/41520847/41522311.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-25\_11-48-37.png](attachments/41520847/41522312.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-5-6\_11-15-59.png](attachments/41520847/41522313.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-25\_12-3-48.png](attachments/41520847/41522314.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-25\_12-4-36.png](attachments/41520847/41522315.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-25\_12-8-9.png](attachments/41520847/41522316.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-25\_12-8-50.png](attachments/41520847/41522317.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-5-6\_11-24-56.png](attachments/41520847/41522318.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-5-6\_11-27-17.png](attachments/41520847/41522319.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-1-18\_12-5-43.png](attachments/41520847/41522320.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-5-6\_11-28-29.png](attachments/41520847/41522321.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-5-6\_11-29-46.png](attachments/41520847/41522322.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-11-25\_12-18-10.png](attachments/41520847/41522323.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-2-15\_13-0-44.png](attachments/41520847/41522324.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-2-15\_13-1-11.png](attachments/41520847/41522325.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-2-15\_13-2-25.png](attachments/41520847/41522326.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:16

[Atlassian](http://www.atlassian.com/)