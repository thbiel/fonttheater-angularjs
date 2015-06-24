angular.module('colorSchemes', [])
    .factory('colorSchemes', function() {
        return {
            allFonts: function() {
                return fonts;
            },
            colorSchemes: colorSchemes,
            colorSchemesById: colorSchemesById
        };
    });

var colorSchemes = [
    {id: 'Blue'    , primaryBackgroundColor: '#008DD0', shadowBackgroundColor: '#0076AF', primaryTextColor: '#00476E', secondaryTextColor: 'white'},
    {id: 'Green'   , primaryBackgroundColor: '#8BC752', shadowBackgroundColor: '#73A643', primaryTextColor: '#00476E', secondaryTextColor: 'white'},
    {id: 'Orange'  , primaryBackgroundColor: '#F58221', shadowBackgroundColor: '#CA6C16', primaryTextColor: '#00476E', secondaryTextColor: 'white'},
    {id: 'Pink'    , primaryBackgroundColor: '#EE1451', shadowBackgroundColor: '#C40C42', primaryTextColor: '#00476E', secondaryTextColor: 'white'},
    {id: 'Red 1'   , primaryBackgroundColor: '#E93D24', shadowBackgroundColor: '#C1321C', primaryTextColor: '#00476E', secondaryTextColor: 'white'},
    {id: 'Lime'    , primaryBackgroundColor: '#BFD32C', shadowBackgroundColor: '#A1B423', primaryTextColor: '#00476E', secondaryTextColor: 'white'},
    {id: 'Dark'    , primaryBackgroundColor: '#231F20', shadowBackgroundColor: 'black'  , primaryTextColor: '#00476E', secondaryTextColor: 'white'},
    {id: 'Yellow'  , primaryBackgroundColor: '#F0E817', shadowBackgroundColor: '#D7CC0F', primaryTextColor: '#00476E', secondaryTextColor: 'white'},
    {id: 'Red 2'   , primaryBackgroundColor: '#EE1C25', shadowBackgroundColor: '#C61C25', primaryTextColor: '#00476E', secondaryTextColor: 'white'},
    {id: 'Blue 2'  , primaryBackgroundColor: '#487897', shadowBackgroundColor: '#426D87', primaryTextColor: '#00476E', secondaryTextColor: 'white'},
    {id: 'Yellow 2', primaryBackgroundColor: '#FFC107', shadowBackgroundColor: '#FFC107', primaryTextColor: '#00476E', secondaryTextColor: 'white'},
    {id: 'White'   , primaryBackgroundColor: '#FFFFFF', shadowBackgroundColor: '#FFFFFF', primaryTextColor: '#00476E', secondaryTextColor: '#00476E'},
    {id: 'Oliven'  , primaryBackgroundColor: '#242B33', shadowBackgroundColor: '#242B33'  , primaryTextColor: '#82aa3e', secondaryTextColor: 'white'}
];

var colorSchemesById = mapById(colorSchemes);

function mapById(objectsWithId) {
    var fontMap = {};
    angular.forEach(objectsWithId, function(object) {
        fontMap[object.id] = object;
    });
    return fontMap;
}


