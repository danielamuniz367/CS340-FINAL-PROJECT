// script.js for workout DB app

function readyPage() 
{
  document.getElementById('viewStudents').onclick = insertStudents;
  document.getElementById('viewStaff').onclick = insertStaff;
  document.getElementById('viewPets').onclick = insertPets;
  document.getElementById('viewClasses').onclick = insertClasses;
};
window.onload = readyPage;

var insertStudents = function()
{
	document.getElementById("students-handlebars-insert").innerHTML = '';
	document.getElementById("students-edit-template").innerHTML = '';
	document.getElementById("staff-handlebars-insert").innerHTML = '';
	document.getElementById("staff-edit-template").innerHTML = '';
	document.getElementById("pets-handlebars-insert").innerHTML = '';
	document.getElementById("pets-edit-template").innerHTML = '';
	document.getElementById("classes-handlebars-insert").innerHTML = '';
	document.getElementById("classes-edit-template").innerHTML = '';
	getStudents(loadHandlebarsStudents);
}

var insertStaff = function()
{
	document.getElementById("students-handlebars-insert").innerHTML = '';
	document.getElementById("students-edit-template").innerHTML = '';
	document.getElementById("staff-handlebars-insert").innerHTML = '';
	document.getElementById("staff-edit-template").innerHTML = '';
	document.getElementById("pets-handlebars-insert").innerHTML = '';
	document.getElementById("pets-edit-template").innerHTML = '';
	document.getElementById("classes-handlebars-insert").innerHTML = '';
	document.getElementById("classes-edit-template").innerHTML = '';
	getStaff(loadHandlebarsStaff);
}

var insertPets = function()
{
	document.getElementById("students-handlebars-insert").innerHTML = '';
	document.getElementById("students-edit-template").innerHTML = '';
	document.getElementById("staff-handlebars-insert").innerHTML = '';
	document.getElementById("staff-edit-template").innerHTML = '';
	document.getElementById("pets-handlebars-insert").innerHTML = '';
	document.getElementById("pets-edit-template").innerHTML = '';
	document.getElementById("classes-handlebars-insert").innerHTML = '';
	document.getElementById("classes-edit-template").innerHTML = '';
	getPets(loadHandlebarsPets);
}

var insertClasses = function()
{
	document.getElementById("students-handlebars-insert").innerHTML = '';
	document.getElementById("students-edit-template").innerHTML = '';
	document.getElementById("staff-handlebars-insert").innerHTML = '';
	document.getElementById("staff-edit-template").innerHTML = '';
	document.getElementById("pets-handlebars-insert").innerHTML = '';
	document.getElementById("pets-edit-template").innerHTML = '';
	document.getElementById("classes-handlebars-insert").innerHTML = '';
	document.getElementById("classes-edit-template").innerHTML = '';
	getClasses(loadHandlebarsClasses);
}

var loadHandlebarsStudents = function(data) 
{
  var studentsData = formatData(JSON.parse(data));
  var blankTemplate = studentsHandlebarsTemplate;
  var compiledTemplate = Handlebars.compile(blankTemplate);
  var loadedTemplate = compiledTemplate(studentsData);
  document.getElementById("students-handlebars-insert").innerHTML = loadedTemplate;
  document.getElementById("addRowStudents").onclick = addRowStudents;
}

var loadHandlebarsStaff = function(data) 
{
  var staffData = formatData(JSON.parse(data));
  var blankTemplate = staffHandlebarsTemplate;
  var compiledTemplate = Handlebars.compile(blankTemplate);
  var loadedTemplate = compiledTemplate(staffData);
  document.getElementById("staff-handlebars-insert").innerHTML = loadedTemplate;
  document.getElementById("addRowStaff").onclick = addRowStaff;
}

var loadHandlebarsPets = function(data) 
{
  var petsData = formatData(JSON.parse(data));
  var blankTemplate = petsHandlebarsTemplate;
  var compiledTemplate = Handlebars.compile(blankTemplate);
  var loadedTemplate = compiledTemplate(petsData);
  document.getElementById("pets-handlebars-insert").innerHTML = loadedTemplate;
  document.getElementById("addRowPets").onclick = addRowPets;
}

var loadHandlebarsClasses = function(data) 
{
  var classesData = formatData(JSON.parse(data));
  var blankTemplate = classesHandlebarsTemplate;
  var compiledTemplate = Handlebars.compile(blankTemplate);
  var loadedTemplate = compiledTemplate(classesData);
  document.getElementById("classes-handlebars-insert").innerHTML = loadedTemplate;
  document.getElementById("addRowClasses").onclick = addRowClasses;
}

// format date and display kgs or lbs

var formatData = function(data) 
{
	data.rows.forEach(function(row) 
	{
	if(row.house_id === 1) row.house_id = "Gryffindor";
	else if(row.house_id === 2) row.house_id = "Hufflepuff";
	else if(row.house_id === 3) row.house_id = "Ravenclaw";
	else if(row.house_id === 4) row.house_id = "Slytherin";
	else row.house_id = "Unsorted";
	})

	return data;
}

var addRowStudents = function() 
{
	var studentsFormData = 
	{
	'fname': document.getElementById('postStudentsFname').value,
	'lname': document.getElementById('postStudentsLname').value,
	'type': document.getElementById('postStudentsType').value,
	'class_year': document.getElementById('postStudentsClass_year').value,
	'house_id': document.getElementById('postStudentsHouse_id').value,
	}
	postStudents(studentsFormData, loadHandlebarsStudents);
}

var addRowStaff = function() 
{
	var staffFormData = 
	{
	'fname': document.getElementById('postStaffFname').value,
	'lname': document.getElementById('postStaffLname').value,
	'type': document.getElementById('postStaffType').value,
	'role': document.getElementById('postStaffRole').value,
	'house_id': document.getElementById('postStaffHouse_id').value,
	}
	postStaff(staffFormData, loadHandlebarsStaff);
}

var addRowPets = function() 
{
	var petsFormData = 
	{
	'name': document.getElementById('postPetsName').value,
	'species': document.getElementById('postPetsSpecies').value,
	}
	postPets(petsFormData, loadHandlebarsPets);
}

var addRowClasses = function() 
{
	var classesFormData = 
	{
	'class_name': document.getElementById('postClassesName').value,
	'instructor_id': document.getElementById('postClassesInstructor_id').value,
	}
	postClasses(classesFormData, loadHandlebarsClasses);
}


var editRowStudents = function() 
{
	var studentsFormData = 
	{
	'id': document.getElementById('editStudentsId').value,
	'fname': document.getElementById('editStudentsFname').value,
	'lname': document.getElementById('editStudentsLname').value,
	'type': document.getElementById('editStudentsType').value,
	'class_year': document.getElementById('editStudentsClass_year').value,
	'house_id': document.getElementById('editStudentsHouse_id').value,
	}
	putStudents(studentsFormData, loadHandlebarsStudents);
	cancelEdit();
}

var editRowStaff = function() 
{
	var staffFormData = 
	{
	'id': document.getElementById('editStaffId').value,
	'fname': document.getElementById('editStaffFname').value,
	'lname': document.getElementById('editStaffLname').value,
	'type': document.getElementById('editStaffType').value,
	'role': document.getElementById('editStaffRole').value,
	'house_id': document.getElementById('editStaffHouse_id').value,
	}
	putStaff(staffFormData, loadHandlebarsStaff);
	cancelEdit();
}

var editRowPets = function() 
{
	var petsFormData = 
	{
	'id': document.getElementById('editPetsId').value,
	'name': document.getElementById('editPetsName').value,
	'species': document.getElementById('editPetsSpecies').value,
	}
	putPets(petsFormData, loadHandlebarsPets);
	cancelEdit();
}

var editRowClasses = function() 
{
	var classesFormData = 
	{
	'id': document.getElementById('editClassesId').value,
	'class_name': document.getElementById('editClassesName').value,
	'instructor_id': document.getElementById('editClassesInstructor_id').value,
	}
	putClasses(classesFormData, loadHandlebarsClasses);
	cancelEdit();
}

var deleteRowStudents = function(data, callback) 
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
		  callback(data.target.responseText);
		};
	};
	req.open('POST', '/students/' + data, true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send();
}

var deleteRowStaff = function(data, callback) 
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
		  callback(data.target.responseText);
		};
	};
	req.open('POST', '/staff/' + data, true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send();
}

var deleteRowPets = function(data, callback) 
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
		  callback(data.target.responseText);
		};
	};
	req.open('POST', '/pets/' + data, true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send();
}

var deleteRowClasses = function(data, callback) 
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
		  callback(data.target.responseText);
		};
	};
	req.open('POST', '/classes/' + data, true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send();
}

var getStudents = function(callback) 
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
		  callback(data.target.responseText);
		};
	};
	req.open('GET', '/students/', true);
	req.send();
}

var getStaff = function(callback) 
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
		  callback(data.target.responseText);
		};
	};
	req.open('GET', '/staff/', true);
	req.send();
}

var getPets = function(callback) 
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
		  callback(data.target.responseText);
		};
	};
	req.open('GET', '/pets/', true);
	req.send();
}

var getClasses = function(callback) 
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
		  callback(data.target.responseText);
		};
	};
	req.open('GET', '/classes/', true);
	req.send();
}


var postStudents = function(data, callback) 
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
			callback(data.target.responseText);
		};
	};
	var payload = data;
	req.open('POST', '/students/', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send(JSON.stringify(payload));
}

var postStaff = function(data, callback) 
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
			callback(data.target.responseText);
		};
	};
	var payload = data;
	req.open('POST', '/staff/', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send(JSON.stringify(payload));
}

var postPets = function(data, callback) 
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
			callback(data.target.responseText);
		};
	};
	var payload = data;
	req.open('POST', '/pets/', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send(JSON.stringify(payload));
}

var postClasses = function(data, callback) 
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
			callback(data.target.responseText);
		};
	};
	var payload = data;
	req.open('POST', '/classes/', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send(JSON.stringify(payload));
}

var putStudents = function(data, callback) 
{
	callback = loadHandlebarsStudents;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
		  callback(data.target.responseText);
		};
	};
	var payload = data;
	req.open('PUT', '/students/' + data.id, true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send(JSON.stringify(payload));
}

var putStaff = function(data, callback) 
{
	callback = loadHandlebarsStaff;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
		  callback(data.target.responseText);
		};
	};
	var payload = data;
	req.open('PUT', '/staff/' + data.id, true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send(JSON.stringify(payload));
}

var putPets = function(data, callback) 
{
	callback = loadHandlebarsPets;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
		  callback(data.target.responseText);
		};
	};
	var payload = data;
	req.open('PUT', '/pets/' + data.id, true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send(JSON.stringify(payload));
}

var putClasses = function(data, callback) 
{
	callback = loadHandlebarsClasses;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(data) 
	{
		if (req.readyState == 4 && req.status == 200) 
		{
		  callback(data.target.responseText);
		};
	};
	var payload = data;
	req.open('PUT', '/classes/' + data.id, true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send(JSON.stringify(payload));
}

var insertEditFormStudents = function(rowId) 
{
	var row = document.getElementById('row' + rowId);
	var studentsEditData = 
	{
		id: rowId,
		fname: row.cells[0].textContent,
		lname: row.cells[1].textContent,
		type: row.cells[2].textContent,
		class_year: row.cells[3].textContent,
		house_id: row.cells[4].textContent,
	}
	var blankTemplate = studentsEditForm;
	var compiledTemplate = Handlebars.compile(blankTemplate);
	var loadedTemplate = compiledTemplate({studentsEditData: studentsEditData});
	document.getElementById("students-edit-template").innerHTML = loadedTemplate;
	document.getElementById("editRowStudents").onclick = editRowStudents;
	document.getElementById("cancelEdit").onclick = cancelEdit;
}

var insertEditFormStaff = function(rowId) 
{
	var row = document.getElementById('row' + rowId);
	var staffEditData = 
	{
		id: rowId,
		fname: row.cells[0].textContent,
		lname: row.cells[1].textContent,
		type: row.cells[2].textContent,
		role: row.cells[3].textContent,
		house_id: row.cells[4].textContent,
	}
	var blankTemplate = staffEditForm;
	var compiledTemplate = Handlebars.compile(blankTemplate);
	var loadedTemplate = compiledTemplate({staffEditData: staffEditData});
	document.getElementById("staff-edit-template").innerHTML = loadedTemplate;
	document.getElementById("editRowStaff").onclick = editRowStaff;
	document.getElementById("cancelEdit").onclick = cancelEdit;
}

var insertEditFormPets = function(rowId) 
{
	var row = document.getElementById('row' + rowId);
	var petsEditData = 
	{
		id: rowId,
		name: row.cells[0].textContent,
		species: row.cells[1].textContent,
	}
	var blankTemplate = petsEditForm;
	var compiledTemplate = Handlebars.compile(blankTemplate);
	var loadedTemplate = compiledTemplate({petsEditData: petsEditData});
	document.getElementById("pets-edit-template").innerHTML = loadedTemplate;
	document.getElementById("editRowPets").onclick = editRowPets;
	document.getElementById("cancelEdit").onclick = cancelEdit;
}

var insertEditFormClasses = function(rowId) 
{
	var row = document.getElementById('row' + rowId);
	var classesEditData = 
	{
		id: rowId,
		class_name: row.cells[0].textContent,
		instructor_id: row.cells[1].textContent,
	}
	var blankTemplate = classesEditForm;
	var compiledTemplate = Handlebars.compile(blankTemplate);
	var loadedTemplate = compiledTemplate({classesEditData: classesEditData});
	document.getElementById("classes-edit-template").innerHTML = loadedTemplate;
	document.getElementById("editRowClasses").onclick = editRowClasses;
	document.getElementById("cancelEdit").onclick = cancelEdit;
}

var cancelEdit = function() 
{
	document.getElementById("students-edit-template").innerHTML = '';
	document.getElementById("staff-edit-template").innerHTML = '';
	document.getElementById("pets-edit-template").innerHTML = '';
	document.getElementById("classes-edit-template").innerHTML = '';

}

var cancelAdd = function() 
{
	document.getElementById("students-add-template").innerHTML = '';
	document.getElementById("staff-add-template").innerHTML = '';
	document.getElementById("pets-add-template").innerHTML = '';
	document.getElementById("classes-add-template").innerHTML = '';
}

// handlebars format for displaying the current log entries

var studentsHandlebarsTemplate = 
	'<form method="post" action="/students/" id="postStudentsForm">'+
	'First Name: <input type="text" name="fname" id="postStudentsFname"/><br>'+
	'Last Name: <input type="text" name="lname" id="postStudentsLname"/><br>'+
	'Type: <input type="text" name="type" id="postStudentsType"/><br>'+
	'Class Year: <input type="number" name="class_year" id="postStudentsClass_year"/><br>'+
	'House: <select name="house" id="postStudentsHouse_id"/>'+
		'<option value=1>Gryffindor</option>'+
		'<option value=2>Hufflepuff</option>'+
		'<option value=3>Ravenclaw</option>'+
		'<option value=4>Slytherin</option>'+
		'<option value=5>Unsorted</option>'+
	'</select><br><br>'+
	'<input type="button" value="Add New Student" id="addRowStudents"/>'+
	'</form>'+
	'<table>'+
		'<tr>'+
		'<th id="table_name" colspan="6">Students</th>'+
		'</tr>'+
		'<tr>'+
		'<th>First Name</th>'+
		'<th>Last Name</th>'+
		'<th>Type</th>'+
		'<th>Class Year</th>'+
		'<th>House</th>'+
		'<th>Edit</th>'+
		'</tr>'+
		'{{#each rows}}'+
		  '<tr id="row{{id}}">'+
			'<form>'+
			  '<td>{{fname}}</td>'+
			  '<td>{{lname}}</td>'+
			  '<td>{{type}}</td>'+
			  '<td>{{class_year}}</td>'+
			  '<td>{{house_id}}</td>'+
			  '<td>'+
			  '<input type="button" value="edit" onclick="insertEditFormStudents({{id}})">'+
			'</form>'+
			'<form>'+
			  '<input type="button" value="delete" onclick="deleteRowStudents({{id}}, loadHandlebarsStudents)">'+
			'</form>'+
			'</td>'+
		  '</tr>'+
		'{{/each}}'+
	'</table>'

var staffHandlebarsTemplate = 
	'<form method="post" action="/staff/" id="postStaffForm">'+
	'First Name: <input type="text" name="fname" id="postStaffFname"/><br>'+
	'Last Name: <input type="text" name="lname" id="postStaffLname"/><br>'+
	'Type: <input type="text" name="type" id="postStaffType"/><br>'+
	'Role: <input type="text" name="role" id="postStaffRole"/><br>'+
	'House: <select name="house" id="postStaffHouse_id"/>'+
		'<option value=1>Gryffindor</option>'+
		'<option value=2>Hufflepuff</option>'+
		'<option value=3>Ravenclaw</option>'+
		'<option value=4>Slytherin</option>'+
		'<option value=5>Unsorted</option>'+
	'</select><br><br>'+
	'<input type="button" value="Add New Staff" id="addRowStaff"/>'+
	'</form>'+
	'<table>'+
		'<tr>'+
		'<th id="table_name" colspan="6">Staff</th>'+
		'</tr>'+
		'<tr>'+
		'<th>First Name</th>'+
		'<th>Last Name</th>'+
		'<th>Type</th>'+
		'<th>Role</th>'+
		'<th>House ID</th>'+
		'<th>Edit</th>'+
		'</tr>'+
		'{{#each rows}}'+
		  '<tr id="row{{id}}">'+
			'<form>'+
			  '<td>{{fname}}</td>'+
			  '<td>{{lname}}</td>'+
			  '<td>{{type}}</td>'+
			  '<td>{{role}}</td>'+
			  '<td>{{house_id}}</td>'+
			  '<td>'+
			  '<input type="button" value="edit" onclick="insertEditFormStaff({{id}})">'+
			'</form>'+
			'<form>'+
			  '<input type="button" value="delete" onclick="deleteRowStaff({{id}}, loadHandlebarsStaff)">'+
			'</form>'+
			'</td>'+
		  '</tr>'+
		'{{/each}}'+
	'</table>'
	
var petsHandlebarsTemplate = 
	'<form method="post" action="/pets/" id="postPetsForm">'+
	'Name: <input type="text" name="fname" id="postPetsName"/><br>'+
	'Species: <input type="text" name="species" id="postPetsSpecies"/><br><br>'+
	'<input type="button" value="Add New Pet" id="addRowPets"/>'+
	'</form>'+
	'<table>'+
		'<tr>'+
		'<th id="table_name" colspan="6">Pets</th>'+
		'</tr>'+
		'<tr>'+
		'<th>Name</th>'+
		'<th>Species</th>'+
		'<th>Edit</th>'+
		'</tr>'+
		'{{#each rows}}'+
		  '<tr id="row{{id}}">'+
			'<form>'+
			  '<td>{{name}}</td>'+
			  '<td>{{species}}</td>'+
			  '<td>'+
			  '<input type="button" value="edit" onclick="insertEditFormPets({{id}})">'+
			'</form>'+
			'<form>'+
			  '<input type="button" value="delete" onclick="deleteRowPets({{id}}, loadHandlebarsPets)">'+
			'</form>'+
			'</td>'+
		  '</tr>'+
		'{{/each}}'+
	'</table>'	

var classesHandlebarsTemplate = 
	'<form method="post" action="/classes/" id="postClassesForm">'+
	'Class Name: <input type="text" name="class_name" id="postClassesName"/><br>'+
	'Instructor: <select name="instructor" id="postClassesInstructor_id"/>'+
		'{{#each rows}}'+
		'<option value={{instructor_id}}>{{lname}}</option>'+
		'{{/each}}'+
	'</select><br><br>'+
	'<input type="button" value="Add New Class" id="addRowPets"/><br><br>'+
	'</form>'+
	'<table>'+
		'<tr>'+
		'<th id="table_name" colspan="6">Classes</th>'+
		'</tr>'+
		'<tr>'+
		'<th>Class Name</th>'+
		'<th>Instructor</th>'+
		'<th>Edit</th>'+
		'</tr>'+
		'{{#each rows}}'+
		  '<tr id="row{{id}}">'+
			'<form>'+
			  '<td>{{class_name}}</td>'+
			  '<td>{{lname}}</td>'+
			  '<td>'+
			  '<input type="button" value="edit" onclick="insertEditFormClasses({{id}})">'+
			'</form>'+
			'<form>'+
			  '<input type="button" value="delete" onclick="deleteRowClasses({{id}}, loadHandlebarsClasses)">'+
			'</form>'+
			'</td>'+
		  '</tr>'+
		'{{/each}}'+
	'</table>'	

// handlebars format to display when user wants to edit entry

var studentsEditForm = 
	'<h4>Edit Selected Student: </h4>'+
	'<form method="post" action="/students/" id="studentsEditForm">'+
    'First Name: <input type="text" name="fname" value="{{studentsEditData.fname}}" id="editStudentsFname"/><br>'+
    'Last Name: <input type="text" name="lname" value="{{studentsEditData.lname}}" id="editStudentsLname"/><br>'+
    'Type: <input type="text" name="type" value="{{studentsEditData.type}}" id="editStudentsType"/><br>'+
    'Class Year: <input type="number" name="class_year" value="{{studentsEditData.class_year}}" id="editStudentsClass_year"/><br>'+
    'House? <select name="house_id" id="editStudentsHouse_id"/>'+
      '<option value=1>Gryffindor</option>'+
      '<option value=2>Hufflepuff</option>'+
	  '<option value=3>Ravenclaw</option>'+
      '<option value=4>Slytherin</option>'+
	  '<option value=5>Unsorted</option>'+
    '</select><br>'+
    '<input type="hidden" name="id" value="{{studentsEditData.id}}" id="editStudentsId"/><br>'+
    '<input type="button" value="Edit Row" id="editRowStudents" />'+
    '<input type="button" value="Cancel" id="cancelEdit" />'+
'</form>'

var staffEditForm = 
	'<h4>Edit Selected Staff: </h4>'+
	'<form method="post" action="/staff/" id="staffEditForm">'+
    'First Name: <input type="text" name="fname" value="{{staffEditData.fname}}" id="editStaffFname"/><br>'+
    'Last Name: <input type="text" name="lname" value="{{staffEditData.lname}}" id="editStaffLname"/><br>'+
    'Type: <input type="text" name="type" value="{{staffEditData.type}}" id="editStaffType"/><br>'+    
	'Role: <input type="text" name="role" value="{{staffEditData.role}}" id="editStaffRole"/><br>'+
	'House? <select name="house_id" id="editStaffHouse_id"/>'+
      '<option value=1>Gryffindor</option>'+
      '<option value=2>Hufflepuff</option>'+
	  '<option value=3>Ravenclaw</option>'+
      '<option value=4>Slytherin</option>'+
	  '<option value=5>Unsorted</option>'+
    '</select><br>'+
    '<input type="hidden" name="id" value="{{staffEditData.id}}" id="editStaffId"/><br>'+
    '<input type="button" value="Edit Row" id="editRowStaff" />'+
    '<input type="button" value="Cancel" id="cancelEdit" />'+
'</form>'

var petsEditForm = 
	'<h4>Edit Selected Pet: </h4>'+
	'<form method="post" action="/pets/" id="petsEditForm">'+
    'Name: <input type="text" name="name" value="{{petsEditData.name}}" id="editPetsName"/><br>'+
    'Species: <input type="text" name="species" value="{{petsEditData.species}}" id="editPetsSpecies"/><br>'+
    '<input type="hidden" name="id" value="{{petsEditData.id}}" id="editPetsId"/><br>'+
    '<input type="button" value="Edit Row" id="editRowPets" />'+
    '<input type="button" value="Cancel" id="cancelEdit" />'+
'</form>'

var classesEditForm = 
	'<h4>Edit Selected Class: </h4>'+
	'<form method="post" action="/classes/" id="classesEditForm">'+
    'Name: <input type="text" name="class_name" value="{{classesEditData.class_name}}" id="editClassesName"/><br>'+
    'Instructor: <input type="text" name="instructor" value="{{classesEditData.instructor_id}}" id="editClassesInstructor_id"/><br>'+
    '<input type="hidden" name="id" value="{{classesEditData.id}}" id="editClassesId"/><br>'+
    '<input type="button" value="Edit Class" id="editRowClasses" />'+
    '<input type="button" value="Cancel" id="cancelEdit" />'+
'</form>'

// handlebars display to add an entry

var studentsAddForm =
	'<h4>Add New Student: </h4>'+
	'<form method="post" action="/students/" id="studentsAddForm">'+
    'First Name: <input type="text" name="fname" id="addStudentsFname"/><br>'+
    'Last Name: <input type="text" name="lname" id="addStudentsLname"/><br>'+
    'Type: <input type="text" name="type" id="addStudentsType"/><br>'+
    'Class Year: <input type="number" name="class_year" id="addStudentsClass_year"/><br>'+
    'House? <select name="house_id" id="addStudentsHouse_id"/>'+
      '<option value=1>Gryffindor</option>'+
      '<option value=2>Hufflepuff</option>'+
	  '<option value=3>Ravenclaw</option>'+
      '<option value=4>Slytherin</option>'+
	  '<option value=5>Unsorted</option>'+
    '</select><br>'+
    '<input type="button" value="Add Student" id="addRowStudents" />'+
    '<input type="button" value="Cancel" id="cancelAdd" />'+
'</form>'

var staffAddForm =
	'<h4>Add New Staff: </h4>'+
	'<form method="post" action="/staff/" id="staffAddForm">'+
    'First Name: <input type="text" name="fname" id="addStaffFname"/><br>'+
    'Last Name: <input type="text" name="lname" id="addStaffLname"/><br>'+
    'Type: <input type="text" name="type" id="addStaffType"/><br>'+
    'Role: <input type="number" name="class_year" id="addStaffRole"/><br>'+
    'House? <select name="house_id" id="addStaffHouse_id"/>'+
      '<option value=1>Gryffindor</option>'+
      '<option value=2>Hufflepuff</option>'+
	  '<option value=3>Ravenclaw</option>'+
      '<option value=4>Slytherin</option>'+
	  '<option value=5>Unsorted</option>'+
    '</select><br>'+
    '<input type="button" value="Add Staff" id="addRowStaff" />'+
    '<input type="button" value="Cancel" id="cancelAdd" />'+
'</form>'

var petsAddForm =
	'<h4>Add New Pet: </h4>'+
	'<form method="post" action="/pets/" id="petsAddForm">'+
    'Name: <input type="text" name="fname" id="addPetsName"/><br>'+
    'Species: <input type="text" name="lname" id="addPetsSpecies"/><br>'+
    '<input type="button" value="Add Pet" id="addRowPets" />'+
    '<input type="button" value="Cancel" id="cancelAdd" />'+
'</form>'

var classesAddForm =
	'<h4>Add New Class: </h4>'+
	'<form method="post" action="/classes/" id="classesAddForm">'+
    'Name: <input type="text" name="class_name" id="addClassesName"/><br>'+
    'Species: <input type="text" name="instructor_id" id="addClassesInstructor_id"/><br>'+
    '<input type="button" value="Add Class" id="addRowClasses" />'+
    '<input type="button" value="Cancel" id="cancelAdd" />'+
'</form>'

