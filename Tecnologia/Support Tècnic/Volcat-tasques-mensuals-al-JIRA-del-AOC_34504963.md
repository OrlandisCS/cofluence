Suport Tècnic : Volcat tasques mensuals al JIRA del AOC  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [01 - Gestió Operativa](26313391.md)
4.  [Tasques complementàries](26313409.md)

Suport Tècnic : Volcat tasques mensuals al JIRA del AOC
=======================================================

Created by Unknown User (oteccmorales), last modified by OTEC ST JAlejandro Cardete Postigo on 01 December 2022

Al inici de cada mes s'han de volcar els tiquets de tasques mensuals al JIRA.

Les accions a realitzar són:

  

Tancar tiquets del mes anterior

Fem la següent consulta al filtre de JIRA:

project = ST AND issuetype in (Consulta, Desplegament, Incidencia, Petició, "Seguiment de 3ers", Suggeriment, "Suport 24x7", Tarea, Sub-task, Subtarea) AND status in (Open, "In Progress", "Pending 3rd", "Pending Info") AND labels in (Sistemes, Suport-Tiqueting, Suport-Ticketing, Tasques\_Gestió) AND summary !~ PLANTILLA AND summary ~ "04/2022" ORDER BY labels ASC

Cercarem les peticions el mes anterior (les que hem de tancar):

![](attachments/34504963/34504974.png)

![](attachments/34504963/34504975.png)

![](attachments/34504963/34504976.png)

![](attachments/34504963/34504977.png)

Una vegada les tinguem en estat "resolta", hem de tindre un altre filtre:

  

project = ST AND issuetype in (Consulta, Desplegament, Incidencia, Petició, "Seguiment de 3ers", Suggeriment, "Suport 24x7", Tarea, Sub-task, Subtarea) AND status not in (Open, "In Progress", "Pending 3rd", "Pending Info") AND labels in (Sistemes, Suport-Tiqueting, Suport-Ticketing, Tasques\_Gestió) AND summary !~ PLANTILLA AND summary ~ "04/2022" ORDER BY labels ASC

  
![](attachments/34504963/36339730.png)

  

Hem de fer les mateixes passes per modificar l'estat fins "Tancada".

Només pot tancar les peticions la persona que les va generar el mes anterior.

  

  

  

  

Generar els nous tiquets

Una vegada tanquem els tiquets, procedim a generar els nous:

Anem a : [http://10.120.1.242:8081/mostrarTicketsMensualsST](http://10.120.1.242:8081/mostrarTicketsMensualsST)

S'han de crear en el mes en curs que es volguin crear.

![](attachments/34504963/64981275.png)

A sota afegim l'usuari i el password de JIRA  i cliquem a Crear tiquets.

![](attachments/34504963/64981276.png)

Una vegada donem a Crear Tickets, es generaran tots els tiquets, i per confirmar que s'han creat correctament, ens ha de sortir un llistat amb tots els números de tiquet. Per visualitzar-los en JIRA hem de modificar la Query indicada a l'inici amb la data del mes en curs. **(en total són 35 tiquets (tasques i subtasques)):**

![](attachments/34504963/36339735.png)

Per modificar

Tots els tiquets es generaran en nom de qui fa la tasca. Els hem d'assignar massivament a "Juan Cardete"

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2019-8-5\_12-6-25.png](attachments/34504963/34504964.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-5\_12-5-28.png](attachments/34504963/34504965.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-5\_11-34-6.png](attachments/34504963/34504966.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-5\_11-32-8.png](attachments/34504963/34504967.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-5\_11-28-17.png](attachments/34504963/34504968.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-5\_11-24-59.png](attachments/34504963/34504969.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-5\_11-22-12.png](attachments/34504963/34504970.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-5\_11-21-47.png](attachments/34504963/34504971.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-5\_11-20-6.png](attachments/34504963/34504972.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-8-5\_11-17-11.png](attachments/34504963/34504973.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-10\_16-57-10.png](attachments/34504963/34504974.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-10\_16-57-29.png](attachments/34504963/34504975.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-10\_16-57-45.png](attachments/34504963/34504976.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-10\_16-58-1.png](attachments/34504963/34504977.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-12\_15-51-39.png](attachments/34504963/34505019.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-12\_15-51-56.png](attachments/34504963/34505020.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-12\_15-52-12.png](attachments/34504963/34505021.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-2-12\_15-53-29.png](attachments/34504963/34505022.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-2\_16-6-52.png](attachments/34504963/36339730.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-2\_16-43-49.png](attachments/34504963/36339734.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-2\_16-44-41.png](attachments/34504963/36339735.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-5-3\_12-9-43.png](attachments/34504963/64981275.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-5-3\_12-10-26.png](attachments/34504963/64981276.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:49

[Atlassian](http://www.atlassian.com/)