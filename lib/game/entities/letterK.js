ig.module(
        'game.entities.letterK'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){
        var letterCode = 'K';

        EntityLetterK = ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/images/letter'+letterCode+'.png', 64, 64 ),
            size: {x: 64, y:64},
            offset: {x: 0, y: 0},
            flip: false,

            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                console.log('settings', settings);
                this.addAnim( 'idle', 0, [0,1] );
            },

            check: function( other ) {
                console.log('test');
                this.receiveDamage(10, this);
                $('#main').trigger('letter-obtain', [letterCode]);
            } ,

            update: function() {
                this.parent();
            }
        });
    });
