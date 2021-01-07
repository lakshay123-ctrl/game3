var mario,mario_img;
var background_Img,ground;
var ground_img;
var stone_ground;
var obstacle;
var brick_img;
var brick1_img;
var PLAY = 1;
var END = 2;
var FIGHT = 3;
var WIN = 4;
var gun;
var gameState = PLAY;
var enemyg1,enemyg2,brickg,markg;
var score = 0;
var flowerg,restart,gameOver;
var restart_img,gameOver_img;
var mushroomg,mushroom_img,mushroom;
var mario_img2;
var bulletg;
var bullet_img;
var e1_img;
var e1;
var tur;
var fireg;
var fire_img;
var bg2;
var bg2_img;
var castle;
var castle_img;
var mario_img2;
var gameOver_sound;
var mJump;
var gunPower;
var blockBreaking;
var bullet_sound;

function preload(){
  mario_img = loadAnimation("images/m1.png","images/m2.png","images/m3.png");
  background_Img = loadImage("images/background1.png");
  ground_img = loadImage("images/ground.png");
  obstacle = loadAnimation("images/enemy1.png","images/enemy2.png");
  brick_img = loadImage("images/brick.png");
  brick1_img = loadImage("images/questionmark.png");
  flower_img = loadAnimation("images/flower1.png","images/flower2.png");
  restart_img = loadImage("images/restart.png");
  gameOver_img = loadAnimation("images/gameOver.png");
  mario_img1 = loadAnimation("images/m4.png");
  mushroom_img = loadImage("images/mushroom.png");
  bullet_img = loadImage("images/bullet.png");
  e1_img = loadAnimation("images/enemy3.png","images/enemy4.png","images/enemy5.png");
  fire_img = loadImage("images/fireball.png");
  bg2_img = loadImage("images/blueBackground.png");
  castle_img = loadAnimation("images/marioCastle.png");
  mario_img2 = loadAnimation("images/m5.png");
  gameOver_sound = loadSound("images/gameOver_sound.wav");
  mJump = loadSound("images/mJump.wav");
  gunPower = loadSound("images/gunPower.wav");
  blockBreaking = loadSound("images/blockBreaking.wav");
  bullet_sound = loadSound("images/mEnemy.wav");
};

function setup() {
  createCanvas(1200,800);
  mario = createSprite(70,500,20,50);
  mario.addAnimation("running",mario_img);
  mario.addAnimation("stopping",mario_img1);
  mario.addAnimation("won",mario_img2);
  mario.scale = 0.4;
  //mario.debug= true;
  mario.setCollider("rectangle",0,0,210,280);
  ground = createSprite(400,720,1800,30);

  restart = createSprite(600,600,30,30);
  restart.addImage(restart_img);
  restart.scale = 0.5;
  restart.visible = false;

  e1 = createSprite(600,675,20,50);
  e1.addAnimation("enemy3",e1_img);
  e1.visible = false;

  mushroom = createSprite(1000,670,20,20);
  mushroom.addImage(mushroom_img);
  mushroom.visible = false;
  mushroom.scale = 0.8;

  gameOver = createSprite(600,450,30,30);
  gameOver.addAnimation("losing",gameOver_img);
  gameOver.addAnimation("winning",castle_img);
  gameOver.visible = false;

  enemyg1 = new Group();
  enemyg2 = new Group();
  brickg = new Group();
  markg = new Group();
  flowerg = new Group();
  mushroomg = new Group();
  bulletg = new Group();
  e1g = new Group();
  fireg = new Group();
  //edges = createEdgeSprite();
 
  ground.visible = true;

  stone_ground = createSprite(400,780,1800,80);
  stone_ground.addImage(ground_img);
  stone_ground.scale =4;
  stone_ground.velocityX = -4;
  stone_ground.x = stone_ground.width/2;

  gun = 0;
  tur = 80;
}

function draw() {
  background(background_Img); 
  
  mario.collide(ground);
  mario.collide(brickg);

  //console.log(stone_ground.x)
 if (gameState === PLAY){
  background(background_Img); 


  if (mario.isTouching(enemyg1)||mario.isTouching(enemyg2)){
    gameOver_sound.play();
    gameState = END;
    
   }
   stone_ground.velocityX = -4;
 
if (mario.isTouching(markg)){
  score += 5;
  blockBreaking.play();
  markg.destroyEach();
}

if (mario.isTouching(flowerg)){
  gameOver_sound.play();
  gameState = END;
}
 if (score === 10){
   mushroom.visible = true;
   mushroom.velocityX = -6;
 }

 if (score === 20){
  e1.visible = true;
 }

 if (score >= 20){
   gameState = FIGHT;
 }

 


if (mario.isTouching(mushroom)){
  gun = 1;
  gunPower.play();
  mushroom.destroy();
}


if (keyDown("space")&&gun === 1){
  bullet_sound.play();
  spawnBullets();
}


 if (keyDown("UP_ARROW")&&mario.y >= 400){
   mJump.play();
   mario.velocityY = -12;
 }

 if (bulletg.isTouching(enemyg1)||bulletg.isTouching(enemyg2)){
   enemyg1.destroyEach();
   enemyg2.destroyEach();
   bulletg.destroyEach();
   
 }

 mario.velocityY = mario.velocityY+0.5;

 if (stone_ground.x<0){
   stone_ground.x = stone_ground.width/2;
 }
  spawnObstacles();
  spawnObstacles1();
  spawnBricks();
  spawnFlowers();


  switch(score){
    case 10 : mario.scale = 0.5;
      break;
       case 20 : mario.scale = 0.6;
      break;
       case 30 : mario.scale = 0.7;
      break;
       case 40 : mario.scale = 0.8;
      break;
       case 50 : mario.scale = 0.9;
      break;
     default : break;
      
  }
}



if (tur === 0){
  e1.destroy();
  gameState = WIN;
}


if (mario.isTouching(enemyg1)||mario.isTouching(enemyg2)){
  enemyg1.destroyEach();
  enemyg2.destroyEach();
     mario.scale = 0.4;
     gameOver_sound.play();
     gameState = END;
   }

if (gameState === END){
mario.velocityY = 0;
stone_ground.velocityX = 0;
enemyg1.setVelocityXEach(0);
enemyg1.setLifetimeEach(-1);
enemyg2.setVelocityXEach(0);
enemyg2.setLifetimeEach(-1);
markg.setVelocityXEach(0);
markg.setLifetimeEach(-1);
brickg.setVelocityXEach(0);
brickg.setLifetimeEach(-1);
flowerg.setVelocityXEach(0);
flowerg.setLifetimeEach(-1);
mario.changeAnimation("stopping",mario_img1);
restart.visible = true;
gameOver.visible = true;






}

if (gameState === FIGHT){

  background(bg2_img); 

  enemyg1.setVelocityXEach(0);
  enemyg2.setVelocityXEach(0);
  flowerg.setVelocityXEach(0);
  brickg.setVelocityXEach(0);
  stone_ground.velocityX = 0;

  if (fireg.isTouching(mario)){
    gameState = END;
  }

  if (keyDown("space")&&gun === 1){
    bullet_sound.play();
    spawnBullets();
  }

  mario.collide(ground);
  
  if (keyDown("UP_ARROW")&&mario.y >= 400){
    mario.velocityY = -12;
  }

  mario.velocityY = mario.velocityY+0.5;
  
  if (bulletg.isTouching(e1)){
    tur = tur-1;
  }

  
 
  spawnFire();
}



if (gameState === WIN){
 
  background(bg2_img); 

  //restart.visible = true;
  gameOver.visible = true;
  gameOver.changeAnimation("winning",castle_img);
  gameOver.scale = 1.75;
  //gameOver.depth = restart.depth;
  //restart.depth = restart.depth+1;
  mario.changeAnimation("won",mario_img2);
  mario.scale = 1.5;
  mario.velocityY = 0;
  mario.x = 380;
  stone_ground.x = 400;
  stone_ground.velocityX = 0;
  
  
}


  
if (mousePressedOver(restart)){
  reset();
  gameState = PLAY;
  console.log("restart is working");
}

 if (keyDown("s")&&gameState === WIN){
 startagain();
 gameState = PLAY;
 console.log("s is working");
 }

  drawSprites();
  textSize(15);
  fill("black");
  text("Score: "+score,50,300);

}

function spawnObstacles(){
  if (frameCount%200 === 0){
  var enemy = createSprite(1000,685,20,20);
  enemy.addAnimation("enemy",obstacle);
  enemy.velocityX = -6;
  enemy.scale = 0.2;
  enemyg1.add(enemy);

  enemy.lifetime = 250;
  }
}

function spawnObstacles1(){
  if (frameCount%210 === 0){
  var enemy = createSprite(1000,685,20,20);
  enemy.addAnimation("enemy",obstacle);
  enemy.velocityX = -7;
  enemy.scale = 0.2;
  enemyg2.add(enemy);

  enemy.lifetime = 250;
  }
}

function spawnBricks(){
  if (frameCount%300 === 0){
    var brick = createSprite(1000,500,20,20);
    var mark = createSprite(1020,500,20,20);
    brick.y = Math.round(random(400,500));
    mark.y = brick.y;
    brick.addImage(brick_img);
    mark.addImage(brick1_img);
    mark.velocityX = -6;
    brick.velocityX = -6;
    brick.scale = 0.8;
    mark.scale = 0.8;
    mark.lifetime = 250;
    brickg.add(brick);

    markg.add(mark);
  brick.depth = gameOver.depth;
  mark.depth = gameOver.depth;
  gameOver.depth = gameOver.depth+1;

    brick.lifetime = 250;
  }
}

function spawnFlowers(){
  if (frameCount%500 === 0){
    var flower = createSprite(1000,675,20,20);
    flower.addAnimation("flower",flower_img);
    flower.velocityX = -6;
    flower.scale = 0.8;
    flowerg.add(flower);
  
    flower.lifetime = 250;
  }
}

function spawnMushroom(){
 
     mushroom = createSprite(1000,675,20,20);
    mushroom.addAnimation("mushroom",mushroom_img);
    mushroom.velocityX = -6;
    mushroom.scale = 0.8;
   // mushroomg.add(mushroom);
  
    mushroom.lifetime = 250;
  
}

function spawnBullets(){
  if (frameCount%10===0){
  var bullet = createSprite(70,650,20,10);
  bullet.addImage(bullet_img);
  bullet.x = mario.x;
  bullet.y = mario.y;
   bullet.velocityX = 6;
   bullet.velocityY = 1;
   bullet.scale = 0.1;
   bulletg.add(bullet);
   bullet.lifetime = 200;
  }
}

function spawnFire(){
  if (frameCount%150===0){
  var fire  = createSprite(600,675,10,10);
  fire.scale = 0.3;
  fire.velocityX = -6;
  fire.addImage(fire_img);
  fire.x = e1.x;
  fire.y = e1.y;
  fireg.add(fire);
  fire.lifetime = 200;
  }
}

function reset(){
  background(background_Img);
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  mario.changeAnimation("running",mario_img);
  brickg.destroyEach();
  markg.destroyEach();
  enemyg1.destroyEach();
  enemyg2.destroyEach();
  flowerg.destroyEach();
  e1.visible = false;
  stone_ground.velocityX = -4;
  gameState = PLAY;
  mario.scale = 0.4;
  
}

function startagain(){
  background(background_Img);
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  mario.changeAnimation("running",mario_img);
  gameState = PLAY;
}

