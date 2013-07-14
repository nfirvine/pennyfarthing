ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
    EntityHairBack = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/images/hair1.png', 32, 64),
        pivot: {x: 20, y: 20},
        collides: ig.Entity.COLLIDES.NEVER,
        init: function( x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        }
    });

    EntityHairBehind = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/images/hair2.png', 32, 32),
        collides: ig.Entity.COLLIDES.NEVER,
        init: function( x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        }
    });

    EntityScarf = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/images/scarf.png', 64, 32),
        collides: ig.Entity.COLLIDES.NEVER,
        init: function( x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        }
    });

    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/images/penny.png', 64, 128 ),
        size: {x: 42, y:108},
        offset: {x: 12, y: 12},
        flip: false,
        maxVel: {x: 100, y: 200},
        friction: {x: 600, y: 10},
        accelGround: 400,
        accelAir: 200,
        jump: 200,

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
                this.hair_back = ig.game.spawnEntity(EntityHairBack, this.pos.x, this.pos.y);
                this.hair_back.zIndex = this.zIndex - 1;

                this.hair_behind = ig.game.spawnEntity(EntityHairBehind, this.pos.x, this.pos.y);
                this.hair_behind.zIndex = this.zIndex - 1;

                this.scarf = ig.game.spawnEntity(EntityScarf, this.pos.x, this.pos.y);
                this.scarf.zIndex = this.zIndex - 1;
                this.scarf.currentAnim.pivot = {x: 20, y: 20};
                this.scarf.currentAnim.angle = (135).toRad();

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

            flipint = this.flip ? 1 : -1;

            hair_back = this.hair_back;
            hair_back.pos.x = this.pos.x + 35*flipint;
            hair_back.pos.y = this.pos.y - 15;
            
            hair_behind = this.hair_behind;
            hair_behind.pos.x = this.pos.x + 5*flipint;
            hair_behind.pos.y = this.pos.y - 30;

            scarf = this.scarf;
            scarf.pos.x = this.pos.x + 15*flipint;
            scarf.pos.y = this.pos.y + 20;
            //TODO: animate scarf angle in wind
            //scarf.currentAnim.angle = ((scarf.currentAnim.angle.toDeg() + 1) % 360).toRad();

            ig.show('scarf ang', scarf.currentAnim.angle.toDeg().round());

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
            this.hair_behind.currentAnim.flip.x = this.flip;
            this.hair_back.currentAnim.flip.x = this.flip;

        }
    });
});
