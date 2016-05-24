
angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
	$scope.usuario1 = {
		nome: 'Jon Snow',
		end: {
			regiao: 'Norte',
			lugar: "Muralha"
		},
		amigos: [
			"Sansa",
			"Samwell",
			"Tormund",
			"Davos"
		]
	}

	$scope.usuario2 = {
		nome: 'Sansa Stark',
		end: {
			regiao: 'Norte',
			lugar: "Muralha"
		},
		amigos: [
			"Brienne",
			"Jon"			
		]
	}	
});

//Registra um novo directive no modulo
//Usar algum prefixo em producao, por exemplo gotUserInfoCard (got-user-info-card)
angular.module('app').directive('userInfoCard', function() {
	return {
		//template: "String com todo o codigo"
		templateUrl: "userInfoCard.html", //Url do template em arquivo separado
		restrict: "E", //'A' = atributo (<div nome-directive></div>) || 'E' = elemento (<nome-directive></nome-directive>)
		//replace: true //Substitui o elemento personalizado pelo conteudo do template. Ter um elemento html, como div, envolvendo o conteudo
		//scope: true, //Herda o scope. O que for criado no scope da directive, fica so na directive
		scope: { //Scope isolado
			usuario: '=', //Recebe um objeto como parametro no html
			initialCollapsed: '@collapsed' //Recebe um valor do parametro chamado collapsed
		}, 
		controller: function($scope) {
			$scope.collapsed = ($scope.initialCollapsed === 'true'); //Transforma em boolean

			$scope.matarPersonagem = function(usuario) {
				usuario.status = "Morto";
			}

			$scope.collapse = function() {
				$scope.collapsed = !$scope.collapsed;
			}

			$scope.removerAmigo = function(amigo) {		
				var ind = $scope.usuario.amigos.indexOf(amigo);
				
				if(ind > -1) {
					$scope.usuario.amigos.splice(ind, 1);
				}
			}		
		}
	}
});

angular.module('app').directive('removeAmigo', function() {
	return {
		templateUrl: "removeAmigo.html",
		restrict: "E",
		scope: {
			notificarParent: '&metodo' //Recebe uma funcao
		},
		controller: function($scope) {

			$scope.removendo = false;

			$scope.iniciarRemover = function() {		
				$scope.removendo = true;
			}	

			$scope.cancelarRemover = function() {		
				$scope.removendo = false;
			}

			$scope.confirmarRemover = function() {
				$scope.notificarParent();
			}

		}
	}
});