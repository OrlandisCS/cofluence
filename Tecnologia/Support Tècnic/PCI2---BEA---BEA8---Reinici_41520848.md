Suport Tècnic : PCI2 - BEA - BEA8 - Reinici  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [04 - Tècnica de sistemes + 24x7 + Padró](26313202.md)
4.  [Plataformes](Plataformes_41520520.md)
5.  [PCI2 - BEA - BEA8](PCI2---BEA---BEA8_41520845.md)

Suport Tècnic : PCI2 - BEA - BEA8 - Reinici
===========================================

Created by Unknown User (otecobernal), last modified by Unknown User (otecjriquelme) on 13 April 2021

Per saber si el servei està aixecat:

**Ruta per observar els logs**

ps aux | grep -i appnodo  <-- per APP
ps aux | grep -i pcinodo  <-- per IOP

ps aux | grep -i appadmin  <-- per APPAdmin
ps aux | grep -i pciadmin  <-- per IOPAdmin

Reinici total de la plataforma

En cas de tenir de reiniciar tota la plataforma: 

*   Admin
*   IOP
*   APP

Seguir l'ordre següent: 

0- Seguir procediment de "Tasques de Purga i Manteniment" d'aquesta mateixa faq.

1- Shutdown  PCINodo1 i PCINodo2

2- Shutdown PCIAdmin

3- Start PCIAdmin

4- Start PCINodo1  i PCINodo2 

Problemes durant l'aixecament de nodes

En cas de que tinguem problemes en el restabliment de la plataforma, consultar el desplegable "**Tasques de Purga i Manteniment**".

ATENCIÓ: Sempre és més segur que acabi d'aixecar-se un node abans de parar el procés.

_Per exemple_: 2 nodes KO, fer un pas de 0. 

Resum + Arquitectura

Resum:
------

  

![](https://intranet.aoc.cat/download/attachments/26313194/BEA_APP.png?version=2&modificationDate=1503314507000&api=v2)

  

Documentació tècnica de **l'arquitectura dels BEA 8:** 
-------------------------------------------------------

![](plugins/servlet/confluence/placeholder/unknown-attachment)
--------------------------------------------------------------

Tasques de Purga i Manteniment

Aquest procediment es realitzaria sempre que tinguem de reiniciar tots els nodes de la plataforma (fer pas de 0). 

1.  Parar el node a purgar del Cluster (**NO FER-HO AL ADMIN!**).
2.  Dintre de les carpetes les carpetes de cadascun dels nodes (**ADMIN NO!**), per exemple:  
    _/apps/bea/beaplat/user\_projects/domains/PCIDomain/PCINodo1_  
    _/apps/bea/beaplat/user\_projects/domains/PCIDomain/PCINodo2_
3.   Esborrar les carpetes “**_stage_**” i “**_.wlnotdelete_**”i els logs:
    1.  Comanda per esborrar desplegaments i estat d’aplicacions:  
        _rm -rf stage && rm -rf .wlnotdelete_
    2.  Comanda per esborrar logs :  
         _rm ".tlog_
4.   Aixecar de nou el Cluster, **primer l’Admin i després els nodes.**

  

_( \* )Aquest procediment s'explica al document "PCI 2.0 – Documentació referència arquitectura IOP i APP", per més informació sobre la plataforma, podrem consultar el document en la pestanya "Resum i Arquitectura"._

Reinici APP

**Node 1:**

Haurem d'obrir dos terminals.

1.  **Comprovar** que no hi hagin **tasques pendents** abans de fer el reinici:  
    1.  Accedim a la pàgina d'admintració dels BEA i fer clic a "Recent Task Status":  
        ![](attachments/41520848/41520856.png)  
          
          
        
    2.  Si hi ha una tasca pendent per exemple un deploy d'una aplicació ho podrem veure si en la columna "End Time" no hi ha una data i hora informada.  
         ![](attachments/41520848/41520857.png)  
          
        
    3.  Si hi ha un**a tasca pendet**, només podem esperar a que finalitzi, en el cas que no ho faci perquè **s'ha quedat penjat i haurem de prosseguir amb el reinici.** **Hem de tindre en compte que si reiniciem el node i queda una tasca pendent el propi BEA té un temps d'espera de 60 minuts, un cop passats aquests 60 minuts forçarà l'stop de la tasca pendent.**   
        Per tant no ens quedarà una altra que esperar durant el reinici que el BEA forci l'aturada de la tasca pendent.   
          
          
        
2.  En un terminal haure d'obrir els logs (Introduir la data del dia actual):
    
    **Ruta per observar els logs**
    
    cd /apps/bea/beaplat/user\_projects/domains/AppDomain
    tail -200f nodo1.out.2018XXXXXXXX
    
3.  Al segon terminal, procedirem a fer el reinici:
    
    **Aturar el servei**
    
    cd /apps/bea/beaplat/user\_projects/domains/AppDomain
    ./BEA\_STOP\_NODO1.sh
    
    El servei estarà aturat quan aparegui el missatge: 
    
    `**Done**`
    
    ![](https://intranet.aoc.cat/download/attachments/26313194/image2018-2-7_12-40-56.png?version=1&modificationDate=1518003657000&api=v2)
    
      
    Comprovem que el node està efectivament aturat:
    
    **Comprovar que el procés està mort**
    
    ps -ef | grep -i appnodo
    
    Si veiem el següent, és que el procés **no s'ha acabat d'apagar**:
    
    ![](attachments/41520848/41521899.png)
    
    L'argument _\-Dweblogic.Name_ indica el procés del weblogic que està corrent.
    
    **En cas de tenir aquest procés actiu**, tal i com està a la captura, farem _kill_ del procés, o _kill -9_ si el kill no funciona.
    
    **Matem el procés**
    
    kill \[PID\_PROCES\]
    kill -9 \[PID\_PROCES\]
    
      
    Una vegada el node s'ha aturat, l'encenem amb la següent comanda.
    
    **Iniciar el servei**
    
    ./BEA\_START\_NODO1.sh
    
    ![](https://intranet.aoc.cat/download/attachments/26313194/image2018-2-7_12-41-22.png?version=1&modificationDate=1518003682000&api=v2)
    
    El servei estarà iniciat quan aparegui el missatge:
    
    `<``Notice``> <``WebLogicServer``> <``BEA-000360``> <``Server` `started in RUNNING mode>`
    
    ![](https://intranet.aoc.cat/download/attachments/26313194/image2018-2-7_13-29-38.png?version=1&modificationDate=1518006578000&api=v2)
    
    Exemples d'errors que poden aparèixer:  
      
    ![](https://intranet.aoc.cat/download/attachments/26313194/image2018-2-7_12-42-17.png?version=1&modificationDate=1518003737000&api=v2)

**Node 2:**

Haurem de realitzar el mateix procediment:

**Ruta per observar els logs**

cd /apps/bea/beaplat/user\_projects/domains/AppDomain
tail -200f nodo2.out.2013XXXXXXXX

**Aturar el servei**

cd /apps/bea/beaplat/user\_projects/domains/AppDomain
./BEA\_STOP\_NODO2.sh

  

**Comprovar que el procés està mort**

ps -ef | grep -i appnodo

  

**Matem el procés**

kill \[PID\_PROCES\]
kill -9 \[PID\_PROCES\]

  

  

**Iniciar el servei**

./BEA\_START\_NODO2.sh

Reinici IOP

**Node 1:**

Haurem d'obrir dos terminals.

1.  **Comprovar** que no hi hagin **tasques pendents** abans de fer el reinici:
    1.  Accedim a la pàgina d'admintració dels BEA i fer clic a "Recent Task Status":  
        ![](attachments/41520848/41520856.png)  
          
        
    2.  Si hi ha una tasca pendent per exemple un deploy d'una aplicació ho podrem veure si en la columna "End Time" no hi ha una data i hora informada.  
         ![](attachments/41520848/41520857.png)  
          
        
    3.  Si hi ha un**a tasca pendet**, només podem esperar a que finalitzi (10 minuts), en el cas que no ho faci perquè **s'ha quedat penjat i haurem de prosseguir amb el reinici.** **Hem de tindre en compte que si reiniciem el node i queda una tasca pendent el propi BEA té un temps d'espera de 60 minuts, un cop passats aquests 60 minuts forçarà l'stop de la tasca pendent.**   
        Per tant no ens quedarà una altra que esperar durant el reinici que el BEA forci l'aturada de la tasca pendent.   
          
        
2.  En un terminal haure d'obrir els logs (Introduir la data del dia actual):
    
    **Ruta per observar els logs**
    
    cd /apps/bea/beaplat/user\_projects/domains/PCIDomain
    tail -200f nodo1.out.2013XXXXXXXX
    
3.  Al segon terminal, procedirem a fer el reinici:
    
    **Aturar el servei**
    
    cd /apps/bea/beaplat/user\_projects/domains/PCIDomain
    ./BEA\_STOP\_NODO1.sh
    
    El servei estarà aturat quan aparegui el missatge: 
    
    `**Done**`
    
    ![](https://intranet.aoc.cat/download/attachments/26313194/image2018-2-7_12-40-56.png?version=1&modificationDate=1518003657000&api=v2)
    
      
    Comprovem que el node està efectivament aturat:
    

  

**Comprovar que el procés està mort**

ps -ef | grep -i pcinodo

Si veiem el següent, és que el procés **no s'ha acabat d'apagar**:

![](attachments/41520848/41521898.png)

L'argument _\-Dweblogic.Name_ indica el procés del weblogic que està corrent.

**En cas de tenir aquest procés actiu**, tal i com està a la captura, farem _kill_ del procés, o _kill -9_ si el kill no funciona.  
  

**Matem el procés**

kill \[PID\_PROCES\]
kill -9 \[PID\_PROCES\]

Una vegada el node s'ha apagat correctament, l'encenem:

**Iniciar el servei**

./BEA\_START\_NODO1.sh

![](https://intranet.aoc.cat/download/attachments/26313194/image2018-2-7_12-41-22.png?version=1&modificationDate=1518003682000&api=v2)

El servei estarà iniciat quan aparegui el missatge:

`<``Notice``> <``WebLogicServer``> <``BEA-000360``> <``Server` `started in RUNNING mode>`

![](https://intranet.aoc.cat/download/attachments/26313194/image2018-2-7_13-29-38.png?version=1&modificationDate=1518006578000&api=v2)  
  
  

Exemples d'errors que poden aparèixer:  
  
![](https://intranet.aoc.cat/download/attachments/26313194/image2018-2-7_12-42-17.png?version=1&modificationDate=1518003737000&api=v2)

**Node 2:**

Haurem de realitzar el mateix procediment:

**Ruta per observar els logs**

cd /apps/bea/beaplat/user\_projects/domains/PCIDomain
tail -200f nodo2.out.2013XXXXXXXX

**Aturar el servei**

cd /apps/bea/beaplat/user\_projects/domains/PCIDomain
./BEA\_STOP\_NODO2.sh

**Comprovar que el procés està mort**

ps -ef | grep -i pcinodo

**Matem el procés**

kill \[PID\_PROCES\]
kill -9 \[PID\_PROCES\]

**Iniciar el servei**

./BEA\_START\_NODO2.sh

  

Reinici ADMINS

El BEA8 té 2 ADMINS, un a IOP (**PCIAdmin**) i l'altre a APP (**APPAdmin**).

A més, cada Admin està desplegat a un node diferent:

*   **PCIAdmin → Node1** (aoc-l-app1)
*   **APPAdmin → Node2** (aoc-l-app2)

En funció del admin que vulguem reiniciar haurem d'accedir a una ruta:

**Ruta per observar els logs**

cd /apps/bea/beaplat/user\_projects/domains/PCIDomain
cd /apps/bea/beaplat/user\_projects/domains/AppDomain

  

1.  En un terminal haure d'obrir els logs (Introduir la data del dia actual):
    
    **Ruta per observar els logs**
    
    tail -200f admin.out.2013XXXXXXXX
    
2.  Al segon terminal, procedirem a fer el reinici:
    
    **Aturar el servei**
    
    ./BEA\_STOP\_ADMIN.sh
    
    **Iniciar el servei**
    
    ./BEA\_START\_ADMIN.sh
    
    El servei estarà iniciat quan aparegui el missatge:
    
    `<``Notice``> <``WebLogicServer``> <``BEA-000360``> <``Server` `started in RUNNING mode>`
    

Error cacerts

subject key, Unknown key spec: Invalid RSA modulus size.

![](attachments/41520848/41520858.png)

Aquest error es deu a que el fitxer de cacerts que utilitza el jdk del BEA8 té certificats de 2048 bits o superiors (no compatibles amb BEA8).

La solució és accedir a la ruta: /mnt/lhnfs/aoc/certs/BEA i revisar l'arxiu. Si recentment s'ha fet alguna modificació es pot mirar de deixar el backup que es va realitzar d'aquell fitxer:

![](attachments/41520848/41520859.png)

  

Després tornar a inciar 'admin i els nodes.

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2020-9-9\_10-56-44.png](attachments/41520848/41520856.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-9-9\_10-58-42.png](attachments/41520848/41520857.png) (image/png)  
![](images/icons/bullet_blue.gif) [cacerts.png](attachments/41520848/41520858.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-6-15\_9-56-50.png](attachments/41520848/41520859.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-3-8\_16-53-43.png](attachments/41520848/41521897.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-3-8\_16-57-58.png](attachments/41520848/41521898.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-3-8\_17-4-2.png](attachments/41520848/41521899.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:16

[Atlassian](http://www.atlassian.com/)