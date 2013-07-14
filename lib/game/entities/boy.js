ig.module(
	'game.entities.boy'
)
.requires(
	'impact.entity'
)
.defines(function(){
    EntityBoy = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/images/boy.png', 64, 128 ),
        size: {x: 64, y: 128},
        offset: {x: 0, y: 0},
        flip: false,
        maxVel: {x: 100, y: 200},
		
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'picking', 1, [0, 1] );
        },
		
        update: function() {
			this.currentAnim = this.anims.idle;
			this.parent();	
	   },
		
    });
});
