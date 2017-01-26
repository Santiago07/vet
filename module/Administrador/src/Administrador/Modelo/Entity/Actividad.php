<?php
namespace Administrador\Modelo\Entity;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Order;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Where;

class Actividad extends TableGateway{

	public function __construct(Adapter $adapter=null, $databaseSchema = null,
	 ResultSet $selectResultPrototype=null){
			return parent::__construct('cat_actividades', $adapter, $databaseSchema, $selectResultPrototype);
	}
	
	// Luis 08/04/2016
	public function getActivities($idAct){
		$resultSet = $this->select ( function ($select)use($idAct) {
			$select->columns(array("idactividades","actividad","activo"));
			$select->where(array("idactividades = $idAct"));			
		});
		return $resultSet->toArray();
	} 

	// Luis 07/04/2016
	public function insert_new($datos=array()){
		$this->insert($datos);
	}

	//Luis 07/04/2016
	public function update_all($datos=array(),$id){
		$this->update($datos,array('idactividades'=>$id));
		$sql = $this->getSql();
		$update = $sql->update();
		$update->set($datos);
		$selectString = $sql->getSqlStringForSqlObject($update);
		return $selectString;
	}

	public function getActDefault(){
		$resultSet = $this->select (function ($select){
			$select->columns(array("idactividades","actividad","activo"));
			$select->where(array("idactividades = $idAct"));			
		});
		return $resultSet->toArray();
	}
	
}