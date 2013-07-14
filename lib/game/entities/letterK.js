ig.module(
        'game.entities.letterK'
    )
    .requires(
        'game.entities.layers',
        'impact.entity'
    )
    .defines(function(){
        var letterCode = 'K';

        EntityLetterK = ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/images/letter'+letterCode+'.png', 64, 64 ),
            size: {x: 64, y:64},
            offset: {x: 0, y: 0},
            flip: false,
            zIndex: ENTITY_LAYERS.letter,

            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'idle', 1, [0] );
            },

            check: function( other ) {
                this.receiveDamage(10, this);
                $('#main').trigger('letter-obtain', [letterCode]);
            } ,

            update: function() {
                this.parent();
            }
        });
    });
