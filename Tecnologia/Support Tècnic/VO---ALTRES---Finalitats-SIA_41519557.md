Suport Tècnic : VO - ALTRES - Finalitats SIA  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [02 - FAQ's serveis](26313393.md)
4.  [FAQ's VO](28705575.md)

Suport Tècnic : VO - ALTRES - Finalitats SIA
============================================

Created by Unknown User (oteccmorales), last modified by Cristian Morales on 08 July 2024

Adjuntem correu explicatiu de les finalitats

[![](rest/documentConversion/latest/conversion/thumbnail/41519558/1)](/download/attachments/41519557/SIRI-SIA.pdf?version=1&modificationDate=1603378886147&api=v2)

**De:** Maria Dolors Alvarez  
**Enviado el:** miércoles, 22 de julio de 2020 15:25  
**Para:** OTSuportTecnic <[OTSuportTecnic@aoc.cat](mailto:OTSuportTecnic@aoc.cat)\>  
**CC:** SuportTecnicD <[suporttecnic@aoc.cat](mailto:suporttecnic@aoc.cat)\>  
**Asunto:** Adaptació del model d'autoritzacions MINHAP basat en codis SIA.

  

Bona tarda,

  

Volia explicar-vos un tema dels serveis VO (**només de MINHAP** i **món local**):

*   Tiquets relacionats: ST-9937 // PRJ-5499

  

*   Fins ara la finalitat era per exemple **AJUTSUBV,** però a partir d’ara necessitaria un codi de 4 dígits, us ho ensenyo amb un exemple a continuació:

  

Exemples dels codis procediment del que ens trobarem :

  

2884

Ajuts adreçats a facilitar l'accés a la pràctica esportiva

2885

Ajuts a l'escolarització d'infants a les escoles bressol municipals

2886

Ajuts a al menjador d'infants a les escoles bressol municipals

2887

AJUTS A ESCOLA DE MÚSICA I CONSERVATORI

2888

Ajuts habitatges gent gran

  

                       Exemple de petició amb finalitat SIA de VIDA LABORAL a PRO:

[http://admin3.iop.aoc.cat/pci3-mti-admin/peticions/mti/solicitud/2769135794](http://admin3.iop.aoc.cat/pci3-mti-admin/peticions/mti/solicitud/2769135794)

  

**NombreProcedimiento:** 2883 - Prestacions econòmiques d’urgència social

**Finalidad/CodProcedimiento:** **8100690004\_2883**  **(INE10\_4dígitsProcediment)**

  

  

*   Nou _formulari d’alta de servei_ (encara no està publicat), però alguns ens locals els tenen perquè des del MINHAP no els volen donar les finalitats que s’han sol·licitat perquè les finalitats han de ser únics i no com abans que s’englobaven a molts procediments.
*   Això és una **fase 1** que es realitzarà amb aquests codis que encara no són els definitius (pseudo-SIA), hi haurà una segona fase que es disposarà dels codis SIA definitius.
*   Tema d’integracions d’aquests serveis de MINHAP del mon local, de moment, la finalitat és **PROVES** però a curt termini s’haurà de canviar aquest camp per a una nova finalitat SIA, ens ho dirà Gemma.
*   **Generalitat** anirà per un altre canal, encara no definit.
*   La setmana vinent (si no passa res) hi haurà al portlet del SIRI i ckeckbox per identificar que és una finalitat SIA o no. (veure imatge pdf adjunt).

  

A tenir en compte:
------------------

  

Si reben tiquets amb problemes de finalitats SIA, comentar internament amb l'equip i preparar per traslladar a cap de servei.

situació per la SIA Gene

*   Fa dos anys es va implementar la possibilitat d’informar o bé FINALITAT o bé PROCEDIMENT a les consultes. En el seu moment es van fer proves i funcionava bé.
*   Informar procediment implicava consultar WS SIA però com que donava problemes de _time out_ es va decidir consultar per BBDD de SIA (ens baixàvem uns Excels que tenen penjats ells al PAE).
*   Això es va deixar preparat. Si Generalitat volgués informar pel tag Procediment (informar el SIA d’aquell procediment) no hi hauria problema a nivell PCI i SIRI, encara que potser caldria fer algun retoc de connector per enviar la dada al Ministeri (això és fàcil)
*   El que no està solucionat és “la nostra cuina”/SIRI: hi ha un problema per donar d’alta automàticament les autoritzacions a SIRI ja que ara no hi ha sincronització amb les dades de SIA
*   És per això que els hem demanat a Generalitat que, quan estiguin en disposició, que ens vagin passant de mica en mica els procediments que ja volen informar al camp procediment i des de Suport es faria l’alta manualment
*   Aquesta tasca de desenvolupar la sincronització amb el WS de SIA no la pot assumir en aquests moments l’Oficina Tècnica ja que hi ha altres tasques prioritàries relacionades Vàlid o els lots de Via Oberta

[![](download/resources/com.atlassian.confluence.plugins.confluence-view-file-macro:view-file-macro-resources/images/placeholder-medium-file.png)RV\_ Situació consum SIA - PICA - PCI - SIRI.msg](/download/attachments/41519557/RV_%20Situaci%C3%B3%20consum%20SIA%20-%20PICA%20-%20PCI%20-%20SIRI.msg?version=1&modificationDate=1720431852543&api=v2)

  

Related articles
----------------

  

Related issues

FP:

  

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [SIRI-SIA.pdf](attachments/41519557/41519558.pdf) (application/pdf)  
![](images/icons/bullet_blue.gif) [RV\_ Situació consum SIA - PICA - PCI - SIRI.msg](attachments/41519557/113311798.msg) (application/vnd.ms-outlook)  

Document generated by Confluence on 02 June 2025 11:03

[Atlassian](http://www.atlassian.com/)