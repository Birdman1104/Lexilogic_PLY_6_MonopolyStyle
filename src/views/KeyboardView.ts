import { lego } from '@armathai/lego';
import { Container, Point } from 'pixi.js';
import { KEYBOARD_CONFIG, KEYS } from '../configs/KeyboardViewConfig';
import { KeyboardEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { getViewByProperty } from '../utils';
import { Key } from './Key';

export class KeyboardView extends Container {
    private emitEvent = false;
    private keys: Key[] = [];

    constructor() {
        super();

        lego.event.on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this);
        this.build();
    }

    get viewName() {
        return 'KeyboardView';
    }

    public getHintPosition(): Point {
        const cardsCollection = getViewByProperty('viewName', 'CardsCollection');
        const letter = cardsCollection.getHintLetter();
        const key = this.keys.find((k) => k.value.toLowerCase() === letter.toLowerCase()) || this.keys[10];

        return this.toGlobal(new Point(key.x + key.width / 2, key.y + key.height / 2));
    }

    public canType(value: boolean): void {
        this.emitEvent = value;
    }

    private build(): void {
        this.buildKeys();
    }

    private buildKeys(): void {
        KEYBOARD_CONFIG.forEach((row, i) => {
            row.forEach(({ value, x }) => {
                const key = new Key(value);
                key.position.set(x, i * 72 * 1.7);
                key.on('key_down', (value: KEYS) => this.onKeyClick(value));
                this.keys.push(key);
                this.addChild(key);
            });
        });
    }

    private onKeyClick(value: KEYS): void {
        if (this.emitEvent) {
            lego.event.emit(KeyboardEvents.KeyClicked, value);
        }
    }

    private onGameStateUpdate(state: GameState): void {
        this.emitEvent = state === GameState.Typing;
    }
}
