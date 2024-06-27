import { lego } from '@armathai/lego';
import { Container, Rectangle } from 'pixi.js';
import { CARD_HEIGHT, CARD_WIDTH } from '../configs/constants';
import { BoardEvents } from '../events/MainEvents';
import { BoardModelEvents, CardModelEvents, GameModelEvents } from '../events/ModelEvents';
import { CardModel } from '../models/CardModel';
import { GameState } from '../models/GameModel';
import { Card } from './Card';

export class BoardView extends Container {
    private cards: Card[] = [];
    private activeCard: Card | null;

    constructor() {
        super();

        lego.event
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(BoardModelEvents.CardsUpdate, this.onCardsUpdate, this)
            .on(BoardModelEvents.ActiveCardUpdate, this.onActiveCardUpdate, this)
            .on(BoardModelEvents.TypedTextUpdate, this.onTypedTextUpdate, this)
            .on(CardModelEvents.AnswersRemainingUpdate, this.onAnswersRemainingUpdate, this)
            .on(CardModelEvents.InteractivityUpdate, this.onCardInteractivityUpdate, this);

        this.build();

        // drawBounds(this);
    }

    get viewName() {
        return 'BoardView';
    }

    public getCardByUuid(uuid: string): Card | undefined {
        return this.cards.find((c) => c.uuid === uuid);
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
            card.on('card_clicked', this.onCardClick);
            this.cards.push(card);
            this.addChild(card);
        });
    }

    private onCardClick(uuid): void {
        lego.event.emit(BoardEvents.CardClick, uuid);
    }

    private onCardInteractivityUpdate(newValue: boolean, oldValue: boolean, uuid: string): void {
        newValue && this.activateCard(uuid);
    }

    private activateCard(uuid: string): void {
        const card = this.getCardByUuid(uuid);
        if (!card) return;
        card.activate();
    }

    private onActiveCardUpdate(activeCard: CardModel | null): void {
        if (!activeCard) {
            this.activeCard = null;
            return;
        }
        const card = this.getCardByUuid(activeCard.uuid);
        if (!card) return;
        this.activeCard = card;
        this.activeCard.openInputArea();
    }

    private onTypedTextUpdate(text: string): void {
        this.activeCard?.setTypedText(text);
    }

    private onAnswersRemainingUpdate(newValue: number, oldValue: number, uuid: string): void {
        const card = this.getCardByUuid(uuid);
        if (!card) return;

        card.updateNumber(newValue);
    }

    private onGameStateUpdate(state: GameState): void {
        switch (state) {
            case GameState.RightAnswer:
                this.activeCard?.playRightAnswer();

                break;

            default:
                break;
        }
    }
}
