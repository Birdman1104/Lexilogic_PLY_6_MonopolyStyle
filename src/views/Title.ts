import { Container, Text } from 'pixi.js';
import { DEFAULT_FONT, GAME_CONFIG } from '../configs/GameConfig';
import { NORMAL_TITLE, TOP_TITLE } from '../configs/constants';

export class Title extends Container {
    private title: Text;

    constructor() {
        super();

        this.build();
    }

    private build(): void {
        const text = GAME_CONFIG.TopText ? TOP_TITLE : NORMAL_TITLE;
        this.title = new Text(text, {
            fontFamily: DEFAULT_FONT,
            fontSize: 64,
            fontWeight: 900,
        });
        this.title.anchor.set(0.5);
        this.title.position.set(this.width / 2, this.height / 2);

        // anime({
        //     targets: this.title.scale,
        //     x: 1.1,
        //     y: 1.1,
        //     duration: 300,
        //     easing: 'easeInOutSine',
        //     direction: 'alternate',
        //     loop: 4,
        // });
        this.addChild(this.title);
    }
}
