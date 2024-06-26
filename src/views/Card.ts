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

    public destroy(
        options?:
            | { children?: boolean | undefined; texture?: boolean | undefined; baseTexture?: boolean | undefined }
            | undefined,
    ): void {
        super.destroy(options);
    }

    public solvedAnimation(cb?): void {
        // this.isSolved = true;
    }

    public setTypedText(text: string): void {
        // this.typedText.text = text;
        // this.indicator.x = this.typedText.x + this.typedText.width / 2 + (text.length === 0 ? 0 : 5);
    }

    public deactivate(): void {
        //
    }

    public activate(): void {
        //
    }

    private build(): void {
        this.buildBkg();
        this.buildNumber();
        this.buildQuestion();
        this.buildInputArea();
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: Images['game/question_bkg_1'] });
        this.bkg.anchor.set(0.5, 0.5);
        this.bkg.interactive = true;
        // this.bkg.on('pointerdown', () => {
        //     if (this.isSolved) return;
        //     this.emit('card_clicked', this.config.title);
        // });
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
}
