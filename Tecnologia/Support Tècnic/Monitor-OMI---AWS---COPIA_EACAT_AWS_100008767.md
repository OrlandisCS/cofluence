Suport Tècnic : Monitor OMI - AWS - COPIA\_EACAT\_AWS  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [03 - Monitorització - Revisions globals](26313327.md)
4.  [Monitors OMI (CTTI)](26313608.md)
5.  [AWS](AWS_100008616.md)

Suport Tècnic : Monitor OMI - AWS - COPIA\_EACAT\_AWS
=====================================================

Created by Oriol Bernal, last modified by OTEC ST Robert Font Rubí on 21 May 2024

8X5FUNCIONARI

  

El servei depen del SSC ⚠ per aquest motiu, **caldrà revisar si el problema és només de COPIA o si en cas contrari, es tracta d'un assumpte que afecti TrustedX.**

Tipus: **8x5**

Accés: **Funcionari**

Documents enviats al CTTI: Consorci Administració Oberta de Catalunya\\Operacions - Documentos\\General\\SUPORT\_TECNIC\\MONITORITZACIO\\Monitors CTTI\\1- Circuits ENVIATS\\circuits\\AWS\\COPIA\_EACAT\_AWS

Creació:  [ST-21454](https://contacte.aoc.cat/browse/ST-21454?src=confmacro) - Data cannot be retrieved due to an unexpected error.

**CIRCUIT**

Aquesta sonda realitza les següents accions:

1.  Carregar l'URL: [https://eacat-cl.aoc.cat/copia?ensActiu=7996100001](https://eacat-cl.aoc.cat/copia?ensActiu=7996100001) i esperar un codi 200  
      
    
2.  Omplir el formulari de login amb l'usuari **sondaomi  
    ![](attachments/100008767/100008783.png)  
    **
3.  Carregar l’aplicació de COPIA i que accedim amb l’usuari **Sonda OMI** per l’**ENS DE FORMACIÓ A**  
    ![](attachments/100008767/100008784.png)
    
4.  Clicar sobre el botó per generar una còpia nova  
    ![](attachments/100008767/100008779.png)
5.  Escollir l’opció **Amb plantilla** i seleccionar la plantilla **PL\_monitor  
    ![](attachments/100008767/100008780.png)  
    **
6.  Clicar el botó **Generar còpia autèntica  
    ![](attachments/100008767/100008781.png)**
7.  Omplir el formulari de login amb les dades:
    
    *   Organ que expedeix la còpia: **ÒRGAN DE PROVA**
    *   Identificador del document original: **monitor OMI**
    
    ![](attachments/100008767/100008776.png)  
      
    
8.  Clicar el botó Generar  
    ![](attachments/100008767/100008774.png)
9.  Clicar el botó per pujar documents
    
    ![](attachments/100008767/100008775.png)
10.  Seleccionar el fitxer **test.pdf  
    ![](attachments/100008767/100008777.png)  
    **
11.  Clicar el botó Genera la còpia  
    ![](attachments/100008767/100008778.png)
12.  Validar que es carrega el PDF i clicar el botó **Cancel·la la sessió i descarta la còpia  
    ![](attachments/100008767/100008772.png)  
    **
13.  Tornem a la plana principal del còpia  
    ![](attachments/100008767/100008771.png)

**PROCEDIMENT**

Quan el SSC falli, COPIA no podrà generar signatures, per tant, haurem de revisar l'SSC per verificar que no és el causant dels problemes:

⚠ Revisió del SSC

**El servei fa servir el SSC per signar les còpies**

1.  Si en fer el circuit ens trobem amb l'error: **_S'ha sel·leccionat signatura amb segell però aquest no es troba registrat a la plataforma de signatura centralitzada  
    ![](attachments/100008767/100009225.png)_**Segurament hi haurà problemes al SSC  
      
    
2.  Revisar per quin entorn donem servei (MC o NX): [SSC - Revisions i Restabliment](SSC---Revisions-i-Restabliment_41521367.md)  
    ![](attachments/100008767/100009226.png)  
      
    
3.  Revisar l'estat de les sondes ÀUREA: [http://10.124.95.14:8080/monitors/home.do](http://10.124.95.14:8080/monitors/home.do)  
    ![](attachments/100008767/100009227.png)
4.  Revisar les alertes de l'Splunk  
    ![](attachments/100008767/100009228.png)  
      
    
5.  Reiniciar l'SSC si detectem algun problema: [Revisió SSC (TrustedX)#ReinicidelSSC](36340764.html#RevisióSSC\(TrustedX\)RevisarIP'sitreureNexica-ReinicidelSSC)

Si l'SSC respon bé i no presenta errors, haurem d'obrir un tiquet a Claranet (proveïdor) perquè ho revisin i ens indiquin que ha passat: 

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

![](images/icons/bullet_blue.gif) [image2020-4-17\_10-52-56.png](attachments/100008767/100008768.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-17\_17-8-55.png](attachments/100008767/100008769.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-14-22.png](attachments/100008767/100008771.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-14-47.png](attachments/100008767/100008772.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-14-57.png](attachments/100008767/100008773.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-15-25.png](attachments/100008767/100008774.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-16-6.png](attachments/100008767/100008775.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-16-30.png](attachments/100008767/100008776.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-16-42.png](attachments/100008767/100008777.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-16-55.png](attachments/100008767/100008778.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-17-27.png](attachments/100008767/100008779.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-17-36.png](attachments/100008767/100008780.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-18-14.png](attachments/100008767/100008781.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-19-6.png](attachments/100008767/100008783.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-16\_14-20-8.png](attachments/100008767/100008784.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-4-12\_12-22-28.png](attachments/100008767/100009225.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-4-12\_12-25-24.png](attachments/100008767/100009226.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-4-12\_12-25-37.png](attachments/100008767/100009227.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-4-12\_12-26-50.png](attachments/100008767/100009228.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:05

[Atlassian](http://www.atlassian.com/)