/* ====== Combat Task Dialog ====== */
// Pop up dialog that reads current player's combat stance and returns available Combat Task(s)
const actor = canvas.tokens.controlled[0].actor;
const actorId = actor.id;
const combatant = game.combat.getCombatantByActorId(actorId);
const stance = combatant.getStance().class;

const template_file = 'modules/tor2e-things-of-power/templates/TaskDialog.hbs';
const template_data = {
  combatStance: `${stance}`,
};
const rendered_html = renderTemplate(template_file, template_data);

export class TaskDialog extends Dialog {
  constructor(data, options) {
    super(data, options);
  }

  activateListeners(html) {
    super.activateListeners(html);
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: template_file,
      classes: ['tor2e-top', 'tor2e-top-dialog', 'tor2e-top-combat_tasks'],
    });
  }

  getData() {
    const data = super.getData();

    data.stance = stance;
  }
}

/* ====== INTIMIDATE FOE ====== */
// Player makes an AWE Roll
// On Success, all enemies with Might 1 are made Weary
// On 1 special success, affects Might 2 enemies
// On 2 special successes, affects all enemies
let combatStance;
let combatTasks = [];

export class CombatTasks {
  getTasks() {
    if (stance === 'Tor2eRearwardStance') {
      combatStance = 'Rearward Stance';
      combatTasks.push('Prepare Shot');
    } else if (stance === 'Tor2eForwardStance') {
      combatStance = 'Forward Stance';
      combatTasks.push('Intimidate Foe');
      combatTasks.push('Dull-witted');
    } else if (stance === 'Tor2eOpenStance') {
      combatStance = 'Open Stance';
      combatTasks.push('Rally Comrades');
    } else if (stance === 'Tor2eDefensiveStance') {
      combatStance = 'Defensive Stance';
      combatTasks.push('Protect Companion');
    }
    return combatStance, combatTasks;
  }

  getTaskDialog() {
    this.getTasks();
    const d = new TaskDialog({
      title: 'Combat Tasks',
      content: rendered_html,
      buttons: {
        execute: {
          label: 'Perform Task',
          icon: `<i class="fas fa-dice"></i>`,
          callback: () => {},
        },
      },
      render: (html) => {
        combatTasks.forEach((task) => {
          let radio = document.createElement('input');
          radio.type = 'radio';
          radio.id = task;
          radio.name = 'tasks';
          radio.value = task;

          let label = document.createElement('label');
          label.innerText = task;

          let lineBreak = document.createElement('br');

          let container = document.getElementById('taskRadios');
          container.appendChild(radio);
          container.appendChild(label);
          container.appendChild(lineBreak);
        });
      },
    });
    d.render(true);
  }
}
