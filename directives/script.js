
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
	};

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
	};

	$scope.handlePause = function(e) {
		console.log("Video foi pausado");
	}

	$scope.data = {message: "Não fui clicado"};
	$scope.clickHandler = function(p) {
		p.message = "Eu fui clicado";
	}

	$scope.size = 150;
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

//Decorator Directives -----------------------------------------
//Quando o usuario aperta a barra de espaco, pausa ou reproduz o video
angular.module('app').directive('spacebarSupport', function() {
	return {
		restrict: "A",
		link: function(scope, el, attrs) { //el = elemento que esta o atributo, attrs = array de atributos do elemento
			$("body").on("keypress", function(evt) {
				var vidEl = el[0]; //Pega o elemento sem ser JQuery
				if(evt.keyCode === 32) {//Espaco
					if(vidEl.paused) {
						vidEl.play();
					}
					else {
						vidEl.pause();
					}
				}
			});
		}
	}
});

//Chama uma funcao quando o video e pausado
angular.module("app").directive("eventPause", function($parse) {
	return {
		restrict: "A",	
		link: function(scope, el, attrs) {
			var fn = $parse(attrs["eventPause"]); //Pega a referencia da funcao da string
			el.on("pause", function(event) {
				scope.$apply(function() { //Quando o evento nao e conhecido pelo Angular, como evento HTML, precisa desse apply para atualizar o binding
					fn(scope, {evt: event});;
				});
			});
		}
	}
});

//Chama uma funcao quando o elemento e clicado
angular.module("app").directive("myClick", function($parse) {
	return {
		link: function(scope, el, attrs) {
			var fn = $parse(attrs["myClick"]);
			el.on("click", function() {
				scope.$apply(function() {
					fn(scope);
				});
			});
		}
	}
});

//Muda o tamanho da fonte
angular.module("app").directive("fontScale", function() {
	return {
		link: function(scope, el, attrs) {
			scope.$watch(attrs["fontScale"], function(newVal, oldVal) {
				el.css("font-size", newVal + "%");
			});
		}
	}
});