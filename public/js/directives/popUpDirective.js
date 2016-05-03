app.directive("popup", function () {
  return {
    scope: true,
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.magnificPopup({
        delegate: '.popup-link',
        preloader: true,
        type:'image',
        mainClass: 'mfp-with-zoom', 
        closeOnContentClick: true,
         gallery:{
          enabled:true
        },
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