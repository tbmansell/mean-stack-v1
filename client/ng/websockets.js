angular.module('app')
    .run(function($rootScope, $timeout) {
        var url = 'ws://localhost:3000'
        var connection = new WebSocket(url)

        connection.onopen = function() {
            console.log('Websocket connected')
        }

        connection.onmessage = function(e) {
            var payload = JSON.parse(e.data)
            $rootScope.$broadcast('ws:' + payload.topic, payload.data)
        }
    })
