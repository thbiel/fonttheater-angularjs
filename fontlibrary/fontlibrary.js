angular.module('fontLibrary', [])
    .factory('fontLibraryService', function($http) {
        return {
            load: function(callback) {
                $http.get('data/fonts.json').success(function(fontsJson) {
                    callback(new FontLibrary(fontsJson));
                });
            }
        }
    });

function FontLibrary (fontsJson) {
    this.fonts = toFonts(fontsJson);

    var fontsById = mapById(this.fonts);
    this.fontsById = fontsById;

    this.fontCollections = fontCollections(this.fonts);
    this.fontCollectionsById = mapById(this.fontCollections);

    function toFonts(fontsJson) {
        var result = [];
        angular.forEach(fontsJson, function(fontJson) {
            result.push(new Font(fontJson.id, fontJson.name, fontJson.providerId));
        });
        return result;
    }

    var fontProviders = [
        {id: 'google', name: 'Google Web Fonts', fontFaceCssBaseUrl: 'http://fonts.googleapis.com/css'}
    ];

    function fontCollections(fonts) {
        return [
            {id: "All",         fonts: fonts},
            {id: "Sans-serifs", fonts: createFonts(['Cantarell', 'Quicksand'])},
            {id: "Serifs",      fonts: createFonts(['Trykker'])},
            {id: "Slab-serifs", fonts: createFonts(['Roboto+Slab', 'Bitter'])}
        ]
    }

    function mapById(objectsWithId) {
        var fontMap = {};
        angular.forEach(objectsWithId, function(object) {
            fontMap[object.id] = object;
        });

        return fontMap;
    }

    function createFonts(fontIds) {
        var result = [];

        angular.forEach(fontIds, function(fontId) {
            result.push(fontsById[fontId]);
        });

        return result;
    }
}

function Font(id, name, providerId) {
    this.id = id;
    this.name = name;
    this.providerId = providerId;
    this.fontFaceCssUrl = function() {
        return fontFaceCssUrl(id, providerId);
    };
}

function fontFaceCssUrl(fontId, providerId) {
    if (providerId === 'google') {
        return fontProvidersById['google'].fontFaceCssBaseUrl + "?family=" + fontId;
    } else {
        throw new Error("Unsupported font provider: '" + providerId +  "'.");
    }
}


var thbFonts =
    [
        {"id": "Cambay", "name": "Cantarell", "providerId": "google"},
        {"id": "Fira+Sans", "name": "Cantarell", "providerId": "google"},
        {"id": "Cantarell", "name": "Cantarell", "providerId": "google"},
        {"id": "Quicksand", "name": "Quicksand", "providerId": "google"},
        {"id": "Ropa+Sans", "name": "Ropa Sans", "providerId": "google"},
        {"id": "Open+Sans+Condensed:300", "name": "Open Sans Condensed", "providerId": "google"},
        {"id": "Rambla", "name": "Rambla", "providerId": "google"},
        {"id": "Mako", "name": "Mako", "providerId": "google"},
        {"id": "Carrois+Gothic", "name": "Carrois Gothic", "providerId": "google"},
        {"id": "Abel", "name": "Abel", "providerId": "google"},
        {"id": "Muli", "name": "Muli", "providerId": "google"},
        {"id": "Julius+Sans+One", "name": "Julius Sans One", "providerId": "google"},
        {"id": "News+Cycle", "name": "News Cycle", "providerId": "google"},
        {"id": "Armata", "name": "Armata", "providerId": "google"},
        {"id": "PT Sans Caption", "name": "PT Sans Caption", "providerId": "google"},
        {"id": "Metrophobic", "name": "Metrophobic", "providerId": "google"},
        {"id": "Karla", "name": "Karla", "providerId": "google"},
        {"id": "Cabin", "name": "Cabin", "providerId": "google"},
        {"id": "Source+Sans+Pro", "name": "Source Sans Pro", "providerId": "google"},
        {"id": "Roboto", "name": "Roboto", "providerId": "google"},
        {"id": "Varela", "name": "Varela", "providerId": "google"},
        {"id": "Varela+Round", "name": "Varela Round", "providerId": "google"},
        {"id": "Fenix", "name": "Fenix", "providerId": "google"},
        {"id": "ABeeZee", "name": "ABeeZee", "providerId": "google"},
        {"id": "Open+Sans", "name": "Open Sans", "providerId": "google"},
        {"id": "Montserrat", "name": "Montserrat", "providerId": "google"},
        {"id": "Questrial", "name": "Questrial", "providerId": "google"},
        {"id": "Quattrocento+Sans", "name": "Quattrocento Sans", "providerId": "google"},
        {"id": "Bitter", "name": "Bitter", "providerId": "google"},
        {"id": "Trykker", "name": "Trykker", "providerId": "google"},
        {"id": "Cabin+Condensed", "name": "Cabin Condensed", "providerId": "google"},
        {"id": "Roboto+Condensed", "name": "Roboto Condensed", "providerId": "google"},
        {"id": "Roboto+Slab", "name": "Roboto Slab", "providerId": "google"},
        {"id": "Oswald", "name": "Oswald", "providerId": "google"},
        {"id": "Lato", "name": "Lato", "providerId": "google"},
        {"id": "PT Sans", "name": "PT Sans", "providerId": "google"},
        {"id": "PT Sans Narrow", "name": "PT Sans Narrow", "providerId": "google"},
        {"id": "Raleway", "name": "Raleway", "providerId": "google"},
        {"id": "Oxygen", "name": "Oxygen", "providerId": "google"},
        {"id": "Scada", "name": "Scada"}
    ];



