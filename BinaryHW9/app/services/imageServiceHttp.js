angular
    .module('app')
    .service('imageService', imageService);
function imageService($http) {
    this.fetchImageList = fetchImageList;
    this.getImage = getImage;
    var imageList = [];

    function fetchImageList() {//get data with "http"
        return $http.get('http://jsonplaceholder.typicode.com/photos').
            success(function (response) {
                imageList = response;
            });
    }

    function getImage(id) {
        return imageList[id - 1];
    }
}