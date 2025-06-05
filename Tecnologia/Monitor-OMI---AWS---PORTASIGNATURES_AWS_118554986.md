Suport Tècnic : Monitor OMI - AWS - PORTASIGNATURES\_AWS  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [03 - Monitorització - Revisions globals](26313327.html)
4.  [Monitors OMI (CTTI)](26313608.html)
5.  [AWS](AWS_100008616.html)

Suport Tècnic : Monitor OMI - AWS - PORTASIGNATURES\_AWS
========================================================

Created by Oriol Bernal, last modified on 11 December 2024

8X5FUNCIONARI

Tipus: **8x5**

Accés: **Funcionari**

Documents enviats al CTTI: Consorci Administració Oberta de Catalunya\\Operacions - Documentos\\General\\SUPORT\_TECNIC\\MONITORITZACIO\\Monitors CTTI\\1- Circuits ENVIATS\\circuits\\AWS\\PORTASIGNATURES\_AWS

Creació: ST-24586

**CIRCUIT**

Aquesta sonda realitza les següents accions:

1.  Carregar l'URL: [https://portasignatures.aoc.cat/inbox/app/consorciaoc/index.jsf](https://portasignatures.aoc.cat/inbox/app/consorciaoc/index.jsf "https://portasignatures.aoc.cat/inbox/app/consorciaoc/index.jsf") i esperar un codi 200  
    ![](attachments/118554986/118555007.png)
2.  Clicar sobre "**Entrar amb certificat local**"**  
    ![](attachments/118554986/118555008.png)  
    **
3.  Selecciona l'opció Autenticar amb navegador (requereix Java), descarregar el .JNLP i executar-lo
    
      
    El circuit del CTTI signa amb JNLP.  
    ![](attachments/118554986/118555010.png)![](attachments/118554986/118555011.png)
    
    Respecte a les opcions que s'ofereixen:
    
    *   [Autenticar amb navegador (requereix Java)](https://portasignatures.aoc.cat/viafirma/tokenConnector?clientId=6DCB2023110B2763A4BFA6C52065AECC&token=AES_QFKFK27NT1733909339116&op=auth&return_to=https%3A%2F%2Fportasignatures.aoc.cat%2Finbox%2Fapp%2Fconsorciaoc%2Fapp%2Fconsorciaoc%2Findex.jsf%3FactionMethod%3Dindex.xhtml%253Aidentity.login%26X509%3Dtrue%26cid%3Dbd4008a2-999c-4f14-89fa-f21cc0aa274d) → Els navegadors nous ja no ho suporten de manera nativa, i oracle ho ha discontinuat a partir de Java 11.
        
        *   Si el navegador ens bloqueja el .JNLP, podem obrir  un **cmd**, anar a la carpeta de descàrregues i executar:
            
            javaws viafirma-client-desktop.jnlp
            
            (Si el nom de l'arxiu té algun espai o parèntesi pot donar problemes)
            
    
    *   [Autenticar amb viafirma desktop](https://portasignatures.aoc.cat/viafirma/tokenConnector?clientId=6DCB2023110B2763A4BFA6C52065AECC&token=AES_QFKFK27NT1733909339116&op=auth&return_to=https%3A%2F%2Fportasignatures.aoc.cat%2Finbox%2Fapp%2Fconsorciaoc%2Fapp%2Fconsorciaoc%2Findex.jsf%3FactionMethod%3Dindex.xhtml%253Aidentity.login%26X509%3Dtrue%26cid%3Dbd4008a2-999c-4f14-89fa-f21cc0aa274d) → Requereix aplicació instal·lada en local.
        
    
      
    
4.  Executar l'aplicació i validar que apareix un selector de certificats  
    ![](attachments/118554986/118555013.png)![](attachments/118554986/118555014.png)  
      
    
5.  Seleccionar el certificat de proves (que sigui vàlid) i verificar que accedim a l'aplicació del portasignatures:  
    ![](attachments/118554986/118555016.png)![](attachments/118554986/118555017.png)  
    
6.  Validar el text: No s'han trobat peticions en la safata seleccionada  
    ![](attachments/118554986/118555018.png)  
    

**PROCEDIMENT**

Haurem d'obrir un tiquet a Claranet (proveïdor) perquè ho revisin i ens indiquin que ha passat: 

*   Plataforma d'obertura de tiquets de Claranet: [https://online.claranet.es/ticketing](https://online.claranet.es/ticketing)
*   Posar en còpia a [suporttecnic@aoc.cat](mailto:suporttecnic@aoc.cat)

  

Información Obligatoria Tiquets Claranet

Segons si el tiquet és de **Sistemes** o de **Xarxa**, s'ha d'indicar la següent informació que indiquem més a baix, i en el comentari copiem si es tracta d'un problema de Sistemes o de Xarxes.

Si es pot incorporar captures de pantalla i proves, molt millor, així com redactar el tiquet en **castellà**.

**Sistemas:**

*   Aplicación afectada:
*   Fecha y hora de inicio del problema:
*   Impacto en negocio:
*   Persona responsable de contacto de AOC:
*   Test realizados
    *     Comportamiento anómalo detectado
    *     Evidencias del error alertado (sonda, servicio integrador...) Si es una sonda, el detalle de que comprueba la sonda.

**Redes**

*   Aplicación afectada:
*   Fecha y hora de inicio del problema:
*   Impacto en negocio:
*   Persona responsable de contacto de AOC:
*   Test realizados
*   IP origen o servidor origen donde no hay conectividad
    *   IP destino o servidor al que no se accede
    *   Si es un servidor, enviar resultado de MTR o TRACEPATH
    *   ¿Es intermitente o constante?

**NOTA:** En el cas de les guàrdies de 24x7, quan creiem que sigui necessari fer un **redeploy** o **reinici** del servei, s'ha d'indicar.

Un cop obert el tiquet a Claranet, i sempre que sigui horari de **24x7** (o sigui, fora de l'horari d'oficina) s'ha de trucar a un d'aquests números i avisar de l'obertura del tiquet: Tel: **+34 934 452 699 / +34 933 933 991**

  

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2024-10-17\_16-28-20.png](attachments/118554986/118554987.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-17\_10-52-56.png](attachments/118554986/118554988.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-17\_17-8-55.png](attachments/118554986/118554989.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-14-22.png](attachments/118554986/118554990.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-14-47.png](attachments/118554986/118554991.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-14-57.png](attachments/118554986/118554992.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-15-25.png](attachments/118554986/118554993.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-16-6.png](attachments/118554986/118554994.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-16-30.png](attachments/118554986/118554995.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-16-42.png](attachments/118554986/118554996.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-16-55.png](attachments/118554986/118554997.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-17-27.png](attachments/118554986/118554998.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-17-36.png](attachments/118554986/118554999.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-18-14.png](attachments/118554986/118555000.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-19-6.png](attachments/118554986/118555001.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-20-8.png](attachments/118554986/118555002.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-4-12\_12-22-28.png](attachments/118554986/118555003.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-4-12\_12-25-24.png](attachments/118554986/118555004.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-4-12\_12-25-37.png](attachments/118554986/118555005.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-4-12\_12-26-50.png](attachments/118554986/118555006.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-12-11\_10-27-18.png](attachments/118554986/118555007.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-12-11\_10-28-39.png](attachments/118554986/118555008.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-12-11\_10-32-7.png](attachments/118554986/118555009.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-12-11\_10-43-56.png](attachments/118554986/118555010.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-12-11\_10-44-36.png](attachments/118554986/118555011.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-12-11\_10-50-40.png](attachments/118554986/118555012.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-12-11\_10-50-52.png](attachments/118554986/118555013.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-12-11\_10-51-47.png](attachments/118554986/118555014.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-12-11\_11-2-44.png](attachments/118554986/118555016.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-12-11\_11-4-28.png](attachments/118554986/118555017.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-12-11\_11-4-58.png](attachments/118554986/118555018.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:05

[Atlassian](http://www.atlassian.com/)