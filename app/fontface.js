var app = angular.module('app', ['ngRoute', 'fontLibrary', 'colorSchemes']);

app.config(
    ['$routeProvider', function($routeProvider) {

    $routeProvider.
        when('/', {
            templateUrl: 'app/templates/home.html'
        }).
        when('/:template?/:colorScheme?/:font?', {
            templateUrl: function(params) {
                return resolveTemplate(params).templateUri
            }
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


    $scope.currentTemplateCollection = templates;

    //$scope.fontLibrary = new FontLibrary(checkOut);
    //$scope.fontLibrary = new FontLibrary(underratedFavorites);
    $scope.fontLibrary = new FontLibrary(checkOut.concat(underratedFavorites));
    //$scope.fontLibrary = new FontLibrary(thbFonts);
    //$scope.fontLibrary = new FontLibrary(sixStars);
    //$scope.fontLibrary = new FontLibrary(offline);

    $scope.fontCollections = $scope.fontLibrary.fontCollections;

    $scope.selectFontById = function(fontId) {
        goToUrlForFont(fontId);
    };

    $scope.selectTemplateById = function(templateId) {
        goToUrlForTemplate(templateId);
    };

    function currentFont(fontId) {
        var font = $scope.fontLibrary.fontsById[fontId];
        $scope.currentFont = font;
        $scope.currentFontId = font.id;
        $scope.currentFontStyle = fontStyle(font);
    }

    $scope.selectFontCollectionById = function(fontCollectionId) {
        var fontCollection = $scope.fontLibrary.fontCollectionsById[fontCollectionId];
        $scope.currentFontCollection = fontCollection;
        $scope.currentFontCollectionId = fontCollection.id;
        currentFont($scope.currentFontCollection.fonts[0].id);
    };

    $scope.selectFontCollectionById($scope.fontCollections[0].id);

    $scope.selectPreviousFont = function() {
        var index = $scope.currentFontCollection.fonts.indexOf($scope.currentFont);
        if (index > 0) {
            goToUrlForFont($scope.currentFontCollection.fonts[index - 1].id)
        }
    };

    $scope.selectNextFont = function() {
        var index = $scope.currentFontCollection.fonts.indexOf($scope.currentFont);
        if (index < ($scope.currentFontCollection.fonts.length - 1)) {
            goToUrlForFont($scope.currentFontCollection.fonts[index + 1].id)
        }
    };

    function goToUrlForFont(fontId) {
        var page = $location.path().split('/')[1];
        $location.path('/' + page + '/' + $scope.selectedColorScheme.id + '/' +  fontId)
    }

    function goToUrlForTemplate(templateId) {
        $location.path('/' + templateId + '/' + $scope.selectedColorScheme.id + '/' +  $scope.currentFontId)
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
            fontId = $scope.currentFontCollection.fonts[0].id;
        }

        currentFont(fontId);

        $scope.currentTemplateId = resolveTemplate($routeParams).id;
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

var templates = [
    {id: 'colors', templateUri: 'app/templates/colors.html'},
    {id: 'headings', templateUri: 'app/templates/headings.html'},
    {id: 'google', templateUri: 'app/templates/google-search.html'},
    {id: 'typecast-1', templateUri: 'app/templates/typecast-1.html'},
    {id: 'typecast-showcase', templateUri: 'app/templates/typecast-showcase.html'}
];


var templatesById = mapTemplateUriById(
    templates
);

function mapTemplateUriById(templates) {
    var map = {};
    angular.forEach(templates, function(template) {
        map[template.id] = template;
    });
    return map;
}

var DEFAULT_TEMPLATE_ID = 'headings';

function resolveTemplate(routeParams) {
    var id = routeParams['template'];
    if (!id) {
        id = DEFAULT_TEMPLATE_ID;
    }

    return templatesById[id];
}
