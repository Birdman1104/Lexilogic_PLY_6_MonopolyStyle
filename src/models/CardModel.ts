import { ObservableModel } from './ObservableModel';

export class CardModel extends ObservableModel {
    private _question: string;
    private _rightAnswers: string[] = [];
    private _completed = false;

    constructor(config: any) {
        super('CardModel');

        // this._question = config.q;
        // this._rightAnswers = config.a;

        this.makeObservable('_completed');
    }

    get question(): string {
        return this._question;
    }

    get rightAnswer(): string[] {
        return this._rightAnswers;
    }

    get completed(): boolean {
        return this._completed;
    }

    set completed(value: boolean) {
        this._completed = value;
    }
}
