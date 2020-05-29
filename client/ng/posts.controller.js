angular.module('app')
    .controller('PostsCtrl', function($scope, PostsService){
        PostsService.fetch().success(function(posts) {
            $scope.posts = posts.map(function(post){
                return {
                    username: post.username,
                    body: post.body,
                    date: new Date(post.date),
                }
            })
            console.log($scope.posts)
        })

        $scope.addPost = function() {
            if ($scope.postBody) {
                var postContent = {
                    username: $scope.currentUser.username,
                    body: $scope.postBody,
                }

                PostsService.create(postContent).success(function(post) {
                    post.date = new Date()
                    $scope.posts.unshift(post)
                    $scope.postBody = null
                })
            }
        }
    });
