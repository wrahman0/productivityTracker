window.addEventListener("load", init);

var global_username = false;
var global_password = false;
var global_email = false;
var global_sq = false;
var global_answer = false;

var Datastore = require('nedb'),
db = new Datastore();
function init()
{
	var username_Textbox = document.getElementById("username_input");
	var password_Textbox = document.getElementById("password_input");
	var email_Textbox = document.getElementById("email_input");
	var email_label = document.getElementById("email_label");
	var password_label = document.getElementById("password_label");
	var username_label = document.getElementById("username_label");
	email_label.innerHTML = "";
	password_label.innerHTML = "";
	username_label.innerHTML = "";
	document.getElementById("sq_label").innerHTML = "";
	document.getElementById("answer_label").innerHTML = "";
	document.getElementById("submit_label").innerHTML = "";
	//reg events
	username_Textbox.addEventListener('input', username_onchange);
	password_Textbox.addEventListener('input', password_onchange);
	email_Textbox.addEventListener('input', email_onchange);
	sq_Textbox.addEventListener('input', sq_onchange);
	answer_Textbox.addEventListener('input',answer_onchange);
	//complete
	document.getElementById("submit").addEventListener("click",signup_submit);
	console.log("initialized");
}
function signup_submit()
{
	if(global_username && global_password && global_email && global_sq && global_answer)
	{
	var user= new Object();
	user.username = document.getElementById("username_input").value;
	user.password = document.getElementById("password_input").value;
	user.email = document.getElementById("email_input").value;
	user.sq = document.getElementById("sq_Textbox").value;
	user.answer = document.getElementById("answer_Textbox").value;
	user.data = "";
	console.log("GET: USERNAME: " + user.username);
	console.log("GET: PASSWORD: " + user.password);
	console.log("GET: EMAIL: " + user.email);
	console.log("GET: SQ: " + user.sq);
	console.log("GET: ANSWER: " + user.answer);

	//insert database code here - to add user object.
	//There is a memeber of user - data, which is used to store the diagram data.
	//

	document.getElementById("submit_label").innerHTML = "Registration completed!";
	}
	else
	{
		document.getElementById("submit_label").innerHTML = "Registration failed. Please check your input!";
	}
}
function username_onchange()
{
	var str = document.getElementById("username_input").value;
	if( str.length <= 6)
	{
		global_username = false;
		document.getElementById("username_label").innerHTML = "Username length must be greater than 6 characters.";
	}
	else if(checkRepeatUsername(str))
	{
	 	global_username = false;	
		document.getElementById("username_label").innerHTML = "Username is taken. Please choose another one.";
	}
	else
	{
		global_username = true;
		document.getElementById("username_label").innerHTML = "Good to use, let's become productive!";
	}
}

function password_onchange()
{
	var str = document.getElementById("password_input").value;
	if( str.length <= 6)
	{
		global_password = false;
		document.getElementById("password_label").innerHTML = "FATAL ERROR: Password too short!(>=6 characters)";
	}
	else
	{
		global_password = true;
		document.getElementById("password_label").innerHTML = "Alright, no hacker can crack it now!";
	}
}

function email_onchange()
{
	var str = document.getElementById("email_input").value;
	var email = document.getElementById("email_label");
	if( checkRepeatEmail(str))
	{
		email.innerHTML
		email.innerHTML = "This email is taken. Please chooose another one.";
	}
	else
	{
		if(ValidateEmail(str))
		{
			global_email = true;
			email.innerHTML = "Good to go!";
		}
		else
		{
			global_email = false;
			email.innerHTML = "Incorrect email format";
		}
	}
}

function findAppearanceTime(chara,str)
{
	var a;
	var b;
	b = 0;
	a = 0;
	while(1)
	{
		b = str.indexOf(chara,b);
		if(b === str.length - 1)
		{
			a++;
			break;
		}
		if(b === -1)
			break;
		else
		{
			a++;	
			b++;
		}
	}
	return a;
}

function ValidateEmail(mail)   
{  
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
  {  
    return (true)  
  }  
    return (false)  
}  

function answer_onchange()
{
	if(document.getElementById("answer_Textbox").value === "")
	{
		global_answer = false;
		document.getElementById("answer_label").innerHTML = "Please enter your answer.";
	}
	else
	{
		global_answer = true;
		document.getElementById("answer_label").innerHTML = "That seems good!";
	}
}

function sq_onchange()
{
	if(document.getElementById("sq_Textbox").value === "")
	{
		global_sq = false;
		document.getElementById("sq_label").innerHTML = "Please enter your security question.";
	}
	else
	{
		global_sq = true;
		document.getElementById("sq_label").innerHTML = "That seems good!";
	}
}


function checkRepeatEmail(email1)
{
	//insert database check here!
	//returns true if there is a conflict
	return false;
}

function checkRepeatUsername(username1)
{
	//insert database check here!
	//returns true if there is a conflict
	return false;
}

