# Twitter Geocode

A small Javascript library to parse and deal with geocodes in Twitter searches.

The Twitter API allows to filter Tweets by adding a geocode filter (https://dev.twitter.com/rest/public/search). With this filter, you can search for Tweets within a given radius around a point (defined by latitude/longitude). An example from the Twitter API is that if you want all recent tweets done in Portuguese, near Maracanã soccer stadium in Rio de Janeiro, you can use the search URL https://api.twitter.com/1.1/search/tweets.json?q=&geocode=-22.912214,-43.230182,1km&lang=pt&result_type=recent.

This library helps to extract and parse the geocode from such queries. With it, you can parse the above URL like this:

	var url = 'https://api.twitter.com/1.1/search/tweets.json?q=&geocode=-22.912214,-43.230182,1km&lang=pt&result_type=recent';
	var twitterGeocode = new TwitterGeocode();
	var geocode = twitterGeocode.parse(url);
	console.log(twitterGeocode.lat); // prints -22.912214
	console.log(twitterGeocode.lng); // prints -43.230182
	console.log(twitterGeocode.radius); // prints 1000

