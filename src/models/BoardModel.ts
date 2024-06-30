import { CARD_CONFIG } from '../configs/CardsConfig';
import { GAME_CONFIG } from '../configs/GameConfig';
import { KEYS } from '../configs/KeyboardViewConfig';
import { CardModel } from './CardModel';
import { ObservableModel } from './ObservableModel';

const CARDS_ORDER = [0, 1, 2, 5];

export class BoardModel extends ObservableModel {
    private _activeCard: CardModel | null;
    private _cards: CardModel[] = [];
    private _typedText = '';
    private _isGameOver = false;
    private solvedCards = 0;

    constructor() {
        super('BoardModel');

        this.makeObservable();
    }

    get activeCard(): CardModel | null {
        return this._activeCard;
    }

    set activeCard(value: CardModel | null) {
        this._activeCard = value;
    }

    get cards(): (CardModel | null)[] {
        return this._cards;
    }

    set cards(value: CardModel[]) {
        this._cards = value;
    }

    get typedText(): string {
        return this._typedText;
    }

    set typedText(value: string) {
        this._typedText = value;
    }

    get isGameOver(): boolean {
        return this._isGameOver;
    }

    set isGameOver(value: boolean) {
        this._isGameOver = value;
    }

    public getCardByUuid(uuid: string): CardModel | undefined {
        return this._cards.find((c) => c.uuid === uuid);
    }

    public isRightAnswer(): boolean {
        const typedText = this.typedText.toLowerCase();
        const guessedAnswers = this.activeCard?.guessedAnswers || [];
        const answers = this.activeCard?.rightAnswers.map((a) => a.toLowerCase()) || [];
        return answers.includes(typedText) && !guessedAnswers.includes(typedText);
    }

    public isGuessedAnswer(): boolean {
        const typedText = this.typedText.toLowerCase();
        const guessedAnswers = this.activeCard?.guessedAnswers || [];
        return guessedAnswers.includes(typedText);
    }

    public addAnswerToList(): void {
        this.activeCard?.addToGuessedAnswers(this.typedText.toLowerCase());
    }

    public updateTypedText(keyCode: string): void {
        if (this._typedText.length === 16) return;

        const char = keyCode === ' ' ? keyCode : KEYS[keyCode];

        this._typedText = `${this._typedText}${char}`;
    }

    public clearTypedText(): void {
        this._typedText = '';
    }

    public clearLastChar(): void {
        if (this._typedText.length === 0) return;
        this._typedText = this._typedText.slice(0, this._typedText.length - 1);
    }

    public setActiveCard(uuid: string): void {
        const card = this.getCardByUuid(uuid);
        if (!card) {
            this._activeCard = null;
            return;
        }

        this._activeCard = card;
    }

    public completeActiveCard(): void {
        if (!this.activeCard) return;
        this.activeCard.completed = true;
        this.solvedCards += 1;
        if (this.solvedCards >= GAME_CONFIG.CardsToSolve) {
            this._isGameOver = true;
        }
    }

    public clearActiveCard(): void {
        this._activeCard = null;
    }

    public activateNextCard(): void {
        const nextCard = this._cards[CARDS_ORDER[this.solvedCards]];
        nextCard.setInteractivity(true);
        this.clearActiveCard();
    }

    public initialize(): void {
        const tempArr: CardModel[] = [];
        for (let i = 0; i < CARD_CONFIG.length; i++) {
            for (let j = 0; j < CARD_CONFIG[i].length; j++) {
                tempArr.push(new CardModel(CARD_CONFIG[i][j], i, j));
            }
        }
        this._cards = tempArr;

        this._cards[0].setInteractivity(true);
    }
}
