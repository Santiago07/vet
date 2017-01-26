<?php
namespace Administrador\Form; 

use Zend\Captcha; 
use Zend\Form\Element; 
use Zend\Form\Form; 

class FormularioRendimiento extends Form{ 
    public function __construct($name = null){ 

        parent::__construct('FormularioRendimiento');        
        $this->setAttribute('method', 'post');

        $this->add(array(
             
             'name' => 'goles', 
             'type' => 'Zend\Form\Element\Number',
             'options' => array(
                'label'=>"Goles en partido",
                ),
             'attributes' => array(
                    'id'=>"golesAsert",
                    'min' => '0',                    
                    'step' => '0', // default step interval is 1
                    'class'=>'form-control',
                    'placeholder' => 'Numero aciertos',
                    'value' => '0',
             )
         )); 


          $this->add(array(             
             'name' => 'tarjeA', 
             'type' => 'Zend\Form\Element\Number',
             'options' => array(
                'label'=>"Tarjetas Amarillas",
                ),
             'attributes' => array(
                    'id'=>"tarjAma",
                    'min' => '0',
                    'max' => '2',                   
                    'step' => '0', // default step interval is 1
                    'class'=>'form-control',
                    'placeholder' => 'Asignadas',
                    'value' => '0',
             )
         ));     

        $this->add(array(             
             'name' => 'tarjeR', 
             'type' => 'Zend\Form\Element\Number',
             'options' => array(
                'label'=>"Tarjetas Rojas",
                ),
             'attributes' => array(
                    'id'=>"tarjRoja",
                    'min' => '0',
                    'max' => '1',                    
                    'step' => '0', // default step interval is 1
                    'class'=>'form-control',
                    'placeholder' => 'Asignadas',
                    'value' => '0',
             )
         ));

        $this->add(array(
             'type' => 'Zend\Form\Element\Select',
             'name' => 'jugadoresEquipoUno',
             'options' => array(
                     'label' => 'Nombre de los jugadores',
                     'empty_option' => 'Seleciona un jugador',
                     'value_options' => array(
                             '' => 'Seleciona un elemento',                             
                     ),
             ),
             'attributes' => array(
                    'id'=>"equipoUno",                    
                    'class'=>'form-control',
                    'placeholder' => 'Asignadas',
                    'required'=>"required",
             )
        ));

        $this->add(array(
             'type' => 'Zend\Form\Element\Select',
             'name' => 'jugadoresEquipoDos',
             'options' => array(
                     'label' => 'Nombre de los jugadores',
                     'empty_option' => 'Seleciona un jugador',
                     'value_options' => array(
                             '' => 'Seleciona un elemento',                             
                     ),
             ),
             'attributes' => array(
                    'id'=>"equipoDos",                    
                    'class'=>'form-control',
                    'placeholder' => 'Asignadas',
                    'required'=>"required",
             )
        ));      
        
        $this->add(array(
                 'type' => 'Zend\Form\Element\Select',
                 'name' => 'tiempoCambio',
                 'options' => array(
                         'label' => 'Tiempo',                        
                         'value_options' => array(
                                 '' => 'Seleciona el tiempo',
                                 

                         ),
                 ),
                 'attributes' => array(
                        'id'=>"tiempoCambio",                    
                        'class'=>'form-control',                        
                        'required'=>"required",
                 )
        ));



        $this->add(array(
                 'type' => 'Zend\Form\Element\Textarea',
                 'name' => 'ComentarioASC',
                 'options' => array(
                         'label' => 'Comentario',                    
                         
                 ),
                 'attributes' => array(
                        'id'=>'ComentarioASC',                    
                        'class'=>'form-control',                                                
                        'rows'=>'5',                       
                        
                 )
        ));

         $this->add(array(
                 'type' => 'Zend\Form\Element\Text',
                 'name' => 'NombreAsc',
                 'options' => array(
                         'label' => 'Nombre',                    
                         
                 ),
                 'attributes' => array(
                        'id'=>'NombreAsc',                    
                        'class'=>'form-control',                        
                        'required'=>"required",
                        
                        
                 )
        ));
         $this->add(array(
             'type' => 'Zend\Form\Element\Select',
             'name' => 'AscEquipos',
             'options' => array(
                     'label' => 'Selecciona equipo',                     
                     'value_options' => array(
                             '' => 'Seleciona un elemento',                             
                     ),
             ),
             'attributes' => array(
                    'id'=>"AscEquipos",                    
                    'class'=>'form-control',                   
                    'required'=>"required",
             )
        ));  


        // Botton de guardar
      
        $this->add(array(
             'name' => 'GuardarAlert',
             'type' => 'Zend\Form\Element\Submit',
             'attributes' => array(
                 'value' => 'Guardar',
                 'id'=>"AscEquipos",
                 'class' =>'btn btn-primary',
                 'style' =>'float: right;',
                 'onclick' => '',
             ),
         ));


       

         // Botton de cerrar modal 
         $this->add(array(
        'type' => 'Button',
        'name' => 'closeModll',
        'options' => array(
            'label' => 'Cerrar',
            'label_options' => array(
                'disable_html_escape' => true,
            )
        ),
        'attributes' => array(            
            'class' => 'btn btn-default',
            'data-dismiss'=>'modal',
         )
    ));                     
    } 
} 