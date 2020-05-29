angular.module('app')
    .controller('RegisterCtrl', function($scope, UserService){
        $scope.register = function(username, password) {
            if (username && password) {
                UserService.create(username, password)
                    .then(function (response) {
                        console.log('Emit Login: ', response.data)
                        $scope.$emit('login', response.data)
                    })
            } else {
                alert('Please supply username and password')
            }
        }
    });
