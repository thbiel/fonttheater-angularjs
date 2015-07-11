var app = angular.module('app', ['ngRoute', 'fontLibrary', 'colorSchemes']);

app.config(
    ['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'app/templates/home.html'
        }).
        when('/colors/:colorScheme?/:font?', {
            templateUrl: 'app/templates/colors.html'
        }).
        when('/headings/:colorScheme?/:font?', {
            templateUrl: 'app/templates/headings.html'
        }).
        when('/google/:colorScheme?/:font?', {
            templateUrl: 'app/templates/google-search.html'
        }).
        when('/typecast-1/:colorScheme?/:font?', {
            templateUrl: 'app/templates/typecast-1.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]
);

app.controller('FontController', function ($scope, $routeParams, $route, $location, fontLibraryService, colorSchemes) {

    //fontLibraryService.load(function (fontLib) {
    //    $scope.fontLibrary = fontLib;
    //});


    $scope.rp = $routeParams;


    $scope.fontLibrary = new FontLibrary(thbFonts);

    $scope.fontCollections = $scope.fontLibrary.fontCollections;

    $scope.selectFontById = function(fontId) {
        goToUrlForFont(fontId);
    };

    function currentFont(fontId) {
        var font = $scope.fontLibrary.fontsById[fontId];
        $scope.currentFont = font;
        $scope.currentFontId = font.id;
        $scope.currentFontStyle = fontStyle(font);
    }

    $scope.selectFontCollectionById = function(fontCollectionId) {
        var fontCollection = $scope.fontLibrary.fontCollectionsById[fontCollectionId];
        $scope.currentFontCollection = fontCollection.fonts;
        $scope.currentFontCollectionId = fontCollection.id;
        currentFont($scope.currentFontCollection[0].id);
    };

    $scope.selectFontCollectionById($scope.fontCollections[0].id);

    $scope.selectPreviousFont = function() {
        var index = $scope.currentFontCollection.indexOf($scope.currentFont);
        if (index > 0) {
            goToUrlForFont($scope.currentFontCollection[index - 1].id)
        }
    };

    $scope.selectNextFont = function() {
        var index = $scope.currentFontCollection.indexOf($scope.currentFont);
        if (index < ($scope.currentFontCollection.length - 1)) {
            goToUrlForFont($scope.currentFontCollection[index + 1].id)
        }
    };

    function goToUrlForFont(fontId) {
        var page = $location.path().split('/')[1];
        $location.path('/' + page + '/' + $scope.selectedColorScheme.id + '/' +  fontId)
    }

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
            colorScheme = colorSchemes.colorSchemes[0].id;
        }

        selectColorScheme(colorScheme);

        var fontParam = $routeParams['font'];

        var fontId;
        if (fontParam) {
            fontId = fontParam;
        } else {
            fontId = $scope.currentFontCollection[0].id;
        }

        currentFont(fontId);
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
