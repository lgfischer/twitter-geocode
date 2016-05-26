var geocode = new TwitterGeocode();

QUnit.test( "Parse distances", function( assert ) {
    assert.equal( geocode.parseMeters("32"), 32 );
    assert.equal( geocode.parseMeters("24.5"), 24.5 );
    assert.equal( geocode.parseMeters("10km"), 10000 );
    assert.equal( geocode.parseMeters("10KM"), 10000 );
    assert.equal( geocode.parseMeters("1mi"), 1609.344 );
    assert.equal( geocode.parseMeters("32mi"), 51499.008 );
    assert.equal( geocode.parseMeters("3.5MI"), 5632.704 );
} );


QUnit.test( "Parse valid geocodes", function( assert ) {

    assert.deepEqual(
        geocode.parse("geocode=22,43,13"),
        {lat:22, lng:43, radius:13, string:"geocode=22,43,13"}
    );

    assert.deepEqual(
        geocode.parse("a string with geocode=-22,+43,13 data"),
        {lat:-22, lng:43, radius:13, string:"geocode=-22,+43,13"}
    );

    assert.deepEqual(
        geocode.parse("geocode=-22.912214,-43.230182,1km"),
        {lat:-22.912214, lng:-43.230182, radius:1000, string:"geocode=-22.912214,-43.230182,1km"}
    );

    assert.deepEqual(
        geocode.parse("geocode=-22.912214,-43.230182,3.5MI"),
        {lat:-22.912214, lng:-43.230182, radius:5632.704, string:"geocode=-22.912214,-43.230182,3.5MI"}
    );

});


QUnit.test( "Parse invalid geocodes", function( assert ) {

    assert.equal(
        geocode.parse("geocode=22,43,"),
        null
    );

    assert.equal(
        geocode.parse("geocode=22,43,KM"),
        null
    );

    assert.equal(
        geocode.parse("geocode=22,43,null"),
        null
    );

    assert.equal(
        geocode.parse("geocode=22,XX,12"),
        null
    );

    assert.equal(
        geocode.parse("geocode=null,43,12"),
        null
    );

    assert.equal(
        geocode.parse("geocodex=22,43,12"),
        null
    );

});


QUnit.test( "Convert geocodes to strings", function( assert ) {
    assert.equal( geocode.toString({lat:12,lng:45,radius:33}), "geocode:12,45,33" );
    assert.equal( geocode.toString({lat:-12,lng:-45,radius:33}), "geocode:-12,-45,33" );
} );
