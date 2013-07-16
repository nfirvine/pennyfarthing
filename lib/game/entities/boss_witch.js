ig.module(
	'game.entities.boss_witch'
)
.requires(
    'game.entities.layers',
	'impact.entity'
)
.defines(function(){
    EntityBoss_witch = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/images/boss_witch.png', 256, 256 ),
        size: {x: 226, y: 226},
        offset: {x: 15, y: 15},
        flip: false,
        maxVel: {x: 100, y: 200},
        zIndex: ENTITY_LAYERS.enemy,
		
		   
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );

            var witch = this;
            $('#main').on('bosskill', function() {
                $('#main').trigger('dialog', ['killedwitch']);
                witch.receiveDamage(100, witch);
                setTimeout(function(){
                    ig.game.getEntitiesByType(EntityBoy)[0].state = 'picking.in';
                }, 1000);
            });
        },
		
        update: function() {
			this.parent();	
	   },
		
    });
});
