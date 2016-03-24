(function() {

	var app = angular.module("githubViewer"); //Pega a referencia do modulo criado em app.js

	 //Uma boa prática é separar os controllers em .js diferentes, como e maincontroller.js
	var MainController = function($scope, $interval, $location) {
		/*
		var person = {
			firstName: "Bruno",
			lastName: "Sanches",
			imageSrc: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/p50x50/12645050_1086303261401720_6842888450693552300_n.jpg?oh=f88339def32ad683b37c4aac85f637d8&oe=5784186F&__gda__=1469469922_99fc8a715459b565a3d6ebf7e5c48c17"
		};
		*/
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
			//E necessario colocar o $log nos parametros do Controller (services)
			//$log.info("Buscando por: " + username);

			if(countdownInterval) {
				$interval.cancel(countdownInterval);
				$scope.countdown = null;
			}

			//
		};

		$scope.username = "nevasca";		
		$scope.countdown = 5;
		startCountdown();
		//$scope.person = person;
	};

	app.controller("MainController", MainController); //Informa o nome de um controller e a função dele

}());