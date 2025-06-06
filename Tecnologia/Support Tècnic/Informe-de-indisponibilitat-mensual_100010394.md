Suport Tècnic : Informe de indisponibilitat mensual  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [01 - Gestió Operativa](26313391.md)
4.  [Tasques complementàries](26313409.md)

Suport Tècnic : Informe de indisponibilitat mensual
===================================================

Created by OTEC ST Alessandro Trombin Martinez, last modified by OTEC ST Robert Font Rubí on 04 July 2024

Aquest informe el realitzava l'equip de sistemes a partir de les sondes **ISM**. Nosaltres l'hem adaptat fent servir les sondes **OMI**:

Ruta de xarxa

Ruta nova (OMI - Informe realitzat per ST):

*   **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\07 Indisponibilitat mensual**

Ruta antiga (ISM - Informe realitzat per Sistemes):

*   **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\01 Informes VIP\\02 ISM - Informe**

Ruta de xarxa

Podrem accedir als informes realitzats als mesos anteriors accedint a les carpetes específiques de l'any i el mes:

*   **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\07 Indisponibilitat mensual\\2024\\Historic**

Ruta de xarxa

Podrem trobar plantilles per realitzar l'informe i els càlculs pertinents a la ruta:

*   **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\07 Indisponibilitat mensual\\Plantilles**

Principalment només haurem d'utilitzar l'excel per fer els càlculs i el word per realitzar l'informe:

**![](attachments/100010394/100010396.png)  
**

**PAS 0**

Reclamar l'extracció

Per realitzar aquest informe, és essencial que el CTTI ens adjunti la disponibilitat de les sondes de l'AOC per l'horari laboral i no laboral. Si no disposem d'aquestes dades, haurem de reclamar-ho per correu a la bústia: **Monitoratge CTTI <monitoratge.ctti@gencat.cat>**

Vigilar les regles dels correus

És possible que ens ho hagin enviat i el correu es mogui a la carpeta:

![](attachments/100010394/100010546.png)

Exemple de correu:

![](attachments/100010394/100010547.png)

### Destinataris:

**Para:** **Monitoratge CTTI** <monitoratge.ctti@gencat.cat>  
  
**CC:** **SuportTecnicD** <suporttecnic@aoc.cat>; **Ruiz Vela, Immaculada** <immaculada.ruiz@gencat.cat>; **Niña Pumar, Sergio** <sergio.nina@gencat.cat>  
  
**CCOO: OTSuportTecnic** <OTSuportTecnic@aoc.cat>  
  
**Assumpte:** **Informe d'indisponibilitats AOC - sondes OMI**

Missatge:

Missatge:

Bon dia,

Ens podríeu fer arribar les indisponibilitats de **XXXXXXXXX (informar el mes que ens interessa!!)**?

Salutacions i gràcies.

**PAS 1**

Generació d'Excel

Rebrem el següent correu amb dos CSV:

![](attachments/100010394/100010397.png)

Descarreguem ambdós CSV i els desem en **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\07 Indisponibilitat mensual\\2024\\Historic\\Extraccions**

Una vegada hem desat els documents a la ruta indicada, anem al GitHub i ens descarreguem el següent projecte java: [https://github.com/OTSuportTecnic/informe-indisponibilitats-ctti](https://github.com/OTSuportTecnic/informe-indisponibilitats-ctti)

Per executar-ho, necessitarem el Intellij: **[Download Intellij](https://www.jetbrains.com/idea/download/?source=google&medium=cpc&campaign=EMEA_en_ES_IDEA_Branded&term=intellij&content=693349187718&gad_source=1&gclid=EAIaIQobChMI8P-GwvD7hQMVj0VIAB2q9g29EAAYASABEgI8pfD_BwE&section=windows)**

Dintre de l'IDE Intellij amb el projecte obert, anem a l'arxiu **informe-indisponibilitats-ctti-main → build → resources → ctti.properties**

Haurem de realitzar les següents modificacions:

![](attachments/100010394/100010401.png)

1- **ctti.input.path**: Aquesta variable agafara la ruta del sharepoint en local on tenim els CSV descarregats del mail del CTTI. (Només cal canviar l'any de la carpeta si escau)

2- **ctti.output.path**: Aquesta variable indica la ruta on deixarà el CSV que genera el projecte de l'informe. (Només cal canviar l'any de la carpeta si escau)

3- Aquestes variables fan referencia al nom dels arxius que agafarà i de l'arxiu que generarà.

   3.1- **ctti.input.laboral**: El nom d'un dels CSV que ens hem descarregat del correu. Hem de canviar el número del requadre blau amb el número del mes que estem fent l'informe.

   3.2- **ctti.input.total**: El nom d'un dels CSV que ens hem descarregat del correu. Hem de canviar el número del requadre blau amb el número del mes que estem fent l'informe.

   3.3- **ctti.output.name**: El nom del CSV que generarà el projecte. Hem de canviar el número del requadre blau amb el número de mes que estem fent l'informe, seguint el mateix format (XX).

  

Que fer si falla la sincronització del Sharepoint

En aquest cas, podem utilitzar el nostre local com la següent captura:

![](attachments/100010394/100010402.png)

Un cop ens generi el CSV el projecte, desem tots els CSV en la seva carpeta en el **[Sharepoint - Informe Indisponibilitats 2024](https://llicenciesaoc.sharepoint.com/sites/Tecnologia/Documents%20compartits/Forms/AllItems.aspx?ga=1&id=%2Fsites%2FTecnologia%2FDocuments%20compartits%2FGeneral%2FSUPORT%5FTECNIC%2FSEGUIMENT%2F07%20Indisponibilitat%20mensual%2F2024&viewid=95d1b432%2Df806%2D4898%2D98a8%2Dbc0b13da948e)**

El procediment és el mateix, només cal canviar la ruta.

Un cop hem realitzat els canvis a l'arxiu **ctti.properties**, en el projecte anem a **build → classes → java → main → cat → aoc → indisponibilitats → main** i llançem el programa amb el play. 

**PAS 2**

Preparació de dades de l'informe

Una vegada hem realitzat el Pas 1, s'hauria d'haver generat un csv el qual utilitzarem per realitzar l'informe.

El CSV hauria d'estar en la ruta **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\07 Indisponibilitat mensual\\2024\\Historic\\Extraccions\\analisi**

Ara tindrem el CSV generat per la millora anomentat **APM\_availability\_3-2024.csv** i l'Excel que haurem d'omplir anomentat **Disponibilitats.xls**, que el trobarem a la ruta **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\07 Indisponibilitat mensual\\2024\\Historic\\mes**

Obrim el csv **APM\_availability\_3-2024.csv** i copiem les dades que ens trobem. Ara ens anem al Excel **Disponibilitats.xls** i enganxem les dades del csv en la pestaña Extracció OMI a partir de la segona línea (així no perderem les formules que calculen el percentatge de la disponibilitat:

![](attachments/100010394/100010548.png)

Una vegada hem copiat i enganxat les dades en la pestanya Extracció OMI, eliminem la primera línea, ja que hem copiat des de la segonda línea com hem indicat. Per continuar, fem click a l'opció **Actualizar todo** en la pestanya de **Datos**:

![](attachments/100010394/100010549.png)

**PAS 3**

Actualització de les taules

Anem a les pestanyes (en ordre) **Laboral**, **NO Laboral** i **Total**. Veurem dues vegades la taula, en aquest pas haurem de copiar la taula d'abaix i enganxar-la a la taula de dalt:

![](attachments/100010394/100010550.png)

Una vegada hem fet aquest pas en les tres pestanyes que hem indicat abans, haurem de donar un altre vegada al botó d'**Actualizar todo**.

**PAS 4**

Actualització de les gràfiques

De forma automàtica es crearà la taula de disponibilitat global a la fulla **TAULA RESUM**:

![](attachments/100010394/100010551.png)

![](attachments/100010394/100010552.png)

  

i es generaran, també de forma automàtica, gràfiques a la fulla **Gràfiques**:

![](attachments/100010394/100010553.png)

![](attachments/100010394/100010554.png)

  

Finalment a l'excel tindrem totes les dades necessàries per generar l'informe. Només haurem de reemplaçar les taules i imatges que corresponen.

Haurem de tenir en compte la llegenda de colors i marcar les gràfiques i taules que corresponguin seguint aquesta llegenda:

![](attachments/100010394/100010555.png)

També haurem de tenir en compte de filtrar pels serveis rellevants (que hagin presentat una disponibilitat inferior al 100% cada dia) a les gràfiques (per evitar una llegenda de colors amb excés de serveis i colors):

![](attachments/100010394/100010556.png)

**PAS 5**

Generació del Word de l'informe

Una vegada ja tenim l'Excel realitzat amb totes les dades, haurem de realitzar el Word i plasmar totes les dades de l'Excel de Disponibilitats.xsl de manera presentable. 

Obrim el Word Informe Indicadors Disponibilitats de serveis - mes 202X. (Haurem de canviar el nom de l'arxiu).

El primer de tot modifiquem el títol del Word amb el mes i l'any actual:

![](attachments/100010394/100010557.png)

Atenció

Totes les gràfiques que enganxem al Word s'han de copiar enganxar com imatge:

![](attachments/100010394/100010558.png)

I un cop hem enganxat la gràfica com imatge, fem click dret a la gràfica en el Word i seleccionem l'opció de Formato de **Autoforma o imagen** i anem a la pestanya de **Tamaño**.

Aquestes son les medides per a que les gràfiques estiguin bé quadrades en el Word:

![](attachments/100010394/100010559.png)

Podem canviar només el **Ancho** a 18,22cm i la **Altura** es canviarà automàticament si tenim les opcions de **Absoluto** marcades.

  

Després anem a la pàgina de **Gràfiques de disponibilitat** i enganxem la nova gràfica de l'Excel. Fem el mateix en la pàgina de **Gràfiques de variabilitat diària**.

Sota de les tres gràfiques que acabem d'enganxar, trobarem l'apartat de **Destaquem**. Allà haurem de justificar tots els pics de les gràfiques que estiguin inferiors a 99%, ja sigui revisant els comunicats, els tiquets de reinici tant de sistemes com de 24x7 i en el teams a la pestanya de temes d'interés. És important matenir actualitzada la pestanya de temes d'interés. També podem buscar pels xats del teams. Afegim captura d'exemple:

![](attachments/100010394/100010560.png)

Després eliminem la **Taula de resum de disponibilitat** i enganxem la nova taula, aquesta taula es pot enganxar tal qual, no l'hem d'engaxar com imatge.

Per últim, en el Word anem a **Archivo → Exportar → Crear documento PDF/XPS** així crearem el PDF que enviarem per correu. Hem de desar aquest PDF en la ruta **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\07 Indisponibilitat mensual\\2024\\Historic\\mes**

**PAS 6**

Enviament dels correus

En la carpeta de xarxa on hem desat tots els documents, veurem plantilles de correus, fem click i se'ns obrirà l'Outlook. Enviarem el següent correu seguint la plantilla:

![](attachments/100010394/100010562.png)

A partir d'ara afegim a en Sergio Gutierrez. En ambdós correus afegim com CCO a OTSuportTecnic@aoc.cat

**Missatge tipus:**

**Para:** Rubén Cortés <rcortes@aoc.cat>

**CC:** SuportTecnicD <suporttecnic@aoc.cat>; Sistemes AOC <Sistemes@aoc.cat>; Ignasi Albors <ialbors@aoc.cat>; Sergio Gutierrez <SGutierrez@aoc.cat>  
**Asunto:** Informe mensual d'indisponibilitats març

Bon dia,

Adjuntem l’**informe** **d’indisponibilitats** dels serveis del mes de març, realitzat a partir de les sondes **OMI**.

També hem desat l’informe a la ruta de xarxa:

*   (Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\07 Indisponibilitat mensual\\2024\\Historic\\març

Qualsevol cosa ens ho comenteu.

Salutacions cordials.

Un cop enviat el correu, enviem el correu de Indicadors TIC a Justícia:

![](attachments/100010394/100010563.png)

**Missatge tipus:**

**Para:** sfp-tic.justicia@gencat.cat

**CC:** SuportTecnicD <suporttecnic@aoc.cat>; Sistemes AOC <Sistemes@aoc.cat>  
**Asunto:** Indicadors TIC Abril 2024

Bon dia,

Us adjuntem els indicadors de disponibilitat mensual de diferents serveis de l’AOC:

*   e-NOTUM ciutadà: XX%
*   e-NOTUM administració: XX%
*   e-NOTUM Lite: XX%
*   Validador PSIS: XX%
*   Signador: XX%
*   e-Valisa: XX%

Salutacions cordials

Aquests percentatges els trobareu en la Taula Resum de l'Excel:

![](attachments/100010394/100010552.png)

e-NOTUM Lite sempre serà 100%, ja que no tenim sonda per monitorar.

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2020-3-4\_14-39-40.png](attachments/100010394/100010396.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-5-7\_17-29-2.png](attachments/100010394/100010397.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-5-8\_12-39-33.png](attachments/100010394/100010400.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-5-8\_12-46-12.png](attachments/100010394/100010401.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-5-8\_12-50-48.png](attachments/100010394/100010402.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-4\_14-45-45.png](attachments/100010394/100010546.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-4\_14-46-39.png](attachments/100010394/100010547.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-5-27\_18-26-24.png](attachments/100010394/100010548.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-5-27\_18-32-16.png](attachments/100010394/100010549.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-5-27\_18-38-1.png](attachments/100010394/100010550.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_17-1-36.png](attachments/100010394/100010551.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_10-41-26.png](attachments/100010394/100010552.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_17-2-38.png](attachments/100010394/100010553.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_17-3-1.png](attachments/100010394/100010554.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_12-50-41.png](attachments/100010394/100010555.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_17-5-8.png](attachments/100010394/100010556.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-5-27\_18-53-32.png](attachments/100010394/100010557.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-5-27\_18-55-23.png](attachments/100010394/100010558.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-5-27\_18-57-19.png](attachments/100010394/100010559.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-5-27\_19-1-44.png](attachments/100010394/100010560.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-5-27\_19-7-4.png](attachments/100010394/100010561.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-5-27\_19-7-59.png](attachments/100010394/100010562.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-5-27\_19-10-17.png](attachments/100010394/100010563.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:48

[Atlassian](http://www.atlassian.com/)