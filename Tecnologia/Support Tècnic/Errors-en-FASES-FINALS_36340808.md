Suport Tècnic : Errors en FASES FINALS  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [02 - FAQ's serveis](26313393.md)
4.  [FAQ's ENOTUM](28705561.md)
5.  [eNOTUM - FLUX DEL SERVEI - ERRORS - Errors en el cicle de vida d'una notificació (ESTATS >= 1024)](36340658.md)

Suport Tècnic : Errors en FASES FINALS
======================================

Created by Unknown User (otecjriquelme), last modified by Joan Riquelme on 31 January 2024

En aquesta FAQ s'agruparan tots els errors que ens hem trobat en les fases finals d'una notificació.

Això vol dir que són notificacions que han quedat amb ESTAT > 1027 → Han fallat després de dipositar-se.

En aquests casos, una vegada identificat i resolt l'error, si que podrem reiniciar les fases que hagin fallat, ja que la notificació ja s'ha dipositat.

**INDEX**

Índex d'errors:
---------------

*   [Error en la FASE\_EXPIRACIO (1027).](#ErrorsenFASESFINALS-expiracio)
    
*   [Error en la FASE\_GENERACIO\_PDF\_DIPOSIT (1027 o 1031)](#ErrorsenFASESFINALS-pdf).

Error en la FASE\_EXPIRACIO
===========================

**Consultes a Base de dades per determinar si hi ha error en aquesta fase i quin error hi ha**

Queries per veure en quin estat es troba la noti i l'error

**Revisem estat de la notificació**

\--Si la notificació es troba en estat 1027 --> Error en FASE EXPIRACIO
select \*
from nt30.aoc\_nt\_notificacions
where id\_notificacio = 'XXXXXXXXX';

**Revisem com està la notificació a la event motor**

\-- Si la FASE\_EXPIRACIO es troba en estat 2 i reintents 6 vol dir que ha fallat
SELECT \*
FROM NT30.AOC\_NT\_EVENT\_MOTOR a
where a.id\_notificacio = 'XXXXXXXXX';

**Revisem a la taula logs quin error ha donat**

\-- Hauríem de veure com s'ha insertat a la taula la traça de l'error en fase expiració
select \*
from nt30.aoc\_nt\_logs l
where l.id\_notificacio = 'XXXXXXXX';

**Revisions i actuacions: reinici per descartar l'error puntual**

Podem provar a reiniciar la fase per descartar que hagi estat un error puntual al WL12:

**Cerquem la notificació a la MOTOR**

SELECT \*
FROM NT30.AOC\_NT\_EVENT\_MOTOR a
where a.id\_notificacio = 'XXXXXXXXX';

**Reiniciem la fase expiració**

update nt30.aoc\_nt\_event\_motor mm
set mm.estat=0,
mm.reintent=3
where mm.id\_notificacio=XXXXXXXX
and mm.fase='FASE\_EXPIRACIO';

Si tornem a fer la mateixa SELECT hauriem de veure com de seguida la motor torna a reintentar la fase expiració.

O bé puja en 1 el reintent, i per tant ha tornat a fallar → No era un error puntual

O bé es completa la fase i despareix de la taula: nt30.aoc\_nt\_event\_motor → Es tractava d'un error puntual.

En cas que es solucioni, i per tant hagi estat per un error puntual, hauríem de revisar si hi ha més notificacions amb aquest problema.

**Cerquem notificacions en estat d'error en EXPIRACIO**

select \* from nt30.AOC\_NT\_NOTIFICACIONS NN
WHERE NN.ESTAT = '1027'
AND NN.DATA\_REGISTRE >= TO\_DATE ('15/03/2018','dd/mm/yyyy'); -- Informar la data des de quan creiem que falla, si no sortiran notificacions molt antigues.

En cas que en veiem moltes, les intentem reiniciar amb un UPDATE massiu:

SELECT \* FROM NT30.AOC\_NT\_EVENT\_MOTOR MM
WHERE MM.FASE = 'FASE\_EXPIRACIO'
and MM.ID\_NOTIFICACIO IN (select NN.ID\_NOTIFICACIO from nt30.AOC\_NT\_NOTIFICACIONS NN
WHERE NN.ESTAT = '1027'
AND NN.DATA\_REGISTRE >= TO\_DATE ('15/03/2018','dd/mm/yyyy')); -- Informar la data en que comencen els errors

FP exemple: 209130 

  

Error en la FASE\_GENERACIO\_PDF\_DIPOSIT
=========================================

Si aquest error ha passat mentre la notificació es trobava en estat 3, la notificació quedarà en estat **1027.**

Si la notificació ha sigut visualitzada durant la creació del PDF, llavors la notificació passa a estat 7 i quan dóna l'error queda en estat **1031.**

La resolució pels dos casos és diferent, no obstant, en els dos casos hem de veure com la FASE\_GENERACIO\_PDF ha quedat en error en la taula aoc\_nt\_event\_motor:

**Comprovem que es tracta d'error en la fase generacio pdf**

\-- Hauríem de veure la FASE\_GENERACIO\_PDF\_DIPOSIT en estat 2 i reintents 6
select \*
from nt30.aoc\_nt\_event\_motor mm
and id\_notificacio = '';

En cas que aquesta fase estigui en error, la resolució serà diferent, en funció de l'estat de la notificació en la taula aoc\_nt\_notificacions, comprovem l'estat si no ho hem fet ja:

**comprovem estat de la notificació** Expand source

select \*
from nt30.aoc\_nt\_notificacions
where id\_notificacio = 5271966;

I en funció de l'estat apliquem un procediment o un altre:

ERROR 1027 i error en la FASE\_GENERACIO\_PDF\_DIPOSIT

Problema **1027** 

En el moment que la notificació s'ha dipositat, es genera una fase que crea el PDF d'evidència de dipòsit. Si aquesta fase completa la política de reintents passarà a estat 2 en la event motor i posteriorment la notificació quedarà en estat d'error (1027). 

Solució
-------

Re-processarem la generació del PDF: 

\-- Hem de passar la notificació a estat 3 (Dipositada):


update nt30.aoc\_nt\_notificacions
set estat = 3
where id\_notificacio = 5271966;


-- Hem de reprocesar per la event motor:


update nt30.aoc\_nt\_event\_motor mm
set estat = 0, reintent = 0
where mm.fase = 'FASE\_GENERACIO\_PDF\_DIPOSIT'
and id\_notificacio = '';

  

En principi després d'aquests passos la generació ha d'efectuar-se correctament i la notificació seguir el seu cicle. 

Revisem que s'ha  generat bé pels logs i que la fase FASE\_GENERACIO\_PDF\_DIPOSIT de la event motor quedi eliminada: 

\-- Mirem que la fase hagi finalitzat en èxit: 
select \*
  from nt30.aoc\_nt\_logs c
 where c.id\_notificacio in ('');



select \*
from nt30.aoc\_nt\_event\_motor mm
where mm.fase = 'FASE\_GENERACIO\_PDF\_DIPOSIT'
and id\_notificacio = '';

ERROR 1031 i error en la FASE\_GENERACIO\_PDF\_DIPOSIT

Problema **1031**
-----------------

En el moment que la notificació s'ha dipositat **i abans que es generi el PDF s'ha visualitzat la notificació ( estat 7)**, si aquesta fase completa la política de reintents passarà a estat 2 en la event motor i posteriorment la notificació quedarà en estat d'error (1031). 

Solució
-------

Re-processarem la generació del PDF: 

\-- Hem de passar la notificació a estat 3 (Dipositada):
update nt30.aoc\_nt\_notificacions
set estat = 3
where id\_notificacio = 5271966;


-- Hem de reprocesar per la event motor:
update nt30.aoc\_nt\_event\_motor mm
set estat = 0, reintent = 0
where mm.fase = 'FASE\_GENERACIO\_PDF\_DIPOSIT'
and id\_notificacio = '';


--Hem de tornar a posar la noti a estat visualitzada: 
update nt30.aoc\_nt\_notificacions
set estat = 7
where id\_notificacio = 5271966;

  

En principi després d'aquests passos la generació ha d'efectuar-se correctament i la notificació seguir el seu cicle. 

Revisem que s'ha  generat bé pels logs i que la fase FASE\_GENERACIO\_PDF\_DIPOSIT de la event motor quedi eliminada: 

\-- Mirem que la fase hagi finalitzat en èxit: 
select \*
  from nt30.aoc\_nt\_logs c
 where c.id\_notificacio in ('');



select \*
from nt30.aoc\_nt\_event\_motor mm
where mm.fase = 'FASE\_GENERACIO\_PDF\_DIPOSIT'
and id\_notificacio = '';

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

Document generated by Confluence on 02 June 2025 10:53

[Atlassian](http://www.atlassian.com/)