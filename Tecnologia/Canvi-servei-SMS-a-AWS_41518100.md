Suport Tècnic : Canvi servei SMS a AWS  

1.  [Suport Tècnic](index.html)
2.  [Suport Tècnic](13893782.html)
3.  [04 - Tècnica de sistemes + 24x7 + Padró](26313202.html)
4.  [FAQs Infraestructura](FAQs-Infraestructura_26313593.html)
5.  [Sistemes de contingència](41518098.html)

Suport Tècnic : Canvi servei SMS a AWS
======================================

Created by Unknown User (otecagonzalez), last modified by OTEC ST JAlejandro Cardete Postigo on 18 June 2021

Detallem el procediment per fer el canvi de proveidor de SMS. 

1- Accés plataforma AWS

*   Accedim a la plataforma a través de la URL: [https://consorciaoc.signin.aws.amazon.com/console](https://consorciaoc.signin.aws.amazon.com/console)
*   Iniciem sessió amb correu de l'usuari root: 

![](attachments/41518100/41518101.png)

*   Les credencials les trobem al keepass: 

![](attachments/41518100/41523666.jpg)

2- Activar Servei de SMS

*   Un cop hem iniciat sessió anem a "Credencials de seguretat":

![](attachments/41518100/41518104.png)

*   Ens trobarem a una pàquina amb varis desplegables i obrim el desplegable de "Claus d'accés":

![](attachments/41518100/41523667.png)

*   Activem el servei "SNS" fent clic a "Make Active":

![](attachments/41518100/41523668.png)

3- Configurar enturament

Important!

Aquestes configuracions s'han de fer pels 2 clusters NT - APP. 

NT → [http://10.120.4.18/pci3-mti-admin/endpoints](http://10.120.4.18/pci3-mti-admin/endpoints)

APP → [http://10.120.4.58/pci3-mti-admin/endpoints](http://10.120.4.58/pci3-mti-admin/endpoints)

*   Accedim a l'Admin PCI > Configuració enrutador: 

![](attachments/41518100/41518107.png)

  

*   En el selector posem la descripció "ENVIAR\_SMS" i cerquem: 

![](attachments/41518100/41518108.png)

  

*   Editem el registre que ens surt (Accions > clic al llapis)

![](attachments/41518100/41518110.png)

  

*   Afegim al final de l'enllaç: **?AWS**
*   I acceptem: 

![](attachments/41518100/41518109.png)

  

Important!

Aquestes configuracions s'han de fer pels 3 clusters NT - APP - IOP. 

NT → [http://10.120.4.18/pci3-mti-admin/endpoints](http://10.120.4.18/pci3-mti-admin/endpoints)

IOP → [http://10.120.4.57/pci3-mti-admin/endpoints](http://10.120.4.57/pci3-mti-admin/endpoints)

APP → [http://10.120.4.58/pci3-mti-admin/endpoints](http://10.120.4.58/pci3-mti-admin/endpoints)

Quan es vulgui desactivar aquest servei, haurem d'invertir les pases aplicades anteriorment.

4- Desactivar servei SMS AWS

*   Modifiquem l'enrutament i tornem a deixar l'enllaç com estava (passos d'acces a les configuracions en el punt 3): [http://admin3.app.aoc.cat/CAOC-PCI30-MSC-SMS/ServeisComuns](http://admin3.app.aoc.cat/CAOC-PCI30-MSC-SMS/ServeisComuns)

![](attachments/41518100/41518112.png)

Important!

Aquestes configuracions s'han de fer pels 2 clusters NT - APP. 

NT → [http://10.120.4.18/pci3-mti-admin/endpoints](http://10.120.4.18/pci3-mti-admin/endpoints)

APP → [http://10.120.4.58/pci3-mti-admin/endpoints](http://10.120.4.58/pci3-mti-admin/endpoints)

*   Desactivar el servei per la plataforma AWS (passos d'accés en el punt 1 i 2)
*   Aquest cop hem de desactivar el servei i veure'l com inactiu: ![](attachments/41518100/41523669.png)

Podríem revisar si el servei està operatiu mirant les estadístiques d'entrega: 

5- Revisió estadística d'entrega

*   Ens dirigiem a la plana principal de la plataforma AWS i cerquem "SNS":

![](attachments/41518100/41518115.png)

*   Fem clic a "missatgeria de text":

![](attachments/41518100/41518116.png)

  

*   En la plana següent podrem veure les estadístiques d'entrega: 

![](attachments/41518100/41518117.png)

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2020-7-16\_14-49-24.png](attachments/41518100/41518101.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-16\_14-50-50.png](attachments/41518100/41518102.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-16\_14-53-26.png](attachments/41518100/41518103.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-16\_14-53-44.png](attachments/41518100/41518104.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-16\_14-56-2.png](attachments/41518100/41518105.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-16\_14-58-1.png](attachments/41518100/41518106.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-16\_15-5-12.png](attachments/41518100/41518107.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-16\_15-6-18.png](attachments/41518100/41518108.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-16\_15-9-19.png](attachments/41518100/41518109.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-16\_15-9-49.png](attachments/41518100/41518110.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-16\_15-13-26.png](attachments/41518100/41518112.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-16\_15-17-11.png](attachments/41518100/41518113.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-16\_15-20-53.png](attachments/41518100/41518115.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-16\_15-21-30.png](attachments/41518100/41518116.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2020-7-16\_15-22-26.png](attachments/41518100/41518117.png) (image/png)  
![](images/icons/bullet_blue.gif) [Keypass.jpg](attachments/41518100/41523666.jpg) (image/jpeg)  
![](images/icons/bullet_blue.gif) [clave acceso.png](attachments/41518100/41523667.png) (image/png)  
![](images/icons/bullet_blue.gif) [clave acceso 2.png](attachments/41518100/41523668.png) (image/png)  
![](images/icons/bullet_blue.gif) [clave acceso 3.png](attachments/41518100/41523669.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:18

[Atlassian](http://www.atlassian.com/)