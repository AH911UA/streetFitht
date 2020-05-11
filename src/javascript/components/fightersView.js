import View from '../view';
import FighterView from './fighterView'
import { createFightersSelector, getFighterInfo } from './fighterSelector'

class FightersView extends View {

  selectFighters = 0;


  constructor(fighters) {
    super();

    this.handleFighterClick = createFightersSelector()//this.handleFighterClick.bind(this);
    this.createFighters(fighters);
  }

  createFighters(fighters) {

    const fighterElements = fighters.map(fighter => {
      this.fightersDetailsMap.set(fighter._id, fighter);

      const fighterView = new FighterView(fighter, this.handleFighterClick);

      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    this.element.append(...fighterElements);
  }

  fightersDetailsMap = new Map();

  onClose() { }

  handleFighterClick(event, fighterId) {
    getFighterInfo(fighterId);
  }
}

export default FightersView; 