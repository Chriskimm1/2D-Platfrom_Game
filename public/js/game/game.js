var game = new Phaser.Game(1200, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;
var map;
var shurikenTime = 0;

//loads up all the images and sprites
function preload() {
game.load.tilemap("levelone", "js/assets/graveyard.json", null, Phaser.Tilemap.TILED_JSON);
/*game.load.image("background", "js/assets/background.png");*/
game.load.image("tiles", "js/assets/Graveyard.png");
game.load.spritesheet("dude", "js/assets/dude.png", 58, 80);
game.load.image("shuriken", "js/assets/shuriken.png");
game.load.spritesheet("baddude", "js/assets/badguy.png" 48,48);

}
//defining platfrom

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    map = game.add.tilemap("levelone");
    map.addTilesetImage("Graveyard", "tiles");
    /*map.setCollistion(0);*/

    bgLayer = map.createLayer("sky")
   	bgLayer.resizeWorld();
    collide = map.createLayer("collide")
    collide.resizeWorld();
    spike = map.createLayer("spikes")
    spike.resizeWorld();
    map.setCollisionBetween(0,280, true, collide)


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

    // two animations, walking left and right.
    player.animations.add('left', [4, 8, 11, 3], 16, true);
    player.animations.add('right', [4, 8, 11, 3], 16, true);
    player.animations.add('up', [1], 1, true);
}


function update() {
	 game.physics.arcade.collide(player, collide);
	 cursors = game.input.keyboard.createCursorKeys();
	 player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        game.physics.arcade.enable(player)
        player.body.setSize(40,40,0,0)
        player.scale.setTo(-0.7,0.7)
        player.body.velocity.x = -130;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.scale.setTo(0.7,0.7)
        player.body.velocity.x = 130;
        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();
        player.frame = 1;
    }
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.velocity.y = -210;
    }
    else if (cursors.up.isDown)
    {
    	player.animations.play('up')
    }
}