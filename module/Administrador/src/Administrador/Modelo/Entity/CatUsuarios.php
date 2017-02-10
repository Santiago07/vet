<?php
namespace Administrador\Modelo\Entity;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Order;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Where;

class CatUsuarios extends TableGateway{

	public function __construct(Adapter $adapter=null, $databaseSchema = null,
	 ResultSet $selectResultPrototype=null){
			return parent::__construct('Cat_Usuarios', $adapter, $databaseSchema, $selectResultPrototype);
	}

	public function allusuarios(){
		$resultSet =	$this->select(function($select){
			$select->Join("Cat_Empleado", "Cat_Usuarios.idCat_Empleado = Cat_Empleado.idCat_Empleado", array("NombreEmpleado" => "NombreEmpleado", "ApeEmpleado" => "ApeEmpleado"));
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
