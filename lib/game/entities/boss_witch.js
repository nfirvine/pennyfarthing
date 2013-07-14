ig.module(
	'game.entities.boss_witch'
)
.requires(
	'impact.entity'
)
.defines(function(){
    EntityBoss_witch = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/images/boss_witch.png', 256, 256 ),
        size: {x: 256, y: 256},
        offset: {x: 0, y: 0},
        flip: false,
        maxVel: {x: 100, y: 200},
		
		   
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
        },
		
        update: function() {
			this.parent();	
	   },
		
    });
});
