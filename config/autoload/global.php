<?php
/**
 * Global Configuration Override
 *
 * You can use this file for overriding configuration values from modules, etc.
 * You would place values in here that are agnostic to the environment and not
 * sensitive to security.
 *
 * @NOTE: In practice, this file will typically be INCLUDED in your source
 * control, so do not include passwords or other sensitive information in this
 * file.
 */

// return array(
//     // ...
// );

return array(
	 'service_manager' => array(
      'factories' => array(
         'Zend\Db\Adapter\Adapter' => 'Zend\Db\Adapter\AdapterServiceFactory',
      ),
   ),
   'db' => array (

    'driver'        => 'Mysqli',
    'username'      => 'root',
    'password'      => '',
    'database'      => 'super_block',
    'host'          => 'localhost',

    // 'driver'        => 'Pdo_Mysql',
    // 'username'      => 'copati_alfa',
    // 'password'      => 'RAEveracruz$1',
    // 'database'      => 'copatimo_copati',
    // 'host'          => 'localhost',

    'driver_options' => array(
            MYSQLI_INIT_COMMAND=> 'SET NAMES \'UTF8\'',

        ),
    'options' => array('buffer_results' => true),
      ),

);
