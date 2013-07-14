ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
    'impact.debug.debug',
    'game.entities.deer'
)
.defines(function(){
    attach = function(me, them, attachme, attachthem, flip) {
        var flipint = flip ? 1 : -1;
        var flipbit = flip ? 1 : 0;
        var at_at = me.attach[attachme][flipbit];
        var at_to = them.attach[attachthem][flipbit];
        me.pos.x = them.pos.x - them.offset.x + at_to[0] - at_at[0];
        me.pos.y = them.pos.y - them.offset.y + at_to[1] - at_at[1];
    };

    EntityHairBig = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/images/hair1.png', 32, 64),
        pivot: {x: 20, y: 20},
        collides: ig.Entity.COLLIDES.NEVER,
        attach: {
            player: [
                [25, 20],
                [32-25, 20],
            ]
        },
        init: function( x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function() {
            attach(this, this.parentent, 'player', 'hair_big', this.parentent.flip);
            this.currentAnim.flip.x = this.parentent.flip;
        }
    });

    EntityHairSmall = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/images/hair2.png', 32, 32),
        collides: ig.Entity.COLLIDES.NEVER,
        attach: {
            player: [
                [16, 18],
                [32-16, 18],
            ]
        },
        init: function( x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function() {
            attach(this, this.parentent, 'player', 'hair_small', this.parentent.flip);
            this.currentAnim.flip.x = this.parentent.flip;
 
        }
    });

    EntityScarf = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/images/scarf.png', 64, 64),
        collides: ig.Entity.COLLIDES.NEVER,
        attach: {
            player: [
                [64-18, 14],
                [18, 14],
            ]
        },
        init: function( x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function() {
            attach(this, this.parentent, 'player', 'scarf', this.parentent.flip);
            this.currentAnim.flip.x = this.parentent.flip;
        }
    });

    EntityTaser = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/images/taser.png', 64, 32),
        collides: ig.Entity.COLLIDES.NEVER,
        attach: {
            player: [
                [13, 18],
                [64-13, 18],
            ]
        },
        init: function( x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function() {
            attach(this, this.parentent, 'player', 'taser', this.parentent.flip);
            this.currentAnim.flip.x = this.parentent.flip;
        }
    });

    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/images/penny.png', 64, 128 ),
        size: {x: 42, y:108},
        offset: {x: 12, y: 12},
        flip: false,
        maxVel: {x: 50, y: 200},
        friction: {x: 600, y: 10},
        accelGround: 400,
        accelAir: 200,
        jump: 200,

        attach: {
            scarf: [
                [23, 60],
                [64-23, 60], //flipped
            ],
            hair_small: [
                [28, 5],
                [64-28,5], //flipped
            ],
            hair_big: [
                [5, 17],
                [64-5, 17], //flipped
            ],
            taser: [
                [40, 75],
                [64-40, 75],
            ]
        },

        // Collision
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.addAnim( 'run', 0.25, [1,2] );
            this.addAnim( 'jump', 0.07, [3] );
            this.addAnim( 'fall', 0.07, [3] );

            this.first_update = true;

        },

        update: function() {
            //Moved to update from init because weltmeister can't handle
            //spawnEntity
            if (this.first_update) {
                this.hair_big = ig.game.spawnEntity(EntityHairBig, this.pos.x, this.pos.y);
                this.hair_big.parentent = this;
                this.hair_big.zIndex = this.zIndex - 1;

                this.hair_small = ig.game.spawnEntity(EntityHairSmall, this.pos.x, this.pos.y);
                this.hair_small.parentent = this;
                this.hair_small.zIndex = this.zIndex - 1;

                this.scarf = ig.game.spawnEntity(EntityScarf, this.pos.x, this.pos.y);
                this.scarf.parentent = this;
                this.scarf.zIndex = this.zIndex - 1;

                this.taser = ig.game.spawnEntity(EntityTaser, this.pos.x, this.pos.y);
                this.taser.parentent = this;
                this.taser.zIndex = this.zIndex - 1;

                ig.game.sortEntitiesDeferred();
                this.first_update = false;
            }
            // move left or right
            var accel = this.standing ? this.accelGround : this.accelAir;
            if( ig.input.state('left') ) {
                this.accel.x = -accel;
                this.flip = true;
            }
            else if( ig.input.state('right') ) {
                this.accel.x = accel;
                this.flip = false;
            }
            else {
                this.accel.x = 0;
            }
               // jump
            if( this.standing && ig.input.pressed('jump') ) {
                this.vel.y = -this.jump;
            }
            // move!
            this.parent();

            // set the current animation, based on the player's speed
            if( this.vel.y < 0 ) {
                this.currentAnim = this.anims.jump;
            }
            else if( this.vel.y > 0 ) {
                this.currentAnim = this.anims.fall;
            }
            else if( this.vel.x != 0 ) {
                this.currentAnim = this.anims.run;
            }
            else {
                this.currentAnim = this.anims.idle;
            }
            this.currentAnim.flip.x = this.flip;
            this.hair_small.currentAnim.flip.x = this.flip;
            this.hair_big.currentAnim.flip.x = this.flip;
        },

        check: function(other) {
            if (other instanceof EntityDeer) {
                other.tased = true;
				other.taserTimer.set(1);
            }
        }
    });
});
