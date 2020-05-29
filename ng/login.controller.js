angular.module('app')
    .controller('LoginCtrl', function($scope, UserService){
        $scope.login = function(username, password) {
            UserService.login(username, password)
                .then(function(response){
                    $scope.$emit('login', response.data)
                })
        }
    });
