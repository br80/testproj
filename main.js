var app = angular.module("myApp", []);



app.controller('ClassroomCtrl', ['$scope', '$timeout', function($scope,$timeout)
{
	// Dictionary with game and player variables
	$scope.game = {
		"turn":0,
		"name":"Brady"	
	}
	
	// Array with students
	$scope.students = [
        {
                "name":"Riley",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1
        },
        {
                "name":"Kelly",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1
        },
        {
                "name":"Alex",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1
        },
        {
                "name":"Taylor",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1
        },
        {
                "name":"Morgan",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1
        },
        {
                "name":"Jesse",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1
        }
	];
	
	// Function to return a student entry in the array.
	$scope.getStudent = function(studentName)
	{
		retString = ""
		for (var i = 0 ; i < $scope.students.length ; i++)
		{
			if ($scope.students[i]["name"] == studentName)
				return $scope.students[i];
			else
				retString += $scope.students[i]["name"];
		}
		return retString;
	}
	
	// Generate tooltip text (shows stats)
	$scope.studentTooltip = function(studentName)
	{
		var student = $scope.getStudent(studentName);
		var retString = student["name"];
        retString += "\nMath: " + student["math"];
        retString += "\nReading: " + student["reading"];
        retString += "\nWriting: " + student["writing"];
        retString += "\nDiscipline: " + student["discipline"];
        return retString;
	}
	

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
		if (!$scope.turnActive)
		{
			$scope.turnActive = true;
			$timeout($scope.onActionFinished,1000);
		}
	}
	$scope.onActionFinished = function()
	{
		$scope.game["turn"]++;
		$scope.turnActive = false;
	}
	

	



	// Util Functions
	$scope.RandomRange = function(num1, num2)
	{
		return Math.floor(Math.random() * num2) + num1;
	}
}]);





