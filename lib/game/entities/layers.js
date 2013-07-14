ig.module(
    'game.entities.layers'
).defines(
    ENTITY_LAYERS = {
        letter: -500,
        bush: -400,
        enemy: -300,
        accessory: -200,
        player: -100
    },

    EntityLayers = ig.Entity.extend({})
);
