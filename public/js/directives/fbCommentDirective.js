app.directive('dynFbCommentBox',['$timeout', function ($timeout) {
  function createHTML(href, numposts, colorscheme, width) {
    return '<div class="fb-comments" ' +
                   'data-href="' + href + '" ' +
                   'data-numposts="' + numposts + '" ' +
                   'data-width="' + width + '" ' +
                   'data-colorscheme="' + colorscheme + '">' +
           '</div>';
  }

  return {
    restrict: 'A',
    scope: false,
    link: function postLink(scope, elem, attrs) {

      attrs.$observe('pageHref', function (newValue) {
        var href        = newValue;
        var numposts    = attrs.numposts    || 5;
        var width = attrs.width || '100%';
        var colorscheme = attrs.colorscheme || "dark";
        elem.html(createHTML(href, numposts, colorscheme, width));
        console.log(elem[0]);
        $timeout(function () {
          if (typeof FB != 'undefined'){
            FB.XFBML.parse(elem[0]);
          }
        });
      });
    }
  };
}]);