Suport Tècnic : Automatitzacions  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [01 - Gestió Operativa](26313391.html)
4.  [Tasques complementàries](26313409.html)

Suport Tècnic : Automatitzacions
================================

Created by Unknown User (otecobernal), last modified on 02 July 2020

  

  

PADRÓ - Ajuntaments caigus

**Generacio i enviament de estat de les sondes del Padro**

Cron: 10 8 \* \* 1-5

Quan s'executa: De dilluns a divendres a les 08:10 del matí

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/MailPadro
./envia\_test.sh 

Exemple:

![](attachments/41517772/41517860.png)

  

**Generacio i enviament de estat de les sondes del Padro - SOL OT**

Cron: 10 13 \* \* 1-5

Quan s'executa: De dilluns a divendres a les 13:10 del migdia

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/MailPadro
./envia\_ot.sh 

Exemple:

![](attachments/41517772/41517859.png)

  

DIR3 - Import PRE i PRO

**Cridar DIR3\_Import**

Cron: 00 8 \* \* 1-5

Quan s'executa: De dilluns a divendres a les 08:00 del matí

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/DIR3
./DIR3Import\_wget.sh 

logs: /Monitors/PADROMonitor/otsuporttecnic/DIR3/log\_cron.out

Exemple:

![](attachments/41517772/41517862.png)

**Cridar DIR3\_Import\_ORA12**

Cron: 30 7 \* \* 1-5

Quan s'executa:De dilluns a divendres a les 07:30 del matí

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/DIR3
./DIR3Import\_ORA12\_wget.sh

logs: /Monitors/PADROMonitor/otsuporttecnic/DIR3/ORA12log\_cron.out

Exemple:

![](attachments/41517772/41517861.png)

Execució informeDCOC

Descripció: Fa una extracció de les peticions de Barcelona sobre el DCOC a l'últim mes. Finalment envia un correu adjuntant l'extracció per poder fer un informe.

Cron: 0 8 1 \* \*

Quan s'executa: El dia 01 de cada mes a les 8:00 del matí

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/automatitzacions
./informeDCOC.sh

logs: /Monitors/PADROMonitor/otsuporttecnic/automatitzacions/logs/informeDCOC.log

Exemple:

![](attachments/41517772/41517864.png)

  

Automatització trustedX

Descripció: S'encarrega d'afegir entitats a la blacklist quan els hi caduca el certificat al SSC, a més bloqueja els edictes publicats i programats perquè no generin errors. També afegeix entitats a la et\_avis quan falten menys de 60 dies perquè caduqui el certificat. Finalment quan es renova un certificat elimina els ens de la blacklist i la et\_avis i desbloqueja els edictes bloquejats.

Cron: 30 18 \* \* \*

Quan s'executa: Cada dia a les 18:30 de la tarda

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/automatitzacions
./trustedx.sh 

logs: /Monitors/PADROMonitor/otsuporttecnic/automatitzacions/logs/trustedX.log

Exemple:

![](attachments/41517772/41517865.png)

Execucio mail matí sondes funcionals

Descripció: Envia l'estat de les sondes funcionals per poder fer el correu de cada matí, juntament amb l'estat de les OMI i les OP5.

Cron: 0 8 \* \* 1-5

Quan s'executa: De dilluns a divendres a les 08:00 del matí

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/automatitzacions
./sondesOTAP.sh

logs: /Monitors/PADROMonitor/otsuporttecnic/automatitzacions/logs/sondesOTAP.log

Exemple:

![](attachments/41517772/41517866.png)

Execucio automatitzacio general

Descripció: Executa sondes i envia l'estat de les que generen alerta, informant de l'estat general dels serveis a l'AOC.

Cron: 

*   30 7-20 \* \* 1-5
*   0 \* \* \* \*

Quan s'executa:

*   De dilluns a divendres al minut 30 de les hores entre les 7 i les 20 (7:30, 8:30, 9:30, 10:30, ..., 19:30)
*   Cada dia al minut 0 de totes les hores (00:00, 01:00, ... 07:00, 08:00, ... 23:00)

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/automatitzacions
./general.sh

logs: /Monitors/PADROMonitor/otsuporttecnic/automatitzacions/logs/general.log

Exemple:

![](attachments/41517772/41517867.png)

  

Informar dels FP que s'han de revisar (VIPs i amb més de 5 dies sense comentari) - OT

Descripció: Fa una extracció dels tiquets que han obert entitats VIP i dels tiquets que porten més de 5 dies ense actualitzar-se, per poder-los prioritzar durant el dia.

Cron: 59 7 \* \* 1-5

Quan s'executa: De dilluns a divendres a les 7:59

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/automatitzacions
./antiguitatOT.sh

logs: /Monitors/PADROMonitor/otsuporttecnic/automatitzacions/logs/antiguitatOT.log

Exemple:

![](attachments/41517772/41517868.png)

  

Automatització consumsPCI30

Descripció: Fa una extracció de les entitats que més consums han realitzat a pro i a pre. S'ha d'analitzar si alguna entitat està fent masses consums, sobretot a l'entorn de PRE, per mirar si es poden reduir.

Cron: 0 10 1,16 \* \*

Quan s'executa: Els dies 1 i 16 de cada mes a les 10:00

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/automatitzacions
./consumsPCI30.sh 

logs: /Monitors/PADROMonitor/otsuporttecnic/automatitzacions/logs/consumsPCI30.log

Exemple:

![](attachments/41517772/41517869.png)

  

Automatització retornatsResolts

Descripció: Analitza la resolució per persona.

Cron: 00 13,17 \* \* 1-5

Quan s'executa: De dilluns a divendres a les 13:00 i a les 17:00

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/automatitzacions
./retornadesResoltes.sh

logs: /Monitors/PADROMonitor/otsuporttecnic/automatitzacions/logs/retornadesResoltes.log

Exemple:

![](attachments/41517772/41517870.png)

  

Automatització carregaCertificats

Descripció: Envia un correu indicant els tiquets d'Alta de Serveis per carregar certificats, per AEAT, COPIA, REPRESENTA, ENOTUM, ETAULER.

Cron: 00 13 \* \* 3

Quan s'executa: Els dimecres a les 13:00

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/automatitzacions
./carregaCertificats.sh

logs: /Monitors/PADROMonitor/otsuporttecnic/automatitzacions/logs/carregaCertificats.log

Exemple:

![](attachments/41517772/41517871.png)

  

Generacio i enviament de volumetria del FP del dia anterior

Descripció: Fa una extracció de la resolució de tiquets del dia anterior.

Cron: 0 8 \* \* 1-5 

Quan s'executa: De dilluns a divendres a les 08:00 del matí.

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/automatitzacions
./volumetriaFP.sh

logs: /Monitors/PADROMonitor/otsuporttecnic/automatitzacions/logs/volumetriaFP.log

Exemple:

![](attachments/41517772/41517873.png)

  

Generacio i enviament de volumetria del FP a les 13h del dia actual

Descripció: Fa una extracció de la resolució de tiquets del dia actual.

Cron: 00 13 \* \* 1-5

Quan s'executa: De dilluns a divendres a les 13:00 del migdia.

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/automatitzacions
./volumetriaFPdiaActual.sh

logs: /Monitors/PADROMonitor/otsuporttecnic/automatitzacions/logs/volumetriaFPdiaActual.log

Exemple:

![](attachments/41517772/41517872.png)

Generacio i enviament d'excel amb extracció informe setmanal

Descripció: Fa una extracció de la resolució de tiquets setmanal i adjunta l'excel amb l'extracció via correu.

Cron: 00 14 \* \* 5

Quan s'executa: Els divendres a les 14:00

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/automatitzacions
./extraccioInformeTiquetingDivendres.sh

logs: /Monitors/PADROMonitor/otsuporttecnic/automatitzacions/logs/extraccioInformeTiquetingDivendres.log

Exemple:

![](attachments/41517772/41517874.png)

  

Generacio i enviament d'excel amb extracció informe mensual

Descripció: Fa una extracció de la resolució de tiquets mensual i adjunta l'excel amb l'extracció via correu.

Cron: 

*   00 23 30 4,6,9,11 \*
*   00 23 31 1,3,5,7,8,10,12 \*
*   00 23 28 2 \*

Quan s'executa: L'ultim dia de cada mes a les 23:00

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/automatitzacions
./extraccioInformeTiquetingMensual.sh

logs: /Monitors/PADROMonitor/otsuporttecnic/automatitzacions/logs/extraccioInformeTiquetingMensual.log

Exemple:

![](attachments/41517772/41517875.png)

  

Rebuild dels index de DIR3

Descripció: Molt sovint, a primera hora teniem queixes d'usuaris a través del CAU indicant que el desplegable de la tramesa sir no funcionava. Es va optar per llençar la query que solucionava el problema cada matí per evitar l'error recurrent.

Cron: 10 08 \* \* \*

Quan s'executa: Cada dia a les 8:10

Com executar-la:

cd /Monitors/PADROMonitor/otsuporttecnic/automatitzacions
./rebuildIndexDesplegableSir.sh

logs: /Monitors/PADROMonitor/otsuporttecnic/automatitzacions/logs/desplegableSIR.log

Exemple: No s'envia correu

  

Tancar jiras resolts (BOT-Padro)

Descripció: Tanca els tiquets del Jira que estan resolts i han sigut creats per l'usuari BOTPadro.

Cron: 0 7,12,16,20 \* \* 1-5

Quan s'executa: De dilluns a divendres a les 7:00, 12:00, 16:00 i 20:00

Com executar-la:

d /Monitors/PADROMonitor/otsuporttecnic/automatitzacions
./tancarJiras.sh

logs: /Monitors/PADROMonitor/otsuporttecnic/automatitzacions/logs/tancarJiras.log

Exemple: No s'envia correu

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2020-7-1\_14-23-17.png](attachments/41517772/41517859.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-1\_14-23-45.png](attachments/41517772/41517860.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-1\_14-28-49.png](attachments/41517772/41517861.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-1\_14-29-1.png](attachments/41517772/41517862.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-1\_15-8-25.png](attachments/41517772/41517864.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-1\_15-8-46.png](attachments/41517772/41517865.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-1\_15-10-34.png](attachments/41517772/41517866.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-1\_15-11-8.png](attachments/41517772/41517867.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-1\_15-11-36.png](attachments/41517772/41517868.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-1\_15-12-28.png](attachments/41517772/41517869.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-1\_15-13-16.png](attachments/41517772/41517870.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-1\_15-13-48.png](attachments/41517772/41517871.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-1\_15-14-12.png](attachments/41517772/41517872.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-1\_15-15-20.png](attachments/41517772/41517873.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-1\_15-16-38.png](attachments/41517772/41517874.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-1\_15-17-1.png](attachments/41517772/41517875.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:47

[Atlassian](http://www.atlassian.com/)