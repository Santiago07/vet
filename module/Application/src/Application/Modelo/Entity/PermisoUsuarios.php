<?php
namespace Application\Modelo\Entity;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Order;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Where;

class PermisoUsuarios extends TableGateway{
	public function __construct(Adapter $adapter=null, $databaseSchema = null,
	 ResultSet $selectResultPrototype=null){
			return parent::__construct('Permiso_Usuarios', $adapter, $databaseSchema, $selectResultPrototype);
	}


	//Santiago 25/01/17	Obtener los permisos del usuario
	public function permiso_usuario($id){
		$resultSet	=	$this->select(function ($select) use ($id){
		$select->join("Cat_Permiso", "Permiso_Usuarios.idCat_Permiso = Cat_Permiso.idCat_Permiso", array("ClavePermiso"));
		$select->where("Permiso_Usuarios.idCat_Usuarios = $id");
		});
		return $resultSet->toArray();
	}


}
