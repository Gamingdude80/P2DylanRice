let calendar,health,weather,news;
let capture,mic,facebook,twitter,pfp;
let calIcon,healthIcon,messageIcon,newsIcon,socialIcon;
let calenD = true,newsD = true,msgD = true,socD = true,healthD = true;
let firIconX = 400,firIconY = 640;
let disp1 = false,disp2 = false,disp3 = false,disp4 = false,disp5 = false;
let space = 100;

const weekdays = ["Sunday","Monday","Tuesday","Wednesday",
                  "Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];

function setup() {
  createCanvas(1280, 720);
  noStroke();
  textAlign(CENTER);

  //Get data from files
  getSchedule("data/calendar.json");
  getWeather("data/weather.json");
  getHealth("data/health.json");
  getNews("data/news.json");

  //Initialize camera
  capture = createCapture(VIDEO);
  capture.size(1280,720);
  capture.hide();

  //Load icon images
  calIcon = loadImage("./icons/calendar.png");
  healthIcon = loadImage("./icons/health.png");
  messageIcon = loadImage("./icons/message.png");
  newsIcon = loadImage("./icons/news.png");
  socialIcon = loadImage("./icons/social.png");
  mic = loadImage("./icons/microphone.png");
  facebook = loadImage("./icons/facebook.png");
  twitter = loadImage("./icons/twitter.png");
  pfp =loadImage("./icons/pfp.png");
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
  if(calenD){ 
    fill(255,255,255,transparency);
    rect(950,30,width,medium,smooth);
    minimizers(1250, 35);
    fill(0);
    textSize(30);
    text(months[date.getMonth()] + " " + date.getDate()+ ", " 
          + date.getFullYear(),1100,70);
    displayTODO(calendar[weekdays[day]], 965, 90);
    drawLine(970, 80, 1230, 80);
  }
  if(newsD){
    //News block
    fill(255,255,255,transparency);
    rect(950,300,width,large,smooth);
    minimizers(1250, 305);
    fill(0);
    textSize(30);
    text("News for Today",1100,330);
    displayNews(news[day], 965, 350);
    drawLine(970, 341, 1230, 341);
  }

  //Health block
  if(healthD){
    textAlign(LEFT);
    fill(255,255,255,transparency);
    rect(30,30,width,medium,smooth);
    minimizers(330, 35);
    fill(0);
    textSize(30);
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
  }

  //Message block
  if(msgD){
    fill(255,255,255,transparency);
    rect(30,300,width,small,smooth);
    minimizers(330, 305);
    displayMessages(40,330);
  }

  //Media block
  if(socD){
    fill(255,255,255,transparency);
    rect(30,515,width,small,smooth);
    minimizers(330, 520);
    displaySocials(60,515);
  }

  //Displays icons when menus minimized
  if(disp1)
    iconDisplay(firIconX,firIconY,socialIcon);
  if(disp2)
    iconDisplay(firIconX+space,firIconY,messageIcon);
  if(disp3)
    iconDisplay(firIconX+space*2,firIconY,healthIcon);
  if(disp4)
    iconDisplay(firIconX+space*3,firIconY,calIcon);
  if(disp5)
    iconDisplay(firIconX+space*4,firIconY,newsIcon);
}


//Extra functions for displaying drawn items
function drawLine(x1,y1,x2,y2){
  stroke(10);
  line(x1,y1,x2,y2);
  noStroke();
}

//Makes the buttons for minimizing windows
function minimizers(x,y){
  fill(255);
  stroke(10);
  circle(x,y,20);
  line(x-5,y,x+5,y);
  noStroke();
}

//Detects where user clicks to minimize menus and select icons
function mouseClicked(){
  let size = 60;
  if(mouseX > 315 && mouseX < 345 && mouseY > 505 && mouseY < 535){
    socD = false;
    disp1 = true;
  }
  else if(mouseX > 315 && mouseX < 345 && mouseY > 290 && mouseY < 320){
    msgD = false;
    disp2 = true;
  }
  else if(mouseX > 315 && mouseX < 345 && mouseY > 20 && mouseY < 50){
    healthD = false;
    disp3 = true;
  }
  else if(mouseX > 1235 && mouseX < 1265 && mouseY > 20 && mouseY < 50){
    calenD = false;
    disp4 = true;
  }
  else if(mouseX > 1235 && mouseX < 1265 && mouseY > 290 && mouseY < 320){
    newsD = false;
    disp5 = true;
  }
  else if(mouseX > firIconX-size && mouseX < firIconX+size && 
          mouseY > firIconY-size && mouseY < firIconY+size){
    socD = true;
    disp1 = false;
  }
  else if(mouseX > firIconX-size+space && mouseX < firIconX+size+space &&
          mouseY > firIconY-size && mouseY < firIconY+size){
    msgD = true;
    disp2 = false;
  }
  else if(mouseX > firIconX-size+space*2 && mouseX < firIconX+size+space*2 &&
          mouseY > firIconY-size && mouseY < firIconY+size){
    healthD = true;
    disp3 = false;
  }
  else if(mouseX > firIconX-size+space*3 && mouseX < firIconX+size+space*3 &&
          mouseY > firIconY-size && mouseY < firIconY+size){
    calenD = true;
    disp4 = false;
  }
  else if(mouseX > firIconX-size+space*4 && mouseX < firIconX+size+space*4 &&
          mouseY > firIconY-size && mouseY < firIconY+size){
    newsD = true;
    disp5 = false;
  }
}

//Function to display a given icon
function iconDisplay(x,y,icon){
  let scale = 7;
  if(icon == calIcon)
    scale = 13;
  image(icon,x,y,icon.width/scale,icon.height/scale);
}

//Makes a grid pattern in the calendar window
//Unused
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


//Displays the calendar to do items
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

//Displays the health menu items
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

//Displays the news headlines for the news menu
function displayNews(list,x,y){
  textSize(20);
  textAlign(LEFT);
  let tempStr = ""
  if(list.length > 0){
    for(let z = 0;z < list.length;z++){
      tempStr += list[z] + "\n\n";
    }
    text(tempStr,x,y,290);
    textAlign(CENTER);
  }else{
    textAlign(CENTER);
    text("No news updates available at this moment.",
          x-10,y,290);
  }
  textSize(30);
}

//Renders and displays message box
function displayMessages(x,y){
  let ratio = 15;
  textAlign(LEFT);
  stroke(10);
  fill(255);
  rect(x,y+20,185,40,20);
  rect(x+70,y+70,210,40,20);
  noStroke();
  fill(0);
  textSize(30);
  text("\u{02190}",x,y);
  text("Dad",x*2,y+2);
  drawLine(x, y+10, x+280, y+10);
  textSize(20);
  text("On my way home.",x+10,y+46)
  text("I'll be waiting outside!",x+80,y+96)
  textAlign(CENTER);
  image(mic,x+215,y-27,mic.width/ratio,mic.height/ratio);
}

//Renders and displays the social media box
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
  calendar = days;
}
async function getWeather(filename){
  const response = await fetch("./"+filename);
  let data = await response.json();
  let days = [];
  for(let x = 0;x < 7;x++){
    days.push(data.forecasts[x]);
  }
  weather = days;
}
async function getHealth(filename){
  const response = await fetch("./"+filename);
  let data = await response.json();
  let days = [];
  for(let x = 0;x < 7;x++){
    days.push(data.health[x]);
  }
  health = days;
}
async function getNews(filename){
  const response = await fetch("./"+filename);
  let data = await response.json();
  let headlines = [];
  for(let x = 0;x < 7;x++){
    headlines.push(data[weekdays[x]]);
  }
  news = headlines;
}