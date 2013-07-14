ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/images/penny.png', 64, 128 ),
        size: {x: 42, y:108},
        offset: {x: 12, y: 12},
        flip: false,
        maxVel: {x: 100, y: 200},
        friction: {x: 600, y: 0},
        accelGround: 400,
        accelAir: 200,
        jump: 200,

        // Collision
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.addAnim( 'run', 0.25, [0,1,0,2] );
            this.addAnim( 'jump', 0.07, [3] );
            this.addAnim( 'fall', 0.07, [3] );
        },

        update: function() {
            // move left or right
            var accel = this.standing ? this.accelGround : this.accelAir;
            if( ig.input.state('left') ) {
                this.accel.x = -accel;
                this.flip = true;
            }
            else if( ig.input.state('right') ) {
                this.accel.x = accel;
                this.flip = false;
            }
            else {
                this.accel.x = 0;
            }
               // jump
            if( this.standing && ig.input.pressed('jump') ) {
                this.vel.y = -this.jump;
            }
            // move!

            // set the current animation, based on the player's speed
            if( this.vel.y < 0 ) {
                this.currentAnim = this.anims.jump;
            }
            else if( this.vel.y > 0 ) {
                this.currentAnim = this.anims.fall;
            }
            else if( this.vel.x != 0 ) {
                this.currentAnim = this.anims.run;
            }
            else {
                this.currentAnim = this.anims.idle;
            }
            this.currentAnim.flip.x = this.flip;
             
            this.parent();
        }
    });
});
