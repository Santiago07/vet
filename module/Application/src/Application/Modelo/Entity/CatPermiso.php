<?php
namespace Application\Modelo\Entity;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Order;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Where;

class CatPermiso extends TableGateway{
	public function __construct(Adapter $adapter=null, $databaseSchema = null,
	 ResultSet $selectResultPrototype=null){
			return parent::__construct('Cat_Permiso', $adapter, $databaseSchema, $selectResultPrototype);
	}


	public function allpermisos(){
		$resultSet = $this->select(function ($select) {
		});
		return $resultSet->toArray();
	}

}
