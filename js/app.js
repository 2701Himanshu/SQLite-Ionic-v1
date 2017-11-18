// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    db = $cordovaSQLite.openDB({ name: "my.db", location: 'default'});
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('FormCtrl', ['$scope','$rootScope','$cordovaSQLite', function($scope, $cordovaSQLite){
  $scope.test = "Himanshu";
  $scope.alternateNumberRequired = false;
  var data = [];
  $scope.addMoreItem = function(){
    $scope.alternateNumberRequired = true;
  };
  $scope.submit = function(){
    var id = Date.now();
    var name = $scope.name;
    var address = $scope.address;
    var DOB = $scope.DOB.toDateString();
    var contact = $scope.contact;
    if($scope.alternateNumberRequired){
      var contact1 = $scope.contact1;
    } else {
      var contact1 = undefined;
    }
    

    console.log("id: "+id+" name: "+name+" address: "+address+" DOB: "+DOB+" contact: "+contact+" contact1: "+contact1);
    var query = "INSERT INTO sqliteDb (id, name, address, dob, contact, contact1) VALUES ("+id+",)";
    
    db.transaction(function(tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS DBTable (id, name, address, dob, contact, contact1)');
      tx.executeSql('INSERT INTO DBTable VALUES (?,?,?,?,?,?)', [id, name, address, DOB, contact, contact1]);
    }, function(err){
      console.log('Transaction ERROR: ' + error.message);
    },function(){
       console.log('Transaction success !');
    });
  };

  $scope.getRecord = function(){
    debugger;
    db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM DBTable', [], function(tx, rs) {
        data = [];
        for (var i = 0; i < rs.rows.length; i++){
          data.push(rs.rows.item(i));
          // console.log(rs.rows.item(i).name);
        }
        $scope.data = data;
      }, function(tx, error) {
        console.log('SELECT error: ' + error.message);
      });
    });
    $scope.data = data;
  };
}]);