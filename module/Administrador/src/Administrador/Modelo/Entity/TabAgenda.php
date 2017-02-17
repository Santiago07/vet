<?php
namespace Administrador\Modelo\Entity;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Order;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Where;

class TabAgenda extends TableGateway{

	public function __construct(Adapter $adapter=null, $databaseSchema = null,
	 ResultSet $selectResultPrototype=null){
			return parent::__construct('Tab_Agenda', $adapter, $databaseSchema, $selectResultPrototype);
	}


	public function allcitas(){
		$resultSet =	$this->select(function($select){
			$select->Join("Cat_Cliente", "Tab_Agenda.idCat_Cliente = Cat_Cliente.idCat_Cliente",  array("NombreCliente" => "NombreCliente", "ApeCliente" => "ApeCliente" ));
			$select->Join("Cat_Paciente", "Tab_Agenda.idCat_Paciente =  Cat_Paciente.idCat_Paciente",  array("NombrePaciente" => "NombrePaciente"));
			$select->Join("Cat_Sucursales", "Tab_Agenda.idCat_Sucursales = Cat_Sucursales.idCat_Sucursales", array("NombreSucursal" => "NombreSucursal"));
			$select->Join("Cat_Espacio", "Tab_Agenda.idCat_Espacio = Cat_Espacio.idCat_Espacio",  array("NombreEspacio" => "NombreEspacio"));
			$select->Join("Cat_Servicio", "Tab_Agenda.idCat_Servicio = Cat_Servicio.idCat_Servicio", array("NombreServicio" => "NombreServicio"));
			$select->Join(array("usr_destino"=>"Cat_Usuarios"), "Tab_Agenda.idCat_UsuariosDestino = usr_destino.idCat_Usuarios", array("idCat_Empleado1" => "idCat_Empleado"));
			$select->Join(array("emp_destino"=>"Cat_Empleado"), "usr_destino.idCat_Empleado = emp_destino.idCat_Empleado", array("NombreEmpleadoDestino" => "NombreEmpleado", "ApeDestino" => "ApeEmpleado"));
			$select->Join(array("usr_crea"=>"Cat_Usuarios"), "Tab_Agenda.idCat_UsuariosCrea = usr_crea.idCat_Usuarios", array("idCat_Empleado"));
			$select->Join(array("emp_crea"=>"Cat_Empleado"), "Tab_Agenda.idCat_UsuariosCrea = emp_crea.idCat_Empleado", array("NombreEmpleadoCrea"=>"NombreEmpleado", "ApellidoCrea"=>"ApeEmpleado"));
			$select->Where("EstatusAgenda = '1' ");

		});
		return $resultSet->toArray();
	}
	public function addAgenda($agenda = array()){
		$this->insert($agenda);
		$sql 	= $this->getSql();
		$insertar = $sql->insert()->values($agenda);
		$selectString = $sql->getSqlStringForSqlObject($insertar);
		return $selectString;
	}

		public function infocita($id){
			$resultSet =	$this->select(function($select) use ($id){
				$select->Join("Cat_Cliente", "Tab_Agenda.idCat_Cliente = Cat_Cliente.idCat_Cliente",  array("NombreCliente" => "NombreCliente", "ApeCliente" => "ApeCliente" ));
				$select->Join("Cat_Paciente", "Tab_Agenda.idCat_Paciente =  Cat_Paciente.idCat_Paciente",  array("NombrePaciente" => "NombrePaciente"));
				$select->Join("Cat_Sucursales", "Tab_Agenda.idCat_Sucursales = Cat_Sucursales.idCat_Sucursales", array("NombreSucursal" => "NombreSucursal"));
				$select->Join("Cat_Espacio", "Tab_Agenda.idCat_Espacio = Cat_Espacio.idCat_Espacio",  array("NombreEspacio" => "NombreEspacio"));
				$select->Join("Cat_Servicio", "Tab_Agenda.idCat_Servicio = Cat_Servicio.idCat_Servicio", array("NombreServicio" => "NombreServicio"));
				$select->Join(array("usr_destino"=>"Cat_Usuarios"), "Tab_Agenda.idCat_UsuariosDestino = usr_destino.idCat_Usuarios", array("idCat_Empleado1" => "idCat_Empleado"));
				$select->Join(array("emp_destino"=>"Cat_Empleado"), "usr_destino.idCat_Empleado = emp_destino.idCat_Empleado", array("NombreEmpleadoDestino" => "NombreEmpleado", "ApeDestino" => "ApeEmpleado"));
				$select->Join(array("usr_crea"=>"Cat_Usuarios"), "Tab_Agenda.idCat_UsuariosCrea = usr_crea.idCat_Usuarios", array("idCat_Empleado"));
				$select->Join(array("emp_crea"=>"Cat_Empleado"), "Tab_Agenda.idCat_UsuariosCrea = emp_crea.idCat_Empleado", array("NombreEmpleadoCrea"=>"NombreEmpleado", "ApellidoCrea"=>"ApeEmpleado"));
				$select->Where("idTab_Agenda = ".$id);

			});
			return $resultSet->toArray();
		}

}
