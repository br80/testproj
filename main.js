var app = angular.module("myApp", []);

app.directive("superman", function() {
    return {
        restrict: "E",
        template: "<div>Here I am to save the day</div>"
    }
})


function Main($scope)
{
    $scope.message = "Hello!"

}

app.directive('tooltip', function () {
    return {
        restrict:'AEC',
        link: function(scope, element, attrs)
        {
            $(element)
                .attr('title',scope.$eval(attrs.tooltip))
                .tooltip({placement: "right"});
        }
    }
})


$scope.clear = function () {
    $scope.dt = null;
};


function ClassroomCtrl($scope,$timeout)
{
	// Dictionary with game and player variables
	$scope.game = {
		"turn":0,
		"name":"Brady"	
	}
	
	// Array with students
	$scope.students = [
        {
                "name":"Riley"
        },
        {
                "name":"Kelly"
        },
        {
                "name":"Alex"
        },
        {
                "name":"Taylor"
        },
        {
                "name":"Morgan"
        },
        {
                "name":"Jesse"
        }
	];
	

	// Game Time functions
	$scope.getTime = function()
	{
		if ($scope.game["turn"] % 2 == 0)
		{
			return "Morning";
		}
		else
		{
			return "Afternoon";
		}
	}
	$scope.getDay = function()
	{
		return Math.floor($scope.game["turn"] / 2 + 1);
	}


	// Action functions
	$scope.turnActive = false;  // This is true when a turn is taking place
	$scope.takeTurn = function()
	{
		$scope.game["turn"]++;
		$scope.turnActive = true;
		$timeout($scope.onActionFinished,1000);	
	}
	$scope.onActionFinished = function()
	{
		$scope.turnActive = false;
	}
	

	



	// Util Functions
	$scope.RandomRange = function(num1, num2)
	{
		return Math.floor(Math.random() * num2) + num1;
	}
}
