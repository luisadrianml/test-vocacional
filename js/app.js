angular.module('testVApp', ['testVfilter']);


angular.module('testVApp')
    .controller("MainCtrl", function ($scope, $http) {
        $scope.autoEvaluation = [1,2,3,4,5,6,7];
        $scope.textQuestionSection = [{"yes": "Me gusta", "no":"Me disgusta"}, {"yes": "Si", "no":"No"}];
        $scope.currentQuestion = 0;
        $scope.showEvaluation = false;
        $scope.endOfQuestions = false;
        var textVars = ["R", "I", "A", "S", "E", "C"];
        $scope.currentVariable = 0;
        $scope.currentSection = 0;
        $scope.sectionOfYes = 0;
        $scope.vars = {
            R: 0,
            I: 0,
            A: 0,
            S: 0,
            E: 0,
            C: 0
        };
        $scope.sections = null;

        $http.get("/data/questions.json").then(function (res) {
            console.info(res);
            $scope.sections = res.data.sections;
            console.info($scope.sections);
        });

        $scope.saveClick = function(answer) {

            $scope.vars[textVars[$scope.currentVariable]] += answer;
            $scope.currentQuestion++;
            if ($scope.currentQuestion===11 && $scope.currentSection < 2) {
                $scope.currentVariable++;
                $scope.currentQuestion = 0;
                console.log("test");

                if ($scope.currentVariable == 6) { // Changing the Section
                    $scope.currentSection++;
                    $scope.currentQuestion = 0;
                    $scope.currentVariable=0;
                }
            } else if($scope.currentSection == 2 && $scope.currentQuestion===14) {
                $scope.currentVariable++;
                $scope.currentQuestion = 0;
                console.log("test222");

                if ($scope.currentVariable == 6) { // Changing the Section
                    // Specify to ask the other questions :autoevaluacion:
                    $scope.showEvaluation = true;
                    $scope.currentSection++;
                    $scope.currentQuestion = 0;
                    $scope.currentVariable=0;
                }
            } else if ($scope.currentSection==3 && $scope.currentQuestion==2) {
                $scope.currentVariable++;
                $scope.currentQuestion = 0;
                console.log("test333");

                if ($scope.currentVariable == 6) { // Changing the Section
                    // Specify to ask the other questions :autoevaluacion:
                    $scope.endOfQuestions = true;
                }
            }



            if ($scope.currentSection == 1) {
                $scope.sectionOfYes = 1;
            }

        }
    });