
var PackageApp = angular.module("PackageApp", []);
PackageApp.controller("PackageCtrl", ["$scope",function($scope) {
	console.log('i am in app4');
$scope.packageItems = [{
	packageID: 'P002',
	
	itemNumber:'I002',
	
	quantity: 2,
	
	serailNumber: 'S002'
}];
                    	
                 
$scope.addRow = function(){	
console.log('Inside add  function');	
$scope.packageItems.push({ 'PackageID':$scope.packageID, 'ItemNumber': $scope.itemNumber, 'Quantity':$scope.quantity, 'SerailNumber':$scope.serailNumber });
    $scope.packageID='';
	$scope.itemNumber='';
	$scope.quantity='';
	$scope.serailNumber='';
	
};

$scope.printMessage = function(){		
	//$scope.packageItems.push({ 'PackageID':$scope.packageID, 'ItemNumber': $scope.itemNumber, 'Quantity':$scope.quantity, 'SerailNumber':$scope.serailNumber });
	console.log('Inside printMessage function');
	
};
}]);