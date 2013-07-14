ig.module(
        'game.entities.dialogwall'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityDialogwall = ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/images/spacer.gif', 5, 100 ),
            size: {x: 5, y:300},
            offset: {x: 0, y: 0},
            flip: false,
            maxVel: {x: 100, y: 200},
            friction: {x: 600, y: 0},
            accelGround: 400,
            accelAir: 200,

            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.NONE,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'idle', 0.07, [1,2] );
            },

            check: function( other ) {
               $('#main').trigger('dialog', [this.eventname]);
            } ,

            update: function() {
                this.parent();
            }
        });
    });
