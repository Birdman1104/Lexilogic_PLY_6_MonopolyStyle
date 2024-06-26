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

    private build(): void {
        this.buildBkg();
        this.buildTypedText();
        this.buildIndicator();
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: Images['game/input_area'] });
        this.bkg.anchor.set(0.5);
        this.addChild(this.bkg);
    }

    private buildTypedText(): void {
        this.typedText = new Text('RNDM', { fontFamily: DEFAULT_FONT, fontSize: 32, fontWeight: 600 });
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
