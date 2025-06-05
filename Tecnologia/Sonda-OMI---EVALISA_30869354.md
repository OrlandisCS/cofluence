Suport Tècnic : Sonda OMI - EVALISA  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [03 - Monitorització - Revisions globals](26313327.html)
4.  [Monitors OMI (CTTI)](26313608.html)

Suport Tècnic : Sonda OMI - EVALISA
===================================

Created by Unknown User (otecagonzalez), last modified by OTEC ST Robert Font Rubí on 21 July 2023

SERVEI 24X7

  

Circuit que realitza la sonda

**Amb aquest circuit es valida l’accés al portal del empleat públic del servei eValisa emprant com a mecanisme d’autenticació un usuari i contrasenya.**

**_Captura_**

**_Descripció_**

**Pas 1: Accés al portal**

![](attachments/30869354/64980001.png)

Carregar la URL

   [http://idpeacat.gencat.cat/group/1/valisa](http://idpeacat.gencat.cat/group/1/valisa "http://idpeacat.gencat.cat/group/1/valisa")

Revisar el text “Accés amb credencials corporatives”

**Pas 2: Login**

![](attachments/30869354/64980003.png)

A la caixa de login, introduir l’usuari VALIS01 i la contrasenya facilitada, i clicar “Accedeix”.

Podem trobar les credencials a: _(Sharepoint) Tecnologia - SUPORT\_TECNIC\\MONITORITZACIO\\Monitors CTTI\\2- Certificat i credencials Sondes_

  

(Actualment, tenim user amb **_VALIS01_** pass **_9Vxf8XHY6g_**)

**Pas 3: Llistat de valises**

![](attachments/30869354/64980005.png)

  Esperar un _HTTP 200 ok_ i comprovar el text “Safata” 

  

Màquines a revisar en cas de caiguda

Plataforma e-VALISA
-------------------

e-VALISA està desplegada en el PL6, podem seguir passes de restabliment del Liferay6:

### [EACAT - PL6 - Revisió](41520634.html)

### [EACAT - PL6 - Reinici](EACAT---PL6---Reinici_41520633.html)

Logs e-VALISA
-------------

En les màquines liferay6 → cd /apps/tomcat/logs/valisa.log

  

Procediment

Mal funcionament amb el WS de GICAR
-----------------------------------

Si aquest WS no estigués disponible, els usuaris no podran accedir a l’eValisa i no seria pas un problema de la nostra infraestructura.

Si el WS no funcionés, caldria posar-se en contacte amb GICAR (CTTI).

Per comprovar-ho podem llençar el següent SoapUI: [eValisa\_GICAR.rar](attachments/30869354/36341042.rar)

executar SoapUI

Llencem el Test Step CU3 - Consulta per NIF.

Important informar l'endpoint de PRO I l'usuari per fer proves a PRO és: VALIS01 → Informar-lo com si fos el NIF

![](attachments/30869354/41520479.png)

  

Revisar logs valisa
-------------------

Revisar logs Valisa, veiem si detectem algun error: /apps/tomcat/logs/valisa.log (PL6)

Revisar l'estat del Liferay (PL6)
---------------------------------

Revisarem el Liferay, ja que Valisa està allà desplegat. Si cal, podem reiniciar-lo

Podem seguir la FAQ: 

### [EACAT - PL6 - Revisió](41520634.html)

### [EACAT - PL6 - Reinici](EACAT---PL6---Reinici_41520633.html)

  

Error 500 - Cas excepcional

Problemes amb idpeacat.gencat.cat
---------------------------------

En cas de detectar: Error interno del servidor (Error 500), en [http://idpeacat.gencat.cat/group/1/valisa](http://idpeacat.gencat.cat/group/1/valisa). 

Revisar la FAQ: [VALISA - Problemes idpeacat](VALISA---Problemes-idpeacat_93356763.html)

  

  

Feedback

ORA-01652: unable to extend temp segment by 128 in tablespace TEMP

ERROR:

19/12/2019 16:19:10 \[ERROR\] ValisaPortlet - \[render\] Error en la generaciÃÂ³ del menu principal: ORA-01652: unable to extend temp segment by 128 in tablespace TEMP
ORA-06512: at "LR6SERVEIS.PKG\_VALISA\_62", line 121

> [https://contacte.aoc.cat/browse/PRJ-4251](https://contacte.aoc.cat/browse/PRJ-4251)

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2019-12-16\_16-24-39.png](attachments/30869354/30869356.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-1-3\_12-9-39.png](attachments/30869354/30869358.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-1-3\_12-9-48.png](attachments/30869354/30869359.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-1-3\_12-9-57.png](attachments/30869354/30869360.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-1-3\_12-10-8.png](attachments/30869354/30869361.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-1-3\_12-10-19.png](attachments/30869354/30869362.png) (image/png)  
![](images/icons/bullet_blue.gif) [ServeisComuns\_DirectoriCorporatiu-soapui-project.zip](attachments/30869354/36341041.zip) (application/zip)  
![](images/icons/bullet_blue.gif) [image2020-4-24\_14-32-27.png](attachments/30869354/36341039.png) (image/png)  
![](images/icons/bullet_blue.gif) [ServeisComuns\_DirectoriCorporatiu-soapui-project.zip](attachments/30869354/36341036.zip) (application/zip)  
![](images/icons/bullet_blue.gif) [eValisa\_GICAR.rar](attachments/30869354/36341043.rar) (application/octet-stream)  
![](images/icons/bullet_blue.gif) [eValisa\_GICAR.rar](attachments/30869354/36341042.rar) (application/octet-stream)  
![](images/icons/bullet_blue.gif) [image2020-4-24\_14-43-54.png](attachments/30869354/36341044.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-1-26\_15-25-6.png](attachments/30869354/41520474.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-1-26\_15-25-29.png](attachments/30869354/41520475.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-1-26\_15-25-37.png](attachments/30869354/41520476.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-1-26\_15-25-47.png](attachments/30869354/41520477.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-1-26\_15-26-0.png](attachments/30869354/41520478.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-1-26\_15-28-53.png](attachments/30869354/41520479.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-3\_10-48-11.png](attachments/30869354/64980001.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-3\_10-48-40.png](attachments/30869354/64980002.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-3\_10-48-51.png](attachments/30869354/64980003.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-3\_10-51-41.png](attachments/30869354/64980005.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:06

[Atlassian](http://www.atlassian.com/)