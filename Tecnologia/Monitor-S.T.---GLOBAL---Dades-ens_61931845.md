Suport Tècnic : Monitor S.T. - GLOBAL - Dades ens  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [03 - Monitorització - Revisions globals](26313327.html)
4.  [Monitors S.T.](Monitors-S.T._41522177.html)

Suport Tècnic : Monitor S.T. - GLOBAL - Dades ens
=================================================

Created by Unknown User (otecobernal), last modified by OTEC ST JAlejandro Cardete Postigo on 11 October 2021

Què mesura aquest monitor?

L'AOC disposa d'unes taules a base de dades que es fan servir de consulta a diferents serveis. Aquestes taules s'actualitzen de manera diària (a les 7 del matí) carregant la informació de la base de dades AOCGLOBAL a través d'una job configurada.

  

**Consulta**
============

* * *

SELECT 1 FROM AOCGLOBAL.USU\_ENS\_ADHERITS, 
AOCGLOBAL.USU\_USUARI, 
AOCGLOBAL.REG\_PROC\_DEST, 
AOCGLOBAL.USU\_ENS, 
AOCGLOBAL.USU\_USUENS

**Procediment**
===============

* * *

Si el procés intern ha fallat, hauríem de rebre una alerta al correu de l'estil:

![](attachments/61931845/61931849.png)

L'alerta ens indica a quin pas del procés ha fallat. Ens podem connectar a la Base de Dades SQL Server (**10.120.1.251\\SQLEACATTR64PRO**):

![](attachments/61931845/61931850.png)![](attachments/61931845/61931851.png)

Amb el botó dret podrem accedir a l'historial i obtenir més informació de l'error:

![](attachments/61931845/61931852.png)

També podem reexecutar la job des de 0 o a partir del pas que ha fallat (per exemple al 33):

![](attachments/61931845/61931854.png)![](attachments/61931845/61931855.png)

Tot i així, és possible que la nova execució falli, a causa de les característiques del procés intern que actua. Per veure que fa cada step, ho podem fer amb botó dret i polsant a les propietats, sota l'apartat **Steps**:

![](attachments/61931845/61931856.png)![](attachments/61931845/61931857.png)

El procés que realitza és el següent:

*   Esborra les taules temporals creades en una execució anterior de la job. (1)
*   Torna a crear les taules temporals. (2)
*   Exportar dades a les taules temporals i setejar informació necessària (3-29)
*   Esborrar taules bones i renombar les taules temporals pel nom correcte. (30-40)

Es fa d'aquesta manera per evitar tenir una pèrdua de servei. Si no s'utilitzen les taules temporals, s'haurien d'eliminar les taules bones, crear-les i exportar les dades necessàries, procés que triga uns 10 minuts. 

D'aquesta manera en canvi, només es perd servei el microsegon que es triga a eliminar una taula i renombrar la taula temporal.

Les taules en qüestió són les següents:

select \* from all\_all\_tables where owner = 'AOCGLOBAL'

![](attachments/61931845/61931847.png)

  

### Problemes al reexecutar la tasca:

Si tenim problemes per executar la tasca de nou, haurem de fer el següent:

1.  Executar manualment la step 1. Per executar les comandes s'ha explicat anteriorment (Properties>Steps)
2.  Revisar que totes les taules bones (NO\_TEMPORALS) existeixen
    1.  En cas que alguna no existeixi, haurem de crear-la de nou copiant l'esquema que tenim a PRE. Per exemple, si no existeix la taula USU\_USUARI:
        1.  Connectar-se a la bdd de PRE  
            ![](attachments/61931845/61931858.png)
        2.  Executar la següent comanda i obtenir l'script de generació de la taula 
            
            select dbms\_metadata.get\_ddl('TABLE', 'USU\_USUARI')
            from dual;
            
            ![](attachments/61931845/61931860.png)
            
        3.  Executar la comanda obtinguda a la base de dades de PRO
            
        4.  Executar la job des de 0

**Informació addicional**
=========================

* * *

### 1) Revisió de logs

  

####   
  

####   
  

Attachments:
------------

![](images/icons/bullet_blue.gif) [cds.gif](attachments/61931845/61931846.gif) (image/gif)  
![](images/icons/bullet_blue.gif) [image2021-10-11\_15-9-45.png](attachments/61931845/61931847.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-11\_15-13-45.png](attachments/61931845/61931848.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-11\_15-14-13.png](attachments/61931845/61931849.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-11\_15-14-51.png](attachments/61931845/61931850.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-11\_15-17-14.png](attachments/61931845/61931851.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-11\_15-18-2.png](attachments/61931845/61931852.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-11\_15-19-36.png](attachments/61931845/61931853.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-11\_15-19-47.png](attachments/61931845/61931854.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-11\_15-20-30.png](attachments/61931845/61931855.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-11\_15-22-31.png](attachments/61931845/61931856.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-11\_15-24-7.png](attachments/61931845/61931857.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-11\_15-46-47.png](attachments/61931845/61931858.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-11\_15-59-7.png](attachments/61931845/61931860.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:09

[Atlassian](http://www.atlassian.com/)