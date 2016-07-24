	
	
$(document).ready(function() {
	var ms = missionStatement;
	var $toinsert = $('<div/>');

	$toinsert.append('<p id="test" />');
	$toinsert.append('<textarea id="testinput" cols="90" rows="3"></textarea>');

	$toinsert.children('textarea').wrap('<div />');
	
	$toinsert.append('<button id="gotest">Run Test</button>')
	
	$toinsert.children('button').button();
	
	$('body').append($toinsert);
	
	$("#gotest").click(function(e) {
		ms.updateWords();
		
		// Grab text from the input box
		var newtext = $.trim($('#testinput').val());
		
		var types = [ms.adverbs, ms.verbs, ms.adjectives, ms.nouns],
			names = ["adverb", "verb", "adjective", "noun"];
			
		$.each(types, function(i1, v1) {
			$.each(v1, function(i2, v2) {
				newtext = newtext.replace($.trim(v2), names[i1]);
			});
		});
		
		$('#test').text(newtext);
		
		return false;
	});
});