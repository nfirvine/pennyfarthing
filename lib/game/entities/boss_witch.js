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
                $('#main').trigger('dialog', ['firstpickup']);
                witch.receiveDamage(100, witch);
            });
        },
		
        update: function() {
			this.parent();	
	   },
		
    });
});
