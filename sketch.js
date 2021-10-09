//created by Aadi Golecha on the 9th of October
//kangaroo game part 1

// declare all the Global variables
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;


function preload()
{
  //made the animations
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");

  //Loaded the required images
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");

  // loaded the required sounds
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() 
{
  createCanvas(800, 400);

  // creative jungle bedground
  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  // creator the character 'kangaroo' and the animation
  kangaroo = createSprite(50,200,20,50);
  kangaroo.addAnimation("running", kangaroo_running);
  kangaroo.addAnimation("collided", kangaroo_collided);
  kangaroo.scale = 0.15;

  //Given the correct Collider the radius
  kangaroo.setCollider("circle",0,0,300)

  invisibleGround = createSprite(400,350,1600,10);
  invisibleGround.visible = false;
  
  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() 
{
  background(255);

  // Setting camera position is the  kangaroo position
   kangaroo.x=camera.position.x-270;
   
  if (gameState===PLAY)
  {
    // Setting the velocity for the camera so that it can move
    jungle.velocityX=-3

    // making it infinity track for the kangaroo
    if(jungle.x<100)
    {
       jungle.x=400
    }
   console.log(kangaroo.y)

   // general movement for the kangaroo
    if(keyDown("space")&& kangaroo.y>270) 
    {
      jumpSound.play();
      kangaroo.velocityY = -16;
    }
  
    //gravity for the kangaroo
    kangaroo.velocityY = kangaroo.velocityY + 0.8

    // spawning shrubs and obstacles using their functions
    spawnShrubs();
    spawnObstacles();

    // making the kangaroo stable on a Invisible ground
    kangaroo.collide(invisibleGround);
    
    if(obstaclesGroup.isTouching(kangaroo)){
      collidedSound.play();
      gameState = END;
    }
    if(shrubsGroup.isTouching(kangaroo)){

      shrubsGroup.destroyEach();
    }
  }
  else if (gameState === END) {
    
    kangaroo.velocityY = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);

    kangaroo.changeAnimation("collided",kangaroo_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
    
  }

  
  drawSprites();


}

function spawnShrubs() {

  if (frameCount % 150 === 0) {

     var shrub = createSprite(camera.position.x+500,330,40,10);

    shrub.velocityX = -(6 + 3*score/100)
    shrub.scale = 0.6;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
              break;
      case 2: shrub.addImage(shrub2);
              break;
      case 3: shrub.addImage(shrub3);
              break;
      default: break;
    }
         
    shrub.scale = 0.05;
    shrub.lifetime = 400;
    
    shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
    shrubsGroup.add(shrub);
    
  }
  
}

function spawnObstacles() 
{
  if(frameCount % 120 === 0) 
  {
     var obstacle = createSprite(camera.position.x+400,330,40,40);
    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.addImage(obstacle1);
    obstacle.velocityX = -(6 + 3*score/100)
    obstacle.scale = 0.15;   
 
    obstacle.lifetime = 400;
    obstaclesGroup.add(obstacle);
    
  }
}