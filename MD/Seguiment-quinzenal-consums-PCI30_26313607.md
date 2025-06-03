Suport Tècnic : Seguiment quinzenal consums PCI30  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [01 - Gestió Operativa](26313391.html)
4.  [Tasques complementàries](26313409.html)

Suport Tècnic : Seguiment quinzenal consums PCI30
=================================================

Created by Unknown User (obernalp), last modified by Unknown User (otecobernal) on 09 August 2019

Cada 15 dies rebrem un correu indicant quines entitats han realitzat més consums a la PCI30 (**Monitoratge dels consums a la PCI30**):

![](attachments/26313607/26317541.png)

El correu s'envia el dia 1 i 16 de cada mes i les consultes a BBDD que realitza són les següents:

**Extració del correu**

\-- Fer la consulta per vada entorn
select ENS.UEN\_NOM\_CURT "NOM",
       TOTALS.codi\_ens "CODI\_ENS",
       TOTALS.PETICIONS "SOL- LICITUDS REALITZADES",
       CONCAT(ROUND(100 \* TOTALS.PETICIONS / PETICIONS.PETICIONS, 2), '%') "PERCENTATGE DE CONSUM"
  from (select codi\_ens, count(\*) "PETICIONS"
          FROM PCI\_MTI\_SOLICITUD sol, PCI\_MTI\_PETICIO pet
         where sol.ID\_PETICIO = pet.id
           and pet.Data\_Recepcio > sysdate - 15
         group by pet.codi\_ens) "TOTALS",
       (select sum(count(pet.codi\_ens)) "PETICIONS"
          FROM PCI\_MTI\_SOLICITUD sol, PCI\_MTI\_PETICIO pet
         where sol.ID\_PETICIO = pet.id
           and pet.Data\_Recepcio > sysdate - 15
         group by pet.codi\_ens) "PETICIONS",
         usu\_ens ENS
 WHERE TO\_CHAR(ENS.uen\_codi\_ens) = TO\_CHAR(TOTALS.codi\_ens)
 AND 100 \* TOTALS.PETICIONS / PETICIONS.PETICIONS > 10
 order by TOTALS.PETICIONS / PETICIONS.PETICIONS desc

  

Un cop rebem el correu haurem de realitzar una anàlisi dels productes que han consumit aquestes entitats:

Analitzar les peticions

Per tal d'analitzar el % de consums podem executar la següent consulta:

La consulta consumeix molts recursos, haurem de vigilar i no executar-la més del compte.

select ENS.UEN\_NOM\_CURT "NOM",
       PETICIONS\_ENS.codi\_ens "CODI\_ENS",
       PETICIONS\_ENS.NUM\_PETICIONS "SOL·LICITUDS REALITZADES",
       CONCAT(ROUND(100 \* PETICIONS\_ENS.NUM\_PETICIONS / PETICIONS\_TOTALS.NUM\_PETICIONS, 2), '%') "PERCENTATGE DE CONSUM"
  from (select codi\_ens, count(\*) "NUM\_PETICIONS"
          FROM PCI\_MTI\_SOLICITUD sol, PCI\_MTI\_PETICIO pet
         where sol.ID\_PETICIO = pet.id
           and pet.Data\_Recepcio > sysdate - 15
         group by pet.codi\_ens) "PETICIONS\_ENS",
       (select sum(count(pet.codi\_ens)) "NUM\_PETICIONS"
          FROM PCI\_MTI\_SOLICITUD sol, PCI\_MTI\_PETICIO pet
         where sol.ID\_PETICIO = pet.id
           and pet.Data\_Recepcio > sysdate - 15
         group by pet.codi\_ens) "PETICIONS\_TOTALS",
         usu\_ens ENS
 WHERE TO\_CHAR(ENS.uen\_codi\_ens) = TO\_CHAR(PETICIONS\_ENS.codi\_ens)
 AND 100 \* PETICIONS\_ENS.NUM\_PETICIONS / PETICIONS\_TOTALS.NUM\_PETICIONS > 10
 order by PETICIONS\_ENS.NUM\_PETICIONS / PETICIONS\_TOTALS.NUM\_PETICIONS desc

El resultat és el següent:

![](attachments/26313462/26313859.png)

  

Per tal d'analitzar els productes consumits podem executar la següent consulta:

select pet.codi\_producte, count(\*) "Peticions"
          FROM PCI\_MTI\_PETICIO pet
         where pet.Data\_Recepcio > sysdate - 15
           and pet.codi\_ens = '16'
         group by pet.codi\_producte
         order by count(\*) desc

El resultat és el següent:

![](attachments/26313462/26314430.png)

  

Tambè existeix una altre taula per trobar informació més general a la PCI, que es la següent: PCI\_MTI\_SOLICITUD\_INFO

![](attachments/26313462/93356728.png)

  

Si filtrem pel **titular\_doc** amb **solicitant\_id** podem obtenir els idPeticio de les peticions per revisar-les.

  

  

  

Sobretot haurem de vigilar a l'entorn de PRE, ja que a vegades, es fan consums excessius que ens saturen les plataformes. El correu el podem enviar a l'equip SuportTecnicD <**[suporttecnic@aoc.cat](mailto:suporttecnic@aoc.cat)**\> (responent al correu automàtic).

![](attachments/26313607/26317419.png)

Les següents accions serà avisar als diferents ens que han sobrepassat el llindar de peticions. Per fer-ho enviarem un correu a cada entitat explicant el seu cas i demanant explicacions per l'elevat nombre de consums a les nostres plataformes:

![](attachments/26313607/26317424.png)

Correu d'avís

**Títol**: AOC\_Suport: Excés de consums al nostre entorn de Preproducció - Aj. de Tarragona

Bon dia,

Hem detectat que als últims 15 dies heu realitzat un gran nombre de consums a les nostres plataformes de preproducció.

Ens consten un total de  **266.125** peticions al **MUX** de PRE, **10.144** peticions d’ **e-TAULER** i **5.844** peticions d’**e-NOTUM**.

Hi ha alguna raó per la qual realitzeu tants consums? Podríeu mirar de reduir-los?

Per qualsevol dubte o suggeriment estem a la vostra disposició.

Salutacions cordials i gràcies per avançat.

  

Finalment podrem tornar a respondre al correu enviat a ST amb les accions realitzades. A més, per poder gestionar aquests casos amb més eficàcia afegirem tots els correus (tant el d'accions realitzades com els d'avisos) a la carpeta **03 SEGUIMENT/Consums** **PCI:**

**![](attachments/26313607/26317375.png)**

Consulta les dades purgades

En cas d'interès, també podríem revisar el volum de dades purgades en una finestra de 7 dies, per la tasca de purga setmanal.

**Extració del correu**

select codi\_requeridor, codi\_producte, count(\*)
 from PCI\_MTI\_AUDIT 
 where data\_purga > '29/06/2019'
 group by codi\_requeridor, codi\_producte
 order by count(\*) desc
 




-- Fer la consulta per cada entorn
select ENS.UEN\_NOM\_CURT "NOM",
       TOTALS.codi\_ens "CODI\_ENS",
       TOTALS.PETICIONS "SOL- LICITUDS REALITZADES",
       CONCAT(ROUND(100 \* TOTALS.PETICIONS / PETICIONS.PETICIONS, 2), '%') "PERCENTATGE DE CONSUM"
  from (select codi\_ens, count(\*) "PETICIONS"
          FROM PCI\_MTI\_SOLICITUD sol, PCI\_MTI\_PETICIO pet
         where sol.ID\_PETICIO = pet.id
           and pet.Data\_Recepcio > sysdate - 15
         group by pet.codi\_ens) "TOTALS",
       (select sum(count(pet.codi\_ens)) "PETICIONS"
          FROM PCI\_MTI\_SOLICITUD sol, PCI\_MTI\_PETICIO pet
         where sol.ID\_PETICIO = pet.id
           and pet.Data\_Recepcio > sysdate - 15
         group by pet.codi\_ens) "PETICIONS",
         usu\_ens ENS
 WHERE TO\_CHAR(ENS.uen\_codi\_ens) = TO\_CHAR(TOTALS.codi\_ens)
 AND 100 \* TOTALS.PETICIONS / PETICIONS.PETICIONS > 10
 order by TOTALS.PETICIONS / PETICIONS.PETICIONS desc

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2018-10-4\_9-16-23.png](attachments/26313607/26316539.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-10-4\_9-31-26.png](attachments/26313607/26316477.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-10-4\_9-31-44.png](attachments/26313607/26316479.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-10-4\_9-32-9.png](attachments/26313607/26316486.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-10-4\_9-36-38.png](attachments/26313607/26316488.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-10-4\_9-36-50.png](attachments/26313607/26316489.png) (image/png)  
![](images/icons/bullet_blue.gif) [ExtraccioPCI30.xlsx](attachments/26313607/26316499.xlsx) (application/vnd.openxmlformats-officedocument.spreadsheetml.sheet)  
![](images/icons/bullet_blue.gif) [image2019-4-8\_16-32-8.png](attachments/26313607/26317541.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-4-9\_12-36-48.png](attachments/26313607/26317419.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-4-9\_12-39-3.png](attachments/26313607/26317424.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-4-9\_12-48-27.png](attachments/26313607/26317375.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:49

[Atlassian](http://www.atlassian.com/)