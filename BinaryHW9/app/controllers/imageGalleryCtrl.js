angular
    .module('app', ['ngResource'])
    .service('imageService', imageService)
    .controller('imageGallery', ['$scope', 'imageService', imageGalleryCtrl]);
function imageGalleryCtrl(imageService) {
    var vm = this;

    this.images = [];
    imageService.fetchImageList().then(function () {
        vm.getPage(1, 10);
    });

    this.getPage = function (page, size) {
        var firstId = 1 + size * (page - 1);
        vm.images = [];
        for (var i = 0; i < size; i++) {
            vm.images.push(imageService.getImage(firstId + i));
        }
    }
}