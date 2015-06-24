var app = angular.module('app', ['ngRoute', 'fontLibrary', 'colorSchemes']);

app.config(
    ['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/colors/:colorScheme/:font?', {
            templateUrl: 'app/templates/colors.html'
        }).
        when('/headings/:colorScheme/:font?', {
            templateUrl: 'app/templates/headings.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]
);

app.controller('FontController', function ($scope, $routeParams, $route, fontLibraryService, colorSchemes) {

    //fontLibraryService.load(function (fontLib) {
    //    $scope.fontLibrary = fontLib;
    //});


    $scope.rp = $routeParams;


    $scope.fontLibrary = new FontLibrary(thbFonts);

    $scope.fontCollections = $scope.fontLibrary.fontCollections;

    $scope.selectFontById = function(fontId) {
        var font = $scope.fontLibrary.fontsById[fontId];
        $scope.currentFont = font;
        $scope.currentFontId = font.id;
        $scope.currentFontStyle = fontStyle(font);
    };

    $scope.selectFontCollectionById = function(fontCollectionId) {
        var fontCollection = $scope.fontLibrary.fontCollectionsById[fontCollectionId];
        $scope.currentFontCollection = fontCollection.fonts;
        $scope.currentFontCollectionId = fontCollection.id;
        $scope.selectFontById($scope.currentFontCollection[0].id);
    };

    $scope.selectFontCollectionById($scope.fontCollections[0].id);

    $scope.selectPreviousFont = function() {
        var index = $scope.currentFontCollection.indexOf($scope.currentFont);
        if (index > 0) {
            $scope.selectFontById($scope.currentFontCollection[index - 1].id);
        }
    };

    $scope.selectNextFont = function() {
        var index = $scope.currentFontCollection.indexOf($scope.currentFont);
        if (index < ($scope.currentFontCollection.length - 1)) {
            $scope.selectFontById($scope.currentFontCollection[index + 1].id);
        }
    };

    $scope.keyPressed = function(event) {
        if (event.which == 37) {
            $scope.selectPreviousFont();
        } else if (event.which == 39) {
            $scope.selectNextFont();
        }
    };

    $scope.colorSchemes = colorSchemes.colorSchemes;

    $scope.$on('$routeChangeSuccess', function() {
        var colorScheme = $routeParams['colorScheme'];
        if (!colorScheme) {
            colorScheme = colorSchemes.colorSchemesById[0];
        }
        selectColorScheme(colorScheme);

        var fontParam = $routeParams['font'];
        console.log("fontParam: " + fontParam);
        var fontId;
        if (fontParam) {
            fontId = fontParam;
        } else {
            fontId = $scope.currentFontCollection[0].id;
        }
        console.log("fontId: " + fontParam);
        console.log("$scope.currentFontCollection[0].id: " + $scope.currentFontCollection[0].id);
        $scope.selectFontById(fontId);
    });

    function selectColorScheme(id) {
        $scope.selectedColorScheme = colorSchemes.colorSchemesById[id];
        $scope.primaryBackgroundStyle = backgroundStyle($scope.selectedColorScheme.primaryBackgroundColor);
        $scope.shadowBackgroundStyle = backgroundStyle($scope.selectedColorScheme.shadowBackgroundColor);
        $scope.primaryTextStyle = colorStyle($scope.selectedColorScheme.primaryTextColor);
        $scope.secondaryTextStyle = colorStyle($scope.selectedColorScheme.secondaryTextColor);
    }

    function fontStyle(font) {
        return {'font-family': font.name};
    }

    function backgroundStyle(color) {
        return {'background-color': color};
    }

    function colorStyle(color) {
        return {'color': color};
    }
});
