var app = angular.module('websocket-chat', []);

/**
 * Controller for the (chat) app
 */
app.controller('ChatController',['$scope', function($scope) {

    var cc=this;
    var socket = io();
    $scope.messages = [];

    socket.on('chat message', function(msg){
        $scope.messages.unshift(msg);
        $scope.$apply();
    });


    //Method called when form is submitted
    cc.sendMessage =function(){
        if(cc.msg && cc.name){
            socket.emit('chat message', {msg:cc.msg,sender:cc.name});
            cc.msg=''; //Empty the chat message box
        }
    };

}]);