var miApp = angular.module('miApp', []);


miApp.controller('MiControlador', ['$scope','$http', function($scope, $http){
	$scope.loading = true;
	$http.get('http://localhost/repositorio/repositorio-raeveracruz/public/agenda/miagenda/consultar').success(function(data){
		$scope.agenda = data;
		$scope.loading = false;
	});
	// $scope.agenda = [
	// {
	// 	'titulo': 'Visita a Empresa',
	// 	'Hora_Inicio' : '11:00 AM',
	// 	'Hora_Fin' : '12:00 PM'
	// },{
	
	// 'titulo': 'Reunión',
	// 	'Hora_Inicio' : '11:00 AM',
	// 	'Hora_Fin' : '12:00 PM'
	// }
	// ];
}]);




