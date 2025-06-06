Suport Tècnic : VO - DCOC - FLUX DE SERVEI - Procediment per desencallar projectes DCOC que no es descarreguen  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [02 - FAQ's serveis](26313393.md)
4.  [FAQ's VO](28705575.md)
5.  [FAQ's VO - Col·legis Professionals](28705581.md)
6.  [VO - DCOC](VO---DCOC_36340967.md)

Suport Tècnic : VO - DCOC - FLUX DE SERVEI - Procediment per desencallar projectes DCOC que no es descarreguen
==============================================================================================================

Created by Unknown User (jxnieto), last modified on 27 October 2021

Per a desencallar aquests projectes visats que no estan descarregats (estat = 3, sense data de descàrrega i data de darrera petició > 1 dies):

![](attachments/64978983/64979026.png)

  

Si tenim aquest estat 3 vol dir que nosaltres estem esperant un callback del col·legi que per norma general els col·legis informen de les dades del projecte relativament aviat (no passa ni una hora). Això vol dir que si fa més d’un dia que l’estem esperant, segurament no arribi mai fins que el tornem a demanar.

Per aquests casos el que cal fer es:

*   Buscar el projecte de BBDD ( taula AOC\_DCOC\_PROJECTE) i esborrar-lo:

![](attachments/64978983/64979027.png)

*   Enviar petició de descàrrega PCI (amb ens Consorci AOC) amb l’identificador de projecte.
*   Un cop veiem que el projecte està en estat 0 (descarregat)
    *   SI la petició està finalitzada a PCI, directament des de la web d’administració de PCI (detall de sol·licitud) a través del botó Reinciar:

*   Revisar Si cal, actualitzar els estats de la BBDD de la petició PCI per a que finalitzi la resposta.

![](attachments/64978983/64979028.png)

*   En cas que la petició no estigui finalitzada, serà necessari revisar que a BBDD l’estat sigui 5 (que es el que busca l’RDBMS EG de la fase actualització resposta). Buscar l’identificador de petició PCI encallat i actualitzar-lo (estat 5 i data\_proces < TTL):

  

Una altra opció seria que quan tenim el projecte descarregat (estat 0) demanar al requeridor que faci una nova petició (ID PCI nou) per a no haver de restablir aquests valors per a que finalitzin les peticions.

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2020-5-18\_10-54-43.png](attachments/64978983/64978984.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-5-18\_10-47-35.png](attachments/64978983/64978985.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-7-24\_9-51-54.png](attachments/64978983/64978986.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-7-24\_10-2-11.png](attachments/64978983/64978987.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-7-24\_10-11-59.png](attachments/64978983/64978988.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-7-24\_10-18-56.png](attachments/64978983/64978989.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-7-24\_10-18-59.png](attachments/64978983/64978990.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-7-24\_11-48-37.png](attachments/64978983/64978991.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-7-24\_14-37-2.png](attachments/64978983/64978992.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-7-24\_14-39-51.png](attachments/64978983/64978993.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-7-24\_14-54-25.png](attachments/64978983/64978994.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-7-24\_15-8-34.png](attachments/64978983/64978995.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-7-24\_15-11-6.png](attachments/64978983/64978996.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-7-24\_15-11-15.png](attachments/64978983/64978997.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-7-24\_15-12-37.png](attachments/64978983/64978998.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-3-28\_11-52-41.png](attachments/64978983/64978999.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-21\_17-45-58.png](attachments/64978983/64979000.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-21\_18-49-35.png](attachments/64978983/64979001.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-21\_18-54-10.png](attachments/64978983/64979002.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-21\_18-57-46.png](attachments/64978983/64979003.png) (image/png)  
![](images/icons/bullet_blue.gif) [Correu permisos COEIC.msg](attachments/64978983/64979004.msg) (application/vnd.ms-outlook)  
![](images/icons/bullet_blue.gif) [image2019-8-22\_18-0-48.png](attachments/64978983/64979005.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-22\_18-4-39.png](attachments/64978983/64979006.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-22\_18-9-15.png](attachments/64978983/64979007.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-22\_18-17-7.png](attachments/64978983/64979008.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-22\_18-19-30.png](attachments/64978983/64979009.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-22\_18-26-29.png](attachments/64978983/64979010.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-22\_18-27-29.png](attachments/64978983/64979011.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-22\_18-28-17.png](attachments/64978983/64979012.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-22\_18-29-30.png](attachments/64978983/64979013.png) (image/png)  
![](images/icons/bullet_blue.gif) [DCOC\_Integració\_nous\_col·legis.pdf](attachments/64978983/64979014.pdf) (application/pdf)  
![](images/icons/bullet_blue.gif) [MC DCOC - Manual explotació.doc](attachments/64978983/64979015.doc) (application/msword)  
![](images/icons/bullet_blue.gif) [MC DCOC - Manual d'instal·lació BEA.doc](attachments/64978983/64979016.doc) (application/msword)  
![](images/icons/bullet_blue.gif) [image2019-9-4\_14-51-13.png](attachments/64978983/64979017.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-9-4\_14-58-1.png](attachments/64978983/64979018.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-9-4\_14-59-59.png](attachments/64978983/64979019.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-27\_10-43-58.png](attachments/64978983/64979026.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-27\_10-46-41.png](attachments/64978983/64979027.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-10-27\_10-47-52.png](attachments/64978983/64979028.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:02

[Atlassian](http://www.atlassian.com/)