var score =0;
var captainAmerica,bluebubble,redbubble, bullet, invisibleBg;

var cap,bubbleImg, bulletImg, blastImg, bg;

var redBubbleGroup, redBubbleGroup, bulletGroup;
var cap1;


var life =3;
var score=0;
var gameState=1

function preload(){
  cap = loadAnimation("Defending.png")
  cap1 = loadAnimation("attack 1.png","attack 2.png","attack 3.png","attack 4.png")
  
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("asteroid.png")
  redBubbleImg = loadAnimation("alien1.png","alien2.png","alien3.png","alien4.png")
  bg= loadImage("BG.jpg")

  //gunImg1.playing = true;
  //gunImg1.looping = false;
}
function setup() {
  createCanvas(1350, 750);

  
  invisibleBg= createSprite(100, height/2, 100,height);
  invisibleBg.visible = false;
  //invisibleBg.addImage(bg)
  
  captainAmerica= createSprite(100, height/2, 50,50);
  captainAmerica.addAnimation("captain",cap)
  captainAmerica.addAnimation("captain1",cap1)
  cap.frameDelay = 120;
  cap1.frameDelay = 120;
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(bg);
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    captainAmerica.y=mouseY  

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    if(keyDown("space")){
      captainAmerica.changeAnimation("captain1");
      shootBullet();
    }

    else{
      captainAmerica.changeAnimation("captain");
    }

    if (blueBubbleGroup.collide(invisibleBg)){
     handleGameover(blueBubbleGroup);
    }
    
    if (redBubbleGroup.collide(invisibleBg)) {
     handleGameover(redBubbleGroup);
    }
    
    /*if(blueBubbleGroup.(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }*/

    /*if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision();
    }*/
   
    
    /*if(blueBubbleGroup.collide()){
      handleBubbleCollision(blueBubbleGroup);
    }*/
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    drawSprites();
  }
    
  
}

function drawblueBubble(){
  bluebubble = createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.5;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(800,random(20,780),40,40);
  redbubble.addAnimation("alien",redBubbleImg);
  redbubble.scale = 0.8;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= captainAmerica.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

     blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) 

    /* blast= sprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.add(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    image(blastImg) */
    
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}