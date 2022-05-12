var ship, shipimg;
var alien, alienimg, aliens;
var coin, coinimg, coins, coins2, coins3, coins4, coins5;
var coin2, coin3, coin4, coin5;
var powerup, powerupimg;
var alpha, alphaimg;
var score;
var bg, bgimg;
var aster, asterimg, asters;
var gamestate="serve";
var coin_touch, aster_touch, alien_touch;
var plasmagun, guns;
var laser, laser_sound, laserg;
var gameover, gameimg, restart;
var dist, ly, la;
var bulletgroup, bullet, bullet1, bullet2, bullet3, bullet4, bullets;


function preload(){
    // loading images for game
    shipimg = loadImage("spaceship.png")
    alienimg = loadImage("alien_ship.png")
    alphaimg = loadImage("alpha_cen.png")
    coinimg = loadImage("gold.png")
    powerupimg = loadImage("poerups.png")
    bgimg = loadImage("space.png")
    asterimg = loadImage("aster.png")
    gameimg = loadImage("gameover.png")

    // loading sounds for game
    coin_touch = loadSound("collect-diamond (1).mp3")
    aster_touch = loadSound("ship_aster.mp3")
    alien_touch = loadSound("ship dead.mp3")
    laser_sound = loadSound("alien dead.mp3")
}

function setup(){
    createCanvas(600,500)

    bg = createSprite(300,250)
    bg.addImage(bgimg)
    bg.scale=2

    ship = createSprite(300,450)
    ship.addImage(shipimg)
    ship.scale=0.6

    alpha = createSprite(100,200)
    alpha.addImage(alphaimg)
    alpha.scale=0.8
    alpha.visible=false

    gameover = createSprite(300,250)
    gameover.addImage(gameimg)
    gameover.scale=0.5
    gameover.visible=false

    restart = createSprite(300, 280, 50, 10)
    restart.visible=false

    coins = new Group();
    coins2 = new Group();
    coins3 = new Group();
    coins4 = new Group();
    coins5 = new Group();
    aliens = new Group();
    asters = new Group();
    guns = new Group();
    laserg = new Group();
    bulletgroup = new Group();

    score =0;
    dist = 0;
    ly = 0;
    la=5;
    bullets=4;
}

function draw(){
    background("pink")

    alpha.visible=false

    if (gamestate=="play"){

        ship.x=World.mouseX

        dist = dist + Math.round(frameCount/60);
        
        // check this mam
        if (dist % 1000 === 0){
            ly += 1
        }

        // check this mam
        /*if (dist % 4000  === 0){
            alpha.visible=true
            console.log("4300 yahhhhhh")
        }*/

        // ship to dont go beyond canvas
        if (ship.x > 560){
            ship.x = 560
        }

        if (ship.x < 50){
            ship.x =  50
        }

        // coins touches

        if (coins.isTouching(ship)){
            coins.destroyEach()
            score=score+10
            coin_touch.play()
        }

        if (coins2.isTouching(ship)){
            coins2.destroyEach()
            score=score+10
            coin_touch.play()
        }

        if (coins3.isTouching(ship)){
            coins3.destroyEach()
            score=score+10
            coin_touch.play()
        }

        if (coins4.isTouching(ship)){
            coins4.destroyEach()
            score=score+10
            coin_touch.play()
        }

        if (coins5.isTouching(ship)){
            coins5.destroyEach()
            score=score+10
            coin_touch.play()
        }

        // asters touch ship
        if (asters.isTouching(ship)){
            ship.visible=false
            gamestate="end"
            aster_touch.play()
        }

        // alien laser touches ship
        if (guns.isTouching(ship)){
            ship.visible=false
            gamestate="end"
            alien_touch.play()
        }


// chech this mam
        if (bulletgroup.isTouching(ship)){
            console.log("bullets touch ship")
            bullets=bullets-1
            bulletgroup.destroyEach()
        }

        if (bullets===0){
            gamestate="end"
            ship.visible=false
        }

        if (keyDown("UP_ARROW") /*&& la > 0*/){
            laser = createSprite(ship.x,ship.y-220, 5, 400)
            laser.shapeColor = "red"
            laser.lifetime=20
            laserg.add(laser)
            //la=la-1
        }

        if (laserg.isTouching(alien)){
            laser_sound.play()
            alien.destroy()
            guns.destroyEach()
            console.log("alien dead")
        }

        // check this mam
        if (laserg.isTouching(asters)){
            laser_sound.play()
            console.log("aster destroyed")
            asters.destroyEach()
        }

        spawnaliens()
        asteriods()
        spawncoins()
    }

    if(keyDown("space")){
        gamestate="play"
    }

    // check this mam here ship sprite is not displaying
    if (gamestate=="end"){
        coins.setVelocityYEach(0)
        coins2.setVelocityYEach(0)
        coins3.setVelocityYEach(0)
        coins4.setVelocityYEach(0)
        coins5.setVelocityYEach(0)
        asters.setVelocityYEach(0)
        console.log("end")
        gameover.visible=true
        restart.visible=true
        if (mousePressedOver(restart)){
            gamestate="serve"
            console.log("restart")
            reset()
        }
    }

    asters.velocityY+=3

    drawSprites()

    if (gamestate=="serve"){
        fill("white")
        text("target is to be go to alpha centuri star", 200, 200)
        text("Distance: 4.367 light years", 200, 230)
        text("1 light year is equal to 1000km",200, 260)
        text("Try to miss the asteroids", 200, 290)
        text("Use lazer (up arrow) to destroy alien ships", 200, 320)
        text("Press space bar key to start the game ", 200, 350)
    }

    fill("white")
    text("Score: "+score, 520, 20)
    text("Distance: "+dist+" km", 500, 40)
    //text("Lasers: "+la, 500, 60)
    text("lives: "+bullets, 520, 60)
    text("LightYears: "+ly, 500, 80)
}

function reset(){
    gameover.visible=false;
    restart.visible=false;
    ship.visible=true;
    aliens.destroyEach()
    asters.destroyEach()
    coins.destroyEach()
    coins2.destroyEach()
    coins3.destroyEach()
    coins4.destroyEach()
    coins5.destroyEach()
    frameCount=0
    score =0;
    dist = 0;
    ly = 0;
    la=5;
    bullets=4;
}

// check this mam
function spawnaliens(){
    if (frameCount % 400 === 0){
        alien = createSprite(Math.round(random(200,500)), 80)
        alien.addImage(alienimg)
        alien.scale=0.4
        alien.lifetime=300

        var rand = Math.round(random(1,2))
        if (rand==1){
            plasmagun = createSprite(alien.x, alien.y+100, 5, 200)
            plasmagun.shapeColor = "yellow"
            plasmagun.lifetime=100
            //plassmagun.velocityY=1
        }

        if (rand==2){
            bullet = createSprite(alien.x, alien.y+20, 5, 20)
            bullet.shapeColor="yellow"
            bullet.lifetime=300
            bullet.velocityY=2

            bullet1 = createSprite(alien.x+30, alien.y+30, 5, 20)
            bullet1.shapeColor="yellow"
            bullet1.lifetime=300
            bullet1.velocityY=1

            bullet2 = createSprite(alien.x-30, alien.y+40, 5, 20)
            bullet2.shapeColor="yellow"
            bullet2.lifetime=300
            bullet2.velocityY=1.5

            bullet3 = createSprite(alien.x-50, alien.y+30, 5, 20)
            bullet3.shapeColor="yellow"
            bullet3.lifetime=300
            bullet3.velocityY=2

            bullet4 = createSprite(alien.x+50, alien.y+20, 5, 20)
            bullet4.shapeColor="yellow"
            bullet4.lifetime=300
            bullet4.velocityY=2.1

            bulletgroup.add(bullet)
            bulletgroup.add(bullet1)
            bulletgroup.add(bullet2)
            bulletgroup.add(bullet3)
            bulletgroup.add(bullet4)
        
        }

        console.log(rand)

        guns.add(plasmagun)

    }
}

function asteriods(){
    if (frameCount % 200 === 0){
        aster = createSprite(Math.round(random(200,500)),100)
        aster.addImage(asterimg)
        aster.scale=random(0.02,0.5)
        aster.velocityY = 3
        aster.lifetime=300

        asters.add(aster)
        console.log(aster.scale)
    }
}

function spawncoins(){
    if (frameCount % 300 === 0){
        coin = createSprite(200, 10, 20, 20)
        coin.addImage(coinimg)
        coin.scale = 0.2
        coin.velocityY = 3

        coin2 = createSprite(200, 30, 20, 20)
        coin2.addImage(coinimg)
        coin2.scale = 0.2
        coin2.velocityY = 3

        coin3 = createSprite(200, 50, 20, 20)
        coin3.addImage(coinimg)
        coin3.scale = 0.2
        coin3.velocityY = 3

        coin4 = createSprite(200, 70, 20, 20)
        coin4.addImage(coinimg)
        coin4.scale = 0.2
        coin4.velocityY = 3

        coin5 = createSprite(200, 90, 20, 20)
        coin5.addImage(coinimg)
        coin5.scale = 0.2
        coin5.velocityY = 3

        coins.add(coin)
        coins2.add(coin2)
        coins3.add(coin3)
        coins4.add(coin4)
        coins5.add(coin5)
    }
}