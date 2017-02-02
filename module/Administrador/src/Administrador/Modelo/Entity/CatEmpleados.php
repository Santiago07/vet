<?php
namespace Administrador\Modelo\Entity;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Order;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Where;

class CatEmpleados extends TableGateway{

	public function __construct(Adapter $adapter=null, $databaseSchema = null,
	 ResultSet $selectResultPrototype=null){
			return parent::__construct('Cat_Empleado', $adapter, $databaseSchema, $selectResultPrototype);
	}

	public function allempleados(){
		$resultSet =	$this->select(function($select){
			$select->Join("Cat_Sucursales","Cat_Empleado.idCat_Sucursales = Cat_Sucursales.idCat_Sucursales",array("NombreSucursal"=>"NombreSucursal"));
		});
		return $resultSet->toArray();
	}

	public function addempleado($cliente = array()){
		$this->insert($cliente);
		$sql 	= $this->getSql();
		$insertar = $sql->insert()->values($cliente);
		$selectString = $sql->getSqlStringForSqlObject($insertar);
		return $selectString;
	}

	public function infoempleado($id){
		$resultSet = $this->select(function($select) use ($id){
			$select->where('idCat_Empleado = '.$id);
		});
		return $resultSet->toArray();
	}

	public function updateempleado($update = array(),$id){
		$this->update($update, array('idCat_Empleado' => $id));
		$sql					=	$this->getSql();
		$update_data	=	$sql->update()->set($update);
		$selectString = $sql->getSqlStringForSqlObject($update_data);
		return $selectString;
	}


}
