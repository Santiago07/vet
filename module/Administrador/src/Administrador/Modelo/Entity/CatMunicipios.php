<?php
namespace Administrador\Modelo\Entity;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Order;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Where;

class CatMunicipios extends TableGateway{

	public function __construct(Adapter $adapter=null, $databaseSchema = null,
	 ResultSet $selectResultPrototype=null){
			return parent::__construct('Cat_Municipio', $adapter, $databaseSchema, $selectResultPrototype);
	}

	public function allmunicipiosedo($id){
		$resultSet =	$this->select(function($select) use ($id){
			$select->Where('idCat_Estados = '.$id);
			$select->Order("NombreMunicipio ASC");
		});
		return $resultSet->toArray();
	}

	public function allmunicipios(){
		$resultSet = $this->select(function($select){
		});
		return $resultSet->toArray();
	}

}
