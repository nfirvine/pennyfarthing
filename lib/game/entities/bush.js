ig.module(
	'game.entities.bush'
)
.requires(
    'game.entities.layers',
	'impact.entity'
)
.defines(function(){
    EntityBush = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/images/bush.png', 128, 128 ),
        size: {x: 108, y: 108},
        offset: {x: 10, y: 10},
        flip: false,
        maxVel: {x: 100, y: 200},
        zIndex: ENTITY_LAYERS.bush,
		
		   
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
        },
		
        update: function() {
			this.parent();	
	   },
		
    });
});
