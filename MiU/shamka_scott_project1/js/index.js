// Generate Browse List

	alert(catList);
	
function browseList(){

	
	// Browse Div
	var getListDiv = document.getElementById('browse');
	
	// New UL for Browse List
	var newUl = document.createElement('ul');
	
	alert(catList);
	
	// Loop through the catList and create a new browse button
	for(var i=0; i < catList.length;++i){
		var newLi = document.createElement("li");
		var itemTxt = document.createTextNode(catList[i]);
		newLi.appendChild(itemTxt);
		newUl.appendChild(newLi);
		getListDiv.appendChild(newUl);
	}
}

browseList();
