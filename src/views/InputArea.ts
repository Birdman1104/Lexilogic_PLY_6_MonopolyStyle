import anime from 'animejs';
import { Container, Sprite, Text } from 'pixi.js';
import { Images } from '../assets';
import { DEFAULT_FONT } from '../configs/GameConfig';
import { makeSprite } from '../utils';

export class InputArea extends Container {
    private bkg: Sprite;
    private typedText: Text;
    private typedTextCopy: Text;
    private indicator: Text;

    constructor() {
        super();

        this.build();
    }

    public setTypedText(text: string): void {
        this.typedText.text = text;
        this.indicator.x = this.typedText.x + this.typedText.width / 2 + (text.length === 0 ? 0 : 5);
    }

    public show(): void {
        anime({
            targets: this.scale,
            x: 1,
            y: 1,
            duration: 300,
            easing: 'easeInOutSine',
            complete: () => {
                this.indicator.visible = true;
                anime({
                    targets: this.indicator,
                    alpha: 0,
                    direction: 'alternate',
                    easing: 'linear',
                    duration: 300,
                    loop: true,
                });
            },
        });
    }

    public hide(): void {
        anime.remove(this.indicator);
        this.indicator.visible = false;
        anime({
            targets: this.scale,
            x: 0,
            y: 0,
            duration: 300,
            easing: 'easeInOutSine',
        });
    }

    public wrongAnswer(): void {
        this.typedTextCopy = new Text(this.typedText.text, {
            fontFamily: DEFAULT_FONT,
            fontSize: 32,
            fontWeight: 600,
            fill: 0xff0000,
        });
        this.typedTextCopy.position.copyFrom(this.typedText);
        this.typedTextCopy.anchor.set(0.5);
        this.typedTextCopy.alpha = 0;
        this.addChild(this.typedTextCopy);

        anime({
            targets: this.typedTextCopy,
            alpha: 1,
            easing: 'linear',
            duration: 200,
            complete: () => {
                this.typedTextCopy.destroy();
                this.typedText.text = '';
                this.emit('wrongAnimationComplete');
            },
        });
    }

    public rightAnswer(): void {
        this.typedTextCopy = new Text(this.typedText.text, {
            fontFamily: DEFAULT_FONT,
            fontSize: 32,
            fontWeight: 600,
            fill: 0x00ff00,
        });
        this.typedTextCopy.position.copyFrom(this.typedText);
        this.typedTextCopy.anchor.set(0.5);
        this.typedTextCopy.alpha = 0;
        this.addChild(this.typedTextCopy);

        anime({
            targets: this.typedTextCopy,
            alpha: 1,
            easing: 'linear',
            duration: 200,
            complete: () => {
                this.typedTextCopy.destroy();
                this.typedText.text = '';
                this.emit('rightAnimationComplete');
            },
        });
    }

    private build(): void {
        this.buildBkg();
        this.buildTypedText();
        this.buildIndicator();
        this.scale.set(0);
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: Images['game/input_area'] });
        this.bkg.anchor.set(0.5);
        this.addChild(this.bkg);
    }

    private buildTypedText(): void {
        this.typedText = new Text('', { fontFamily: DEFAULT_FONT, fontSize: 32, fontWeight: 600 });
        this.typedText.anchor.set(0.5);
        this.typedText.position.set(0, 0);
        this.bkg.addChild(this.typedText);
    }

    private buildIndicator(): void {
        this.indicator = new Text('I', { fontFamily: DEFAULT_FONT, fontSize: 48, fontWeight: 700, fill: '#999999' });
        this.indicator.anchor.set(0.5);
        this.indicator.position.set(0, 0);
        // this.indicator.visible = false;
        this.bkg.addChild(this.indicator);
    }
}
