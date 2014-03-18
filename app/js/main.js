var app = angular.module('myApp', []);


app.filter('reverse', function() {
  return function (text) {
    return text.split("").reverse().join("");
  }
})



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
      scope.hideModal = function hideModal() {
        scope.show = false;
      };
    },
    template: '<div class="ng-modal" ng-show="show"><div class="ng-modal-overlay" ng-click="hideModal()">' + 
        '</div><div class="ng-modal-dialog" ng-style="dialogStyle"><div class="ng-modal-close" ng-click="hideModal()">X' + 
        '</div><div class="ng-modal-dialog-content" ng-transclude></div></div></div>'
  }
})

app.service('randomService', function() {

  this.randomRange = function (num1, num2) {
    return Math.floor(Math.random() * num2) + num1;
  }

})


// Service that handles students
app.service('studentsService', ['randomService', function (randomService) {

  this.students = {
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

  this.getStudent = function(studentName) {
    return this.students[studentName];
  };

  this.studentTooltip = function(studentName) {
    var student = this.getStudent(studentName);
    var retArray = [];
    retArray.push(student.name);
    retArray.push('Math: ' + student.math);
    retArray.push('Reading: ' + student.reading);
    retArray.push('Writing: ' + student.writing);
    retArray.push('Discipline: ' + student.discipline);
    return retArray.join("\n");
  };

  // Return a student's portrait to neutral iff the student is not being troublesome
  this.finishWorking = function finishWorking(student) {
    var returnStudent = student;  // The value to return
    if (returnStudent.face !== 'Trouble') {
      returnStudent.face = 'Neutral';
      returnStudent.faceIndex = randomService.randomRange(1,3);
    }
    return returnStudent;
  }

   // When a troublesome student is caught, return them to neutral
  this.catchTroublesomeStudent = function catchTroublesomeStudent(studentName) {
    var student = this.students[studentName];
    if (student.face === 'Trouble') {
      // Make the student non-troublesome
      student.face = 'Neutral';
      student.faceIndex = randomService.randomRange(1,3);
    }
  }



}]);


// Service that holds player variables
app.service('playerService', [function () {

  this.playerName = "Brady";

}]);





app.service('subjectsService', [function () {

  this.subjects = {
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


}]);




app.factory('ModalDialogFactory', [function(studentsService) {

  return {
    stub: function () {
      return "RETURN!!!";
    }

  }
}]);


app.factory('GameActionFactory', ['randomService', function(randomService) {


  return {

    // TODO: Make all of these functions have better learning heuristics
  
    // Process the effects on a student when they are listening to a lecture.  This algorithm is temporary.
    doLectureTurn: function doLectureTurn(student, currentSubject) {
     var returnStudent = student;  // The value to return
     if (returnStudent.face === 'Trouble') {
       // Do nothing.  Troublesome students stay troublesome until you click their portrait.  
     }
     else if (randomService.randomRange(1,10) === 1) {
       returnStudent[currentSubject.subject]++;
       returnStudent.face = 'Learning';
       returnStudent.faceIndex = 1;
     }
     else if (randomService.randomRange(1,10) === 2) {
       returnStudent[currentSubject.subject]++;
       returnStudent.face = 'Trouble';
       returnStudent.faceIndex = randomService.randomRange(1,3);
     }
     else {
       returnStudent.face = 'Neutral';
       returnStudent.faceIndex = randomService.randomRange(1,3);
     }
     return returnStudent;
    },



  

    // Process the effects on a student when they are doing classwork.  This algorithm is temporary.
    doClassworkTurn: function doClassworkTurn(student, currentSubject) {
      var returnStudent = student;  // The value to return
      if (returnStudent.face === 'Trouble') {
        // Do nothing.  Troublesome students stay troublesome until you click their portrait.  
      }
      else if (randomService.randomRange(1,10) === 1) {
        returnStudent[currentSubject.subject]++;
        returnStudent.face = 'Learning';
        returnStudent.faceIndex = 1;
      }
      else if (randomService.randomRange(1,10) === 2) {
        returnStudent[currentSubject.subject]++;
        returnStudent.face = 'Trouble';
        returnStudent.faceIndex = randomService.randomRange(1,3);
      }
      else {
        returnStudent.face = 'Working';
        returnStudent.faceIndex = randomService.randomRange(1,3);
      }
      return returnStudent;
    },

    // Process the effects on a student when they are doing an exam.  This algorithm is temporary.
    doExamTurn: function doExamTurn(student, currentSubject) {
      var returnStudent = student;  // The value to return
      if (returnStudent.face === 'Trouble') {
        // Do nothing.  Troublesome students stay troublesome until you click their portrait.  
      }
      else if (randomService.randomRange(1,10) === 1) {
        returnStudent[currentSubject.subject]++;
        returnStudent.face = 'Learning';
        returnStudent.faceIndex = 1;
      }
      else if (randomService.randomRange(1,20) === 2) {
        returnStudent[currentSubject.subject]++;
        returnStudent.face = 'Trouble';
        returnStudent.faceIndex = randomService.randomRange(1,3);
      }
      else {
        returnStudent.face = 'Working';
        returnStudent.faceIndex = randomService.randomRange(1,3);
      }
      return returnStudent;
    }

  }

}]);


// Factory that handles time/turn functions
app.factory('GameTimeFactory', [function() {

  var currentTurn = 0;
  var classTimeAmount = [];  // The current time selection.  This is used for determining how long an action will be.
  var classTimeRemaining = [];  // An array containing dictionaries of time amounts remaining in the day

  return {

    turn: currentTurn,

    incrementTurn: function incrementTurn(amt) {
      currentTurn += amt;
    },

    // Generate time string from number of turns. Each day consists of 36 time units, representing 10 minutes each.
    getTime: function getTime() {
      var timeUnits = currentTurn % 36;
      if (timeUnits < 24) {   // Before noon
       return '' + (8 + Math.floor(timeUnits / 6)) + ':' + (timeUnits % 6) + '0';
      }
      else {   // After noon (12-1 is lunch and is not recorded)
        return '' + (1 + Math.floor((timeUnits - 24) / 6)) + ':' + (timeUnits % 6) + '0';
      }
    },

    getDay: function getDay() {
      return Math.floor(currentTurn / 36 + 1);
    },

    getClassTimeAmount: function getClassTimeAmount() {return classTimeAmount;},
    getClassTimeRemaining: function getClassTimeRemaining() {return classTimeRemaining;},


    // There must be at least 2 hours in the day to have an exam
    isThereTimeForExam: function isThereTimeForExam() {
      return (classTimeRemaining.length >= 12);
    },

    setClassTimeRemaining: function setClassTimeRemaining(currentAction) {
      var timeArray = [];
      var timeUnits = currentTurn % 36;
      var timeUnitsRemaining;
      if (timeUnits < 24) {   // Before noon
        timeUnitsRemaining = 24 - timeUnits;
      }
      else {      // After noon (12-1 is lunchtime and is not recorded).  The school day ends at 3pm.
        timeUnitsRemaining = 36 - timeUnits;
      }
      while (timeUnitsRemaining > 0) {
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
      if (currentAction === 'exam') {
        classTimeAmount = timeArray[timeArray.length - 12];
      }
      else {
        classTimeAmount = timeArray[0];
      }
      classTimeRemaining = timeArray;
    },


    // Get the number of turns from the classTimeAmount scope variable
    getNumberOfTurns: function getNumberOfTurns() {
      classTimeAmount = classTimeAmount;
      return (classTimeAmount.minutes / 10) + (classTimeAmount.hours * 6);
    },



    // Getter and setter for classtime amount
    getClassTimeAmount: function getClassTimeAmount() {
      return classTimeAmount;
    },
    setClassTimeAmount: function setClassTimeAmount(amt) {
      classTimeAmount = amt;
      return amt;
    }

  };
}]);
















app.controller('ClassroomCtrl',
  ['$scope', '$timeout', 'studentsService', 'randomService', 'playerService', 'subjectsService', 'GameTimeFactory', 'GameActionFactory',
  function($scope,$timeout,studentsService,randomService,playerService,subjectsService, GameTimeFactory, GameActionFactory) {

  // REMOVE ME!!!!!!!!!!!
  $scope.debugvar = "REMOVE ME";

  // Get Player's Name
  $scope.getPlayerName = function getPlayerName () {
    return playerService.playerName;
  }

  // Get subjects dictionary
  $scope.getSubjects = function getSubjects () {
    return subjectsService.subjects;
  }

  // Get students dictionary
  $scope.getStudents = function getStudents () {
    return studentsService.students;
  }
  
  $scope.modalShown = false;
  $scope.modalStudentName = 'test';

  // Sets the student for the modal student window and opens the modal window.
  $scope.toggleModal = function toggleModal(studentName) {
    $scope.modalStudentName = studentName;
      $scope.modalShown = !$scope.modalShown;
  };

  // Return the student that is represented in the modal student window
  $scope.getModalStudent = function getModalStudent() {
    var student = studentsService.getStudent($scope.modalStudentName);
    return student;
  }

  // Generate tooltip text (shows stats)
  $scope.studentTooltip = function studentTooltip(studentName) {
    return studentsService.studentTooltip(studentName);
  }
  

  ////////////////////////////////
  // Game Time functions
  ////////////////////////////////

  // Return what day it is
  $scope.getDay = function getDay() {return GameTimeFactory.getDay();}

  // Each day consists of 36 time units, representing 10 minutes each.
  $scope.getTime = function getTime() {return GameTimeFactory.getTime();}

  $scope.setClassTimeAmount = function setClassTimeAmount(amt) {
    $scope.classTimeAmount = GameTimeFactory.setClassTimeAmount(amt);
  }
  $scope.getClassTimeRemaining = function getClassTimeRemaining() {
    return GameTimeFactory.getClassTimeRemaining();
  }
  GameTimeFactory.setClassTimeRemaining($scope.currentAction);
  $scope.classTimeAmount = GameTimeFactory.getClassTimeAmount();
  
  // There must be at least 2 hours in the day to have an exam
  $scope.isThereTimeForExam = function isThereTimeForExam() {return GameTimeFactory.isThereTimeForExam();}

  // Handle time changes when radio buttons are selected
  $scope.selectActionButton = function selectActionButton(value) {
    var classTimeRemaining = GameTimeFactory.getClassTimeRemaining()
    if (value === 'exam') {
      $scope.setClassTimeAmount(classTimeRemaining[classTimeRemaining.length - 12]);
    }
    else {
      // Commenting out the line below: This prevents time from updating when you select a button.
      // GameTimeFactory.setClassTimeAmount(classTimeRemaining[0]);
    }
    $scope.classTimeAmount = GameTimeFactory.getClassTimeAmount();
  }



  // Action functions
  $scope.turnActive = false;

  $scope.numberOfTurnsToTake = 0;  // This is set with getNumberOfTurns() when an action is taken
  $scope.currentAction = 'lecture';
  $scope.currentSubject = subjectsService.subjects.math[0];

  // Take the first turn and trigger the callback to take more turns
  $scope.takeTurn = function takeTurn() {
    var classTimeRemaining = GameTimeFactory.getClassTimeRemaining()
    if (!$scope.turnActive) {
      // Start the action
      $scope.numberOfTurnsToTake = GameTimeFactory.getNumberOfTurns();
      GameActionFactory.setTurnActive(true);
      $scope.setClassTimeAmount(classTimeRemaining[classTimeRemaining.length - $scope.numberOfTurnsToTake]);
      $scope.updateStudents();
      $timeout($scope.processTurn,1000);
    }
    else {
      // Stop the current action (when the "stop" button is hit)
      $scope.numberOfTurnsToTake = 0;
      $scope.turnActive = false;
      $scope.setClassTimeAmount(classTimeRemaining[0]);
    }
  }

  // Each turn, process the effects on each turn.
  $scope.processTurn = function processTurn() {
    if (!$scope.turnActive) return;  // Terminal case
    GameTimeFactory.incrementTurn(1);
    $scope.numberOfTurnsToTake--;
    $scope.updateStudents();
    GameTimeFactory.setClassTimeRemaining($scope.currentAction); // Update remaining class time
    var classTimeRemaining = GameTimeFactory.getClassTimeRemaining();
    if ($scope.numberOfTurnsToTake <= 0) {
      $scope.setClassTimeAmount(classTimeRemaining[0]);
      $scope.turnActive = false;
    }
    else {
      $scope.setClassTimeAmount(classTimeRemaining[classTimeRemaining.length - $scope.numberOfTurnsToTake]);
      $timeout($scope.processTurn,1000);  // Time per turn.  Should probably make this a variable at the top
    }
  }

  // What does the "Take Turn" button say?
  $scope.getActionVerb = function getActionVerb() {
    if (!$scope.turnActive)
      return 'Start!';
    else
      return 'Stop';
  }

  // When turns are being taken, update student entries accordingly
  $scope.updateStudents = function updateStudents() {
    for (student in studentsService.students) {
      if ($scope.numberOfTurnsToTake <= 0) {
        studentsService.students[student] = studentsService.finishWorking(studentsService.students[student]);
      }
      else if ($scope.currentAction === 'lecture') {
        studentsService.students[student] = GameActionFactory.doLectureTurn(studentsService.students[student], $scope.currentSubject);  
      }
      else if ($scope.currentAction === 'classwork') {
        studentsService.students[student] = GameActionFactory.doClassworkTurn(studentsService.students[student], $scope.currentSubject);
      }
      else if ($scope.currentAction === 'exam') {
        studentsService.students[student] = GameActionFactory.doExamTurn(studentsService.students[student], $scope.currentSubject);
      }
      else {
        // pass
      }
    }  
  }
  

  // When a student is making trouble and they are clicked, return them to neutral.
  $scope.handlePortraitClick = function handlePortraitClick(studentName) {
    studentsService.catchTroublesomeStudent(studentName);
  }
  


  

}]);





