function TwitterGeocode() {
    // https://regex101.com/r/iD0eM3/2
    var geocodeRegex = /geocode=([+-]?\d+(\.\d+)?),([+-]?\d+(\.\d+)?),(\d+(\.\d+)?\w*)/;

    // https://regex101.com/r/aY8iC4/1
    var distanceRegex = /(\d+(\.\d+)?)(\w+)?/

    /**
     * Parse the given string as distance number. Return the number of meters it
     * represents.
     * 
     * Right now, it accepts the 'km' and 'mi' suffixes, assuming that the given
     * number is in that distance unit.
     */
    this.parseMeters = function(distanceStr) {
        distanceStr = distanceStr.toLowerCase();
        var match = distanceRegex.exec(distanceStr);
        if( match ) {
            var distance = parseFloat(match[1]);
            var unit = match[3];
            if( unit==="km" ) {
                distance = distance*1000;
            }
            else if( unit==="mi" ) {
                distance = distance*1609.344;
            }
            return distance;
        }
        else {
            return null
        }
    };

    /**
     * Parse the first geocode from a string. Allows to have additional text
     * around the geocode, extracting just the right part.
     *
     * Returns an object with fields:
     * - lat: the latitude
     * - lng: the longitude
     * - radius: the geocode radius, in meters
     * - string: the original geocode string
     *
     * If a geocode can't be located, returns null.
     */
    this.parse = function(geocodeStr) {
        var match = geocodeRegex.exec(geocodeStr);
        if( match ) {
            return {
                lat: parseFloat( match[1] ) ,
                lng: parseFloat( match[3] ),
                radius: parseMeters( match[5] ),
                string: match[0]
            };
        }
        else {
            return null
        }
    };

    /**
     * Converts a geocode object (the output of the parse method, with fields
     * lat, lng and radius) to string.
     *
     * Returns null if any of the geocode fields is missing (i.e. is not an
     * geocode output from parse).
     */
    this.toString = function(geocode) {
        if( typeof geocode === 'object' && geocode &&
            typeof(geocode.lat) === 'number' &&
            typeof(geocode.lng) === 'number' &&
            typeof(geocode.radius) === 'number' ) {
            return "geocode:"+geocode.lat+","+geocode.lng+","+geocode.radius;
        }
        else {
            return null;
        }
    };
}
