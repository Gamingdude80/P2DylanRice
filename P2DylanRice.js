let calendar,health,weather,news;
let capture,mic,facebook,twitter,pfp;

const weekdays = ["Sunday","Monday","Tuesday","Wednesday",
                  "Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];

function setup() {
  createCanvas(1280, 720);
  noStroke();
  textAlign(CENTER);

  //Get data from files
  getSchedule("calendar.json");
  getWeather("weather.json");
  getHealth("health.json");
  getNews("news.json");

  //Initialize camera
  capture = createCapture(VIDEO);
  capture.size(1280,720);
  capture.hide();

  mic = loadImage("./microphone.png");
  facebook = loadImage("./facebook.png");
  twitter = loadImage("./twitter.png");
  pfp =loadImage("./pfp.png");
}

function draw() {
  while(weather == undefined || 
    health == undefined || calendar == undefined)
    return;
  background(173,216,230);
  let date = new Date();
  let day = date.getDay();
  let small = 175,large = 390,medium = 240;
  let width = 300;
  let transparency = 170;
  let smooth = 20;

  //Webcam for mirror. Flips to be mirror like
  translate(1280,0);
  scale(-1,1);
  image(capture, 0, 0,1280,720);
  translate(1280,0);
  scale(-1,1);

  //Initial block background
  fill(255,255,255,transparency);
  rect(450,30,380,120,smooth);

  //Time block
  fill(0);
  textSize(50);
  let minute = date.getMinutes();
  let hour = date.getHours();
  let sec = date.getSeconds();
  let ampm = "AM";
  if(minute < 10)
    minute = "0"+minute;
  if(hour > 12){
    hour -= 12
    ampm = "PM"
  }
  if(sec < 10)
    sec = "0"+sec;
  text(hour + ":" + minute + ":" + sec + " " + ampm,640,72);

  //Weather data
  fill(0);
  textSize(30);
  text(weather[day].Condition + "   " + weather[day].Current 
        + char(176) + "C   H: "+ weather[day].High + char(176) 
        + "  L: " + weather[day].Low + char(176),640,110);

  //Session time
  fill(0);
  textSize(20);
  let start = millis()/1000;
  let inc = "seconds";
  if(start > 59){
    start /= 60
    if(start > 1 && start < 2)
      inc = "minutes"
    else
      inc = "minute"
  }
  text("Session Time: " + int(start) + " " + inc,640,140);

  //Calendar block
  fill(255,255,255,transparency);
  rect(950,30,width,medium,smooth);
  minimizers(1250, 35);
  fill(0);
  textSize(30);
  text(months[date.getMonth()] + " " + date.getDate()+ ", " 
        + date.getFullYear(),1100,70);
  displayTODO(calendar[weekdays[day]], 965, 90);
  drawLine(970, 80, 1230, 80);

  //News block
  fill(255,255,255,transparency);
  rect(950,300,width,large,smooth);
  minimizers(1250, 305);
  fill(0);
  text("News for Today",1100,330);
  displayNews(news, 965, 350);
  drawLine(970, 341, 1230, 341);

  //Health block
  textAlign(LEFT);
  fill(255,255,255,transparency);
  rect(30,30,width,medium,smooth);
  minimizers(330, 35);
  fill(0);
  text("Sleep time:",40,70);
  text("Weight:",40,105);

  drawLine(40,115,320,115);
  textSize(25);
  text("Walk:",45,185);
  text("Run:",45,215);
  text("Jog:",45,245);
  displayHealth(day,315, 70);
  textSize(30);
  textAlign(CENTER);
  text("Exercises",170,150);

  //Message block
  fill(255,255,255,transparency);
  rect(30,300,width,small,smooth);
  minimizers(330, 305);
  displayMessages(40,330);

  //Media block
  fill(255,255,255,transparency);
  rect(30,515,width,small,smooth);
  minimizers(330, 520);
  displaySocials(60,515);
}


//Extra functions for displaying drawn items
function drawLine(x1,y1,x2,y2){
  stroke(10);
  line(x1,y1,x2,y2);
  noStroke();
}

function minimizers(x,y){
  fill(255);
  stroke(10);
  circle(x,y,20);
  line(x-5,y,x+5,y);
  noStroke();
}

function calendarGrid(x,y){
  fill(0);
  stroke(10);
  for(let z = 0;z < 6;z++){
    line(x,y+(z*30),x+280,y+(z*30));
  }
  for(let z = 0;z < 8;z++){
    line(x+(z*40),y,x+(z*40),y+150);
  }
  noStroke();
}


//Set of display function for the individual UI elements
function displayTODO(list,x,y){
  textSize(20);
  textAlign(LEFT);
  let tempStr = ""
  if(list.length > 0 && list.length <= 7){
    for(let z = 0;z < list.length;z++){
      tempStr += list[z] + "\n";
      text(z+1 +".",x,y+16+(z*25))
    }
    text(tempStr,x+20,y,280);
    textAlign(CENTER);
  }
  else if(list.length > 7){
    textAlign(CENTER);
    text("Too many tasks to display.",x,y,280);
  }
  else{
    textAlign(CENTER);
    text("No tasks for today.",x,y,280);
  }
  textSize(30);
}

function displayHealth(day,x,y){
  textAlign(RIGHT);
  let times = health[day];
  text(times.Sleep+" Hours",x,y);
  text(times.Weight+" lbs.",x,y+35);
  text(times.Exercises[0].Walking+" Min.",x,y+115);
  text(times.Exercises[0].Running+" Min.",x,y+145);
  text(times.Exercises[0].Jogging+" Min.",x,y+175);
  textAlign(CENTER);
}

function displayNews(list,x,y){
  textSize(20);
  textAlign(LEFT);
  let tempStr = ""
  for(let z = 0;z < list.length;z++){
    tempStr += list[z] + "\n\n";
  }
  text(tempStr,x,y,290);
  textAlign(CENTER);
  textSize(30);
}

function displayMessages(x,y){
  let ratio = 15;
  textAlign(LEFT);
  stroke(10);
  fill(255);
  rect(x,y+20,185,40,20);
  rect(x+70,y+70,210,40,20);
  noStroke();
  fill(0);
  text("\u{02190}",x,y);
  text("Dad",x*2,y+2);
  drawLine(x, y+10, x+280, y+10);
  textSize(20);
  text("On my way home.",x+10,y+46)
  text("I'll be waiting outside!",x+80,y+96)
  textAlign(CENTER);
  image(mic,x+215,y-27,mic.width/ratio,mic.height/ratio);
}

function displaySocials(x,y){
  let ratioT = 50;
  let ratioF = 17;
  let ratioP = 54;
  let boxX = 0,boxY = 20;
  drawLine(x+30, y, x+30, y+175);
  stroke(10);
  rect(x+95+boxX,y+20+boxY,150,120)
  noStroke();
  fill(0);
  textAlign(LEFT);
  textSize(17);
  text("Today I went down to Ediya and got myself a hot chocolate. "+
        "Oh how I love winter!",x+100+boxX,y+27+boxY,146);
  text("WinterWonderLover",x+95+boxX,y+10+boxY);
  textAlign(CENTER);
  fill(255,0,0);
  circle(x,y+31,50);
  image(twitter,x-38,y+10,twitter.width/ratioT,twitter.height/ratioT);
  image(facebook,x-22,y+62,facebook.width/ratioF,facebook.height/ratioF);
  image(pfp,x+40,y+10,pfp.width/ratioP,pfp.height/ratioP);
}


//Set of functions for accessing the JSON files and their stored contents
async function getSchedule(filename){
  const response = await fetch("./"+filename);
  let data = await response.json();
  let days = {};
  for(let x = 0;x < 7;x++){
    days[weekdays[x]] = data[weekdays[x]]
  }
  console.log(days);
  calendar = days;
}
async function getWeather(filename){
  const response = await fetch("./"+filename);
  let data = await response.json();
  let days = [];
  for(let x = 0;x < 7;x++){
    days.push(data.forecasts[x]);
  }
  console.log(days);
  weather = days;
}
async function getHealth(filename){
  const response = await fetch("./"+filename);
  let data = await response.json();
  let days = [];
  for(let x = 0;x < 7;x++){
    days.push(data.health[x]);
  }
  console.log(days);
  health = days;
}
async function getNews(filename){
  const response = await fetch("./"+filename);
  let data = await response.json();
  console.log(data.Headlines);
  news = data.Headlines;
}