// Week 4 - VFW
// Term 1108
// Scott C. Shamka

var db = getLocalStorage() || alert("Sorry local storage is not supported");

// Execute several functions after the DOM is completely loaded.
window.onload = startUp();

function startUp(){
	addOption_list(); // Populates the Select Category List
	document.getElementById('category').focus(); // Focuses on the Category list
}

function getLocalStorage() {
	try {
       if( !! window.localStorage ) return window.localStorage;
           } catch(e) {
              return undefined;
           }
}

function getItems(){
	var getListdiv = document.getElementById("dataList");

	for(var i=0, len = db.length; i < len; i++){
		
		var key = db.key(i);
		var value = db.getItem(key);
		value = value.split(';');
		
		var category = value[0];
		var event = value[1];
		var date = value[2];
		var notes = value[3];
			
		var newUl = document.createElement("ul");
		
			for(var ii=0, allLength = value.length; ii < allLength; ii++){
				var newLi = document.createElement("li");
				var itemTxt = document.createTextNode(value[ii]);
				newLi.appendChild(itemTxt);
				newUl.appendChild(newLi);
				getListdiv.appendChild(newUl);
			}
				
		var catImage;
				
		if(category === "Home"){
			catImage = "home.png";
		} else {
			if(category === "School"){
				catImage = "school.jpg";
			} else {
				if(category === "Work"){
					catImage = "work.jpg";
				} else {
					if(category === "Other"){
						catImage = "other.png";
					}
				}
			}
		}

		//add image
		var newP = document.createElement("p");
		var newImg = document.createElement("IMG");
		newImg.setAttribute("src", "images/" + catImage);
		newP.appendChild(newImg);

		//delete single item link
		var deleteLink = document.createElement("a");
		var setHref = deleteLink.setAttribute("href", "#");
		var setOnclick = deleteLink.setAttribute("onclick", "deleteItem(" + key + ");");
		var deleteText = document.createTextNode("delete item");
		deleteLink.appendChild(deleteText);
		newP.appendChild(deleteLink);

		//edit single item link
		var editLink = document.createElement("a");
		var setHref = editLink.setAttribute("href", "#");
		var setOnclick = editLink.setAttribute("onclick", "editItem(" + key + ");");
		var editText = document.createTextNode("edit item");
		editLink.appendChild(editText);
		newP.appendChild(editLink);
		getListdiv.appendChild(newP);
		}
	}
	
function saveData(id){	
	var event 		= document.getElementById('event').value;
	var category 	= document.getElementById('category').value;
	var date 		= document.getElementById('date').value;
	var notes	 	= document.getElementById('notes').value;
	
	var d = new Date();
    var key= (d.getTime());
    
   	
	var allItems = [
			category,
			event,
			date,
			notes
		];
		
	db.setItem(key, allItems.join(';'));
	
	}

function editItem(id){
	var value = db.getItem(id);
	var itemId = id;
	
	value = value.split(';');
	var category = value[0];
	var event = value[1];
	var date = value[2];
	var notes = value[3];
	
	//populates form fields with current localStorage values
	document.getElementById('category').value = category;
	document.getElementById('event').value = event;
	document.getElementById('date').value = date;
	document.getElementById('notes').value = notes;
	
	// reveal the editItem button
	var editItem = document.getElementById('editItem');
	editItem.style.display = "block";
	var submit = document.getElementById('submit');
	submit.style.display = "none";
	
	var editItemBtn = document.getElementById('editItem');
	// capture editItem button's click
	editItemBtn.onclick = function () {
		var category = document.getElementById('category').value;
		var event = document.getElementById('event').value;
		var date = document.getElementById('date').value;
		var notes = document.getElementById('notes').value;
		
		var allItems = [
			category,
			event,
			date,
			notes
		];
		if (event !== ""){
			db.setItem(itemId, allItems.join(';'));
			location.reload();
		}else{
			alert("Atleast an Event Title is required.");
		}
	};
}

function deleteItem(id){
	var ask = confirm("Are you sure?");
		if(ask){
			db.removeItem(id);
			window.location.reload();
		}else{
			alert("Item not removed.");
		}
}

function clearLocal(){
	db.clear();
	return false;
}

function addOption(selectbox,text,value)
{
	var optn = document.createElement("OPTION");
		optn.text = text;
		optn.value = value;
		selectbox.options.add(optn);
}

// Category list
function addOption_list(selectbox){
	var forList = new Array("Home","School","Work","Other");
		for (var i=0; i < forList.length;++i){

	addOption(document.addItem.category_list, forList[i], forList[i]);
		}
}

function validateForm(){
	var getEvent = document.forms[0].event.value;
	if (getEvent === ""){
		document.getElementById('event').style.border = "1px solid red";
		var encourage = prompt("Event Title, please.", "");
		if(encourage !== null && encourage !== ""){
			document.forms[0].event.value = encourage;
		}
		return false;
	} else {
		document.getElementById('event').style.border = "1px solid #ccc";
	}
	
		saveData();
		alert("Form Submitted!");

		

}



		