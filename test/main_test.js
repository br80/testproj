

describe('SimEdu Tests', function () {

	// we declare some global vars to be used in the tests
	var scope;    // the scope where our directive is inserted
	var elem;     // our directive jqLite element

	// Testing myApp module
	beforeEach(module('myApp'));


    // before each test, creates a new fresh scope
    // the inject function interest is to make use of the angularJS
    // dependency injection to get some other services in our test
    // here we need $rootScope to create a new scope
    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.testModel = 42;
    }));

    function compileDirective(tpl) {
        // function to compile a fresh directive with the given template, or a default one
        // compile the tpl with the $rootScope created above
        // wrap our directive inside a form to be able to test
        // that our form integration works well (via ngModelController)
        // our directive instance is then put in the global 'elm' variable for further tests
        if (!tpl) tpl = '<div rn-stepper ng-model="testModel"></div></form>';
        tpl = '<form name="form">' + tpl + '</tpl>';
        // inject allows you to use AngularJS dependency injection
        // to retrieve and use other services
        inject(function($compile) {
            var form = $compile(tpl)(scope);
            elm = form.find('div');
        });
        // $digest is necessary to finalize the directive generation
        scope.$digest();
    }

	describe('reverse', function() {
		// before each test in this block, generates a fresh directive
		beforeEach(function() {
			compileDirective();
		});

		it('should reverse a string', inject(function (reverseFilter) {
			expect(reverseFilter('ABCD')).toEqual('DCBA');
		}));
	});

	describe('The RandomRange implementation', function() {

		beforeEach(function() {
			angular.module('myApp');
		});

		it('Check random range.  Note: There is a VERY slight chance this will fail even if the function is working fine.', inject(function (randomService) {
			var isOne = 0;
			var isTwo = 0;
			var isThree = 0;
			// Run the randomRange function 1000 times to get a good distribution (law of large numbers)
			for (var i = 0 ; i < 1000 ; i++)
			{
				var randomInt = randomService.randomRange(1,3);
				if (randomInt === 1) isOne++;
				else if (randomInt === 2) isTwo++;
				else if (randomInt === 3) isThree++;
			}
			expect(isOne).toBeGreaterThan(100);  // Should average around 333
			expect(isTwo).toBeGreaterThan(100);  // Should average around 333
			expect(isThree).toBeGreaterThan(100);  // Should average around 333
			expect(isOne + isTwo + isThree).toBe(1000);
		}));

		it('RandomRange(1,1) should be 1', inject(function (randomService) {
			expect(randomService.randomRange(1,1)).toBe(1);
		}));

	});

	describe('Testing the studentsService', function() {

		beforeEach(function() {
			angular.module('myApp');
		});

		it('Make sure all the parameters in student entries are defined', inject(function (studentsService) {
			var students = studentsService.students;
			for (student in students)
			{
				expect(students[student].name).toBeDefined();
				expect(students[student].math).toBeDefined();
				expect(students[student].reading).toBeDefined();
				expect(students[student].writing).toBeDefined();
				expect(students[student].discipline).toBeDefined();
				expect(students[student].face).toBeDefined();
				expect(students[student].faceIndex).toBeDefined();
			}
		}));

		it('Test getStudent() function', inject(function (studentsService) {
			var students = studentsService.students;
			for (student in students)
			{
				expect(students[student]).toBe(studentsService.getStudent(student));
			}
		}));

		it('Test student tooltip', inject(function (studentsService) {
			var students = studentsService.students;
			for (student in students)
			{
				var tooltipString = studentsService.studentTooltip(student);
				expect(tooltipString).toMatch('Math: ');
				expect(tooltipString).toMatch('Reading: ');
				expect(tooltipString).toMatch('Writing: ');
				expect(tooltipString).toMatch('Discipline: ');
			}
		}));

		it('Test the finishWorking() function', inject(function (studentsService) {
			var students = studentsService.students;
			for (student in students)
			{
				var testStudent = students[student];
				testStudent.face = 'Working';  // the face parameter must exist since this was validated in an earlier test.
				expect(studentsService.finishWorking(testStudent).face).toMatch('Neutral');
				testStudent.face = 'Trouble';
				expect(studentsService.finishWorking(testStudent).face).toMatch('Trouble');
			}
		}));

		it('Test the finishWorking() function', inject(function (studentsService) {
			var students = studentsService.students;
			for (student in students)
			{
				var testStudent = students[student];
				testStudent.face = 'Working';  // the face parameter must exist since this was validated in an earlier test.
				expect(studentsService.finishWorking(testStudent).face).toMatch('Neutral');
				testStudent.face = 'Trouble';
				expect(studentsService.finishWorking(testStudent).face).toMatch('Trouble');
			}
		}));

		it('Test the catchTroublesomeStudent() function', inject(function (studentsService) {
			var students = studentsService.students;
			for (student in students)
			{
				students[student].face = 'Neutral';  // Neutral students stay neutral
				expect(studentsService.catchTroublesomeStudent(student).face).toMatch('Neutral');
				students[student].face = 'Working';  // Working students stay working
				expect(studentsService.catchTroublesomeStudent(student).face).toMatch('Working');
				students[student].face = 'Trouble';  // Troublesome students become neutral
				expect(studentsService.catchTroublesomeStudent(student).face).toMatch('Neutral');
			}
		}));

	});

	describe('Testing the playerService', function() {

		beforeEach(function() {
			angular.module('myApp');
		});

		it('Make sure player variables are defined', inject(function (playerService) {
			expect(playerService.playerName).toBeDefined();
		}));

	});

	describe('Testing the playerService', function() {

		beforeEach(function() {
			angular.module('myApp');
		});

		it('Make sure all the subjects and sections are well defined', inject(function (subjectsService) {
			var subjects = subjectsService.subjects;
			for (subject in subjectsService.subjects)
			{
				for (section in subjects[subject])
				{
					expect(subjects[subject][section].name).toBeDefined();
					expect(subjects[subject][section].subject).toBeDefined();
					expect(subjects[subject][section].active).toBeDefined();
				}
			}
		}));

	});

	describe('Testing the ModalDialogFactory', function() {

		beforeEach(function() {
			angular.module('myApp');
		});

		it('Make sure all the subjects and sections are well defined', inject(function (ModalDialogFactory) {
			// STUB
		}));

	});

	describe('Testing the GameActionFactory', function() {

		beforeEach(function() {
			angular.module('myApp');
		});

		it('Test Mastery improvement for lectures', inject(function (GameActionFactory, studentsService, subjectsService) {
			// Assume studentsService is working correctly
			var students = studentsService.students;
			var unlecturedStudent;
			var unlecturedStudentMathMastery;
			var unlecturedStudentWritingMastery;
			var unlecturedStudentReadingMastery;
			var lecturedStudent;
			var lecturedStudentMathMastery;
			var lecturedStudentWritingMastery;
			var lecturedStudentReadingMastery;
			for (section in subjectsService.subjects.math) // Test math
			{
				for (student in students)
				{
					unlecturedStudent = students[student];
					unlecturedStudentMathMastery = students[student].math;
					unlecturedStudentWritingMastery = students[student].writing;
					unlecturedStudentReadingMastery = students[student].reading;
					lecturedStudent = GameActionFactory.doLectureTurn(students[student], subjectsService.subjects.math[section]);
					lecturedStudentMathMastery = lecturedStudent.math;
					lecturedStudentWritingMastery = lecturedStudent.writing;
					lecturedStudentReadingMastery = lecturedStudent.reading;
					expect(lecturedStudentMathMastery).toBeGreaterThan(unlecturedStudentMathMastery - 1);  // No GTE
					expect(lecturedStudentMathMastery).toBeLessThan(unlecturedStudentMathMastery + 2);  // No LTE
					expect(lecturedStudentWritingMastery).toBe(unlecturedStudentWritingMastery);  // Writing shouldn't change
					expect(lecturedStudentReadingMastery).toBe(unlecturedStudentReadingMastery);  // Reading shouldn't change
				}
			}
			for (section in subjectsService.subjects.writing) // Test writing
			{
				for (student in students)
				{
					unlecturedStudent = students[student];
					unlecturedStudentMathMastery = students[student].math;
					unlecturedStudentWritingMastery = students[student].writing;
					unlecturedStudentReadingMastery = students[student].reading;
					lecturedStudent = GameActionFactory.doLectureTurn(students[student], subjectsService.subjects.writing[section]);
					lecturedStudentMathMastery = lecturedStudent.math;
					lecturedStudentWritingMastery = lecturedStudent.writing;
					lecturedStudentReadingMastery = lecturedStudent.reading;
					expect(lecturedStudentWritingMastery).toBeGreaterThan(unlecturedStudentWritingMastery - 1);  // No GTE
					expect(lecturedStudentWritingMastery).toBeLessThan(unlecturedStudentWritingMastery + 2);  // No LTE
					expect(lecturedStudentMathMastery).toBe(unlecturedStudentMathMastery);  // Math shouldn't change
					expect(lecturedStudentReadingMastery).toBe(unlecturedStudentReadingMastery);  // Reading shouldn't change
				}
			}
			for (section in subjectsService.subjects.reading) // Test reading
			{
				for (student in students)
				{
					unlecturedStudent = students[student];
					unlecturedStudentMathMastery = students[student].math;
					unlecturedStudentWritingMastery = students[student].writing;
					unlecturedStudentReadingMastery = students[student].reading;
					lecturedStudent = GameActionFactory.doLectureTurn(students[student], subjectsService.subjects.reading[section]);
					lecturedStudentMathMastery = lecturedStudent.math;
					lecturedStudentWritingMastery = lecturedStudent.writing;
					lecturedStudentReadingMastery = lecturedStudent.reading;
					expect(lecturedStudentReadingMastery).toBeGreaterThan(unlecturedStudentReadingMastery - 1);  // No GTE
					expect(lecturedStudentReadingMastery).toBeLessThan(unlecturedStudentReadingMastery + 2);  // No LTE
					expect(lecturedStudentWritingMastery).toBe(unlecturedStudentWritingMastery);  // Writing shouldn't change
					expect(lecturedStudentMathMastery).toBe(unlecturedStudentMathMastery);  // Math shouldn't change
				}
			}
		}));

		it('Test Mastery improvement for classwork', inject(function (GameActionFactory, studentsService, subjectsService) {
			// Assume studentsService is working correctly
			var students = studentsService.students;
			var nonworkingStudent;
			var nonworkingStudentMathMastery;
			var nonworkingStudentWritingMastery;
			var nonworkingStudentReadingMastery;
			var workingStudent;
			var workingStudentMathMastery;
			var workingStudentWritingMastery;
			var workingStudentReadingMastery;
			for (section in subjectsService.subjects.math) // Test math
			{
				for (student in students)
				{
					nonworkingStudent = students[student];
					nonworkingStudentMathMastery = students[student].math;
					nonworkingStudentWritingMastery = students[student].writing;
					nonworkingStudentReadingMastery = students[student].reading;
					workingStudent = GameActionFactory.doClassworkTurn(students[student], subjectsService.subjects.math[section]);
					workingStudentMathMastery = workingStudent.math;
					workingStudentWritingMastery = workingStudent.writing;
					workingStudentReadingMastery = workingStudent.reading;
					expect(workingStudentMathMastery).toBeGreaterThan(nonworkingStudentMathMastery - 1);  // No GTE
					expect(workingStudentMathMastery).toBeLessThan(nonworkingStudentMathMastery + 2);  // No LTE
					expect(workingStudentWritingMastery).toBe(nonworkingStudentWritingMastery);  // Writing shouldn't change
					expect(workingStudentReadingMastery).toBe(nonworkingStudentReadingMastery);  // Reading shouldn't change
				}
			}
			for (section in subjectsService.subjects.writing) // Test writing
			{
				for (student in students)
				{
					nonworkingStudent = students[student];
					nonworkingStudentMathMastery = students[student].math;
					nonworkingStudentWritingMastery = students[student].writing;
					nonworkingStudentReadingMastery = students[student].reading;
					workingStudent = GameActionFactory.doClassworkTurn(students[student], subjectsService.subjects.writing[section]);
					workingStudentMathMastery = workingStudent.math;
					workingStudentWritingMastery = workingStudent.writing;
					workingStudentReadingMastery = workingStudent.reading;
					expect(workingStudentWritingMastery).toBeGreaterThan(nonworkingStudentWritingMastery - 1);  // No GTE
					expect(workingStudentWritingMastery).toBeLessThan(nonworkingStudentWritingMastery + 2);  // No LTE
					expect(workingStudentMathMastery).toBe(nonworkingStudentMathMastery);  // Math shouldn't change
					expect(workingStudentReadingMastery).toBe(nonworkingStudentReadingMastery);  // Reading shouldn't change
				}
			}
			for (section in subjectsService.subjects.reading) // Test reading
			{
				for (student in students)
				{
					nonworkingStudent = students[student];
					nonworkingStudentMathMastery = students[student].math;
					nonworkingStudentWritingMastery = students[student].writing;
					nonworkingStudentReadingMastery = students[student].reading;
					workingStudent = GameActionFactory.doClassworkTurn(students[student], subjectsService.subjects.reading[section]);
					workingStudentMathMastery = workingStudent.math;
					workingStudentWritingMastery = workingStudent.writing;
					workingStudentReadingMastery = workingStudent.reading;
					expect(workingStudentReadingMastery).toBeGreaterThan(nonworkingStudentReadingMastery - 1);  // No GTE
					expect(workingStudentReadingMastery).toBeLessThan(nonworkingStudentReadingMastery + 2);  // No LTE
					expect(workingStudentWritingMastery).toBe(nonworkingStudentWritingMastery);  // Writing shouldn't change
					expect(workingStudentMathMastery).toBe(nonworkingStudentMathMastery);  // Math shouldn't change
				}
			}
		}));

		it('Test Mastery improvement for exams', inject(function (GameActionFactory, studentsService, subjectsService) {
			// Assume studentsService is working correctly
			var students = studentsService.students;
			var nonworkingStudent;
			var nonworkingStudentMathMastery;
			var nonworkingStudentWritingMastery;
			var nonworkingStudentReadingMastery;
			var workingStudent;
			var workingStudentMathMastery;
			var workingStudentWritingMastery;
			var workingStudentReadingMastery;
			for (section in subjectsService.subjects.math) // Test math
			{
				for (student in students)
				{
					nonworkingStudent = students[student];
					nonworkingStudentMathMastery = students[student].math;
					nonworkingStudentWritingMastery = students[student].writing;
					nonworkingStudentReadingMastery = students[student].reading;
					workingStudent = GameActionFactory.doExamTurn(students[student], subjectsService.subjects.math[section]);
					workingStudentMathMastery = workingStudent.math;
					workingStudentWritingMastery = workingStudent.writing;
					workingStudentReadingMastery = workingStudent.reading;
					expect(workingStudentMathMastery).toBeGreaterThan(nonworkingStudentMathMastery - 1);  // No GTE
					expect(workingStudentMathMastery).toBeLessThan(nonworkingStudentMathMastery + 2);  // No LTE
					expect(workingStudentWritingMastery).toBe(nonworkingStudentWritingMastery);  // Writing shouldn't change
					expect(workingStudentReadingMastery).toBe(nonworkingStudentReadingMastery);  // Reading shouldn't change
				}
			}
			for (section in subjectsService.subjects.writing) // Test writing
			{
				for (student in students)
				{
					nonworkingStudent = students[student];
					nonworkingStudentMathMastery = students[student].math;
					nonworkingStudentWritingMastery = students[student].writing;
					nonworkingStudentReadingMastery = students[student].reading;
					workingStudent = GameActionFactory.doExamTurn(students[student], subjectsService.subjects.writing[section]);
					workingStudentMathMastery = workingStudent.math;
					workingStudentWritingMastery = workingStudent.writing;
					workingStudentReadingMastery = workingStudent.reading;
					expect(workingStudentWritingMastery).toBeGreaterThan(nonworkingStudentWritingMastery - 1);  // No GTE
					expect(workingStudentWritingMastery).toBeLessThan(nonworkingStudentWritingMastery + 2);  // No LTE
					expect(workingStudentMathMastery).toBe(nonworkingStudentMathMastery);  // Math shouldn't change
					expect(workingStudentReadingMastery).toBe(nonworkingStudentReadingMastery);  // Reading shouldn't change
				}
			}
			for (section in subjectsService.subjects.reading) // Test reading
			{
				for (student in students)
				{
					nonworkingStudent = students[student];
					nonworkingStudentMathMastery = students[student].math;
					nonworkingStudentWritingMastery = students[student].writing;
					nonworkingStudentReadingMastery = students[student].reading;
					workingStudent = GameActionFactory.doExamTurn(students[student], subjectsService.subjects.reading[section]);
					workingStudentMathMastery = workingStudent.math;
					workingStudentWritingMastery = workingStudent.writing;
					workingStudentReadingMastery = workingStudent.reading;
					expect(workingStudentReadingMastery).toBeGreaterThan(nonworkingStudentReadingMastery - 1);  // No GTE
					expect(workingStudentReadingMastery).toBeLessThan(nonworkingStudentReadingMastery + 2);  // No LTE
					expect(workingStudentWritingMastery).toBe(nonworkingStudentWritingMastery);  // Writing shouldn't change
					expect(workingStudentMathMastery).toBe(nonworkingStudentMathMastery);  // Math shouldn't change
				}
			}
		}));

	});



	describe('Testing the GameTimeFactory', function() {

		beforeEach(function() {
			angular.module('myApp');
		});

		it('Testing incrementTurn() and getTurn()', inject(function (GameTimeFactory) {
			var currentTurn = GameTimeFactory.getTurn();
			GameTimeFactory.incrementTurn(5);
			var incrementedTurn = GameTimeFactory.getTurn();
			expect(incrementedTurn).toBe(currentTurn + 5);
		}));

		it('Testing getTime() and getDay()', inject(function (GameTimeFactory) {
			var currentDay = GameTimeFactory.getDay();
			GameTimeFactory.incrementTurn( (GameTimeFactory.getTurn() % 36) );  // This should make it 8:00am
			expect(GameTimeFactory.getTime()).toBe("8:00");
			GameTimeFactory.incrementTurn(4);  // This should make it 8:40am
			expect(GameTimeFactory.getTime()).toBe("8:40");
			GameTimeFactory.incrementTurn(19);  // This should make it 11:50am
			expect(GameTimeFactory.getTime()).toBe("11:50");
			GameTimeFactory.incrementTurn(1);  // This should make it 1:00pm
			expect(GameTimeFactory.getTime()).toBe("1:00");
			GameTimeFactory.incrementTurn(11);  // This should make it 2:50pm
			expect(GameTimeFactory.getTime()).toBe("2:50");
			GameTimeFactory.incrementTurn(1);  // This should make it 8:00am again
			expect(GameTimeFactory.getTime()).toBe("8:00");
			expect(GameTimeFactory.getDay()).toBe(currentDay + 1);  // One day should pass
		}));

		it('Testing isThereTimeForExam()', inject(function (GameTimeFactory) {
			GameTimeFactory.incrementTurn( (GameTimeFactory.getTurn() % 36) );  // This should make it 8:00am (validated above)
			expect(GameTimeFactory.getTime()).toBe("8:00");
			expect(GameTimeFactory.isThereTimeForExam()).toBeTruthy();
			GameTimeFactory.incrementTurn(12);  // This makes it 10:00am
			expect(GameTimeFactory.isThereTimeForExam()).toBeTruthy();
			GameTimeFactory.incrementTurn(1);  // This makes it 10:10am
			expect(GameTimeFactory.isThereTimeForExam()).toBeFalsy();
			GameTimeFactory.incrementTurn(11);  // This makes it 1:00pm
			expect(GameTimeFactory.isThereTimeForExam()).toBeTruthy();
			GameTimeFactory.incrementTurn(1);  // This makes it 1:10pm
			expect(GameTimeFactory.isThereTimeForExam()).toBeFalsy();
		}));

	});

	// TODO: Try to test setClassTimeRemaining()

})