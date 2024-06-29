import { Container, Text } from 'pixi.js';
import { DEFAULT_FONT } from '../configs/GameConfig';

export class Title extends Container {
    private title: Text;

    constructor() {
        super();

        this.build();
    }

    private build(): void {
        this.title = new Text('Name 5 Game!', {
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
