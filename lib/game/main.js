ig.module( 
  'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.levels.prototype'
)
.defines(function(){
 
MyGame = ig.Game.extend({
	
	// Load a font
	// font: new ig.Font( 'media/04b03.font.png' ),
	init: function() {
		// Initialize your game here; bind keys etc.
        this.loadLevel(LevelPrototype);
 
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.X, 'jump');
        ig.input.bind( ig.KEY.C, 'shoot');
	},
	
	update: function() {
        //screen follows the player
        var player = this.getEntitiesByType( EntityPlayer )[0];
        if (player) {
            this.screen.x = player.pos.x - ig.system.width / 2;
            this.screen.y = player.pos.y - ig.system.height / 2;
        }
 
 
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
 
	},
 
    gravity: 300
});
 
 
// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 1280, 720, 1 );
 
});
