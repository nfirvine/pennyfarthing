ig.module(
	'game.entities.deer'
)
.requires(
	'impact.entity'
)
.defines(function(){
    EntityDeer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/images/deer_walking.png', 192, 192 ),
        size: {x: 180, y: 180},
        offset: {x: 5, y: 5},
        flip: false,
        maxVel: {x: 100, y: 200},
        friction: {x: 600, y: 0},
        accelGround: 400,
        accelAir: 200,
        jump: 200,
		type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
		patrolTime: 5,
		patrolVel: -32,
		patrolTimer: new ig.Timer(),
		flip: false,
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.addAnim( 'run', .9, [0,1] );
			this.patrolTimer.set( this.patrolTime );	
        },
		
        update: function() {
			this.currentAnim = this.anims.run;
			this.vel.x = this.patrolVel;
			if (this.patrolTimer.delta() >= 0) {
				this.patrolVel = -this.patrolVel;
				this.flip = !this.flip;
				this.currentAnim.flip.x = this.flip;
				this.vel.x = this.patrolVel;	
				this.patrolTimer.set( this.patrolTime );				
			}
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
