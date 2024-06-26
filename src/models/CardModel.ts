import { WORDS_TO_GUESS } from '../configs/constants';
import { ObservableModel } from './ObservableModel';

export class CardModel extends ObservableModel {
    private _question: string;
    private _answers: string[] = [];
    private _answersRemaining: number = WORDS_TO_GUESS;
    private _completed = false;

    constructor({ question, answers }: CardConfig, private _i: number, private _j: number) {
        super('CardModel');

        this._question = question;
        this._answers = answers;

        this.makeObservable('_completed', '_answersRemaining');
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

    get rightAnswer(): string[] {
        return this._answers;
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

    public decreaseAnswersRemaining(): void {
        this._answersRemaining -= 1;

        if (this._answersRemaining === 0) {
            this.completed = true;
        }
    }
}
