Suport Tècnic : Manteniment PSCP  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [01 - Gestió Operativa](26313391.html)
4.  [Tasques complementàries](26313409.html)
5.  [Protocol Manteniment Aplicacions](Protocol-Manteniment-Aplicacions_39911467.html)

Suport Tècnic : Manteniment PSCP
================================

Created by Unknown User (oteccmorales), last modified on 27 January 2021

Pendent generar FAQs

Accions a realitzar:
--------------------

**PSCP**

Manteniment

Anys

mesos

Permanent

Comentari

Temps informació al sistema

1

  

NO

  

Informació al sistema historificada

\-

\-

NO

  

Documents en el File System

1

\-

NO

  

Documents en el File System historificats

\-

\-

NO

  

Aquest servei és una simple passarel·la cap al servei del Departament d'Economia i per tant la conservació de les dades no és important més enllà de permetre la operativa normal d'aquest servei.

Per tant, la política proposada per aquest servei és:

    **deixar un any enrere (AVUI - 365 dies)** \[ho ha de validar cap se servei\]

A la BD, les taules implicades en el funcionament de la modalitat de consum son les següents:

AOC\_MCPSCP\_ITEM
AOC\_MCPSCP\_PETICIO
AOC\_MCPSCP\_PETICIO\_ITEM 

Per a eliminar els registres de la base de dades, respectant les constraints del model de dades, cal seguir les següents passes:

1.  Sel·lecionar de la taula AOC\_MCPSCP\_ITEM els registres amb data anterior a (AVUI - 365 dies).
2.  Eliminar els registres amb els ID obtinguts a (.1) de la taula AOC\_MCPSCP\_PETICIO\_ITEM \[taula de relació de la petició amb els items XML que la conformen\].
3.  Eliminar els registres amb els ID obtinguts a (.1) de la taula AOC\_MCPSCP\_PETICIO \[taula de peticions amb el ID d'expedient i ID del publicador\]
4.  Eliminar els registres amb els ID obtinguts a (.1) de la taula AOC\_MCPSCP\_ITEM \[missatges XML i estat del seu processament dins del cicle de vida d'una publicació a PSCP\]
5.  Eliminar els documents corresponents als adjunts. Aquests fitxers es carreguen al realitzar les peticions a la PCI amb MTOM/XOP. A priori aquests fitxers s'eliminen dins del procés de purga de fitxers de la PCI.

  

Les dades es conserven al propi servei de la Plataforma de Serveis de Contractació Pública del Departament d'Economia i per tant no tenim cap requeriment de conservació o historificació d'aquestes dades.

Llista de tiquets oberts per la gestió
--------------------------------------

Taula:

Tiquet SE

Tiquet PRJ

Tiquet SIS

Mantenim Programat

Comentaris

[SE-1921](https://contacte.aoc.cat/browse/SE-1921?src=confmacro) - Data cannot be retrieved due to an unexpected error.

  

[SIS-3500](https://contacte.aoc.cat/browse/SIS-3500?src=confmacro) - Data cannot be retrieved due to an unexpected error.

[SIS-3744](https://contacte.aoc.cat/browse/SIS-3744?src=confmacro) - Data cannot be retrieved due to an unexpected error.

  

Proposta de PRJ validada per cap de servei :

Aquest servei és una simple passarel·la cap al servei del Departament d'Economia i per tant la conservació de les dades no és important més enllà de permetre l'operativa normal d'aquest servei.

Per tant, la política proposada per aquest servei és:

    **deixar un any enrere (AVUI - 365 dies)** 

  

  

Related issues

[ST-9226](https://contacte.aoc.cat/browse/ST-9226?src=confmacro) - Data cannot be retrieved due to an unexpected error.

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2018-6-11\_10-42-8.png](attachments/41517446/41517447.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-6-11\_10-42-56.png](attachments/41517446/41517448.png) (image/png)  
![](images/icons/bullet_blue.gif) [ConfiguracioEns.xlsx](attachments/41517446/41517449.xlsx) (application/vnd.openxmlformats-officedocument.spreadsheetml.sheet)  
![](images/icons/bullet_blue.gif) [image2018-6-11\_10-58-25.png](attachments/41517446/41517450.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-6-11\_11-1-30.png](attachments/41517446/41517451.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-6-11\_11-5-15.png](attachments/41517446/41517452.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-6-11\_11-7-54.png](attachments/41517446/41517453.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-6-11\_11-9-29.png](attachments/41517446/41517454.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-6-11\_11-19-38.png](attachments/41517446/41517455.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-6-11\_11-23-18.png](attachments/41517446/41517456.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-6-11\_11-24-22.png](attachments/41517446/41517457.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-6-11\_11-32-12.png](attachments/41517446/41517458.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-1-31\_9-43-47.png](attachments/41517446/41517459.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-1-31\_9-46-59.png](attachments/41517446/41517460.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-2-20\_10-6-38.png](attachments/41517446/41517461.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:49

[Atlassian](http://www.atlassian.com/)