import { Container, Point, Sprite, Text } from 'pixi.js';
import { Images } from '../assets';
import { DEFAULT_FONT } from '../configs/GameConfig';
import { KEYS } from '../configs/KeyboardViewConfig';
import { makeSprite } from '../utils';

export class Key extends Container {
    private bkg: Sprite;

    constructor(private _value: KEYS) {
        super();

        this.buildBkg();
        this.buildLetter();
    }

    get value() {
        return KEYS[this._value];
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: Images[this.getBkgImage()], anchor: new Point(0, 0) });
        this.bkg.interactive = true;
        this.bkg.scale.set(1.5);
        this.bkg.on('pointerdown', () => this.emit('key_down', this._value));
        this.addChild(this.bkg);
    }

    private buildLetter(): void {
        if (this._value === KEYS.SPACE) return;

        let icon;
        if (this._value === KEYS.BACKSPACE || this._value === KEYS.ENTER) {
            icon = makeSprite({ texture: Images[`game/${KEYS[this._value].toLowerCase()}`] });
            icon.scale.set(1.4);
        } else if (this._value === KEYS.CLOSE) {
            icon = new Text('X', { fontFamily: DEFAULT_FONT, fontSize: 72 });
        } else {
            icon = new Text(KEYS[this._value], { fontFamily: DEFAULT_FONT, fontSize: 72 });
        }

        icon.anchor.set(0.5);
        icon.position.set(this.bkg.width / 2, this.bkg.height / 2);
        this.addChild(icon);
    }

    private getBkgImage(): string {
        switch (this._value) {
            case KEYS.ENTER:
                return 'game/enter_bkg';
            case KEYS.BACKSPACE:
            case KEYS.CLOSE:
                return 'game/backspace_bkg';
            case KEYS.SPACE:
                return 'game/space_bkg';
            default:
                return 'game/key_bkg';
        }
    }
}
