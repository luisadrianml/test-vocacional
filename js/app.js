angular.module('testVApp', ['testVfilter', 'chart.js', '720kb.tooltips']);


angular.module('testVApp')
    .controller("BarCtrl", function ($scope, $http, $timeout) {
        $scope.autoEvaluation = [1,2,3,4,5,6,7];
        $scope.textQuestionSection = [{"yes": "Me gusta", "no":"Me disgusta"}, {"yes": "Si", "no":"No"}];
        $scope.currentQuestion = 0;
        $scope.showEvaluation = false;
        $scope.endOfQuestions = false;
        var textVars = ["R", "I", "A", "S", "E", "C"];
        $scope.currentVariable = 0;
        $scope.currentSection = 0; //Change it back
        $scope.sectionOfYes = 0;
        $scope.vars = {
            R: 0,
            I: 0,
            A: 0,
            S: 0,
            E: 0,
            C: 0
        };
        $scope.careersSuggestions = [];
        $scope.suggestedCode = "No hay código sugerido";
        $scope.careersSuggestionsNoOrder = [];
        $scope.noOrdinaryCareer = false;
        $scope.careerWithOrderChanged = false;
        $scope.messages = [];
        $scope.firstLetter = null;
        $scope.secondLetter = null;
        $scope.thirdLetter = null;
        $scope.psMessage = "Para profundizar los resultados acercarse a un psicologo vocacional.";
        $scope.nothingFound = "No fue posible encontrar una carrera, favor ponerse en contacto con un psicologo vocacional con estos resultados para mayor analisis."
        $scope.showPsMessage = false;
        $scope.showNothingFound = false;
        $scope.sections = null;
        $scope.careersNoOrders = null;
        $scope.careers = null;
        $scope.personalities = null;

        $scope.labels = ['R', 'I', 'A', 'S', 'E', 'C'];
        $scope.series = ['Resultados'];

        /**
         * Method GET to retrieve the 'questions' from the Json
         */
        $http.get("/data/questions.json").then(function (res) {
            console.info(res);
            $scope.sections = res.data.sections;
            console.info($scope.sections);
        });

        /**
         * Method GET to retrieve the 'careers without order' from the Json
         */
        $http.get("/data/codigoscarreras.json").then(function (res) {
            console.info(res);
            $scope.careersNoOrders = res.data.careers;
            console.info($scope.careersNoOrders);
        });

        /**
         * Method GET to retrieve the 'careers for specific order' from the Json
         */
        $http.get("/data/careers.json").then(function (res) {
            console.info(res);
            $scope.careers = res.data.careers;
            console.info($scope.careers);
        });

        /**
         * Method GET to retrieve the 'personalities' from the Json
         */
        $http.get("/data/personalities.json").then(function (res) {
            console.info(res);
            $scope.personalities = res.data.messages;
            console.info($scope.messages);
        });

        /**
         * Method to save the answer selected by the user
         * @param answer is the value when selecting between Yes O No (1 o 0)
         */
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
                    $scope.data = [
                        [$scope.vars.R, $scope.vars.I, $scope.vars.A, $scope.vars.S, $scope.vars.E, $scope.vars.C]
                    ];
                }
            }



            if ($scope.currentSection == 1) {
                $scope.sectionOfYes = 1;
            }

        }

        /**
         * Method to find which career to suggest without any order about the letters
         * @param arrayOfCodes is an array with 1 ones for the mayors letters
         * @returns {Array} array with only string of careers available
         */
        $scope.findCareerWithoutOrder = function(arrayOfCodes) {
            var spaceWhereCareerIs = [0];
            var careersAvailable = [];

            for (var i = 1; i < $scope.careersNoOrders.length; i++) {
                var weNeedThree = 0;
                if (arrayOfCodes.R == $scope.careersNoOrders[i].R && arrayOfCodes.R==1) weNeedThree++;
                if (arrayOfCodes.I == $scope.careersNoOrders[i].I && arrayOfCodes.I==1) weNeedThree++;
                if (arrayOfCodes.A == $scope.careersNoOrders[i].A && arrayOfCodes.A==1) weNeedThree++;
                if (arrayOfCodes.S == $scope.careersNoOrders[i].S && arrayOfCodes.S==1) weNeedThree++;
                if (arrayOfCodes.E == $scope.careersNoOrders[i].E && arrayOfCodes.E==1) weNeedThree++;
                if (arrayOfCodes.C == $scope.careersNoOrders[i].C && arrayOfCodes.C==1) weNeedThree++;


                if (weNeedThree==3) {
                    spaceWhereCareerIs.push(i);
                    console.log("We got here", spaceWhereCareerIs.length,
                    spaceWhereCareerIs[0], spaceWhereCareerIs[1]);

                } else {
                    console.log(weNeedThree);
                }
            }

            if (spaceWhereCareerIs.length  == 1) {
                careersAvailable.push($scope.careersNoOrders[spaceWhereCareerIs[0]].name);
                console.log(($scope.careersNoOrders[spaceWhereCareerIs[0]].name));
            } else {
                for (var i = 1; i < spaceWhereCareerIs.length; i++) {
                   careersAvailable.push($scope.careersNoOrders[spaceWhereCareerIs[i]].name);
                    console.log(($scope.careersNoOrders[spaceWhereCareerIs[i]].name));
                }
            }

            return careersAvailable;

        }

        /**
         * Method to find all possible careers
         * @param threeMayors is an object of the first, second and third letter
         */
        $scope.findCareer = function(threeMayors) {
            var first = threeMayors.primer;
            var second = threeMayors.segundo;
            var third = threeMayors.tercer;

            $scope.firstLetter = first.letter;
            $scope.secondLetter = second.letter;
            $scope.thirdLetter = third.letter;

            var combination = first.letter + second.letter + third.letter + "";
            var careersToSuggest = [];

            $scope.suggestedCode = combination;

            careersToSuggest = $scope.searchThroughCombination(combination, careersToSuggest);


        if (careersToSuggest[0].code!="0") {
            // Career found
            //return careersToSuggest;
            $scope.careersSuggestions = careersToSuggest;
            $scope.showPsMessage = true;
        }
        else {
            // Career NO found
            //return false;

                console.log("we are here for changin order");
                var combination2 = first.letter + third.letter +  second.letter + "";
                var careersTem = $scope.searchThroughCombination(combination2, careersToSuggest);
                careersTem.shift();

                if (careersTem[0].code!="0") {
                    //console.log("we didnt!");
                    $scope.careersSuggestions = careersTem;
                    $scope.showPsMessage = true;

                } else {

                    $scope.noOrdinaryCareer = true;
                    $scope.careersSuggestions = careersToSuggest;


                    $scope.careersSuggestionsNoOrder = $scope.findCareerWithoutOrder($scope.setOnesForLettersInCareer(first,second,third));

                    console.log($scope.careersSuggestionsNoOrder[0]);
                    if($scope.careersSuggestionsNoOrder[0]=="No hemos encontrado una carrera") {
                        $scope.showNothingFound = true;
                    } else {
                        $scope.showPsMessage = true;
                    }

                }

        }

        }

        /**
         * Method to search the career
         * @param combination is the string value from the result
         * @param careersToSuggest is the array of careers that will be modify
         * @returns {*} the same array in the param with all modifications
         */
        $scope.searchThroughCombination = function(combination, careersToSuggest) {
            if (combination==$scope.careers[1].code) { // Administracion de Empresas
                careersToSuggest.push($scope.careers[1]);
            }
            else if (combination==$scope.careers[2].code) { // Administracion de Empresas
                careersToSuggest.push($scope.careers[2]);
                careersToSuggest.push($scope.careers[3]);
                careersToSuggest.push($scope.careers[5]);
            }
            else if (combination==$scope.careers[3].code) { // Turismo
                careersToSuggest.push($scope.careers[3]);
                careersToSuggest.push($scope.careers[2]);
                careersToSuggest.push($scope.careers[5]);
            }
            else if (combination==$scope.careers[4].code) { // Arquitectura
                careersToSuggest.push($scope.careers[4]);
            }
            else if (combination==$scope.careers[5].code) { // Publicidad
                careersToSuggest.push($scope.careers[5]);
                careersToSuggest.push($scope.careers[2]);
                careersToSuggest.push($scope.careers[3]);
            }
            else if (combination==$scope.careers[6].code) { // Publicidad
                careersToSuggest.push($scope.careers[6]);

            }
            else if (combination==$scope.careers[7].code) { // Derecho
                careersToSuggest.push($scope.careers[7]);
            }
            else if (combination==$scope.careers[8].code) { // Diseño de Interiores
                careersToSuggest.push($scope.careers[8]);
            }
            else if (combination==$scope.careers[9].code) { // Educacion Inicial
                careersToSuggest.push($scope.careers[9]);
            }
            else if (combination==$scope.careers[10].code) { // Ingenieria Civil
                careersToSuggest.push($scope.careers[10]);
                careersToSuggest.push($scope.careers[12]);
            }
            else if (combination==$scope.careers[11].code) { // Ingenieria Industrial
                careersToSuggest.push($scope.careers[11]);
            }
            else if (combination==$scope.careers[12].code) { // Ingenieria en Sistema
                careersToSuggest.push($scope.careers[12]);
            }
            else if (combination==$scope.careers[13].code) { // Ingenieria en Sistema
                careersToSuggest.push($scope.careers[13]);
            }
            else if (combination==$scope.careers[14].code) { // Mercadeo
                careersToSuggest.push($scope.careers[14]);
            }
            else if (combination==$scope.careers[15].code) { // Medicina
                careersToSuggest.push($scope.careers[15]);
                careersToSuggest.push($scope.careers[16]);
            }
            else if (combination==$scope.careers[16].code) { // Odontologia
                careersToSuggest.push($scope.careers[16]);
                careersToSuggest.push($scope.careers[15]);
            }
            else if (combination==$scope.careers[17].code) { // Psicologia clinica
                careersToSuggest.push($scope.careers[17]);
            }
            else if (combination==$scope.careers[18].code) { // Psicologia organizacional
                careersToSuggest.push($scope.careers[18]);
            } else {
                careersToSuggest.push($scope.careers[0])
            }

            return careersToSuggest;
        }

        /**
         * Method that will set ones for the letter to compare with the JSON File
         * @param first is the object of the first letter
         * @param second is the object of the second letter
         * @param third is the object of the third letter
         * @returns {{R: string, I: string, A: string, S: string, E: string, C: string}} is an array with the respective value
         */
        $scope.setOnesForLettersInCareer = function(first,second,third) {
            var arrayOfCodes = {
                "R":"0",
                "I":"0",
                "A":"0",
                "S":"0",
                "E":"0",
                "C":"0"
            };

            if (first.letter == "R") {
                arrayOfCodes.R = "1";
            }
            else if (first.letter == "I") {
                arrayOfCodes.I = "1";
            }
            else if (first.letter == "A") {
                arrayOfCodes.A = "1";
            }
            else if (first.letter == "S") {
                arrayOfCodes.S = "1";
            }
            else if (first.letter == "E") {
                arrayOfCodes.E = "1";
            }
            else if (first.letter == "C") {
                arrayOfCodes.C = "1";
            }
            if (second.letter == "R") {
                arrayOfCodes.R = "1";
            }
            else if (second.letter == "I") {
                arrayOfCodes.I = "1";
            }
            else if (second.letter == "A") {
                arrayOfCodes.A = "1";
            }
            else  if (second.letter == "S") {
                arrayOfCodes.S = "1";
            }
            else if (second.letter == "E") {
                arrayOfCodes.E = "1";
            }
            else if (second.letter == "C") {
                arrayOfCodes.C = "1";
            }
            if (third.letter == "R") {
                arrayOfCodes.R = "1";
            }
            else if (third.letter == "I") {
                arrayOfCodes.I = "1";
            }
            else if (third.letter == "A") {
                arrayOfCodes.A = "1";
            }
            else if (third.letter == "S") {
                arrayOfCodes.S = "1";
            }
            else  if (third.letter == "E") {
                arrayOfCodes.E = "1";
            }
            else if (third.letter == "C") {
                arrayOfCodes.C = "1";
            }

            return arrayOfCodes;
        }

        /**
         * Method to find three mayors letters from an array without worrying about repeating values
         * @param array of all the values of the letters collected from the questions
         * @returns {{}} literal object of all three mayors objects with properties of value and letter
         */
        $scope.findThreeMayors = function(array) { //R, I, A, S, E, C

            var R = array[0];
            var I = array[1];
            var A = array[2];
            var S = array[3];
            var E = array[4];
            var C = array[5];

            var Robj = {value: R, letter:textVars[0]};
            var Iobj = {value: I, letter:textVars[1]};
            var Aobj = {value: A, letter:textVars[2]};
            var Sobj = {value: S, letter:textVars[3]};
            var Eobj = {value: E, letter:textVars[4]};
            var Cobj = {value: C, letter:textVars[5]};
            var mayores = {};

            var primerMayor = {};
            var segundoMayor = {};
            var tercerMayor = {};


            if (R>=I && R>=A && R>=S && R>=E && R>=C) { // R
                        if (I>=A && I>=S && I>=E && I>=C) { // R y I
                                    if(A>=S && A>=E && A>=C) { // R, I y A
                                        primerMayor = Robj;
                                        segundoMayor = Iobj;
                                        tercerMayor = Aobj;
                                    }
                                    else if(S>=A && S>=E && S>=C) { // R, I y S
                                        primerMayor = Robj;
                                        segundoMayor = Iobj;
                                        tercerMayor = Sobj;
                                    }
                                    else if(E>=A && E>=S && E>=C) { // R, I y E
                                        primerMayor = Robj;
                                        segundoMayor = Iobj;
                                        tercerMayor = Eobj;
                                    }
                                    else if(C>=A && C>=S && C>=E) { // R, I y C
                                        primerMayor = Robj;
                                        segundoMayor = Iobj;
                                        tercerMayor = Cobj;
                                    }
                        }
                        else if (A>=I && A>=S && A>=E && A>=C) { // R y A
                                    if (I>=S && I>=E && I>=C) { // R, A y I
                                        primerMayor = Robj;
                                        segundoMayor = Aobj;
                                        tercerMayor = Iobj;
                                    }
                                    else if (S>=I && S>=E && S>=C) { // R, A y S
                                        primerMayor = Robj;
                                        segundoMayor = Aobj;
                                        tercerMayor = Sobj;
                                    }
                                    else if (E>=I && E>=S && E>=C) { // R, A y E
                                        primerMayor = Robj;
                                        segundoMayor = Aobj;
                                        tercerMayor = Eobj;
                                    }
                                    else if (C>=I && C>=S && C>=E) { // R, A y C
                                        primerMayor = Robj;
                                        segundoMayor = Aobj;
                                        tercerMayor = Cobj;
                                    }

                        }
                        else if (S>=I && S>=A && S>=E && S>=C) { // R y S
                                    if (I>=A && I>=E && I>=C) { // R, S y I
                                        primerMayor = Robj;
                                        segundoMayor = Sobj;
                                        tercerMayor = Iobj;
                                    }
                                    else if (A>=I && A>=E && A>=C) { // R, S y A
                                        primerMayor = Robj;
                                        segundoMayor = Sobj;
                                        tercerMayor = Aobj;
                                    }
                                    else if (E>=A && E>=I && E>=C) { // R, S y E
                                        primerMayor = Robj;
                                        segundoMayor = Sobj;
                                        tercerMayor = Eobj;
                                    }
                                    else if (C>=A && C>=I && C>=E) { // R, S y C
                                        primerMayor = Robj;
                                        segundoMayor = Sobj;
                                        tercerMayor = Cobj;
                                    }
                        }
                        else if (E>=I && E>=A && E>=S && E>=C) { // R y E
                                    if (I>=A && I>=S && I>=C) { // R, E y I
                                        primerMayor = Robj;
                                        segundoMayor = Eobj;
                                        tercerMayor = Iobj;
                                    }
                                    else if (A>=I && A>=S && A>=C) { // R, E y A
                                        primerMayor = Robj;
                                        segundoMayor = Eobj;
                                        tercerMayor = Aobj;
                                    }
                                    else if (S>=A && S>=I && S>=C) { // R, E y S
                                        primerMayor = Robj;
                                        segundoMayor = Eobj;
                                        tercerMayor = Sobj;
                                    }
                                    else if (C>=A && C>=I && C>=S) { // R, E y C
                                        primerMayor = Robj;
                                        segundoMayor = Eobj;
                                        tercerMayor = Cobj;
                                    }
                        }
                        else if (C>=I && C>=A && C>=S && C>=E) { // R y C
                                    if (I>=A && I>=S && I>=E) { // R, C y I
                                        primerMayor = Robj;
                                        segundoMayor = Cobj;
                                        tercerMayor = Iobj;
                                    }
                                    else if (A>=I && A>=S && A>=E) { // R, C y A
                                        primerMayor = Robj;
                                        segundoMayor = Cobj;
                                        tercerMayor = Aobj;
                                    }
                                    else if (S>=A && S>=I && S>=E) { // R, C y S
                                        primerMayor = Robj;
                                        segundoMayor = Cobj;
                                        tercerMayor = Sobj;
                                    }
                                    else if (E>=A && E>=I && E>=S) { // R, C y E
                                        primerMayor = Robj;
                                        segundoMayor = Cobj;
                                        tercerMayor = Eobj;
                                    }
                        }
            }
            else if(I>=R && I>=A && I>=S && I>=E && I>=C) {
                        if (R>=A && R>=S && R>=E && R>=C) { // I y R
                                    if(A>=S && A>=E && A>=C) { // I, R y A
                                        primerMayor = Iobj;
                                        segundoMayor = Robj;
                                        tercerMayor = Aobj;
                                    }
                                    else if(S>=A && S>=E && S>=C) { // I, R y S
                                        primerMayor = Iobj;
                                        segundoMayor = Robj;
                                        tercerMayor = Sobj;
                                    }
                                    else if(E>=A && E>=S && E>=C) { // I, R y E
                                        primerMayor = Iobj;
                                        segundoMayor = Robj;
                                        tercerMayor = Eobj;
                                    }
                                    else if(C>=A && C>=S && C>=E) { // I, R y C
                                        primerMayor = Iobj;
                                        segundoMayor = Robj;
                                        tercerMayor = Cobj;
                                    }
                        }
                        else if (A>=R && A>=S && A>=E && A>=C) { // I y A
                                    if (R>=S && R>=E && R>=C) { // I, A y R
                                        primerMayor = Iobj;
                                        segundoMayor = Aobj;
                                        tercerMayor = Robj;
                                    }
                                    else if (S>=R && S>=E && S>=C) { // I, A y S
                                        primerMayor = Iobj;
                                        segundoMayor = Aobj;
                                        tercerMayor = Sobj;
                                    }
                                    else if (E>=R && E>=S && E>=C) { // I, A y E
                                        primerMayor = Iobj;
                                        segundoMayor = Aobj;
                                        tercerMayor = Eobj;
                                    }
                                    else if (C>=R && C>=S && C>=E) { // I, A y C
                                        primerMayor = Iobj;
                                        segundoMayor = Aobj;
                                        tercerMayor = Cobj;
                                    }

                        }
                        else if (S>=R && S>=A && S>=E && S>=C) { // I y S
                                    if (R>=A && R>=E && R>=C) { // I, S y R
                                        primerMayor = Iobj;
                                        segundoMayor = Sobj;
                                        tercerMayor = Robj;
                                    }
                                    else if (A>=R && A>=E && A>=C) { // I, S y A
                                        primerMayor = Iobj;
                                        segundoMayor = Sobj;
                                        tercerMayor = Aobj;
                                    }
                                    else if (E>=A && E>=R && E>=C) { // I, S y E
                                        primerMayor = Iobj;
                                        segundoMayor = Sobj;
                                        tercerMayor = Eobj;
                                    }
                                    else if (C>=A && C>=R && C>=E) { // I, S y C
                                        primerMayor = Iobj;
                                        segundoMayor = Sobj;
                                        tercerMayor = Cobj;
                                    }
                        }
                        else if (E>=R && E>=A && E>=S && E>=C) { // I y E
                                    if (R>=A && R>=S && R>=C) { // I, E y R
                                        primerMayor = Iobj;
                                        segundoMayor = Eobj;
                                        tercerMayor = Robj;
                                    }
                                    else if (A>=R && A>=S && A>=C) { // I, E y A
                                        primerMayor = Iobj;
                                        segundoMayor = Eobj;
                                        tercerMayor = Aobj;
                                    }
                                    else if (S>=A && S>=R && S>=C) { // I, E y S
                                        primerMayor = Iobj;
                                        segundoMayor = Eobj;
                                        tercerMayor = Sobj;
                                    }
                                    else if (C>=A && C>=R && C>=S) { // I, E y C
                                        primerMayor = Iobj;
                                        segundoMayor = Eobj;
                                        tercerMayor = Cobj;
                                    }
                        }
                        else if (C>=R && C>=A && C>=S && C>=E) { // I y C
                                    if (R>=A && R>=S && R>=E) { // I, C y R
                                        primerMayor = Iobj;
                                        segundoMayor = Cobj;
                                        tercerMayor = Robj;
                                    }
                                    else if (A>=R && A>=S && A>=E) { // I, C y A
                                        primerMayor = Iobj;
                                        segundoMayor = Cobj;
                                        tercerMayor = Aobj;
                                    }
                                    else if (S>=A && S>=R && S>=E) { // I, C y S
                                        primerMayor = Iobj;
                                        segundoMayor = Cobj;
                                        tercerMayor = Sobj;
                                    }
                                    else if (E>=A && E>=R && E>=S) { // I, C y E
                                        primerMayor = Iobj;
                                        segundoMayor = Cobj;
                                        tercerMayor = Eobj;
                                    }
                        }

            }
            else if(A>=R && A>=I && A>=S && A>=E && A>=C) { // A
                        if (R>=I && R>=S && R>=E && R>=C) { // A y R
                                    if(I>=S && I>=E && I>=C) { // A, R y I
                                        primerMayor = Aobj;
                                        segundoMayor = Robj;
                                        tercerMayor = Iobj;
                                    }
                                    else if(S>=I && S>=E && S>=C) { // A, R y S
                                        primerMayor = Aobj;
                                        segundoMayor = Robj;
                                        tercerMayor = Sobj;
                                    }
                                    else if(E>=I && E>=S && E>=C) { // A, R y E
                                        primerMayor = Aobj;
                                        segundoMayor = Robj;
                                        tercerMayor = Eobj;
                                    }
                                    else if(C>=I && C>=S && C>=E) { // A, R y C
                                        primerMayor = Aobj;
                                        segundoMayor = Robj;
                                        tercerMayor = Cobj;
                                    }
                        }
                        else if (I>=R && I>=S && I>=E && I>=C) { // A y I
                            if (R>=S && R>=E && R>=C) { // A, I y R
                                primerMayor = Aobj;
                                segundoMayor = Iobj;
                                tercerMayor = Robj;
                            }
                            else if (S>=R && S>=E && S>=C) { // A, I y S
                                primerMayor = Aobj;
                                segundoMayor = Iobj;
                                tercerMayor = Sobj;
                            }
                            else if (E>=R && E>=S && E>=C) { // A, I y E
                                primerMayor = Aobj;
                                segundoMayor = Iobj;
                                tercerMayor = Eobj;
                            }
                            else if (C>=R && C>=S && C>=E) { // A, I y C
                                primerMayor = Aobj;
                                segundoMayor = Iobj;
                                tercerMayor = Cobj;
                            }
                        }
                        else if (S>=R && S>=I && S>=E && S>=C) { // A y S
                            if (R>=I && R>=E && R>=C) { // A, S y R
                                primerMayor = Aobj;
                                segundoMayor = Sobj;
                                tercerMayor = Robj;
                            }
                            else if (I>=R && I>=E && I>=C) { // A, S y I
                                primerMayor = Aobj;
                                segundoMayor = Sobj;
                                tercerMayor = Iobj;
                            }
                            else if (E>=I && E>=R && E>=C) { // A, S y E
                                primerMayor = Aobj;
                                segundoMayor = Sobj;
                                tercerMayor = Eobj;
                            }
                            else if (C>=I && C>=R && C>=E) { // A, S y C
                                primerMayor = Aobj;
                                segundoMayor = Sobj;
                                tercerMayor = Cobj;
                            }
                        }
                        else if (E>=R && E>=I && E>=S && E>=C) { // A y E
                            if (R>=I && R>=S && R>=C) { // A, E y R
                                primerMayor = Aobj;
                                segundoMayor = Eobj;
                                tercerMayor = Robj;
                            }
                            else if (I>=R && I>=S && I>=C) { // A, E y I
                                primerMayor = Aobj;
                                segundoMayor = Eobj;
                                tercerMayor = Iobj;
                            }
                            else if (S>=I && S>=R && S>=C) { // A, E y S
                                primerMayor = Aobj;
                                segundoMayor = Eobj;
                                tercerMayor = Sobj;
                            }
                            else if (C>=I && C>=R && C>=S) { // A, E y C
                                primerMayor = Aobj;
                                segundoMayor = Eobj;
                                tercerMayor = Cobj;
                            }
                        }
                        else if (C>=R && C>=I && C>=S && C>=E) { // A y C
                            if (R>=I && R>=S && R>=E) { // A, C y R
                                primerMayor = Aobj;
                                segundoMayor = Cobj;
                                tercerMayor = Robj;
                            }
                            else if (I>=R && I>=S && I>=E) { // A, C y I
                                primerMayor = Aobj;
                                segundoMayor = Cobj;
                                tercerMayor = Iobj;
                            }
                            else if (S>=I && S>=R && S>=E) { // A, C y S
                                primerMayor = Aobj;
                                segundoMayor = Cobj;
                                tercerMayor = Sobj;
                            }
                            else if (E>=I && E>=R && E>=S) { // A, C y E
                                primerMayor = Aobj;
                                segundoMayor = Cobj;
                                tercerMayor = Eobj;
                            }
                        }
            }
            else if(S>=R && S>=I && S>=A && S>=E && S>=C) { // S
                if (R>=I && R>=A && R>=E && R>=C) { // S y R
                    if(I>=A && I>=E && I>=C) { // S, R y I
                        primerMayor = Sobj;
                        segundoMayor = Robj;
                        tercerMayor = Iobj;
                    }
                    else if(A>=I && A>=E && A>=C) { // S, R y A
                        primerMayor = Sobj;
                        segundoMayor = Robj;
                        tercerMayor = Aobj;
                    }
                    else if(E>=I && E>=A && E>=C) { // S, R y E
                        primerMayor = Sobj;
                        segundoMayor = Robj;
                        tercerMayor = Eobj;
                    }
                    else if(C>=I && C>=A && C>=E) { // S, R y C
                        primerMayor = Sobj;
                        segundoMayor = Robj;
                        tercerMayor = Cobj;
                    }
                }
                else if (I>=R && I>=S && I>=E && I>=C) { // S y I
                    if (R>=A && R>=E && R>=C) { // S, I y R
                        primerMayor = Sobj;
                        segundoMayor = Iobj;
                        tercerMayor = Robj;
                    }
                    else if (A>=R && A>=E && A>=C) { // S, I y A
                        primerMayor = Sobj;
                        segundoMayor = Iobj;
                        tercerMayor = Aobj;
                    }
                    else if (E>=R && E>=A && E>=C) { // S, I y E
                        primerMayor = Sobj;
                        segundoMayor = Iobj;
                        tercerMayor = Eobj;
                    }
                    else if (C>=R && C>=A && C>=E) { // S, I y C
                        primerMayor = Sobj;
                        segundoMayor = Iobj;
                        tercerMayor = Cobj;
                    }
                }
                else if (A>=R && A>=I && A>=E && A>=C) { // S y A
                    if (R>=I && R>=E && R>=C) { // S, A y R
                        primerMayor = Sobj;
                        segundoMayor = Aobj;
                        tercerMayor = Robj;
                    }
                    else if (I>=R && I>=E && I>=C) { // S, A y I
                        primerMayor = Sobj;
                        segundoMayor = Aobj;
                        tercerMayor = Iobj;
                    }
                    else if (E>=I && E>=R && E>=C) { // S, A y E
                        primerMayor = Sobj;
                        segundoMayor = Aobj;
                        tercerMayor = Eobj;
                    }
                    else if (C>=I && C>=R && C>=E) { // S, A y C
                        primerMayor = Sobj;
                        segundoMayor = Aobj;
                        tercerMayor = Cobj;
                    }
                }
                else if (E>=R && E>=I && E>=A && E>=C) { // S y E
                    if (R>=I && R>=A && R>=C) { // S, E y R
                        primerMayor = Sobj;
                        segundoMayor = Eobj;
                        tercerMayor = Robj;
                    }
                    else if (I>=R && I>=S && I>=C) { // S, E y I
                        primerMayor = Sobj;
                        segundoMayor = Eobj;
                        tercerMayor = Iobj;
                    }
                    else if (A>=I && A>=R && A>=C) { // S, E y A
                        primerMayor = Sobj;
                        segundoMayor = Eobj;
                        tercerMayor = Aobj;
                    }
                    else if (C>=I && C>=R && C>=A) { // S, E y C
                        primerMayor = Sobj;
                        segundoMayor = Eobj;
                        tercerMayor = Cobj;
                    }
                }
                else if (C>=R && C>=I && C>=A && C>=E) { // S y C
                    if (R>=I && R>=A && R>=E) { // S, C y R
                        primerMayor = Sobj;
                        segundoMayor = Cobj;
                        tercerMayor = Robj;
                    }
                    else if (I>=R && I>=A && I>=E) { // S, C y I
                        primerMayor = Sobj;
                        segundoMayor = Cobj;
                        tercerMayor = Iobj;
                    }
                    else if (A>=I && A>=R && A>=E) { // S, C y A
                        primerMayor = Sobj;
                        segundoMayor = Cobj;
                        tercerMayor = Aobj;
                    }
                    else if (E>=I && E>=R && E>=A) { // S, C y E
                        primerMayor = Sobj;
                        segundoMayor = Cobj;
                        tercerMayor = Eobj;
                    }
                }
            }
            else if(E>=R && E>=I && E>=A && E>=S && E>=C) { // E
                if (R>=I && R>=A && R>=S && R>=C) { // E y R
                    if(I>=A && I>=S && I>=C) { // E, R y I
                        primerMayor = Eobj;
                        segundoMayor = Robj;
                        tercerMayor = Iobj;
                    }
                    else if(A>=I && A>=S && A>=C) { // E, R y A
                        primerMayor = Eobj;
                        segundoMayor = Robj;
                        tercerMayor = Aobj;
                    }
                    else if(S>=I && S>=A && S>=C) { // E, R y S
                        primerMayor = Eobj;
                        segundoMayor = Robj;
                        tercerMayor = Sobj;
                    }
                    else if(C>=I && C>=A && C>=S) { // E, R y C
                        primerMayor = Eobj;
                        segundoMayor = Robj;
                        tercerMayor = Cobj;
                    }
                }
                else if (I>=R && I>=S && I>=E && I>=C) { // S y I
                    if (R>=A && R>=S && R>=C) { // E, I y R
                        primerMayor = Eobj;
                        segundoMayor = Iobj;
                        tercerMayor = Robj;
                    }
                    else if (A>=R && A>=S && A>=C) { // E, I y A
                        primerMayor = Eobj;
                        segundoMayor = Iobj;
                        tercerMayor = Aobj;
                    }
                    else if (S>=R && S>=A && S>=C) { // E, I y S
                        primerMayor = Eobj;
                        segundoMayor = Iobj;
                        tercerMayor = Sobj;
                    }
                    else if (C>=R && C>=A && C>=S) { // E, I y C
                        primerMayor = Eobj;
                        segundoMayor = Iobj;
                        tercerMayor = Cobj;
                    }
                }
                else if (A>=R && A>=I && A>=S && A>=C) { // E y A
                    if (R>=I && R>=S && R>=C) { // E, A y R
                        primerMayor = Eobj;
                        segundoMayor = Aobj;
                        tercerMayor = Robj;
                    }
                    else if (I>=R && I>=S && I>=C) { // E, A y I
                        primerMayor = Eobj;
                        segundoMayor = Aobj;
                        tercerMayor = Iobj;
                    }
                    else if (S>=I && S>=R && S>=C) { // E, A y S
                        primerMayor = Eobj;
                        segundoMayor = Aobj;
                        tercerMayor = Sobj;
                    }
                    else if (C>=I && C>=R && C>=S) { // E, A y C
                        primerMayor = Eobj;
                        segundoMayor = Aobj;
                        tercerMayor = Cobj;
                    }
                }
                else if (S>=R && S>=I && S>=A && S>=C) { // E y S
                    if (R>=I && R>=A && R>=C) { // E, S y R
                        primerMayor = Eobj;
                        segundoMayor = Sobj;
                        tercerMayor = Robj;
                    }
                    else if (I>=R && I>=A && I>=C) { // E, S y I
                        primerMayor = Eobj;
                        segundoMayor = Sobj;
                        tercerMayor = Iobj;
                    }
                    else if (A>=I && A>=R && A>=C) { // E, S y A
                        primerMayor = Eobj;
                        segundoMayor = Sobj;
                        tercerMayor = Aobj;
                    }
                    else if (C>=I && C>=R && C>=A) { // E, S y C
                        primerMayor = Eobj;
                        segundoMayor = Sobj;
                        tercerMayor = Cobj;
                    }
                }
                else if (C>=R && C>=I && C>=A && C>=S) { // E y C
                    if (R>=I && R>=A && R>=S) { // E, C y R
                        primerMayor = Eobj;
                        segundoMayor = Cobj;
                        tercerMayor = Robj;
                    }
                    else if (I>=R && I>=A && I>=S) { // E, C y I
                        primerMayor = Eobj;
                        segundoMayor = Cobj;
                        tercerMayor = Iobj;
                    }
                    else if (A>=I && A>=R && A>=S) { // E, C y A
                        primerMayor = Eobj;
                        segundoMayor = Cobj;
                        tercerMayor = Aobj;
                    }
                    else if (S>=I && S>=R && S>=A) { // E, C y S
                        primerMayor = Eobj;
                        segundoMayor = Cobj;
                        tercerMayor = Sobj;
                    }
                }
            }
            else if(C>=R && C>=I && C>=A && C>=S && C>=E) { // C
                if (R>=I && R>=A && R>=S && R>=E) { // C y R
                    if(I>=A && I>=S && I>=E) { // C, R y I
                        primerMayor = Cobj;
                        segundoMayor = Robj;
                        tercerMayor = Iobj;
                    }
                    else if(A>=I && A>=S && A>=E) { // C, R y A
                        primerMayor = Cobj;
                        segundoMayor = Robj;
                        tercerMayor = Aobj;
                    }
                    else if(S>=I && S>=A && S>=E) { // C, R y S
                        primerMayor = Cobj;
                        segundoMayor = Robj;
                        tercerMayor = Sobj;
                    }
                    else if(E>=I && E>=A && E>=S) { // C, R y E
                        primerMayor = Cobj;
                        segundoMayor = Robj;
                        tercerMayor = Eobj;
                    }
                }
                else if (I>=R && I>=S && I>=E && I>=A) { // C y I
                    if (R>=A && R>=S && R>=E) { // C, I y R
                        primerMayor = Cobj;
                        segundoMayor = Iobj;
                        tercerMayor = Robj;
                    }
                    else if (A>=R && A>=S && A>=E) { // C, I y A
                        primerMayor = Cobj;
                        segundoMayor = Iobj;
                        tercerMayor = Aobj;
                    }
                    else if (S>=R && S>=A && S>=E) { // C, I y S
                        primerMayor = Cobj;
                        segundoMayor = Iobj;
                        tercerMayor = Sobj;
                    }
                    else if (E>=R && E>=A && E>=S) { // C, I y E
                        primerMayor = Cobj;
                        segundoMayor = Iobj;
                        tercerMayor = Eobj;
                    }
                }
                else if (A>=R && A>=I && A>=S && A>=E) { // C y A
                    if (R>=I && R>=S && R>=E) { // C, A y R
                        primerMayor = Cobj;
                        segundoMayor = Aobj;
                        tercerMayor = Robj;
                    }
                    else if (I>=R && I>=S && I>=E) { // C, A y I
                        primerMayor = Cobj;
                        segundoMayor = Aobj;
                        tercerMayor = Iobj;
                    }
                    else if (S>=I && S>=R && S>=E) { // C, A y S
                        primerMayor = Cobj;
                        segundoMayor = Aobj;
                        tercerMayor = Sobj;
                    }
                    else if (E>=I && E>=R && E>=S) { // C, A y E
                        primerMayor = Cobj;
                        segundoMayor = Aobj;
                        tercerMayor = Eobj;
                    }
                }
                else if (S>=R && S>=I && S>=A && S>=E) { // C y S
                    if (R>=I && R>=A && R>=E) { // C, S y R
                        primerMayor = Cobj;
                        segundoMayor = Sobj;
                        tercerMayor = Robj;
                    }
                    else if (I>=R && I>=A && I>=E) { // C, S y I
                        primerMayor = Cobj;
                        segundoMayor = Sobj;
                        tercerMayor = Iobj;
                    }
                    else if (A>=I && A>=R && A>=E) { // C, S y A
                        primerMayor = Cobj;
                        segundoMayor = Sobj;
                        tercerMayor = Aobj;
                    }
                    else if (E>=I && E>=R && E>=A) { // C, S y E
                        primerMayor = Cobj;
                        segundoMayor = Sobj;
                        tercerMayor = Eobj;
                    }
                }
                else if (E>=R && E>=I && E>=A && E>=S) { // C y E
                    if (R>=I && R>=A && R>=S) { // C, E y R
                        primerMayor = Cobj;
                        segundoMayor = Eobj;
                        tercerMayor = Robj;
                    }
                    else if (I>=R && I>=A && I>=S) { // C, E y I
                        primerMayor = Cobj;
                        segundoMayor = Eobj;
                        tercerMayor = Iobj;
                    }
                    else if (A>=I && A>=R && A>=S) { // C, E y A
                        primerMayor = Cobj;
                        segundoMayor = Eobj;
                        tercerMayor = Aobj;
                    }
                    else if (S>=I && S>=R && S>=A) { // C, E y S
                        primerMayor = Cobj;
                        segundoMayor = Eobj;
                        tercerMayor = Sobj;
                    }
                }
            }

            console.log("Prueba: ", primerMayor.value, primerMayor.letter, segundoMayor.value, segundoMayor.letter, tercerMayor.value, tercerMayor.letter);
            mayores = {
                primer: primerMayor,
                segundo: segundoMayor,
                tercer: tercerMayor
            };

            return mayores;
        }

        /**
         * Method to display an alert
         * @param whichalert specify which alert will display with a number from 0 to n
         */
        $scope.dialogNew = function(whichalert, message, title) {
            switch (whichalert) {
                case 0: {
                    BootstrapDialog.alert(message);
                    break;
                }
                case 1: {
                    var $textAndPic = $('<div></div>');
                    $textAndPic.append('<p>Te permite conocer cuál es la combinación de siglas de personalidad para poder establecer a que carrera te asemejas.</p><p>Se componen normalmente de los diferentes estilos como Realista (R), Artística (A), Social (S), Investigativa (I), Emprendimiento (E) y Convencional (C). </p><br />');
                    $textAndPic.append('<p>Ejemplo:</p><p>Para el caso del siguiente gráfico podemos ver como cada personalidad tiene un numero. En orden de mayor a menor, las primeras tres te especificaran la combinación que te corresponde de acuerdo a la personalidad.</p>');
                    $textAndPic.append('<img width="100%" src="/assets/hollandHex.PNG" />');
                    $textAndPic.append('<p>Para este ejemplo, el orden seria Social, Investigativa y Artística dando como resultado <strong>SIA</strong></p>');

                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_WARNING,
                        title: 'Información sobre combinaciones',
                        message: $textAndPic,
                        buttons: [{
                            label: 'Cerrar',
                            action: function(dialogRef){
                                dialogRef.close();
                            }
                        }]
                    });
                    break;
                }
                case 2: {
                    var $textAndPic = $('<div></div>');
                    $textAndPic.append('<p>Al conocer ya tu combinación, se conoce entonces los tres estilos principales de personalidad de Holland que posees.</p><p>Por lo que esta sección busca explicarte cada uno de la manera más especifica posible, y clara.</p><br />');
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_WARNING,
                        title: 'Información sobre estilos de personalidad',
                        message: $textAndPic,
                        buttons: [{
                            label: 'Cerrar',
                            action: function(dialogRef){
                                dialogRef.close();
                            }
                        }]
                    });
                    break;
                }
                case 3: {
                    var $textAndPic = $('<div></div>');
                    $textAndPic.append('<p>Te permite conocer sobre a que carrera tu perfil aplica con un porcentaje de acierto de 99%, ya que dicha carrera es especifica para el estilo de personalidad que tienes, y el orden de importancia de cada una individualmente.</p>');
                    $textAndPic.append('<p>Es importante hacer notar que las carreras planteadas aquí son las ofrecidas en la República Dominicana, y aún asi no son todas. Dicha aclaración es para que se comprenda que puede existir una carrera con dicha personalidad, pero no se encuentra entre las principales ofrecidas en nuestro país.</p>');
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_WARNING,
                        title: 'Información sobre oferta acádemica',
                        message: $textAndPic,
                        buttons: [{
                            label: 'Cerrar',
                            action: function(dialogRef){
                                dialogRef.close();
                            }
                        }]
                    });
                    break;
                }
                case 4: {
                    var $textAndPic = $('<div></div>');
                    $textAndPic.append('<p>Te permite conocer sobre las carreras que tienen el mismo perfil pero sin importar el orden de la combinación que tienes. Es decir, las carreras que presentan cualquiera de las tres letras que corresponden a tus estilos serán mostradas aqui.</p>');
                    $textAndPic.append('<p>La probabilidad de un acierto en esta área a una respuesta más concreta se ve reducida desde un 20% hasta un 80% para algunos casos. Por lo que es importante que se plantee una cita con un psícologo vocacional</p>');
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_WARNING,
                        title: 'Información sobre oferta acádemica sin peso de personalidad',
                        message: $textAndPic,
                        buttons: [{
                            label: 'Cerrar',
                            action: function(dialogRef){
                                dialogRef.close();
                            }
                        }]
                    });
                    break;
                }
                case 5: {
                    var $textAndPic = $('<div></div>');
                    $textAndPic.append('<p>Esta sección muestra información relacionada a la necesidad de visitar un psícologo vocacional, y de cúal seria el procedimiento si fuese necesario. </p>');
                    $textAndPic.append('<p>Por ejemplo, si el sistema recomienda una carrera; dicha decisión es recomendada que se converse con un psícologo para que haga un análisis más profundo, y principalmente si la persona no se siente agusto con la carrera sugerida para que otra alternativa sea mostrada.</p>');
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_WARNING,
                        title: 'Información sobre concclusión',
                        message: $textAndPic,
                        buttons: [{
                            label: 'Cerrar',
                            action: function(dialogRef){
                                dialogRef.close();
                            }
                        }]
                    });
                    break;
                }
            }
        }

        /**
         * Method that works as refresh button
         */
        $scope.restartEverything = function() {
            window.location.reload();
        }

        /**
         * Method to print only the DIV of results
         * @param divName is the ID of the DIV to print
         */
        $scope.printDiv = function (divName) {
            var canvas = document.getElementById("bar");
            var img = canvas.toDataURL("image/png");
            var printContents = document.getElementById(divName).innerHTML;
            var canvasImage = ('<img src="'+img+'"/>');
            var originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents+canvasImage;
            window.print();
            document.body.innerHTML = originalContents;
        }

        /**
         * Method to set all messages for all the letters
         */
        $scope.setMessages = function() {
            if ($scope.firstLetter == "R") {
                $scope.messages.push($scope.personalities[0]);
            }
            else if ($scope.firstLetter == "I") {
                $scope.messages.push($scope.personalities[1]);
            }
            else if ($scope.firstLetter == "A") {
                $scope.messages.push($scope.personalities[2]);
            }
            else if ($scope.firstLetter == "S") {
                $scope.messages.push($scope.personalities[3]);
            }
            else if ($scope.firstLetter == "E") {
                $scope.messages.push($scope.personalities[4]);
            }
            else if ($scope.firstLetter == "C") {
                $scope.messages.push($scope.personalities[5]);
            }
            if ($scope.secondLetter == "R") {
                $scope.messages.push($scope.personalities[0]);
            }
            else if ($scope.secondLetter == "I") {
                $scope.messages.push($scope.personalities[1]);
            }
            else if ($scope.secondLetter == "A") {
                $scope.messages.push($scope.personalities[2]);
            }
            else  if ($scope.secondLetter == "S") {
                $scope.messages.push($scope.personalities[3]);
            }
            else if ($scope.secondLetter == "E") {
                $scope.messages.push($scope.personalities[4]);
            }
            else if ($scope.secondLetter == "C") {
                $scope.messages.push($scope.personalities[5]);
            }
            if ($scope.thirdLetter == "R") {
                $scope.messages.push($scope.personalities[0]);
            }
            else if ($scope.thirdLetter == "I") {
                $scope.messages.push($scope.personalities[1]);
            }
            else if ($scope.thirdLetter == "A") {
                $scope.messages.push($scope.personalities[2]);
            }
            else if ($scope.thirdLetter == "S") {
                $scope.messages.push($scope.personalities[3]);
            }
            else  if ($scope.thirdLetter == "E") {
                $scope.messages.push($scope.personalities[4]);
            }
            else if ($scope.thirdLetter == "C") {
                $scope.messages.push($scope.personalities[5]);
            }
        }

        /**
         * Function watching when the endOfQuestions shows up, so it can trigger a notification
         */
        $timeout(function () {
            $scope.$watch('endOfQuestions', function() {
                if ($scope.endOfQuestions) {
                    var careersTemp = $scope.findCareer($scope.findThreeMayors([$scope.vars.R, $scope.vars.I, $scope.vars.A, $scope.vars.S, $scope.vars.E, $scope.vars.C]))
                    $scope.setMessages();
                }
            });
        });

    });