angular.module('app')
    .controller('PostsCtrl', function($scope, PostsService){
        PostsService.fetch().success(function(posts) {
            $scope.posts = posts
        })

        $scope.addPost = function() {
            if ($scope.postBody) {
                var postContent = { username: 'anon', body: $scope.postBody }

                PostsService.create(postContent).success(function(post) {
                    $scope.posts.unshift(postContent)
                    $scope.postBody = null
                })
            }
        }
    });
