Suport Tècnic : e-TRAM - IIS - Desplegament  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [04 - Tècnica de sistemes + 24x7 + Padró](26313202.html)
4.  [Plataformes](Plataformes_41520520.html)
5.  [z\_OLD\_](z_OLD__118554696.html)
6.  [e-TRAM - IIS (Obsolet)](41520747.html)

Suport Tècnic : e-TRAM - IIS - Desplegament
===========================================

Created by Unknown User (otecobernal), last modified by Unknown User (otecjriquelme) on 13 July 2022

**Elements necessaris:**

*   Paquet en zip amb el contingut dels fitxers a desplegar amb tota la seva estructura de carpetes.
*   Fitxer jar que genera l'script a executar per fer el backup dels fitxers i el possible rollback. El podem trobar a la ruta de Teams: Documentos >> General >> 01 - Gestión Operativa >> 02 Eines i Utilitats >> 10 Eines Suport >> Desplegaments eTRAM >> desplegamentTram.jar
*   Nota tècnica on s'indiquen les accions a realitzar (scripts de BBDD, fitxers afectats, altres tasques associades al desplegament, etc).

  

**Tasques prèvies al desplegament:**

1.  **Realització del backup.**
    1.  Recomanacions:
        1.  Copiar la carpeta del desplegament a local per poder executar el fitxer .jar sense problemes.
    2.  Executem el **JAR** i seguim les indicacions que apareixen (El **JAR** s'ha d'executar sempre des de local): java _\-jar desplegamentTram.jar_  
        
        C:\\Users\\rjuradog\\Documents\\Documentos\\09 Despliegues\\wars\\PRE-DES-1626@eTram\\v1113>java -jar desplegamentTram.jar --> Nom del JAR
        Indica la ruta on es troben els fitxers a desplegar
        C:\\Users\\rjuradog\\Documents\\Documentos\\09 Despliegues\\wars\\PRE-DES-1626@eTram\\v1113\\ABSISNET  --> Exemple si la carpeta està en local: Aquesta ruta ha de ser fins a "ABSINET"
        \\\\192.168.166.33\\Desplegaments\\2019\\04 - Abril\\11042019\\PRE-DES-1626@eTram\\v1113\\ABSISNET  --> Exemple si la carpeta està en xarxa: Aquesta ruta ha de ser fins a "ABSINET" (Pot donar error si hi ha carpetes amb caracters extranys.)
        \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
        Indica el path complet de la ruta i nom del fitxer .bat que es generarà per fer el backup
        Presiona intro si vols utilitzar el de defecte
        C:\\Users\\rjuradog\\Documents\\Documentos\\09 Despliegues\\wars\\PRE-DES-1626@eTram\\v1113\\backup\_v1113.bat
        El fitxer es guardarà a: C:\\Users\\rjuradog\\Documents\\Documentos\\09 Despliegues\\wars\\PRE-DES-1626@eTram\\v1113\\backup\_v1113.bat --> Exemple si la carpeta està en local.
        \\\\192.168.166.33\\Desplegaments\\2019\\04 - Abril\\11042019\\PRE-DES-1626@eTram\\v1113\\backup\_v1113.bat  --> Exemple si la carpeta està en xarxa.
        \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
        Indica el path complet de la ruta i nom del fitxer .bat que es generarà per fer el rollback
        Presiona intro si vols utilitzar el de defecte
        C:\\Users\\rjuradog\\Documents\\Documentos\\09 Despliegues\\wars\\PRE-DES-1626@eTram\\v1113\\rollback\_v1113.bat
        El fitxer de rollback es guardarà a: C:\\Users\\rjuradog\\Documents\\Documentos\\09 Despliegues\\wars\\PRE-DES-1626@eTram\\v1113\\rollback\_v1113.bat --> Exemple si la carpeta està en local.
        \\\\192.168.166.33\\Desplegaments\\2019\\04 - Abril\\11042019\\PRE-DES-1626@eTram\\v1113\\rollback\_v1113.bat  --> Exemple si la carpeta està en xarxa.
        \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
        Indica la ruta on es vol crear el backup en la màquina del tram
        Presiona intro si vols utilitzar el de defecte
        C:\\eTram\\backup\_v1113 --> Aquesta ruta es de la màquina d'ETRAM, nomès canvia el nom de la carpeta depenent de la versió.
        \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
        Ja s'ha generat l'script de copia de seguretat: C:\\Users\\rjuradog\\Documents\\Documentos\\09 Despliegues\\wars\\PRE-DES-1626@eTram\\v1113\\backup\_v1113.bat  --> Indica on s'ha generat el backup.
        Ja s'ha generat l'script de rollback: C:\\Users\\rjuradog\\Documents\\Documentos\\09 Despliegues\\wars\\PRE-DES-1626@eTram\\v1113\\rollback\_v1113.bat --> Indica on s'ha generat el rollback.
        
        C:\\Users\\rjuradog\\Documents\\Documentos\\09 Despliegues\\wars\\PRE-DES-1626@eTram\\v1113>
        
2.  Agafem el fitxer generat de backup, anem al servidor de l'ETRAM i el copiem a la Z per poder executar-ho. S'ha de validar que ho estem executant correctament des d'aquesta unitat.  
    ![](attachments/41520749/41522305.png)
    
    1.  Això generarà un backup.
3.  Aturem els IIS de les dues màquines (Obrim CMD as administrator)
    1.  A PRE podem aturar els dos nodes a la vegada
        
        net stop w3svc
        
    2.  Copiem els fitxers, podem copiar la carpeta EAD que ens deixen a la carpeta de desplegaments sense cap problema.  
        ![](attachments/41520749/41522306.png)  
        1.  Al fer-ho no reemplaçarem la carpeta, ens preguntarà si volem fer un merge (Només reemplaçarem les carpetes i fitxers amb el mateix nom).
        2.  Esborrem el contingut de les següents carpetes.
            
            C:\\Windows\\Microsoft.NET\\Framework\\v2.0.50727\\Temporary ASP.NET Files
            C:\\Windows\\Microsoft.NET\\Framework64\\v2.0.50727\\Temporary ASP.NET Files
            
4.  Per finalitzar aixequem l'IIS.
    
    net start w3svc
    
5.  Validacions internes.
    
    Hi han dues maneres diferents de realitzar les validacions:
    
    *   A nivell de fitxers → Revisar que tots els fitxers i carpetes s'han modificat correctament
    *   Validació JIRA → Realitzar validació que indiquen al JIRA →  Normalment s'encarrega l'OT

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2019-4-11\_13-40-42.png](attachments/41520749/41522305.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-4-11\_13-55-23.png](attachments/41520749/41522306.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:17

[Atlassian](http://www.atlassian.com/)