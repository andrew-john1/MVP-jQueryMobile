$(document).on('pagebeforeshow', '#home', function(event) {
	homepage();
});

$(document).on('pagebeforeshow', '#detail', function(event) {
	renderDetail();
});

function homepage(){
	// Fetch the existing objects
	objects = getObjects();

	// Clear the list
	$('#items').find('li').remove();

	// Add every object to the objects list
	$.each(objects, function(index, item){
		element = `<li><a href="http://localhost/shoppinglist/#detail" class="item">${item.title}</a></li>`;
		
		$('#items').append(element);
	});
  
   $('#items').listview();
   $('#items').listview("refresh");
}	

function renderDetail(){
	// get the title 
	var title = $('.detailTitle')[0].innerText;
	// Fetch the existing objects
	object = getObject(title);
}

function add(){
	// Retrieve the entered form data
	var title = $('[name="item"]').val();
	// Fetch the existing objects
	var objects = getObjects();
	// Push the new item into the existing list
	objects.push({
		title: title
	});
	// Store the new list
	saveObjects(objects);
	// Reload the page to show the new objects
	window.location.replace("http://localhost/shoppinglist");
}

function getObjects(){
	// See if objects is inside localStorage
	if (localStorage.getItem("objects")){
		// If yes, then load the objects
		objects = JSON.parse(localStorage.getItem("objects"));
	}else{
		// Make a new array of objects
		objects = new Array();
	}
	console.log(objects);
	return objects;
}

function getObject(name){
	objects = JSON.parse(localStorage.getItem("objects"));

	var object = objects.filter(
		function(object) {
			return object.title === name;
		}
	);
	return object[0];
}

function saveObjects(objects){
	// Save the list into localStorage
	localStorage.setItem("objects", JSON.stringify(objects));
}

function update() {
	// get the title 
	var title = $('.detailTitle')[0].innerText;
	// Retrieve the entered form data
	var name = $('[name="update"]').val();
	// fetch the existing objects
	var objects = getObjects();
	objects.map(function(item, index) {
		if (item.title === title) {
			objects[index].title = name;
		}
	})

	saveObjects(objects);
	window.location.replace("http://localhost/shoppinglist");
}

// A $( document ).ready() block.
$( document ).ready(function() {
	$('#items').click(function(e) {
		detailpage(e.target.text);
		console.log(e)
	});

	$('.delete').click(function() {
		// get the title 
		var title = $('.detailTitle')[0].innerText;
		// fetch the existing objects
		var objects = getObjects();
		objects.map(function(item, index) {
			if (item.title === title) {
				objects.splice(index, 1);
				saveObjects(objects);
				window.location.replace("http://localhost/shoppinglist");
			}
		});
	});

	function detailpage(name) {
		$('.detailTitle').text(name);
	}
});
