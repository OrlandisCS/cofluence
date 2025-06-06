Suport Tècnic : Informe de disponibilitat mensual OLD  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [99 - DELETE](99---DELETE_64979390.md)

Suport Tècnic : Informe de disponibilitat mensual OLD
=====================================================

Created by Unknown User (otecobernal), last modified by OTEC ST JAlejandro Cardete Postigo on 12 April 2024

Aquest informe el realitzava l'equip de sistemes a partir de les sondes ISM. Nosaltres l'hem adaptat fent servir les sondes OMI:

Ruta de xarxa

Ruta nova (OMI - Informe realitzat per ST):

*   **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\07 Indisponibilitat mensual**

Ruta antiga (ISM - Informe realitzat per Sistemes):

*   **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\01 Informes VIP\\02 ISM - Informe**

Ruta de xarxa

Podrem accedir als informes realitzats als mesos anteriors accedint a les carpetes específiques de l'any i el mes, per exemple el desembre de 2019:

*   **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\07 Indisponibilitat mensual\\2019\\Historic\\desembre**

Document d'exemple:

[![](rest/documentConversion/latest/conversion/thumbnail/28704947/1)](/download/attachments/28704946/Informe%20indicadors%20disponibilitat%20de%20servei%20-%20agost%202019.pdf?version=1&modificationDate=1569845748937&api=v2)

Ruta de xarxa

Podrem trobar plantilles per realitzar l'informe i els càlculs pertinents a la ruta:

*   **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\07 Indisponibilitat mensual\\Plantilles**

Principalment només haurem d'utilitzar l'excel per fer els càlculs i el word per realitzar l'informe:

**![](attachments/28704946/36339805.png)  
**

**[![](rest/documentConversion/latest/conversion/thumbnail/28704948/1)](/download/attachments/28704946/Informe%20indicadors%20disponibilitat%20de%20servei%20-%20agost%202019.doc?version=1&modificationDate=1569845805946&api=v2)[![](rest/documentConversion/latest/conversion/thumbnail/28704949/1)](/download/attachments/28704946/Plantilla%20estadistiques%20de%20ISM.xlsx?version=1&modificationDate=1569845817713&api=v2)**

  

  

Part 0: Demanar l'extracció de la disponibilitat de les sondes OMI al centre de monitoratge del CTTI

Per realitzar aquest informe, és essencial que el CTTI ens adjunti la disponibilitat de les sondes de l'AOC per l'horari laboral i no laboral. Si no disposem d'aquestes dades, haurem de reclamar-ho per correu a la bústia: **Monitoratge CTTI <monitoratge.ctti@gencat.cat>**

Vigilar les regles dels correus

És possible que ens ho hagin enviat i el correu es mogui a la carpeta:

![](attachments/28704946/36339809.png)

Exemple de correu:

![](attachments/28704946/36339810.png)

  

Part 1: Preparar l'entorn i els arxius necessaris

Un cop ens hagin enviat les extraccions de les indisponibilitats de les sondes OMI:

![](attachments/28704946/36339811.png)

Guardarem les extraccions a la ruta de xarxa, juntament amb les del mateix any (exemple 2020):

*   **_(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\07 Indisponibilitat mensual\\2020\\Extraccions_**

![](attachments/28704946/36339837.png)

Crearem una carpeta on guardarem l'informe i les dades calculades, seguint l'estructura establerta (exemple 02- Febrer):

*   _**(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\07 Indisponibilitat mensual\\2020\\Històric**_

![](attachments/28704946/36339814.png)

Dins de la carpeta creada, copiarem les plantilles de l'informe i dels càlculs o el word i l'excel del mes anterior (com es prefereixi):

![](attachments/28704946/36339815.png)

Aquests arxius seran els que editarem per construir l'informe:

*   **Excel** → L'utilitzarem per enganxar dades i calcular gràfics.
*   **Word** → Enganxarem els gràfics seguint les passes i construirem l'informe que exportarem a PDF.

  

Part 2: Disponibilitat mensual de les sondes OMI (CTTI)

A les pestanyes **LABORAL OMI** i **NO LABORAL OMI** del nostre excel enganxarem les extraccions del CTTI, que ens hauran enviat per correu (explicat al pas 0):

![](attachments/28704946/36339839.png)

Cada sonda tindrà dues columnes; La columna amb el nom de la sonda que contindrà i el % de disponibilitat de la sonda, i seguidament el nombre d'errors i el nombre d'execucions:

![](attachments/28704946/36339823.png)

S'haurà de tenir en compte de no deixar les últimes línies del mes anterior (si tenia més dies que aquest), com per exemple al febrer amb any de traspàs (_bisiesto_) s'hauran d'esborrar les línies del 30 i 31 que tenia el gener:

![](attachments/28704946/36339825.png)

  

Al fer aquestes passes haurem de tenir en compte que possiblement el CTTI ha afegit més sondes respecte al mes anterior.

La pestanya **Check Extraccions CTTI** s'encarrega de verificar que no han mogut els serveis de columna, ni n'han afegit de nous:

![](attachments/28704946/36339833.png)

  

Com cada mes adjunten un excel on els serveis es troben a columnes diferents (per exemple, al mes passat, la primera sonda era MUX\_REGISTRE, però aquest més la primera sonda de l'extracció del CTTI és ENOTUM\_APP), s'ha creat aquesta pestanya (**Check Extraccions CTTI**).

Per un costat, es calcula a quina coluna apareix la sonda a l'extracció del CTTI (Laboral i No Laboral). Haurem de verificar que el resultat final sigui vertader per cada sonda i revisar que no hagin fet res extrany:

![](attachments/28704946/36340576.png)

  

  

Part 2: Disponibilitat mensual de les sondes Àurea (WS)

Accedir a l'apartat _**Estadístiques → Signatura electrònica**_ de des de les [sondes Àurea](http://10.124.95.14:8080/monitors/home.do):

![](attachments/28704946/28705043.png)![](attachments/28704946/28705044.png)

Haurem de seleccionar els serveis PSIS, PSA, SSC i IARXIU per l'entorn de PRODUCCIÓ:

Tenir en compte si el psis funciona per **KYNDRYL** o **NEXICA**

  
![](attachments/28704946/36339851.png)

Haurem de seleccionar les dades del mes que desitgem perquè realitzi l'informe mensual:

![](attachments/28704946/36340573.png)

  

Haurem de copiar les dades a la fulla **SONDES AUREA** de l'excel plantilla:

![](attachments/28704946/36339873.png)

  

Les dades que copiarem seran:

![](attachments/28704946/36339852.png)

  

Per copiar les dades d'enotum haurem de fer el mateix accedint a _**Estadístiques → Relacions amb la ciutadania**_:

![](attachments/28704946/28705045.png)

  

i enganxar el resultat de forma manual a la fulla **Taula Resum**:

![](attachments/28704946/36339874.png)![](attachments/28704946/28705051.png)

  

Part 3: Taula resum i gràfica de disponibilitat global

De forma automàtica es crearà la taula de disponibilitat global a la fulla **TAULA RESUM**:

![](attachments/28704946/36339874.png)

![](attachments/28704946/28705053.png)

  

i es generaran, també de forma automàtica, gràfiques a la fulla **Gràfiques**:

![](attachments/28704946/36339875.png)

![](attachments/28704946/36339876.png)

  

Finalment a l'excel tindrem totes les dades necessàries per generar l'informe. Només haurem de reemplaçar les taules i imatges que corresponen.

Haurem de tenir en compte la llegenda de colors i marcar les gràfiques i taules que corresponguin seguint aquesta llegenda:

![](attachments/28704946/28705085.png)

També haurem de tenir en compte de filtrar pels serveis rellevants (que hagin presentat una disponibilitat inferior al 100% cada dia) a les gràfiques (per evitar una llegenda de colors amb excés de serveis i colors):

![](attachments/28704946/36339877.png)

  

Part 4: Informar via correu

Haurem de copiar i enganxar les gràfiques calculades al document de word. També haurem de comentar els serveis que presentin caigudes i explicar que va passar (Intervencions, caigudes puntuals, dependències amb tercers, etc). Podem veure els comunicats del mes i revisar les actuacions en 24x7.

Un cop finalitzat el document l'exportarem a pdf:

![](attachments/28704946/36339880.png)

Haurem d'enviar un correu adjuntant l'informe:

Posar en còpia a Ignasi Albors <ialbors@aoc.cat>

A tenir en compte

La primera gràfica té en compte l’horari laboral i no laboral (en mitjana ponderada).

 És té en compte que els errors de l’horari laboral es mesuren durant 9 hores (de 8 a 17) i els no laborals són durant les altres 15 hores                                                                                                                                                                                                                              

  

![](attachments/28704946/30868298.png)

  

**Missatge tipus:**

**Para:** Rubén Cortés <rcortes@aoc.cat>

**CC:** SuportTecnicD <suporttecnic@aoc.cat>; Sistemes AOC <Sistemes@aoc.cat>; Ignasi Albors <ialbors@aoc.cat>  
**Asunto:** Informe mensual d'indisponibilitats novembre

Bon dia,

Adjuntem l’**informe** **d’indisponibilitats** dels serveis del mes de novembre, realitzat a partir de les sondes **OMI**.

També hem desat l’informe a la ruta de xarxa:

*   [(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SEGUIMENT\\07](file://endreca/TECNOLOGIA/SUPORT_TECNIC/SEGUIMENT/07) Indisponibilitat mensual\\2019\\Historic\\novembre

Qualsevol cosa ens ho comenteu.

Salutacions cordials

  

  

OLD: Part I: Disponibilitat mensual de l'ISM

Accedir a l'apartat _**Gràfics globals → Gràfic global disponibilitat servei**_ de des de l'ISM: [http://ism.nextret.net/consolagestion/Identificacio](http://ism.nextret.net/consolagestion/Identificacio)

![](attachments/28704946/28705038.png)

Haurem de seleccionar les dades del mes que desitgem:

![](attachments/28704946/28704952.png)

  

A continuació, l'ISM carregarà les dades en una taula:

![](attachments/28704946/28704950.png)

  

Haurem de copiar les dades a la fulla ISM de l'excel plantilla:

![](attachments/28704946/28704951.png)

  

Les dades de la taula es copiaran de forma automàtica a la pestanya Taula resum:

![](attachments/28704946/28705039.png)

  

També crearà una gràfica que podrem fer servir a l'informe final (haurem de comentar els pics més rellevants explicant el que va passar aquell dia):

![](attachments/28704946/28705040.png)

Attachments:
------------

![](images/icons/bullet_blue.gif) [Informe indicadors disponibilitat de servei - agost 2019.pdf](attachments/28704946/28704947.pdf) (application/pdf)  
![](images/icons/bullet_blue.gif) [Informe indicadors disponibilitat de servei - agost 2019.doc](attachments/28704946/28704948.doc) (application/msword)  
![](images/icons/bullet_blue.gif) [Plantilla estadistiques de ISM.xlsx](attachments/28704946/28704949.xlsx) (application/vnd.openxmlformats-officedocument.spreadsheetml.sheet)  
![](images/icons/bullet_blue.gif) [image2019-9-30\_14-36-38.png](attachments/28704946/28704950.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-9-30\_14-38-1.png](attachments/28704946/28704951.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-9-30\_14-41-11.png](attachments/28704946/28704952.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_8-4-58.png](attachments/28704946/28705038.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_8-6-43.png](attachments/28704946/28705039.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_8-7-56.png](attachments/28704946/28705040.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_8-13-31.png](attachments/28704946/28705042.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_8-14-0.png](attachments/28704946/28705043.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_8-15-2.png](attachments/28704946/28705044.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_8-25-59.png](attachments/28704946/28705045.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_8-27-44.png](attachments/28704946/28705047.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_8-27-54.png](attachments/28704946/28705048.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_8-29-0.png](attachments/28704946/28705049.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_8-29-23.png](attachments/28704946/28705050.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_8-29-56.png](attachments/28704946/28705051.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_10-41-26.png](attachments/28704946/28705053.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_10-42-29.png](attachments/28704946/28705054.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-3\_12-50-41.png](attachments/28704946/28705085.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-12-3\_12-28-42.png](attachments/28704946/30868298.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-4\_14-39-40.png](attachments/28704946/36339805.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-4\_14-45-45.png](attachments/28704946/36339809.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-4\_14-46-39.png](attachments/28704946/36339810.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-4\_14-47-59.png](attachments/28704946/36339811.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-4\_14-51-52.png](attachments/28704946/36339814.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-4\_14-53-46.png](attachments/28704946/36339815.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-4\_15-2-37.png](attachments/28704946/36339822.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-4\_15-5-37.png](attachments/28704946/36339823.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-4\_15-9-40.png](attachments/28704946/36339825.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_10-56-35.png](attachments/28704946/36339833.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_10-56-46.png](attachments/28704946/36339834.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_10-58-22.png](attachments/28704946/36339835.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_10-59-28.png](attachments/28704946/36339837.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_11-0-11.png](attachments/28704946/36339838.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_11-0-23.png](attachments/28704946/36339839.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_12-55-55.png](attachments/28704946/36339851.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_13-6-5.png](attachments/28704946/36339852.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_17-0-29.png](attachments/28704946/36339873.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_17-1-36.png](attachments/28704946/36339874.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_17-2-38.png](attachments/28704946/36339875.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_17-3-1.png](attachments/28704946/36339876.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_17-5-8.png](attachments/28704946/36339877.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-3-5\_17-10-42.png](attachments/28704946/36339880.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-6\_11-15-9.png](attachments/28704946/36340572.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-6\_11-15-47.png](attachments/28704946/36340573.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-6\_11-26-53.png](attachments/28704946/36340575.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-6\_11-26-59.png](attachments/28704946/36340576.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:19

[Atlassian](http://www.atlassian.com/)