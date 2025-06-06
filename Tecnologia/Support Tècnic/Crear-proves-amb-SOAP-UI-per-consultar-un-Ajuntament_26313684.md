Suport Tècnic : Crear proves amb SOAP UI per consultar un Ajuntament  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [04 - Tècnica de sistemes + 24x7 + Padró](26313202.md)
4.  [Revisió de serveis](36340340.md)
5.  [PADRO - Revisions i Restabliment](PADRO---Revisions-i-Restabliment_118554712.md)
6.  [Padró - Instal·lació i manteniment](26313622.md)
7.  [PADRO - Comprovar l'estat del servei d'un Ajuntament OFFSITE](26313570.md)

Suport Tècnic : Crear proves amb SOAP UI per consultar un Ajuntament
====================================================================

Created by Unknown User (agonlara), last modified by OTEC ST JAlejandro Cardete Postigo on 12 December 2022

  

Aquesta documentació explica com fer test de petició del servei PADRO contra un ajuntament.

La petició fa una consulta a un Ajuntament i ens retorna com a resultat les dades del ciutadà que hem indicat a la petició:   

      **Petició:                                                                                                                                                            Resposta:**

**![](attachments/26313684/26316611.png?effects=drop-shadow)![](attachments/26313684/26316618.png?effects=drop-shadow)**

  

  

**Eines per realitzar el test**
===============================

1.  Màquina remota de l'AOC
2.  SoapUi
3.  Projecte PADRO       →    (Sharepoint) Tecnologia - SUPORT\_TECNIC\\SERVEIS\\VO - PADRO\\02 Producció\\Padró\\Everis\\soapUi
4.  Petició de l'ajuntament → (Sharepoint) Tecnologia - SUPORT\_TECNIC\\SERVEIS\\VO - PADRO\\02 Producció\\Padró\\Dades
5.  Winscp
6.  Host aoc-l-back01    →    Les credencials les trobarem al keepass (CAOC\_OT.kdbx)

  

**Passos a Seguir**
===================

  

1- Connexió màquina de l'AOC
----------------------------

Per realitzar les proves ens hem de connectar a la màquina de l'AOC amb el nostre usuari d'accés personal. Es fa des d'aquesta màquina perquè la IP està autoritzada a fer la petició contra els Ajuntaments. 

  

2- Configuració SoapUI ![](attachments/26313684/26316608.png)
-------------------------------------------------------------

Obrim el SoapUi per recrear la petició. Per poder fer-la importarem el projecte PADRO ja generat per poder fer aquestes peticions.

El projecte el trobarem a: **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SERVEIS\\VO - PADRO\\02 Producció\\Padró\\Everis\\soapUi**

  

2.1- Copiem el projecte a la màquina de l'AOC

2.2- Des de el SoapUi: File > Import Project > Importem el projecte Padro-soapui-project.xml

2.3- Obrim el projecte, i només necessitarem el "soap" DIBA, en aquesta captura següent és _Test\_Contra\_Ajuntament, els altres si volem, els podem eliminar._ 

![](attachments/26313684/26316657.png)

2.4- **Validem que tinguem el certificat ben configurat.** Botó dret sobre el Projecte > Show Project View > WS-Security Configurations. 

  

![](attachments/26313684/26316664.png?effects=drop-shadow)

  

2.5- Validem que en llençar la petició se signi amb el certificat configurat. Obrim el "soap" > fem clic al cadenat > Outgoing WSS > Escollim localhost

![](attachments/26313684/26316649.png?effects=drop-shadow)

  

3- Recreem petició
------------------

Un cop tenim el projecte importat i configurat ja podem recrear la petició i llançar-la. 

Hem de tindre en compte que cada petició serà diferent per cada ajuntament, així haurem de cercar la petició de l'ajuntament que vulguem recrear. 

3.1- Per obtenir la petició anem al directori: **(Sharepoint) Tecnologia - SUPORT\_TECNIC\\SERVEIS\\VO - PADRO\\02 Producció\\Padró\\Dades ens,** obrim el fitxer Excel de l'ajuntament que volem llançar i a la "Hoja" petició tenim la petició que hem d'enganxar al projecte "soap". 

![](attachments/26313684/26317026.png?effects=drop-shadow)                                         ![](attachments/26313684/26317028.png?effects=drop-shadow)

  

  

4- Cercar endpoint
------------------

Per cada ajuntament apuntarem a un endpoint diferent així que necessitarem una ip i port per indicar a on es farà aquesta petició.

4.1- Obrim winscp > ens conectem a la màquina aoc-l-back01 > Obrim terminal amb putty

4.2-  Comanda 1 :  cd /etc/httpd/conf.d/sites

![](attachments/26313684/26317020.png?effects=drop-shadow)

  

4.3- Comanda 2 :  cat proxyajuntaments.aoc.cat.conf | grep -i **_[nom del ajuntament a buscar](#)_** 

4.4 Localitzem l'ajuntament on llençarem la petició i copiarem la **IP i port.**

**![](attachments/26313684/26317001.png?effects=drop-shadow)  
**

4.5- Amb l'IP i Port que hem copiat l'enganxarem a la barra de navegació del projecte "soap":

![](attachments/26313684/26317004.png?effects=drop-shadow)  

  

  

5- Llançar petició
------------------

Amb tots els passos anteriors realitzats ja estarà tot correcte per llançar la petició, només haurem de donar al botó "play":

![](attachments/26313684/26317005.png?effects=drop-shadow)

  

![](attachments/26313684/26317006.png?effects=drop-shadow)

  

  

  

  

  

Related articles
----------------

  

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2018-9-27\_11-37-54.png](attachments/26313684/26316611.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-9-27\_11-42-44.png](attachments/26313684/26316618.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-9-27\_11-54-6.png](attachments/26313684/26316608.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-9-27\_12-1-5.png](attachments/26313684/26316657.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-9-27\_12-9-47.png](attachments/26313684/26316664.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-9-27\_12-29-42.png](attachments/26313684/26316649.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-9-27\_12-40-52.png](attachments/26313684/26317026.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-9-27\_12-42-7.png](attachments/26313684/26317028.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-9-27\_12-52-32.png](attachments/26313684/26317020.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-9-27\_12-58-12.png](attachments/26313684/26317001.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-9-27\_13-1-7.png](attachments/26313684/26317004.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-9-27\_13-3-16.png](attachments/26313684/26317005.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2018-9-27\_13-4-8.png](attachments/26313684/26317006.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:12

[Atlassian](http://www.atlassian.com/)