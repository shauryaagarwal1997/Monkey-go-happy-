var jungle,jungleImg;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,coinsGroup,dollarsGroup,diamondGroup;
var score
var ground;
var survivalTime=0;
var Coins=0;
var score=0;
var gameState="PLAY";
var gameState="END";
var gameOver,gameOverImg;
var coin,coinImg;
var diamond,diamondImg;
var dollar,dollarImg;
var coins;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImg=loadImage("game-over-1-1.jpeg");
  jungleImg=loadImage("jungle1.jpg");
  coinImg=loadImage("coin.jpg");
  diamondImg=loadImage("diamond1.jpg");
  dollarImg=loadImage("dollar.jpg");
}



function setup() {
  createCanvas(400,300);
  
  jungle=createSprite(300,140,400,400);
  jungle.addImage(jungleImg);
  jungle.scale=1.4;
 
  
  monkey=createSprite(50,280,10,10);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1;
  
  ground=createSprite(200,350,800,10);
  ground.velocityX=-6;
  
  obstaclesGroup=new Group();
  FoodGroup=new Group();
  coinsGroup=new Group();
  dollarsGroup=new Group();
  diamondsGroup=new Group();
  
  gameOver=createSprite(-2200,-2220,400,400);
  gameOver.addImage(gameOverImg);
}


function draw() {
  gameState="PLAY";
  if(gameState==="PLAY"){
  background("orange");
  jungle.velocityX=-1
  ground.depth=monkey.depth-1;
  if(ground.x<100) {
    ground.x=400;
  }
  if(frameCount % 4===0 && gameOver.x===-2200) {
    survivalTime+=1;
  }
    if(frameCount % 300 === 0){
      jungle.x=300;
    }
    camera.x=monkey.x+150;
    camera.y=monkey.y-125;
  if(monkey.collide(ground) && keyDown("space")) {
    monkey.velocityY=-12.6;
  }
  if(coinsGroup.isTouching(monkey)){
    coinsGroup.destroyEach();
    Coins+=1;
    textSize(20);
    text("+1",100,100);
  }
    
  monkey.velocityY=monkey.velocityY+0.5;
  monkey.collide(ground);
    
   if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
     score+=1;
    }
    if(diamondsGroup.isTouching(monkey)) {
      diamondsGroup.destroyEach();
      Coins+=10;
    }
    if(dollarsGroup.isTouching(monkey)) {
      dollarsGroup.destroyEach();
      Coins+=5;
    }
  if(obstaclesGroup.isTouching(monkey)) {
    gameState="END";
  }
  obstacles();
  Banana();
  coins();
  dollars();
  diamonds();
  
}
  if(gameState==="END") {
    createCanvas(400,300);
    gameOver.x=200;
    gameOver.y=190;
    monkey.destroy();
    ground.destroy();
    obstaclesGroup.destroyEach();
    FoodGroup.destroyEach();
    dollarsGroup.destroyEach();
    diamondsGroup.destroyEach();
    coinsGroup.destroyEach();
    fill("yellow");
    textSize(18);
    text("GAME  OVER",150,180);
    
  }
  drawSprites();
    
  fill("blue");
  textSize(20);
  stroke("black");
  text("SURVIVAL  TIME : "+survivalTime,100,75);
    
  fill("red");
  textSize(20);
  stroke("black");
  text("Coins : "+Coins,150,95);
  
  fill("black");
  textSize(20);
  text("SCORE : "+score,140,55);
}

function obstacles() {
  if(frameCount % 200 === 0 ) {
    obstacle=createSprite(500,316,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-6;
    obstacle.lifetime=300;
    obstacle.setCollider("rectangle",0,0,300,200);
    obstacle.depth=gameOver-10;
    obstaclesGroup.add(obstacle);
    if(gameOver.x===200) {
      obstacle.velocityX=5;
      obstacle.destroy();
    }
  }
}
function Banana() {
  if(frameCount % 100 === 0 ) {
    banana=createSprite(450,random(150,225),10,10);
    banana.lifetime=300;
    banana.addImage(bananaImage);
    banana.scale=random(0.1,0.2);
    banana.velocityX=-7;
    if(gameOver.x===200) {
      banana.velocityX=5;
      banana.destroy();
    }
    FoodGroup.add(banana);
}
}
function coins(){
  if (frameCount % 180 === 0){
    var coins=createSprite(450,random(120,180),10,10);
    coins.scale=0.2;
    coins.lifetime=300;
    coins.velocityX=-5;
    coins.addImage(coinImg);
    coinsGroup.add(coins);
    if(gameOver.x===200) {
      coins.velocityX=5;
      coins.destroy();
    }
  }
}
function dollars(){
  if (frameCount % 250 === 0){
    var dollar=createSprite(450,random(120,190),10,10);
    dollar.scale=0.05;
    dollar.lifetime=300;
    dollar.velocityX=-8;
    dollar.addImage(dollarImg);
    dollarsGroup.add(dollar);
    if(gameOver.x===200) {
      dollar.velocityX=5;
      dollar.destroy();
    }
  }
}
function diamonds(){
  if (frameCount % 320 === 0){
    var diamond=createSprite(450,random(80,210),10,10);
    diamond.scale=0.15;
    diamond.lifetime=300;
    diamond.velocityX=-5;
    diamond.addImage(diamondImg);
    diamondsGroup.add(diamond);
    if(gameOver.x===200) {
      diamond.velocityX=5;
      diamond.destroy();
    }
  }
}