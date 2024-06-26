import { lego } from '@armathai/lego';
import { Container, Rectangle } from 'pixi.js';
import { CARD_HEIGHT, CARD_WIDTH } from '../configs/constants';
import { BoardModelEvents } from '../events/ModelEvents';
import { CardModel } from '../models/CardModel';
import { drawBounds } from '../utils';
import { Card } from './Card';

export class BoardView extends Container {
    private cards: Card[] = [];
    constructor() {
        super();

        lego.event.on(BoardModelEvents.CardsUpdate, this.onCardsUpdate, this);
        this.build();

        drawBounds(this);
    }

    get viewName() {
        return 'BoardView';
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, CARD_WIDTH * 3, CARD_HEIGHT * 3);
    }

    public rebuild(): void {
        //
    }

    private build(): void {
        //
    }

    private onCardsUpdate(cards: CardModel[]): void {
        cards.forEach((c) => {
            const card = new Card(c);
            card.position.set(c.j * CARD_WIDTH + CARD_WIDTH / 2, c.i * CARD_HEIGHT + CARD_HEIGHT / 2);
            this.cards.push(card);
            this.addChild(card);
        });
    }
}
