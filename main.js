function Main($scope)
{
    $scope.message = "Hello!"

}



function StudentsCtrl($scope)
{
	$scope.students = [
        {
                "name":"Eric"
        },
        {
                "name":"David"
        },
        {
                "name":"Karen"
        },
        {
                "name":"Ashley"
        },
        {
                "name":"Josh"
        },
        {
                "name":"Angelina"
        }
	];
	
	// COUNTER FUNCTIONS
	$scope.setCounter = function(num)
	{
		$scope.counter = num;
	}
	$scope.getCounter = function()
	{
		return $scope.counter;
	}
	$scope.incrementCounter = function(amt)
	{
		$scope.counter += amt;
		return $scope.counter;
	}

	$scope.getNumStudents = function ()
	{
		return $scope.students.length;
	}
	
	$scope.RandomRange = function(num1, num2)
	{
		return Math.floor(Math.random() * num2) + num1;
	}
}

