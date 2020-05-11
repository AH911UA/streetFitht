import { createElement } from '../helpers/domHelper';
import { createFighterImage } from './fighterPreview';
import { fight } from './fight'
import { showWinnerModal } from './modal/winner';

export function renderArena(selectedFighters) {
  const root = document.getElementById('root');
  const arena = createArena(selectedFighters);

  root.innerHTML = '';
  root.append(arena);

  let [fighterLeft, fighterRight] = selectedFighters;

  let leftHealth = document.getElementById('left-fighter-indicator');
  let rightHealth = document.getElementById('right-fighter-indicator');
  fighterLeft.elementHealth = leftHealth;
  fighterRight.elementHealth = rightHealth;

  let leftUlt = document.getElementById('left-fighter-ult-indicator');
  let rightUlt = document.getElementById('right-fighter-ult-indicator');
  fighterLeft.elementUlt = leftUlt;
  fighterRight.elementUlt = rightUlt;

  fighterLeft.currentHealth = fighterLeft.health;
  fighterRight.currentHealth = fighterRight.health;

  fighterLeft.superKickKD = true;
  fighterRight.superKickKD = true;

  let winner = fight(fighterLeft, fighterRight)

  winner.then(r => showWinnerModal(r));



  // todo:
  // - start the fight
  // - when fight is finished show winner
}

function createArena(selectedFighters) {
  const arena = createElement({ tagName: 'div', className: 'arena___root' });
  const healthIndicators = createHealthIndicators(...selectedFighters);
  const fighters = createFighters(...selectedFighters);

  const ults = createUlthIndicators(...selectedFighters);

  arena.append(healthIndicators, ults, fighters);
  return arena;
}

function createHealthIndicators(leftFighter, rightFighter) {
  const healthIndicators = createElement({ tagName: 'div', className: 'arena___fight-status' });
  const versusSign = createElement({ tagName: 'div', className: 'arena___versus-sign' });
  const leftFighterIndicator = createHealthIndicator(leftFighter, 'left');
  const rightFighterIndicator = createHealthIndicator(rightFighter, 'right');

  healthIndicators.append(leftFighterIndicator, versusSign, rightFighterIndicator);
  return healthIndicators;
}

function createHealthIndicator(fighter, position) {
  const { name } = fighter;
  const container = createElement({ tagName: 'div', className: 'arena___fighter-indicator' });
  const fighterName = createElement({ tagName: 'span', className: 'arena___fighter-name' });
  const indicator = createElement({ tagName: 'div', className: 'arena___health-indicator' });
  const bar = createElement({ tagName: 'div', className: 'arena___health-bar', attributes: { id: `${position}-fighter-indicator` } });

  fighterName.innerText = name;
  indicator.append(bar);
  container.append(fighterName, indicator);

  return container;
}

function createFighters(firstFighter, secondFighter) {
  const battleField = createElement({ tagName: 'div', className: `arena___battlefield` });
  const firstFighterElement = createFighter(firstFighter, 'left');
  const secondFighterElement = createFighter(secondFighter, 'right');

  battleField.append(firstFighterElement, secondFighterElement);
  return battleField;
}

function createFighter(fighter, position) {
  const imgElement = createFighterImage(fighter);
  const positionClassName = position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
  const fighterElement = createElement({
    tagName: 'div',
    className: `arena___fighter ${positionClassName}`,
  });

  fighterElement.append(imgElement);
  return fighterElement;
}




function createUlthIndicators(leftFighter, rightFighter) {
  const ultIndicators = createElement({ tagName: 'div', className: 'arena___ult-status' });
  const leftFighterIndicator = createKDUlt('left');
  const rightFighterIndicator = createKDUlt('right');
  const versusSign = createElement({ tagName: 'div', className: 'arena___versus-sign' });
  ultIndicators.append(leftFighterIndicator, versusSign, rightFighterIndicator)
  return ultIndicators;
}

function createKDUlt(position) {
  const container = createElement({ tagName: 'div', className: 'arena___fighter-indicator' });
  const indicator = createElement({ tagName: 'div', className: 'arena___ult-indicator' });
  const bar = createElement({ tagName: 'div', className: 'arena___ult-bar', attributes: { id: `${position}-fighter-ult-indicator` } });

  indicator.append(bar);
  container.append(indicator);

  return container;
}