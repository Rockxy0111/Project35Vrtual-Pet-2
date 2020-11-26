var foodS=20;
var database,dog,Dog,dogHappy,foodStock;
var feed,addFood; 
var fedTime,lastFed;
var getFoodStock,updateFoodStock;
var foodObj;
var input;
function preload(){

Dog=loadImage("dogImg.png");
dogHappy=loadImage("dogImg1.png")
}

function setup() {
database=firebase.database();

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
    lastFed=data.val();
});

createCanvas(1000, 480);
dog=createSprite(820,250,10,10)
dog.addImage(Dog)


feed=createButton("Feed the Dog")
feed.position(750,75)
feed.mousePressed(feedDog)

addFood=createButton("Add Food")
addFood.position(850,75)
addFood.mousePressed(addFoods)

input = createInput(""); 
input.position(1100,75)



foodObj=new Food(20,2)



}

function draw() {  

background(46,139,87)
fill(255)

//text("Food Remaining:"+foodS,210,190)

textSize(16)
text("Name Your Pet",634,39)

foodObj.display();

textSize(16)
if (lastFed>=12) {
    text("last Feed: "+lastFed%12+"Pm",160,39)
}else if (lastFed==0) {
    text("last Feed: 12Am ",160,39)
}else{
    text("last Feed: "+lastFed+"Am",160,39)
}

if(dog.x==450){
    dog.x=450;
}

if(dog.x==180){
    dog.x=180;
}



drawSprites();


}

function feedDog(){
dog.addImage(dogHappy)
if (foodS<=1) {
    foodS=1
}

foodS--;
dog.x=450;
dog.y=180;

foodObj=new Food(foodS,2)

database.ref('/').update({
Food:foodS,
FeedTime:hour()
})
}

function addFoods(){
if (foodS>=19) {
    foodS=19
}

dog.x=820;
dog.y=250;

dog.addImage(Dog)
foodS++;
foodObj=new Food(foodS,2)
database.ref('/').update({ 
    Food:foodS
})

}




