import anime from 'animejs';
import { Container, Sprite, Text } from 'pixi.js';
import { Images } from '../assets';
import { DEFAULT_FONT } from '../configs/GameConfig';
import { makeSprite } from '../utils';
import { InputArea } from './InputArea';

export class Card extends Container {
    private bkg: Sprite;
    private number: Text;
    private question: Text;
    private inputArea: InputArea;

    private isSolved = false;

    constructor(private config) {
        super();

        this.build();
    }

    get uuid(): string {
        return this.config.uuid;
    }

    public destroy(
        options?:
            | { children?: boolean | undefined; texture?: boolean | undefined; baseTexture?: boolean | undefined }
            | undefined,
    ): void {
        super.destroy(options);
    }

    public enable(): void {
        this.bkg.interactive = true;
    }

    public openInputArea(): void {
        this.buildInputArea();
        this.inputArea.show();
        this.hideQuestion();
    }

    public playRightAnswer(cb?): void {
        this.inputArea.rightAnswerAnimation(cb);
    }

    public playWrongAnswer(cb?): void {
        this.inputArea.wrongAnswerAnimation(cb);
    }

    public setTypedText(text: string): void {
        this.inputArea.setTypedText(text);
    }

    public hideContent(): void {
        anime({
            targets: [this.inputArea, this.number],
            alpha: 0,
            duration: 300,
            easing: 'easeInOutSine',
        });
    }

    public updateNumber(newNumber: number): void {
        anime({
            targets: this.number.scale,
            x: 1.2,
            y: 1.2,
            duration: 100,
            easing: 'easeInOutSine',
            complete: () => {
                this.number.scale.set(1);
                this.number.text = `${newNumber}`;
            },
        });
    }

    public activate(): void {
        this.bkg.interactive = true;
    }

    private build(): void {
        this.buildBkg();
        this.buildNumber();
        this.buildQuestion();
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: Images['game/question_bkg_1'] });
        this.bkg.anchor.set(0.5, 0.5);
        this.bkg.on('pointerdown', () => {
            if (this.isSolved) return;
            this.emit('card_clicked', this.uuid);
        });
        this.addChild(this.bkg);
    }

    private buildNumber(): void {
        this.number = new Text(this.config.answersRemaining, {
            fontFamily: DEFAULT_FONT,
            fontSize: 64,
            fontWeight: 600,
        });
        this.number.anchor.set(0.5);
        this.number.position.set(0, -this.bkg.height / 2 + this.number.height);
        this.bkg.addChild(this.number);
    }

    private buildInputArea(): void {
        this.inputArea = new InputArea();
        this.inputArea.position.set(0, 45);
        this.addChild(this.inputArea);
    }

    private buildQuestion(): void {
        this.question = new Text(this.config.question, {
            fontFamily: DEFAULT_FONT,
            fontSize: 48,
            fontWeight: 600,
            align: 'center',
        });
        this.question.anchor.set(0.5);
        this.question.position.set(0, 45);
        this.bkg.addChild(this.question);
    }

    private hideQuestion(): void {
        anime({
            targets: this.question.scale,
            x: 0,
            y: 0,
            duration: 300,
            easing: 'easeInOutSine',
            complete: () => {
                this.question.visible = false;
            },
        });
    }
}
