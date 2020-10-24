var valid = true;
function setup() {
  document.getElementById('update').addEventListener("click", handleButtonClick);
}
function validation() {
  var name = document.getElementById("display name");
  var mail = document.getElementById("e-mail");
  var phone = document.getElementById("phone");
  var zip = document.getElementById("zip");
  var password = document.getElementById("password");
  var password_confirm = document.getElementById("password confirm");
  if (!name.checkValidity()) {
    document.getElementById("nameError").innerHTML = "Please only enter letter and number";
    setTimeout(function(){document.getElementById("nameError").innerHTML = "";}, 4000);
    valid = false;
  }
  if (name.value.length > 0 && !isNaN(name.value.charAt(0))){
    document.getElementById("nameError").innerHTML = "Please start with letter";
    setTimeout(function(){document.getElementById("nameError").innerHTML = "";}, 4000);
    valid = false;
  }
  if (!mail.checkValidity()) {
    document.getElementById("mailError").innerHTML = "Please enter valid e-mail address, e.g: ascd@abc";
    setTimeout(function(){document.getElementById("mailError").innerHTML = "";}, 4000);
    valid = false;
  }
  if (!phone.checkValidity()) {
    document.getElementById("phoneError").innerHTML = "Please enter valid phone number, e.g: 123-123-1234";
    setTimeout(function(){document.getElementById("phoneError").innerHTML = "";}, 4000);
    valid = false;
  }
  if (!zip.checkValidity()) {
    document.getElementById("zipError").innerHTML = "Please enter valid zipcode, e.g: 12345";
    setTimeout(function(){document.getElementById("zipError").innerHTML = "";}, 4000);
    valid = false;
  }
  if (password.value != password_confirm.value) {
    document.getElementById("mismatch").innerHTML = "Password mismatch";
    setTimeout(function(){document.getElementById("mismatch").innerHTML = "";}, 4000);
    valid = false;
  }
}
function schedule() {
  var terms = [
	{
	  "id": 364,
	  "name": "FALL"
	},
        {
	  "id": 475,
	  "name": "SPRING"
	}
	],
	courses = [
	{
	  "listId": 364,
	  "id": 2445,
	  "title": "STAT 310"
	},
	{
	  "listId": 364,
	  "id": 5465,
	  "title": "COMP 504"
	},
	{
	  "listId": 475,
	  "id": 1470,
	  "title": "ELEC 425"
	},
        {
	  "listId": 475,
	  "id": 6453,
	  "title": "CAAM 353"
	}
	];

	return terms.map(function(term) {
	  return {
	    name: term.name,
	    courses:
	      courses.filter(function(course) {
		 return course.listId === term.id;
	      }).map(function(course) {
		return {id: course.id, title: course.title};
	      })
	   };
	});
}

console.log(schedule());
function update() {
  var name = document.getElementById("display name");
  var mail = document.getElementById("e-mail");
  var phone = document.getElementById("phone");
  var zip = document.getElementById("zip");
  var password = document.getElementById("password");
  var password_confirm = document.getElementById("password confirm");
  var oldname = document.getElementById("initial name");
  var oldmail = document.getElementById("initial e-mail");
  var oldphone = document.getElementById("initial phone");
  var oldzip = document.getElementById("initial zip");
  var oldpassword = document.getElementById("hide password");
  var oldpassword2 = document.getElementById("hide password2");
  var message = "";
  var modifier = "";
  for (var j = 0; j < password.value.length; ++j) {
     modifier += '*';
  }
  var modifier2 = "";
  for (var j = 0; j < oldpassword.innerHTML.length; ++j) {
     modifier2 += '*';
  }
  if (name.value + "<br>" != oldname.innerHTML) {
    message += "Updated name! New Value: " + name.value + "  Old Value: " + oldname.innerHTML;
  }
  if (mail.value + "<br>" != oldmail.innerHTML) {
    message += "Updated mail! New Value: " + mail.value + "  Old Value: " + oldmail.innerHTML;
  }
  if (phone.value + "<br>"!= oldphone.innerHTML) {
    message += "Updated phone number! New Value: " + phone.value + "  Old Value: " + oldphone.innerHTML;
  }
  if (zip.value + "<br>"!= oldzip.innerHTML) {
    message += "Updated zipcode! New Value: " + zip.value + "  Old Value: " + oldzip.innerHTML;
  }
  if (password.value != oldpassword.innerHTML) {
    message += "Updated password! New Value: " + modifier + "  Old Value: " + modifier2;
  }
  document.getElementById("message").innerHTML = message;
  setTimeout(function() {document.getElementById("message").innerHTML = "<br>"; }, 15000);
  document.getElementById("initial name").innerHTML = name.value + "<br>";
  document.getElementById("initial e-mail").innerHTML = mail.value + "<br>";
  document.getElementById("initial phone").innerHTML = phone.value + "<br>";
  document.getElementById("initial zip").innerHTML = zip.value + "<br>";
  document.getElementById("hide password").innerHTML = password.value;
  document.getElementById("hide password2").innerHTML = password_confirm.value;
  document.getElementById("pass").innerHTML = modifier + "<br>";
  document.getElementById("pass2").innerHTML = modifier + "<br>";
}

function handleButtonClick() {
  valid = true;
  validation();
  if (valid) {
    update()
  }
}
setup();
