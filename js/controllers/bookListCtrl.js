angular.module("bookList").controller("bookListCtrl", function ($scope, $filter, uppercaseFilter, $http, $mdDialog) {
    scope = $scope; 
    scope.msg = "Livros";

    var listBooks = function(){
        $http.get('http://localhost:8000/api/v1/books', {
            headers: {
                'Authorization': 'Bearer 123456'
            }
        }).then(function(result) {
            console.log(result);
            $scope.books = result.data;
        });
    }

    scope.isBookSelected = function (book) {
        return book.some(function (book){
            return book.selecionado;
        });
    }
    $scope.ordenarPor = function(campo){
        $scope.criterio = campo;
        $scope.reverse = !$scope.reverse;
    }

    listBooks();

    $scope.status = 'veja';
    $scope.customFullscreen = false;

    $scope.showAdvanced = function(ev) {
        var element = angular.element(ev.target);
        $mdDialog.show({
            locals:{image: element[0].src},
            controller: DialogController,
            templateUrl: 'dialogImage.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        // .then(function(answer) {
        //     $scope.status = 'You said the information was "' + answer + '".';
        // }, function() {
        //     $scope.status = 'You cancelled the dialog.';
        // });
    };

    function DialogController($scope, $mdDialog, image) {
        $scope.image = image;

        $scope.ok = function() {
            $mdDialog.hide();
        }
    }

    // function action(e){ 
    //     let id = $(e).parent().siblings("#code").html();
    //     let image = $(e).parent().siblings("#image").data( "image" );
    //     $("#btnOk").attr("onclick", "remove("+id+",'"+image+"')");
    //     let book = $(e).parent().siblings("#booktitle").html();
    //     $("#book").html(book);
    //     $('#indexModal').modal('show');
    // }
    // function remove(id, image){ 
    $scope.remove = function (book){
        $http.delete('http://localhost:8000/api/v1/removeBook/'+ book.id, {
            headers: {
                'Authorization': 'Bearer 123456'
            }
        }).then(function(result) {
            console.log(result);
            window.location.href = result.data.html;
            
        }).catch(function(result) {
            console.log(result.data);
        });
    }

})