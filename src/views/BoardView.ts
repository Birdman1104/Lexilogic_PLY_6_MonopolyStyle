import { Container, Point, Rectangle } from 'pixi.js';
import { CARD_HEIGHT, CARD_WIDTH } from '../configs/constants';
import { lp } from '../utils';
import { CardsCollection } from './CardCollection';

export class BoardView extends Container {
    private cardsCollection: CardsCollection;
    private dragPoint: Point;
    private canDrag = true;

    constructor() {
        super();
        this.build();
    }

    get viewName() {
        return 'BoardView';
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, CARD_WIDTH * 3, CARD_HEIGHT * 2);
    }

    public rebuild(): void {
        this.cardsCollection.position.set(CARD_WIDTH * 0.25, lp(0, -CARD_HEIGHT * 0.9));
    }

    public setActiveCard(uuid: string | null): void {
        this.cardsCollection.setActiveCard(uuid);

        if (!uuid) {
            this.cardsCollection.canEmit = false;
        }
    }

    private build(): void {
        //
    }
}
