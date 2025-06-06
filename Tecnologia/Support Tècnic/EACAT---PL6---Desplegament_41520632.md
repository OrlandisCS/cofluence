Suport Tècnic : EACAT - PL6 - Desplegament  

1.  [Suport Tècnic](index.md)
2.  [Suport Tècnic](13893782.md)
3.  [04 - Tècnica de sistemes + 24x7 + Padró](26313202.md)
4.  [Plataformes](Plataformes_41520520.md)
5.  [EACAT - PL6](EACAT---PL6_41520630.md)

Suport Tècnic : EACAT - PL6 - Desplegament
==========================================

Created by Unknown User (otecobernal), last modified by David Tejada Admin on 10 June 2021

1\. Backup
----------

Els paquets a desplegar els trobarem a la ruta: **_\\\\192.168.166.33\\Desplegaments\\2020\\Pendents_**. Agafem els paquets que toca desplegar i els copiem en la ruta: **_\\\\192.168.166.33\\Desplegaments\\2020\\mes\\dia_**

Tant la carpeta del mes, com la carpeta del dia poden variar. Normalment l'haurem de crear nosaltres.

Un cop copiat hem de realitzar el _backup_.

Ens dirigim a la màquina del **PL6** a la ruta: _**/home/tomcat6**_

Trobarem tres carpetes a destacar:

*   **wars** → Estan tots els wars que hi ha actualment desplegats a la màquina. Aquí trobarem el _backup_ del war que toqui desplegar.
    
*   **jars** → Estan tots els jars que hi ha actualment desplegats a la màquina. Aquí trobarem el _backup_ del jar que toqui desplegar.
    

![](attachments/41520632/41522290.png)
======================================

*   **script** → Aquí trobarem el fitxer que executarem per realitzar el desplegament, _desplegar.sh_.

![](attachments/41520632/41522291.png)

  

Es possible que també es demani modificar/eliminar/editar qualsevol altre fitxer de la màquina amb el desplegament.

En aquest cas, també s'haurà de fer _backup_ dels fitxers que toqui. Normalment s'indica a la nota tècnica que adjunten al JIRA.

  

2\. Copiar paquet i desplegar
-----------------------------

Una vegada fet el _backup,_ haurem de copiar el paquet a la màquina. Depenent del tipus del fitxer, anirem a la carpeta wars(**/home/tomcat6/wars**) o a la carpeta jars (**/home/tomcat6/jars**).

Un cop copiat tots els paquets:

Obrirem un terminal per executar l'Script _desplegar.sh_:

cd /home/tomcat6/script
./desplegar.sh

L'script **atura** el tomcat i **elimina** els fitxers temporals **work** i **temp**, tot seguit apareix un menú amb els diferents paquets a desplegar.

Hem d'escriure el número que calgui i prémer enter, d'aquesta manera haurem esborrat el que hi ha desplegat i copiat el que hem posat nosaltres.

Si s’indica un que no toca, no passaria res, ja que es desplegaria l'últim paquet pujat.

Si hi ha, revisar nota tècnica, moltes vegades cal realitzar modificacions d'altres fitxers i la màquina ha d'estar apagada.  

Si no hi ha cap nota tècnica o comentari al JIRA → Ignorar aquest avís.

Per últim premem el "0" per reiniciar el tomcat.

Si dóna la casualitat que tenim més d'un paquet a desplegar, podem prémer tots els números necessaris abans de prémer el 0, **sempre d'un en un**.

Una vegada hem premut el 0 s'executarà la comanda d'iniciar el tomcat i mostrar els logs del catalina.

Quan veiem missatges del següent tipus vol dir que entren peticions i per tant està aixecat:

15:24:08,825 WARN  \[ajp-bio-8009-exec-24\]\[code\_jsp:130\] {code="404", msg="/html/common/themes/logos\_eacat2/826280001.JPG", uri=/html/common/themes/logos\_eacat2/82628000

Si veiem aquest error, significa que el Portlet s'ha aixecat correctament i podem donar el desplegament per acabat:

error: org.jdom.input.JDOMParseException: Error on line 1: Content is not allowed in prolog.
error: org.jdom.input.JDOMParseException: Error on line 1: Content is not allowed in prolog

  

A més, per validar que els tomcats estan aixecats podem fer servir les següents URLs (**PRO**):

*   Node 1: [http://10.120.1.229:8080/web/guest/sondapl](http://10.120.1.229:8080/web/guest/sondapl)
*   Node 2: [http://10.120.1.230:8080/web/guest/sondapl](http://10.120.1.230:8080/web/guest/sondapl)

En cas d'estar el node operatiu veurem una plana com la següent:

![](attachments/41520632/41522292.png)

3\. Validacions internes.
-------------------------

Hi han dues maneres diferents de realitzar les validacions:

*   A nivell de fitxers → Revisar que tots els fitxers i carpetes s'han modificat correctament
*   Validació JIRA → Realitzar validació que indiquen al JIRA →  Normalment s'encarrega l'OT

**Consells:**

1.  En cas de dubte i no saber a quin número pertany el paquet a desplegar:  
    Ens dirigim a la ruta: /home/tomcat6/script i obrim el fitxer _**desplegar.sh**._ Quan l'obrim podrem veure totes les passes que segueix l'script, si busquem el paquet que toca desplegar ens dirà a quin número pertany:
    
    ![](attachments/41520632/41522293.png)

A l'exemple podem veure que el paquet _**ext-impl.jar**_ pertany al número 15.

Attachments:
------------

![](images/icons/bullet_blue.gif) [image2019-10-24\_12-3-13.png](attachments/41520632/41522290.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-24\_12-6-51.png](attachments/41520632/41522291.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-3-18\_11-11-5.png](attachments/41520632/41522292.png) (image/png)  
![](images/icons/bullet_blue.gif) [image2019-10-24\_12-41-52.png](attachments/41520632/41522293.png) (image/png)  

Document generated by Confluence on 02 June 2025 11:15

[Atlassian](http://www.atlassian.com/)