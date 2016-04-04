app.directive("popup", function () {
  return {
    scope: true,
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.magnificPopup({
        type:'image',
        mainClass: 'mfp-with-zoom', 
        closeOnContentClick: true,
        zoom: {
          enabled: true, 
          duration: 300, 
          easing: 'ease-in-out', 
          opener: function(openerElement) {
            return openerElement.is('img') ? openerElement : openerElement.find('img');
          }
        }
      });
    }
  }
});