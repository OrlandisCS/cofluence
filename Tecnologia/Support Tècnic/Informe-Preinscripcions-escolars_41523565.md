Suport Tècnic : Informe Preinscripcions escolars  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [01 - Gestió Operativa](26313391.md)
4.  [Tasques complementàries](26313409.md)

Suport Tècnic : Informe Preinscripcions escolars
================================================

Created by Unknown User (oteccmorales), last modified by Cristian Morales on 14 March 2025

Descripció
----------

Cada any quan es realitza per part de la Generalitat o BCN les preinscripcions de les escoles (Bressol, ESO, BATX...) al tractar-se d'unprocès molt delicat, sempre ens informen per a que les nostres plataformes/serveis funcionin amb normalitat.

Validacions:
------------

Validacions consums i estat serveis

Vàlid:

En Dynatrace, revisar els dashborads:

*   VALID - Estat de Negoci
    *   Si veiem consums per aquesta banda tot ok:
    *   ![](attachments/41523565/124912056.png)
*   VALID - Detalls de Client:
    *   Filtrem pel client i veurem les peticions i els errors 200:
    *   ![](attachments/41523565/124912057.png)
    *   Per veure el client es anar a l'URL d'accés al formulari i veurem el client\_id, aquest es el que hem de informar per filtrar 
    *   ![](attachments/41523565/124912058.png)
    *   per les preinscripcions
        
         tramits.gicar2.cat
        
    *   Si tenim consums i pocs errors, ja està ok
*   VALID - Serveis Externs:
    *   ![](attachments/41523565/124912059.png)
        *   Les crides a PSIS, complicat veure la causa dels errors
        *   Revisar els crides a BDSEU i SMS. 
            *   En BDSEU mirem els errors, si tenim TimeOut o connect

Validar consums del PADRÓ Asíncrons:

fetch bizevents
| filter event.category == "siriAsincron"
| parse PayloadEntrada, "DATA {1,1000000}  'IdentificadorSolicitante>' LD:Organisme '</' DATA;"
| parse PayloadEntrada, "DATA {1,1000000}  'IdPeticion>' LD:IdPeticion '</' DATA;"
| parse PayloadSortida, "DATA {1,1000000}  'codiResultat>' LD:codiError '</' DATA;"
| parse PayloadSortida, "DATA {1,1000000}  'descripcio>' LD:missatgeError '</' DATA;"
| parse PayloadSortida, "DATA {1,1000000}  'CodigoEstado>' LD:CodigoEstado '</' DATA;"
| parse PayloadSortida, "DATA {1,1000000}  'LiteralError>' LD:LiteralError '</' DATA;"
| parse PayloadEntrada, "DATA {1,1000000}  'CodigoCertificado>' LD:Modalitat '</' DATA;"
| parse PayloadEntrada, "DATA {1,1000000}  'CodigoProducto>' LD:Producte '</' DATA;"
| parse PayloadEntrada,"DATA {1,1000000}  'IdSolicitud>' LD:solicitud '</' DATA;" 
| parse PayloadEntrada,"DATA {1,1000000}  'IdSolicitanteOriginal>' LD:IdSolicitanteOriginal '</' DATA;"
| parse PayloadEntrada,"DATA {1,1000000}  'TimeStamp>' LD:TimeStamp '</' DATA;"
| parse PayloadEntrada,"DATA {1,1000000}  'Finalidad>' LD:Finalidad '</' DATA;"
| parse PayloadEntrada,"DATA {1,1000000}  'NumElementos>' LD:NumElementos '</' DATA;"
| filter  matchesPhrase(dt.host\_group.id, "PRO")
| filter Producte == "PADRO"
| filter Modalitat == "CONVIVENTS"
| filter Finalidad == "PREINSCRIP"
| filter Organisme == "PICA"
| filter NumElementos >= "100"
//| filter CodigoEstado == "0003"
//| filter codiResultat!="0" and codiResultat!="00"
//| filter codiResultat=="0502"
//| filter missatgeError =="Error reportat per l'emissor final: 0242 Error Genérico devuelto por el BackOffice"
//| filter IdPeticion == "174184595074969579"
| summarize count(),  by:{IdPeticion, Organisme, Producte, Modalitat, Finalidad}

Consultar per les hores de la nit que es quan es fan. Per exemple el 14/03, han sortit 20 consums:

![](attachments/41523565/126844932.png)

Podem Jugar amb el número de elementos, ja que es per controlar consums amb més de 100 sol·licituds:

| filter NumElementos >= "100"

Per altra banda, verifiquem que han anat correctament perquè el count surt "3", això es perquè compta 3 registres (el de la petició inicial i els 2 reintents de la PICA:

![](attachments/41523565/126844935.png)

1 - Es quan s'envia la petició

2 - la primera petició de quan la PICA pregunta l'estat (si mirem 4 veiem que va finalitzar a les 00:11), per tant, tornaran a preguntar una altra vegada (sempre consulten molt seguit de fer el consum...)

3 - Es quan la PICA torna a demanar l'estat i aquí ja els contestem, perquè ha finalitzat (vegeu número 4)

  

Accions
-------

Per part de la Cap de Servei, ens sol enviar correu informant-nos dels volums i serveis que consumiran.

  

Correu exemple informatiu consums

  

[![](download/resources/com.atlassian.confluence.plugins.confluence-view-file-macro:view-file-macro-resources/images/placeholder-medium-file.png)RE Preinscripció obligatòria curs 2021 22 - Serveis a consumir i volums previstos\_Correu a Lidia.msg](/download/attachments/41523565/RE%20%20Preinscripci%C3%B3%20obligat%C3%B2ria%20curs%202021%2022%20-%20Serveis%20a%20consumir%20i%20volums%20previstos_Correu%20a%20Lidia.msg?version=1&modificationDate=1623400089639&api=v2)

  

Amb aquesta informació, realitzarem un informe amb les dates establertes (tal com es va fer en el JIRA:  [ST-12010](https://contacte.aoc.cat/browse/ST-12010?src=confmacro) - Data cannot be retrieved due to an unexpected error. )

*   Tenim una automatització que envia un correu amb els consums de PICA del dia anterior pels serveis: PADRO i DGP (els serveis i l'ens s'ha de confirmar prèviament quin analitzarem)
    *   Si no funciona, ens hem de connectar a : 10.120.1.5 - pcimonitor → El password el tenim en el PAM.
        
        ![](attachments/41523565/100009592.png)
        
        Anem a la ruta: /Monitors/PADROMonitor/otsuporttecnic/automatitzacions/results/informeConsumsEscoles
        
        Aquí tenim les exportacions.
        
        ![](attachments/41523565/100009595.png)
        
*   Exemple excel
    
    La data de l'extracció és del dia que s'envia, no obstant els consums són del dia anterior.
    
    És a dir, el 26/05 s'envia el correu amb els consums del 25/05
    
    [![](rest/documentConversion/latest/conversion/thumbnail/41523567/1)](/download/attachments/41523565/20210526.xlsx?version=1&modificationDate=1623400428035&api=v2)
    
*   Amb aquesta extracció, procedim a omplir l'excel que utilitzarem per fer l'informe, que el podrem trobar en la ruta de xarxa : (Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\01 Informes VIP\\03 Escoles
*   ![](attachments/41523565/41523568.png)
*   L'informe està compost per 3 pestanyes:
    *   **Control** - Aquí informarem la data de quan comencem a fer el primer informe del període:
    *   ![](attachments/41523565/41523569.png)
    *   **Estat PCI** - Aquí enganxarem l'extracció que s'envia automàtica cada dia i actualitzem el JIRA que tinguem per imputar amb el resultat.
        *   Per DGP, hi ha una resposta que sempre és la mateixa en l'extracció, però canvia un valor i poden sortir 1 registre per cada resposta d'aquest tipus. En aquest cas, abans d'enganxar el que tenim en l'extracció directament a l'informe, cerquem aquesta frase "_Error reportat per l'emissor final: 0401 La estructura del fichero recibido no corresponde con el esquema. cvc-pattern-valid: Value_" i per tots els resultats que tinguem, els actualitzem amb aquesta (1).
        *   ![](attachments/41523565/41523571.png)
        *   També haurem d'actualitzar les dates de la setmana en la taula (2) i la gràfica.
    *   **Total respostes** \- Hem d'actualitzar la taula dinàmica per tindre un control de les respostes obtingudes i detectar si hi ha cap error a nivell nostre (en cas afirmatiu, s'ha de revisar i informar)
*   Quan tinguem la setmana complerta, enviarem les dades per correu amb un resum i deixarem l'informe en la ruta de xarxa :  (Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\01 Informes VIP\\03 Escoles
*   Exemple correu a enviar:
*   Exemple correu
    
    [![](download/resources/com.atlassian.confluence.plugins.confluence-view-file-macro:view-file-macro-resources/images/placeholder-medium-file.png)AOC\_Suport Monitoratge per la campanya de preinscripció escolar de PICA del 25 05 al 31 05 .msg](/download/attachments/41523565/AOC_Suport%20%20Monitoratge%20per%20la%20campanya%20de%20preinscripci%C3%B3%20escolar%20de%20PICA%20del%2025%2005%20al%2031%2005%20.msg?version=1&modificationDate=1623401391530&api=v2)
    

Artículos Relacionados
----------------------

*   Page:
    
    [PSCP - Alta de servei - Integració amb el servei de la PSCP2](/pages/viewpage.action?pageId=100008228)
    
*   Page:
    
    [GLOBAL - INTEGRACIÓ - Configuració d'IP's](/pages/viewpage.action?pageId=26313331)
    
*   Page:
    
    [SIR 2.0 - FLUX DEL SERVEI - ERRORS - Error en accedir al SIR: Estat rebut no està contemplat per mapejar-lo](/pages/viewpage.action?pageId=128647610)
    
*   Page:
    
    [EACAT - FLUX DEL SERVEI - CONFIGURACIONS - Canviar contrasenya usuari en PRE](/display/SII/EACAT+-+FLUX+DEL+SERVEI+-+CONFIGURACIONS+-+Canviar+contrasenya+usuari+en+PRE)
    
*   Page:
    
    [ETAULER - FLUX DEL SERVEI - Filtrar edictes a la part del ciutadà](/pages/viewpage.action?pageId=128647582)
    

  

Incidencias similares

[ST-12010](https://contacte.aoc.cat/browse/ST-12010?src=confmacro) - Data cannot be retrieved due to an unexpected error.

  

  

  

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [RE Preinscripció obligatòria curs 2021 22 - Serveis a consumir i volums previstos\_Correu a Lidia.msg](attachments/41523565/41523566.msg) (application/vnd.ms-outlook)  
![](images/icons/bullet_blue.gif) [20210526.xlsx](attachments/41523565/41523567.xlsx) (application/vnd.openxmlformats-officedocument.spreadsheetml.sheet)  
![](images/icons/bullet_blue.gif) [image2021-6-11\_10-39-10.png](attachments/41523565/41523568.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-6-11\_10-40-2.png](attachments/41523565/41523569.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-6-11\_10-44-51.png](attachments/41523565/41523571.png) (image/png)  
![](images/icons/bullet_blue.gif) [AOC\_Suport Monitoratge per la campanya de preinscripció escolar de PICA del 25 05 al 31 05 .msg](attachments/41523565/41523572.msg) (application/vnd.ms-outlook)  
![](images/icons/bullet_blue.gif) [image2024-3-1\_10-25-9.png](attachments/41523565/100009592.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-3-1\_10-26-28.png](attachments/41523565/100009595.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-2-26\_15-4-32.png](attachments/41523565/124912056.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-2-26\_15-5-25.png](attachments/41523565/124912057.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-2-26\_15-6-36.png](attachments/41523565/124912058.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-2-26\_15-8-1.png](attachments/41523565/124912059.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-3-14\_8-59-55.png](attachments/41523565/126844932.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-3-14\_9-2-18.png](attachments/41523565/126844933.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-3-14\_9-2-53.png](attachments/41523565/126844934.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2025-3-14\_9-3-42.png](attachments/41523565/126844935.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:48

[Atlassian](http://www.atlassian.com/)