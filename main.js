var app = angular.module('myApp', []);



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
    template: '<div class="ng-modal" ng-show="show"><div class="ng-modal-overlay" ng-click="hideModal()">' + 
        '</div><div class="ng-modal-dialog" ng-style="dialogStyle"><div class="ng-modal-close" ng-click="hideModal()">X' + 
        '</div><div class="ng-modal-dialog-content" ng-transclude></div></div></div>'
  }
})





app.controller('ClassroomCtrl', ['$scope', '$timeout', function($scope,$timeout)
{
	// Dictionary with game and player variables
	$scope.player = {
		'name': 'Brady',
		'gameTime': 0
	}
	
	
	// Dictionary of students
	$scope.students = {
        'Riley': {
                'name':'Riley',
                'math':1,
                'reading':1,
                'writing':1,
                'discipline':1,
                'face': 'Neutral',
                'faceIndex':1
        },
        'Kelly': {
                'name':'Kelly',
                'math':1,
                'reading':1,
                'writing':1,
                'discipline':1,
                'face': 'Neutral',
                'faceIndex':1
        },
        'Alex': {
                'name':'Alex',
                'math':1,
                'reading':1,
                'writing':1,
                'discipline':1,
                'face': 'Neutral',
                'faceIndex':1
        },
        'Taylor': {
                'name':'Taylor',
                'math':1,
                'reading':1,
                'writing':1,
                'discipline':1,
                'face': 'Neutral',
                'faceIndex':1
        },
        'Morgan': {
                'name':'Morgan',
                'math':1,
                'reading':1,
                'writing':1,
                'discipline':1,
                'face': 'Neutral',
                'faceIndex':1
        },
        'Jesse': {
                'name':'Jesse',
                'math':1,
                'reading':1,
                'writing':1,
                'discipline':1,
                'face': 'Neutral',
                'faceIndex':1
        }
	};

	// Dictionary of class subjects
	$scope.subjects = {
        'math':[
        	{
        		'name': 'Math 1',
        		'subject': 'math',
        		'active':true
        	},
        	{
        		'name': 'Math 2',
        		'subject': 'math',
        		'active':false
        	},
        	{
        		'name': 'Math 3',
        		'subject': 'math',
        		'active':false
        	},
        	{
        		'name': 'Math 4',
        		'subject': 'math',
        		'active':false
        	},
        	{
        		'name': 'Math 5',
        		'subject': 'math',
        		'active':false
        	},
        	{
        		'name': 'Math 6',
        		'subject': 'math',
        		'active':false
        	},
        	{
        		'name': 'Math 7',
        		'subject': 'math',
        		'active':false
        	},
        	{
        		'name': 'Math 8',
        		'subject': 'math',
        		'active':false
        	},
        	{
        		'name': 'Math 9',
        		'subject': 'math',
        		'active':false
        	},
        	{
        		'name': 'Math 10',
        		'subject': 'math',
        		'active':false
        	}
        ],
        'reading':[
        	{
        		'name': 'Reading 1',
        		'subject': 'reading',
        		'active':true
        	},
        	{
        		'name': 'Reading 2',
        		'subject': 'reading',

        		'active':false
        	},
        	{
        		'name': 'Reading 3',
        		'subject': 'reading',

        		'active':false
        	},
        	{
        		'name': 'Reading 4',
        		'subject': 'reading',

        		'active':false
        	},
        	{
        		'name': 'Reading 5',
        		'subject': 'reading',

        		'active':false
        	}
        ],
        'writing':[
        	{
        		'name': 'Writing 1',
        		'subject': 'writing',
        		'active':true
        	},
        	{
        		'name': 'Writing 2',
        		'subject': 'writing',
        		'active':false
        	},
        	{
        		'name': 'Writing 3',
        		'subject': 'writing',
        		'active':false
        	},
        	{
        		'name': 'Writing 4',
        		'subject': 'writing',
        		'active':false
        	},
        	{
        		'name': 'Writing 5',
        		'subject': 'writing',
        		'active':false
        	}
        ]
   	};
	
	
	$scope.modalShown = false;
	$scope.modalStudentName = 'test';
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
		retArray = [];
		for (var i = 0 ; i < $scope.students.length ; i++)
		{
			if ($scope.students[i]['name'] == studentName)
				return $scope.students[i];
			else
				retArray.push($scope.students[i]['name']);
		}
		return retArray.join("");
	}
	
	// Generate tooltip text (shows stats)
	$scope.studentTooltip = function(studentName)
	{
		var student = $scope.students[studentName];
		var retArray = [];
		retArray.push(student.name);
        retArray.push('Math: ' + student.math);
        retArray.push('Reading: ' + student.reading);
        retArray.push('Writing: ' + student.writing);
        retArray.push('Discipline: ' + student.discipline);
        return retArray.join("\n");
	}
	

	////////////////////////////////
	// Game Time functions
	////////////////////////////////
	$scope.getDay = function()
	{
		return Math.floor($scope.player.gameTime / 36 + 1);
	}
	// Each day consists of 36 time units, representing 10 minutes each.
	$scope.getTime = function()
	{
		var timeUnits = $scope.player.gameTime % 36;
		if (timeUnits < 24) // Before noon
		{
			return '' + (8 + Math.floor(timeUnits / 6)) + ':' + (timeUnits % 6) + '0';
		}
		else // After noon (12-1 is lunch and is not recorded)
		{
			return '' + (1 + Math.floor((timeUnits - 24) / 6)) + ':' + (timeUnits % 6) + '0';
		}
	}
	
	// This will return an array with the number of hours remaining before lunch (if before noon) or the end of the day (if after noon)
	$scope.setClassTimeRemaining = function ()
	{
		var timeArray = [];
		var timeUnits = $scope.player.gameTime % 36;
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
			var toStringArray = [];
			if (hours > 0) toStringArray.push(hours + ' hour');
			if (hours > 1) toStringArray.push('s');
			if (minutes > 0) toStringArray.push(' ' + minutes + ' minutes');
			timeArray.push({'hours': hours, 'minutes':minutes, 'toString': toStringArray.join("")}); // Push to time Array
			
			timeUnitsRemaining--;
		}
		if ($scope.currentAction == 'exam')
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
		if (value == 'exam')
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
	$scope.currentAction = 'lecture';
	$scope.currentSubject = $scope.subjects.math[0];  // TODO: FIGURE OUT WHY THIS DOESN'T UPDATE!!!!!!!!!!!!!!
	// Get the number of turns from the classTimeAmount scope variable
	$scope.getNumberOfTurns = function()
	{
		return ($scope.classTimeAmount.minutes / 10) + ($scope.classTimeAmount.hours * 6);
	}
	$scope.takeTurn = function()
	{
		if (!$scope.turnActive)
		{
			// Start the action
			$scope.numberOfTurnsToTake = $scope.getNumberOfTurns();
			$scope.turnActive = true;
			$scope.classTimeAmount = $scope.classTimeRemaining[$scope.classTimeRemaining.length - $scope.numberOfTurnsToTake];
			$scope.updateStudents();
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
		$scope.player.gameTime++;
		$scope.numberOfTurnsToTake--;
		$scope.updateStudents();
		$scope.setClassTimeRemaining(); // Update remaining class time
		if ($scope.numberOfTurnsToTake <= 0)
		{
			$scope.turnActive = false;
		}
		else
		{
			$scope.classTimeAmount = $scope.classTimeRemaining[$scope.classTimeRemaining.length - $scope.numberOfTurnsToTake];
			$timeout($scope.processTurn,1000);  // Time per turn.  Should probably make this a variable at the top
		}
	}
	$scope.getActionVerb = function()
	{
		if (!$scope.turnActive)
			return 'Start!';
		else
			return 'Stop';
	}
	
	// When turns are being taken, update student entries accordingly
	$scope.updateStudents = function()
	{
		for (student in $scope.students)
		{
			if ($scope.numberOfTurnsToTake <= 0)
			{
				$scope.students[student] = $scope.setStudentToNeutral($scope.students[student]);
			}
			else if ($scope.currentAction == 'lecture')
			{
				$scope.students[student] = $scope.doLectureTurn($scope.students[student]);	
			}
			else if ($scope.currentAction == 'classwork')
			{
				$scope.students[student] = $scope.doClassworkTurn($scope.students[student]);
			}
			else if ($scope.currentAction == 'exam')
			{
				$scope.students[student] = $scope.doExamTurn($scope.students[student]);
			}
			else
			{
				// pass
			}
		}	
	}
	
	// TODO: Make all of these functions have better learning heuristics
	$scope.doLectureTurn = function (student)
	{
		returnStudent = student;  // The value to return
		if (returnStudent['face'] == 'Trouble')
		{
			// Do nothing.  Troublesome students stay troublesome until you click their portrait.	
		}
		else if ($scope.RandomRange(1,10) == 1)
		{
			returnStudent[$scope.currentSubject.subject]++;
			returnStudent.face = 'Learning';
			returnStudent.faceIndex = 1;
		}
		else if ($scope.RandomRange(1,10) == 2)
		{
			returnStudent[$scope.currentSubject.subject]++;
			returnStudent.face = 'Trouble';
			returnStudent.faceIndex = $scope.RandomRange(1,3);
		}
		else
		{
			returnStudent.face = 'Neutral';
			returnStudent.faceIndex = $scope.RandomRange(1,3);
		}
		return returnStudent;
	}
	$scope.doClassworkTurn = function (student)
	{
		returnStudent = student;  // The value to return
		if (returnStudent.face == 'Trouble')
		{
			// Do nothing.  Troublesome students stay troublesome until you click their portrait.	
		}
		else if ($scope.RandomRange(1,10) == 1)
		{
			returnStudent[$scope.currentSubject.subject]++;
			returnStudent.face = 'Learning';
			returnStudent.faceIndex = 1;
		}
		else if ($scope.RandomRange(1,10) == 2)
		{
			returnStudent[$scope.currentSubject.subject]++;
			returnStudent.face = 'Trouble';
			returnStudent.faceIndex = $scope.RandomRange(1,3);
		}
		else
		{
			returnStudent.face = 'Working';
			returnStudent.faceIndex = $scope.RandomRange(1,3);
		}
		return returnStudent;
	}
	$scope.doExamTurn = function (student)
	{
		returnStudent = student;  // The value to return
		if (returnStudent.face == 'Trouble')
		{
			// Do nothing.  Troublesome students stay troublesome until you click their portrait.	
		}
		else if ($scope.RandomRange(1,10) == 1)
		{
			returnStudent[$scope.currentSubject.subject]++;
			returnStudent.face = 'Learning';
			returnStudent.faceIndex = 1;
		}
		else if ($scope.RandomRange(1,20) == 2)
		{
			returnStudent[$scope.currentSubject.subject]++;
			returnStudent.face = 'Trouble';
			returnStudent.faceIndex = $scope.RandomRange(1,3);
		}
		else
		{
			returnStudent.face = 'Working';
			returnStudent.faceIndex = $scope.RandomRange(1,3);
		}
		return returnStudent;
	}
	$scope.setStudentToNeutral = function (student)
	{
		returnStudent = student;  // The value to return
		if (returnStudent.face != 'Trouble')
		{
			returnStudent.face = 'Neutral';
			returnStudent.faceIndex = $scope.RandomRange(1,3);
		}
		return returnStudent;
	}
	$scope.handlePortraitClick = function (studentName)
	{
		var student = $scope.students[studentName];
		if (student.face == 'Trouble')
		{
			// Make the student non-troublesome
			student.face = 'Neutral';
			student.faceIndex = $scope.RandomRange(1,3);
		}
	}
	



	// Util Functions
	$scope.RandomRange = function(num1, num2)
	{
		return Math.floor(Math.random() * num2) + num1;
	}
}]);





