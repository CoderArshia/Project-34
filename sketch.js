var dog,happyDog,database,foodStock,foodS;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
 
  dog = createSprite(250, 350, 150, 150);
  dog.addImage(dogImg);
  dog.scale = 0.5; 
  foodStock = database.ref('Food');
  foodStock.on("value", readStock,writeStock);
  
}


function draw() {  
background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
}
drawSprites();
  fill("red");
  textSize(20);
  stroke(5);
  text("Food Remaining: "+foodS,170,200);
  text("Press up arrow key to feed him milk",130,10,300,20);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
database.ref('/').update({
  Food:x
})
}
