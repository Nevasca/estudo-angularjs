(function(){

	angular
		.module("common.services")
		.factory("produtoResource", ["$resource", produtoResource]); 
		//Colocando um array com o nome dos parametros e a funcao, voce assegura que, ao minificar o script, funcionara corretamente	

	function produtoResource($resource) {
		return $resource("/api/produtos/:produtoId"); //Retorna um objeto resource para ser utilizado na obtenção de dados do backend webservice
	}

}());