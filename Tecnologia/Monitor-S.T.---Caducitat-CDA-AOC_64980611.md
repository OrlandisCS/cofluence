Suport Tècnic : Monitor S.T. - Caducitat CDA AOC  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [03 - Monitorització - Revisions globals](26313327.html)
4.  [Monitors S.T.](Monitors-S.T._41522177.html)

Suport Tècnic : Monitor S.T. - Caducitat CDA AOC
================================================

Created by Unknown User (otecobernal), last modified by OTEC ST JAlejandro Cardete Postigo on 12 December 2022

Requisits
=========

Per tal de poder demanar els certificats necessitarem disposar d'una T-CAT (física) per poder descarregar els certificats a través del SCD.

Addicionalment, necessitarem disposar de permisos pel nostre usuari d'EACAT per tal de poder tramitar les sol·licituds:

**SQLEACATTR64PRO**

insert into USU\_ROLS\_APLICACIO(IdServei,IdEns,Tipus,Identificador,rol) values ('SV\_ASCDA','9821920002','MLO','<NIF>','ADMIN');
insert into USU\_ROLS\_APLICACIO(IdServei,IdEns,Tipus,Identificador,rol) values ('SV\_ASCD','9821920002','MLO','<NIF>','SOLICID@01');
insert into USU\_ROLS\_APLICACIO(IdServei,IdEns,Tipus,Identificador,rol) values ('SV\_ASCD','9821920002','MLO','<NIF>','RESSERV@01');
insert into USU\_ROLS\_APLICACIO(IdServei,IdEns,Tipus,Identificador,rol) values ('SV\_ASCD','9821920002','MLO','<NIF>','EDITOR');
insert into USU\_ROLS\_APLICACIO(IdServei,IdEns,Tipus,Identificador,rol) values ('SV\_ASCD','9821920002','MLO','<NIF>','A5E08D23-D');

Procediment 
============

1\. Demanar certificat a EACAT

1.  Accedir a l'apartat de **TRÀMITS** de l'EACAT  
    ![](attachments/64980611/64980618.png)
2.  Cercar certificats i clicar sobre l'opció **Servei de certificació digital**  
    ![](attachments/64980611/64980617.png)![](attachments/64980611/64980616.png)
3.  Escollir l'opció **T-CAT: Sol·licitud i renovació de certificats d'aplicació** i prémer el botó **Tramita**  
    ![](attachments/64980611/64980615.png)![](attachments/64980611/64980633.png)
4.  Omplir la **Informació inicial**
    
    Per conèixer el **Tipus de certificat a sol·licitar**, haurem de revisar el certificat antic que estigui a punt de caducar i seleccionar el valor que hi hagi al camp **Sujeto-OU**
    
    ![](attachments/64980611/64980634.png)
    
      
    ![](attachments/64980611/64980614.png)
    
5.  Omplir les **Dades de la sol·licitud**
    
    Com al pas anterior, podrem fer servir el certificat anterior per copiar el **Nom de l'aplicació** i el **Correu electrònic**
    
    ![](attachments/64980611/64980637.png)![](attachments/64980611/64980638.png)
    
    La resta de dades les haurem de deixar en blanc, i a l'apartat **Tipus d'ús del certificat** haurem de seleccionar **Ús directe propi (sense opció de cessió a l'AOC)**  
    ![](attachments/64980611/64980639.png)
    
6.  Acceptar la sol·licitud  
    ![](attachments/64980611/77824456.png)

Ens arribarà un correu indicant que el tràmit s'ha realitzat:

![](attachments/64980611/64980631.png)

Haurem d'esperar entre 7 i 10 dies per tenir el certificat disponible i poder-lo descarregar. En cas de ser urgent (camp **Prioritat** del punt 4), es tramitarà al moment i haurem de contactar amb l'**Anna Giné**.

2\. Descarregar el certificat

1.  Haurem d'accedir al full de lliuraments (accedir amb T-CAT física) i clicar sobre **Pendents de lliurar**: [https://scd.aoc.cat](https://scd.aoc.cat)   
    ![](attachments/64980611/64980640.png)
2.  Clicar sobre **Imprimir documentació** (ens torna a demanar autenticació amb la T-CAT física)  
    ![](attachments/64980611/64980642.png)
3.  Es baixarà un document de lliurament **.rtf** que haurem de desar a la carpeta de xarxa: **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\CERTIFICATS\\CDA![](attachments/64980611/64980635.png)  
    **
    
    Crear carpeta amb el nom del certificat
    
    ![](attachments/64980611/64980643.png)
    
4.  Un cop descarregat el word, s'habilitarà l'opció de descarregar el certificat **.p12**, que també haurem de desar a la carpeta anterior  
    ![](attachments/64980611/64980644.png)  
    ![](attachments/64980611/64980645.png)  
    
5.  Demanar el **pin** a l'**Anna Giné** per correu o Teams.
6.  Afegir les dades del certificat al **Keepass**  
    ![](attachments/64980611/64980646.png)  
    A l'apartat de Notes podem copiar el contingut del correu:  
    ![](attachments/64980611/64980647.png)  
    

3\. Instal·lar el certificat

En funció del certificat renovat la instal·lació la farà el responsable del servei o nosaltres mateixos (comentar internament en cas de dubte).

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2022-1-20\_15-20-35.png](attachments/64980611/64980612.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-20-24.png](attachments/64980611/64980613.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-20-13.png](attachments/64980611/64980614.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-19-56.png](attachments/64980611/64980615.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-19-48.png](attachments/64980611/64980616.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-19-42.png](attachments/64980611/64980617.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-19-35.png](attachments/64980611/64980618.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-19-7.png](attachments/64980611/64980619.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-18-57.png](attachments/64980611/64980620.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-18-49.png](attachments/64980611/64980621.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-1-20\_15-18-39.png](attachments/64980611/64980622.png) (image/png)  
![](images/icons/bullet_blue.gif) [cds.gif](attachments/64980611/64980623.gif) (image/gif)  
![](images/icons/bullet_blue.gif) [image2022-3-8\_12-22-28.png](attachments/64980611/64980631.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-3-8\_12-25-39.png](attachments/64980611/64980632.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-3-8\_12-25-46.png](attachments/64980611/64980633.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-3-8\_12-27-59.png](attachments/64980611/64980634.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-3-8\_12-37-10.png](attachments/64980611/64980635.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-3-8\_13-25-34.png](attachments/64980611/64980637.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-3-8\_13-26-52.png](attachments/64980611/64980638.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-3-8\_13-28-34.png](attachments/64980611/64980639.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-3-8\_13-45-5.png](attachments/64980611/64980640.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-3-8\_13-46-41.png](attachments/64980611/64980642.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-3-8\_13-49-29.png](attachments/64980611/64980643.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-3-8\_13-51-2.png](attachments/64980611/64980644.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-3-8\_13-51-25.png](attachments/64980611/64980645.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-3-8\_13-52-59.png](attachments/64980611/64980646.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-3-8\_13-54-8.png](attachments/64980611/64980647.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-9-16\_9-1-2.png](attachments/64980611/77824456.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:07

[Atlassian](http://www.atlassian.com/)