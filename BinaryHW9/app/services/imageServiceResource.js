angular
    .module('app', ['ngResource'])
    .service('imageService', imageService);
function imageService($resource) {
    this.fetchImageList = fetchImageList;
    this.getImage = getImage;

    var imageList = [];

    function fetchImageList() {//get data with "resources"
        var imageListRes = $resource('http://jsonplaceholder.typicode.com/photos');
        return imageListRes.query({}, function (response) {
            imageList = response;
        }).$promise;
    }

    function getImage(id) {
        return imageList[id - 1];
    }
}