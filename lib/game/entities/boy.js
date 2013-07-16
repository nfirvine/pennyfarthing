ig.module(
	'game.entities.boy'
)
.requires(
	'impact.entity'
)
.defines(function(){
    EntityBoy = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/images/boy.png', 64, 128 ),
        size: {x: 48, y: 108},
        offset: {x: 8, y: 10},
        flip: false,
        zIndex: -1000,
        maxVel: {x: 100, y: 200},
		
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'picking', 1, [0, 1] );
        },
		
        update: function() {
            if (this.state === 'idle.in') {
                this.currentAnim = this.anims.idle;
                this.state = 'idle.loop';
            } else if (this.state === 'picking.in') {
                this.currentAnim = this.anims.picking;
                this.state = 'picking.loop';
            }
			this.parent();	
        },
		
    });
});
