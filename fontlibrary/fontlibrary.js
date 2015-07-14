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
            new FontCollection("All", fonts)
            //new FontCollection("Sans-serifs",createFonts(['Cantarell', 'Quicksand'])),
            //new FontCollection("Serifs",      createFonts(['Trykker'])),
            //new FontCollection("Slab-serifs", createFonts(['Roboto+Slab', 'Bitter']))
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

function FontCollection(id, fonts) {
    this.id = id;
    this.fonts = fonts;

    this.cssFonts = filterByProvider('css');
    this.googleFonts = filterByProvider('google');

    function filterByProvider(provider) {
        var result = [];
        angular.forEach(fonts, function(font) {
            if (font.providerId == provider) {
                result.push(font);
            }
        });

        return result;
    }
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
        {"id": "Urbano-Condensed_400_normal", "name": "Urbano-Condensed", "providerId": "css"},
        {"id": "Cambay", "name": "Cambay", "providerId": "google"},
        {"id": "Fira+Sans", "name": "Fira Sans", "providerId": "google"},
        {"id": "Cantarell", "name": "Cantarell", "providerId": "google"},
        {"id": "Ek+Mukta", "name": "Ek Mukta", "providerId": "google"},
        {"id": "Martel+Sans", "name": "Martel Sans", "providerId": "google"},
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
        {"id": "PT+Sans+Caption", "name": "PT Sans Caption", "providerId": "google"},
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
        {"id": "PT+Sans", "name": "PT Sans", "providerId": "google"},
        {"id": "PT+Sans Narrow", "name": "PT Sans Narrow", "providerId": "google"},
        {"id": "Raleway", "name": "Raleway", "providerId": "google"},
        {"id": "Oxygen", "name": "Oxygen", "providerId": "google"},
        {"id": "Scada", "name": "Scada", "providerId": "google"},
        {"id": "Pragati+Narrow", "name": "Pragati Narrow", "providerId": "google"},
        {"id": "Jaldi", "name": "Jaldi", "providerId": "google"},
        {"id": "Kadwa", "name": "Kadwa", "providerId": "google"},
        {"id": "Amble", "name": "Amble", "providerId": "google"}
    ];

var cssFonts = [
    {"id": "eau-sans-book", "name": "eau-sans-book", "providerId": "file"},
    {"id": "amble-light-condensed", "name": "amble-light-condensed", "providerId": "file"},
    {"id": "font-face-adelle-sans", "name": "adelle-sans", "providerId": "css"},
    {"id": "font-face-adelle", "name": "adelle", "providerId": "css"},
    {"id": "font-face-allumi-std-extended", "name": "allumi-std-extended", "providerId": "css"},
    {"id": "font-face-allumi-std", "name": "allumi-std", "providerId": "css"},
    {"id": "font-face-alternate-gothic-no-1-d", "name": "alternate-gothic-no-1-d", "providerId": "css"},
    {"id": "font-face-alternate-gothic-no-2-d", "name": "alternate-gothic-no-2-d", "providerId": "css"},
    {"id": "font-face-alternate-gothic-no-3-d", "name": "alternate-gothic-no-3-d", "providerId": "css"},
    {"id": "font-face-apolline", "name": "apolline", "providerId": "css"},
    {"id": "font-face-atrament-web", "name": "atrament-web", "providerId": "css"},
    {"id": "font-face-atrament-web_light", "name": "atrament-web-light", "providerId": "css"},
    {"id": "font-face-bebas-neue", "name": "bebas-neue", "providerId": "css"},
    {"id": "font-face-bree-serif", "name": "bree-serif", "providerId": "css"},
    {"id": "font-face-calluna-sans", "name": "calluna-sans", "providerId": "css"},
    {"id": "font-face-comenia-sans-web", "name": "comenia-sans-web", "providerId": "css"},
    {"id": "font-face-crete-rounded-web", "name": "crete-rounded-web", "providerId": "css"},
    {"id": "font-face-cronos-pro-display", "name": "cronos-pro-display", "providerId": "css"},
    {"id": "font-face-elena-web-basic", "name": "elena-web-basic", "providerId": "css"},
    {"id": "font-face-etica-display", "name": "etica-display", "providerId": "css"},
    {"id": "font-face-etica", "name": "etica", "providerId": "css"},
    {"id": "font-face-ff-tisa-web-pro", "name": "ff-tisa-web-pro", "providerId": "css"},
    {"id": "font-face-franklin-gothic-comp-urw", "name": "franklin-gothic-comp-urw", "providerId": "css"},
    {"id": "font-face-franklin-gothic-ext-comp-urw", "name": "franklin-gothic-ext-comp-urw", "providerId": "css"},
    {"id": "font-face-gnuolane", "name": "gnuolane", "providerId": "css"},
    {"id": "font-face-jaf-bernina-sans-condensed", "name": "jaf-bernina-sans-condensed", "providerId": "css"},
    {"id": "font-face-jaf-bernina-sans-narrow-light", "name": "jaf-bernina-sans-narrow-light", "providerId": "css"},
    {"id": "font-face-katarine-web", "name": "katarine-web", "providerId": "css"},
    {"id": "font-face-league-gothic", "name": "league-gothic", "providerId": "css"},
    {"id": "font-face-lemonde-journal", "name": "lemonde-journal", "providerId": "css"},
    {"id": "font-face-museo-sans-rounded", "name": "museo-sans-rounded", "providerId": "css"},
    {"id": "font-face-nudista-web", "name": "nudista-web", "providerId": "css"},
    {"id": "font-face-obliqua", "name": "obliqua", "providerId": "css"},
    {"id": "font-face-p22-underground-pc", "name": "p22-underground-pc", "providerId": "css"},
    {"id": "font-face-parisine-std", "name": "parisine-std", "providerId": "css"},
    {"id": "font-face-prenton-condensed", "name": "prenton-condensed", "providerId": "css"},
    {"id": "font-face-purista-web", "name": "purista-web", "providerId": "css"},
    {"id": "font-face-quara-web", "name": "quara-web", "providerId": "css"},
    {"id": "font-face-ratio-display", "name": "ratio-display", "providerId": "css"},
    {"id": "font-face-ratio", "name": "ratio", "providerId": "css"},
    {"id": "font-face-republic-web-condensed", "name": "republic-web-condensed", "providerId": "css"},
    {"id": "font-face-ronnia-condensed", "name": "ronnia-condensed", "providerId": "css"},
    {"id": "font-face-ronnia", "name": "ronnia", "providerId": "css"},
    {"id": "font-face-runda", "name": "runda", "providerId": "css"},
    {"id": "font-face-sirba-web", "name": "sirba-web", "providerId": "css"},
    {"id": "font-face-soleil", "name": "soleil", "providerId": "css"},
    {"id": "font-face-sommet", "name": "sommet", "providerId": "css"},
    {"id": "font-face-t26-carbon", "name": "t26-carbon", "providerId": "css"},
    {"id": "font-face-tablet-gothic-compressed", "name": "tablet-gothic-compressed", "providerId": "css"},
    {"id": "font-face-tablet-gothic-condensed", "name": "tablet-gothic-condensed", "providerId": "css"},
    {"id": "font-face-tablet-gothic-narrow", "name": "tablet-gothic-narrow", "providerId": "css"},
    {"id": "font-face-tablet-gothic-semi-condensed", "name": "tablet-gothic-semi-condensed", "providerId": "css"},
    {"id": "font-face-tablet-gothic-wide", "name": "tablet-gothic-wide", "providerId": "css"},
    {"id": "font-face-tablet-gothic", "name": "tablet-gothic", "providerId": "css"},
    {"id": "font-face-tilden-sans-light", "name": "tilden-sans-light", "providerId": "css"},
    {"id": "font-face-vinyl", "name": "vinyl", "providerId": "css"},
    {"id": "sanchez_400_normal", "name": "sanchez", "providerId": "css"},
    {"id": "urbano-black-expanded_800_normal", "name": "urbano-black-expanded", "providerId": "css"},
    //{"id": "urbano-black_800_italic", "name": "urbano-black", "providerId": "css"},
    {"id": "urbano-black_800_normal", "name": "urbano-black", "providerId": "css"},
    //{"id": "urbano-bold-condensed_700_italic", "name": "urbano-bold-condensed", "providerId": "css"},
    {"id": "urbano-bold-condensed_700_normal", "name": "urbano-bold-condensed", "providerId": "css"},
    {"id": "urbano-bold-expanded_700_normal", "name": "urbano-bold-expanded", "providerId": "css"},
    //{"id": "urbano-bold_700_italic", "name": "urbano-bold", "providerId": "css"},
    {"id": "urbano-condensed_400_normal", "name": "urbano-condensed", "providerId": "css"},
    //{"id": "urbano-condensed_italic_normal", "name": "urbano-condensed", "providerId": "css"},
    {"id": "urbano-expanded_400_normal", "name": "urbano-expanded", "providerId": "css"},
    //{"id": "urbano-extra-bold-condensed_800_italic", "name": "urbano-extra-bold-condensed", "providerId": "css"},
    {"id": "urbano-extra-bold-condensed_800_normal", "name": "urbano-extra-bold-condensed", "providerId": "css"},
    {"id": "urbano-extra-bold-expanded_800_normal", "name": "urbano-extra-bold-expanded", "providerId": "css"},
    {"id": "urbano-extra-condensed_400_normal", "name": "urbano-extra-condensed", "providerId": "css"},
    //{"id": "urbano-light-condensed_300_italic", "name": "urbano-light-condensed", "providerId": "css"},
    {"id": "urbano-light-condensed_300_normal", "name": "urbano-light-condensed", "providerId": "css"},
    {"id": "urbano-light-extra-condensed_300_normal", "name": "urbano-light-extra-condensed", "providerId": "css"},
    //{"id": "urbano-light_300_italic", "name": "urbano-light", "providerId": "css"},
    {"id": "urbano-light_300_normal", "name": "urbano-light", "providerId": "css"},
    //{"id": "urbano-ultra_900_italic", "name": "urbano-ultra", "providerId": "css"},
    {"id": "urbano-ultra_900_normal", "name": "urbano-ultra", "providerId": "css"},
    //{"id": "urbano_400_italic", "name": "urbano", "providerId": "css"},
    {"id": "urbano_400_normal", "name": "urbano", "providerId": "css"},
    {"id": "urbano_700_normal", "name": "urbano", "providerId": "css"},
    //{"id": "urbano_italic_normal", "name": "urbano", "providerId": "css"}
];
    
    //<link href='http://fonts.googleapis.com/css?family=Alegreya+Sans+SC|Orienta|Fira+Sans|Noto+Sans|Droid+Sans|Average+Sans|Tauri|Anaheim|Duru+Sans|Noto+Serif|Gudea|Ek+Mukta|Martel+Sans|Alegreya+Sans|Cambay|Pathway+Gothic+One|Merriweather+Sans|Sintony|Pontano+Sans|Telex|Carme|Slabo+13px|Slabo+27px|Roboto+Slab|Sanchez|Noticia+Text|Crimson+Text' rel='stylesheet' type='text/css'>



