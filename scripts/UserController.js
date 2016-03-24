(function() {

	var app = angular.module("githubViewer"); //Pega a referencia do modulo criado em app.js

	 //Uma boa prática é separar os controllers em .js diferentes, como e maincontroller.js
	var MainController = function($scope, github, $interval, $log, $anchorScroll, $location) {
		/*
		var person = {
			firstName: "Bruno",
			lastName: "Sanches",
			imageSrc: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/p50x50/12645050_1086303261401720_6842888450693552300_n.jpg?oh=f88339def32ad683b37c4aac85f637d8&oe=5784186F&__gda__=1469469922_99fc8a715459b565a3d6ebf7e5c48c17"
		};
		*/		

		var onUserComplete = function(data) {
			$scope.user = data; //O Angular converte automaticamente JSON para objeto javascript
			$scope.error = "";
			github.getRepos($scope.user).then(onRepos, onError);
		};

		var onRepos = function(data) {
			$scope.repos = data;
			$location.hash("userDetails");
			$anchorScroll();
		};

		var onError = function(reason) {
			$scope.error = "Não foi possível consultar os dados.";
		};

		var decrementCountdown = function() {
			$scope.countdown--;
			if($scope.countdown < 1) {
				$scope.search($scope.username);
			};
		};

		var countdownInterval = null;
		var startCountdown = function() {
			countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
		};

		$scope.search = function(username) {
			$log.info("Buscando por: " + username);
			//Faz uma requisição ao servidor e quando for atendida, chamar a primeira função (caso sucesso) ou a segunda função (caso erro)
			github.getUser(username).then(onUserComplete, onError);
			if(countdownInterval) {
				$interval.cancel(countdownInterval);
				$scope.countdown = null;
			}
		};

		$scope.username = "nevasca";
		$scope.message = "Github Viewer";
		$scope.reposOrderBy = "-stargazers_count";
		$scope.countdown = 5;
		startCountdown();
		//$scope.person = person;
	};

	app.controller("MainController", MainController); //Informa o nome de um controller e a função dele

}());