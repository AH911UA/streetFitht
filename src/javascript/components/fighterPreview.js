import { createElement } from '../helpers/domHelper';
import showModal from './modal/modal';
import View from './../view';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health,defense, attack etc.)
  if (fighter == undefined) return;
  try {
    const nameElement = createElement({ tagName: 'span', className: 'fighters-info' });
    nameElement.innerText = `${fighter.name}`;

    const healthElement = createElement({ tagName: 'span', className: 'fighters-info' });
    healthElement.innerText = `💊 ${fighter.health}`;
    healthElement.style.paddingLeft = '10px';

    const defenseElement = createElement({ tagName: 'span', className: 'fighters-info' });
    defenseElement.innerText = `✡ ${fighter.defense}`;

    const attackElement = createElement({ tagName: 'span', className: 'fighters-info' });
    attackElement.innerText = `🏹 ${fighter.attack}`;


    const imageElement = createFighterImage(fighter);

    fighterElement.append(nameElement, healthElement, defenseElement, attackElement, imageElement);
  }
  catch (e) { console.error(e) }
  finally { return fighterElement; }
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { src: source };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    title: name,
    alt: name,
    attributes,
  });

  return imgElement;
}
