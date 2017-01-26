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

use Administrador\Modelo\Entity\Persona;
use Administrador\Modelo\Entity\Estados;
use Administrador\Modelo\Entity\Genero;
use Administrador\Modelo\Entity\Edcivil;
use Administrador\Modelo\Entity\Municipio;
use Administrador\Modelo\Entity\Tipo;
use Application\Modelo\Entity\Usuario;
use Administrador\Modelo\Entity\Actividad;
use Administrador\Modelo\Entity\Usuarioactividad;

use Seguimiento\Modelo\Entity\Seguimiento;

//Santiago 2/12/16
use Reportes\Modelo\Entity\Catusuarios;
use Catalogo\Modelo\Entity\Catmunicipio;
use Catalogo\Modelo\Entity\Catentidad;
use Catalogo\Modelo\Entity\Catempleados;


// use Administrador\Modelo\Entity\Categorias;
use Zend\Mail;
use Zend\Mime\Part as MimePart;
use Zend\Mime\Message as MimeMessage;

// use Zend\Mail\Message;
// use Zend\Mail\Transport\Smtp as SmtpTransport;
// use Zend\Mail\Transport\SmtpOptions;

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

  // Luis 04/04/2016
  public function indexAction(){
		// $this->dbAdapter = $this->getServiceLocator()->get('Zend\Db\Adapter');
		// $auth = $this->auth;
		// @$identi=$auth->getStorage()->read();
		// //echo var_dump($identi);
		// if ($identi!=true || $identi->Inic!=1){
		// 	return $this->redirect()->toUrl($this->getRequest()->getBaseUrl().'/administrador/index/logout');
		// }
			//$empledo_id = new Catempleados($this->dbAdapter);
			//$empleado 	= $empledo_id->infoempleado($identi->emp_clave);

	// echo var_dump($identi);
      //$this->menuspermisos($identi);
      //$layout = new ViewModel(array(
        // 'Estados'		=>"generos",
        // 'Usuarios'	=>$identi->usuario,
				// 'Empleado'	=>$empleado
        // ));

      $this->layout('layout/layout');
      // $this->layout('layout/layout');
      return $layout;

  }


  public function logoutAction(){
      $this->dbAdapter = $this->getServiceLocator()->get('Zend\Db\Adapter');
      $this->auth->clearIdentity();
      return $this->redirect()->toUrl($this->getRequest()->getBaseUrl().'/');
  }

  // Luis 03/08/2016
	public function menuspermisos($identi){
		 $seg_pend 			= new Seguimiento($this->dbAdapter);
		 $usuario 				= $identi->id_usuario;
		 // $count_seg_pend = $seg_pend->seg_pend($usuario);
		 // $this->layout()->identi=$count_seg_pend;
		 $this->layout()->SeccionReportes=$identi->menu_report;
		 $this->layout()->SeccionCatalogos=$identi->menu_cata;
		 $this->layout()->SeccionSeguimiento=$identi->menu_seg;
		 // Secciones de los reportes
		 $this->layout()->Rep_Producto=$identi->ver_report_fact;
		 $this->layout()->Rep_Facturas=$identi->ver_report_prod;
		 // Secciones de los Catalogos
		 $this->layout()->Cat_Clie=$identi->ver_cata_clientes;
		 $this->layout()->Cat_Area=$identi->ver_cata_areas;
		 $this->layout()->Cat_Banc=$identi->ver_cata_banc;
		 $this->layout()->Cat_UMed=$identi->ver_cata_uMedida;
		 $this->layout()->Cat_Sect=$identi->ver_cata_sect;
		 $this->layout()->Cat_User=$identi->ver_cata_user;
		 $this->layout()->Cat_Psto=$identi->ver_cata_puest;
		 $this->layout()->Cat_Muni=$identi->ver_cata_mun;
		 $this->layout()->Cat_Loca=$identi->ver_cata_loc;
		 $this->layout()->Cat_Cotc=$identi->ver_cata_contc;
		 $this->layout()->Cat_Sucr=$identi->ver_cata_sucr;
		 $this->layout()->Cat_Prdd=$identi->ver_cata_propdds;
		 $this->layout()->Cat_Epls=$identi->ver_cata_emplds;
		 $this->layout()->Cat_Lins=$identi->ver_cata_lins;
		 $this->layout()->Cat_Prvd=$identi->ver_cata_provdr;
		 $this->layout()->Cat_PdTr=$identi->ver_cata_prodterm;
		 // Secciones de seguimientos
		 $this->layout()->Seg_nuevo=$identi->ver_seg_nuevo;
		 $this->layout()->Seg_pendientes=$identi->ver_seg_pendiente;

 }

 public function editarAction(){
		 $this->dbAdapter = $this->getServiceLocator()->get('Zend\Db\Adapter');
		 $auth = $this->auth;
		 @$identi=$auth->getStorage()->read();
		 if ($identi!=true || $identi->Inic!=1){
			 return $this->redirect()->toUrl($this->getRequest()->getBaseUrl().'/administrador/index/logout');
		 }

		 $this->menuspermisos($identi);

		 $info_usr 		= new Catusuarios($this->dbAdapter);
		 $info_user 	= $info_usr->getallinfo($identi->id_usuario);
		 $all_entidad = new Catentidad($this->dbAdapter);
		 $entidad 		= $all_entidad->getAll();
		 $all_muni		= new Catmunicipio($this->dbAdapter);
		 $muni 				= $all_muni->getAllMunicipios();

		 $layout = new ViewModel(array(
			 'Estados'	=>$identi->id_usuario,
			 'Usuarios'	=>$identi->usuario,
			 'Nombre'		=>$identi->nombre,
			 'Apellidos'=>$identi->apellidos,
			 'all'			=>$info_user,
			 'municipio'=>$muni,
			 'estado'		=>$entidad
			 ));
		 $this->layout('layout/layoutprueba');
		 return $layout;

 }


 public function getmunicipiosAction(){
	 $this->dbAdapter=$this->getServiceLocator()->get('Zend\Db\Adapter');
	 $request = $this->getRequest();
	 $cat_municipio = new Catmunicipio($this->dbAdapter);
	 if (!$request->isPost()){
	 return $this->redirect()->toUrl($this->getRequest()->getBaseUrl().'/administrador/index/logout');
 }
	 if($request->isPost()){
		 $info= $request->getPost();
		 $cat_municipio = $cat_municipio->getRelativeFederative($info['identy']);
	 }
	 $arreglo=array($cat_municipio);
	 $result = new JsonModel($arreglo);
	 return $result;
 }

 public function editempleadoAction(){
	$this->dbAdapter=$this->getServiceLocator()->get('Zend\Db\Adapter');
	$request = $this->getRequest();
	$mensaje = 'Fuera de la funcionalidad';
	$auth = $this->auth;
	@$identi=$auth->getStorage()->read();

	if($request->isPost()){
		$update_emp = new Catempleados($this->dbAdapter);
		$info= $request->getPost();
		//var_dump($info);
		$con_reg = count($info);
		if ($con_reg == '11') {
			$datos_act = array(
				'emp_nombre' 		=> $info['nombre_usr'] ,
				'emp_apat' 			=> $info['emp_apat'] ,
				'emp_amat' 			=> $info['emp_amat'] ,
				'emp_email' 		=> $info['emp_email'] ,
				'emp_cel' 			=> $info['emp_cel'] ,
				'emp_tel' 			=> $info['emp_tel'] ,
				'emp_calle_no' 	=> $info['emp_calle_no'] ,
				'emp_colonia' 	=> $info['emp_colonia'] ,
				'ef_clave' 			=> $info['ef_clave'] ,
				'emp_fec_nac' 	=> $info['emp_fec_nac'] ,
			);
					$update_emp->update_all($datos_act,$info['emp_clave']);
					$mensaje = "Actualizado";
		}else {

			$datos_act = array(
				'emp_nombre' 		=> $info['nombre_usr'] ,
				'emp_apat' 			=> $info['emp_apat'] ,
				'emp_amat' 			=> $info['emp_amat'] ,
				'emp_email' 		=> $info['emp_email'] ,
				'emp_cel' 			=> $info['emp_cel'] ,
				'emp_tel' 			=> $info['emp_tel'] ,
				'emp_calle_no' 	=> $info['emp_calle_no'] ,
				'emp_colonia' 	=> $info['emp_colonia'] ,
				'ef_clave' 			=> $info['ef_clave'] ,
				'emp_fec_nac' 	=> $info['emp_fec_nac'] ,
				'mun_clave'			=> $info['mun_clave']
			);
					$update_emp->update_all($datos_act,$info['emp_clave']);
					$mensaje = "Actualizado";
		}

	}
	$arreglo=array("mensaje" => $mensaje);
	$result = new JsonModel($arreglo);
	return $result;
 }

 public function passchangeAction(){
  $this->dbAdapter=$this->getServiceLocator()->get('Zend\Db\Adapter');
  $request = $this->getRequest();
  $mensaje = 'Fuera de la funcionalidad';
  $auth = $this->auth;
  @$identi=$auth->getStorage()->read();

  if($request->isPost()){
 	 $update_pass = new Catusuarios($this->dbAdapter);
 	 $info= $request->getPost();
 	 // var_dump($info);
	 $pass_new= array('usr_pass' => md5($info['pass']));
	 $update_pass->pass($pass_new,$info['id_usr']);
  }
  $arreglo=array("mensaje" => $mensaje);
  $result = new JsonModel($arreglo);
  return $result;
 }




}
