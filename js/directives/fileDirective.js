angular.module("bookAdd").directive('ngFile', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('change', function(){
                
                $parse(attrs.ngFile).assign(scope,element[0].files[0])
                scope.$apply();
            });
        }
    };
}]);