angular.module('app')
    .controller('PostsCtrl', function($scope, PostsService){
        // Load all current posts
        PostsService.fetch().success(function(posts) {
            $scope.posts = posts.map(function(post){
                return {
                    username: post.username,
                    body: post.body,
                    date: new Date(post.date),
                }
            })
        })

        // Add new post
        $scope.addPost = function() {
            if ($scope.postBody) {
                var postContent = {
                    username: $scope.currentUser.username,
                    body: $scope.postBody,
                }

                PostsService.create(postContent).success(function(post) {
                    // NOTE: we dont have to add to the local messages,
                    // as a WS event will trigger form our own action and do it (below)
                    $scope.postBody = null
                })
            }
        }

        // Listen out for post from another client
        $scope.$on('ws:new_post', function(_, post) {
            // triggers angular refresh
            $scope.$apply(function(){
                // Convert string date to object
                post.date = new Date(post.date)
                $scope.posts.unshift(post)
            })
        })
    });
