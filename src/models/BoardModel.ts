import { CardModel } from './CardModel';
import { ObservableModel } from './ObservableModel';

export class BoardModel extends ObservableModel {
    private _cards: CardModel[] = [];

    constructor() {
        super('BoardModel');

        this.makeObservable();
    }

    get cards(): (CardModel | null)[] {
        return this._cards;
    }

    set cards(value: CardModel[]) {
        this._cards = value;
    }

    public initialize(): void {
        // const tempArr: CardModel[] = [];
        // for (let i = 0; i < CARD_CONFIG.length; i++) {
        //     for (let j = 0; j < CARD_CONFIG[i].length; j++) {
        //         tempArr.push(new CardModel(CARD_CONFIG[i][j], i, j));
        //     }
        // }
        // this._cards = tempArr;
    }
}
