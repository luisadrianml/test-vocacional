angular.module('testVApp', []);


angular.module('testVApp')
    .controller("MainCtrl", function ($scope, $http) {
        $scope.vars = {
            R: 0,
            I: 0,
            A: 0,
            S: 0,
            E: 0,
            C: 0
        };
        $scope.section = null;

        $http.get("/data/questions.json").then(function (res) {
            console.info(res);
            $scope.section = res.data.sections[0];
            console.info($scope.section);
        });

        $scope.setR = function () {
            $scope.R += 1;
        }
    });