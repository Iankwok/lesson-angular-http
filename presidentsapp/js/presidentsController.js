angular.module('ThePresidentsApp', [])
  .controller('PresidentsController', ['$scope', '$http', function PresidentsController($scope , $http){
  $scope.all = [];

  $scope.newPresident = {};
  $scope.editPresident = {};
  $scope.addPresident = addPresident;
  $scope.showPresident = showPresident;
  $scope.deletePresident = deletePresident;


  getPresidents();

  function getPresidents(){
    $http
    .get('http://localhost:3000/presidents')
    .success(function(response){
      $scope.all = response.presidents;
    })
  }

  function addPresident(){
    $http
    .post('http://localhost:3000/presidents', $scope.newPresident)
    .success(function(data){
      getPresidents();
    });
    $scope.newPresident = {};
  }

   function showPresident(president){
    $scope.editPresident = president;
  }

  function updatePresident(president){
    $scope.editPresident = president;
  }

  function deletePresident(president){
    $http
    .delete("http://localhost:3000/presidents/" + president._id)
    .then(function(response){
      var index = $scope.all.indexOf(president);
      $scope.all.splice(index, 1);
    })
  }

}]);
