import showModal from './modal'
import { createElement } from '../../helpers/domHelper';

export function showWinnerModal(fighter) {

  const attributes = { src: fighter.source };

  const imgElement = createElement({
    tagName: 'img',
    className: '',
    attributes,
  });

  imgElement.style.backgroundColor = '#F57F17';


  let audio = new Audio();
  audio.preload = 'auto';
  audio.src = './../../../../resources/win.mp3';
  audio.play();

  showModal({ title: ` winner ${fighter.name}`, bodyElement: imgElement });
}
