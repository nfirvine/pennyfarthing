ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/images/penny.png', 64, 128 ),
        size: {x: 8, y:14},
        offset: {x: 4, y: 2},
        flip: false,
        maxVel: {x: 100, y: 200},
        friction: {x: 600, y: 0},
        accelGround: 400,
        accelAir: 200,
        jump: 200,
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.addAnim( 'run', 0.07, [1,2] );
        }

    });
});
