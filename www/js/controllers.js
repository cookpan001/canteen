angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, RoomCondition) {
    $scope.conditions = RoomCondition;
})

.controller('HallCtrl', function($scope) {})

.controller('RoomsCtrl', function($scope, Rooms, RoomCondition) {
  $scope.conditions = RoomCondition;
  $scope.rooms = Rooms.all();
  $scope.getRooms = function(room, index) {
    var c = $scope.conditions.hall + ($scope.conditions.special << 1);
    if((room.type & c) > 0){
        return true;
    }
    return false;
  }
})

.controller('RoomDetailCtrl', function($scope, $stateParams, $ionicModal, $timeout, Rooms, Foods, Orders, Storage) {
  $scope.foods = Foods.all();
  $scope.room = Rooms.get($stateParams.roomId);
  $scope.orders = Orders;
  var storage = Storage.getInstance('orders' + $stateParams.roomId);
  $scope.detail = storage.get('detail', []);
  $scope.total = storage.get('total', 0);
  $scope.order = function(roomId, food, num){
    var isNew = false;
    if($scope.orders[roomId] == undefined){
        $scope.orders[roomId] = {};
    }
    if($scope.orders[roomId][food.id] == undefined){
        isNew = true;
        $scope.orders[roomId][food.id] = num;
    }else{
        $scope.orders[roomId][food.id] += num;
    }
    if($scope.orders[roomId][food.id] < 0){
        $scope.orders[roomId][food.id] = 0;
    }
    var foodNum = $scope.orders[roomId][food.id];
    var used = foodNum * food.price;
    $scope.total = 0;
    if(isNew){
        $scope.detail.push({id: food.id, name: food.name, num: foodNum, cash: used});
    }else{
      for(var i = 0; i < $scope.detail.length; i++){
        if($scope.detail[i].id == food.id){
          $scope.detail[i].num = foodNum;
          $scope.detail[i].cash = used;
        }
        if($scope.detail[i].num <= 0){
          $scope.detail.splice(i, 1);
          continue;
        }
        $scope.total += $scope.detail[i].cash;
      }
    }
    storage.set('total', $scope.total);
  }
  $ionicModal.fromTemplateUrl('templates/checkout.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.close = function() {
    $scope.modal.hide();
  };
  $scope.open = function() {
    $scope.modal.show();
  };

  $scope.doCheckout = function() {
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.close();
    }, 1000);
  };
})

.controller('SettingCtrl', function($scope, Setting) {
  $scope.settings = Setting;
});
