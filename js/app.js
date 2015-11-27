angular.module('testVApp', []);


angular.module('testVApp')
    .controller("MainCtrl", function ($scope, $http) {
        $scope.buttons = [1 ,0];
        $scope.currentStep = 0;
        $scope.moveFoward = 0;
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

        $scope.saveClick = function(answer) {
            $scope.vars.R += answer;
            $scope.currentStep++;

            if ($scope.currentStep===11) {
                $scope.moveFoward++;
                $scope.currentStep = 0;
                console.log("test");
            }
        }
    });