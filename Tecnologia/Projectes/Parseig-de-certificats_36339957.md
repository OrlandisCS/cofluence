Projectes : Parseig de certificats  

1.  [Projectes](index.md)
2.  [PSIS](PSIS_24215797.md)
3.  [PSIS - WIKI](PSIS---WIKI_24215598.md)
4.  [Procediments](Procediments_24215610.md)

Projectes : Parseig de certificats
==================================

Created by Áurea Alcaide, last modified on 10 marzo 2020

**Descripció del procediment a dur a terme per classificar nous certificats i la seva posterior càrrega en PSIS.  
**

**1.-** El parseig de certificats és recull en un fitxer excel en format XML, que es troba a la següent ubicació:

**\\\\aocfs01\\Tecnica\\PSIS\\OIDs**

El nom de l'arxiu serà del tipus:

**PSIS\_CONTROL\_v_XX_.xml**

on XX és el número de versió.

Cal transformar aquest excel als XMLs de configuració de PSIS per poder carregar-los en PSIS.

  

**2.- **PSIS\_ExcelToXMLMetadataConversor:  
****

Es tracta d'un projecte eclipse que ens permetrà transformar l'excel d'OIDs en els arxius de configuració de PSIS.

**2.1.- GiT**

El codi del projecte es troba al GiT de PSIS:

**[ssh://git@192.168.166.69:7999/PSIS/psis\_conversor.git](ssh://git@192.168.166.69:7999/PSIS/psis_conversor.git)**

**2.1.- Configuració del programa  
**

Es tracta d'un projecte eclipse que ens permetrà transformar l'excel d'OIDs en els arxius de configuració de PSIS:

El fitxer de conté la informació per fer la transformació és:  **psis/metadata/conf/excelToXml.conf**

El seu contingut és:

\-
######GENERAL##############
ATTRIBUTE\_LIST\_WORKSHEET\_NAME = Atributs X.509
ALTRES\_CERTS = Pars.Altres PSCs
CATCERT\_CERTS = Pars.CATCert
EXTERNAL\_VALID\_CERTS = Pars. AFirma
TSL\_CERTS = Pars.estrangers


### C56 -> inclou CDA @firma 2020
PSIS\_METADATA\_XML\_DATA = PSIS\_CONTROL\_v92.xml 

PSIS\_CERTIFICATE\_REGISTRY\_CONFIG\_IN  = C:\\\\E\\\\psis\\\\MetadataConversor\\\\psis\_config\\\\C56\\\\Cfg-CertificateRegistry-v76-20190612.xml
PSIS\_CERTIFICATE\_REGISTRY\_CONFIG\_OUT = C:\\\\E\\\\psis\\\\MetadataConversor\\\\psis\_config\\\\C56\\\\Cfg-CertificateRegistry-v77-20200306.xml
PSIS\_BASE\_SERVICES\_ORIGINAL\_CONFIG     = C:\\\\E\\\\psis\\\\MetadataConversor\\\\psis\_config\\\\C56\\\\Cfg-BaseServices-v77-20190612.xml
PSIS\_BASE\_SERVICES\_OUT                 = C:\\\\E\\\\psis\\\\MetadataConversor\\\\psis\_config\\\\C56\\\\Cfg-BaseServices-v78-20200306.xml

PSIS\_WEBCHECKER\_TEST\_DIR = C:\\\\Temp

#Used to define CA's that issue their certs without using a certification policy inside the certificate itself
#This is used f.ex on certificates issued by FNMT
CAs\_WITH\_NO\_OID\_INSIDE\_CERT = psis/metadata/xml/data/CAsWithoutCertificationPolicy.xml

#######WORKSHEET CATCERT\_CERTS###############
CATCERT\_CERTS@CA\_START\_INDEX = 0
CATCERT\_CERTS@CN\_START\_INDEX = 1
CATCERT\_CERTS@POLICIES\_START\_INDEX = 2
CATCERT\_CERTS@INFO\_START\_INDEX = 4
CATCERT\_CERTS@ATTRIBUTE\_NAME\_POS = 1
CATCERT\_CERTS@ATTRIBUTE\_PREFIX\_POS = 0

#######WORKSHEET ALTRES\_CERTS###############
ALTRES\_CERTS@CA\_START\_INDEX = 0
ALTRES\_CERTS@CN\_START\_INDEX = 1
ALTRES\_CERTS@POLICIES\_START\_INDEX = 2
ALTRES\_CERTS@INFO\_START\_INDEX = 3
ALTRES\_CERTS@ATTRIBUTE\_NAME\_POS = 1
ALTRES\_CERTS@ATTRIBUTE\_PREFIX\_POS = 0

#######WORKSHEET EXTERNAL\_VALID\_CERTS###############
EXTERNAL\_VALID\_CERTS@CA\_START\_INDEX = 0
EXTERNAL\_VALID\_CERTS@CN\_START\_INDEX = 1
EXTERNAL\_VALID\_CERTS@POLICIES\_START\_INDEX = 2
EXTERNAL\_VALID\_CERTS@INFO\_START\_INDEX = 3
EXTERNAL\_VALID\_CERTS@ATTRIBUTE\_NAME\_POS = 1
EXTERNAL\_VALID\_CERTS@ATTRIBUTE\_PREFIX\_POS = 0

#######WORKSHEET TSL###############
TSL\_CERTS@CA\_START\_INDEX = 0
TSL\_CERTS@CN\_START\_INDEX = 1
TSL\_CERTS@POLICIES\_START\_INDEX = 2
TSL\_CERTS@INFO\_START\_INDEX = 3
TSL\_CERTS@ATTRIBUTE\_NAME\_POS = 1
TSL\_CERTS@ATTRIBUTE\_PREFIX\_POS = 0

  

Cada cop que canvii el parseig de certificats, haurem d'informar de l'excel corresponent, i partir dels arxius de configuració de PSIS actuals (\_IN) per generar-ne els nous (\_OUT):

PSIS\_METADATA\_XML\_DATA = PSIS\_CONTROL\_v92.xml   
  
PSIS\_CERTIFICATE\_REGISTRY\_CONFIG\_IN  = C:\\\\E\\\\psis\\\\MetadataConversor\\\\psis\_config\\\\C56\\\\Cfg-CertificateRegistry-v76-20190612.xml  
PSIS\_CERTIFICATE\_REGISTRY\_CONFIG\_OUT = C:\\\\E\\\\psis\\\\MetadataConversor\\\\psis\_config\\\\C56\\\\Cfg-CertificateRegistry-v77-20200306.xml  
PSIS\_BASE\_SERVICES\_ORIGINAL\_CONFIG     = C:\\\\E\\\\psis\\\\MetadataConversor\\\\psis\_config\\\\C56\\\\Cfg-BaseServices-v77-20190612.xml  
PSIS\_BASE\_SERVICES\_OUT                 = C:\\\\E\\\\psis\\\\MetadataConversor\\\\psis\_config\\\\C56\\\\Cfg-BaseServices-v78-20200306.xml

**IMPORTANT**:

**No moure files ni columnes de lloc en l'excel de parseigs.**

a la definició dels worksheets, s'especifiquen les posicions de CAs, atributs, valors, etc. Si canviem files i/o columnes,a quests índexs no apuntaran a la posició correcta i la configuració generada serà errònia.

  

CATCERT\_CERTS@CA\_START\_INDEX = 0  
CATCERT\_CERTS@CN\_START\_INDEX = 1  
CATCERT\_CERTS@POLICIES\_START\_INDEX = 2  
CATCERT\_CERTS@INFO\_START\_INDEX = 4  
CATCERT\_CERTS@ATTRIBUTE\_NAME\_POS = 1  
CATCERT\_CERTS@ATTRIBUTE\_PREFIX\_POS = 0

**2.2.- Execució**.

Per dur a terme la transformació, executar la classe:

psis.metadata.conversor.ExcelToXMLConversor

**2.3.- Nous arxius de configuració  
**

a) **Cfg-CertificateRegistry-vXX-YYYYMMDD.xml**  
Nou arxiu de parseigs.  
  
b) **Cfg-CertificateRegistryGW-vXX-YYYYMMDD.xml**  
S'obté copiant l'anterior, i canviat el nom afegint GW. Al contingut del fitxer també haurem d'afegir "GW" a:  
  
<psis:configDescriptor xsi:schemaLocation="[xmlbeans://console.psis/descriptors](xmlbeans://console.psis/descriptors) ../xsd/ConfigDescriptor.xsd" xmlns:psis="[xmlbeans://console.psis/descriptors](xmlbeans://console.psis/descriptors)" xmlns:xsi="[http://www.w3.org/2001/XMLSchema-instance](http://www.w3.org/2001/XMLSchema-instance)">  
  <psis:productConfig psis:targetName="CertificateRegistry**GW**" psis:targetRelease="atlantis">  
    <psis:servicesConfig>  
      <psis:serviceConfig psis:target="CertificateRegistryService**GW**">  
  
c) **Cfg-BaseServices-vXX-YYYYMMDD.xml**

Aquí estan els scripts per extreure els atributs. Comprovar que no hi hagi cap _TODO_. I si n'hi han, escriutre l'script corresponent per extreure el valor dessitjat.

  

**3.- Log**

Log d'exemple de sortida d'execució de l'ExcelToXMLConversor:

EXCEL reading
CurrentWorkSheeet is Atributs X.509
CurrentWorkSheeet is Pars.CATCert
CurrentWorkSheeet is Pars.Altres PSCs
CurrentWorkSheeet is Pars. AFirma
CurrentWorkSheeet is Pars.estrangers
EXCEL reading DONE
Start updating in memory
Is not possible to match ACA.ACA\_-\_Certificados\_Corporativos.1.3.6.1.4.1.16533.10.5.1 to ACA.ACA\_-\_Trusted\_Certificates\_-\_2014.1.3.6.1.4.1.16533.20.2.1 with percent of joint over 70 joining them
Is not possible to match ACCV.ACCV.1.3.6.1.4.1.8149.3.7.3.0 to ACCV\_-\_Raiz\_1.ACCVCA120.1.3.6.1.4.1.8149.3.7.5.0 with percent of joint over 70 joining them
Is not possible to match EDICOM.ACEDICOM\_01.1.3.6.1.4.1.30051.2.1.2.5.1 to EDICOM.ACEDICOM\_02.1.3.6.1.4.1.30051.2.1.2.4.1 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* to CATCERT.EC-SAFP.1.3.6.1.4.1.15096.1.3.1.41.1.5 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\* to CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.41.1.2 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\* to CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.42.3.2 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\* to CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.41.1.1 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\* to CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.41.2.1 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\* to CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.42.2.3 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\* to CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.42.2.1 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\* to CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.42.3.1 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\* to CATCERT.EC-URV.1.3.6.1.4.1.15096.1.3.1.41.1.3 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\* to CATCERT.EC-URV.1.3.6.1.4.1.15096.1.3.1.41.2.2 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\* to CATCERT.EC-URV.1.3.6.1.4.1.15096.1.3.1.42.2.2 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\* to CATCERT.EC-URV.1.3.6.1.4.1.15096.1.3.1.42.3.3 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\* to CATCERT.EC-URV.1.3.6.1.4.1.15096.1.3.1.42.2.4 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.1\* to CATCERT.EC-SAFP.1.3.6.1.4.1.15096.1.3.1.151.1 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.1\* and CATCERT.EC-SAFP.1.3.6.1.4.1.15096.1\*\* to CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.151.3 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.131.2 to CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.131.3 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* to CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.81.2.2 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\* to CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.82.3.2 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\* to CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.81.3.4 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\* to CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.81.2.1 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\* to CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.81.3.3 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\* to CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.82.3.1 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\* to CATCERT.EC-URV.1.3.6.1.4.1.15096.1.3.1.81.2.3 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\* to CATCERT.EC-URV.1.3.6.1.4.1.15096.1.3.1.81.3.5 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\* to CATCERT.EC-URV.1.3.6.1.4.1.15096.1.3.1.82.2.2 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\* to CATCERT.EC-URV.1.3.6.1.4.1.15096.1.3.1.82.3.3 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.161.2 to CATCERT.EC-SAFP.1.3.6.1.4.1.15096.1.3.1.161.1 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.161.2 and CATCERT.EC-SAFP.1.3.6.1.4.1.1509\*\* to CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.161.4 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.161.2 and CATCERT.EC-SAFP.1.3.6.1.4.1.1509\*\* to CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.121.4 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.161.2 and CATCERT.EC-SAFP.1.3.6.1.4.1.1509\*\* to CATCERT.EC-URV.1.3.6.1.4.1.15096.1.3.1.161.5 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.121.2 to CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.131.4 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.121.2 and CATCERT.EC-PARLAMENT.1.3.6.1.4.1\*\* to CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.121.3 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.121.2 and CATCERT.EC-PARLAMENT.1.3.6.1.4.1\*\* to CATCERT.EC-URV.1.3.6.1.4.1.15096.1.3.1.131.5 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.121.2 and CATCERT.EC-PARLAMENT.1.3.6.1.4.1\*\* to CATCERT.EC-URV.1.3.6.1.4.1.15096.1.3.1.121.5 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.151.4 to CATCERT.EC-URV.1.3.6.1.4.1.15096.1.3.1.151.5 with percent of joint over 70 joining them
Name collission has been found: CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.8 - Trying to find an alternative name
Alternative name has been found, using CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.8:1
Is not possible to match CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.8:1\* to CATCERT.EC-URV.1.3.6.1.4.1.15096.1.3.1.81.1.2 with percent of joint over 70 joining them
Is not possible to match CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.8:1\* and CATCERT.EC-URV.1.3.6.1.4.1.15096.\*\* to CATCERT.EC-URV.1.3.6.1.4.1.15096.1.3.1.82.2.4 with percent of joint over 70 joining them
73 schemas have been joined !
Scripts already declared on configuration and scripts from the new file differs, original size was:339 vs new 332
Script size matches, starting content matching
0:Starting script checking \[V\]
1:Starting script checking \[#V\]
2:Starting script checking \[##V\]
3:Starting script checking \[###V\]
4:Starting script checking \[####V\]
5:Starting script checking \[#####V\]
6:Starting script checking \[######V\]
7:Starting script checking \[#######V\]
8:Starting script checking \[########V\]
9:Starting script checking \[#########V\]
10:Starting script checking \[##########V\]
11:Starting script checking \[###########V\]
12:Starting script checking \[############V\]
13:Starting script checking \[#############V\]
14:Starting script checking \[##############V\]
15:Starting script checking \[###############V\]
16:Starting script checking \[################V\]
17:Starting script checking \[#################V\]
18:Starting script checking \[##################V\]
19:Starting script checking \[###################V\]
20:Starting script checking \[####################V\]
21:Starting script checking \[#####################V\]
22:Starting script checking \[######################V\]
23:Starting script checking \[#######################V\]
24:Starting script checking \[########################V\]
25:Starting script checking \[#########################V\]
26:Starting script checking \[##########################V\]
27:Starting script checking \[###########################V\]
28:Starting script checking \[############################V\]
29:Starting script checking \[#############################V\]
30:Starting script checking \[##############################V\]
31:Starting script checking \[###############################V\]
32:Starting script checking \[################################V\]
33:Starting script checking \[#################################V\]
34:Starting script checking \[##################################V\]
35:Starting script checking \[###################################V\]
36:Starting script checking \[####################################V\]
37:Starting script checking \[#####################################V\]
38:Starting script checking \[######################################V\]
39:Starting script checking \[#######################################V\]
40:Starting script checking \[########################################V\]
41:Starting script checking \[#########################################V\]
42:Starting script checking \[##########################################V\]
43:Starting script checking \[###########################################V\]
44:Starting script checking \[############################################V\]
45:Starting script checking \[#############################################V\]
46:Starting script checking \[##############################################V\]
47:Starting script checking \[###############################################V\]
48:Starting script checking \[################################################V\]
49:Starting script checking \[#################################################V\]
50:Starting script checking \[##################################################V\]
51:Starting script checking \[###################################################V\]
52:Starting script checking \[####################################################V\]
53:Starting script checking \[#####################################################V\]
54:Starting script checking \[######################################################V\]
55:Starting script checking \[#######################################################V\]
56:Starting script checking \[########################################################V\]
57:Starting script checking \[#########################################################V\]
58:Starting script checking \[##########################################################V\]
59:Starting script checking \[###########################################################V\]
60:Starting script checking \[############################################################V\]
61:Starting script checking \[#############################################################V\]
62:Starting script checking \[##############################################################V\]
63:Starting script checking \[###############################################################V\]
64:Starting script checking \[################################################################V\]
65:Starting script checking \[#################################################################V\]
66:Starting script checking \[##################################################################V\]
67:Starting script checking \[###################################################################V\]
68:Starting script checking \[####################################################################V\]
69:Starting script checking \[#####################################################################V\]
70:Starting script checking \[######################################################################V\]
71:Starting script checking \[#######################################################################V\]
72:Starting script checking \[########################################################################V\]
73:Starting script checking \[#########################################################################V\]
74:Starting script checking \[##########################################################################V\]
75:Starting script checking \[###########################################################################V\]
76:Starting script checking \[############################################################################V\]
77:Starting script checking \[#############################################################################V\]
78:Starting script checking \[##############################################################################V\]
79:Starting script checking \[###############################################################################V\]
80:Starting script checking \[################################################################################V\]
81:Starting script checking \[#################################################################################V\]
82:Starting script checking \[##################################################################################V\]
83:Starting script checking \[###################################################################################V\]
84:Starting script checking \[####################################################################################V\]
85:Starting script checking \[#####################################################################################V\]
86:Starting script checking \[######################################################################################V\]
87:Starting script checking \[#######################################################################################V\]
88:Starting script checking \[########################################################################################V\]
89:Starting script checking \[#########################################################################################V\]
90:Starting script checking \[##########################################################################################V\]
91:Starting script checking \[###########################################################################################V\]
92:Starting script checking \[############################################################################################V\]
93:Starting script checking \[#############################################################################################V\]
94:Starting script checking \[##############################################################################################V\]
95:Starting script checking \[###############################################################################################V\]
96:Starting script checking \[################################################################################################V\]
97:Starting script checking \[#################################################################################################V\]
98:Starting script checking \[##################################################################################################V\]
99:Starting script checking \[###################################################################################################V\]
100:Starting script checking \[####################################################################################################V\]
101:Starting script checking \[#####################################################################################################V\]
102:Starting script checking \[######################################################################################################V\]
103:Starting script checking \[#######################################################################################################V\]
104:Starting script checking \[########################################################################################################V\]
105:Starting script checking \[#########################################################################################################V\]
106:Starting script checking \[##########################################################################################################V\]
107:Starting script checking \[###########################################################################################################V\]
108:Starting script checking \[############################################################################################################V\]
109:Starting script checking \[#############################################################################################################V\]
110:Starting script checking \[##############################################################################################################V\]
111:Starting script checking \[###############################################################################################################V\]
112:Starting script checking \[################################################################################################################V\]
113:Starting script checking \[#################################################################################################################V\]
114:Starting script checking \[##################################################################################################################V\]
115:Starting script checking \[###################################################################################################################V\]
116:Starting script checking \[####################################################################################################################V\]
117:Starting script checking \[#####################################################################################################################V\]
118:Starting script checking \[######################################################################################################################V\]
119:Starting script checking \[#######################################################################################################################V\]
120:Starting script checking \[########################################################################################################################V\]
121:Starting script checking \[#########################################################################################################################V\]
122:Starting script checking \[##########################################################################################################################V\]
123:Starting script checking \[###########################################################################################################################V\]
124:Starting script checking \[############################################################################################################################V\]
125:Starting script checking \[#############################################################################################################################V\]
126:Starting script checking \[##############################################################################################################################V\]
127:Starting script checking \[###############################################################################################################################V\]
128:Starting script checking \[################################################################################################################################V\]
129:Starting script checking \[#################################################################################################################################V\]
130:Starting script checking \[##################################################################################################################################V\]
131:Starting script checking \[###################################################################################################################################V\]
132:Starting script checking \[####################################################################################################################################V\]
133:Starting script checking \[#####################################################################################################################################V\]
134:Starting script checking \[######################################################################################################################################V\]
135:Starting script checking \[#######################################################################################################################################V\]
136:Starting script checking \[########################################################################################################################################V\]
137:Starting script checking \[#########################################################################################################################################V\]
138:Starting script checking \[##########################################################################################################################################V\]
139:Starting script checking \[###########################################################################################################################################V\]
140:Starting script checking \[############################################################################################################################################V\]
141:Starting script checking \[#############################################################################################################################################V\]
142:Starting script checking \[##############################################################################################################################################V\]
143:Starting script checking \[###############################################################################################################################################V\]
144:Starting script checking \[################################################################################################################################################V\]
145:Starting script checking \[#################################################################################################################################################V\]
146:Starting script checking \[##################################################################################################################################################V\]
147:Starting script checking \[###################################################################################################################################################V\]
148:Starting script checking \[####################################################################################################################################################V\]
149:Starting script checking \[#####################################################################################################################################################V\]
150:Starting script checking \[######################################################################################################################################################V\]
151:Starting script checking \[#######################################################################################################################################################V\]
152:Starting script checking \[########################################################################################################################################################V\]
153:Starting script checking \[#########################################################################################################################################################V\]
154:Starting script checking \[##########################################################################################################################################################V\]
155:Starting script checking \[###########################################################################################################################################################V\]
156:Starting script checking \[############################################################################################################################################################V\]
157:Starting script checking \[#############################################################################################################################################################V\]
158:Starting script checking \[##############################################################################################################################################################V\]
159:Starting script checking \[###############################################################################################################################################################V\]
160:Starting script checking \[################################################################################################################################################################V\]
161:Starting script checking \[#################################################################################################################################################################V\]
162:Starting script checking \[##################################################################################################################################################################V\]
163:Starting script checking \[###################################################################################################################################################################V\]
164:Starting script checking \[####################################################################################################################################################################V\]
165:Starting script checking \[#####################################################################################################################################################################V\]
166:Starting script checking \[######################################################################################################################################################################V\]
167:Starting script checking \[#######################################################################################################################################################################V\]
168:Starting script checking \[########################################################################################################################################################################V\]
169:Starting script checking \[#########################################################################################################################################################################V\]
170:Starting script checking \[##########################################################################################################################################################################V\]
171:Starting script checking \[###########################################################################################################################################################################V\]
172:Starting script checking \[############################################################################################################################################################################V\]
173:Starting script checking \[#############################################################################################################################################################################V\]
174:Starting script checking \[##############################################################################################################################################################################V\]
175:Starting script checking \[###############################################################################################################################################################################V\]
176:Starting script checking \[################################################################################################################################################################################V\]
177:Starting script checking \[#################################################################################################################################################################################V\]
178:Starting script checking \[##################################################################################################################################################################################V\]
179:Starting script checking \[###################################################################################################################################################################################V\]
180:Starting script checking \[####################################################################################################################################################################################V\]
181:Starting script checking \[#####################################################################################################################################################################################V\]
182:Starting script checking \[######################################################################################################################################################################################V\]
183:Starting script checking \[#######################################################################################################################################################################################V\]
184:Starting script checking \[########################################################################################################################################################################################V\]
185:Starting script checking \[#########################################################################################################################################################################################V\]
186:Starting script checking \[##########################################################################################################################################################################################V\]
187:Starting script checking \[###########################################################################################################################################################################################V\]
188:Starting script checking \[############################################################################################################################################################################################V\]
189:Starting script checking \[#############################################################################################################################################################################################V\]
190:Starting script checking \[##############################################################################################################################################################################################V\]
191:Starting script checking \[###############################################################################################################################################################################################V\]
192:Starting script checking \[################################################################################################################################################################################################V\]
193:Starting script checking \[#################################################################################################################################################################################################V\]
194:Starting script checking \[##################################################################################################################################################################################################V\]
195:Starting script checking \[###################################################################################################################################################################################################V\]
196:Starting script checking \[####################################################################################################################################################################################################V\]
197:Starting script checking \[#####################################################################################################################################################################################################V\]
198:Starting script checking \[######################################################################################################################################################################################################V\]
199:Starting script checking \[#######################################################################################################################################################################################################V\]
200:Starting script checking \[########################################################################################################################################################################################################V\]
201:Starting script checking \[#########################################################################################################################################################################################################V\]
202:Starting script checking \[##########################################################################################################################################################################################################V\]
203:Starting script checking \[###########################################################################################################################################################################################################V\]
204:Starting script checking \[############################################################################################################################################################################################################V\]
205:Starting script checking \[#############################################################################################################################################################################################################V\]
206:Starting script checking \[##############################################################################################################################################################################################################V\]
207:Starting script checking \[###############################################################################################################################################################################################################V\]
208:Starting script checking \[################################################################################################################################################################################################################V\]
209:Starting script checking \[#################################################################################################################################################################################################################V\]
210:Starting script checking \[##################################################################################################################################################################################################################V\]
211:Starting script checking \[###################################################################################################################################################################################################################V\]
212:Starting script checking \[####################################################################################################################################################################################################################V\]
213:Starting script checking \[#####################################################################################################################################################################################################################V\]
214:Starting script checking \[######################################################################################################################################################################################################################V\]
215:Starting script checking \[#######################################################################################################################################################################################################################V\]
216:Starting script checking \[########################################################################################################################################################################################################################V\]
217:Starting script checking \[#########################################################################################################################################################################################################################V\]
218:Starting script checking \[##########################################################################################################################################################################################################################V\]
219:Starting script checking \[###########################################################################################################################################################################################################################V\]
220:Starting script checking \[############################################################################################################################################################################################################################V\]
221:Starting script checking \[#############################################################################################################################################################################################################################V\]
222:Starting script checking \[##############################################################################################################################################################################################################################V\]
223:Starting script checking \[###############################################################################################################################################################################################################################V\]
224:Starting script checking \[################################################################################################################################################################################################################################V\]
225:Starting script checking \[#################################################################################################################################################################################################################################V\]
226:Starting script checking \[##################################################################################################################################################################################################################################V\]
227:Starting script checking \[###################################################################################################################################################################################################################################V\]
228:Starting script checking \[####################################################################################################################################################################################################################################V\]
229:Starting script checking \[#####################################################################################################################################################################################################################################V\]
230:Starting script checking \[######################################################################################################################################################################################################################################V\]
231:Starting script checking \[#######################################################################################################################################################################################################################################V\]
232:Starting script checking \[########################################################################################################################################################################################################################################V\]
233:Starting script checking \[#########################################################################################################################################################################################################################################V\]
234:Starting script checking \[##########################################################################################################################################################################################################################################V\]
235:Starting script checking \[###########################################################################################################################################################################################################################################V\]
236:Starting script checking \[############################################################################################################################################################################################################################################V\]
237:Starting script checking \[#############################################################################################################################################################################################################################################V\]
238:Starting script checking \[##############################################################################################################################################################################################################################################V\]
239:Starting script checking \[###############################################################################################################################################################################################################################################V\]
240:Starting script checking \[################################################################################################################################################################################################################################################V\]
241:Starting script checking \[#################################################################################################################################################################################################################################################V\]
242:Starting script checking \[##################################################################################################################################################################################################################################################V\]
243:Starting script checking \[###################################################################################################################################################################################################################################################V\]
244:Starting script checking \[####################################################################################################################################################################################################################################################V\]
245:Starting script checking \[#####################################################################################################################################################################################################################################################V\]
246:Starting script checking \[######################################################################################################################################################################################################################################################V\]
247:Starting script checking \[#######################################################################################################################################################################################################################################################V\]
248:Starting script checking \[########################################################################################################################################################################################################################################################V\]
249:Starting script checking \[#########################################################################################################################################################################################################################################################V\]
250:Starting script checking \[##########################################################################################################################################################################################################################################################V\]
251:Starting script checking \[###########################################################################################################################################################################################################################################################V\]
252:Starting script checking \[############################################################################################################################################################################################################################################################V\]
253:Starting script checking \[#############################################################################################################################################################################################################################################################V\]
254:Starting script checking \[##############################################################################################################################################################################################################################################################V\]
255:Starting script checking \[###############################################################################################################################################################################################################################################################V\]
256:Starting script checking \[################################################################################################################################################################################################################################################################V\]
257:Starting script checking \[#################################################################################################################################################################################################################################################################V\]
258:Starting script checking \[##################################################################################################################################################################################################################################################################V\]
259:Starting script checking \[###################################################################################################################################################################################################################################################################V\]
260:Starting script checking \[####################################################################################################################################################################################################################################################################V\]
261:Starting script checking \[#####################################################################################################################################################################################################################################################################V\]
262:Starting script checking \[######################################################################################################################################################################################################################################################################V\]
263:Starting script checking \[#######################################################################################################################################################################################################################################################################V\]
264:Starting script checking \[########################################################################################################################################################################################################################################################################V\]
265:Starting script checking \[#########################################################################################################################################################################################################################################################################V\]
266:Starting script checking \[##########################################################################################################################################################################################################################################################################V\]
267:Starting script checking \[###########################################################################################################################################################################################################################################################################V\]
268:Starting script checking \[############################################################################################################################################################################################################################################################################V\]
269:Starting script checking \[#############################################################################################################################################################################################################################################################################V\]
270:Starting script checking \[##############################################################################################################################################################################################################################################################################V\]
271:Starting script checking \[###############################################################################################################################################################################################################################################################################V\]
272:Starting script checking \[################################################################################################################################################################################################################################################################################V\]
273:Starting script checking \[#################################################################################################################################################################################################################################################################################V\]
274:Starting script checking \[##################################################################################################################################################################################################################################################################################V\]
275:Starting script checking \[###################################################################################################################################################################################################################################################################################V\]
276:Starting script checking \[####################################################################################################################################################################################################################################################################################V\]
277:Starting script checking \[#####################################################################################################################################################################################################################################################################################V\]
278:Starting script checking \[######################################################################################################################################################################################################################################################################################V\]
279:Starting script checking \[#######################################################################################################################################################################################################################################################################################V\]
280:Starting script checking \[########################################################################################################################################################################################################################################################################################V\]
281:Starting script checking \[#########################################################################################################################################################################################################################################################################################V\]
282:Starting script checking \[##########################################################################################################################################################################################################################################################################################V\]
283:Starting script checking \[###########################################################################################################################################################################################################################################################################################V\]
284:Starting script checking \[############################################################################################################################################################################################################################################################################################V\]
285:Starting script checking \[#############################################################################################################################################################################################################################################################################################V\]
286:Starting script checking \[##############################################################################################################################################################################################################################################################################################V\]
287:Starting script checking \[###############################################################################################################################################################################################################################################################################################V\]
288:Starting script checking \[################################################################################################################################################################################################################################################################################################V\]
289:Starting script checking \[#################################################################################################################################################################################################################################################################################################V\]
290:Starting script checking \[##################################################################################################################################################################################################################################################################################################V\]
291:Starting script checking \[###################################################################################################################################################################################################################################################################################################V\]
292:Starting script checking \[####################################################################################################################################################################################################################################################################################################V\]
293:Starting script checking \[#####################################################################################################################################################################################################################################################################################################V\]
294:Starting script checking \[######################################################################################################################################################################################################################################################################################################V\]
295:Starting script checking \[#######################################################################################################################################################################################################################################################################################################V\]
296:Starting script checking \[########################################################################################################################################################################################################################################################################################################V\]
297:Starting script checking \[#########################################################################################################################################################################################################################################################################################################V\]
298:Starting script checking \[##########################################################################################################################################################################################################################################################################################################V\]
299:Starting script checking \[###########################################################################################################################################################################################################################################################################################################V\]
300:Starting script checking \[############################################################################################################################################################################################################################################################################################################V\]
301:Starting script checking \[#############################################################################################################################################################################################################################################################################################################V\]
302:Starting script checking \[##############################################################################################################################################################################################################################################################################################################V\]
303:Starting script checking \[###############################################################################################################################################################################################################################################################################################################V\]
304:Starting script checking \[################################################################################################################################################################################################################################################################################################################V\]
305:Starting script checking \[#################################################################################################################################################################################################################################################################################################################V\]
306:Starting script checking \[##################################################################################################################################################################################################################################################################################################################V\]
307:Starting script checking \[###################################################################################################################################################################################################################################################################################################################V\]
308:Starting script checking \[####################################################################################################################################################################################################################################################################################################################V\]
309:Starting script checking \[#####################################################################################################################################################################################################################################################################################################################V\]
310:Starting script checking \[######################################################################################################################################################################################################################################################################################################################V\]
311:Starting script checking \[#######################################################################################################################################################################################################################################################################################################################V\]
312:Starting script checking \[########################################################################################################################################################################################################################################################################################################################V\]
313:Starting script checking \[#########################################################################################################################################################################################################################################################################################################################V\]
314:Starting script checking \[##########################################################################################################################################################################################################################################################################################################################V\]
315:Starting script checking \[###########################################################################################################################################################################################################################################################################################################################V\]
316:Starting script checking \[############################################################################################################################################################################################################################################################################################################################V\]
317:Starting script checking \[#############################################################################################################################################################################################################################################################################################################################V\]
318:Starting script checking \[##############################################################################################################################################################################################################################################################################################################################V\]
319:Starting script checking \[###############################################################################################################################################################################################################################################################################################################################V\]
320:Starting script checking \[################################################################################################################################################################################################################################################################################################################################V\]
321:Starting script checking \[#################################################################################################################################################################################################################################################################################################################################V\]
322:Starting script checking \[##################################################################################################################################################################################################################################################################################################################################V\]
323:Starting script checking \[###################################################################################################################################################################################################################################################################################################################################V\]
324:Starting script checking \[####################################################################################################################################################################################################################################################################################################################################V\]
325:Starting script checking \[#####################################################################################################################################################################################################################################################################################################################################V\]
326:Starting script checking \[######################################################################################################################################################################################################################################################################################################################################V\]
327:Starting script checking \[#######################################################################################################################################################################################################################################################################################################################################V\]
328:Starting script checking \[########################################################################################################################################################################################################################################################################################################################################V\]
329:Starting script checking \[#########################################################################################################################################################################################################################################################################################################################################V\]
330:Starting script checking \[##########################################################################################################################################################################################################################################################################################################################################V\]
331:Starting script checking \[###########################################################################################################################################################################################################################################################################################################################################V\]
All scripts have been updated
Updating in memory DONE
Transforming to xml
Recovering task for signature attribute extraction process
Recovering task for signature attribute extraction process
Recovering task for signature attribute extraction process
Recovering task for signature attribute extraction process
Recovering task for signature attribute extraction process
Recovering task for signature attribute extraction process
Recovering task for signature attribute extraction process
Transforming to xml DONE
Checking integrity for CertificateRegistry file
Performing string values length test for Certificate registry
Max is 27
Max is 36
Max is 198
Performing string values length test for Script service
Max is 6
Max is 20
Max is 205
Performing checking for parsing schema existence
check over 301
Parsing schema 1 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.1.1
Parsing schema 2 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.1.2
Parsing schema 3 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.2.1
Parsing schema 4 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.2.2
Parsing schema 5 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.3.1
Parsing schema 6 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.5.1
Parsing schema 7 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.5.2
Parsing schema 8 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.6.1
Parsing schema 9 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.6.2
Parsing schema 10 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.22.1
Parsing schema 11 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.21.2
Parsing schema 12 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.20.2
Parsing schema 13 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.11.1
Parsing schema 14 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.11.2
Parsing schema 15 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.10.2
Parsing schema 16 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.40.2
Parsing schema 17 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.12.1
Parsing schema 18 of 301, check all attributes for name FIRMAPROFESIONAL.AC\_Firmaprofesional\_-\_CA1.1.3.6.1.4.1.13177.10.1.12.2
Parsing schema 19 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.2.1.\*
Parsing schema 20 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.2.1.\*
Parsing schema 21 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.2.2.\*
Parsing schema 22 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.2.2.\*
Parsing schema 23 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.3.1.\*
Parsing schema 24 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.3.1.\*
Parsing schema 25 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.3.2.\*
Parsing schema 26 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.3.2.\*
Parsing schema 27 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.4.1.\*
Parsing schema 28 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.4.1.\*
Parsing schema 29 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.4.2.1
Parsing schema 30 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.16.1.3.2.1
Parsing schema 31 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.16.1.3.2.2
Parsing schema 32 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.16.2.1.1
Parsing schema 33 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.16.2.1.2
Parsing schema 34 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.16.2.3.2
Parsing schema 35 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.4.2.2
Parsing schema 36 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.8.2.1.\*
Parsing schema 37 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.8.2.1.\*
Parsing schema 38 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.8.2.2.\*
Parsing schema 39 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.8.2.2.\*
Parsing schema 40 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.8.3.1.\*
Parsing schema 41 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.8.3.1.\*
Parsing schema 42 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.8.3.2.\*
Parsing schema 43 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.8.3.2.\*
Parsing schema 44 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.8.4.1.1
Parsing schema 45 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.8.4.1.2
Parsing schema 46 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.8.4.2.\*
Parsing schema 47 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.8.4.2.\*
Parsing schema 48 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.8.6.1.1
Parsing schema 49 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.9.7.1.1
Parsing schema 50 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.9.7.1.2
Parsing schema 51 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.9.7.2.1
Parsing schema 52 of 301, check all attributes for name CAMERFIRMA.AC\_CamerFirma\_Cerificados\_Racer.1.3.6.1.4.1.17326.10.9.7.2.2
Parsing schema 53 of 301, check all attributes for name CAMERFIRMA.CA\_Camerfirma\_Express\_Corporate\_Server.1.3.6.1.4.1.17326.10.11.3.1.1
Parsing schema 54 of 301, check all attributes for name CAMERFIRMA.CA\_Camerfirma\_Express\_Corporate\_Server.1.3.6.1.4.1.17326.10.11.2.1
Parsing schema 55 of 301, check all attributes for name CAMERFIRMA.AC\_Camerfirma\_AAPP.1.3.6.1.4.1.17326.1.3.4.1
Parsing schema 56 of 301, check all attributes for name CAMERFIRMA.AC\_Camerfirma\_AAPP.1.3.6.1.4.1.17326.1.3.4.2
Parsing schema 57 of 301, check all attributes for name CAMERFIRMA.AC\_Camerfirma\_AAPP.1.3.6.1.4.1.17326.1.3.4.4
Parsing schema 58 of 301, check all attributes for name CAMERFIRMA.Camerfirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.5.1.1
Parsing schema 59 of 301, check all attributes for name CAMERFIRMA.Camerfirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.5.1.2
Parsing schema 60 of 301, check all attributes for name CAMERFIRMA.Camerfirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.5.2.\*
Parsing schema 61 of 301, check all attributes for name CAMERFIRMA.Camerfirma\_Certificados\_Camerales.1.3.6.1.4.1.17326.10.9.5.2.\*
Parsing schema 62 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales\_Personales.1.3.6.1.4.1.18920.1.1.1.1
Parsing schema 63 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales\_Personales.1.3.6.1.4.1.18920.1.1.1.2.1
Parsing schema 64 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales\_Personales.1.3.6.1.4.1.18920.1.1.1.2.2
Parsing schema 65 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales\_Personales.1.3.6.1.4.1.18920.1.1.2.1
Parsing schema 66 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales.1.3.6.1.4.1.18920.1.1.2.2.1
Parsing schema 67 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales.1.3.6.1.4.1.18920.1.1.2.2.2
Parsing schema 68 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales.1.3.6.1.4.1.18920.1.2.1.2.2
Parsing schema 69 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales.1.3.6.1.4.1.18920.1.2.3.2.2
Parsing schema 70 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales.1.3.6.1.4.1.18920.1.2.6.1.2
Parsing schema 71 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales.1.3.6.1.4.1.18920.1.2.7.1.2
Parsing schema 72 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales\_Corporativos.1.3.6.1.4.1.18920.1.3.1.1
Parsing schema 73 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales\_Corporativos.1.3.6.1.4.1.18920.1.3.1.2.1
Parsing schema 74 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales\_Corporativos.1.3.6.1.4.1.18920.1.3.1.2.2
Parsing schema 75 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales\_Corporativos.1.3.6.1.4.1.18920.1.3.2.1
Parsing schema 76 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales\_Corporativos.1.3.6.1.4.1.18920.1.3.2.2.1
Parsing schema 77 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales\_Corporativos.1.3.6.1.4.1.18920.1.3.2.2.2
Parsing schema 78 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales\_Corporativos.1.3.6.1.4.1.18920.1.3.3.1.2
Parsing schema 79 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales\_Corporativos.1.3.6.1.4.1.18920.2.1.1.2.\*
Parsing schema 80 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales\_Corporativos.1.3.6.1.4.1.18920.2.1.1.2.2
Parsing schema 81 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales\_Corporativos.1.3.6.1.4.1.18920.2.1.1.2.\*
Parsing schema 82 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_Notariales\_Corporativos.1.3.6.1.4.1.18920.2.2.1.1.2
Parsing schema 83 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_para\_Corporaciones\_de\_Derecho\_Publico.1.3.6.1.4.1.18920.3.1.1.1
Parsing schema 84 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_para\_Corporaciones\_de\_Derecho\_Publico.1.3.6.1.4.1.18920.3.1.1.2.1
Parsing schema 85 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_para\_Corporaciones\_de\_Derecho\_Publico.1.3.6.1.4.1.18920.3.1.1.2.2
Parsing schema 86 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_para\_Corporaciones\_de\_Derecho\_Publico.1.3.6.1.4.1.18920.3.2.1.1.2
Parsing schema 87 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_FERN.1.3.6.1.4.1.18920.4.1.1.1
Parsing schema 88 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_FERN.1.3.6.1.4.1.18920.4.1.1.2.1
Parsing schema 89 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_FERN.1.3.6.1.4.1.18920.4.1.1.2.2
Parsing schema 90 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_para\_empleados.1.3.6.1.4.1.18920.4.2.1.1
Parsing schema 91 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_para\_empleados.1.3.6.1.4.1.18920.4.2.1.2.1
Parsing schema 92 of 301, check all attributes for name ANCERT.ANCERT\_Certificados\_para\_empleados.1.3.6.1.4.1.18920.4.2.1.2.2
Parsing schema 93 of 301, check all attributes for name ANF.ANF\_Server\_CA.1.3.6.1.4.1.18332.2.4
Parsing schema 94 of 301, check all attributes for name ANF.ANF\_Server\_CA.1.3.6.1.4.1.18332.3.3
Parsing schema 95 of 301, check all attributes for name ANF.ANF\_Server\_CA.1.3.6.1.4.1.18332.3.4
Parsing schema 96 of 301, check all attributes for name ANF.CertificatePolicies(1.3.6.1.4.1.18332.2.4.1).1.3.6.1.4.1.18332.2.4.1.1.\*
Parsing schema 97 of 301, check all attributes for name ANF.CertificatePolicies(1.3.6.1.4.1.18332.2.4.1).1.3.6.1.4.1.18332.2.4.1.1.\*
Parsing schema 98 of 301, check all attributes for name ANF.CertificatePolicies(1.3.6.1.4.1.18332.2.4.1).1.3.6.1.4.1.18332.2.4.1.2.\*
Parsing schema 99 of 301, check all attributes for name ANF.CertificatePolicies(1.3.6.1.4.1.18332.2.4.1).1.3.6.1.4.1.18332.2.4.1.2.\*
Parsing schema 100 of 301, check all attributes for name ANF.CertificatePolicies(1.3.6.1.4.1.18332.2.4.1).1.3.6.1.4.1.18332.3.4.1.1.\*
Parsing schema 101 of 301, check all attributes for name ANF.CertificatePolicies(1.3.6.1.4.1.18332.2.4.1).1.3.6.1.4.1.18332.3.4.1.1.\*
Parsing schema 102 of 301, check all attributes for name ANF.CertificatePolicies(1.3.6.1.4.1.18332.2.4.1).1.3.6.1.4.1.18332.3.4.1.2.\*
Parsing schema 103 of 301, check all attributes for name ANF.CertificatePolicies(1.3.6.1.4.1.18332.2.4.1).1.3.6.1.4.1.18332.3.4.1.2.\*
Parsing schema 104 of 301, check all attributes for name ANF.CertificatePolicies(1.3.6.1.4.1.18332.2.4.1).1.3.6.1.4.1.18332.2.5.1.3
Parsing schema 105 of 301, check all attributes for name ANF.CertificatePolicies(1.3.6.1.4.1.18332.2.4.1).1.3.6.1.4.1.18332.2.5.1.6
Parsing schema 106 of 301, check all attributes for name ANF.CertificatePolicies(1.3.6.1.4.1.18332.2.4.1).1.3.6.1.4.1.18332.2.5.1.9
Parsing schema 107 of 301, check all attributes for name IZENPE.CA\_personal\_de\_AAPP\_vascas.1.3.6.1.4.1.14777.4.\*
Parsing schema 108 of 301, check all attributes for name IZENPE.CA\_personal\_de\_AAPP\_vascas.1.3.6.1.4.1.14777.4.\*
Parsing schema 109 of 301, check all attributes for name IZENPE.CA\_de\_Ciudadanos\_y\_Entidades.1.3.6.1.4.1.14777.2.6
Parsing schema 110 of 301, check all attributes for name IZENPE.CA\_de\_Ciudadanos\_y\_Entidades.1.3.6.1.4.1.14777.2.7
Parsing schema 111 of 301, check all attributes for name IZENPE.CA\_de\_Ciudadanos\_y\_Entidades.1.3.6.1.4.1.14777.2.8
Parsing schema 112 of 301, check all attributes for name ACA.ACA\_-\_Certificados\_Corporativos.1.3.6.1.4.1.16533.10.2.1
Parsing schema 113 of 301, check all attributes for name ACA.ACA\_-\_Certificados\_Corporativos.1.3.6.1.4.1.16533.\*
Parsing schema 114 of 301, check all attributes for name ACA.ACA\_-\_Certificados\_Corporativos.1.3.6.1.4.1.16533.10.5.1 and ACA.ACA\_-\_Trust\*\*
Parsing schema 115 of 301, check all attributes for name ACA.ACA\_-\_Certificados\_Corporativos.1.3.6.1.4.1.16533.10.9.1
Parsing schema 116 of 301, check all attributes for name ACA.ACA\_-\_Certificados\_Corporativos.1.3.6.1.4.1.16533.\*
Parsing schema 117 of 301, check all attributes for name ACA.ACA\_-\_Certificados\_Corporativos.1.3.6.1.4.1.16533.10.5.1 and ACA.ACA\_-\_Trust\*\*
Parsing schema 118 of 301, check all attributes for name ACA.ACA\_-\_Trusted\_Certificates\_-\_2014.1.3.6.1.4.1.16533.20.3.1
Parsing schema 119 of 301, check all attributes for name ACCV.ACCV.1.3.6.1.4.1.8149.3.6.4.0
Parsing schema 120 of 301, check all attributes for name ACCV.ACCV.1.3.6.1.4.1.8149.3.7.3.0 and ACCV\_-\_Raiz\_1.ACCVCA120.1.3.6.1.4.1.8149.\*\*
Parsing schema 121 of 301, check all attributes for name ACCV.ACCV.1.3.6.1.4.1.8149.3.10.1.0
Parsing schema 122 of 301, check all attributes for name ACCV.ACCV.1.3.6.1.4.1.8149.3.13.2.0
Parsing schema 123 of 301, check all attributes for name ACCV.ACCV.1.3.6.1.4.1.8149.3.6.5.0
Parsing schema 124 of 301, check all attributes for name ACCV.ACCV.1.3.6.1.4.1.8149.3.7.4.0
Parsing schema 125 of 301, check all attributes for name ACCV.ACCV-CA2.1.3.6.1.4.1.8149.3.13.3.0
Parsing schema 126 of 301, check all attributes for name ACCV.ACCV-CA2.1.3.6.1.4.1.8149.3.18.1.0
Parsing schema 127 of 301, check all attributes for name ACCV\_-\_Raiz\_1.ACCVCA120.1.3.6.1.4.1.8149.3.6.6.0
Parsing schema 128 of 301, check all attributes for name ACCV\_-\_Raiz\_1.ACCVCA120.1.3.6.1.4.1.8149.3.20.2.0
Parsing schema 129 of 301, check all attributes for name ACCV.ACCV.1.3.6.1.4.1.8149.3.7.3.0 and ACCV\_-\_Raiz\_1.ACCVCA120.1.3.6.1.4.1.8149.\*\*
Parsing schema 130 of 301, check all attributes for name ACCV\_-\_Raiz\_1.ACCVCA110.1.3.6.1.4.1.8149.3.10.2.0
Parsing schema 131 of 301, check all attributes for name ACCV\_-\_Raiz\_1.ACCVCA110.1.3.6.1.4.1.8149.3.13.4.0
Parsing schema 132 of 301, check all attributes for name ACCV\_-\_Raiz\_1.ACCVCA110.1.3.6.1.4.1.8149.3.18.2.0
Parsing schema 133 of 301, check all attributes for name FNMT.FNMT.1.3.6.1.4.1.5734.3.5
Parsing schema 134 of 301, check all attributes for name FNMT.FNMT.1.3.6.1.4.1.5734.3.7
Parsing schema 135 of 301, check all attributes for name FNMT.FNMT.1.3.6.1.4.1.5734.3.3.4.4.1
Parsing schema 136 of 301, check all attributes for name FNMT.FNMT.1.3.6.1.4.1.5734.3.3.3.2
Parsing schema 137 of 301, check all attributes for name FNMT.FNMT.1.3.6.1.4.1.5734.3.3.4.4.2
Parsing schema 138 of 301, check all attributes for name FNMT.AC\_FNMT\_Usuarios.1.3.6.1.4.1.5734.3.10.1
Parsing schema 139 of 301, check all attributes for name FNMT.AC\_FNMT\_Componentes\_Informáticos.1.3.6.1.4.1.5734.3.9.\*
Parsing schema 140 of 301, check all attributes for name FNMT.AC\_FNMT\_Componentes\_Informáticos.1.3.6.1.4.1.5734.3.9.\*
Parsing schema 141 of 301, check all attributes for name FNMT.AC\_-Representación.1.3.6.1.4.1.5734.3.11.2
Parsing schema 142 of 301, check all attributes for name FNMT.AC\_-Representación.1.3.6.1.4.1.5734.3.11.1
Parsing schema 143 of 301, check all attributes for name FNMT.AC\_-Representación.1.3.6.1.4.1.5734.3.11.3
Parsing schema 144 of 301, check all attributes for name DGP.DGP.2.16.724.1.2.2.2.3
Parsing schema 145 of 301, check all attributes for name DGP.DGP.2.16.724.1.2.2.2.4
Parsing schema 146 of 301, check all attributes for name S21SEC\_-\_PASSI.PASSI.2.16.840.1.113733.1.7.23.3
Parsing schema 147 of 301, check all attributes for name OMC.OMC\_(Obsolet).1.3.6.1.4.1.26852.1.1.\*
Parsing schema 148 of 301, check all attributes for name OMC.OMC\_(Obsolet).1.3.6.1.4.1.26852.1.1.\*
Parsing schema 149 of 301, check all attributes for name OMC.OMC\_(Obsolet).1.3.6.1.4.1.26852.1.1.3
Parsing schema 150 of 301, check all attributes for name OMC.OMC\_(Obsolet).1.3.6.1.4.1.26852.1.1.4
Parsing schema 151 of 301, check all attributes for name OMC.OMC\_\_(AC\_-Camerfirma\_2009).1.3.6.1.4.1.26852.1.1.1.1
Parsing schema 152 of 301, check all attributes for name OMC.OMC\_\_(AC\_-Camerfirma\_2009).1.3.6.1.4.1.26852.1.1.1.2
Parsing schema 153 of 301, check all attributes for name OMC.OMC\_\_(AC\_-Camerfirma\_2009).1.3.6.1.4.1.26852.1.1.2.1
Parsing schema 154 of 301, check all attributes for name OMC.OMC\_\_(AC\_-Camerfirma\_2009).1.3.6.1.4.1.26852.1.1.2.2
Parsing schema 155 of 301, check all attributes for name OMC.OMC\_\_(AC\_-Camerfirma\_2009).1.3.6.1.4.1.26852.1.1.3.1
Parsing schema 156 of 301, check all attributes for name OMC.OMC\_\_(AC\_-Camerfirma\_2009).1.3.6.1.4.1.26852.1.1.3.2
Parsing schema 157 of 301, check all attributes for name OMC.OMC\_\_(AC\_-Camerfirma\_2009).1.3.6.1.4.1.26852.1.1.5
Parsing schema 158 of 301, check all attributes for name OMC.OMC\_\_(AC\_-Camerfirma\_2009).1.3.6.1.4.1.26852.1.1.6
Parsing schema 159 of 301, check all attributes for name OMC.OMC\_\_(AC\_-Camerfirma\_2009).1.3.6.1.4.1.26852.1.1.\*
Parsing schema 160 of 301, check all attributes for name OMC.OMC\_\_(AC\_-Camerfirma\_2009).1.3.6.1.4.1.26852.1.1.\*
Parsing schema 161 of 301, check all attributes for name OMC.OMC\_\_(AC\_-Camerfirma\_2009).1.3.6.1.4.1.26852.1.2.1.1
Parsing schema 162 of 301, check all attributes for name OMC.OMC\_\_(AC\_-Camerfirma\_2009).1.3.6.1.4.1.26852.1.2.1.2
Parsing schema 163 of 301, check all attributes for name HealthSign.HealthSign.1.3.6.1.4.1.28537.1.1.1
Parsing schema 164 of 301, check all attributes for name EDICOM.ACEDICOM\_01.1.3.6.1.4.1.30051.2.1.2.5.1 and EDICOM.ACEDICOM\_02.1.3.6.1.4.\*\*
Parsing schema 165 of 301, check all attributes for name EDICOM.ACEDICOM\_01.1.3.6.1.4.1.30051.2.1.2.\*
Parsing schema 166 of 301, check all attributes for name EDICOM.ACEDICOM\_01.1.3.6.1.4.1.30051.2.1.2.\*
Parsing schema 167 of 301, check all attributes for name EDICOM.ACEDICOM\_01.1.3.6.1.4.1.30051.2.1.2.1.1
Parsing schema 168 of 301, check all attributes for name EDICOM.ACEDICOM\_02.1.3.6.1.4.1.30051.2.1.2.\*
Parsing schema 169 of 301, check all attributes for name EDICOM.ACEDICOM\_02.1.3.6.1.4.1.30051.2.1.2.\*
Parsing schema 170 of 301, check all attributes for name EDICOM.ACEDICOM\_02.1.3.6.1.4.1.30051.2.1.2.2.2
Parsing schema 171 of 301, check all attributes for name EDICOM.ACEDICOM\_01.1.3.6.1.4.1.30051.2.1.2.5.1 and EDICOM.ACEDICOM\_02.1.3.6.1.4.\*\*
Parsing schema 172 of 301, check all attributes for name SERVICIO\_DE\_CERTIFICACIÓN\_DE\_REGISTRADORES\_(SCR).CA\_INTERNA.1.3.6.1.4.1.17276.0.1.2.1
Parsing schema 173 of 301, check all attributes for name SERVICIO\_DE\_CERTIFICACIÓN\_DE\_REGISTRADORES\_(SCR).CA\_INTERNA.1.3.6.1.4.1.17276.0.2.3.1
Parsing schema 174 of 301, check all attributes for name SERVICIO\_DE\_CERTIFICACIÓN\_DE\_REGISTRADORES\_(SCR).CA\_EXTERNA.1.3.6.1.4.1.17276.0.1.1.1
Parsing schema 175 of 301, check all attributes for name SERVICIO\_DE\_CERTIFICACIÓN\_DE\_REGISTRADORES\_(SCR).CA\_EXTERNA.1.3.6.1.4.1.17276.0.2.1.1
Parsing schema 176 of 301, check all attributes for name SERVICIO\_DE\_CERTIFICACIÓN\_DE\_REGISTRADORES\_(SCR).CA\_EXTERNA.1.3.6.1.4.1.17276.0.2.2.1
Parsing schema 177 of 301, check all attributes for name SERVICIO\_DE\_CERTIFICACIÓN\_DE\_REGISTRADORES\_(SCR).CA\_EXTERNA.1.3.6.1.4.1.17276.0.2.4.1
Parsing schema 178 of 301, check all attributes for name SERVICIO\_DE\_CERTIFICACIÓN\_DE\_REGISTRADORES\_(SCR).CA\_EXTERNA.1.3.6.1.4.1.17276.0.2.5.1
Parsing schema 179 of 301, check all attributes for name SIGNE.SIGNE\_Autoridad\_de\_Certificación.1.3.6.1.4.1.36035.1.1.2
Parsing schema 180 of 301, check all attributes for name SIGNE.SIGNE\_Autoridad\_de\_Certificación.1.3.6.1.4.1.36035.1.2.2
Parsing schema 181 of 301, check all attributes for name SIGNE.SIGNE\_Autoridad\_de\_Certificación.1.3.6.1.4.1.36035.1.2.1
Parsing schema 182 of 301, check all attributes for name SIA.SIA\_SUB01.1.3.6.1.4.1.39131.10.1.3
Parsing schema 183 of 301, check all attributes for name SIA.SIA\_SUB01.1.3.6.1.4.1.39131.10.1.2
Parsing schema 184 of 301, check all attributes for name SIA.SIA\_SUB01.1.3.6.1.4.1.39131.10.1.4
Parsing schema 185 of 301, check all attributes for name geotrust\_Global\_CA.geotrust\_SSL\_CA\_-\_G3.2.23.140.1.2.2
Parsing schema 186 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.\*
Parsing schema 187 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.\*
Parsing schema 188 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.82
Parsing schema 189 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.41
Parsing schema 190 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\*
Parsing schema 191 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.1\* and CATCERT.EC-SAFP.1.3.6.1.4.1.15096.1\*\*
Parsing schema 192 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.1\* and CATCERT.EC-SAFP.1.3.6.1.4.1.15096.1\*\*
Parsing schema 193 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.131.2 and CATCERT.EC-UR.1.3.6.1.4.1.15096.\*\*
Parsing schema 194 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.81.3.2
Parsing schema 195 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\*
Parsing schema 196 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.41.1.4
Parsing schema 197 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\*
Parsing schema 198 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\*
Parsing schema 199 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.161.2 and CATCERT.EC-SAFP.1.3.6.1.4.1.1509\*\*
Parsing schema 200 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15906.1.3.1.21.4
Parsing schema 201 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.121.2 and CATCERT.EC-PARLAMENT.1.3.6.1.4.1\*\*
Parsing schema 202 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.1\* and CATCERT.EC-SAFP.1.3.6.1.4.1.15096.1\*\*
Parsing schema 203 of 301, check all attributes for name CATCERT.EC-SAFP.1.3.6.1.4.1.15096.1.3.1.1\*
Parsing schema 204 of 301, check all attributes for name CATCERT.EC-SAFP.1.3.6.1.4.1.15096.1.3.1.8\*
Parsing schema 205 of 301, check all attributes for name CATCERT.EC-SAFP.1.3.6.1.4.1.15096.1.3.1.8\*
Parsing schema 206 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\*
Parsing schema 207 of 301, check all attributes for name CATCERT.EC-SAFP.1.3.6.1.4.1.15096.1.3.1.8\*
Parsing schema 208 of 301, check all attributes for name CATCERT.EC-SAFP.1.3.6.1.4.1.15096.1.3.1.1\*
Parsing schema 209 of 301, check all attributes for name CATCERT.EC-SAFP.1.3.6.1.4.1.15096.1.3.1.85.2
Parsing schema 210 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.161.2 and CATCERT.EC-SAFP.1.3.6.1.4.1.1509\*\*
Parsing schema 211 of 301, check all attributes for name CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.0.51
Parsing schema 212 of 301, check all attributes for name CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.71
Parsing schema 213 of 301, check all attributes for name CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.91.1
Parsing schema 214 of 301, check all attributes for name CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.91.2
Parsing schema 215 of 301, check all attributes for name CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.51.2
Parsing schema 216 of 301, check all attributes for name CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.51.3
Parsing schema 217 of 301, check all attributes for name CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.51
Parsing schema 218 of 301, check all attributes for name CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.51.1
Parsing schema 219 of 301, check all attributes for name CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.0.91
Parsing schema 220 of 301, check all attributes for name CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.91
Parsing schema 221 of 301, check all attributes for name CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.15
Parsing schema 222 of 301, check all attributes for name CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.16
Parsing schema 223 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\*
Parsing schema 224 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\*
Parsing schema 225 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\*
Parsing schema 226 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\*
Parsing schema 227 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\*
Parsing schema 228 of 301, check all attributes for name CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.151.4 and CATCERT.EC-URV.1.3.6.1.4.\*\*
Parsing schema 229 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.121.2 and CATCERT.EC-PARLAMENT.1.3.6.1.4.1\*\*
Parsing schema 230 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.161.2 and CATCERT.EC-SAFP.1.3.6.1.4.1.1509\*\*
Parsing schema 231 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.161.2 and CATCERT.EC-SAFP.1.3.6.1.4.1.1509\*\*
Parsing schema 232 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\*
Parsing schema 233 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\*
Parsing schema 234 of 301, check all attributes for name CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.8:1\* and CATCERT.EC-URV.1.3.6.1.4.1.15096.\*\*
Parsing schema 235 of 301, check all attributes for name CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.8:1\* and CATCERT.EC-URV.1.3.6.1.4.1.15096.\*\*
Parsing schema 236 of 301, check all attributes for name CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.8:1\* and CATCERT.EC-URV.1.3.6.1.4.1.15096.\*\*
Parsing schema 237 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\*
Parsing schema 238 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\*
Parsing schema 239 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\*
Parsing schema 240 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\*
Parsing schema 241 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\*
Parsing schema 242 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\*
Parsing schema 243 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.121.2 and CATCERT.EC-PARLAMENT.1.3.6.1.4.1\*\*
Parsing schema 244 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.131.2 and CATCERT.EC-UR.1.3.6.1.4.1.15096.\*\*
Parsing schema 245 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.1\* and CATCERT.EC-SAFP.1.3.6.1.4.1.15096.1\*\*
Parsing schema 246 of 301, check all attributes for name CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.161.3
Parsing schema 247 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\*
Parsing schema 248 of 301, check all attributes for name CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.8:1\* and CATCERT.EC-URV.1.3.6.1.4.1.15096.\*\*
Parsing schema 249 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\*
Parsing schema 250 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\*
Parsing schema 251 of 301, check all attributes for name CATCERT.EC-UR.1.3.6.1.4.1.15096.1.3.1.8:1\* and CATCERT.EC-URV.1.3.6.1.4.1.15096.\*\*
Parsing schema 252 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.8\* and CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15\*\*
Parsing schema 253 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\*
Parsing schema 254 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\*
Parsing schema 255 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\*
Parsing schema 256 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\*
Parsing schema 257 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.42.3.\* and CATCERT.EC-SAFP.1.3.6.1.4.1.150\*\*
Parsing schema 258 of 301, check all attributes for name CATCERT.EC-PARLAMENT.1.3.6.1.4.1.15096.1.3.1.151.4 and CATCERT.EC-URV.1.3.6.1.4.\*\*
Parsing schema 259 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.161.2 and CATCERT.EC-SAFP.1.3.6.1.4.1.1509\*\*
Parsing schema 260 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.121.2 and CATCERT.EC-PARLAMENT.1.3.6.1.4.1\*\*
Parsing schema 261 of 301, check all attributes for name CATCERT.EC-AL.1.3.6.1.4.1.15096.1.3.1.121.2 and CATCERT.EC-PARLAMENT.1.3.6.1.4.1\*\*
Parsing schema 262 of 301, check all attributes for name CATCERT.idCAT.1.3.6.1.4.1.15096.1.3.1.86.1
Parsing schema 263 of 301, check all attributes for name CATCERT.idCAT.1.3.6.1.4.1.15096.1.3.1.84.1
Parsing schema 264 of 301, check all attributes for name CATCERT.idCAT.1.3.6.1.4.1.15096.1.3.1.86.2
Parsing schema 265 of 301, check all attributes for name CATCERT.idCAT.1.3.6.1.4.1.15096.1.3.1.\*
Parsing schema 266 of 301, check all attributes for name CATCERT.idCAT.1.3.6.1.4.1.15096.1.3.1.\*
Parsing schema 267 of 301, check all attributes for name CATCERT.EC-ACC.1.3.6.1.4.1.15096.1.3.1.111
Parsing schema 268 of 301, check all attributes for name CATCERT.EC-SECTORPUBLIC.1.3.6.1.4.1.15096.1.3.1.86.3
Parsing schema 269 of 301, check all attributes for name CATCERT.EC-SECTORPUBLIC.1.3.6.1.4.1.15096.1.3.1.51.4
Parsing schema 270 of 301, check all attributes for name CATCERT.EC-SECTORPUBLIC-eIdAS.1.3.6.1.4.1.15096.1.3.2.7.1.2
Parsing schema 271 of 301, check all attributes for name CATCERT.EC-SECTORPUBLIC-eIdAS.1.3.6.1.4.1.15096.1.3.2.7.1.1
Parsing schema 272 of 301, check all attributes for name CATCERT.EC-SECTORPUBLIC-eIdAS.1.3.6.1.4.1.15096.1.3.2.82.1
Parsing schema 273 of 301, check all attributes for name CATCERT.EC-SECTORPUBLIC-eIdAS.1.3.6.1.4.1.15096.1.3.2.7.3.1
Parsing schema 274 of 301, check all attributes for name CATCERT.EC-SECTORPUBLIC-eIdAS.1.3.6.1.4.1.15096.1.3.2.86.1
Parsing schema 275 of 301, check all attributes for name CATCERT.EC-SECTORPUBLIC-eIdAS.1.3.6.1.4.1.15096.1.3.2.4.1.2
Parsing schema 276 of 301, check all attributes for name CATCERT.EC-SECTORPUBLIC-eIdAS.1.3.6.1.4.1.15096.1.3.2.4.1.1
Parsing schema 277 of 301, check all attributes for name CATCERT.EC-SECTORPUBLIC-eIdAS.1.3.6.1.4.1.15096.1.3.2.8.1.1
Parsing schema 278 of 301, check all attributes for name CATCERT.EC-SECTORPUBLIC-eIdAS.1.3.6.1.4.1.15096.1.3.2.51.1
Parsing schema 279 of 301, check all attributes for name CATCERT.EC-SECTORPUBLIC-eIdAS.1.3.6.1.4.1.15096.1.3.2.5.2
Parsing schema 280 of 301, check all attributes for name CATCERT.EC-SECTORPUBLIC-eIdAS.1.3.6.1.4.1.15096.1.3.2.51.2
Parsing schema 281 of 301, check all attributes for name CATCERT.EC-SECTORPUBLIC-eIdAS.1.3.6.1.4.1.15096.1.3.2.91.1
Parsing schema 282 of 301, check all attributes for name CATCERT.EC-SECTORPUBLIC-eIdAS.1.3.6.1.4.1.15096.1.3.2.6.2
Parsing schema 283 of 301, check all attributes for name CATCERT.EC-CIUTADANIA-eIdAS.1.3.6.1.4.1.15096.1.3.2.86.2
Parsing schema 284 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.AFIRMA.AFIRMA.0
Parsing schema 285 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.AFIRMA.AFIRMA.1
Parsing schema 286 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.AFIRMA.AFIRMA.4
Parsing schema 287 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.AFIRMA.AFIRMA.5
Parsing schema 288 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.AFIRMA.AFIRMA.8
Parsing schema 289 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.AFIRMA.AFIRMA.11
Parsing schema 290 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.AFIRMA.AFIRMA.12
Parsing schema 291 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.AFIRMA.AFIRMA.2
Parsing schema 292 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.AFIRMA.AFIRMA.3
Parsing schema 293 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.AFIRMA.AFIRMA.6
Parsing schema 294 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.AFIRMA.AFIRMA.7
Parsing schema 295 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.AFIRMA.AFIRMA.9
Parsing schema 296 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.AFIRMA.AFIRMA.10
Parsing schema 297 of 301, check all attributes for name .TSL.TSL.0.4.0.194112.1.0
Parsing schema 298 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.TSL.TSL.0.4.0.194112.1.2
Parsing schema 299 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.TSL.TSL.0.4.0.194112.1.1
Parsing schema 300 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.TSL.TSL.0.4.0.194112.1.3
Parsing schema 301 of 301, check all attributes for name EXTERNAL\_CERTIFICATE\_SERVICE.TSL.TSL.DEFAULT
Checking for parsing schema existence DONE
Saving CertificateRegistry file
END

  

  

  

  

  

  

Document generated by Confluence on 07 junio 2025 00:00

[Atlassian](http://www.atlassian.com/)