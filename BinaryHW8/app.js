angular.module('app', [])
    .controller('products', function ($scope) {
        $scope.productList = [
            {name: 'Laptop Asus', price: 1000},
            {name: 'Laptop Dell', price: 1200},
            {name: 'TV Samsung', price: 900},
            {name: 'Camera Nikon', price: 300},
            {name: 'SmartPhone Lenovo', price: 150}
        ];
        $scope.productCount = $scope.productList.length;
        $scope.showForm = true;
        $scope.showAddProductForm = false;
        $scope.showList = function () {
            $scope.showForm = !$scope.showForm;
        };
        $scope.showAddProduct = function () {
            $scope.showAddProductForm = !$scope.showAddProductForm;
        };
        $scope.addProduct = function () {
            $scope.productList.push({name: $scope.name, price: $scope.price});
            $scope.productCount = $scope.productList.length;
            $scope.name = null;
            $scope.price = null;

            $scope.showAddProductForm = false;
        }

    })
    .controller('customers', function ($scope) {
        $scope.customerList = [
            {name: 'Arnold Schwarzenegger', age: 67, settlement: 'Thal, Austria', staticAvatar: 'Arnold.jpg'},
            {name: 'Sylvester Stallone', age: 69, settlement: 'New York, USA', staticAvatar: 'Sylvester.jpg'},
            {name: 'Jackie Chan', age: 61, settlement: 'Victoria Peak, British Hong Kong', staticAvatar: 'Jackie.jpg'},
            {name: 'Chuck Norris', age: 75, settlement: 'Ryan, Oklahoma, USA', staticAvatar: 'Chuck.jpg'},
            {name: 'Olivia Wilde', age: 31, settlement: 'New York, USA', staticAvatar: 'Olivia.jpg'}
        ];
        $scope.customerCount = $scope.customerList.length;
        $scope.showForm = true;
        $scope.showAddCustomerForm = false;
        $scope.showList = function () {
            $scope.showForm = !$scope.showForm;
        };
        $scope.showAddCustomer = function () {
            $scope.showAddCustomerForm = !$scope.showAddCustomerForm;
        };
        $scope.onAddCustomer = function () {

            var input = document.getElementById('imageInput');
            var file = input.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var src = this.result;
                    $scope.$apply(function () {
                        $scope.avatar = src;
                        addCustomer($scope);
                    });
                };
                reader.readAsDataURL(file);
            } else {
                addCustomer($scope);
            }
        };
        $scope.removeCustomer = function (index) {
            $scope.customerList.splice(index, 1);
            $scope.customerCount = $scope.customerList.length;
        };

        function addCustomer($scope) {
            $scope.customerList.push({
                name: $scope.name, age: $scope.age,
                settlement: $scope.settlement, avatar: $scope.avatar || 'img/Unknown.png'
            });
            $scope.customerCount = $scope.customerList.length;
            $scope.name = null;
            $scope.age = null;
            $scope.settlement = null;
            $scope.avatar = null;

            $scope.showAddCustomerForm = false;
        }
    });


