Suport Tècnic : SSC - Revisions i Restabliment  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [04 - Tècnica de sistemes + 24x7 + Padró](26313202.md)
4.  [Revisió de serveis](36340340.md)

Suport Tècnic : SSC - Revisions i Restabliment
==============================================

Created by Unknown User (otecobernal), last modified by Oriol Bernal on 21 October 2024

El SSC o Servei de Signatura Centralitzada és un servei de Signatura Electrònica basada en certificats digitals.

*   Blog de suport: 
*   Document d'integració: 
*   Documents proporcionats per la OT del servei:
    *   [![](rest/documentConversion/latest/conversion/thumbnail/41522071/1)](/download/attachments/41521367/diagramaAOC_OTEC_SSC_2.pdf?version=1&modificationDate=1615557014853&api=v2)[TX\_SHELL - Command Shell.pdf](attachments/41521367/41522072.pdf)

Entorns
=======

Disposa de 3 entorns (de cara als usuaris): Producció, DR i Preproducció:

De moment no disposem de dades

AJS.toInit(function() { aptis.plugins.serverStatus.startAjaxRequestHttpRequest('APTIS\_55580', 'https://confluence.aoc.cat/rest/serverStatus/1.0/service/httpRequest', 'https://57.133.98.218:8443/', '30'); AJS.$('#APTIS\_55580').click(function(e) { if (!AJS.$('#APTIS\_55580').hasClass('loading')) { aptis.plugins.serverStatus.updateUserInterface("loading", "", 'APTIS\_55580'); aptis.plugins.serverStatus.startAjaxRequestHttpRequest('APTIS\_55580', 'https://confluence.aoc.cat/rest/serverStatus/1.0/service/httpRequest', 'https://57.133.98.218:8443/', '30'); } }); });

AJS.toInit(function() { aptis.plugins.serverStatus.startAjaxRequestHttpRequest('APTIS\_45015', 'https://confluence.aoc.cat/rest/serverStatus/1.0/service/httpRequest', 'https://185.86.34.153:8443/', '30'); AJS.$('#APTIS\_45015').click(function(e) { if (!AJS.$('#APTIS\_45015').hasClass('loading')) { aptis.plugins.serverStatus.updateUserInterface("loading", "", 'APTIS\_45015'); aptis.plugins.serverStatus.startAjaxRequestHttpRequest('APTIS\_45015', 'https://confluence.aoc.cat/rest/serverStatus/1.0/service/httpRequest', 'https://185.86.34.153:8443/', '30'); } }); });

AJS.toInit(function() { aptis.plugins.serverStatus.startAjaxRequestHttpRequest('APTIS\_31167', 'https://confluence.aoc.cat/rest/serverStatus/1.0/service/httpRequest', 'https://ssc.preproduccio.aoc.cat:8090/', '30'); AJS.$('#APTIS\_31167').click(function(e) { if (!AJS.$('#APTIS\_31167').hasClass('loading')) { aptis.plugins.serverStatus.updateUserInterface("loading", "", 'APTIS\_31167'); aptis.plugins.serverStatus.startAjaxRequestHttpRequest('APTIS\_31167', 'https://confluence.aoc.cat/rest/serverStatus/1.0/service/httpRequest', 'https://ssc.preproduccio.aoc.cat:8090/', '30'); } }); });

  
Actualment, a PRO oferim el servei a través de:

Trobar entorn ssc      

Calculant entorn... refresh
===========================

function setBadge(msg, classColor) { $('#ssc-badge').hasClass('badge-success') ? $('#ssc-badge').toggleClass('badge-success') : null; $('#ssc-badge').hasClass('badge-danger') ? $('#ssc-badge').toggleClass('badge-danger') : null; $('#ssc-badge').hasClass('badge-secondary') ? $('#ssc-badge').toggleClass('badge-secondary') : null; $('#ssc-badge').addClass(classColor); $('#ssc-text').text(msg); } function loading() { $('#ssc-refresh').hide(); $('#ssc-refresh').prop('disabled', true); $('#ssc-spinner').show(); } function finished() { $('#ssc-refresh').show(); $('#ssc-refresh').prop('disabled', false); $('#ssc-spinner').hide(); } function showEntorn() { loading(); setBadge('Calculant entorn...', 'badge-secondary') var url = 'https://steakovercooked.com/api/ping/?host=' + 'ssc.aoc.cat'; $.ajax(url, { success: function(data) { finished(); data.includes('57.133') ? setBadge('Kyndryl', 'badge-success') : data.includes('185.86') ? setBadge('Nexica', 'badge-success') : setBadge('Unkown', 'badge-danger'); }, error: function() { finished(); setBadge('Error', 'badge-danger') } }); } showEntorn();

[SSC - Canvi de DNS](SSC---Canvi-de-DNS_118554717.md)

.rwui\_text\_box.rwui\_id\_c5290ac8-6f6f-4f84-b63a-5fe0a0e16c4e {background-color: #E9F7E9; color: #32561F;}.rwui\_text\_box.rwui\_id\_c5290ac8-6f6f-4f84-b63a-5fe0a0e16c4e \*:not(.rwui\_content) {color: #32561F;}.rwui\_text\_box.rwui\_id\_c5290ac8-6f6f-4f84-b63a-5fe0a0e16c4e span.rwui\_icon {color: #32561F;}

Infraestructura
===============

[.rwui\_id\_b85a684e-0662-4f0a-967f-fabca8095405 {color: #FFFFFF !important; background: rgb(67,197,208);}.rwui\_id\_b85a684e-0662-4f0a-967f-fabca8095405:hover {background: rgb(62,182,192);}.rwui\_id\_b85a684e-0662-4f0a-967f-fabca8095405 .rwui\_icon {color: #FFFFFF !important;}Revisió del Servei](https://confluence.aoc.cat/pages/viewpage.action?pageId=36340764#expand-ReinicidelSSC "Revisió del Servei")
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[.rwui\_id\_a2852fae-7ade-4746-b74d-e67531d8cbd5 {color: #ffffff !important; background: rgb(225,131,68);}.rwui\_id\_a2852fae-7ade-4746-b74d-e67531d8cbd5:hover {background: rgb(208,121,63);}.rwui\_id\_a2852fae-7ade-4746-b74d-e67531d8cbd5 .rwui\_icon {color: #ffffff !important;}Components del Servei](http://192.168.166.136:8080/ServeisIntegracio/mapaServeis "Components del Servei")
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  

Dades d'interés
===============

**FAQ's del servei**

   

             

  

Mapa del servei
===============

![](attachments/41521367/118554799.png)

Attachments:
------------

![](images/icons/bullet_blue.gif) [diagramaAOC\_OTEC\_SSC\_2.pdf](attachments/41521367/41522071.pdf) (application/pdf)  
![](images/icons/bullet_blue.gif) [TX\_SHELL - Command Shell.pdf](attachments/41521367/41522072.pdf) (application/pdf)  
![](images/icons/bullet_blue.gif) [image2024-10-21\_21-22-23.png](attachments/41521367/118554799.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:14

[Atlassian](http://www.atlassian.com/)