Suport Tècnic : RDBMS PCIv2 - Recrear  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [04 - Tècnica de sistemes + 24x7 + Padró](26313202.md)
4.  [FAQs Infraestructura](FAQs-Infraestructura_26313593.md)

Suport Tècnic : RDBMS PCIv2 - Recrear
=====================================

Created by Unknown User (otecobernal) on 19 June 2020

  

  

**PORTALS BEA**:  

1.  **PRO**
    1.  APP: [http://10.120.1.21:8101/wliconsole/main](http://10.120.1.21:8101/wliconsole/main)
    2.  IOP: [http://10.120.1.20:8001/wliconsole/main](http://10.120.1.20:8001/wliconsole/main)
2.  **PRE**
    1.  APP: [http://10.120.2.81:8101/wliconsole/main](http://10.120.2.81:8101/wliconsole/main)
    2.  IOP: [http://10.120.2.80:8001/wliconsole/main](http://10.120.2.80:8001/wliconsole/main)

Pas a pas:  

1.  Crear JIRA en plataforma de l'AOC, on informarem:
    1.  Captura de pantalla del Abans/Despres de la nostra actuació, tant com està format el **RDBMS** com l'estat del sql (consulta dels registres pendents/error), podem utilitzar d'exemple **[aquest Jira](https://contacte.aoc.cat/browse/ST-5555)**  
        ![](attachments/41517709/41517724.png)
2.  Identificar que hem de procedir a [**reiniciar el RDBMS**](/pages/createpage.action?spaceKey=SII&title=Eliminar+3&linkCreation=true&fromPageId=41517709)
3.  **[Comprovem el pre/post reinici del RDMS en concret](/pages/createpage.action?spaceKey=SII&title=RDBMS&linkCreation=true&fromPageId=41517709)**
4.  Anem al portal BEA corresponent al RDBMS a reiniciar (podem veure la **[taula d'equivalències](/pages/createpage.action?spaceKey=SII&title=RDBMS&linkCreation=true&fromPageId=41517709)**)
5.  Ja dins del **BEA**, accedir a **Event Generators** ![](attachments/41517709/41517728.png)
6.  Apartat **RDBMS** ![](attachments/41517709/41517726.png)
7.  Cercar el **RDBMS** del camp de search ![](attachments/41517709/41517725.png)
8.  Accedir al **RDBMS** i fer captura de pantalla/ tenir altra pestanya des del navegador web per tenir-lo per com backup i després poder crear-lo de nou:![](attachments/41517709/41517721.png)  
      
    ![](attachments/41517709/41517718.png)  
      
    ![](attachments/41517709/41517717.png)  
    Agafem Captura de pantalla de com està configurat el **RDBMS** per tenir-lo després a l'hora de crear-lo de nou:  
      
    ![](attachments/41517709/41517716.png)  
      
    
9.  Obrir finestra nova del navegador web per eliminar el **RDBMS**, igual anem a l'apartat del RDBMS (punts dels 4 al 7), i donar al botó Delete i esperar que finalitzi el procés  
    ![](attachments/41517709/41517715.png)  
      
    
10.  Un cop eliminat el **RDBMS**, el creem de nou des de l'apartat de **Create New**:  
    ![](attachments/41517709/41517714.png)  
    Possem el mateix nom que tenia al camp **Generator Name** i el camp JMS Connection Factory JNDI Name **el deixem per defecte**  
      
    ![](attachments/41517709/41517713.png)  
    ![](attachments/41517709/41517712.png)
11.  Omplim els camps com tenim a l'altre finestre background, o la captura de pantalla  
    ![](attachments/41517709/41517711.png)
12.  Ja teneim recreat el **RDBMS,** ja podem tancar el JIRA
13.  Fer validacions que els registres s'estan tractant i baixant, si no és així estudiar la possibilitat de fer update del camp reintent/estat

Si al recrear algun RDBMS i ens dóna algun error revisar les FAQs

**QUE FER SI EL RDBMS QUEDA EN SUSPENDED**

Si en recrear el RDBMS el status queda com SUSPENDED:

![](attachments/41517709/41517710.png)

Hem de reiniciar els nodes en ordre → [BEA8 - Procediments](/pages/createpage.action?spaceKey=SII&title=BEA8+-+Procediments&linkCreation=true&fromPageId=41517709)

**QUE FER SI DA ERROR A ELIMINAR UN RDBMS**

Si a l'hora d'eliminar un RDBMS des de la wliconsole es retorna un error tipus:

This page displays a list of RDBMS Event Generators. To view or edit details about the Event Generator, click the Generator name. To add an Event Generator, click 'Create New'.

Currently WebLogic Integration will only support a single instance of an integration cluster in a multi-clustered environment. This cluster must also be explicitly named in the WebLogic Integration configuration file. Please correct this and try again.

Hem de seguir aquest procediment → [PROBLEM#Error al eliminar un RDBMS](#)  

Recordar que amb la posada en marxa en PCI3, trobem alguns RDBMS que no es troben en els portals del wliconsole, sinó en altre, per més info → [RDBMS PCIv3](/pages/createpage.action?spaceKey=SII&title=RDBMS+PCIv3&linkCreation=true&fromPageId=41517709)

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2018-3-9\_13-14-51.png](attachments/41517709/41517710.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-39-55.png](attachments/41517709/41517711.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-37-14.png](attachments/41517709/41517712.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-34-31.png](attachments/41517709/41517713.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-31-58.png](attachments/41517709/41517714.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-29-16.png](attachments/41517709/41517715.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-25-8.png](attachments/41517709/41517716.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-24-2.png](attachments/41517709/41517717.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-23-4.png](attachments/41517709/41517718.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-21-54.png](attachments/41517709/41517719.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-21-37.png](attachments/41517709/41517720.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-19-49.png](attachments/41517709/41517721.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-19-38.png](attachments/41517709/41517722.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-19-13.png](attachments/41517709/41517723.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-16-7.png](attachments/41517709/41517724.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-12-5.png](attachments/41517709/41517725.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-9-51.png](attachments/41517709/41517726.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-9-34.png](attachments/41517709/41517727.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-10-17\_13-6-44.png](attachments/41517709/41517728.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:17

[Atlassian](http://www.atlassian.com/)