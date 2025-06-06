Manteniment Intern : Servei - Redmine  

1.  [Manteniment Intern](index.md)
2.  [Serveis de Manteniment Intern](Serveis-de-Manteniment-Intern_15368305.md)

Manteniment Intern : Servei - Redmine
=====================================

Created by Ivan Caballero, last modified on 21 diciembre 2018

  

**Índex:**

/\*<!\[CDATA\[\*/ div.rbtoc1749247075774 {padding: 0px;} div.rbtoc1749247075774 ul {list-style: disc;margin-left: 0px;} div.rbtoc1749247075774 li {margin-left: 0px;padding-left: 0px;} /\*\]\]>\*/

*   [Descripció](#ServeiRedmine-Descripció)
*   [Dispositius implicats](#ServeiRedmine-Dispositiusimplicats)
*   [Maquinari i programari del que depèn](#ServeiRedmine-Maquinariiprogramaridelquedepèn)
*   [Configuració de xarxa](#ServeiRedmine-Configuraciódexarxa)
*   [Interlocució](#ServeiRedmine-Interlocució)
*   [Segurització](#ServeiRedmine-Segurització)
*   [Iptable](#ServeiRedmine-Iptable)
*   [Arxius de configuració:](#ServeiRedmine-Arxiusdeconfiguració:)
*   [Virtual Host del port 443](#ServeiRedmine-VirtualHostdelport443)
*   [Virtual Host del port 3000 (NAT al port 80)](#ServeiRedmine-VirtualHostdelport3000\(NATalport80\))
*   [Grup de distribució per notificacions a clients](#ServeiRedmine-Grupdedistribuciópernotificacionsaclients)
*   [URL de servei](#ServeiRedmine-URLdeservei)
*   [Còpia de seguretat](#ServeiRedmine-Còpiadeseguretat)
    *   [Script de backup de base de dades:](#ServeiRedmine-Scriptdebackupdebasededades:)
*   [Monitors](#ServeiRedmine-Monitors)

  

  

Descripció
----------

  

El redmine es un software per la gestió de projectes i incidències, d'ús intern del Consorci.

  

Dispositius implicats
---------------------

  

Màquina virtual Redmine3.2 (192.168.166.29)

  

Maquinari i programari del que depèn
------------------------------------

Màquina virtual Redmine3.2 (192.168.166.29)

Configuració de xarxa
---------------------

La màquina virtual ha d'estar connectada al switch virtual "VM Network", i el host ha d'estar punxat a la vlan 666.

Interlocució
------------

Contacte tècnic: Toni Vierge

Segurització
------------

S'ha instal·lat un CDS (CN=redmine.aoc.cat) al servidor Redmine3.2 per habilitar la connexió segura pel port 443, aquest certificat i el _flight_ _plan_ utilitzat es troben a [O:\\Informàtica interna\\Desplegaments\\redmine.aoc.cat 20141210](#)

Iptable
-------

La màquina té els següents ports obert:  
cat /lib/ufw/user.rules

  

1.  1.  1.  RULES ###
        2.  tuple ### allow tcp 22 0.0.0.0/0 any 0.0.0.0/0 in  
            \-A ufw-user-input -p tcp --dport 22 -j ACCEPT
        3.  tuple ### allow tcp 443 0.0.0.0/0 any 0.0.0.0/0 in  
            \-A ufw-user-input -p tcp --dport 443 -j ACCEPT
        4.  tuple ### allow tcp 80 0.0.0.0/0 any 0.0.0.0/0 in  
            \-A ufw-user-input -p tcp --dport 80 -j ACCEPT
        5.  tuple ### allow any 3000 0.0.0.0/0 any 0.0.0.0/0 in Apache  
            \-A ufw-user-input -p tcp --dport 3000 -j ACCEPT  
            \-A ufw-user-input -p udp --dport 3000 -j ACCEPT
        6.  tuple ### allow any 25 0.0.0.0/0 any 0.0.0.0/0 in SMTP  
            \-A ufw-user-input -p tcp --dport 25 -j ACCEPT  
            \-A ufw-user-input -p udp --dport 25 -j ACCEPT
        7.  tuple ### allow any 9102 0.0.0.0/0 any 0.0.0.0/0 in Bacula  
            \-A ufw-user-input -p tcp --dport 9102 -j ACCEPT  
            \-A ufw-user-input -p udp --dport 9102 -j ACCEPT
        8.  tuple ### allow any 5666 0.0.0.0/0 any 0.0.0.0/0 in Nagios  
            \-A ufw-user-input -p tcp --dport 5666 -j ACCEPT  
            \-A ufw-user-input -p udp --dport 5666 -j ACCEPT
            
            Arxius de configuració:
            -----------------------
            
            Configuració del mail:  
            ./opt/bitnami/apps/redmine/htdocs/config/configuration.yml  
            Log d'aplicació:  
            /opt/bitnami/apps/redmine/htdocs/log/production.log  
              
            
            Virtual Host del port 443
            -------------------------
            
              
            Listen 0.0.0.0:443  
            #<VirtualHost _default_:443>  
            <VirtualHost \*:443>  
            DocumentRoot "/opt/bitnami/apache2/htdocs"  
            ServerAdmin operacions.xarxes@aoc.cat  
            ErrorLog logs/redmine\_error\_log\_ssl  
            #Afegir part segura  
            SSLEngine on  
            SSLCertificateFile /etc/pki/tls/private/redmine.aoc.cat.crt  
            SSLCertificateKeyFile /etc/pki/tls/private/redmine.aoc.cat.key  
            SSLCertificateChainFile /etc/pki/tls/private/CAChainfile.crt  
            RewriteEngine On  
            RewriteCond %{REQUEST\_URI} \\.{2,}  
            RewriteRule ^(.\*)$ - \[F\]  
            RewriteCond %{REQUEST\_METHOD} !^(GET|POST|HEAD)  
            RewriteRule .\* - \[F\]  
            <Directory "/opt/bitnami/apache2/htdocs">  
            Options FollowSymLinks MultiViews  
            AddLanguage en en  
            AddLanguage es es  
            AddLanguage pt-BR pt-br  
            AddLanguage zh zh  
            AddLanguage ko ko  
            AddLanguage he he  
            AddLanguage de de  
            AddLanguage ro ro  
            AddLanguage ru ru  
            LanguagePriority en  
            ForceLanguagePriority Prefer Fallback  
            AllowOverride All  
            <IfVersion < 2.3 >  
            Order allow,deny  
            Allow from all  
            </IfVersion>  
            <IfVersion >= 2.3 >  
            Require all granted  
            </IfVersion>  
            </Directory>  
            
2.  Error Documents  
    ErrorDocument 503 /503.html
3.  Bitnami applications installed with a prefix URL (default)  
    Include "/opt/bitnami/apache2/conf/bitnami/bitnami-apps-prefix.conf"  
    </VirtualHost>
    
    Virtual Host del port 3000 (NAT al port 80)
    -------------------------------------------
    
    Listen 0.0.0.0:3000  
    #<VirtualHost _default_:3000>  
    <VirtualHost \*:3000>  
    DocumentRoot "/opt/bitnami/apache2/htdocs"  
    #ServerName redmine.aoc.local  
    ServerName localhost  
    ServerAdmin operacions.xarxes@aoc.cat  
    ErrorLog logs/redmine\_error\_log  
    <Directory "/opt/bitnami/apache2/htdocs">  
    Options FollowSymLinks MultiViews  
    AddLanguage en en  
    AddLanguage es es  
    AddLanguage pt-BR pt-br  
    AddLanguage zh zh  
    AddLanguage ko ko  
    AddLanguage he he  
    AddLanguage de de  
    AddLanguage ro ro  
    AddLanguage ru ru  
    LanguagePriority en  
    ForceLanguagePriority Prefer Fallback  
    AllowOverride All  
    <IfVersion < 2.3 >  
    Order allow,deny  
    Allow from all  
    </IfVersion>  
    <IfVersion >= 2.3 >  
    Order allow,deny  
    Allow from all  
    AllowOverride all  
    #Require all granted  
    </IfVersion>  
    </Directory>
4.  Error Documents  
    ErrorDocument 503 /503.html
5.  Bitnami applications installed with a prefix URL (default)  
    Include "/opt/bitnami/apache2/conf/bitnami/bitnami-apps-prefix.conf"  
    RewriteEngine On  
    RewriteCond %{REQUEST\_URI} \\.{2,}  
    RewriteRule ^(.\*)$ - \[F\]  
    #Redireccióhttp a https  
    RewriteRule (.\*)$ [https://192.168.166.29/$1![](images/icons/linkext7.gif)](https://192.168.166.29/$1) \[R=Permanent,L\]  
    RewriteCond %{REQUEST\_METHOD} !^(GET|POST|HEAD)  
    RewriteRule .\* - \[F\]  
      
      
    </VirtualHost>
    
    Grup de distribució per notificacions a clients
    -----------------------------------------------
    
    Grup Personal AOC
    
    URL de servei
    -------------
    
    [http://192.168.166.29:3000/my/page](http://192.168.166.29:3000/my/page)  
    [http://redmine.aoc.cat/](http://redmine.aoc.cat/)  
    Les dues URLs es redirigeixen a [https://redmine.aoc.cat](https://redmine.aoc.cat)
    
    Còpia de seguretat
    ------------------
    
    La base de dades es copia diàriament a disc. Està programat al crontab de root:  
    \[root@redmine3000 ~\]# crontab -l  
    0 4 \* \* \* /root/bk\_redmine.sh  
    La ubicació del backups: /usr/backup/  
    
    ### Script de backup de base de dades:
    
      
    DATA=\`date +%Y-%m-%d\`  
    dbname="bitnami\_redmine"  
    dbname2="performance\_schema"  
    dbname3="test"  
    dbname4="mysql"  
    dbname5="redmine"  
    LOG=/root/bk\_redmine.log  
    echo "Iniciem backup "$DATA >> $LOG  
    echo "-----------------------" >> $LOG  
    echo "Esborrem backups antics de disc" >> $LOG  
    rm /usr/backup/\*.sql.bz2  
    rm /usr/backup/\*.tar.gz  
    /opt/bitnami/mysql/bin/mysqldump -B --single-transaction --user=backup --password=bk1234 --host=localhost $dbname > /usr/backup/$DATA"\_"$dbname.sql  
    /opt/bitnami/mysql/bin/mysqldump -B --single-transaction -B --user=backup --password=bk1234 --host=localhost $dbname2 > /usr/backup/$DATA"\_"$dbname2.sql  
    /opt/bitnami/mysql/bin/mysqldump -B --single-transaction -B --user=backup --password=bk1234 --host=localhost $dbname3 > /usr/backup/$DATA"\_"$dbname3.sql  
    /opt/bitnami/mysql/bin/mysqldump -B --single-transaction -B --user=backup --password=bk1234 --host=localhost $dbname4 > /usr/backup/$DATA"\_"$dbname4.sql  
    /opt/bitnami/mysql/bin/mysqldump -B --single-transaction -B --user=backup --password=bk1234 --host=localhost $dbname5 > /usr/backup/$DATA"\_"$dbname5.sql  
    echo "Exports de la base de dades:" >> $LOG  
    echo " \`ls -la /usr/backup/\*.sql\` " >> $LOG  
    bzip2 -z9v /usr/backup/$DATA"\_"$dbname.sql  
    bzip2 -z9v /usr/backup/$DATA"\_"$dbname2.sql  
    bzip2 -z9v /usr/backup/$DATA"\_"$dbname3.sql  
    bzip2 -z9v /usr/backup/$DATA"\_"$dbname4.sql  
    bzip2 -z9v /usr/backup/$DATA"\_"$dbname5.sql  
    tar -czvf /usr/backup/$DATA"\_bitnami.tar.gz" /opt/bitnami  
    if \[ $?=0 \]; then  
    echo "Compressio de fitxers de /opt/bitnami correcte" >> $LOG  
    echo " \`ls -la /usr/backup/\*.tar.gz\` " >> $LOG  
    else  
    echo "Error a la compressio de fitxers de /opt/bitnami" >> $LOG  
    fi  
    #echo "Pujem els backup al S3" >> $LOG  
    #/usr/local/bin/aws s3 cp /usr/backup/$DATA"\_"$dbname.sql.bz2 s3://copies-seguretat/Moodle2.7/ >> $LOG  
    #aws s3 cp /usr/backup/$DATA"\_"$dbname2.sql.bz2 s3://copies-seguretat/Moodle2.7/ >> $LOG  
    #aws s3 cp /usr/backup/$DATA"\_"$dbname3.sql.bz2 s3://copies-seguretat/Moodle2.7/ >> $LOG  
    #aws s3 cp /usr/backup/$DATA"\_"$dbname4.sql.bz2 s3://copies-seguretat/Moodle2.7/ >> $LOG  
    #aws s3 cp /usr/backup/$DATA"\_"$dbname5.sql.bz2 s3://copies-seguretat/Moodle2.7/ >> $LOG  
    #/usr/local/bin/aws s3 cp /usr/backup/$DATA"\_bitnami.tar.gz" s3://copies-seguretat/Moodle2.7/ >> $LOG  
    echo "Fi del backup" >> $LOG  
    echo "" >> $LOG  
    
    Monitors
    --------
    
    \-El servidor Redmine3000 es monitoritza a través dels monitors OP5:  
    [https://op5-aoc.atlasit.com/monitor/index.php/status/service?name=NMH00401\_redmine3000](https://op5-aoc.atlasit.com/monitor/index.php/status/service?name=NMH00401_redmine3000)  
    \-Hem instal·lat un plugin intern que monitoritza l'eina i ens envia alertes si algun flux o tiquet ha entrat en conflicte o no està funcionant correctament.

Document generated by Confluence on 06 junio 2025 23:57

[Atlassian](http://www.atlassian.com/)