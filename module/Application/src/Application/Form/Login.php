<?php

/**
 * Vamos a realizar un formulario
 */

namespace Application\Form;

use Zend\Captcha\AdapterInterface as CaptchaAdapter;
use Zend\Form\Element;
use Zend\Form\Form;
use Zend\Captcha;

class Login extends Form{

    public function __construct($name = null)
    {
      parent::__construct($name);

      //Podemos añadir campos al formulario de esta forma
      $this->add(array
      (
        'name'    => 'nombre',
        'type'    => 'Zend\Form\Element\Text',
        'options' => array
                    (
                      'label'    =>  'Nombre'
                    ),
        'attributes' => array
                    (
                      'class'       =>  'form-control',
                      'placeholder' => 'Usuario',
                      'required'    =>  'required',
                      'autofocus'   =>  'autofocus'
                    ),
        ));


        $this->add
          (
            array
            (
            'name'      => 'pass',
            'options'   => array
                        (
                          'placeholder' => 'Contraseña'
                        ),
            'attributes'=> array
                        (
                          'type'        =>  'password',
                          'placeholder' =>  'Contraseña',
                          'class'       =>  'form-control',
                          'required'    =>  'required'
                        ),
            )
          );
     }
}

?>
