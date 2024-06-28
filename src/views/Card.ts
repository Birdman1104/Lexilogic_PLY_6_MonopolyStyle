import anime from 'animejs';
import { Container, Sprite, Text } from 'pixi.js';
import { Images } from '../assets';
import { DEFAULT_FONT } from '../configs/GameConfig';
import { CARD_HEIGHT, CARD_WIDTH, GENERATED_TEXTURES, OFFSET_TOP } from '../configs/constants';
import { callIfExists, fitText, makeSprite } from '../utils';
import { InputArea } from './InputArea';

export class Card extends Container {
    private grayArrow: Sprite;
    private greenArrow: Sprite;
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

    public hideContent(cb?): void {
        anime({
            targets: [this.inputArea, this.number, this.bkgSelected],
            alpha: 0,
            duration: 300,
            easing: 'easeInOutSine',
            complete: () => callIfExists(cb),
        });
        anime({
            targets: this.greenArrow,
            alpha: 1,
            duration: 300,
            easing: 'easeInOutSine',
            complete: () => callIfExists(cb),
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
        this.buildArrows();
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

    private buildArrows(): void {
        if (this.config.i === 0) {
            this.buildFunctionalArrows();
        } else {
            this.hardcodeArrows();
        }
    }

    private buildFunctionalArrows(): void {
        const { x, y, scaleX, angle } = this.getArrowConfig();
        this.grayArrow = makeSprite({ texture: Images['game/arrow'] });
        this.grayArrow.tint = 0x5c5c5c;
        this.grayArrow.position.set(x, y);
        this.grayArrow.scale.set(scaleX, 1);
        this.grayArrow.angle = angle;
        this.addChild(this.grayArrow);

        this.greenArrow = makeSprite({ texture: Images['game/arrow'] });
        this.greenArrow.tint = 0x00ff00;
        this.greenArrow.position.set(x, y);
        this.greenArrow.scale.set(scaleX, 1);
        this.greenArrow.angle = angle;
        this.greenArrow.alpha = 0;
        this.addChild(this.greenArrow);
    }

    private hardcodeArrows(): void {
        const { i, j } = this.config;
        if ((i === 1 || i === 2) && j === 2) return;
        const { x, y, scaleX, angle } = this.getArrowConfig();

        const arrow = makeSprite({ texture: Images['game/arrow'] });
        arrow.tint = 0x5c5c5c;
        arrow.position.set(x, y);
        arrow.scale.set(scaleX, 1);
        arrow.angle = angle;
        this.addChild(arrow);

        if (this.config.i === 1 && this.config.j === 0) {
            const additionalArrow = makeSprite({ texture: Images['game/arrow'] });
            additionalArrow.tint = 0x5c5c5c;
            additionalArrow.position.set(90, (CARD_HEIGHT + OFFSET_TOP) / 2);
            additionalArrow.scale.set(scaleX, 1);
            additionalArrow.angle = -90;
            this.addChild(additionalArrow);
        }
    }

    private buildNumber(): void {
        this.number = new Text(this.config.answersRemaining, {
            fontFamily: DEFAULT_FONT,
            fontSize: 64,
            fontWeight: 600,
            fill: 0x9c9c9c,
        });
        this.number.anchor.set(0.5);
        this.number.position.set(0, -50);
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
            fill: 0x9c9c9c,
            align: 'center',
        });
        this.question.anchor.set(0.5);
        this.question.position.set(0, 35);
        this.addChild(this.question);

        fitText(this.question, CARD_WIDTH * 0.9, CARD_HEIGHT * 0.5);
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

    private getArrowConfig(): { x: number; y: number; scaleX: number; angle: number; quantity: number } {
        const { i, j } = this.config;
        let x = 0;
        let y = 0;
        let scaleX = 1;
        let angle = 0;
        let quantity = 1;

        if (i === 0 && j !== 2) {
            x = 155;
        } else if (j === 2 && i === 0) {
            angle = 90;
            x = -90;
            y = (CARD_HEIGHT + OFFSET_TOP) / 2;
        }

        if (i === 1 && (j === 0 || j === 1)) {
            x = 155;
            scaleX = -1;
        } else if (i === 2 && j !== 2) {
            x = 155;
        }
        // } else if (i === 2 && j === 2) {
        //     scaleX = 0;
        // }

        return { x, y, scaleX, angle, quantity };
    }
}
