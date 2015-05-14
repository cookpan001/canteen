angular.module('starter.services', [])
.factory('Foods', function(){
  var foods = [
    { name: '宫保鸡丁', src: "img/jiding.jpg", id: 1, price: 10},
    { name: '醋溜土豆丝', src: "img/tudou.jpg", id: 2, price: 12},
    { name: '鱼香肉丝', src: "img/yuxiang.jpg", id: 3, price: 13 },
    { name: '干煸豆角', src: "img/doujiao.jpg", id: 4, price: 15 },
    { name: '清蒸鲈鱼', src: "img/luyu.jpg", id: 5, price: 20 },
    { name: '水果沙拉', src: "img/shala.jpg", id: 6, price: 6 },
    { name: '可口可乐', src: "img/coke.jpg", id: 7, price: 3 }
  ];
  return {
    all: function(){
      return foods;
    }
  };
})
.factory('Setting', function(){
  return {
    enableFriends: true
  };
})
.factory('Orders', function(){
  return {};
})
.factory('Storage', function(){
  var pools = {};
  return {
    getInstance: function(name){
      if(undefined !== pools[name]){
        return pools[name];
      }
      var obj = {
        set: function(key, value){
          pools[key] = value;
        },
        get: function(key, defaultValue){
          if (pools[key]) {
            return pools[key];
          };
          pools[key] = defaultValue;
          return defaultValue;
        }
      };
      pools[name] = obj;
      return obj;
    }
  };
})
.factory('RoomCondition', function(){
  return {
    hall: true,
    special: true
  };
})
.factory('Rooms', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var rooms = [{
    id: 1, type: 2, name: '',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 2, type: 2, name: '',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 3, type: 2, name: '',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4, type: 1, name: '',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }, {
    id: 5, type: 1, name: '',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];
  var getName = function(type){
    if(type == 2){
      return '包间';
    }
    if(type == 1){
      return '大厅';
    }
  }
  var getRoom = function(type) {
    var tmp = [];
    for (var i = 0; i < rooms.length; i++) {
      var room = rooms[i];
      if(room.name === ''){
        room.name = getName(room.type) + room.id;
      }
      if (room.type == type || type == undefined) {
        tmp.push(room);
      }
    }
    return tmp;
  };

  return {
    all: function() {
      return getRoom();
    },
    get: function(roomId) {
      for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].id === parseInt(roomId)) {
          return rooms[i];
        }
      }
      return null;
    }
  };
});
