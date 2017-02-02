<?php

namespace Administrador\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Db\Adapter\Adapter;
use Zend\View\Model\JsonModel;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Storage\Session as SessionStorage;
use Zend\Session\Container;
use Zend\Validator;
use Zend\I18n\Validator as I18nValidator;
use Zend\Escaper\Escaper;


//Modelos
use Administrador\Modelo\Entity\CatClientes;
use Administrador\Modelo\Entity\CatEstados;
use Administrador\Modelo\Entity\CatMunicipios;
use Administrador\Modelo\Entity\CatEmpleados;
use Administrador\Modelo\Entity\CatSucursales;

// Correo
use Zend\Mail;
use Zend\Mime\Part as MimePart;
use Zend\Mime\Message as MimeMessage;


class IndexController extends AbstractActionController
{
	public $dbAdapter;
  private $auth;
  private $login;
  private $messenger;

  public function __construct(){
        $this->messenger = new \stdClass();
        $this->auth = new AuthenticationService();
  }

  public function indexAction(){
		$this->dbAdapter = $this->getServiceLocator()->get('Zend\Db\Adapter');
		$auth = $this->auth;
		@$identi=$auth->getStorage()->read();
		if ($identi!=true || $identi->Index!=1){
			return $this->redirect()->toUrl($this->getRequest()->getBaseUrl().'/administrador/index/logout');
		}
			return	new ViewModel(array(
				'Usuario'		=>	$identi->NombreUsuario
			));

      $this->layout('layout/layout');

  }


  public function logoutAction(){
      $this->dbAdapter = $this->getServiceLocator()->get('Zend\Db\Adapter');
      $this->auth->clearIdentity();
      return $this->redirect()->toUrl($this->getRequest()->getBaseUrl().'/');
  }

public function catclientesAction(){
	 $this->dbAdapter=$this->getServiceLocator()->get('Zend\Db\Adapter');
	 $request = $this->getRequest();
	 $auth = $this->auth;
	 @$identi=$auth->getStorage()->read();

	 $clientes 			= new CatClientes($this->dbAdapter);
	 $all_clientes	=	$clientes->allclientes();
	 $estados 			= new CatEstados($this->dbAdapter);
	 $all_estados		= $estados->allestados();
	 $municipio			= new CatMunicipios($this->dbAdapter);
	 $all_municipios= $municipio->allmunicipios();

	 return	new ViewModel(array(
		 'Clientes'		=>	$all_clientes,
		 'Estados'		=>	$all_estados,
		 'Municipios'	=>	$all_municipios,
		 'Usuario'		=>	$identi->NombreUsuario //Envio del nombre de usuario al layout
	 ));

	 $this->layout("layout/layout");

 }

public function municipiosAction(){
	$this->dbAdapter = $this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth = $this->auth;
	@$identi=$auth->getStorage()->read();

	$request				= $this->getRequest();
	if($request->isPost()){
		$muni						= $request->getPost();
		$municipios			= new CatMunicipios($this->dbAdapter);
		$all_municipios = $municipios->allmunicipiosedo($muni['id']);
	}
	$all_mun 	=	array($all_municipios);
	$mun			=	new JsonModel($all_mun);
	return $mun;
}

public function sendformAction(){
	$this->dbAdapter	=	$this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth							= $this->auth;
	@$identi					= $auth->getStorage()->read();

	$request					= $this->getRequest();
	if($request->isPost()) {
		$formulario 		= $request->getPost();
		if ($formulario['cliente_edit']=='1') {
			$datos_form			=	array(
				'NombreCliente'		=>	$formulario['NombreCliente'],
				'ApeCliente'			=> 	$formulario['ApellidosCliente'],
				'Sexo'						=> 	$formulario['SexoCliente'],
				'FechaNacCliente'	=> 	$formulario['FecNacCliente'],
				'CelularCliente'	=> 	$formulario['CelularCliente'],
				'CelularAltCliente'=>	$formulario['CelularAltCliente'],
				'WhatsAppCliente'	=>	$formulario['whatsapp'],
				'CorreoCliente'		=>	$formulario['CorreoCliente'],
				'CorreoAltCliente'=>	$formulario['CorreoAltCliente'],
				'FBCliente'				=>	$formulario['facebook'],
				'TwitterCliente'	=>	$formulario['twitter'],
				'DireccionCliente'=>	$formulario['DireccionCliente'],
				'ColoniaCliente'	=>	$formulario['ColoniaCliente'],
				'EstatusCliente'	=>	'1',
				'idCat_Estados'		=>	$formulario['Estado'],
				'idCat_Municipio'	=>	$formulario['Municipio']
			);
		$clientes 			= new CatClientes($this->dbAdapter);
		$cliente_acction=	$clientes->updatecliente($datos_form, $formulario['id_cliente']);
		}else{
		$datos_form			=	array(
			'NombreCliente'		=>	$formulario['NombreCliente'],
			'ApeCliente'			=> 	$formulario['ApellidosCliente'],
			'Sexo'						=> 	$formulario['SexoCliente'],
			'FechaNacCliente'	=> 	$formulario['FecNacCliente'],
			'CelularCliente'	=> 	$formulario['CelularCliente'],
			'CelularAltCliente'=>	$formulario['CelularAltCliente'],
			'WhatsAppCliente'	=>	$formulario['whatsapp'],
			'CorreoCliente'		=>	$formulario['CorreoCliente'],
			'CorreoAltCliente'=>	$formulario['CorreoAltCliente'],
			'FBCliente'				=>	$formulario['facebook'],
			'TwitterCliente'	=>	$formulario['twitter'],
			'DireccionCliente'=>	$formulario['DireccionCliente'],
			'ColoniaCliente'	=>	$formulario['ColoniaCliente'],
			'EstatusCliente'	=>	'1',
			'idCat_Estados'		=>	$formulario['Estado'],
			'idCat_Municipio'	=>	$formulario['Municipio']
		);
		$clientes					= new CatClientes($this->dbAdapter);
		$cliente_acction	= $clientes->addcliente($datos_form);
		}
	}
	$info_cli 	=	array($cliente_acction);
	$cliente		=	new JsonModel($info_cli);
	return $cliente;
}

public function infoClienteAction(){
	$this->dbAdapter	=	$this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth							= $this->auth;
	@$identi					= $auth->getStorage()->read();

	$request 		= $this->getRequest();
	if ($request->isPost()) {
		$id 	= $request->getPost();
		$cliente		= new CatClientes($this->dbAdapter);
		$infocliente= $cliente->infocliente($id['id']);
	}
	$info_cliente = array($infocliente);
	$cliente_info	= new JsonModel($info_cliente);
	return $cliente_info;
}

public function catempleadosAction(){
	$this->dbAdapter=$this->getServiceLocator()->get('Zend\Db\Adapter');
	$request = $this->getRequest();
	$auth = $this->auth;
	@$identi=$auth->getStorage()->read();

	$empleado 		= new CatEmpleados($this->dbAdapter);
	$allempleados	= $empleado->allempleados();
	$sucursal			= new CatSucursales($this->dbAdapter);
	$allsucursales=	$sucursal->allsucursales();
	$estados 			= new CatEstados($this->dbAdapter);
	$all_estados		= $estados->allestados();
	$municipio			= new CatMunicipios($this->dbAdapter);
	$all_municipios= $municipio->allmunicipios();

	return	new ViewModel(array(
		'Empleados'	=>	$allempleados,
		'Sucursales'=>	$allsucursales,
		'Estados'		=>	$all_estados,
		'Municipios'	=>	$all_municipios,
		'Usuario'		=>	$identi->NombreUsuario //Envio del nombre de usuario al layout
	));

	$this->layout("layout/layout");
}

public function sendformempAction(){
	$this->dbAdapter	=	$this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth							= $this->auth;
	@$identi					= $auth->getStorage()->read();

	$request					= $this->getRequest();
	if($request->isPost()) {
		$form_emp 	=	$request->getPost();
		if ($form_emp['empleado_edit']=='1') {
			$formulario = array(
				'NombreEmpleado'		=>	$form_emp['NombreEmpleado'],
				'ApeEmpleado'				=>	$form_emp['ApellidosEmpleado'],
				'Sexo'							=>	$form_emp['SexoEmpleado'],
				'DireccionEmpleado'	=>	$form_emp['DireccionEmpleado'],
				'ColoniaEmpleado'		=>	$form_emp['ColoniaEmpleado'],
				'TelefonoEmpleado'	=>	$form_emp['CelularAltEmpleado'],
				'CelularEmpleado'		=>	$form_emp['CelularEmpleado'],
				'CorreoEmpleado'		=>	$form_emp['CorreoEmpleado'],
				'FBEmpleado'				=>	$form_emp['facebook'],
				'WhatsAppEmpleado'	=>	$form_emp['whatsapp'],
				'FechaNacEmpleado'	=>	$form_emp['FecNacEmpleado'],
				'CedulaProfEmpleado'=>	$form_emp['CedulaProfEmpleado'],
				'CategoriaEmpleado'	=>	$form_emp['CategoriaEmpleado'],
				'BajaEmpleado'			=>	$form_emp['BajaEmpleado'],
				'BajaMotivoEmpleado'=>	$form_emp['BajaMotivoEmpleado'],
				'EstatusEmpleado'		=>	$form_emp['EstatusEmpleado'],
				'idCat_Sucursales'	=>	$form_emp['Sucursal'],
				'idCat_Estados'			=>	$form_emp['Estado'],
				'idCat_Municipio'		=>	$form_emp['Municipio']
			);
		$empleado 			= new CatEmpleados($this->dbAdapter);
		$empleado_action=	$empleado->updateempleado($formulario, $form_emp['id_empleado']);
		}else {
			$formulario = array(
				'NombreEmpleado'		=>	$form_emp['NombreEmpleado'],
				'ApeEmpleado'				=>	$form_emp['ApellidosEmpleado'],
				'Sexo'							=>	$form_emp['SexoEmpleado'],
				'DireccionEmpleado'	=>	$form_emp['DireccionEmpleado'],
				'ColoniaEmpleado'		=>	$form_emp['ColoniaEmpleado'],
				'TelefonoEmpleado'	=>	$form_emp['CelularAltEmpleado'],
				'CelularEmpleado'		=>	$form_emp['CelularEmpleado'],
				'CorreoEmpleado'		=>	$form_emp['CorreoEmpleado'],
				'FBEmpleado'				=>	$form_emp['facebook'],
				'WhatsAppEmpleado'	=>	$form_emp['whatsapp'],
				'FechaNacEmpleado'	=>	$form_emp['FecNacEmpleado'],
				'CedulaProfEmpleado'=>	$form_emp['CedulaProfEmpleado'],
				'CategoriaEmpleado'	=>	$form_emp['CategoriaEmpleado'],
				'BajaEmpleado'			=>	$form_emp['BajaEmpleado'],
				'BajaMotivoEmpleado'=>	$form_emp['BajaMotivoEmpleado'],
				'EstatusEmpleado'		=>	$form_emp['EstatusEmpleado'],
				'idCat_Sucursales'	=>	$form_emp['Sucursal'],
				'idCat_Estados'			=>	$form_emp['Estado'],
				'idCat_Municipio'		=>	$form_emp['Municipio']
			);
			$empleado 			=	new CatEmpleados($this->dbAdapter);
			$empleado_action=	$empleado->addempleado($formulario);
		}
	}
	$info_emp 	=	array($empleado_action);
	$empleado		=	new JsonModel($info_emp);
	return $empleado;
}

public function infoEmpleadoAction(){
	$this->dbAdapter	=	$this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth							= $this->auth;
	@$identi					= $auth->getStorage()->read();

	$request 		= $this->getRequest();
	if ($request->isPost()) {
		$id 	= $request->getPost();
		$empleado 		=	new CatEmpleados($this->dbAdapter);
		$infoempleado	=	$empleado->infoempleado($id['id']);
	}
	$info_empleado	= array($infoempleado);
	$empleado_info	= new JsonModel($info_empleado);
	return $empleado_info;
}





}
