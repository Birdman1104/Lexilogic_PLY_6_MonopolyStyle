import anime from 'animejs';
import { Container, Sprite, Text } from 'pixi.js';
import { DEFAULT_FONT } from '../configs/GameConfig';
import { GENERATED_TEXTURES } from '../configs/constants';
import { makeSprite } from '../utils';
import { InputArea } from './InputArea';

export class Card extends Container {
    private bkg: Sprite;
    private bkgSelected: Sprite;
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
        this.showSelectedBkg();
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
        this.number.style.fill = 0x000000;
        this.question.style.fill = 0x000000;
    }

    private build(): void {
        this.buildBkg();
        this.buildBkgCopy();
        this.buildNumber();
        this.buildQuestion();
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: GENERATED_TEXTURES.cardBkgMain });
        this.bkg.anchor.set(0.5, 0.5);
        this.bkg.on('pointerdown', () => {
            if (this.isSolved) return;
            this.emit('card_clicked', this.uuid);
        });
        this.addChild(this.bkg);
    }

    private buildBkgCopy(): void {
        this.bkgSelected = makeSprite({ texture: GENERATED_TEXTURES.cardBkgSelected });
        this.bkgSelected.anchor.set(0.5, 0.5);
        this.bkgSelected.alpha = 0;
        this.addChild(this.bkgSelected);
    }

    private buildNumber(): void {
        this.number = new Text(this.config.answersRemaining, {
            fontFamily: DEFAULT_FONT,
            fontSize: 64,
            fontWeight: 600,
            fill: 0x5c5c5c,
        });
        this.number.anchor.set(0.5);
        this.number.position.set(0, -this.bkg.height / 2 + this.number.height);
        this.addChild(this.number);
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
            fill: 0x5c5c5c,
            align: 'center',
        });
        this.question.anchor.set(0.5);
        this.question.position.set(0, 45);
        this.addChild(this.question);
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

    private showSelectedBkg(): void {
        anime({
            targets: this.bkgSelected,
            alpha: 1,
            duration: 300,
            easing: 'easeInOutSine',
        });
    }
}
