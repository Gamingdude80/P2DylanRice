

function setup() {
  createCanvas(1280, 720);
  noStroke();
  /*
  fetch("https://api.weather.gov/gridpoints/LUB/48,32/forecast").then(resp => function(){
    console.log(resp)
  })*/
}

function draw() {
  let date = new Date();

  background(173, 216, 230);

  fill(255);
  rect(950,50,300,170);
  rect(950,300,300,370);

  fill(0);
  textAlign(CENTER)
  text(date.getMonth() + "/" + date.getDate()+ "/"
        + date.getFullYear(),640,50);
  text(date.getHours() + ":" + date.getMinutes()
        + ":" + date.getSeconds(),640,100).textSize(30);


}