<?php
namespace Administrador\Modelo\Entity;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Order;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Where;

class CatEspacio extends TableGateway{

	public function __construct(Adapter $adapter=null, $databaseSchema = null,
	 ResultSet $selectResultPrototype=null){
			return parent::__construct('Cat_Espacio', $adapter, $databaseSchema, $selectResultPrototype);
	}

	public function espaciosuc($id){
		$resultSet =	$this->select(function($select) use ($id){
			$select->Where("idCat_Sucursales = ".$id);
		});
		return $resultSet->toArray();
	}

}
