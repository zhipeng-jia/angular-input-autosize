
angular.module('autosizeInput', []).directive('autosize', function () {
  return {
    restrict: 'A',
    scope: { model: '=ngModel' },
    link: function (scope, element, attr) {
      if (element.prop('tagName') !== 'INPUT') {
        return;
      }

      var minWidth = parseInt(element.css('minWidth') || '0');
      var sizeDelta = parseInt(attr.sizeDelta || '2');

      var sizer = angular.element('<div style="position: absolute; visibility: hidden; height: 0; width: 0; overflow: scroll; white-space: nowrap;"></div>');
      element.parent().append(sizer);

      var inputStyle = window.getComputedStyle(element[0]);
      angular.forEach([
        'fontFamily',
        'fontSize',
        'fontWeight',
        'fontStyle',
        'letterSpacing',
        'textTransform',
        'wordSpacing',
        'textIndent',
        'boxSizing',
        'borderRightWidth',
        'borderLeftWidth',
        'borderLeftStyle',
        'borderRightStyle',
        'paddingLeft',
        'paddingRight',
        'marginLeft',
        'marginRight'
      ], function (value) {
        sizer.css(value, inputStyle[value]);
      });

      function update() {
        sizer.html(element.val() || element.prop('placeholder'));
        var newWidth = Math.max(minWidth, sizer.prop('scrollWidth') + sizeDelta);
        element.css('width', newWidth + 'px');
      }

      update();
      if (attr.ngModel) {
        scope.$watch('model', update);
      } else {
        element.on('keydown keyup focus input propertychange change', update);
      }
    }
  };
});
