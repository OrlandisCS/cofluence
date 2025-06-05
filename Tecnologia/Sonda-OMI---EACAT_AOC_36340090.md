Suport Tècnic : Sonda OMI - EACAT\_AOC  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [03 - Monitorització - Revisions globals](26313327.html)
4.  [Monitors OMI (CTTI)](26313608.html)
5.  [Sondes OMI - Old](Sondes-OMI---Old_41519617.html)

Suport Tècnic : Sonda OMI - EACAT\_AOC
======================================

Created by Unknown User (otecobernal), last modified by OTEC ST JAlejandro Cardete Postigo on 12 December 2022

SERVEI 8X5 (8H - 19H)

Circuit que realitza la sonda

Aquesta sonda realitza les següents accions:

1.  Accedir a la URL: [https://www.eacat.cat](https://www.eacat.cat/)
2.  Prémer el botó “**_Accedeix amb certificat_**”
    
3.  Per recrear amb exactitud les transaccions de la sonda de l'OMI, ens podem logar a l'EACAT utilitzant el certificat digital de proves que fan servir.
    
    Podem trobar-lo a: _(Sharepoint) Tecnologia - SUPORT\_TECNIC\\MONITORITZACIO\\Monitors CTTI\\2- Certificat i credencials Sondes_
    
    ![](attachments/36340090/36340097.png)
    
    ![](attachments/36340090/36340247.png)
    
4.  Clicar sobre ‘Registre’
    
    ![](attachments/36340090/36340098.png)  
      
    
    Possible error: No disposeu de permisos...
    
    Un cop dins podem executar les passes de la sonda.
    
    Si veiem que l'error  en accedir a Registres és el següent:
    
    ![](attachments/36340090/36340249.png)
    
      
    
    L'error el provoca perquè s'han registrat a EACAT i l'ens per defecte és el **Departament de Polítiques Digitals i Administració Públic**a, que no té permisos.
    
    A vegades aquest ens per defecte es canvia de manera automàtica. Per tornar-lo a deixar com a Consorci AOC, haurem de fer el següent:
    
    Accedir a **El meu compte**:
    
    ![](attachments/36340090/36340250.png)
    
      
    
    Editar l'usuari:
    
    ![](attachments/36340090/36340251.png)
    
      
    
    Seleccionar l'ens per defecte:
    
    ![](attachments/36340090/36340254.png)
    
      
    
    Guardar i tornar a començar el circuit.
    
5.  Realitzar una cerca deixant les dates per defecte. Esperar que llisti el resultat de la cerca i que per tant, la resposta sigui correcta. Esperar un codi 200 HTML  
    ![](attachments/36340090/36340099.png)  
      
    
6.  Premem “\[Surt\]” per tancar la sessió HTTPS

La sonda s'estructura en dosa transicions:

1.  **01\_ENTRADA\_PORTAL-1:** Agrupa les passes 1 i 2.
2.  **02\_Validacio-1:** Agrupa les passes 3, 4 i 5.  
      
    

Màquines a revisar en cas de caiguda

PL6

EACAT TR

Procediment

A) Revisar i reiniciar EACAT TR per sanejar el IDP: 

**[Revisió IDP](41522135.html)**

B) Revisar i reiniciar PL6:

**[EACAT - PL6 - Revisió](41520634.html)**

**[EACAT - PL6 - Reinici](EACAT---PL6---Reinici_41520633.html)**

C) Revisar i reiniciar EACAT TR (de lògica a presentació). És on està desplegat el servei de EACAT TRAMITS.

**[EACAT TR - LG - IIS (Capa lògica) - Revisió](41520689.html)**

**[EACAT TR - LG - IIS (Capa lògica) - Reinici](41520688.html)**

  

**[EACAT TR - PR - IIS (Capa presentació) - Revisió](41520694.html)**

**[EACAT TR - PR - IIS (Capa presentació) - Reinici](41520693.html)**

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2020-3-17\_11-19-46.png](attachments/36340090/36340091.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-17\_11-19-5.png](attachments/36340090/36340092.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-17\_11-18-23.png](attachments/36340090/36340093.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-1-4\_20-43-8.png](attachments/36340090/36340094.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-26\_18-11-17.png](attachments/36340090/36340095.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-26\_18-11-28.png](attachments/36340090/36340096.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-17\_11-26-9.png](attachments/36340090/36340097.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-17\_11-26-59.png](attachments/36340090/36340098.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-17\_11-28-55.png](attachments/36340090/36340099.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-24\_10-42-54.png](attachments/36340090/36340246.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-24\_10-42-58.png](attachments/36340090/36340247.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-24\_10-45-32.png](attachments/36340090/36340249.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-24\_10-47-37.png](attachments/36340090/36340250.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-24\_10-47-59.png](attachments/36340090/36340251.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-24\_10-48-27.png](attachments/36340090/36340252.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-24\_10-49-51.png](attachments/36340090/36340254.png) (image/png)  
![](images/icons/bullet_blue.gif) [Espacios.url](attachments/36340090/64979338.url) (application/octet-stream)  

Document generated by Confluence on 02 June 2025 11:07

[Atlassian](http://www.atlassian.com/)