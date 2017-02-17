<?php
namespace Administrador\Modelo\Entity;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Order;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Where;

class CatPacientes extends TableGateway{

	public function __construct(Adapter $adapter=null, $databaseSchema = null,
	 ResultSet $selectResultPrototype=null){
			return parent::__construct('Cat_Paciente', $adapter, $databaseSchema, $selectResultPrototype);
	}

	public function allpacientes(){
		$resultSet =	$this->select(function($select){
			$select->join("Cat_Cliente", "Cat_Paciente.idCat_Cliente = Cat_Cliente.idCat_Cliente",array("Nombre"=>"NombreCliente", "Apellidos" => "ApeCliente"));
			$select->join("Cat_Especie", "Cat_Paciente.idCat_Especie = Cat_Especie.idCat_Especie", array("Especie" => "NombreEspecie"));
			$select->join("Cat_Razas", "Cat_Paciente.idCat_Razas = Cat_Razas.idCat_Razas", array("Raza"=>"NombreRaza"));
		});
		return $resultSet->toArray();
	}

	public function addpaciente($cliente = array()){
		$this->insert($cliente);
		$sql 	= $this->getSql();
		$insertar = $sql->insert()->values($cliente);
		$selectString = $sql->getSqlStringForSqlObject($insertar);
		return $selectString;
	}

	public function infopaciente($id){
		$resultSet = $this->select(function($select) use ($id){
			$select->JOIN("Cat_Cliente","Cat_Paciente.idCat_Cliente = Cat_Cliente.idCat_Cliente", array("NombreCliente" =>"NombreCliente", "ApeCliente"=>"ApeCliente"));
			$select->where('idCat_Paciente = '.$id);
		});
		return $resultSet->toArray();
	}

	public function updatepaciente($update = array(),$id){
		$this->update($update, array('idCat_Paciente' => $id));
		$sql					=	$this->getSql();
		$update_data	=	$sql->update()->set($update);
		$selectString = $sql->getSqlStringForSqlObject($update_data);
		return $selectString;
	}

	public function paciente($id){
		$resultSet = $this->select(function($select) use ($id){
			$select->where('idCat_Cliente = '.$id);
		});
		return $resultSet->toArray();
	}

}
