var app = angular.module("myApp", []);




app.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});







app.controller('ClassroomCtrl', ['$scope', '$timeout', function($scope,$timeout)
{
	// Dictionary with game and player variables
	$scope.game = {
		"turn":0,
		"name":"Brady"	
	}
	
	$scope.modalShown = false;
	$scope.modalStudentName = "test";
	$scope.toggleModal = function(studentName) {
		$scope.modalStudentName = studentName;
    	$scope.modalShown = !$scope.modalShown;
	};
	$scope.getModalStudent = function()
	{
		var student = $scope.students[$scope.modalStudentName];
		return student;
	}
	
	
	// Array with students
	$scope.students = {
        "Riley": {
                "name":"Riley",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1,
                "face": "neutral"
        },
        "Kelly": {
                "name":"Kelly",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1,
                "face": "neutral"
        },
        "Alex": {
                "name":"Alex",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1,
                "face": "neutral"
        },
        "Taylor": {
                "name":"Taylor",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1,
                "face": "neutral"
        },
        "Morgan": {
                "name":"Morgan",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1,
                "face": "neutral"
        },
        "Jesse": {
                "name":"Jesse",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1,
                "face": "neutral"
        }
	};
	
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
		var student = $scope.students[studentName];
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





