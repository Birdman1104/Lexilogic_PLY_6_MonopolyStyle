import { WORDS_TO_GUESS } from '../configs/constants';
import { difference, sample } from '../utils';
import { ObservableModel } from './ObservableModel';

export class CardModel extends ObservableModel {
    private _question: string;
    private _answers: string[] = [];
    private _answersRemaining: number = WORDS_TO_GUESS;
    private _completed = false;
    private _interactivity = false;
    private _guessedAnswers: string[] = [];
    private _hintWord: string;
    private usedHintWords: string[] = [];

    constructor({ question, answers }: CardConfig, private _i: number, private _j: number) {
        super('CardModel');

        this._question = question;
        this._answers = answers;
        this._hintWord = answers.includes('Almonds') ? 'Almonds' : sample(this._answers);

        this.makeObservable('_completed', '_answersRemaining', '_interactivity');
    }

    get i(): number {
        return this._i;
    }

    get j(): number {
        return this._j;
    }

    get question(): string {
        return this._question;
    }

    get hintWord(): string {
        return this._hintWord;
    }

    get rightAnswers(): string[] {
        return this._answers;
    }

    get guessedAnswers(): string[] {
        return this._guessedAnswers;
    }

    get answersRemaining(): number {
        return this._answersRemaining;
    }

    set answersRemaining(value: number) {
        this._answersRemaining = value;
    }

    get completed(): boolean {
        return this._completed;
    }

    set completed(value: boolean) {
        this._completed = value;
    }

    get interactivity(): boolean {
        return this._interactivity;
    }

    set interactivity(value: boolean) {
        this._interactivity = value;
    }

    public decreaseAnswersRemaining(): void {
        this._answersRemaining -= 1;
        const possibleHintWords = difference(this._answers, this.usedHintWords);
        this._hintWord = sample(possibleHintWords);
        this.usedHintWords.push(this._hintWord);
        if (this._answersRemaining === 0) {
            this.completed = true;
        }
    }

    public setInteractivity(value: boolean): void {
        this._interactivity = value;
    }

    public addToGuessedAnswers(answer: string): void {
        this._guessedAnswers.push(answer);
    }
}
