ig.module(
        'game.entities.letterC'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){
        var letterCode = 'C';

        EntityLetterC = ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/images/letter'+letterCode+'.png', 64, 64 ),
            size: {x: 64, y:64},
            offset: {x: 0, y: 0},
            flip: false,
            maxVel: {x: 100, y: 200},
            friction: {x: 600, y: 0},
            accelGround: 400,
            accelAir: 200,

            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                console.log('settings', settings);
                this.addAnim( 'idle', 0.07, [1,2] );
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
