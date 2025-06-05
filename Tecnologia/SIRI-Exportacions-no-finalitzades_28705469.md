Suport Tècnic : SIRI-Exportacions no finalitzades  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [03 - Monitorització - Revisions globals](26313327.html)
4.  [03 - Monitorització - OLD](128647245.html)
5.  [Sondes S.T.](Sondes-S.T._30869120.html)
6.  [Sondes ST - Old](Sondes-ST---Old_41522507.html)

Suport Tècnic : SIRI-Exportacions no finalitzades
=================================================

Created by Unknown User (otecobernal), last modified on 17 October 2019

**Query:**

SELECT COUNT(ID) FROM AOC\_PCI\_SIRI\_INFORME WHERE ESTAT NOT IN (2,3) AND DATA <= TRUNC(SYSDATE)-2

**Descripció:** 

S'habilita al portlet del SIRI una nova funcionalitat per realitzar les exportacions de les consultes del SIRI.

  

**Actuació:** 

S'habilita al portlet del SIRI una nova funcionalitat per realitzar les exportacions de les consultes del SIRI.

  

![](attachments/26318906/26318913.png)

  

D'aquesta manera no es farà en rigurós directe, sino que és un informe que realitzarà el DWH. El DWH té un procés que revisa cada 5 minuts si hi ha algun informe pendent a tractar.

Es recolza sobre la taula AOC\_PCI\_SIRI\_INFORME de l'esquema SIRI.

Els camps de la taula i la seva descripció:

*   CODI\_ORGANISME: organisme que sol·licita l'informe.

*   CODI\_ORGANISME\_INFORME: organisme del que es sol·licita l'informe (normalment serà igual a CODI\_ORGANISME, només l'AOC pot consultar l'activitat d'altres organismes).

*   TIPUS: 0 interoperabilitat / 1: PMH.

*   ESTAT: 0 pendent / 1: en procés / 2: finalitzat / 3: finalitzat amb errors.

*   DATA\_INFORME: mes del qual es demana d'informe (p.e. Juny 2019 ==> 01/06/2019).

*   CODI\_PROVINCIA / CODI\_MUNICIPI: només si TIPUS = 1 (PMH). L'informe PMH només està disponible a organismes de tipus Ajuntament. Normalment coincidirà amb el codi de municipi + provincia de l'organisme que fa la consulta, només l'AOC pot consultar l'activitat de tots els Ajuntaments.

  

Caldrà revisar la següent sonda per veure que el funcionament és el correcte:

  

SELECT \* FROM AOC\_PCI\_SIRI\_INFORME WHERE ESTAT NOT IN (2,3) AND DATA <= TRUNC(SYSDATE)-2

.rwui\_text\_box.rwui\_id\_72fe040a-c43a-403c-9f62-714132c8ad3b {background-color: #F2F2F2; color: #666666;}.rwui\_text\_box.rwui\_id\_72fe040a-c43a-403c-9f62-714132c8ad3b \*:not(.rwui\_content) {color: #666666;}.rwui\_text\_box.rwui\_id\_72fe040a-c43a-403c-9f62-714132c8ad3b span.rwui\_icon {color: #666666;}

  

### \--- Connexió amb màquina ---

Ens connectarem a la màquina: 

IP: **10.120.1.14**

Usuari: **logsdom**

Els informes un cop realitzats es guarden a /home/pci-pl/siri2/informes/codiOrganisme/idPeticio.csv.zip

![](attachments/26318906/41520184.png)

Tiquet amb una incidència a tindre en comptes:

  

[INN-1035](https://contacte.aoc.cat/browse/INN-1035?src=confmacro) - Data cannot be retrieved due to an unexpected error.

Error fitxer lock:

![](attachments/26318906/41520186.png)

codi eliminació

cd /mnt/storage/pci-pl/siri2/informes

sudo rm -rf LOCK

  

  

Què podem fer si les extraccions fallen a l'EACAT però tenim els fitxers .csv?
------------------------------------------------------------------------------

Un error que ens hem trobat és que a l'EACAT l'extracció finalitza amb errors:

![](attachments/26318906/41520300.png)

  

Haurem de revisar al la carpeta si disposem de l'extracció generada en format .csv:

![](attachments/26318906/41520301.png)

  

En tot cas podrem descarregar el fitxer i adjuntar-lo al tiquet de la incidència per passar-li a l'usuari.

També podem fer el següent → **Recomanem fer-ho des de les web amb usuari logsdom**:

1.  Descarregar el fitxer i zipejar-lo al nostre local:![](attachments/26318906/41520303.png)
2.  Pujar-lo a la carpeta /tmp amb l'ajuda del nostre client SFTP (WinsSCP, etc)
3.  Accedir al super usuari (root)
    
    sudo su
    
4.  Moure-ho a la carpeta específica del ens, en aquest cas **/mnt/storage/pci-pl/siri2/informes/810170005**
    
    mv /tmp/390.csv.zip /mnt/storage/pci-pl/siri2/informes/810170005/390.csv.zip
    
5.  Donar-li permissos root:
    
    chown root /mnt/storage/pci-pl/siri2/informes/810170005/390.csv.zip
    
6.  Modificar l'estat de la extracció a 2 (FINALIZADA):
    
    UPDATE set ESTAT = 2 FROM AOC\_PCI\_SIRI\_INFORME WHERE ESTAT = 3 AND ID = 390
    

Finalment, podrem recarregar la pàgina d'EACAT i veure com es pot descarregar el nou zip

  

Vinculo els tickets associats a aquesta funcionalitat.

Tipus

Ticket

Desplegament PRE

[DES-1932](https://contacte.aoc.cat/browse/DES-1932?src=confmacro) - Data cannot be retrieved due to an unexpected error.

Desplegament PRO

[DES-1933](https://contacte.aoc.cat/browse/DES-1933?src=confmacro) - Data cannot be retrieved due to an unexpected error.

Projectes definició

[PRJ-3429](https://contacte.aoc.cat/browse/PRJ-3429?src=confmacro) - Data cannot be retrieved due to an unexpected error.

  

  

  
  
  

  

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

Document generated by Confluence on 02 June 2025 11:11

[Atlassian](http://www.atlassian.com/)