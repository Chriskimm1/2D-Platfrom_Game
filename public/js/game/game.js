

function startGame(){
$("#container").empty();
var game = new Phaser.Game(900, 450, Phaser.AUTO, '', { preload: preload, create: create, update: update});


var player;
var playerHealth = 300;
var map;
var shurikenTime = 0;
var shurikens;
var shuriken;
var evilNinja;
var coin
var sprite; 
var music;
var score = 0; 
var scoreText;
var enemyKilled = 0;
var enemyText;
var facing;
var bossHealth = 20;
var timeCheck;
var winText;

//loads up all the images and sprites
function preload() {
game.load.tilemap("levelone", "js/assets/graveyard.json", null, Phaser.Tilemap.TILED_JSON);
game.load.image("tiles", "js/assets/Graveyard.png");
game.load.spritesheet("dude", "js/assets/dude.png", 58, 80);
game.load.image("shuriken", "js/assets/shuriken.PNG", 4,4);
game.load.spritesheet("evilNinja", "js/assets/badguy.png", 54,80);
game.load.audio("music", "js/assets/music.ogg");
game.load.spritesheet("coins", "js/assets/coins.png", 32,32);
game.load.audio("jump", "js/assets/jump_07.wav");
game.load.audio("coinsound", "js/assets/coin1.wav");
game.load.audio("hit", "js/assets/hit.wav");
game.load.spritesheet("boss", "js/assets/pacman.png", 56, 80);
};






//defining platfrom

function create() {
		////////////////
		//  SOUNDS    //
		////////////////

    music = game.add.audio("music")
    music.loop = true;
    music.volume = 4;
    music.play();

    jump = game.add.audio("jump")
    jump.volume = 0.4;

    hit = game.add.audio("hit")

    coinsound = game.add.audio("coinsound")
    coinsound.volume = 0.5

    ////////////////
    // MAP SETTING /
    ////////////////
    game.physics.startSystem(Phaser.Physics.ARCADE);
    map = game.add.tilemap("levelone");
    map.addTilesetImage("Graveyard", "tiles");

    rebound = map.createLayer("enemyblock")
    rebound.resizeWorld();
    bgLayer = map.createLayer("sky")
   	bgLayer.resizeWorld();
    collide = map.createLayer("collide")
    collide.resizeWorld();
    spikes = map.createLayer("spikes")
    spikes.resizeWorld();
    map.setCollisionBetween(0,280, true, collide);
    map.setCollisionBetween(0,280, true, spikes);
    map.setCollisionBetween(0,280, true, rebound);




    scoreText = game.add.text(game.camera.x, game.camera.y, "Score: 0 health: " + playerHealth, {font: "24px Copperplate", fill:"white", align:"center" });
    

    boss = game.add.sprite(500	, 200, "boss")
    boss.anchor.setTo(.5,1);
    boss.scale.setTo(2,2);
    game.physics.arcade.enable(boss);
    boss.body.bounce.y = 0.3;
    boss.body.gravity.y = 300;
    boss.collideWorldBounds = true;
    boss.animations.add("walk", [1,2,3,4,5,6,7,8,9,10], 40, true);
		boss.play("walk", 2)
		boss.body.bounce.setTo(1,0)
		boss.body.velocity.x = 40

    ///////////////
    // PLAYER    //
    ///////////////
    player = game.add.sprite(32, game.world.height - 200, 'dude');
    player.anchor.setTo(.5, 1);
    player.scale.setTo(0.7,0.7)
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    game.camera.follow(player)

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    //Animation frames for player
    player.animations.add('left', [4, 8, 11, 3], 16, true);
    player.animations.add('right', [4, 8, 11, 3], 16, true);
    player.animations.add('up', [1], 1, true);
    player.animations.add("shoot", [15], 1, true);
    player.animations.add("hurt", [17], 1, true);

    /////////////
    // BAD GUT //
    /////////////
    evilNinja = game.add.group();
    game.physics.arcade.enable(evilNinja, Phaser.Physics.ARCADE);

    evilNinja.enableBody = true;
    createEvilNinja();

    /////////////
    //  COIN   //
    /////////////
    coin = game.add.group();
    game.physics.arcade.enable(coin, Phaser.Physics.ARCADE);
    coin.enableBody = true;
    createCoins();

    //////////////
    // SHURIKEN //
    //////////////
    shurikens = game.add.group();
    shurikens.enableBody = true;
    shurikens.createMultiple(30, 'shuriken');
    shurikens.setAll("scale.x", 0.7);
    shurikens.setAll("scale.y", 0.7);
    shurikens.setAll('anchor.x', 0.5);
    shurikens.setAll('anchor.y', 1);
    shurikens.setAll('outOfBoundsKill', true);
    shurikens.setAll('checkWorldBounds', true);
    game.physics.enable(shuriken, Phaser.Physics.ARCADE)



}



//////////////////
// CREATE COINS //
//////////////////
function createCoins(){
	var coinsNumber = 100;
	for (var i = 0; i < coinsNumber; i++){
		coins = coin.create(game.world.randomX, game.world.randomY, "coins", 5, true);
		coins.collideWorldBounds = true;
		coins.scale.setTo(0.9,0.9)
		game.physics.arcade.enable(coins);
		coins.anchor.setTo(.5, 1);
		coins.body.gravity.y = 30000;
		coins.animations.add("spin", [1,2,3,4], 40, true);
		coins.play("spin", 2)
	}
}

    


/////////////////////
// CREATE BAD GUYS //
/////////////////////


function createEvilNinja(){
	var evilNinjaAmount = 40;
	for (var i = 0; i < evilNinjaAmount; i++){
		evilNinjas = evilNinja.create(game.world.randomX, game.world.randomY, "evilNinja", 5, true);
		evilNinjas.collideWorldBounds = true;
		evilNinjas.scale.setTo(0.6,0.6)
		game.physics.arcade.enable(evilNinjas);
		evilNinjas.anchor.setTo(.5, 1);
		evilNinjas.body.setSize(40,40,0,0);
		evilNinjas.health = 100
		evilNinjas.body.gravity.y = 200;
		evilNinjas.animations.add("walk", [1,2,3,4,5,6,7,8,9,10], 40, true);
		evilNinjas.play("walk", 2)
		evilNinjas.body.bounce.setTo(1,0)
		evilNinjas.body.velocity.x = 40
	}
}







//////////////
// UPDATE   //
/////////////

function update() {
	////////////////////////////////
	// PHYSICS COLLIDE OR OVERLAP //
	////////////////////////////////

	 game.physics.arcade.collide(player, collide);
	 game.physics.arcade.collide(evilNinja, collide);
	 game.physics.arcade.collide(boss, collide)
	 game.physics.arcade.collide(player, spikes, killPlayer, null, this);	
	 game.physics.arcade.collide(coin, collide);
	 game.physics.arcade.overlap(player, coin, collectCoins, null, this);
	 game.physics.arcade.overlap(shuriken, evilNinja, killNinja, null, this);
	 game.physics.arcade.collide(evilNinja, rebound);
	 game.physics.arcade.overlap(evilNinja, player, killPlayer, null, this);
	 game.physics.arcade.overlap(boss, shuriken, killBoss, null, this);


	 
	 scoreText.x = game.camera.x;
	 scoreText.y = game.camera.y;
	 /////////////////////
	 //  KEYPRESS EVENTS /
	 /////////////////////

	 //allows arrow keypress
	 cursors = game.input.keyboard.createCursorKeys();
	 //defines space key
	 spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	 player.body.velocity.x = 0;
    ///////////////
    // EVENTS    //
    ///////////////

    if(game.time.now - timeCheck > 3000){
    	game.destroy()
    }

    if(playerHealth <= 0){
    		sendScore(score)
    		game.destroy();
    }
    ////////////////////
    // LEFT AND RIGHT //
    ////////////////////
    if (cursors.left.isDown)
    {
        //  Move to the left
        game.physics.arcade.enable(player)
        player.body.setSize(40,40,0,0)
        player.scale.setTo(-0.7,0.7)
        player.body.velocity.x = -200;
        player.animations.play('left');
        facing = "left"
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.scale.setTo(0.7,0.7)
        player.body.velocity.x = 200;
        player.animations.play('right');
        facing = "right"
    }
    else
    {
        //  Stand still
        player.animations.stop();
        player.frame = 1;
    }

    ////////////////////////
    // UP ARROW FUNCTION  //
    ////////////////////////
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.velocity.y = -250;
        jump.play();
    }
    else if (cursors.up.isDown)
    {
    	player.animations.play('up')
    	 
    }
    else if (spaceKey.isDown) 
    {
    		player.animations.play("shoot");
        fireShuriken();
    }
}






///////////////////
// FIRE SHURIKEN //
///////////////////

function fireShuriken() {
    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > shurikenTime)
    {
        //  Grab the first shuriken we can from the pool
        shuriken = shurikens.getFirstExists(false);
        if (shuriken)
        {
            //  And fire it
            shuriken.reset(player.x, player.y + 8);
           if (facing == "right"){
            shuriken.body.velocity.x = 400;
           }
           if (facing == "left"){
           	shuriken.body.velocity.x = -400;
           }
            shurikenTime = game.time.now + 400;
        }
    }
}


///////////////////
// COLLECT COINS //
///////////////////
function collectCoins (player, coin) {

    // Removes the coin from the screen
    coin.kill();
    coinsound.play();
    score += 10
    scoreText.text = "score:" + score + "   " + "Health: " + playerHealth;
    
}

////////////////
// KILL NINJA //
////////////////
function killNinja(shuriken, evilNinja){
	hit.play();
	shuriken.kill();
	evilNinja.health -= 50

	if(evilNinja.health === 0){
	evilNinja.body.velocity.x = 0;
	evilNinja.animations.add("die", [26], 1)
	evilNinja.animations.play("die", 1, false, true);
	score += 20
	scoreText.text = "score:" + score + "   " + "Health: " + playerHealth;
	 }
}


function killPlayer(player){
 if(playerHealth === 0){
 	player.kill();
 }
 playerHealth -= 1
 scoreText.text = "score:" + score + "   " + "Health: " + playerHealth;

}

function killBoss(boss){
	hit.play();
	shuriken.kill();
	bossHealth -= 3;
	scoreText.text = "score:" + score + "   " + "Health: " + playerHealth + " " +"BossHealth: " + bossHealth;

	if(bossHealth <= 0){
		boss.body.velocity.x = 0;
		boss.animations.add("bossDie", [25,25], 1);
		boss.animations.play("bossDie", 1, false, true)
		score += 1000
		scoreText.text = "score:" + score + "   " + "Health: " + playerHealth;
		winText = game.add.text(game.camera.width / 2, game.camera.height / 2, {
			font: "Copperplate",
			fill: "white",
			align: "center"
		})
		winText.fixedToCamera = true
		winText.setText("YOU WIN SONNN!!!!")
   	sendWinScore(score)
   	reallyKillBoss()
	}
}

function reallyKillBoss(){
	timeCheck = game.time.now
}



    

}




