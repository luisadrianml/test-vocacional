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

        /*
        * Method GET to retrieve the questions from the Json
        * */
        $http.get("/data/questions.json").then(function (res) {
            console.info(res);
            $scope.sections = res.data.sections;
            console.info($scope.sections);
        });

        $scope.careers = null;

        /*
         * Method GET to retrieve the careers from the Json
         * */
        $http.get("/data/codigoscarreras.json").then(function (res) {
            console.info(res);
            $scope.careers = res.data.careers;
            console.info($scope.careers);
        });

        /*
        * Method to save the answer selected by the user
        * */
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
                    // Set true if all regular questions asked
                    $scope.endOfQuestions = true;
                }
            }



            if ($scope.currentSection == 1) {
                $scope.sectionOfYes = 1;
            }

        }
        // end of method saveClick(answer)

        $scope.arrayOfCodes = {
            "R":"1",
            "I":"1",
            "A":"0",
            "S":"0",
            "E":"0",
            "C":"1"
        };
        $scope.findCareerWithoutOderder = function(arrayOfCodes) {
            var spaceWhereCareerIs = [0];
            var careersAvailable = [];

            for (var i = 1; i < $scope.careers.length; i++) {
                var weNeedThree = 0;
                if (arrayOfCodes.R == $scope.careers[i].R && arrayOfCodes.R==1) weNeedThree++;
                if (arrayOfCodes.I == $scope.careers[i].I && arrayOfCodes.I==1) weNeedThree++;
                if (arrayOfCodes.A == $scope.careers[i].A && arrayOfCodes.A==1) weNeedThree++;
                if (arrayOfCodes.S == $scope.careers[i].S && arrayOfCodes.S==1) weNeedThree++;
                if (arrayOfCodes.E == $scope.careers[i].E && arrayOfCodes.E==1) weNeedThree++;
                if (arrayOfCodes.C == $scope.careers[i].C && arrayOfCodes.C==1) weNeedThree++;


                if (weNeedThree==3) {
                    spaceWhereCareerIs.push(i);
                    console.log("We got here", spaceWhereCareerIs.length,
                    spaceWhereCareerIs[0], spaceWhereCareerIs[1]);

                } else {
                    console.log(weNeedThree);
                }
            }

            if (spaceWhereCareerIs.length  == 1) {
                careersAvailable.push($scope.careers[spaceWhereCareerIs[0]].name);
                console.log(($scope.careers[spaceWhereCareerIs[0]].name));
            } else {
                for (var i = 1; i < spaceWhereCareerIs.length; i++) {
                   careersAvailable.push($scope.careers[spaceWhereCareerIs[i]].name);
                    console.log(($scope.careers[spaceWhereCareerIs[i]].name));
                }
            }

            return careersAvailable;

        }

        var R = 0;
        var I = 0;
        var A = 0;
        var S = 0;
        var E = 0;
        var C = 0;

        $scope.findThreeMayors = function(R, I, A, S, E, C) {
            var primerMayor = 0;
            var segundoMayor = 0;
            var tercerMayor = 0;


            if (R>=I && R>=A && R>=S && R>=E && R>=C) { // R
                        if (I>=A && I>=S && I>=E && I>=C) { // R y I
                                    if(A>=S && A>=E && A>=C) { // R, I y A
                                        primerMayor = R;
                                        segundoMayor = I;
                                        tercerMayor = A;
                                    }
                                    else if(S>=A && S>=E && S>=C) { // R, I y S
                                        primerMayor = R;
                                        segundoMayor = I;
                                        tercerMayor = S;
                                    }
                                    else if(E>=A && E>=S && E>=C) { // R, I y E
                                        primerMayor = R;
                                        segundoMayor = I;
                                        tercerMayor = E;
                                    }
                                    else if(C>=A && C>=S && C>=E) { // R, I y C
                                        primerMayor = R;
                                        segundoMayor = I;
                                        tercerMayor = C;
                                    }
                        }
                        else if (A>=I && A>=S && A>=E && A>=C) { // R y A
                                    if (I>=S && I>=E && I>=C) { // R, A y I
                                        primerMayor = R;
                                        segundoMayor = A;
                                        tercerMayor = I;
                                    }
                                    else if (S>=I && S>=E && S>=C) { // R, A y S
                                        primerMayor = R;
                                        segundoMayor = A;
                                        tercerMayor = S;
                                    }
                                    else if (E>=I && E>=S && E>=C) { // R, A y E
                                        primerMayor = R;
                                        segundoMayor = A;
                                        tercerMayor = E;
                                    }
                                    else if (C>=I && C>=S && C>=E) { // R, A y C
                                        primerMayor = R;
                                        segundoMayor = A;
                                        tercerMayor = C;
                                    }

                        }
                        else if (S>=I && S>=A && S>=E && S>=C) { // R y S
                                    if (I>=A && I>=E && I>=C) { // R, S y I
                                        primerMayor = R;
                                        segundoMayor = S;
                                        tercerMayor = I;
                                    }
                                    else if (A>=I && A>=E && A>=C) { // R, S y A
                                        primerMayor = R;
                                        segundoMayor = S;
                                        tercerMayor = A;
                                    }
                                    else if (E>=A && E>=I && E>=C) { // R, S y E
                                        primerMayor = R;
                                        segundoMayor = S;
                                        tercerMayor = E;
                                    }
                                    else if (C>=A && C>=I && C>=E) { // R, S y C
                                        primerMayor = R;
                                        segundoMayor = S;
                                        tercerMayor = C;
                                    }
                        }
                        else if (E>=I && E>=A && E>=S && E>=C) { // R y E
                                    if (I>=A && I>=S && I>=C) { // R, E y I
                                        primerMayor = R;
                                        segundoMayor = E;
                                        tercerMayor = I;
                                    }
                                    else if (A>=I && A>=S && A>=C) { // R, E y A
                                        primerMayor = R;
                                        segundoMayor = E;
                                        tercerMayor = A;
                                    }
                                    else if (S>=A && S>=I && S>=C) { // R, E y S
                                        primerMayor = R;
                                        segundoMayor = E;
                                        tercerMayor = S;
                                    }
                                    else if (C>=A && C>=I && C>=S) { // R, E y C
                                        primerMayor = R;
                                        segundoMayor = E;
                                        tercerMayor = C;
                                    }
                        }
                        else if (C>=I && C>=A && C>=S && C>=E) { // R y C
                                    if (I>=A && I>=S && I>=E) { // R, C y I
                                        primerMayor = R;
                                        segundoMayor = C;
                                        tercerMayor = I;
                                    }
                                    else if (A>=I && A>=S && A>=E) { // R, C y A
                                        primerMayor = R;
                                        segundoMayor = C;
                                        tercerMayor = A;
                                    }
                                    else if (S>=A && S>=I && S>=E) { // R, C y S
                                        primerMayor = R;
                                        segundoMayor = C;
                                        tercerMayor = S;
                                    }
                                    else if (E>=A && E>=I && E>=S) { // R, C y E
                                        primerMayor = R;
                                        segundoMayor = C;
                                        tercerMayor = E;
                                    }
                        }
            }
            else if(I>=R && I>=A && I>=S && I>=E && I>=C) {
                        if (R>=A && R>=S && R>=E && R>=C) { // I y R
                                    if(A>=S && A>=E && A>=C) { // I, R y A
                                        primerMayor = I;
                                        segundoMayor = R;
                                        tercerMayor = A;
                                    }
                                    else if(S>=A && S>=E && S>=C) { // I, R y S
                                        primerMayor = I;
                                        segundoMayor = R;
                                        tercerMayor = S;
                                    }
                                    else if(E>=A && E>=S && E>=C) { // I, R y E
                                        primerMayor = I;
                                        segundoMayor = R;
                                        tercerMayor = E;
                                    }
                                    else if(C>=A && C>=S && C>=E) { // I, R y C
                                        primerMayor = I;
                                        segundoMayor = R;
                                        tercerMayor = C;
                                    }
                        }
                        else if (A>=R && A>=S && A>=E && A>=C) { // I y A
                                    if (R>=S && R>=E && R>=C) { // I, A y R
                                        primerMayor = I;
                                        segundoMayor = A;
                                        tercerMayor = R;
                                    }
                                    else if (S>=R && S>=E && S>=C) { // I, A y S
                                        primerMayor = I;
                                        segundoMayor = A;
                                        tercerMayor = S;
                                    }
                                    else if (E>=R && E>=S && E>=C) { // I, A y E
                                        primerMayor = I;
                                        segundoMayor = A;
                                        tercerMayor = E;
                                    }
                                    else if (C>=R && C>=S && C>=E) { // I, A y C
                                        primerMayor = I;
                                        segundoMayor = A;
                                        tercerMayor = C;
                                    }

                        }
                        else if (S>=R && S>=A && S>=E && S>=C) { // I y S
                                    if (R>=A && R>=E && R>=C) { // I, S y R
                                        primerMayor = I;
                                        segundoMayor = S;
                                        tercerMayor = R;
                                    }
                                    else if (A>=R && A>=E && A>=C) { // I, S y A
                                        primerMayor = I;
                                        segundoMayor = S;
                                        tercerMayor = A;
                                    }
                                    else if (E>=A && E>=R && E>=C) { // I, S y E
                                        primerMayor = I;
                                        segundoMayor = S;
                                        tercerMayor = E;
                                    }
                                    else if (C>=A && C>=R && C>=E) { // I, S y C
                                        primerMayor = I;
                                        segundoMayor = S;
                                        tercerMayor = C;
                                    }
                        }
                        else if (E>=R && E>=A && E>=S && E>=C) { // I y E
                                    if (R>=A && R>=S && R>=C) { // I, E y R
                                        primerMayor = I;
                                        segundoMayor = E;
                                        tercerMayor = R;
                                    }
                                    else if (A>=R && A>=S && A>=C) { // I, E y A
                                        primerMayor = I;
                                        segundoMayor = E;
                                        tercerMayor = A;
                                    }
                                    else if (S>=A && S>=R && S>=C) { // I, E y S
                                        primerMayor = I;
                                        segundoMayor = E;
                                        tercerMayor = S;
                                    }
                                    else if (C>=A && C>=R && C>=S) { // I, E y C
                                        primerMayor = I;
                                        segundoMayor = E;
                                        tercerMayor = C;
                                    }
                        }
                        else if (C>=R && C>=A && C>=S && C>=E) { // I y C
                                    if (R>=A && R>=S && R>=E) { // I, C y I
                                        primerMayor = I;
                                        segundoMayor = C;
                                        tercerMayor = R;
                                    }
                                    else if (A>=R && A>=S && A>=E) { // I, C y A
                                        primerMayor = I;
                                        segundoMayor = C;
                                        tercerMayor = A;
                                    }
                                    else if (S>=A && S>=R && S>=E) { // I, C y S
                                        primerMayor = I;
                                        segundoMayor = C;
                                        tercerMayor = S;
                                    }
                                    else if (E>=A && E>=R && E>=S) { // I, C y E
                                        primerMayor = I;
                                        segundoMayor = C;
                                        tercerMayor = E;
                                    }
                        }

            }
            else if(A>=R && A>=I && A>=S && A>=E && A>=C) { // A
                        if (R>=I && R>=S && R>=E && R>=C) { // A y R
                                    if(I>=S && I>=E && I>=C) { // A, R y I
                                        primerMayor = A;
                                        segundoMayor = R;
                                        tercerMayor = I;
                                    }
                                    else if(S>=I && S>=E && S>=C) { // A, R y S
                                        primerMayor = A;
                                        segundoMayor = R;
                                        tercerMayor = S;
                                    }
                                    else if(E>=I && E>=S && E>=C) { // A, R y E
                                        primerMayor = A;
                                        segundoMayor = R;
                                        tercerMayor = E;
                                    }
                                    else if(C>=I && C>=S && C>=E) { // A, R y C
                                        primerMayor = A;
                                        segundoMayor = R;
                                        tercerMayor = C;
                                    }
                        }
                        else if (I>=R && I>=S && I>=E && I>=C) { // A y I
                            if (R>=S && R>=E && R>=C) { // A, I y R
                                primerMayor = A;
                                segundoMayor = I;
                                tercerMayor = R;
                            }
                            else if (S>=R && S>=E && S>=C) { // A, I y S
                                primerMayor = A;
                                segundoMayor = I;
                                tercerMayor = S;
                            }
                            else if (E>=R && E>=S && E>=C) { // A, I y E
                                primerMayor = A;
                                segundoMayor = I;
                                tercerMayor = E;
                            }
                            else if (C>=R && C>=S && C>=E) { // A, I y C
                                primerMayor = A;
                                segundoMayor = I;
                                tercerMayor = C;
                            }
                        }
                        else if (S>=R && S>=I && S>=E && S>=C) { // A y S
                            if (R>=I && R>=E && R>=C) { // A, S y R
                                primerMayor = A;
                                segundoMayor = S;
                                tercerMayor = R;
                            }
                            else if (I>=R && I>=E && I>=C) { // A, S y I
                                primerMayor = A;
                                segundoMayor = S;
                                tercerMayor = I;
                            }
                            else if (E>=I && E>=R && E>=C) { // A, S y E
                                primerMayor = A;
                                segundoMayor = S;
                                tercerMayor = E;
                            }
                            else if (C>=I && C>=R && C>=E) { // A, S y C
                                primerMayor = A;
                                segundoMayor = S;
                                tercerMayor = C;
                            }
                        }
                        else if (E>=R && E>=I && E>=S && E>=C) { // A y E
                            if (R>=I && R>=S && R>=C) { // A, E y R
                                primerMayor = A;
                                segundoMayor = E;
                                tercerMayor = R;
                            }
                            else if (I>=R && I>=S && I>=C) { // A, E y I
                                primerMayor = A;
                                segundoMayor = E;
                                tercerMayor = I;
                            }
                            else if (S>=I && S>=R && S>=C) { // A, E y S
                                primerMayor = A;
                                segundoMayor = E;
                                tercerMayor = S;
                            }
                            else if (C>=I && C>=R && C>=S) { // A, E y C
                                primerMayor = A;
                                segundoMayor = E;
                                tercerMayor = C;
                            }
                        }
                        else if (C>=R && C>=I && C>=S && C>=E) { // A y C
                            if (R>=I && R>=S && R>=E) { // A, C y I
                                primerMayor = A;
                                segundoMayor = C;
                                tercerMayor = I;
                            }
                            else if (I>=R && I>=S && I>=E) { // A, C y I
                                primerMayor = A;
                                segundoMayor = C;
                                tercerMayor = I;
                            }
                            else if (S>=I && S>=R && S>=E) { // A, C y S
                                primerMayor = A;
                                segundoMayor = C;
                                tercerMayor = S;
                            }
                            else if (E>=I && E>=R && E>=S) { // A, C y E
                                primerMayor = A;
                                segundoMayor = C;
                                tercerMayor = E;
                            }
                        }
            }

            console.log("Prueba: ", primerMayor, segundoMayor, tercerMayor);
        }

    });