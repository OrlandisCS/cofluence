Suport Tècnic : BEA8 - Error al eliminar un RDBMS  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [04 - Tècnica de sistemes + 24x7 + Padró](26313202.md)
4.  [FAQs Infraestructura](FAQs-Infraestructura_26313593.md)

Suport Tècnic : BEA8 - Error al eliminar un RDBMS
=================================================

Created by Unknown User (dandreus), last modified by Unknown User (otecobernal) on 09 August 2019

[.rwui\_id\_77949162-b9af-4a90-8aa2-30810a0117a0 {color: #FFFFFF !important; background: rgb(121,201,123);}.rwui\_id\_77949162-b9af-4a90-8aa2-30810a0117a0:hover {background: rgb(112,186,114);}.rwui\_id\_77949162-b9af-4a90-8aa2-30810a0117a0 .rwui\_icon {color: #FFFFFF !important;}Principal BEAs](https://steps.everis.com/confluence/display/AOC/03.+WEBLOGICS+BEA "Principal BEAs")
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Problema
--------

Si en eliminar un RDBMS des del wliconsole de BEA ens dóna l'error: 

This page displays a list of RDBMS Event Generators. To view or edit details about the Event Generator, click the Generator name. To add an Event Generator, click 'Create New'.  
  
Currently WebLogic Integration will only support a single instance of an integration cluster in a multi-clustered environment. This cluster must also be explicitly named in the WebLogic Integration configuration file. Please correct this and try again.

Solució
-------

Per solucionar aquest problema, seguirem aquest pas a pas: 

Abans de res intentar fer el procediment de reiniciar els nodes i l'admin de forma ordenada, si després de fer aquests reinicis encara surt l'error a l’hora d'eliminar el RDBMS, cal fer el següent procediment:

1.  **Fer backup del RDBMS** que falla (captura de pantalla, notepad...)
2.  Tant en el node1 i el node2 es troba un XML anomenat: **RDBMSEventGen.xml**, que es troba a les següents rutes:  
    1.  Node 1(aoc-l-app1): 
        
        /apps/bea/beaplat/user\_projects/domains/PCIDomain/wliconfig/
        
        /apps/bea/beaplat/user\_projects/domains/AppDomain/wliconfig/AppNodo1/
        
    2.  Node 2(aoc-l-app2):
        
        /apps/bea/beaplat/user\_projects/domains/AppDomain/wliconfig/
        
        /apps/bea/beaplat/user\_projects/domains/AppDomain/wliconfig/AppNodo2/
        
3.  **Fer un backup del XML** abans de modificar res:
    1.  A cada ruta farem aquesta comanda:
        
        cp RDBMSEventGen.xml RDBMSEventGen.xml.data\_del\_dia
        
4.  Ja podem modificar el fitxer RDBMSEventGen.xml

1.  Farem en cada ruta on es troba el fitxer:
    
    vi RDBMSEventGen.xml
    
2.  Dins del vi farem: /”nom\_rdbms” (Ex: /”OVER2”)
3.  Eliminarem tot el contingut del **tag** de l'XML relacionat amb el **RDBMS** que ens dóna problemes a l’hora d'eliminar. __Exemple per eliminar tot el relacionat amb el RDBMS over2 tindríem que eliminar tot això del xml:__
    
    <RDBMSEventGenConfiguration
    name="OVER2"><channel
    queue-connection-factory="wli.internal.egrdbms.XAQueueConnectionFactory"
    generate-Schema="false" payload-format="xml"
    post-query="UPDATE OVER\_TRAMIT\_INSTANCIA SET ESTAT=-1 WHERE ID=@ID"
    query="SELECT ID FROM OVER\_TRAMIT\_INSTANCIA WHERE TRAMITAT=1 AND ESTAT=1
    AND INTENTS &lt; 5" polling-interval="10"
    max-rows-per-event="1" max-rows="1" polling-threads="1"
    column-names="" polled-at-column-name="BEA\_POLLED\_AT"
    id-column-name="BEA\_SEQ\_ID" event-table-name=""
    data-source-name="overDataSource" db-vendor-name=""
    event-sub-type="Insert" event-type="Select"
    event-name="OVER2" channel-id="1520441120468"
    comment="OVER2" publish-as-user=""
    channel="/www.aoc.cat/over/motor/tramitacio-asincrona"/></RDBMSEventGenConfiguration>
    
    i així seria visió normal del tot el fitxer seleccionat el que hem d'eliminar per aquest exemple de OVER2:
    
    ![](attachments/26313592/26316367.png)

6.  Caldrà **revisar també el fitxer RDBMSEventGen.xml.backup** tant del node 1 com el 2 dels directoris:  
    \- /apps/bea/beaplat/user\_projects/domains/AppDomain/wliconfig  
    \-/apps/bea/beaplat/user\_projects/domains/AppDomain/wliconfig/AppNodo1 i AppNodo2  
      
    I eliminar les mateixes traces que hem indicat en els passos següents.  
      
    
7.  Ara ja només queda tornar a reiniciar els nodes i l'admin de forma ordenada, un cop fet el reinici veurem que en la wliconsole del BEA (portal on recreem els RDBMS) ja directament ni sortirà el RDBMS el qual teníem problemes a l’hora d'eliminar, només farà falta tornar-lo a crear amb la captura de pantalla que hem realitzat abans com a còpia de seguretat del RDBMS.

Resum:

et baixes el fitxer que vols modificar  
el modifiques i el copies al node1 a la ruta: /apps/bea/beaplat/user\_projects/domains/AppDomain/wliconfig/AppNodo1  
I al node2 a les rutes:  
/apps/bea/beaplat/user\_projects/domains/AppDomain/wliconfig/AppNodo2  
/apps/bea/beaplat/user\_projects/domains/AppDomain/wliconfig  
i a la ruta /apps/bea/beaplat/user\_projects/domains/AppDomain/wliconfig/ el .backup amb la mateixa informació  
això per APP  
a IOP seria amb els nodes canviats

Related articles
----------------

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2018-3-12\_10-1-54.png](attachments/26313592/26316367.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:17

[Atlassian](http://www.atlassian.com/)