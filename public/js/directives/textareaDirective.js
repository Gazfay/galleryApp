app.directive("textarea", function () {
  return {
    scope: false,
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('focus', function () {
        scope.$apply(function() {
          scope.length = true;
        });
      });

      element.bind('blur', function () {
        scope.$apply(function() {
          scope.length = false;
        });
      });

      element.bind('keypress keydown keyup', function (event) {
        scope.$apply(function() {
          scope.textlength = element.val().length;
          scope.symbols = scope.textMax - scope.textlength;
        });
      });

    }
  }
});