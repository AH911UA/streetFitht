import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {



  return new Promise((resolve) => {

    let pressed = new Set();


    document.addEventListener('keydown', function (event) {

      runOnKeys(firstFighter, secondFighter, event, pressed);
    });

    document.addEventListener('keyup', function (event) {
      pressed.delete(event.code);

      if (firstFighter.currentHealth <= 0) {
        resolve(secondFighter);
      }
      else if (secondFighter.currentHealth <= 0) {
        resolve(firstFighter);
      }
    });

    // resolve the promise    with the winner when fight is over
  });
}

export function getDamage(attacker, defender) {
  let damage = getHitPower(attacker) - getBlockPower(defender)
  return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
  let criticalHitChance = getRandomcriticalHitChance();
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  let dodgeChance = getRandomcriticalHitChance();
  return fighter ? fighter.defense * dodgeChance : 0;
}

function getRandomcriticalHitChance() {
  return Math.floor(Math.random() * Math.floor(2)) + 1;
}

function superKick(control, pressed) {

  for (let k of control)
    if (!pressed.has(k))
      return false;

  return true;
}

function superKickDamage(fighter) {
  return getHitPower(fighter) * 2;
}

export function runOnKeys(firstFighter, secondFighter, event, pressed) {

  pressed.add(event.code);

  if (pressed.has(controls.PlayerOneAttack) && pressed.has(controls.PlayerOneBlock)) {
    pressed.delete(controls.PlayerOneBlock);
  }

  if (pressed.has(controls.PlayerTwoAttack) && pressed.has(controls.PlayerTwoBlock)) {
    pressed.delete(controls.PlayerTwoBlock);
  }

  if (firstFighter.superKickKD && superKick(controls.PlayerOneCriticalHitCombination, pressed)) {
    secondFighter.currentHealth -= superKickDamage(firstFighter);
    showHealth(secondFighter);
    soundKick();
    showUltKD(firstFighter);
  }
  if (pressed.has(controls.PlayerOneAttack) && pressed.has(controls.PlayerTwoBlock)) {
    secondFighter.currentHealth -= getDamage(firstFighter, secondFighter);
    soundKick();
    showHealth(secondFighter);
  }
  else if (pressed.has(controls.PlayerOneAttack)) {
    secondFighter.currentHealth -= getDamage(firstFighter);
    soundKick();
    showHealth(secondFighter);
  }


  if (secondFighter.superKickKD && superKick(controls.PlayerTwoCriticalHitCombination, pressed)) {
    firstFighter.currentHealth -= superKickDamage(secondFighter);
    soundKick();
    showHealth(firstFighter);
    showUltKD(secondFighter);
  }
  if (pressed.has(controls.PlayerTwoAttack) && pressed.has(controls.PlayerOneBlock)) {
    firstFighter.currentHealth -= getDamage(secondFighter, firstFighter);
    soundKick();
    showHealth(firstFighter);
  }
  else if (pressed.has(controls.PlayerTwoAttack)) {
    firstFighter.currentHealth -= getDamage(secondFighter);
    soundKick();
    showHealth(firstFighter);
  }
}

function showUltKD(fighter) {
  fighter.elementUlt.style.width = '0%';
  fighter.superKickKD = false;

  let sec = 0;
  let kd = setInterval(() => {
    if (sec++ < 10)
      fighter.elementUlt.style.width = `${(sec) * 10}%`;
    else {
      fighter.superKickKD = true;
      clearInterval(kd);
    }
  }, 1000);
}

function showHealth(fighter) {

  let nowHealth = (fighter.currentHealth * 100) / fighter.health;
  fighter.elementHealth.style.width = `${nowHealth <= 0 ? 0 : nowHealth}%`;

  return nowHealth;
}

function soundKick() {
  let audio = new Audio();
  audio.preload = 'auto';
  audio.src = './../../../resources/kick.mp3';
  audio.play();
}