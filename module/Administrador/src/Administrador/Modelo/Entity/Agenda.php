<?php
namespace Administrador\Modelo\Entity;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Order;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Where;

class Agenda extends TableGateway{

	public function __construct(Adapter $adapter=null, $databaseSchema = null,
	 ResultSet $selectResultPrototype=null){
			return parent::__construct('Agenda', $adapter, $databaseSchema, $selectResultPrototype);
	}



	public function add($agenda = array()){
		$this->insert($agenda);
		$sql 	= $this->getSql();
		$insertar = $sql->insert()->values($agenda);
		$selectString = $sql->getSqlStringForSqlObject($insertar);
		return $selectString;
	}


}
