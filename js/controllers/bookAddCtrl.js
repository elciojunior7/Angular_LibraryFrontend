angular.module("bookAdd").controller("bookAddCtrl", function ($scope, $http) {
    scope = $scope; 
    scope.msg = "Adicionar Livro";

    var listAuthors = function(){
        $http.get('http://localhost:8000/api/v1/authors', {
            headers: {
                'Authorization': 'Bearer 123456'
            }
        }).then(function(result) {
            console.log(result);
            scope.authors = result.data;
        });
    }

    $scope.addBook = function (book){
        var file = scope.fileBook;
        formData = new FormData();
        formData.append('file', file);
        formData.append('book', JSON.stringify(book));

        $http.post("http://localhost:8000/api/v1/saveBooks", formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined,  'Authorization': 'Bearer 123456'}
        }).then(function(result) {
            delete scope.book;
            scope.addBookForm.$setPristine();
            console.log(result);
        }).catch(function(result) {
            console.log(result.data);
        });
    };

    $('#input_file').change(function() {
        $('#file_name').html(this.value);
    });

    listAuthors();
})