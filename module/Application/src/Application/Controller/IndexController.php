<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Db\Adapter\Adapter;
use Zend\Authentication\Adapter\DbTable as AuthAdapter;

//Componentes de autenticación
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Storage\Session as SessionStorage;
use Zend\Session\Container;
use Zend\Crypt\Password\Bcrypt;

//Validación
use Zend\Validator;
use Zend\I18n\Validator as I18nValidator;

//Componentes de validación
use Application\Form\Login;
use Application\Form\LoginValidator;

//Modelos
use Application\Modelo\Entity\PermisoUsuarios;
use Application\Modelo\Entity\CatPermiso;

class IndexController extends AbstractActionController
{

		private $dbAdapter;
    private $auth;

    public function __construct(){
        $this->messenger = new \stdClass();
        $this->auth = new AuthenticationService();
    }
    public function indexAction()
    {
			//Autentificación
			$this->dbAdapter = $this->getServiceLocator()->get('Zend\Db\Adapter');
      $auth = $this->auth;
      @$identi=$auth->getStorage()->read();
      if ($identi!=false){
        return $this->redirect()->toUrl($this->getRequest()->getBaseUrl().'/administrador');
      }

       //Creamos el formulario
       $form   =  new Login();
       $datos = $this->request->getPost();

       if ($this->getRequest()->isPost())
       {
         //validacion para el nombre
         $alpha      = new I18nValidator\Alpha();
         $alpha->setMessage("Usuario incorrecto");
         $validacion =  $alpha->isValid($this->request->getPost("nombre"));

         //Validacion para la contraseña
         $pass       = new Validator\StringLength();
         $pass->setMin(5);
         $pass->setMessage("La contraseña debe ser mayor de 5 caracteres");
         $valid_pass = $pass->isValid($this->request->getPost("pass"));

         if ($validacion && $valid_pass) {

					//Esta es la tabla a autenticar
						$authAdapter = new AuthAdapter($this->dbAdapter,
							'Cat_Usuarios',
							'NombreUsuario',
							'PassUsuario'
						);

					 //Tipo de encriptacion de contraseña
					 $securePass = md5($this->request->getPost("pass"));

					 //Establecemos como datos a autenticar los que nos llegan del formulario
					 $authAdapter->setIdentity($this->getRequest()->getPost("nombre"))
					 					 ->setCredential($securePass);

					 //Se envian los datos de autentificacion
					 $auth->setAdapter($authAdapter);

					 //Le decimos al servicio de autenticación que lleve a cabo la identificacion
					 $result=$auth->authenticate();

					 //Si el resultado del login es falso, es decir no son correctas las credenciales
					 if($authAdapter->getResultRowObject()==false){

					 //Crea un mensaje
					 $error	="Verifica tu usuario y/o contraseña";

				 }else{
					 //Se obtienen los datos pasados del usuario
					 $arreglo 	=	$authAdapter->getResultRowObject();

					 //Dependiendo del tipo de usuario se redirige
					 if ($arreglo->TipoUsuario == '0')
					 {
						//Usuario Cliente
						return $this->redirect()->toUrl('https://www.facebook.com/');

					 }else{
						//Usuario Empleado
					 	$permisos_usr =	new PermisoUsuarios($this->dbAdapter);
						$perm_usr			= $permisos_usr->permiso_usuario($arreglo->idCat_Usuarios);
						$permisos			= new CatPermiso($this->dbAdapter);
						$allpermisos	=	$permisos->allpermisos();
						$permisosUsuarios= array();
	          $permisosUsuarios['idCat_Usuarios']=$authAdapter->getResultRowObject()->idCat_Usuarios;
	          $permisosUsuarios['NombreUsuario']=$authAdapter->getResultRowObject()->NombreUsuario;
						$permisosUsuarios['idCat_Empleado']=$authAdapter->getResultRowObject()->idCat_Empleado;
						$datos				= array();

						//Compara todos los permisos
						foreach ($perm_usr as $arre) {
							$datos[$arre['ClavePermiso']]	=	$arre['ClavePermiso'];
						}
						//var_dump($permisosUsuarios);
						//Verifica cuáles son los permisos del usuario
	          for ($i=0; $i < count($allpermisos) ; $i++) {
	            $permisosUsuarios[''.$allpermisos[$i]['ClavePermiso'].'']=(array_key_exists($allpermisos[$i]['ClavePermiso'], $datos))?'1':'0';
	          }

	          $permisosUsuarios = (object) $permisosUsuarios;
	          $auth->getStorage()->write($permisosUsuarios);
						return $this->redirect()->toUrl($this->getRequest()->getBaseUrl().'/administrador');
						//var_dump($permisosUsuarios);
					 }
				 }

         }else{
					 //Mesnajes de error de validación
           $mensaje   = array(
             "mensaje1" => $alpha->getMessages()["notAlpha"],
             "mensaje2" => $pass->getMessages()["stringLengthTooShort"]);
         }
       }
			 $this->layout('layout/layout_ini');
       //Le pasamos a la vista el formulario y la url base
       return new ViewModel(array(
               "form"   => $form,
               'url'    => $this->getRequest()->getBaseUrl(),
               'datos'  => $datos,
               'mensaje'=> $mensaje,
							 'error'	=> $error
               ));
    }

    public function logoutAction(){
      $this->dbAdapter = $this->getServiceLocator()->get('Zend\Db\Adapter');
      $this->auth->clearIdentity();
      return $this->redirect()->toUrl($this->getRequest()->getBaseUrl());
    }
}
