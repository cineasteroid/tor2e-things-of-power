Hooks.once('init', async function () {});

Hooks.once('ready', async function () {});

/* ------ SOCKETS ------ */
let socketTOP;
const TOP = 'tor2e-things-of-power';

Hooks.once('socketlib.ready', () => {
  socketTOP = socketlib.registerModule(TOP);
  socketTOP.register('intimidate-foe', functionHere);
  window.TOP = socketTOP;
});

/* ------ ADVERSARY HATE ------ */

// Check when adversaries reach 0 Hate and automatically apply Weary active effect

// Check when adversaries are no longer at 0 Hate and automatically remove Weary active effect

Hooks.on('updateActor', async (actor, data, context, userId) => {
  let actors = canvas.scene.tokens.map((t) => t.actor);
  for (let actor of actors) {
    if (actor.data.type === 'adversary' && actor.data.data.hate.value === 0) {
      actor.addStatusEffectById('weary');
    } else {
      actor.deleteStatusEffectById('weary');
    }
  }
});
