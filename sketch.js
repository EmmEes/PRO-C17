var path,boy,cash,diamonds,jwellery,sword,score,standing_img;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup,gameState,gameEnd_gif,ge;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  standing_img = loadImage("runner1.png");
  gameEnd_gif = loadAnimation("gif main-0.jpg","gif main-3.jpg","gif main-4.jpg");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);

ge = createSprite(200,200,10,10);
ge.addAnimation("gameEndinggif",gameEnd_gif);
ge.scale = 0

 // ge.visible = false;
  

//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

boy.setCollider("circle",0,0,500)
//boy.debug = true

score = 0
gameState = "standby";
}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
 
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2-25;
  }
  
    
  
  
  drawSprites();
   textSize(25);
  fill(255);
  fill("blue");
  text("Treasure: "+ treasureCollection,140,30);
if (gameState === "standby"){
  textSize(30);
  textAlign(CENTER);
  fill("red");
  text("Press Enter To Start",200,200)
  
  }
  if (gameState === "standby" && keyDown("ENTER")){
    gameState = "play"
  }
   
  if (gameState === "play"){
    path.velocityY = 4;
   createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 1
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 1
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 1
      
    }
      if(swordGroup.isTouching(boy)) {
       ge.scale = 1.2
    boy.scale = 0 
        gameState = "end"
        cashG.visible = false;
    }
  }
 if(gameState === "end"){
   textSize(18);
   textAlign(CENTER);
   text("press enter to restart",200,350);
  }

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
    
  if (gameState === "standby"){
       cash.depth = path.depth - 1; 
    } 
    if (gameState === "play"){
       cash.velocityY = 4; 
    }
    if(gameState === "end"){
      cash.velocityY = 0;
    }
  cash.lifetime = 110;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
    
  if (gameState === "standby"){
       diamonds.depth = path.depth - 1; 
    } 
    if (gameState === "play"){
       diamonds.velocityY = 4; 
    }
    if(gameState === "end"){
      diamonds.velocityY = 0;
    }
  diamonds.lifetime = 100;
  diamondsG.add(diamonds);
}
  
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
    
  if (gameState === "standby"){
       jwellery.depth = path.depth - 1; 
    } 
    if (gameState === "play"){
       jwellery.velocityY = 4; 
    }
    if(gameState === "end"){
     jwellery.velocityY = 0; 
    }
  jwellery.lifetime = 100;
  jwelleryG.add(jwellery);
  
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),0, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
   
    if (gameState === "standby"){
       sword.depth = path.depth - 1; 
    } 
    if (gameState === "play"){
       sword.velocityY = 4; 
    }
    if(gameState === "end"){
       sword.velocityY = 0;
    }

  sword.lifetime = 100;
  swordGroup.add(sword);
    sword.Y = -10
  }
}
