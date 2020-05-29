angular.module('app')
    .service('UserService', function($http) {
        var service = this

        service.getUser = function() {
            return $http.get('/api/users')
        }

        service.login = function(username, password) {
            return $http.post('/api/sessions', {
                username: username, password: password
            }).then(function(val){
                service.token = val.data
                $http.defaults.headers.common['X-Auth'] = val.data
                return service.getUser()
            })
        }

        service.create = function(username, password) {
            return $http.post('/api/users', {
                username: username, password: password
            }).then(function(val){
                return service.login(username, password)
            })
        }
    })
