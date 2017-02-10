<?php
namespace Administrador\Modelo\Entity;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Order;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Where;

class CatClientes extends TableGateway{

	public function __construct(Adapter $adapter=null, $databaseSchema = null,
	 ResultSet $selectResultPrototype=null){
			return parent::__construct('Cat_Cliente', $adapter, $databaseSchema, $selectResultPrototype);
	}

	public function allclientes(){
		$resultSet =	$this->select(function($select){
			$select->Where("idCat_Cliente != '2'");
		});
		return $resultSet->toArray();
	}

	public function addcliente($cliente = array()){
		$this->insert($cliente);
		$sql 	= $this->getSql();
		$insertar = $sql->insert()->values($cliente);
		$selectString = $sql->getSqlStringForSqlObject($insertar);
		return $selectString;
	}

	public function infocliente($id){
		$resultSet = $this->select(function($select) use ($id){
			$select->where('idCat_Cliente = '.$id);
		});
		return $resultSet->toArray();
	}

	public function updatecliente($update = array(),$id){
		$this->update($update, array('idCat_Cliente' => $id));
		$sql					=	$this->getSql();
		$update_data	=	$sql->update()->set($update);
		$selectString = $sql->getSqlStringForSqlObject($update_data);
		return $selectString;
	}

	public function clientePaciente(){
		$resultSet = $this->select(function($select){
			$select->columns(array("idCat_Cliente"=>"idCat_Cliente", "Nombre"=>"NombreCliente", "Apellidos"=>"ApeCliente"));
		});
		return $resultSet->toArray();
	}


}
