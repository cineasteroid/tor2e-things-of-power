/* ------ SOCKETS ------ */
let socketTOP;
const TOP = 'tor2e-things-of-power';

Hooks.once('socketlib.ready', () => {
  socketTOP = socketlib.registerModule(TOP);
  socketTOP.register('intimidate-foe', functionHere);
  window.TOP = socketTOP;
});

/* ======================================================================== */

/* ------ ACTIVE EFFECTS ------ */

// ADVERSARY WEARY
// Adds Weary effect if any adversary begins a round of combat with zero Hate
Hooks.on('updateCombat', (combat, change) => {
  if (!change.hasOwnProperty('round')) return;
  let actors = canvas.scene.tokens.map((t) => t.actor);
  for (let actor of actors) {
    if (actor.data.type === 'adversary' && actor.data.data.hate.value === 0) {
      actor.addStatusEffectById('weary');
    }
  }
});

// Removes Weary effect if at any point Hate is no longer zero
Hooks.on('updateActor', () => {
  let actors = canvas.scene.tokens.map((t) => t.actor);
  for (let actor of actors) {
    if (actor.data.type === 'adversary' && actor.data.data.hate.value > 0) {
      actor.deleteStatusEffectById('weary');
    }
  }
});
