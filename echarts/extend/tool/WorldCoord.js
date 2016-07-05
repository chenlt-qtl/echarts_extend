WorldCoord = (function(){
var geoCoordMap = { 
		"Amsterdam": [4.895168,52.370216],
	    "Athens": [-83.357567,33.951935],
	    "Auckland": [174.763332,-36.84846],
	    "Bangkok": [100.501765,13.756331],
	    "Barcelona": [2.173403,41.385064],
	    "Beijing": [116.407395,39.904211],
	    "Berlin": [13.404954,52.520007],
	    "Bogotá": [-74.072092,4.710989],
	    "Bratislava": [17.107748,48.148596],
	    "Brussels": [4.35171,50.85034],
	    "Budapest": [19.040235,47.497912],
	    "Buenos Aires": [-58.381559,-34.603684],
	    "Bucharest": [26.102538,44.426767],
	    "Caracas": [-66.903606,10.480594],
	    "Chicago": [-87.629798,41.878114],
	    "Delhi": [77.209021,28.613939],
	    "Doha": [51.53104,25.285447],
	    "Dubai": [55.270783,25.204849],
	    "Dublin": [-6.26031,53.349805],
	    "Frankfurt": [8.682127,50.110922],
	    "Geneva": [6.143158,46.204391],
	    "Helsinki": [24.938379,60.169856],
	    "Hong Kong": [114.109497,22.396428],
	    "Istanbul": [28.978359,41.008238],
	    "Jakarta": [106.845599,-6.208763],
	    "Johannesburg": [28.047305,-26.204103],
	    "Cairo": [31.235712,30.04442],
	    "Kiev": [30.5234,50.4501],
	    "Copenhagen": [12.568337,55.676097],
	    "Kuala Lumpur": [101.686855,3.139003],
	    "Lima": [-77.042793,-12.046374],
	    "Lisbon": [-9.139337,38.722252],
	    "Ljubljana": [14.505751,46.056947],
	    "London": [-0.127758,51.507351],
	    "Los Angeles": [-118.243685,34.052234],
	    "Luxembourg": [6.129583,49.815273],
	    "Lyon": [4.835659,45.764043],
	    "Madrid": [-3.70379,40.416775],
	    "Milan": [9.185924,45.465422],
	    "Manama": [50.58605,26.228516],
	    "Manila": [120.984219,14.599512],
	    "Mexico City": [-99.133208,19.432608],
	    "Miami": [-80.19179,25.76168],
	    "Montreal": [-73.567256,45.501689],
	    "Moscow": [37.6173,55.755826],
	    "Mumbai": [72.877656,19.075984],
	    "Munich": [11.581981,48.135125],
	    "Nairobi": [36.821946,-1.292066],
	    "New York": [-74.005941,40.712784],
	    "Nicosia": [33.382276,35.185566],
	    "Oslo": [10.752245,59.913869],
	    "Paris": [2.352222,48.856614],
	    "Prague": [14.4378,50.075538],
	    "Riga": [24.105186,56.949649],
	    "Rio de Janeiro": [-43.172896,-22.906847],
	    "Rome": [12.496366,41.902783],
	    "Santiago de Chile": [-70.669265,-33.44889],
	    "São Paulo": [-46.633309,-23.55052],
	    "Seoul": [126.977969,37.566535],
	    "Shanghai": [121.473701,31.230416],
	    "Singapore": [103.819836,1.352083],
	    "Sofia": [23.321868,42.697708],
	    "Stockholm": [18.068581,59.329323],
	    "Sydney": [151.209296,-33.86882],
	    "Taipei": [121.565418,25.032969],
	    "Tallinn": [24.753575,59.436961],
	    "Tel Aviv": [34.781768,32.0853],
	    "Tokyo": [139.691706,35.689487],
	    "Toronto": [-79.383184,43.653226],
	    "Vilnius": [25.279651,54.687156],
	    "Warsaw": [21.012229,52.229676],
	    "Vienna": [16.373819,48.208174],
	    "Zurich": [8.541694,47.376887]
	};
	
	this.getCoord = function(name){
		return geoCoordMap[name];
	};
	
	this.convertData = function (from,data) {
	    var res = [];
	    for (var i = 0; i < data.length; i++) {
	        var dataItem = data[i];
	        var fromCoord = geoCoordMap[from];
	        var toCoord = geoCoordMap[dataItem.name];
	        if (fromCoord && toCoord) {
	            res.push([{
	                name: from,
	                coord: fromCoord,
	                value:dataItem.value
	            }, {
	                name: dataItem.name,
	                coord: toCoord,
	                value:dataItem.value 
	            }]);
	        }
	    }
	    return res;
	};
})