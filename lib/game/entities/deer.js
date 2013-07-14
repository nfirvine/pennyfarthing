ig.module(
	'game.entities.deer'
)
.requires(
	'impact.entity'
)
.defines(function(){
    EntityDeer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/images/deer_walking.png', 192, 192 ),
        size: {x: 192, y: 192},
        offset: {x: 0, y: 0},
        flip: false,
        maxVel: {x: 100, y: 200},
        friction: {x: 600, y: 0},
        accelGround: 400,
        accelAir: 200,
        jump: 200,
		type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.addAnim( 'run', 1, [0,1] );
        },

        update: function() {
			this.vel.x = -30;	
			this.parent();
			
        },
	   handleMovementTrace: function( res ) {
		this.parent( res );
			
		// collision with a wall? return!
		if( res.collision.x ) {
			this.flip = !this.flip;
		}
	   },
		
    });
});
