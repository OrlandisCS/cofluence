Suport Tècnic : FAQ Cloudwatch  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [02 - FAQ's serveis](26313393.md)

Suport Tècnic : FAQ Cloudwatch
==============================

Created by OTEC ST Robert Font Rubí, last modified on 18 January 2024

En aquest JIRA, indicarem com moure'ns a través d'Amazon Web Services (a partir d'ara l'indicarem com AWS).

L'enllaç a accedir és **caoc.awsapps.com/start#/**

WIP: NO TENIM CONTA D'ACCÉS

Si tot va bé, haureu d'autentificar-vos amb el compte de Microsoft:

**![](attachments/100008809/100008837.png)**

**De moment seguim a l'espera de tenir permisos i, per tant, encara que indiqueu bé el número de _l'autenticator_, us donarà error.**

**![](attachments/100008809/100008839.png)**

A partir d'aquí, indicarem el circuit:

**ON ACCEDIR:**
---------------

Primera plana: Si tot ha anat bé, veureu el vostre nom a la part ressaltada en verd.

![](attachments/100008809/100008844.png)

**COM ACCEDIR:**
----------------

Per entrar a revisar una plataforma o grup de màquines, cal fer **2 clicks**.

1.  **CLICK** en el nom de les màquines que volem revisar, per exemple les de valid-pre.
2.  **CLICK** en MANAGEMENT CONSOLE, marcat en vermell.  
      
    

Aquí teniu una captura d'exemple:

![](attachments/100008809/100008846.png)

Un cop fet això, us obrirà una nova pestanya, exemple:

![](attachments/100008809/100008848.png)

Que passa al canviar de màquines

**\----NOTA IMPORTANT----  
  
SI DESPRÉS CANVIEM DE MÀQUINES (perquè volem revisar per exemple valid PRO), ens obrirà una nova pestanya, però la que hàgim obert anteriorment (per exemple la de valid-pre) ens deixarà de funcionar!!!**

**Si intenteu accedir de nou, us apareixerà el següent missatge "d'error":  
  
![](attachments/100008809/100008850.png)**

**PREGUNTA: Però que passa si vull comparar diverses màquines?  
****RESPOSTA: Haureu d'obrir la pàgina en incognito o en un altre navegador.**

**1. QUE FER EL PRIMER COP QUE ENTREM:**
----------------------------------------

  

Sabrem que hem loggejat correctament si veiem el nostre nom a la part superior dreta de la pantalla, exemple:

![](attachments/100008809/100008854.png)

Si no trobem Cloudwatch en recents, haurem de buscar-la.

![](attachments/100008809/100008853.png)

Exemple:

![](attachments/100008809/100008856.png)

**2\. ACCEDINT A CLOUDWATCH:**
------------------------------

Un cop hem decidit quines màquines revisar, fem click a Cloudwatch, **on veurem els logs de l'entorn que haguem seleccionat.**

  

**La primera plana serà aquesta:**

![](attachments/100008809/100008875.png)

De moment en farem servir dues: **Grupos de registros i** **Logs insight** (on es poden fer agrupacions o estadístiques de la màquina que revisem, _seguim pendents que David ens informi de més funcionalitats d'aquest apartat_).

**3\. ACCEDIR ELS LOGS:**
-------------------------

Per la nostra banda: **SI NOMÉS VOLEM MIRAR LOGS**, farem click a **Grupos registro**.ç

  

On veurem la següent plana:

Podem fer click a **_metrics_** per revisar els nodes de la màquina, exemple (click a metrics):

![](attachments/100008809/100008876.png)

  

Un cop fet això, ens obrirà una pàgina on veurem els diferents _logs_ de cada node amb la seva data, com remarquen els colors en la foto:

  

![](attachments/100008809/100008877.png)

  

NOTA: Podem veure fins a quina data (o quant de temps) en mantenen els logs, en el moment de la FAQ, en vàlid, en mantenen fins a 1 mes, exemple:

![](attachments/100008809/100008879.png)

  

**4\. REVISAR ELS LOGS:**
-------------------------

  

**Podem seleccionar els 2 nodes (o el node/s que necessitem)**, fent **click** al **_check_** de l'esquerra, exemple:

![](attachments/100008809/100008880.png)

  

Al fer click a un d'ells, ja veurem els logs, exemple:

  

_També podem **seleccionar l'espai de temps que ens interessa** en la part ressaltada en vermell, fins i tot ajustar-la al nostre gust, clicant en Personalizado._

![](attachments/100008809/100008882.png)

  

També podem buscar informació concreta escrivint en la pestanya de "Filtrar eventos", exemple (és l'equivalent a la comanda _grep_, que fem en Linux):

![](attachments/100008809/100008885.png)

### **VOLS MÉS INFORMACIÓ?:**

Per últim, si volem més informació, podem **clicar** en "**Más información sobre los patrones de filtro**":

![](attachments/100008809/100008887.png)

  

#### Recerques JSON:

És possible que en un futur fem **consultes a documents JSON**, trobarem la informació en el lloc mencionat prèviament, amb una guia de com fer recerques, exemple de com i on buscar la informació i com trobar-la:

On trobar la guia dincs de l'apartat de més informació:

![](attachments/100008809/100008890.png)

  

  

Exemple de recerca:

![](attachments/100008809/100008889.png)

  

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2022-7-1\_10-48-36.png](attachments/100008809/100008810.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-7-1\_10-46-47.png](attachments/100008809/100008811.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-6-13\_12-29-44.png](attachments/100008809/100008812.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-4-28\_12-26-14.png](attachments/100008809/100008813.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-4-28\_12-24-49.png](attachments/100008809/100008814.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_11-8-1.png](attachments/100008809/100008815.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_11-7-49.png](attachments/100008809/100008816.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_11-6-47.png](attachments/100008809/100008817.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_11-5-4.png](attachments/100008809/100008818.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-59-46.png](attachments/100008809/100008819.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-58-33.png](attachments/100008809/100008820.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-57-40.png](attachments/100008809/100008821.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-54-17.png](attachments/100008809/100008822.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-53-35.png](attachments/100008809/100008823.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-53-11.png](attachments/100008809/100008824.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-51-6.png](attachments/100008809/100008825.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-49-11.png](attachments/100008809/100008826.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-46-29.png](attachments/100008809/100008827.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-45-28.png](attachments/100008809/100008828.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-39-49.png](attachments/100008809/100008829.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-38-24.png](attachments/100008809/100008830.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-37-34.png](attachments/100008809/100008831.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-36-24.png](attachments/100008809/100008832.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-34-54.png](attachments/100008809/100008833.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2022-2-23\_10-33-26.png](attachments/100008809/100008834.png) (image/png)  
![](images/icons/bullet_blue.gif) [Zendesk.docx](attachments/100008809/100008835.docx) (application/vnd.openxmlformats-officedocument.wordprocessingml.document)  
![](images/icons/bullet_blue.gif) [image2024-1-17\_17-45-40.png](attachments/100008809/100008837.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-17\_17-47-28.png](attachments/100008809/100008838.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-17\_17-48-18.png](attachments/100008809/100008839.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-17\_17-50-42.png](attachments/100008809/100008843.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-17\_17-52-56.png](attachments/100008809/100008844.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-17\_17-55-52.png](attachments/100008809/100008845.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-17\_17-58-23.png](attachments/100008809/100008846.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-17\_18-1-26.png](attachments/100008809/100008848.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-17\_18-11-50.png](attachments/100008809/100008850.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-17\_18-17-48.png](attachments/100008809/100008852.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-17\_18-20-32.png](attachments/100008809/100008853.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-17\_18-21-38.png](attachments/100008809/100008854.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-17\_18-22-52.png](attachments/100008809/100008855.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-17\_18-23-55.png](attachments/100008809/100008856.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-18\_18-37-32.png](attachments/100008809/100008875.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-18\_18-43-38.png](attachments/100008809/100008876.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-18\_18-50-26.png](attachments/100008809/100008877.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-18\_18-52-13.png](attachments/100008809/100008879.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-18\_18-56-1.png](attachments/100008809/100008880.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-18\_18-57-14.png](attachments/100008809/100008881.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-18\_18-58-57.png](attachments/100008809/100008882.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-18\_19-6-21.png](attachments/100008809/100008884.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-18\_19-6-49.png](attachments/100008809/100008885.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-18\_19-9-52.png](attachments/100008809/100008887.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-18\_19-14-18.png](attachments/100008809/100008889.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-1-18\_19-15-52.png](attachments/100008809/100008890.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:03

[Atlassian](http://www.atlassian.com/)