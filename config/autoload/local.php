<?php
/**
 * Local Configuration Override
 *
 * This configuration override file is for overriding environment-specific and
 * security-sensitive configuration information. Copy this file without the
 * .dist extension at the end and populate values as needed.
 *
 * @NOTE: This file is ignored from Git by default with the .gitignore included
 * in ZendSkeletonApplication. This is a good practice, as it prevents sensitive
 * credentials from accidentally being committed into version control.
 */

// return array(
// );

return array(
    'service_manager'=>array(
        'factories'=>array(
            'Zend\Db\Adapter'=>'Zend\Db\Adapter\AdapterServiceFactory',
        ),
    ),
    'db'=>array(

        // para que funcione en local
        'driver'=>'Pdo_Mysql',
        'username'=>'root',
        'password'=>'root',
        'dsn'=>'mysql:dbname=agenda;host:localhost',

        'driver_options'=>array(
            PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES \'UTF8\''
        ),

        // 'driver'        => 'Pdo_Mysql',
        // 'username'      => 'codexsor_alpha',
        // 'password'      => 'agenda$1',
        // 'database'      => 'codexsor_agenda',
        // 'host'          => 'localhost',
        //
        // 'driver_options' => array(
        //         MYSQLI_INIT_COMMAND=> 'SET NAMES \'UTF8\'',
        //
        //     ),
    ),
);
