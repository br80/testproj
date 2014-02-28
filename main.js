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

	$scope.getNumStudents = function ()
	{
		return $scope.students.length;
	}
}

