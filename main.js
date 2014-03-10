var app = angular.module("myApp", []);



// This directive will set the modal pop-up window
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
  }
})





app.controller('ClassroomCtrl', ['$scope', '$timeout', function($scope,$timeout)
{
	// Dictionary with game and player variables
	$scope.player = {
		"name": "Brady",
		"time": 0
	}
	
	
	// Dictionary of students
	$scope.students = {
        "Riley": {
                "name":"Riley",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1,
                "face": "Neutral",
                "state": "neutral"
        },
        "Kelly": {
                "name":"Kelly",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1,
                "face": "Neutral",
                "state": "neutral"
        },
        "Alex": {
                "name":"Alex",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1,
                "face": "Neutral",
                "state": "neutral"
        },
        "Taylor": {
                "name":"Taylor",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1,
                "face": "Neutral",
                "state": "neutral"
        },
        "Morgan": {
                "name":"Morgan",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1,
                "face": "Neutral",
                "state": "neutral"
        },
        "Jesse": {
                "name":"Jesse",
                "math":1,
                "reading":1,
                "writing":1,
                "discipline":1,
                "face": "Neutral",
                "state": "neutral"
        }
	};

	// Dictionary of class subjects
	$scope.subjects2 = [
        	{
        		"name": "Math 1",
        		"active":true
        	},
        	{
        		"name": "Math 2",
        		"active":false
        	},
        	{
        		"name": "Math 3",
        		"active":false
        	},
        	{
        		"name": "Math 4",
        		"active":false
        	},
        	{
        		"name": "Math 5",
        		"active":false
        	},
        	{
        		"name": "Math 6",
        		"active":false
        	},
        	{
        		"name": "Math 7",
        		"active":false
        	},
        	{
        		"name": "Math 8",
        		"active":false
        	},
        	{
        		"name": "Math 9",
        		"active":false
        	},
        	{
        		"name": "Math 10",
        		"active":false
        	},
        	{
        		"name": "Reading 1",
        		"active":true
        	},
        	{
        		"name": "Reading 2",
        		"active":false
        	},
        	{
        		"name": "Reading 3",
        		"active":false
        	},
        	{
        		"name": "Reading 4",
        		"active":false
        	},
        	{
        		"name": "Reading 5",
        		"active":false
        	},
        	{
        		"name": "Writing 1",
        		"active":true
        	},
        	{
        		"name": "Writing 2",
        		"active":false
        	},
        	{
        		"name": "Writing 3",
        		"active":false
        	},
        	{
        		"name": "Writing 4",
        		"active":false
        	},
        	{
        		"name": "Writing 5",
        		"active":false
        	}
    ];
	$scope.subjects = {
        "math":[
        	{
        		"name": "Math 1",
        		"active":true
        	},
        	{
        		"name": "Math 2",
        		"active":false
        	},
        	{
        		"name": "Math 3",
        		"active":false
        	},
        	{
        		"name": "Math 4",
        		"active":false
        	},
        	{
        		"name": "Math 5",
        		"active":false
        	},
        	{
        		"name": "Math 6",
        		"active":false
        	},
        	{
        		"name": "Math 7",
        		"active":false
        	},
        	{
        		"name": "Math 8",
        		"active":false
        	},
        	{
        		"name": "Math 9",
        		"active":false
        	},
        	{
        		"name": "Math 10",
        		"active":false
        	}
        ],
        "reading":[
        	{
        		"name": "Reading 1",
        		"active":true
        	},
        	{
        		"name": "Reading 2",
        		"active":false
        	},
        	{
        		"name": "Reading 3",
        		"active":false
        	},
        	{
        		"name": "Reading 4",
        		"active":false
        	},
        	{
        		"name": "Reading 5",
        		"active":false
        	}
        ],
        "writing":[
        	{
        		"name": "Writing 1",
        		"active":true
        	},
        	{
        		"name": "Writing 2",
        		"active":false
        	},
        	{
        		"name": "Writing 3",
        		"active":false
        	},
        	{
        		"name": "Writing 4",
        		"active":false
        	},
        	{
        		"name": "Writing 5",
        		"active":false
        	}
        ]
   	};
	
	
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
	

	////////////////////////////////
	// Game Time functions
	////////////////////////////////
	$scope.getDay = function()
	{
		return Math.floor($scope.player["time"] / 36 + 1);
	}
	// Each day consists of 36 time units, representing 10 minutes each.
	$scope.getTime = function()
	{
		var timeUnits = $scope.player["time"] % 36;
		if (timeUnits < 24) // Before noon
		{
			return "" + (8 + Math.floor(timeUnits / 6)) + ":" + (timeUnits % 6) + "0";
		}
		else // After noon (12-1 is lunch and is not recorded)
		{
			return "" + (1 + Math.floor((timeUnits - 24) / 6)) + ":" + (timeUnits % 6) + "0";
		}
	}
	
	// This will return an array with the number of hours remaining before lunch (if before noon) or the end of the day (if after noon)
	$scope.setClassTimeRemaining = function ()
	{
		var timeArray = [];
		var timeUnits = $scope.player["time"] % 36;
		var timeUnitsRemaining;
		if (timeUnits < 24) // Before noon
		{
			timeUnitsRemaining = 24 - timeUnits;
		}
		else // After noon (12-1 is lunchtime and is not recorded).  The school day ends at 3pm.
		{
			timeUnitsRemaining = 36 - timeUnits;
		}
		while (timeUnitsRemaining > 0)
		{
			// Calculate hours and minutes
			var hours = Math.floor(timeUnitsRemaining / 6);
			var minutes = 10 * (timeUnitsRemaining % 6);
			
			// Make string version of time values
			var toString = "";
			if (hours > 0) toString += hours + " hour";
			if (hours > 1) toString += "s";
			if (minutes > 0) toString += " " + minutes + " minutes";
			timeArray.push({"hours": hours, "minutes":minutes, "toString": toString}); // Push to time Array
			
			timeUnitsRemaining--;
		}
		if ($scope.currentAction == "exam")
		{
			$scope.classTimeAmount = timeArray[timeArray.length - 12];
		}
		else
		{
			$scope.classTimeAmount = timeArray[0];
		}
		$scope.classTimeRemaining = timeArray;
	}
	$scope.classTimeRemaining;  // An array containing dictionaries of time amounts remaining in the day
	$scope.classTimeAmount;  // The current time selection.  This is used for determining how long an action will be.
	$scope.setClassTimeRemaining();
	
	// There must be at least 2 hours in the day to have an exam
	$scope.isThereTimeForExam = function()
	{
		return $scope.classTimeRemaining.length >= 12;
	}
	// Handle time changes when radio buttons are selected
	$scope.selectActionButton = function(value)
	{
		if (value == "exam")
		{
			$scope.classTimeAmount = $scope.classTimeRemaining[$scope.classTimeRemaining.length - 12];
		}
		else
		{
			$scope.classTimeAmount = $scope.classTimeRemaining[0];
		}
	}



	// Action functions
	$scope.turnActive = false;  // This is true when a turn is taking place
	$scope.numberOfTurnsToTake = 0;  // This is set with getNumberOfTurns() when an action is taken
	$scope.currentAction = "lecture";
	$scope.currentSubject = $scope.subjects["math"][0];  // TODO: FIGURE OUT WHY THIS DOESN'T UPDATE!!!!!!!!!!!!!!
	// Get the number of turns from the classTimeAmount scope variable
	$scope.getNumberOfTurns = function()
	{
		return ($scope.classTimeAmount["minutes"] / 10) + ($scope.classTimeAmount["hours"] * 6);
	}
	$scope.takeTurn = function()
	{
		if (!$scope.turnActive)
		{
			// Start the action
			$scope.numberOfTurnsToTake = $scope.getNumberOfTurns();
			$scope.turnActive = true;
			$scope.classTimeAmount = $scope.classTimeRemaining[$scope.classTimeRemaining.length - $scope.numberOfTurnsToTake];
			$timeout($scope.processTurn,1000);
		}
		else
		{
			// Stop the current action
			$scope.numberOfTurnsToTake = 0;
			$scope.turnActive = false;
			$scope.classTimeAmount = $scope.classTimeRemaining[0];
		}
	}
	$scope.processTurn = function()
	{
		if (!$scope.turnActive) return;  // Terminal case
		$scope.player["time"]++;
		$scope.numberOfTurnsToTake--;
		$scope.setClassTimeRemaining(); // Update remaining class time
		if ($scope.numberOfTurnsToTake <= 0)
		{
			$scope.turnActive = false;
		}
		else
		{
			$scope.classTimeAmount = $scope.classTimeRemaining[$scope.classTimeRemaining.length - $scope.numberOfTurnsToTake];
			$timeout($scope.processTurn,1000);
		}
	}
	$scope.getActionVerb = function()
	{
		if (!$scope.turnActive)
			return "Start!";
		else
			return "Stop";
	}
	

	



	// Util Functions
	$scope.RandomRange = function(num1, num2)
	{
		return Math.floor(Math.random() * num2) + num1;
	}
}]);





