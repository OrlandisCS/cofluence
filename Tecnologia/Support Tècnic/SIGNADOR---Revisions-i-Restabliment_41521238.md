Suport Tècnic : SIGNADOR - Revisions i Restabliment  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [04 - Tècnica de sistemes + 24x7 + Padró](26313202.md)
4.  [Revisió de serveis](36340340.md)

Suport Tècnic : SIGNADOR - Revisions i Restabliment
===================================================

Created by Unknown User (otecobernal), last modified by Oriol Bernal on 18 October 2024

El Signador és un servei de Signatura Electrònica basada en certificats digitals.

*   Blog de suport: [](https://signador.aoc.cat/signador/init)
*   Document d'integració: [](https://github.com/ConsorciAOC/signador)

Entorns
=======

Disposa de 3 entorns (de cara als usuaris): Producció, DR i Preproducció:

AJS.toInit(function() { aptis.plugins.serverStatus.startAjaxRequestHttpRequest('APTIS\_29350', 'https://confluence.aoc.cat/rest/serverStatus/1.0/service/httpRequest', 'http://157.97.65.47/signador/init', '30'); AJS.$('#APTIS\_29350').click(function(e) { if (!AJS.$('#APTIS\_29350').hasClass('loading')) { aptis.plugins.serverStatus.updateUserInterface("loading", "", 'APTIS\_29350'); aptis.plugins.serverStatus.startAjaxRequestHttpRequest('APTIS\_29350', 'https://confluence.aoc.cat/rest/serverStatus/1.0/service/httpRequest', 'http://157.97.65.47/signador/init', '30'); } }); });

AJS.toInit(function() { aptis.plugins.serverStatus.startAjaxRequestHttpRequest('APTIS\_55633', 'https://confluence.aoc.cat/rest/serverStatus/1.0/service/httpRequest', 'http://185.86.34.141/signador/init', '30'); AJS.$('#APTIS\_55633').click(function(e) { if (!AJS.$('#APTIS\_55633').hasClass('loading')) { aptis.plugins.serverStatus.updateUserInterface("loading", "", 'APTIS\_55633'); aptis.plugins.serverStatus.startAjaxRequestHttpRequest('APTIS\_55633', 'https://confluence.aoc.cat/rest/serverStatus/1.0/service/httpRequest', 'http://185.86.34.141/signador/init', '30'); } }); });

AJS.toInit(function() { aptis.plugins.serverStatus.startAjaxRequestHttpRequest('APTIS\_34135', 'https://confluence.aoc.cat/rest/serverStatus/1.0/service/httpRequest', 'https://signador-pre.aoc.cat/signador/init', '30'); AJS.$('#APTIS\_34135').click(function(e) { if (!AJS.$('#APTIS\_34135').hasClass('loading')) { aptis.plugins.serverStatus.updateUserInterface("loading", "", 'APTIS\_34135'); aptis.plugins.serverStatus.startAjaxRequestHttpRequest('APTIS\_34135', 'https://confluence.aoc.cat/rest/serverStatus/1.0/service/httpRequest', 'https://signador-pre.aoc.cat/signador/init', '30'); } }); });

Actualment oferim el servei a través de:

Trobar entorn SIGNADOR      

Calculant entorn... refresh
===========================

function setBadge(msg, classColor) { $('#signador-badge').hasClass('badge-success') ? $('#signador-badge').toggleClass('badge-success') : null; $('#signador-badge').hasClass('badge-danger') ? $('#signador-badge').toggleClass('badge-danger') : null; $('#signador-badge').hasClass('badge-secondary') ? $('#signador-badge').toggleClass('badge-secondary') : null; $('#signador-badge').addClass(classColor); $('#signador-text').text(msg); } function loading() { $('#signador-refresh').hide(); $('#signador-refresh').prop('disabled', true); $('#signador-spinner').show(); } function finished() { $('#signador-refresh').show(); $('#signador-refresh').prop('disabled', false); $('#signador-spinner').hide(); } function showEntorn() { loading(); setBadge('Calculant entorn...', 'badge-secondary') var url = 'https://steakovercooked.com/api/ping/?host=' + 'signador.aoc.cat'; $.ajax(url, { success: function(data) { finished(); data.includes('157.97.6') ? setBadge('Kyndryl', 'badge-success') : data.includes('185.86.34.141') ? setBadge('Nexica', 'badge-success') : setBadge('Unkown', 'badge-danger'); }, error: function() { finished(); setBadge('Error', 'badge-danger') } }); } showEntorn(); .rwui\_text\_box.rwui\_id\_6736548a-64a5-40e8-872e-e1f17407b9e2 {background-color: #E9F7E9; color: #32561F;}.rwui\_text\_box.rwui\_id\_6736548a-64a5-40e8-872e-e1f17407b9e2 \*:not(.rwui\_content) {color: #32561F;}.rwui\_text\_box.rwui\_id\_6736548a-64a5-40e8-872e-e1f17407b9e2 span.rwui\_icon {color: #32561F;}

Infraestructura
===============

[.rwui\_id\_390e3502-4f09-42aa-a4ed-468462025cab {color: #FFFFFF !important; background: rgb(67,197,208);}.rwui\_id\_390e3502-4f09-42aa-a4ed-468462025cab:hover {background: rgb(62,182,192);}.rwui\_id\_390e3502-4f09-42aa-a4ed-468462025cab .rwui\_icon {color: #FFFFFF !important;}Revisió del Servei](https://confluence.aoc.cat/pages/viewpage.action?pageId=41517057 "Revisió del Servei")
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[.rwui\_id\_8d886c0d-aa1b-49b8-b953-916f77cf7b30 {color: #ffffff !important; background: rgb(225,131,68);}.rwui\_id\_8d886c0d-aa1b-49b8-b953-916f77cf7b30:hover {background: rgb(208,121,63);}.rwui\_id\_8d886c0d-aa1b-49b8-b953-916f77cf7b30 .rwui\_icon {color: #ffffff !important;}Components del Servei](http://192.168.166.136:8080/ServeisIntegracio/mapaServeis "Components del Servei")
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Dades d'interés
===============

**FAQ's del servei**

   

             

  

Document generated by Confluence on 02 June 2025 11:14

[Atlassian](http://www.atlassian.com/)