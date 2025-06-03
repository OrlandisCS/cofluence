Suport Tècnic : Errors en FASE\_REGISTRE  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [02 - FAQ's serveis](26313393.html)
4.  [FAQ's ENOTUM](28705561.html)
5.  [eNOTUM - FLUX DEL SERVEI - ERRORS - Errors en el cicle de vida d'una notificació (ESTATS >= 1024)](36340658.html)

Suport Tècnic : Errors en FASE\_REGISTRE
========================================

Created by Unknown User (otecjriquelme), last modified by Joan Riquelme on 06 February 2025

Durant aquesta fase, eNOTUM ha d'integrar-se amb el MUX per tal de crear un número de registre per la notificació.

Internament, **eNOTUM li envia una petició a MUX i aquest li retorna un número de registre.**

Un cop identificat i solucionat l'error. És important comunicar a l'ens que haurà de tornar a fer aquestes notificacions si ells ho creuen oportú. Nosaltres **NO podem reiniciar notificacions que hagin fallat en aquesta fase**.

Consultes a Base de dades per determinar si hi ha error en aquesta fase i quin error hi ha:
-------------------------------------------------------------------------------------------

**Revisem estat de la notificació**

\--Si la notificació es troba en estat 1024 --> Error en FASE REGISTRE
select \*
from nt30.aoc\_nt\_notificacions
where id\_notificacio = 'XXXXXXXXX';

**Revisem com està la notificació a la event motor**

\-- Si la FASE\_REGISTRE es troba en estat 2 i reintents 6 vol dir que ha fallat
SELECT \*
FROM NT30.AOC\_NT\_EVENT\_MOTOR a
where a.id\_notificacio = 'XXXXXXXXX';

**Revisem a la taula logs quin error ha donat**

\-- Hauríem de veure com s'ha insertat a la taula ERROR IRRECUPERABLE en fase REGISTRE
select \*
from nt30.aoc\_nt\_logs l
where l.id\_notificacio = 'XXXXXXXX';

  
Errors documentats per aquesta fase:
---------------------------------------

**Entitat no generada al MUX**

Literal de l'error:
-------------------

### **ERROR DURANT L'EXECUCIO DE LA FASE. Causa: No s'ha pogut aplicar l'avaluació de regles sobre la petició: No s'ha pogut analitzar la petició rebuda, potser no té el format correcte. (No s'ha informat a la petició cap codi de població per a l'administració de procedència i aquest no s'ha pogut resoldre a la base de dades d'ens del MUX.)**

  

Revisions i Solució

Solució:
--------

L'entitat no està donada d'alta al MUX, per tant caldria donar-la d'alta.

Pas 0: Comprovacions prèvies
----------------------------

Comprovarem que estan informant l'emissor correctament i que aquest no existeix a nivell de MUX.

Recuperem les **dades específiques de l'XML de petició** amb la següent query:

**XML Tramesa**

select ll.\* from nt30.aoc\_nt\_notificacions nn, nt30.aoc\_nt\_logs\_tramesa ll
where nn.id\_tramesa = ll.id\_tramesa
and nn.id\_notificacio = '770281';

Així podrem **recuperar el XML de petició** (la part específica de eNOTUM).

En aquest XML podem veure informat l'ens amb el qual s'ha de fer el registre, en el bloc:

 <ns5:Emissor>
      <ns5:CodiOrganisme>7976100071</ns5:CodiOrganisme>
      <ns5:CodiDepartament>7976100071</ns5:CodiDepartament>
 </ns5:Emissor>

Aquest és l'INE10 que ha d'estar donat d'alta al MUX. Així que el cercarem per veure si està donat d'alta, i en cas que no ho estigui, el donarem d'alta...

Pas 1: Comprovacions i modificacions a nivell de MUX

1 - Accedim a l'admin del MUX:

PRE: [http://admin-pre.iop.aoc.cat/prjMUXWebAdmin/inici.do](http://admin-pre.iop.aoc.cat/prjMUXWebAdmin/inici.do)

PRO: [http://admin.iop.aoc.cat/prjMUXWebAdmin/inici.do](http://admin.iop.aoc.cat/prjMUXWebAdmin/inici.do)

2 - Cerquem l'INE 10 que hem obtingut en el pas 0: **Gestió d'entitats >> Filtrar per INE10**. Mirem si és que està mal informada o directament no existeix.

3 - En cas que no existeixi, haurem de donar-la d'alta, tal i com es mostra a continuació:

![](attachments/36340660/36340912.png)

Omplim tots els camps i cliquem a **AFEGIR.**

Aquesta modificació hauria de resoldre l'error. Indiquem a l'ens que ho tornin a provar.

**INE10 mal configurat a nivell de Portlet**

Literal de l'error:
-------------------

### ERROR DURANT L'EXECUCIÓ DE LA FASE. Causa : cat.aoc.enotum.motor.MotorException: 6: Error de sintaxi : Linia=-1; Columna=-1; Missatge="String: '150003' does not match pattern for type of element INE10 in namespace [http://net.aocat/MUX2/PeticioRegistre](http://net.aocat/MUX2/PeticioRegistre)"; Offset=-1; Severity=0 

  

Revisions i solució

Solució
-------

Revisem que l'entitat estigui ben configurada a nivell del Portlet:

1- Anem a la web admin del MUX: [http://admin.iop.aoc.cat/prjMUXWebAdmin/inici.do](http://admin.iop.aoc.cat/prjMUXWebAdmin/inici.do) > Gestió Entitats \> Busquem l'entitat \> identifiquem el codi INE10 que hi ha configurat.

**![](attachments/36340660/36340669.png?effects=drop-shadow)**

  

2- Accedim a EACAT \> Aplicacions \> ENOTUM \> Configuracions > En "_Esculli l'organització a administrar:_" escrivim el nom de l'ens afectat \> Despleguem i escollim l'entitat pare (la primera): 

![](attachments/36340660/36340670.png?effects=drop-shadow)

  

3- En la secció "Registre" el camp INE 10 l'haurem d'afegir els 0 que falten:

![](attachments/36340660/36340671.png?effects=drop-shadow)

**Algun element de la petició supera la mida màxima**

Literal de l'error:
-------------------

### ERROR DURANT L'EXECUCIÓ DE LA FASE. Causa : cat.aoc.enotum.motor.MotorException: 6: Error de sintaxi : Linia=-1; Columna=-1; Missatge="**String length (67) is greater than max length facet (50) for type of element Nom in namespace [http://net.aocat/MUX2/PeticioRegistre](http://net.aocat/MUX2/PeticioRegistre)**"; Offset=-1; Severity=0 

  

Revisions i Solució

Solució
-------

Aquest error es dóna perquè **algun element de la petició XML que eNOTUM llença contra MUX supera la mida màxima que accepta MUX**.

Per tal de detectar quin element és, necessitarem la petició específica d'eNOTUM i ens podem ajudar de la llargada que ens retorna el MUX en l'error (en l'exemple 67).

Tots els elements amb què eNOTUM munta la petició que llença cap al MUX surten de la petició específica d'eNOTUM, així que l'**usuari haurà d'escurçar la llargada d'algun d'aquests elements, que eNOTUM accepta però MUX no**.

Recuperem la petició específica d'eNOTUM (XML) amb la següent query:

**Recuperem la petició específica d'eNOTUM**

select tt.\* from nt30.aoc\_nt\_notificacions nn, nt30.aoc\_nt\_tramesa tt
where tt.id\_tramesa = nn.id\_tramesa
and nn.id\_notificacio = 'XXXXXXX'

Una vegada recuperada, revisem quin és el camp del que es queixa MUX, i l'hi diem a l'usuari que repeteixi la petició però ajustant la mida d'aquest camp.

**Raó Social molt llarga**

Literal de l'error:
-------------------

### ERROR DURANT L'EXECUCIO DE LA FASE. Causa : cat.aoc.enotum.motor.MotorException: 43: **Els següents camps excedeixen la mida permesa: descripcio (150)**

Revisions i solució

Solució
-------

El camp DESCRIPCIO del MUX és la Raó Social + el CIF del destinatari per ENOTUM. Si això supera els 150 caràcters, MUX retorna error. Tot i que eNOTUM ho ha deixat passar.

Per assegurar-nos, cerquem el registre del MUX utilitzant l'eina OracleQRY i filtrant per l'hora que trobem en els logs d'eNOTUM. A la petició d'evidencia de registre (MUX) veurem el camp DESCRIPCIO.

  

Per altra banda, recuperem la petició específica d'eNOTUM (XML) amb la següent query, i comprovem que la raó social és massa llarga:

**Recuperem la petició específica d'eNOTUM**

select tt.\* from nt30.aoc\_nt\_notificacions nn, nt30.aoc\_nt\_tramesa tt
where tt.id\_tramesa = nn.id\_tramesa
and nn.id\_notificacio = 'XXXXXXX'

Una vegada comprovat, caldrà indicar a l'usuari que repeteixi la petició però ajustant la mida del camp **RAO SOCIAL**.

**El Registre d'EACAT retorna error**

Literal de l'error:
-------------------

### ERROR DURANT L'EXECUCIO DE LA FASE. Causa : cat.aoc.enotum.motor.MotorException: 1002: **S'ha produït un error al registrar, codi 1, missatge L'ens entrada o sortida no existeix. Entrada: Cod\_Procedencia 5 Procendencia 9806800000 Sortida: Cod\_Destino 8 Destino** .  

  

Revisions i solució

Solució
-------

Per algun motiu EACAT està tornant ERROR a l'hora de realitzar el registre.

Els registres d'eNOTUM contra el registre EACAT només poden ser pel mon locat.

**Revisem si l'entitat és de la generalitat!** En cas que ho sigui, ha de registrar contra SARCAT.

Configuracions a realitzar perquè l'ens vagi contra SARCAT

**1 - Mirar contra quina Oficina de de Registre ha d'anar l'ens**:

SELECT \*
FROM USU\_ENS\_ADHERITS
WHERE UEA\_CODI\_ENS = XXXXXXXXXX;

Ens ho dirà la columna: UEA\_CODI\_REGISTRE. En cas que el valor sigui ZCSI → Comentar internament.

  

**2 - Realitzar les configuracions a nivell de Portlet d'eNOTUM** per tal que registri contra la Oficina de Registre correcte:

Accedim a EACAT > Aplicacions > eNOTUM > Configuració i cerquem l'entitat que pateix l'error, accedim a l'entitat PARE:

![](attachments/36340660/36340696.png)

A la part de Registre > Oficina registre, informem el codi que hem extret del primer pas, i marquem com LECTURA:

![](attachments/36340660/36340697.png)

Guardem.

3- Crear una regla de MUX perque vagi contra el registre de S@RCAT.

Això no ho fem nosaltres, sinó que ho fa el Toni Llebaria, haurem de posar el nostre tiquet en Pendent d'informació i enviar un mail al Toni per tal que realitzi aquesta configuració.

**Demanem a Toni Llebaria les configuracions a nivell de MUX**

Bon dia Toni,

Des de XXXXXXX ens han obert el tiquet XXXXX perquè esten obtenint error a l'hora de notificar. Dóna error quan s'intenta fer el Registre.

Hem revisat i hem vist que es tracta d'un ens de la generalitat, i està registrant contra EACAT.

Per la nostra banda hem realitzat les configuracions necessàries a nivell de eNOTUM.

A nivell de MUX, necessitaríem que es creï una regla per tal que l'ens XXXX-INE10-XXXX registri contra S@RCAT.

Podries crear aquesta regla, si us plau?

Moltes gràcies per endavant,

Salutacions,

Una vegada Toni ens confirmi que la regla ha estat creada, el problema hauria de quedar resolt.

  

Tiquet EXEMPLE FP #327217

**El Registre de S@rcat retorna error**

Literal de l'error:
-------------------

### ERROR DURANT L'EXECUCIO DE LA FASE. Causa : cat.aoc.enotum.motor.MotorException: No s'ha pogut realitzat l'assentament pels errors:  
Principal: \[0:S'han informat dades d'origen però no s'han informat els identificadors específics de s@rcat\]

  

Revisions i solució

Solució
-------

Aquesta entitat en el MUX registra contra S@rcat, però a nivell d'organisme en la configuració de e-NOTUM falta informar l'oficina de registre i la unitat organitzativa, dos valors que necessita el registre de S@rcat per a registrar correctament.

Configuracions a realitzar perquè l'ens registri correctament contra S@rcat

**1 - Traslladar el tiquet a Xavier LLebaria i preguntar-li per aquestes dades**

**Demanem a Xavier Llebaria les dades**

Hola bon dia Xavier Llebaria,  
   
Estem tenint aquest problema "S'han informat dades d'origen però no s'han informat els identificadors específics de s@rcat" amb aquesta entitat XXXine10XXX - **XXnomentitatXX**. 

Aquesta entitat registra contra S@rcat i necessitem informar en e-NOTUM l'oficina de registre i el Id Centre S@rcat. Ens podries dir quines són? Moltes gràcies.

   
Salutacions cordials,

**2 - Realitzar les configuracions a nivell de Portlet d'eNOTUM** per tal que registri correctament contra S@rcat:

![](attachments/36340660/100009089.png)

Una vegada Xavier Llebaria ens contesti, accedim a EACAT > Aplicacions > eNOTUM > Configuració → Organismes i cerquem l'entitat que pateix l'error, accedim a l'entitat PARE:

![](attachments/36340660/100009090.png)

A la part de Registre > Oficina registre i Unitat Organitzativa, informem els codis que hem extret, i marquem com LECTURA:

![](https://aoccat.zendesk.com/attachments/token/U0L2EpNssAR4xWR1BSW4GKVAr/?name=image.png)

Guardem.

Ja li podem indicar a l'usuari que pot crear notificacions.

Tiquet EXEMPLE [ZD#173018](https://aoccat.zendesk.com/agent/tickets/173018)

**El Registre d'EACAT retorna error 2**

Literal de l'error:
-------------------

**El codi d'ens de procedencia \[XXXXXXXXXX\] no correspon a cap ens registrat al sistema.**
--------------------------------------------------------------------------------------------

  

Revisions i solució

Solució
-------

Aquest error té origen en que l'ens no està donat d'alta a EACAT.

Haurem de traslladar tiquet a l'Oficina Tècnica de EACAT per tal que el configurin.

FAQ del MUX on s'explica: [FAQ MUX](https://intranet.aoc.cat/display/SII/MUX+-+FLUX+DEL+SERVEI+-+ERRORS+-+El+codi+d%27ens+de+procedencia+%5BINE10%5D+no+correspon+a+cap+ens+registrat+al+sistema)

Exemple de FP: FP #334200

**El centre de procedència informat no és un centre propi de l'usuari**

Literal de l'error:  
**El centre de procedència informat no és un centre propi de l'usuari**
---------------------------------------------------------------------------------------------

  

Revisions + solució

Revisar si el registre s'ha fet contra SARCAT i prové de PICA:

![](attachments/36340660/41517942.png)

  

En cas que sigui així, revisar la següent FAQ: [Registres de PICA contra SARCAT que donen error](Registres-de-PICA-contra-SARCAT-que-donen-error_41517937.html)

Exemple de FP : 363234

**El centre de procedència informat no existeix, s'ha donat de baixa o no està assignat a cap oficina**

Literal de l'error:  
**El centre de procedència informat no existeix, s'ha donat de baixa o no està assignat a cap oficina**
-----------------------------------------------------------------------------------------------------------------------------

  

Revisions + solució

Revisar si el registre s'ha fet contra SARCAT i prové de PICA:

![](attachments/36340660/41523369.png)

  

En cas que sigui així, revisar la següent FAQ: [Registres de PICA contra SARCAT que donen error](Registres-de-PICA-contra-SARCAT-que-donen-error_41517937.html)

  

Exemple de FP : 427834

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2019-2-26\_16-54-34.png](attachments/36340660/36340669.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-2-26\_16-58-28.png](attachments/36340660/36340670.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-2-26\_17-3-25.png](attachments/36340660/36340671.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-8\_11-36-12.png](attachments/36340660/36340696.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-8\_11-37-48.png](attachments/36340660/36340697.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-4-20\_15-4-21.png](attachments/36340660/36340912.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-6\_11-6-32.png](attachments/36340660/41517942.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2021-5-25\_12-47-58.png](attachments/36340660/41523369.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-2\_11-23-24.png](attachments/36340660/100009089.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2024-2-2\_11-26-24.png](attachments/36340660/100009090.png) (image/png)  

Document generated by Confluence on 02 June 2025 10:53

[Atlassian](http://www.atlassian.com/)