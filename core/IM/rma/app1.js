
var app = angular.module('add-row', []);

  app.controller('MainCtrl', function($scope) {
    
//  $scope.dataType = ['type1', 'type2', 'type'];
      $scope.dataType = [
    {id: 1, colId:['col1', 'col4'], dataTypeName: 'Date'},
    {id: 2, colId:['col2', 'col3'], dataTypeName: 'Alpha'},
    {id: 3, colId:['col5', 'col6', 'col7', 'col8'], dataTypeName: 'List Value'}
  ];
  
 $scope.columns = [];
  
  $scope.addnewcolumn = function() {
    var newitemno = $scope.columns.length+1;
    $scope.columns.push({'colid':'col'+newitemno});
  // };
    

  $scope.removecolumn = function(index) {
    // remove the row specified in index
    $scope.columns.splice( index, 1);
    // if no rows left in the array create a blank array
    if ( $scope.columns.length() === 0 || $scope.columns.length() == null){
      alert('no rec');
      $scope.columns.push = [{"colid":"col1"}];
    }
		
  
  };
console.log('angular test');

  
});