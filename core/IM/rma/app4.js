
var PackageApp = angular.module('PackageApp', []);
PackageApp.controller('PackageCtrl', ['$scope','$http',function($scope,$http){
    $scope.packageItems = null;
	console.log('i am in app4');
    function getData(){
        
        $http.get('/content-items/ajax/training/formdamagegetdata')
  .then(function(response) {
      $scope.packageItems = response.data;
  }, function(response) {
      $scope.data = "Something went wrong";
  });
    }
    getData();
     
/*$scope.packageItems = [{
	packageId: 'P002',
	
	itemNumber:'I002',
	
	quantity: 2,
	
	serailNumber: 'S002'
}];*/
    /*$http.get('/content-items/ajax/training/formdamagegetdata')
  .then(function(response) {
    $scope.packageItems = response.data;
  },function(response) {
      $scope.data = "Something went wrong";
  });*/
                    	
                 
/*$scope.addRow = function(){	
console.log('Inside add  function');	
$scope.packageItems.push({ 'packageId':$scope.packageId, 'itemNumber': $scope.itemNumber, 'quantity':$scope.quantity, 'serailNumber':$scope.serailNumber });
    $scope.packageId='';
	$scope.itemNumber='';
	$scope.quantity='';
	$scope.serailNumber='';
	
};*/
/* $scope.getData= function(){
        
         $http.get('/content-items/ajax/training/formdamagegetdata')
  .then(function(response) {
      $scope.packageItems = response.data;
  }, function(response) {
      $scope.data = "Something went wrong";
  });
    }*/
/* $scope.addRow=function(){   
        /*   $http.post('/content-items/ajax/training/formdamageinsert', {
                    
                
            
                   
            }).then(function(response){
                    $scope.packageItems.push({ 'PackageID':$scope.PackageID, 'ItemNumber': $scope.ItemNumber, 'Quantity':$scope.Quantity, 'SerialNumber':$scope.SerialNumber });
                $scope.PackageID = "",
                $scope.ItemNumber = "",
                $scope.Quantity = "",
                $scope.SerialNumber = "";
                console.log("Data Inserted Successfully");
                },function(error){
                    alert("Sorry! Data Couldn't be inserted!");
                    console.error(error);

                });
     
 }*/
     
    /*$http({

      method: 'POST',
      url: '/content-items/ajax/training/formdamageinsert',
      data: { 
           'PackageID':$scope.PackageID,
           'ItemNumber': $scope.ItemNumber, 
           'Quantity':$scope.Quantity,
           'SerailNumber':$scope.SerailNumber
       }
    }).then(function successCallback(response) {

      //$scope.packageItems= response.data;
      //alert("Record inserted Successfully")
        console.log('success');
        

    }, function errorCallback(response) {

      alert("Error. while created user Try Again!");

    });

  };
    */
    
     /*$scope.addRow = function() {
        var  dataObj = { 
           'PackageID':$scope.PackageID,
           'ItemNumber': $scope.ItemNumber, 
           'Quantity':$scope.Quantity,
           'SerialNumber':$scope.SerialNumber
       }
    $http.post('/content-items/ajax/training/formdamageinsert', dataObj)
         .success(function (dataObj) {
                $scope.packageItems.push(dataObj);
            })
            post.error(function (data) {
               console.log('error');
            });
         */

    //$http POST function
  /*  $scope.package = { 
           'PackageID':'',
           'ItemNumber':'', 
           'Quantity':'',
           'SerialNumber':''
       }
    $scope.addRow = function() {
       
        
    var successCallback  = function successCallback(response) {
        console.log('inside success callback');
         console.log(response.data);

      $scope.packageItems = response.data;
      alert("record inserted Successfully")

    }
    
    var errorCallback = function errorCallback(response) {

      alert("Error. while inserting record Try Again!");
                                      console.log('inside error call back');

    }
    $http({

      method: 'POST',
      url: '/content-items/ajax/training/formdamageinsert',
      data: $scope.package

    }).then(successCallback,errorCallback );

  };

                                      
                                    
    //Delete User
  $scope.deletePackage = function(package) {

    //$http DELETE function
    $http({

      method: 'DELETE',
      url: 'content-items/ajax/training/formdamagedelete' + package.id

    }).then(function successCallback(response) {

      console.log("deleted Successfully");
      var index = $scope.packageItems.indexOf(package);
      $scope.packageItems.splice(index, 1);

    }, function errorCallback(response) {

      alert("Error. while deleting user Try Again!");

    });

  };
    
     $scope.editPackage = function(package) {

    $scope.packageItems = package;
   

  };

            
    
   /* $scope.addRow = function () {
            
                var post = $http({
                    method: 'POST',
                    url: '/content-items/ajax/training/formdamageinsert',
                    data: { 
                           PackageID: $scope.PackageID,
                           ItemNumber: $scope.ItemNumber,
                           Quantity: $scope.Quantity ,
                           SerialNumber: $scope.SerialNumber
                          },
                    dataType: 'json',
                    headers: { "Content-Type": "application/json" }
                });
                post.success(function (data, status) {
                    //The newly inserted record is inserted into the Customers array.
                    $scope.packageItems.push(data)
                    getData();
                });
                $scope.PackageID = "";
                $scope.ItemNumber = "";
        $scope.Quantity="";
        $scope.SerialNumber="";
            };
    
    
*/
      $scope.PackageID = '';
      $scope.ItemNumber = '';
      $scope.Quantity='';
      $scope.SerialNumber='';
    
    $scope.addRow = function(){
        
        $http.post('/content-items/ajax/training/formdamageinsert',{
            PackageID : $scope.PackageID,
            ItemNumber : $scope.ItemNumber,
            Quantity : $scope.Quantity,
            SerialNumber: $scope.SerialNumber})
        .success(function(result){
                 $scope.packageItems = result;
                 $scope.PackageID = '';
                 $scope.ItemNumber = '';
                 $scope.Quantity='';
                 $scope.SerialNumber='';
                 })
        .error(function(data,status){
            console.log(data);
            
        })
        
        
    };
        
        
        $scope.printMessage = function(){		
	//$scope.packageItems.push({ 'PackageID':$scope.packageID, 'ItemNumber': $scope.itemNumber, 'Quantity':$scope.quantity, 'SerailNumber':$scope.serailNumber });
	console.log('Inside printMessage function');
	
};
}]);