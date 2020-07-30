
var PackageApp = angular.module("PackageApp", []);
PackageApp.controller("PackageCtrl", ["$scope",function($scope) {
	$scope.packageItems = [{
	packageId: 'P002',
	
	itemNumber:'I002',
	

	quantity: 2,
	
	serailNumber: 'S002'
}];
                    	
                 
$scope.addRow = function(){	
console.log('Inside add  function');	
$scope.packageItems.push({ 'packageId':$scope.packageId, 'itemNumber': $scope.itemNumber, 'quantity':$scope.quantity, 'serailNumber':$scope.serailNumber });
    $scope.packageId='';
	$scope.itemNumber='';
	$scope.quantity='';
	$scope.serailNumber='';
	console.log('i am in app4');


$scope.printMessage = function(){		
	//$scope.packageItems.push({ 'PackageID':$scope.packageID, 'ItemNumber': $scope.itemNumber, 'Quantity':$scope.quantity, 'SerailNumber':$scope.serailNumber });
	console.log('Inside printMessage function');
	
};
}]);