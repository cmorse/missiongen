/*global $: true, jQuery: true */
/*jshint boss: true, evil: true, curly: true, eqeqeq: true, undef: true */

var missionStatement;

$(document).ready(function(){
	var stringCombine, 
		$adverbs = $("#adverbs"),
		$verbs = $("#verbs"),
		$adjectives = $("#adjectives"),
		$nouns = $("#nouns");
	
	missionStatement = {
		adverbs: [],
		verbs: [],
		adjectives: [],
		nouns: [],
		startText: [
			{
				arr: ["count", "rely"],
				p1: "The customer can", p2: "on us to"
			},{
				arr: ["commit", "strive"],
				p1: "We will", p2: "to"
			},{
				arr: ["", "concertedly", "cooperatively", "together", "in sync"],
				p1: "We will work", p2: "to"
			},{
				arr: ["are committed", "envision", "have committed", "strive"],
				p1: "We", p2: "to"
			},{
				arr: ["business", "challenge", "goal", "job", "mission", "objective", "responsibility", "vision"],
				p1: ["Our", "It is our"], p2: [["is to", "is to continue to"], ["to", "to continue to"]]
			},
			["To", "We"]
		],
		midText: [
			{
				arr: ["continuing", "endeavoring"],
				p1: "while", p2: "to"
			},{
				arr: ["competitive", "relevant", "pertinent"],
				p1: "to stay", p2: "in tomorrow's world"
			},{
				arr: ["as well as", "in order to", "so that we may", "to allow us to"],
				p1: "", p2: ["continue to", "endeavor to"]
			},
			["and", "as well as"]
		],
		endText: [
			{
				arr: ["promoting", "encouraging"],
				p1: "while", p2: "personal employee growth"
			},{
				arr: ["meet our customer's needs", "solve business problems", "set us apart", "set us apart from the competition"],
				p1: "to", p2: ""
			},{
				arr: ["while maintaining", "for"],
				p1: "", p2: ["the highest standards", "100% customer satisfaction"]
			},
			// Or have nothing for end text (weight it more toward a blank ending by having a lot of them)
			["", "", "", "", "", "", "", "", ""]
		],
		/**
		 * This function will arrange the input into every possible comibnation of outputs.
		 * There are two valid types of data to pass
		 *	  Type 1:
		 *		An array of values called "arr", along with two additional values "p1" and "p2"
		 *		which can each either be a single value or an array of values
		 *	  Type 2:
		 *		Simply an array of values
		 *
		 * Example of data:
		 *	[
		 *		{
		 *			arr: ["continuing", "endeavoring"],
		 *			p1: "while",
		 *			p2: "to"
		 *		},
		 *		["and", "as well as"],
		 *		...
		 *	];
		 */
		randString: function(data) {
			return $.map(data, function(v) {
					return ($.isArray(v) ? v : stringCombine(v.arr, v.p1, v.p2));
				}).random()[0];
		},
		randQuote: function() {
			var text = [];
			
			// Update noun, verb, adjective, and adverb definitions from entered fields
			// And randomize the order
			this.adverbs	= $adverbs.val().split(",").random();
			this.verbs		= $verbs.val().split(",").random();
			this.adjectives = $adjectives.val().split(",").random();
			this.nouns		= $nouns.val().split(",").random();
			
			// Get a random starting string
			text.push(this.randString(this.startText));
			
			// Add in a random adverb, verb, adjective, noun set
			$.merge(text, this.advVerbAdjNoun());
			
			// Get a random middle string
			text.push(this.randString(this.midText));
			
			// If the random string that was picked was not "relevant", "competitive", or "pertinent" then add an end string
			if(!/competitive|relevant|pertinent/.test(text[text.length - 1])) {
				$.merge(text, this.advVerbAdjNoun());
				text.push(this.randString(this.endText));
			}
			
			// Join the array together with spaces, and remove everything with more than 2 spaces
			return $.trim(text.join(" ").replace(/\s\s+/g, " ")) + ".";
		},
		advVerbAdjNoun: function() {
			return ([this.adverbs.pop(), this.verbs.pop(), this.adjectives.pop(), this.nouns.pop()]);
		}
	};
	
	// Sandwitches everything in the array between the two strings passed
	stringCombine = function(arr, p1, p2) {
		if($.isArray(p1) && $.isArray(p2)) {
			return $.map(p1, function(v, i) {
				return stringCombine(arr, p1[i], p2[i]);
			});
		} else {
			return $.map(arr, function(v1) {
				if($.isArray(p1)) {
					return $.map(p1, function(v2) { return [v2, v1, p2].join(" "); });
				} else if($.isArray(p2)) {
					return $.map(p2, function(v2) { return [p1, v1, v2].join(" "); });
				} else {
					return [p1, v1, p2].join(" ");
				}
			});
		}
	};
	
	$("#tabs").tabs();
	
	// Create a button, and handle user clicking on the generate button
	$("#generate").button().click(function(e) {
		$("#output").text(missionStatement.randQuote());
		return false;
	})
	
	// Click on the generate button to trigger initial mission statement printing
		.click();
});


// Returns an array with the order randomized, along the range specified
Array.prototype.random = function(start, stop) {
	start = start || 0;
	stop = stop || this.length;

	// Grab portion of the array that we will be working with
	var copy = this.slice(start, stop),
		randVals = [], rand;

	for(var i = start; i < stop; i++) {
		rand = Math.floor(Math.random() * copy.length);
		randVals.push(copy[rand]); // Add random value to the new array
		copy.splice(rand, 1);	// Remove value that was just used from array
	}
	
	return randVals;
};
