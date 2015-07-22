angular
    .module('app')
    .directive('igThumb', [thumbnailDirective]);
function thumbnailDirective() {
    return {
        restrict: 'A',
        template: '<a href="#"  class="thumbnail" ng-cloak><img src="{{image.url}}" alt="{{image.title}}"/>{{image.title}}</a>',
        scope: {
            image: '='
        },
        link: function (scope, element) {
            element.bind('click', function () {
                document.getElementById('image-full').src = scope.image.url;
                document.getElementById('image-full-view-container').style.display = 'table';
            });
        }
    }
}
