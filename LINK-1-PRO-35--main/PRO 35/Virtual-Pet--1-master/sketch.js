var dog,dogimg,dogHappy,foodStock,foods;
var database;
var food1;
var Feedpet, Addfood;
var feedTime, lastFed;
var foodObj

function preload(){
dogimg = loadImage("Dog.png");
dogHappy = loadImage("happydog.png");

}

function setup() {
  createCanvas(500, 750);
  
  
  dog = createSprite(250,300,50,50);
  dog.addImage(dogimg);
  dog.scale = 0.3;

  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  

  foodObj = new Food();


  feedPet = createButton("Feed the Dog");
  feedPet.position(450, 125);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(575, 125);
  addFood.mousePressed(addFoods);

 
 
}


function draw() {
  background(46,139,87); 
  


  foodObj.display()

  fedTime = database.ref("Feed Time");
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  drawSprites();
  fill("white")
  textSize(30);
  text("food remaining: "+foods,150,150);
  textSize(25)
  text("NOTE:To feed dog click up arrow key",60,50);
  
}

function readStock(data){
  foods = data.val();
}

function writeStock(x){
  if (x<=0){
    x = 15;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  });
}

function addFoods() {
  foods++;
  database.ref('/').update({
    Food: foods
  });
}

function feedDog() {
  foods = foods - 1;
  dog.addImage(dogHappy);
  foodObj.updateFoodStock(foodObj.getFoodStock(feedTime) - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour(),
    Food : foods
  });
}




