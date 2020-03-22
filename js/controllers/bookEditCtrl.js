angular.module("bookEdit").controller("bookEditCtrl", function ($scope, $http, $location) {
    scope = $scope; 
    scope.msg = "Editar Livro";
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    let delete_image = "";

    var findBook = function(){
        $http.get('http://localhost:8000/api/v1/editBook/'+id, {
            headers: {
                'Authorization': 'Bearer 123456'
            }
        }).then(function(result) {
            console.log(result);
            $scope.book = result.data.book;
            $scope.authors = result.data.authors;
            $scope.selecteds_author = result.data.selecteds_author;
            delete_image = result.data.book.image;
            
        }).catch(function(result) {
            console.log(result.data);
        });
    }
    
    $('#input_file').change(function() {
        $('#file_name').html(this.value);
    });

    $scope.editBook = function (){
        var file = scope.fileBook;
        console.log(file);
        formData = new FormData();
        $scope.book.authors = $scope.selecteds_author;
        formData.append('file', file);
        formData.append('book', JSON.stringify($scope.book));
        formData.append('delete_image', delete_image);  
                        
        $http.post("http://localhost:8000/api/v1/updateBook/"+id, formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined,  'Authorization': 'Bearer 123456'}
        }).then(function(result) {
            window.location.href = result.data.html;
        }).catch(function(result) {
            console.log(result.data);
        });
    };

    findBook();
})
