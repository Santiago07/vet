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
use Administrador\Modelo\Entity\CatPacientes;
use Administrador\Modelo\Entity\CatEspecies;
use Administrador\Modelo\Entity\CatRazas;
use Administrador\Modelo\Entity\CatServicios;
use Administrador\Modelo\Entity\CatUsuarios;

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

		$empleado 	= new CatEmpleados($this->dbAdapter);
		$infoemp		= $empleado->infoempleado($identi->idCat_Empleado);

			return	new ViewModel(array(
				'Usuario'		=>	$identi->NombreUsuario,
				'Empleado'	=>	$infoemp
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
				'NombreCliente'		=>	strtoupper($formulario['NombreCliente']),
				'ApeCliente'			=> 	strtoupper($formulario['ApellidosCliente']),
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
			'NombreCliente'		=>	strtoupper($formulario['NombreCliente']),
			'ApeCliente'			=> 	strtoupper($formulario['ApellidosCliente']),
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
				'NombreEmpleado'		=>	strtoupper($form_emp['NombreEmpleado']),
				'ApeEmpleado'				=>	strtoupper($form_emp['ApellidosEmpleado']),
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
				'NombreEmpleado'		=>	strtoupper($form_emp['NombreEmpleado']),
				'ApeEmpleado'				=>	strtoupper($form_emp['ApellidosEmpleado']),
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

public function catpacientesAction(){
	$this->dbAdapter=$this->getServiceLocator()->get('Zend\Db\Adapter');
	$request = $this->getRequest();
	$auth = $this->auth;
	@$identi=$auth->getStorage()->read();

	$pacientes		= new CatPacientes($this->dbAdapter);
	$allpacientes	= $pacientes->allpacientes();
	$clientes			= new CatClientes($this->dbAdapter);
	$allclientes	= $clientes->clientePaciente();
	$especies			= new CatEspecies($this->dbAdapter);
	$allespecies	= $especies->allespecies();
	$razas				= new CatRazas($this->dbAdapter);
	$allrazas			= $razas->allrazas();

	return	new ViewModel(array(
		'Pacientes'	=> 	$allpacientes,
		'Clientes'	=>	$allclientes,
		'Especies'	=>	$allespecies,
		'Razas'			=>	$allrazas,
		'Usuario'		=>	$identi->NombreUsuario //Envio del nombre de usuario al layout
	));

	$this->layout("layout/layout");
}

public function clientesAction(){
	$this->dbAdapter = $this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth = $this->auth;
	@$identi=$auth->getStorage()->read();

	$clientes			= new CatClientes($this->dbAdapter);
	$allclientes	= $clientes->clientePaciente();

	$all_clie 	=	array($allclientes);
	$clientes		=	new JsonModel($all_clie);
	return $clientes;
}

public function razasAction(){
	$this->dbAdapter = $this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth = $this->auth;
	@$identi=$auth->getStorage()->read();

	$request 		= $this->getRequest();
	if ($request->isPost()) {
	$id 	= $request->getPost();
	$razas					= new CatRazas($this->dbAdapter);
	$especieRazas		= $razas->especiesRazas($id['id']);
	}

	$razasEsp =	array($especieRazas);
	$razas		=	new JsonModel($razasEsp);
	return $razas;
}

public function sendformpacAction(){
	$this->dbAdapter	=	$this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth							= $this->auth;
	@$identi					= $auth->getStorage()->read();

	$request					= $this->getRequest();
	if($request->isPost()) {
		$form_pac 	=	$request->getPost();
		if ($form_pac['paciente_edit']=='1') {
			$formulario = array(
				'idCat_Cliente'		=>	$form_pac['id_cliente'],
				'NombrePaciente'	=>	$form_pac['NombrePaciente'],
				'FechaNacPaciente'=>	$form_pac['FecNacPaciente'],
				'SexoPaciente'		=>	$form_pac['SexoPaciente'],
				'idCat_Especie'		=>	$form_pac['Especie'],
				'idCat_Razas'			=>	$form_pac['Raza'],
				'ColorPaciente'		=>	$form_pac['ColorPaciente'],
				'EstatusPaciente'	=>	$form_pac['EstatusEmpleado']
			);
		$paciente				= new CatPacientes($this->dbAdapter);
		$paciente_action=	$paciente->updatepaciente($formulario, $form_pac['id_paciente']);
		}else {
			$formulario = array(
				'idCat_Cliente'		=>	$form_pac['id_cliente'],
				'NombrePaciente'	=>	$form_pac['NombrePaciente'],
				'FechaNacPaciente'=>	$form_pac['FecNacPaciente'],
				'SexoPaciente'		=>	$form_pac['SexoPaciente'],
				'idCat_Especie'		=>	$form_pac['Especie'],
				'idCat_Razas'			=>	$form_pac['Raza'],
				'ColorPaciente'		=>	$form_emp['ColorPaciente'],
				'EstatusPaciente'	=>	$form_pac['EstatusEmpleado']
			);
			$paciente 			=	new CatPacientes($this->dbAdapter);
			$paciente_action=	$paciente->addpaciente($formulario);
		}
	}
	$info_emp 	=	array($empleado_action);
	$empleado		=	new JsonModel($info_emp);
	return $empleado;
}

public function infoPacienteAction(){
	$this->dbAdapter	=	$this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth							= $this->auth;
	@$identi					= $auth->getStorage()->read();

	$request 		= $this->getRequest();
	if ($request->isPost()) {
		$id 	= $request->getPost();
		$paciente 		=	new CatPacientes($this->dbAdapter);
		$infopaciente	=	$paciente->infopaciente($id['id']);
	}
	$info_paciente	= array($infopaciente);
	$paciente_info	= new JsonModel($info_paciente);
	return $paciente_info;
}

public function catrazasAction(){
	$this->dbAdapter=$this->getServiceLocator()->get('Zend\Db\Adapter');
	$request = $this->getRequest();
	$auth = $this->auth;
	@$identi=$auth->getStorage()->read();

	$especies			= new CatEspecies($this->dbAdapter);
	$allespecies	= $especies->allespecies();
	$razas				= new CatRazas($this->dbAdapter);
	$allrazas			= $razas->allrazas();

	return	new ViewModel(array(
		'Especies'	=>	$allespecies,
		'Razas'			=>	$allrazas,
		'Usuario'		=>	$identi->NombreUsuario //Envio del nombre de usuario al layout
	));

	$this->layout("layout/layout");
}


public function sendformrazaAction(){
	$this->dbAdapter	=	$this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth							= $this->auth;
	@$identi					= $auth->getStorage()->read();

	$request					= $this->getRequest();
	if($request->isPost()) {
		$form_raza 	=	$request->getPost();
		if ($form_raza['raza_edit']=='1') {
			$formulario = array(
				'NombreRaza'		=>	$form_raza['NombreRaza'],
				'idCat_Especie'	=>	$form_raza['Especie'],
				'EstatusRaza'		=>	$form_raza['EstatusRaza']
			);
		$raza				= new CatRazas($this->dbAdapter);
		$raza_action=	$raza->updateraza($formulario, $form_raza['id_raza']);
		}else {
			$formulario = array(
				'NombreRaza'		=>	$form_raza['NombreRaza'],
				'idCat_Especie'	=>	$form_raza['Especie'],
				'EstatusRaza'		=>	$form_raza['EstatusRaza']
			);
			$raza 			=	new CatRazas($this->dbAdapter);
			$raza_action=	$raza->addraza($formulario);
		}
	}
	$info_emp 	=	array($empleado_action);
	$empleado		=	new JsonModel($info_emp);
	return $empleado;
}

public function infoRazasAction(){
	$this->dbAdapter	=	$this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth							= $this->auth;
	@$identi					= $auth->getStorage()->read();

	$request 		= $this->getRequest();
	if ($request->isPost()) {
		$id 	= $request->getPost();
		$raza 		=	new CatRazas($this->dbAdapter);
		$inforaza	=	$raza->inforaza($id['id']);
	}
	$info_raza	= array($inforaza);
	$raza_info	= new JsonModel($info_raza);
	return $raza_info;
}

public function catserviciosAction(){
	$this->dbAdapter=$this->getServiceLocator()->get('Zend\Db\Adapter');
	$request = $this->getRequest();
	$auth = $this->auth;
	@$identi=$auth->getStorage()->read();

	$servicios		= new CatServicios($this->dbAdapter);
	$allservicios	= $servicios->allservicios();

	return	new ViewModel(array(
		'Servicios'	=>	$allservicios,
		'Usuario'		=>	$identi->NombreUsuario //Envio del nombre de usuario al layout
	));

	$this->layout("layout/layout");
}

public function sendformservicioAction(){
	$this->dbAdapter	=	$this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth							= $this->auth;
	@$identi					= $auth->getStorage()->read();

	$request					= $this->getRequest();
	if($request->isPost()) {
		$form_servicio 	=	$request->getPost();
		if ($form_servicio['servicio_edit']=='1') {
			$formulario = array(
				'NombreServicio'		=>	$form_servicio['NombreServicio'],
				'TiempoServicio'		=> 	$form_servicio['TiempoServicio'],
				'UnidadServicio'		=>	$form_servicio['UnidadServicio'],
				'EstatusServicio'		=>	$form_servicio['EstatusServicio']
			);
		$servicios				= new CatServicios($this->dbAdapter);
		$servicios_action	=	$servicios->updateservicio($formulario, $form_servicio['id_servicio']);
		}else {
			$formulario = array(
				'NombreServicio'		=>	$form_servicio['NombreServicio'],
				'TiempoServicio'		=> 	$form_servicio['TiempoServicio'],
				'UnidadServicio'		=>	$form_servicio['UnidadServicio'],
				'EstatusServicio'		=>	$form_servicio['EstatusServicio']
			);
			$servicios 			 =	new CatServicios($this->dbAdapter);
			$servicios_action=	$servicios->addservicio($formulario);
		}
	}
	$info_ser 	=	array($servicios_action);
	$servicio		=	new JsonModel($info_ser);
	return $servicio;
}

public function infoServiciosAction(){
	$this->dbAdapter	=	$this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth							= $this->auth;
	@$identi					= $auth->getStorage()->read();

	$request 		= $this->getRequest();
	if ($request->isPost()) {
		$id 	= $request->getPost();
		$servicios 		=	new CatServicios($this->dbAdapter);
		$infoservicio	=	$servicios->infoservicio($id['id']);
	}
	$info_serv	= array($infoservicio);
	$serv_info	= new JsonModel($info_serv);
	return $serv_info;
}

public function catusuariosAction(){
	$this->dbAdapter=$this->getServiceLocator()->get('Zend\Db\Adapter');
	$request = $this->getRequest();
	$auth = $this->auth;
	@$identi=$auth->getStorage()->read();

	$usuarios			= new CatUsuarios($this->dbAdapter);
	$allusuarios	= $usuarios->allusuarios();

	return	new ViewModel(array(
		'InfUsuario'=>	$allusuarios,
		'Usuario'		=>	$identi->NombreUsuario //Envio del nombre de usuario al layout
	));

	$this->layout("layout/layout");
}

public function empleadosAction(){
	$this->dbAdapter = $this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth = $this->auth;
	@$identi=$auth->getStorage()->read();

	$empleados		=	new CatEmpleados($this->dbAdapter);
	$allempleados	= $empleados->allempleadosact();

	$all_emp=	array($allempleados);
	$emp		=	new JsonModel($all_emp);
	return $emp;
}

public function sendformusrAction(){
	$this->dbAdapter	=	$this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth							= $this->auth;
	@$identi					= $auth->getStorage()->read();

	$request					= $this->getRequest();
	if($request->isPost()) {
		$form_usuario 	=	$request->getPost();
		if ($form_usuario['usuario_edit']=='1') {
			$formulario = array(
				'NombreUsuario'		=>	$form_usuario['NombreUsuario'],
				'PassUsuario'			=>	md5($form_usuario['PassUsuario']),
				'FechaAltaUsuario'=>	$form_usuario['FechaAltaUsuario'],
				'EstatusUsuario'	=>	$form_usuario['EstatusUsuario'],
				'TipoUsuario'			=>	'1',
				'idCat_Empleado'	=>	$form_usuario['id_empleado'],
			);
		$usuarios				= new CatUsuarios($this->dbAdapter);
		$usuarios_action=	$usuarios->updateusuario($formulario, $form_usuario['id_usuario']);
		}else {
			$formulario = array(
				'NombreUsuario'		=>	$form_usuario['NombreUsuario'],
				'PassUsuario'			=>	md5($form_usuario['PassUsuario']),
				'FechaAltaUsuario'=>	$form_usuario['FechaAltaUsuario'],
				'EstatusUsuario'	=>	$form_usuario['EstatusUsuario'],
				'TipoUsuario'			=>	'1',
				'idCat_Empleado'	=>	$form_usuario['id_empleado'],
				'idCat_Cliente'		=>	'2'
			);
			$usuarios 			 =	new CatUsuarios($this->dbAdapter);
			$usuarios_action =	$usuarios->addusuario($formulario);
		}
	}
	$info_ser 	=	array($servicios_action);
	$servicio		=	new JsonModel($info_ser);
	return $servicio;
}

public function infoUsuarioAction(){
	$this->dbAdapter	=	$this->getServiceLocator()->get('Zend\Db\Adapter');
	$auth							= $this->auth;
	@$identi					= $auth->getStorage()->read();

	$request 		= $this->getRequest();
	if ($request->isPost()) {
		$id 	= $request->getPost();
		$usuarios 		=	new CatUsuarios($this->dbAdapter);
		$infousuario	=	$usuarios->infousuario($id['id']);
	}
	$info_usr	= array($infousuario);
	$usr_info	= new JsonModel($info_usr);
	return $usr_info;
}

public function agendaAction(){
	$this->dbAdapter=$this->getServiceLocator()->get('Zend\Db\Adapter');
	$request = $this->getRequest();
	$auth = $this->auth;
	@$identi=$auth->getStorage()->read();

	$usuarios			= new CatUsuarios($this->dbAdapter);
	$allusuarios	= $usuarios->allusuarios();

	return	new ViewModel(array(
		'InfUsuario'=>	$allusuarios,
		'Usuario'		=>	$identi->NombreUsuario //Envio del nombre de usuario al layout
	));

	$this->layout("layout/layout");
}



}
