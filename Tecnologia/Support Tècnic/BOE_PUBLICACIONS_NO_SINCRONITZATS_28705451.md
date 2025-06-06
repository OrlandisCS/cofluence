Suport Tècnic : BOE\_PUBLICACIONS\_NO\_SINCRONITZATS  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [03 - Monitorització - Revisions globals](26313327.md)
4.  [03 - Monitorització - OLD](128647245.md)
5.  [Sondes S.T.](Sondes-S.T._30869120.md)
6.  [Sondes ST - ALTRES](Sondes-ST---ALTRES_28705445.md)

Suport Tècnic : BOE\_PUBLICACIONS\_NO\_SINCRONITZATS
====================================================

Created by Unknown User (otecobernal), last modified on 16 October 2019

**Query:**

SELECT count(BOE\_ID) FROM PL\_ETAULER\_V3.teu\_publicacio WHERE SYSDATE > (DATA\_INICI\_EXPOSICIO+8) AND ESTAT in('0','3') and eadop=0 ;

**Descripció:** 

**Pendent de realitzar:**

  

**Actuació:** 

Data publicació no informada

Passos a seguir per solucionar aquesta sonda:

  

1.  Obtenir els ids (BOE\_ID) amb problemes:  
      
    
    SELECT \*
    FROM teu\_publicacio 
    WHERE SYSDATE > (DATA\_INICI\_EXPOSICIO+1) AND
    ESTAT in('0','3') and eadop=0;
    
2.  Accedim a SITE (amb certificat)  
      
    
    [https://www.boe.es/tablon\_edictal\_unico/administraciones\_publicas/site.php](https://www.boe.es/tablon_edictal_unico/administraciones_publicas/site.php)  
      
    ![](attachments/28705451/28705473.png)
    
3.  Anem a la opció Gestion d'anuncios de notificación -> Consulta  
    ![](attachments/28705451/28705474.png)
    
4.  Indiquem les dades de Identificador de envio. És el camp BOE\_ID de la taula teu\_publicacio  
    ![](attachments/28705451/28705475.png)
5.  Si disposa de “Fecha de publicación” amb data d’avui, podem fer una actualització del registre per tal que el gestor de tasques ho torni a passar
    
    update teu\_publicacio set data\_actualitzacio=sysdate-1 where id=XXX
    
    o per fer-ho tots els ids d'una passada:  
      
    
    update teu\_publicacio set data\_actualitzacio=sysdate-1 where id in (SELECT idFROM teu\_publicacio WHERE SYSDATE > (DATA\_INICI\_EXPOSICIO+1) AND ESTAT in('0','3') and eadop=0);
    
6.  Si no té informada la “Fecha de publicación” no es tracta de cap errada, és bàsicament que el BOE no l’ha publicat encara en la data que havia dit.

Estat BOE "Devuelto", nostres BBDD estat diferent a 4(retornada)

Passos a seguir per solucionar cas de desincronització en el cas que el **edicte per part del boe estigui "devuelto" en la nostra BBDD estat diferent a 4(retornat)**:

1.  **Obtenir els ids (BOE\_ID) amb problemes:**

SELECT \*
FROM teu\_publicacio 
WHERE SYSDATE > (DATA\_INICI\_EXPOSICIO+1) AND
ESTAT in('0','3') and eadop=0;

  

**2\. Accedim a SITE (amb certificat)**

[https://www.boe.es/tablon\_edictal\_unico/administraciones\_publicas/site.php](https://www.boe.es/tablon_edictal_unico/administraciones_publicas/site.php)  
  
![](attachments/28705451/28705473.png)

  

**3\. a la opció Gestion de anuncios de notificación -> Consulta**

  
![](attachments/28705451/28705474.png)

  

**4\. Indiquem les dades de Identificador de envio. És el camp BOE\_ID de la taula teu\_publicacio**  
![](attachments/28705451/28705476.png)

  

**5- No disposarà de “Fecha de publicación” informada ja que l'edicte estara retornat i no es publicarà.**

  

_**Aquest cas es produïa perquè en la resposta del BOE a l'hora de retornar l'edicte hi havien caràcters estranys i en el siri donava error. Per part del dpt. de projectes(tractat al tiquet: [https://contacte.aoc.cat/browse/PRJ-2874](https://contacte.aoc.cat/browse/PRJ-2874)) s'ha realitzat un "parche" on filtra aquests caràcters. De totes maneres es possible que ens hi tornem a trobar amb altres caràcters estranys encara no tractats en el "parche".**_

  

**6- Identificar la petició a la MTI, per detectar possibles caràcters estranys:**

*   *   **[http://10.120.4.58/pci3-mti-admin/peticions/mti](http://10.120.4.58/pci3-mti-admin/peticions/mti) ← Accedir-ho**
    *   Executar la query següent per obtenir la data\_actualització:

SELECT \*
FROM teu\_publicacio 
WHERE SYSDATE > (DATA\_INICI\_EXPOSICIO+1) AND
ESTAT in('0','3') and eadop=0;

  

*   *   Filtar a la MTI per: Producte "BOE" i la data i hora del camp data\_actualització anterior. **L'organisme per filtrar serà el consorci del AOC (9821920002), ja que hem d'accedir a la sol·licitud per veure el organisme original.**  
        Ja que aquesta data i hora es quan es registra en la mti l'intent de sincronització.  
        El patró del id de petició d'aquestes peticions és: xxxx**con**xxxx  
          
        
    *   Accedir a la sol·licitud de la petició per identificar en l'element "<boe:idEnviamentBoe\>" que és l'edicte que busquem.  
          
        
    *   Accedir a la resposta, per validar en els elements descripció i observació de la resposta hi han caràcters estranys:  
        ![](attachments/28705451/28705477.png)
    *   Per validar cal entrar a veure el codi font. Botó dret > Ver código fuente:  
        ![](attachments/28705451/28705478.png)  
          
        
    *   Un cop identificats el caràcter estrany, entenem que si no es sincronitza és perquè el "parche" que van realitzar en el tiquet: [https://contacte.aoc.cat/browse/PRJ-2874](https://contacte.aoc.cat/browse/PRJ-2874) no tracta el caràcter i tindran de modificar-ho. Obrirem un altre tiquet fent referència al antic i demanem si poden modificar-ho  
          
        
    *   Un cop modificar el "parche" haurem de forçar la sincronització.  
          
        

**7- Forçar la sincronització:**

La sincronització es realitza de dos maneres:

*   *   Cada cop que l'usuari entra a consultar el detall → _Acció que es necessita certificat per realitzar-ho des de EACAT, és anar al BOE per EACAT entrar al edicte afectat. Necessitariem que David Tejada ens donés accés per fer-ho._

*   *   Automàticament Via el gestor de tasques a la matinada → El gestor de tasques revisa la data\_actualització si ens inferior a 24H. torna a actualitzar i força la sincronització.
        *   Accedir al gestor de tasques: [EACAT - EINES DEL SERVEI - Accedir al Gestor de Tasques d'EACAT](26313258.md)
            *   El procés del BOE en el gestor de tasques es realitza cada cinc minuts:  
                ![](attachments/28705451/28705479.png)
        *   Per fer que el gestor de tasques agafi els edictes, baixem un dia la data\_actulaitzacio del edicte:
            
            \--IMPORTANT! Fer un backUp del registre que modificarem.
            --Posem la data del edicte menys un dia.
            update PL\_ETAULER\_V3.teu\_publicacio
            set data\_actualitzacio =  to\_date('11-03-2019 00:00:52', 'dd-mm-yyyy hh24:mi:ss')
            where boe\_id in ('E12019021400113651');
            
        *   Esperem el temps que el procés del gestor de tasques torni a executar-se i revisem que l'edicte s'hagi sincronitzat.
            
            select \*
            from PL\_ETAULER\_V3.teu\_publicacio ee
            where ee.boe\_id in ('E12019021400113651');
            

  

**logs:** 

*   **Servidor:**
*   **Ruta:**
*   **Nom:**  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2019-2-18\_15-40-43.png](attachments/28705451/28705473.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-2-18\_15-41-33.png](attachments/28705451/28705474.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-2-18\_15-41-56.png](attachments/28705451/28705475.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-3-12\_13-22-29.png](attachments/28705451/28705476.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-3-12\_13-38-58.png](attachments/28705451/28705477.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-3-12\_13-40-7.png](attachments/28705451/28705478.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-3-12\_13-55-36.png](attachments/28705451/28705479.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:11

[Atlassian](http://www.atlassian.com/)