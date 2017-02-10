<?php
namespace Administrador\Modelo\Entity;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Order;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Where;

class CatRazas extends TableGateway{

	public function __construct(Adapter $adapter=null, $databaseSchema = null,
	 ResultSet $selectResultPrototype=null){
			return parent::__construct('Cat_Razas', $adapter, $databaseSchema, $selectResultPrototype);
	}

	public function especiesRazas($id){
		$resultSet =	$this->select(function($select) use ($id){
			$select->Where('idCat_Especie = '.$id);
		});
		return $resultSet->toArray();
	}

	public function allrazas(){
		$resultSet =	$this->select(function($select){
			$select->Join("Cat_Especie", "Cat_Razas.idCat_Especie = Cat_Especie.idCat_Especie", array("NombreEspecie"=>"NombreEspecie"));
		});
		return $resultSet->toArray();
	}

	public function addraza($raza = array()){
		$this->insert($raza);
		$sql 	= $this->getSql();
		$insertar = $sql->insert()->values($raza);
		$selectString = $sql->getSqlStringForSqlObject($insertar);
		return $selectString;
	}

	public function inforaza($id){
		$resultSet = $this->select(function($select) use ($id){
			$select->Join("Cat_Especie","Cat_Razas.idCat_Especie = Cat_Especie.idCat_Especie", array("NombreEspecie"=>"NombreEspecie","idCat_Especie"=>"idCat_Especie"));
			$select->Where("idCat_Razas = ".$id);
		});
		return $resultSet->toArray();
	}

	public function updateraza($update = array(),$id){
		$this->update($update, array('idCat_Razas' => $id));
		$sql					=	$this->getSql();
		$update_data	=	$sql->update()->set($update);
		$selectString = $sql->getSqlStringForSqlObject($update_data);
		return $selectString;
	}
}
