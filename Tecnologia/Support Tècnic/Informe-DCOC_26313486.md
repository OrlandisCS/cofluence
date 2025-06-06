Suport Tècnic : Informe DCOC  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [01 - Gestió Operativa](26313391.md)
4.  [Tasques complementàries](26313409.md)

Suport Tècnic : Informe DCOC
============================

Created by Unknown User (cmoralea), last modified by OTEC ST JAlejandro Cardete Postigo on 30 September 2020

Cada primer dijous de cada mes hem de fer un informe dels consums del DCOC per l'Ajuntament de Barcelona.

Passes a seguir:
----------------

Arriba un correu automatitzat a tot l'equip i al compte de l'OT amb les dades de l'últim més. Si hi hagués problemes d'enviament del correu s'ha d'executar manualment:

[https://intranet.aoc.cat/display/SII/Automatitzacions#tab-Amposta2](https://intranet.aoc.cat/display/SII/Automatitzacions#tab-Amposta2)

1.  Una vegada rebem el correu automatitzat, l'hem de deixar en la ruta:
    1.  ![](attachments/26313486/41518470.png)
    2.  ![](attachments/26313486/41518469.png)
2.  En l'exel adjunt realitzem les taules dinàmiques amb les dades de l'automatització:
    1.  Abans de tot filtre'm pes REINICIS "0" i "1" i posem tots els "0" a "1" (que tots els 1 tinguin el mateix format). 
    2.  Realitzem una taula dinàmica amb tota la informació que tenim, els camps a treure són:  
        ![](attachments/26313486/26317666.png)
    3.  Ordenem per peticions ("OK" valor 0) de major a menor
    4.  Amb aquesta informació generem una taula dinàmica pels reintents.  
        1.  Farem 2 Taules a partir d'aquesta:
            1.  Reintents per peticions en el mes  
                ![](attachments/26313486/26317719.png)
            2.  Reintents en peticions finalitzades (estat a "0"):  
                ![](attachments/26313486/26317721.png)
            3.  Reintents en peticions amb error (estat "1"):  
                ![](attachments/26313486/26317717.png)  
                  
                  
                
3.  En la ruta del Teams  trobarem el document excel del informe: AOC-INF-v2.0-Errors\_DCOC\_\_AJ\_BCN\_**171106**.xlsx  (la data final es modificarà segons el dia que es realitzi l'informe).  
    Aquest Excel està compost per 3 fulles:
    1.  Consums per Col·legi AJ\_BCN:
        
        1.  Hi ha 2 taules, en la primera taula informem les dades de l'informe anterior i al costat la de mes anterior ( de la extracció que tenim en consums per [colegi\_NOVEMBRE.xlsx](https://confluence.aoc.cat/pages/viewpage.action?pageId=26313485#InformeDCOC-Consums) ). Per exemple en l'informe del mes de Desembre queda així:  
            ![](attachments/26313486/26317661.png)
    2.  Reintents per petició AJ\_BCN:
        
        Enganxem les dades de les taules dinàmiques que tenim en consums per [colegi\_NOVEMBRE.xlsx](https://confluence.aoc.cat/pages/viewpage.action?pageId=26313485#InformeDCOC-Consums)
        
        Tinguem cura amb els reintents i que la suma de peticions tenen que quadrar amb la primera fulla de l'informe.
        
        ![](attachments/26313486/26317716.png)
        
        1.  Hem de validar que la suma de les peticions coincideixi sempre amb el total.
            
    3.  Error Peticions AJ\_BCN:
        
        Amb l'última pestanya del informe, filtrem per les peticions finalitzades en error (ESTAT = "1") i peguem a la Taula de l'informe a enviar. L'ordre de les Columnes són les 6 primeres de l'extracció:
        
        ![](attachments/26313486/26317730.png)
        
4.  Una vegada tenim l'informe enllestit, informem en el nom del fitxer la data del dia que fem l'informe i l'enviem. [Mail exemple.](#)  
      
    
    El mail l'hem d'enviar a :
    
      
    
    ![](attachments/26313486/41518472.png)
    
      
    
    Després el guardem en la carpeta del correu : "DCOC"
    
    ![](attachments/26313486/41518473.png)
    

  

  

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [AOC\_1.0 - copia.bas.zip](attachments/26313486/26317657.zip) (application/zip)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_9-45-26.png](attachments/26313486/26317656.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_9-47-44.png](attachments/26313486/26317650.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_9-48-28.png](attachments/26313486/26317648.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_10-22-3.png](attachments/26313486/26317666.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_10-32-10.png](attachments/26313486/26317658.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_10-35-13.png](attachments/26313486/26317661.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_10-39-42.png](attachments/26313486/26317701.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_10-55-33.png](attachments/26313486/26317683.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_10-55-48.png](attachments/26313486/26317682.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_10-56-3.png](attachments/26313486/26317681.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_10-56-56.png](attachments/26313486/26317719.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_10-57-6.png](attachments/26313486/26317721.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_10-57-41.png](attachments/26313486/26317717.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_11-5-9.png](attachments/26313486/26317716.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2017-12-7\_11-15-27.png](attachments/26313486/26317730.png) (image/png)  
![](images/icons/bullet_blue.gif) [Servei Emissió Informe Idoneïtat Tècnica - AJB - CAOC - ECAs Col- legis professionals - Informe errors Novembre 2017.msg](attachments/26313486/26317729.msg) (application/vnd.ms-outlook)  
![](images/icons/bullet_blue.gif) [image2020-8-4\_11-34-1.png](attachments/26313486/41518323.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-8-7\_11-16-31.png](attachments/26313486/41518469.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-8-7\_11-22-17.png](attachments/26313486/41518470.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-8-7\_11-31-53.png](attachments/26313486/41518472.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-8-7\_11-33-43.png](attachments/26313486/41518473.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:47

[Atlassian](http://www.atlassian.com/)