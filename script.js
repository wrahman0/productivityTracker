/*Future implementations:
	
	Continue From:
	- Add settings icon
	- Default case when there is no data to graph. Print something on the canvas to convey the msg to the end user.

	High cost tasks:
	-implement feature for graph of every subject
	-Automatic Time Tracking
	-[DONE]Allow decimal entries for the hours
	-[DONE]dynamic scaling 


*/
//Put inside a function that exe in the start

var nameArray = ['January','February','March','April','May','June','July','August','September','October','November','December'];

window.addEventListener("load",fillupStorage);

var i, j;
var d   = new Date();
var items = 0;
var i   = 0;
var d   = new Date();
var jan = new Object();
var feb = new Object();
var mar = new Object();
var apr = new Object();
var may = new Object();
var jun = new Object();
var jul = new Object();
var aug = new Object();
var sep = new Object();
var oct = new Object();
var nov = new Object();
var dec = new Object();
var monthArray = [jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec];

function fillupStorage(){

	if (localStorage.getItem('monthArray') === null){

		for (i = 0; i < monthArray.length; i++){
			switch (i+1){
				case 1: case 3: case 5: case 7: case 8: case 10: case 12:
					monthArray[i].days = 31;
					monthArray[i].dailyHrs = new Array(31);
					break;
				case 4: case 6: case 9: case 11:
					monthArray[i].days = 30;
					monthArray[i].dailyHrs = new Array(30);
					break;
				case 2:
					if (!d.getFullYear()%400) {monthArray[i].days = 29;monthArray[i].dailyHrs = new Array(29)}
					else if (!d.getFullYear()%100) {monthArray[i].days = 28;monthArray[i].dailyHrs = new Array(28)}
					else if (!d.getFullYear()%4) {monthArray[i].days = 29;monthArray[i].dailyHrs = new Array(29)}
					else {monthArray[i].days = 28;monthArray[i].dailyHrs = new Array(28)}
					break;
				default:
					console.log("Year exception");
					break;
			}
		}

		//initial values of dailyHrs to zero;
		for (i = 0; i < monthArray.length; i++){
			for (j = 0; j < monthArray[i].dailyHrs.length; j++)
				monthArray[i].dailyHrs[j]=0;
		}

		for (i = 0; i < monthArray.length; i++){
			monthArray[i].name = nameArray[i];
		}
		localStorage['monthArray'] = JSON.stringify(monthArray);
	}
	var ctx = document.getElementById('mainCanvas').getContext('2d');
	init(ctx);
}


//General Variables
var height = 320;
var width  = 640;
var xinit  = 60;
var yinit  = 120;
var dashLen = 10;
var ySetInt = 2;
var xSetInt = 7;
var markers = [];
var radius = 5;
var gridColor = '#B4CAC4';

//Tooltip variables
var toolTipH = 150;
var toolTipW = 200;
var toolTipOffsetX = 25;
var toolTipOffsetY = 0;
var edgePadding = 25;
var toolTipPresent = new Boolean(false);
var toolTipTitleColor = 'black';
var toolTipInfoColor = 'black';
var toolTipBgColor = 'rgba(130,182,255,0.8)';


intervalTickCount = 5;
maxIntervalValue = Math.ceil(getMax(JSON.parse(localStorage.getItem('monthArray'))[d.getMonth()].dailyHrs));

while (maxIntervalValue%intervalTickCount != 0)maxIntervalValue++;
var intervalPixel = height/maxIntervalValue;

function init(ctx){

	//Rendering components
	renderGraph(ctx, d.getMonth(),'#1D568E');
	renderDisplay(ctx);

	// var ctx = document.getElementById('mainCanvas').getContext('2d');
	var text = document.getElementById("entryField");
	var button = document.getElementById("buttonOne");
	var clearEntireStrg = document.getElementById("clearStorage");

	//EventListners
	ctx.canvas.addEventListener('mousemove', mouseDetection);
	text.addEventListener("click", clearTxt);
	button.addEventListener("click", validateInput);
	clearEntireStrg.addEventListener("click", clearAll);

	$('.exitIcon').click(function(e){
		
		var hours = document.querySelector('.loggedHours').value;
		var course = document.querySelector('.course').value;
		var prod = document.querySelector('.prod').value;

		if (!isNaN(hours) && course != 'Course' && prod != 'Productivity'){	
			enterHrToDB (hours);
			$(this).closest('section').remove();
			localStorage.removeItem(this.id); 
			items--;
		}else{
			alert("FILL OUT THE FIELDS");
		}
	});
}

function renderAssets (ctx) {

	// //Rendering settingsImg icon
	// var settingsImg = new Image();
	// settingsImg.src = 'assets/icons/settings.png';
	// console.log(settingsImg.naturalHeight);
	// // settingsImg.onload = function(){ 
	// // 	ctx.drawImage(settingsImg, ctx.canvas.width - settingsImg.naturalWidth, yinit - 15,50, 50*(settingsImg.naturalHeight/settingsImg.naturalWidth));
	// // }
	// settingsImg.addEventListener('click', settingsPrompt);
	
}

function renderTextToolTip(i, ctx, tx, ty){

	var rightMargin = tx + edgePadding;
	var toolTipLineSpacing = 5;
	var titleTextHeight = 14;
	
	//Tooltip title
	ctx.font = titleTextHeight + "px sans-serif";
	ctx.fillStyle = toolTipTitleColor;
	ctx.fillText ("Summary for " + markers[i].month + " " + markers[i].day, rightMargin, ty + edgePadding);
	
	//Tooltip info

	//Total Hours
	ctx.font = "10px sans-serif";
	ctx.fillStyle = toolTipInfoColor;
	ctx.fillText ("Total Hours: "+ markers[i].totalHrs, rightMargin, edgePadding+ty+titleTextHeight+toolTipLineSpacing);
	
	//TODO:Hours away from goal:

}

function renderTooltip(i,ctx){

	//Drawing to the right
	var tx = markers[i].xpos+toolTipOffsetX;
	var ty = markers[i].ypos;	

	//Case: the right side is free
	if ( markers[i].xpos+toolTipOffsetX+edgePadding <= ctx.canvas.width && markers[i].ypos+edgePadding+toolTipH <= ctx.canvas.height ){
		ctx.fillStyle = toolTipBgColor;
		ctx.fillRect(markers[i].xpos+toolTipOffsetX, markers[i].ypos,toolTipW,toolTipH);
		//console.log(tx + " " + ty);
		renderTextToolTip(i, ctx, tx, ty);
	}else{ //Default
		console.log("exception");
	}

}

function mouseDetection (event){

	var ctx = document.getElementById('mainCanvas').getContext('2d');
	var mX = event.clientX - ctx.canvas.offsetLeft;
	var mY = event.clientY - ctx.canvas.offsetTop;
	var cW = ctx.canvas.width;
	var cH = ctx.canvas.height;
	var speed = 2;
	var offsetFromMarker = 20;
	ctx.fillStyle = 'red';
	var xInc,yInc;

	// console.log("mouseX: " + mX + " mouseY: " + mY);

	if (toolTipPresent){
		ctx.clearRect(0,0,cW,cH);
		renderGraph(ctx, d.getMonth(),'#1D568E');
	}

	//checking to see if the mouse is on any of the markers
	for (var i = 0; i < markers.length; i++){
		if (mX < markers[i].xpos+radius && mX > markers[i].xpos-radius && mY < markers[i].ypos+radius && mY > markers[i].ypos-radius){
			renderTooltip(i,ctx);
			toolTipPresent = true;
		}
	}
}

function daysInMonth(month,year) {
	return new Date(year, month, 0).getDate();
}

function getMax(arrayToPlot){
	var max = 0;
	for (var i = 1; i < arrayToPlot.length; i++)
		if (arrayToPlot[i] > arrayToPlot[max]) max = i;
	return arrayToPlot[max];
}


function renderGrid(ctx){

	var canvas = document.getElementById('mainCanvas');
	var ctx = canvas.getContext('2d');
	var days = JSON.parse(localStorage.getItem('monthArray'))[d.getMonth()].dailyHrs.length;
	ctx.strokeStyle = gridColor;
	ctx.lineWidth = 1;
	
	//Horizontal lines
	for (var i = 1; i <= maxIntervalValue; i++){
		ctx.beginPath();
		ctx.moveTo(xinit, yinit+height-i*(height/maxIntervalValue));
		ctx.lineTo(xinit+width, yinit+height-i*(height/maxIntervalValue));
		ctx.stroke();		
	}
	
	//Vertical lines
	for (i = 1; i <= days; i++){
		ctx.beginPath();
		ctx.moveTo(xinit+i*(width/days), yinit+height);
		ctx.lineTo(xinit+i*(width/days), yinit);
		ctx.stroke();
	}	
}

function dropMarker(x, y, month, i, arrayToPlot){

	var canvas = document.getElementById("mainCanvas");
	var ctx = canvas.getContext('2d');

	ctx.beginPath();
	ctx.arc(x,y,radius,0,2*Math.PI);
	ctx.stroke();
	ctx.fillStyle = 'rgba(121,232,136,0.5)';
	ctx.fill();	
	
	markers.push ({ 

		xpos: x,
		ypos: y,
		radius: radius,
		month: month,
		day: i+1,
		totalHrs : arrayToPlot[i]

	});

}

function buildGraph(month, color){

	var canvas = document.getElementById("mainCanvas");
	var ctx = canvas.getContext('2d');
	var arrayToPlot = JSON.parse(localStorage.getItem('monthArray'))[month].dailyHrs;
	var counter;

	height = 320;
	intervalTickCount = 5;
	width  = 640;
	
	dashLen = 10;
	ySetInt = 2;
	xSetInt = 7;

	ctx.font = "bold 12px sans-serif";
	ctx.beginPath();
	ctx.moveTo(xinit,yinit-2);
	ctx.lineTo(xinit,height+yinit);
	//(640/31)*3 adjusts the length of the x axis to ensure that there is enough room for months with days > 28
	ctx.lineTo(xinit+width+(width/28)*(arrayToPlot.length-28),height+yinit);
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.lineWidth = 3;
	ctx.fillStyle = 'black';

	//filling in the intervals

	for (counter = 0; counter <= intervalTickCount; counter++){

		ctx.beginPath();
		ctx.moveTo(xinit,yinit+height-counter*(intervalPixel*(maxIntervalValue/intervalTickCount)));
		ctx.lineTo(xinit-dashLen, yinit+height-counter*(intervalPixel*(maxIntervalValue/intervalTickCount)));
		ctx.stroke();
		ctx.fillText((maxIntervalValue/intervalTickCount)*counter, xinit-25, yinit+height-counter*(intervalPixel*(maxIntervalValue/intervalTickCount)) +5);

	}

	for (counter=0; counter <= 4; counter++){
		
		ctx.beginPath();
		ctx.moveTo(xinit+width-(width/4)*counter,height+yinit);
		ctx.lineTo(xinit+width-(width/4)*counter,height+yinit+dashLen);
		ctx.stroke();
		ctx.fillText(xSetInt*4-counter*xSetInt,xinit+width-(width/4)*counter-5,height+yinit+25);

	}
	
	//Plot title
	ctx.font = "bold small-caps 38px Arial";
	ctx.fillText(JSON.parse(localStorage.getItem('monthArray'))[month].name +" "+ d.getFullYear(), canvas.width/2 - 120, 80);

	//Call to render all the assets. The assets will be on top
	renderAssets(ctx);

}


function renderGraph(ctx, month, color){
	
	var arrayToPlot = JSON.parse(localStorage.getItem('monthArray'))[month].dailyHrs;

	//Clear whats on the graph already
	ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
	
	//Throw on a grid
	renderGrid();

	//Begin drawing
	ctx.beginPath();
	ctx.moveTo(xinit,height+yinit);
	ctx.lineTo(xinit,height+yinit-(arrayToPlot[0])*intervalPixel);

	for (var i = 1; i < d.getDate(); i++){
		ctx.lineTo(xinit+i*((width+xinit)/arrayToPlot.length),height+yinit-(arrayToPlot[i])*intervalPixel);
	}

	// ctx.lineTo(xinit+(arrayToPlot.length-1)*((width+xinit)/arrayToPlot.length), height+yinit);
	ctx.lineTo(xinit+( d.getDate()-1)*((width+xinit)/arrayToPlot.length), height+yinit); // Possible error source for the future. Check on different days	
	ctx.lineWidth=3;
	ctx.strokeStyle=color;
	ctx.fillStyle='rgba(171,185,255,0.2)';
	ctx.miterLimit=1;
	ctx.fill();
	ctx.stroke();

	//inserting the markers at each of the data points
	for (i = 0; i < arrayToPlot.length; i++){
		if (arrayToPlot[i] != 0){
			ctx.beginPath();
			dropMarker(xinit+i*((width+xinit)/arrayToPlot.length),height+yinit-(arrayToPlot[i])*intervalPixel,JSON.parse(localStorage.getItem('monthArray'))[month].name, i, arrayToPlot);
		}
	}

	buildGraph(d.getMonth(),'black');


}

function clearTxt(){
	document.getElementById("entryField").value = "";
}

function clearAll(){
	var temp = localStorage.getItem('monthArray');
	localStorage.clear();
	localStorage.setItem('monthArray', temp);
	location.reload();
}

function validateInput(){
	var text = document.getElementById("entryField");
	if (text.value === ''){
		alert("Empty field");
	}else{
		enterTaskToList(text.value);
	}
}

function renderDisplay(){
	var taskDisplay = document.getElementById("taskList");
	taskDisplay.innerHTML = '';
	for (var i = 0; i < localStorage.length; i++)
		if(localStorage.key(i).substring(0,4) == 'exit')
			taskDisplay.innerHTML += localStorage.getItem(localStorage.key(i));
}

function enterTaskToList(userInput){
	
	addToStorage = "<section class='checkListItems'>" + userInput + "<table id='optionTable'> <tr><th> <input type='text' class='loggedHours' value='Hours...' id='hours"+items+"'></th><th><select class='course' id='dropMenuCourse"+items+"'><option>Course</option><option>ECE106</option><option>ECE124</option><option>CS138</option><option>MATH119</option><option>SE102</option></select></th><th><select class='prod' id='dropMenuProductivity"+items+"'><option>Productivity</option><option>Very Productive</option><option>Productive</option><option>Not Productive</option></select></th><th><div class='exitIcon' id='exit"+items+"'>X</div></th></tr></table></section>";
	localStorage.setItem("exit"+items, addToStorage);
	items++;
	renderDisplay();

}


function enterHrToDB (hours){

	monthArray = JSON.parse(localStorage.getItem('monthArray'));
	monthArray[d.getMonth()].dailyHrs[d.getDate()-1] += parseFloat(hours);
	
	//TEST CODE	
	monthArray[d.getMonth()].dailyHrs[0] = 3;
	monthArray[d.getMonth()].dailyHrs[1] = 5;
	monthArray[d.getMonth()].dailyHrs[2] = 2; 
	//TEST CODE	

	localStorage['monthArray'] = JSON.stringify(monthArray);
	// renderGraph(ctx, d.getMonth(),'#1D568E');
	location.reload();

}
