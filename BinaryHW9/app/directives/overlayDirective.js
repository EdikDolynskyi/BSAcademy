angular
    .module('app')
    .directive('igOverlay', [overlayDirective]);

function overlayDirective() {
    return {
        restrict: 'A',
        template: '<div class="thumbnail-container">\
                    <div class="thumbnail">\
                        <img id="image-full"/>\
                    </div>\
                   </div>',
        link: function (scope, element) {
            element.bind('click', function () {
                element[0].style.display = 'none';
            });
        }
    }
}