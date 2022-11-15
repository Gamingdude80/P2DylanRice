let calendar,health,weather;

const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];

function setup() {
  createCanvas(1280, 720);
  noStroke();
  textAlign(CENTER);
  getSchedule("calendar.json");
}

function draw() {
  let date = new Date();
  background(173, 216, 230);
  let small = 175,large = 390,medium = 240;
  let width = 300;

  //Time block
  fill(0);
  textSize(50);
  let minute = date.getMinutes();
  let hour = date.getHours();
  let sec = date.getSeconds();
  if(minute < 10)
    minute = "0"+minute;
  if(hour < 10)
    hour = "0"+hour;
  if(sec < 10)
    sec = "0"+sec;
  text(hour + ":" + minute + ":" + sec,640,50);

  //Weather data
  fill(0);
  textSize(30);
  let cond = "Sunny";
  let current = 21;
  let high = 21;
  let low = 5;
  text(cond + "   " + current + char(176) + "C   H:"+ high + char(176) + "  L:" + low + char(176),640,90);

  fill(0);
  textSize(20);
  let start = millis()/1000;
  let inc = "seconds";
  if(start > 59){
    start /= 60
    if(start > 1)
      inc = "minutes"
    else
      inc = "minute"
  }
  text("Session Time: " + int(start) + " " + inc,640,120);

  //Calendar block
  fill(255);
  rect(950,30,width,medium);
  minimizers(1250, 30);
  fill(0);
  textSize(30);
  text(months[date.getMonth()] + " " + date.getDate()+ ", " + date.getFullYear(),1100,70);

  //News block
  fill(255);
  rect(950,300,width,large);
  minimizers(1250, 300);
  fill(0);
  text("News for Today",1100,330)

  //Health block
  textAlign(LEFT);
  fill(255);
  rect(30,30,width,medium);
  minimizers(330, 30);
  fill(0);
  text("Sleep time:",40,70);
  text("Weight:",40,105);

  drawLine(40,115,320,115);
  text("Walk:",40,185);
  text("Run:",40,215);
  text("Jog:",40,245);
  textAlign(CENTER);
  text("Exercises",170,150);

  //Media block
  fill(255);
  rect(30,300,width,small);
  minimizers(330, 300);

  //Message block
  fill(255);
  rect(30,515,width,small);
  minimizers(330, 515);
  

}

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

async function getSchedule(filename){
  const response = await fetch("./"+filename);
  let data = await response.json();
  let days = {};
  for(let x = 0;x < 7;x++){
    days[weekdays[x]] = data[weekdays[x]]
  }
  console.log(days);
}
