Seguretat : Entorn de AWS  

1.  [Seguretat](index.md)
2.  [Pàgina d'inici de la Unitat de Seguretat](15368362.md)
3.  [Arquitectura de Seguretat](Arquitectura-de-Seguretat_24216213.md)
4.  [Esquema de línies de defensa](24216216.md)

Seguretat : Entorn de AWS
=========================

Created by Ivan Caballero, last modified on 20 abril 2021

Perímetre de seguretat
----------------------

  

  

Control de xarxa  
  

DDoS

AWS Shield Standard

Protecció davant els atacs DDoS més comuns, que tenen lloc a la capa de xarxa i transport. AWS Shield Standard, a més, ofereix protecció de disponibilitat integral contra tots els patrons d’atac coneguts a la infraestructura (capa 3 i 4) pels serveis Amazon CloudFront i Amazon Route 53.

WAF

AWS WAF

Ofereix protecció contra les vulnerabilitats més habituals que es produeixen en la capa d’aplicació, com ara atacs d’injecció SQL o de Cross-site scripting, per tal d’evitar que aquests patrons d’atac habituals no arribin a l’aplicació.

IDS

AWS Guard Duty

Detecció automàtica d’amenaces, d’activitats malicioses i comportaments no autoritzats. Aquest servei analitza de forma automatitzada els registres disponibles, como per exemple els de AWS CloudTrail, el tràfic DNS i els VPC Flow Logs per tal de buscar-hi anomalies i ofereix les següents possibilitats:  
• Identifica activitats malicioses.  
• Identifica comportaments no autoritzats.  
• Detecta anomalies (per exemple, connexions des d’indrets no habituals)  
• Reforça la seguretat permetent l’automatització d’accions en base al tipus d’anomalia que es detecti.

  

  

  

Monitorització

Auditories de comptes

AWS CloudTrail

Identifica, entre d’altres, els intents d’intrusió al compte d’AWS o als diferents serveis d’AWS, i els intents de realització d’accions per a les quals no es disposa de permisos, així com guardar un registre de totes les interaccions i accions realitzades. AWS CloudTrail ofereix les següents possibilitats:  
• Registrar l’activitat del compte d’AWS.  
• Monitoritzar de forma continua les accions efectuades a la API d’AWS.  
• Registrar intents d’intrusió al compte d’AWS.  
• Registrar intents de realització d’accions per les quals no es disposa de permisos.  
• Detectar activitat inusual al compte d’AWS.

Centralització de logs

AWS Cloudwatch

Centralització de logs de tots els elements del perímetre (IDS, WAF, etc.) i dels registres de les aplicacions. AWS Cloudwatch ofereix les següents possibilitats:  
• Realitzar un registre unificat de logs.  
• Unificar, emmagatzemar i rotar de forma periòdica els logs.  
• Realitzar cerques i consultes complexes sobre els logs.  
• Crear alertes en base a patrons continguts als logs, com per exemple errors de permisos o d’autenticació.

Governança de seguretat

AWS Security Hub

Consola centralitzada de seguretat, ofereix informació sobre l’estat de seguretat de la plataforma de forma centralitzada, així com recomanacions i verificacions de compliment de les configuracions de seguretat aplicades, basades en les bones pràctiques d’AWS.

Protecció de la informació

Antivirus

S3 Virusscan

Antivirus per repositoris S3

Còpies de seguretat

SRR o CRR

Same-region replication (SRR)

Cross-region replication (CRR): crea una copia del repositoria S3 en otra región de AWS. Se puede añadir versionado.

  

Configuracions de seguretat
---------------------------

### AWS Shield Standard

El servei AWS Shield Standard és un servei activat per defecte que funciona de forma totalment automàtica i que no admet cap tipus de configuració, és per aquest motiu que no s’especifica en aquest informe una configuració per aquest servei.

### AWS WAF

El servei AWS WAF és un tallafocs a nivell d’aplicació, que permet la configuració de regles personalitzades per tal de bloquejar certs tipus de peticions abans que arribin a l’aplicació.  
Es proposa configurar les següents tipologies de regles:

*   Regles de protecció contra atacs de tipus SQL injection.
*   Regles de protecció contra atacs de tipus cross-site scripting.
*   Filtre d’IPs autoritzades per a alguns mètodes de l’API, sempre que sigui viable.
*   Filtre d’IPs denegades en base a les llistes d’IPs malicioses conegudes.

### AWS GuardDuty

Pel que fa a la configuració del servei AWS GuardDuty, es proposa realitzar la següent configuració:

*   Freqüència d’actualització de resultats: cada 15min
*   Exportació dels resultats cap a un bucket S3
*   Protecció d’S3 activada, per tal de generar resultats també sobre les accions realitzades a S3.
*   Creació de regles de Cloudwatch Events per als esdeveniments de severitat mitjana i alta, a fi efecte de poder generar alertes de Cloudwatch per a la seva revisió per part dels equips tècnics.
*   Creació de regles de Cloudwatch Events per als esdeveniments molt crítics per als que es pugui automatitzar un procediment que (a) activi funcions Lambda per a la realització de les accions de correcció automàtica i (b) generi alertes de Cloudwatch per a la seva revisió per part dels equips tècnics.

### AWS CloudTrail

Es proposa configurar el servei AWS CloudTrail de forma global per tal que registri totes les accions dutes a terme sobre el compte d’AWS així com tots els intents d’accés que s’hi realitzin, inclosos els esdeveniments del servei AWS S3, per a major efectivitat i abast. Per aquest fi es proposa la següent configuració:

*   Trail global
*   Validació de registres
*   Encriptació dels registres en repòs
*   Exportació dels registres de Cloudtrail cap a Cloudwatch

Per a major seguretat, el registre d’activitat d’AWS CloudTrail s’encriptarà en repòs, i s’activarà la funcionalitat de validació de la integritat dels registres, que genera una firma criptogràfica SHA-256 per a tots els registres que es creen, de tal forma que es pugui determinar si els registres han sigut modificats o manipulats d’alguna manera.  
Es generaran alertes en base a patrons que es trobin als registres d’AWS CloudTrail mitjançant l’exportació automàtica dels registres de CloudTrail cap a AWS Cloudwatch Logs, que ofereix la possibilitat de poder fer l’anàlisi d’aquests registres amb major facilitat, així com configurar alertes mitjançant Cloudwatch Alarms davant certs patrons, tals com intents d’autenticació erronis o errors d’autorització a la API que puguin ser indicatius d’alguna incidència de seguretat.

### AWS Cloudwatch

Es proposa la configuració de les següents alertes de Cloudwatch per tal de garantir una monitorització dels sistemes, en termes de seguretat proactiva, tan a nivell preventiu com reactiu:

*   Canvis de configuració dels grups de seguretat
*   Canvis de la configuració de CloudTrail
*   Errors d’inici de sessió de la consola
*   Errors d’autorització
*   Canvis en polítiques de IAM
*   Canvis de configuració en buckets d’Amazon S3

### AWS Security Hub

El servei AWS Security Hub ofereix una consola centralitzada que permet verificar l’estat de la seguretat del sistema, en relació a les bones pràctiques recomanades per AWS i altres marcs de referència. A més, permet la integració d’altres eines i solucions, com per exemple de la solució S3 Virusscan, per tal de disposar de tota la informació de forma centralitzada i verificar com ja s’ha mencionat, l’estat de la seguretat de tota la plataforma i l’alineació de les configuracions amb les bones pràctiques de seguretat recomanades.  
Es proposa configurar aquest servei habilitant l’estàndard de seguretat “AWS Foundational Security Best Practices” que ofereix un conjunt de comprovacions de seguretat preestablertes basades en les millors pràctiques d’AWS i que està alineat amb els requeriments de l’ENS nivell alt, ja que verifica, entre d’altres:

*   L’existència d’un registre d’auditoria.
*   L’activació de l’encriptació en tots els elements.
*   L’existència d’una política de contrasenyes segura amb rotat de credencials i complexitat mínimes.
*   L’aplicació de limitacions d’accés en grups de seguretat.
*   L’activació de GuardDuty.
*   La limitació de permisos en polítiques IAM, basat en el principi de mínim privilegi.

### S3 Virusscan

Es contempla un backup del repositori S3, però cal tenir en compte que si l'aplicació té altres recursos (BD, servidors EC2, etc.) s'hauran de preveure mecanismes de backup addicionals.

S3 Virusscan és una solució disponible al AWS Marketplace, que fa servir l’antivirus ClamAV per a escanejar els fitxers que es pugen a S3 automàticament en cerca de virus.

Es recomana la següent configuració per aquest servei:

*   Activar els esdeveniments de creació de fitxers als buckets S3 que es desitgin escanejar, amb la finalitat de poder escanejar automàticament els nous fitxers.
*   Configurar alertes automàtiques de Cloudwatch en cas de detecció d’algun virus.
*   Es recomana configurar els workers que realitzaran el procés d’escanejat de virus en un grup d’auto escalat basat en instàncies Spot, per tal de reduir els costos operatius de la solució, i configurar un auto escalat en funció del nombre de fitxers que hi hagi pendents per escanejar a la cua, per tal de poder adaptar el número de workers necessaris a les necessitats de la plataforma.

  

Document generated by Confluence on 07 junio 2025 00:08

[Atlassian](http://www.atlassian.com/)