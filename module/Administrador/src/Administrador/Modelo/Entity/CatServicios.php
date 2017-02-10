<?php
namespace Administrador\Modelo\Entity;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Order;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Where;

class CatServicios extends TableGateway{

	public function __construct(Adapter $adapter=null, $databaseSchema = null,
	 ResultSet $selectResultPrototype=null){
			return parent::__construct('Cat_Servicio', $adapter, $databaseSchema, $selectResultPrototype);
	}


	public function allservicios(){
		$resultSet =	$this->select(function($select){
		});
		return $resultSet->toArray();
	}

	public function addservicio($servicio = array()){
		$this->insert($servicio);
		$sql 	= $this->getSql();
		$insertar = $sql->insert()->values($servicio);
		$selectString = $sql->getSqlStringForSqlObject($insertar);
		return $selectString;
	}

	public function infoservicio($id){
		$resultSet = $this->select(function($select) use ($id){
			$select->Where("idCat_Servicio = ".$id);
		});
		return $resultSet->toArray();
	}

	public function updateservicio($update = array(),$id){
		$this->update($update, array('idCat_Servicio' => $id));
		$sql					=	$this->getSql();
		$update_data	=	$sql->update()->set($update);
		$selectString = $sql->getSqlStringForSqlObject($update_data);
		return $selectString;
	}
}
