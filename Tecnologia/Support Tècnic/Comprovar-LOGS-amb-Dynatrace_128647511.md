Suport Tècnic : Comprovar LOGS amb Dynatrace  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [04 - Tècnica de sistemes + 24x7 + Padró](26313202.md)
4.  [Dynatrace](Dynatrace_128647499.md)

Suport Tècnic : Comprovar LOGS amb Dynatrace
============================================

Created by OTEC ST Maria Jose Salar, last modified on 25 April 2025

En Dynatrace, si volem crear codi DQL per a veure logs de qualsevol servei hem d'usar l'apartat **Logs & Events Classic**

![](attachments/128647511/128647524.png)

Aquí, si li donem a “_Run query_” sense introduir res, obtindrem una llista de tots els logs que hi ha de tots els serveis (Assegurar-nos que posa Last 30m per a no petarlo).

![](attachments/128647511/128647527.png)

En aquest menú desplegable ens apareixen tots els directoris de logs

![](attachments/128647511/128647528.png)

Una vegada aquí, li donem al botó “mode avançat” perquè es creï el nostre codi DQL

![](attachments/128647511/128647530.png)

En dynatrace podem veure 2 tipus de LOGS (podem veure més, ara com ara només ens interessen 2):

*   Logs interns (MAIN)
    

 Dins de **_Main -> log.source_** tenim tots els logs interns

  

![](attachments/128647511/128647532.png)

  

Per a veure els logs d'un servei en especifico, a més del número de logs que hi ha dins de cadascun, usem aquest codi DQL:

**DQL CODE**

fetch logs
| filter matchesPhrase(log.source, "representa")
| summarize count(), by:{log.source}

Canviant "representa" pel servei que vulguem

  

![](attachments/128647511/128647534.png)

  

Una vegada obtingut aquest resultat, podem triar el directori que vulguem per a veure els seus logs, copiar el seu nom i executar el següent comando per a veure els logs que hi ha dins:

  

**DQL CODE**

fetch logs
| filter matchesPhrase(log.source, "/mnt/storage30/aoc/APP/logs/representa-core\_APPNODO#\_SOA.log")

Exemple per a /mnt/storage30/aoc/APP/logs/representa-core\_APPNODO#\_SOA.log

  

![](attachments/128647511/128647535.png)

  

A partir d'aquest resultat, podem filtrar els logs pel camp que vulguem usant matchesPhrase(\*campoAFiltrar, “text”) de la manera següent:

  

![](attachments/128647511/128647537.png)

Aquí, filtrem que el loglevel sigui ERROR, (Podria ser INFO/ERROR/\*WARN) per a veure només els logs d'errors

  

*   Logs AWS

Per a veure logs de AWS, hem d'anar-nos a la seva pàgina web i veure els diferents comptes que hi ha. Aquí buscarem el servei que ens interessi

  

![](attachments/128647511/128647542.png)

  

Aquí hem de triar la modalitat que ens interessi (PRO, PRE, DEV...) i copiem el seu numero de compte

  

![](attachments/128647511/128647538.png)

Amb aquest número, ja podem anar a dynatrace i posar el següent codi per a veure els logs d'aquest compte aws

  

**DQL CODE**

fetch logs 
| filter aws.account.id == "822120597696"
| sort timestamp desc

D'aquesta manera obtindrem tots els logs de Enotum en PRO

![](attachments/128647511/128647539.png)

Si volem veure quants directoris estem veient usem el següent codi:

**DQL CODE**

fetch logs 
| filter aws.account.id == "822120597696"
| summarize count(), by:{aws.log\_group}

![](attachments/128647511/128647540.png)

I si volguéssim veure els logs un d'aquests directoris en específic, copiem la ruta del qual vulguem i ho busquem així:

**DQL CODE**

fetch logs 
| filter aws.account.id == "822120597696"
| summarize count(), by:{aws.log\_group}

![](attachments/128647511/128647543.png)

De la mateixa manera, si ara volem filtrar aquests logs podem usar filter matchesPhrase(\*campoAFiltrar, "text")

**DQL CODE**

fetch logs 
| filter aws.account.id == "822120597696" and aws.log\_group=="/ecs/backend"
| filter matchesPhrase(loglevel, "INFO")
| sort timestamp desc

![](attachments/128647511/128647544.png)

IMPORTANTE

Aviat aquests comptes de aws, es veuran migrades a un compte comú. Cosa que significa que per a buscar serveis, ja no usarem un compte per a cadascun. Si no que usarem el compte comú 993192409012.

  

**DQL CODE**

fetch logs
| filter aws.account.id=="993192409012"
| summarize count(), by:{ecs\_cluster, ecs\_task\_definition}

![](attachments/128647511/128647545.png)

A partir d'aquest codi que ens mostra tots els serveis, per a accedir a cadascun d'ells usaríem el que posa en “ecs\_task\_definition” així:

**DQL CODE**

fetch logs
| filter aws.account.id=="993192409012"
| filter ecs\_task\_definition=="ecs-pro-enotum-backend-task-definition:30"

canviant el text pel servei al qual vulguem accedir

![](attachments/128647511/128647546.png)

*   #### On guardar el codi DQL creat
    

En la secció notebooks, li donem a “+Notebook”

![](attachments/128647511/128647548.png)

I ens crea un apartat on podem posar qualsevol codi que hàgim creat per a reutilitzar-lo les vegades que vulguem. Li donem a “New section”

![](attachments/128647511/128647549.png)

I afegim una secció de logs

![](attachments/128647511/128647550.png)

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2024-2-8\_11-24-36.png](attachments/128647511/128647512.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-5\_17-52-9.png](attachments/128647511/128647513.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-5\_17-51-28.png](attachments/128647511/128647514.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-5\_17-49-39.png](attachments/128647511/128647515.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-5\_17-49-6.png](attachments/128647511/128647516.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-5\_17-48-50.png](attachments/128647511/128647517.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-5\_17-48-6.png](attachments/128647511/128647518.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-5\_17-47-43.png](attachments/128647511/128647519.png) (image/png)  
![](images/icons/bullet_blue.gif) [Claranet-AOC - Matriz de escalado.pdf](attachments/128647511/128647520.pdf) (application/pdf)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_14-38-5.png](attachments/128647511/128647523.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_14-38-23.png](attachments/128647511/128647524.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_14-44-2.png](attachments/128647511/128647527.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_14-44-18.png](attachments/128647511/128647528.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_14-45-8.png](attachments/128647511/128647530.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_14-48-22.png](attachments/128647511/128647532.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_14-52-45.png](attachments/128647511/128647534.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_14-54-52.png](attachments/128647511/128647535.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_14-56-46.png](attachments/128647511/128647537.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_14-59-0.png](attachments/128647511/128647538.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_15-0-8.png](attachments/128647511/128647539.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_15-0-59.png](attachments/128647511/128647540.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_15-3-13.png](attachments/128647511/128647542.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_15-3-47.png](attachments/128647511/128647543.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_15-5-28.png](attachments/128647511/128647544.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_15-6-34.png](attachments/128647511/128647545.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_15-8-55.png](attachments/128647511/128647546.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_15-13-11.png](attachments/128647511/128647548.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_15-13-37.png](attachments/128647511/128647549.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-4-25\_15-13-56.png](attachments/128647511/128647550.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:18

[Atlassian](http://www.atlassian.com/)