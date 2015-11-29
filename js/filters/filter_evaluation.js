'use strict';
    angular.module('testVfilter', []).filter('numberEva', function() {
          return function(input) {
              var retorno = ""+input;
              if (input == 1) retorno += " - Bajo";
              if (input == 4) retorno += " - Promedio";
              if (input == 7) retorno += " - Alto";
                return retorno
              };
        });