import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Graphics, SCALE_MODES, Sprite } from 'pixi.js';
import { getForegroundGridConfig } from '../configs/gridConfigs/ForegroundViewGC';
import { AdModelEvents, GameModelEvents } from '../events/ModelEvents';
import { AdStatus } from '../models/AdModel';
import { GameState } from '../models/GameModel';
import { HintModel } from '../models/HintModel';
import { tweenToCell } from '../utils';
import { HintView } from './HintView';
import { KeyboardView } from './KeyboardView';
import { Title } from './Title';
export class ForegroundView extends PixiGrid {
    private keyboardBkg: Sprite;
    private hint: HintView | null;
    private keyboard: KeyboardView;
    private title: Title;

    constructor() {
        super();

        lego.event
            .on(AdModelEvents.StatusUpdate, this.onStatusUpdate, this)
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdateCommand, this)
            .on(AdModelEvents.HintUpdate, this.onHintUpdate, this);
    }

    get viewName(): string {
        return 'ForegroundView';
    }

    public getGridConfig(): ICellConfig {
        return getForegroundGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.buildKeyboardBkg();
        this.buildKeyboard();
        this.buildTitle();
    }

    private buildTitle(): void {
        this.title = new Title();
        this.setChild('title', this.title);
    }

    private buildKeyboardBkg(): void {
        const gr = new Graphics();
        gr.beginFill(0xd1d3d8, 1);
        gr.drawRect(0, 0, 16, 16);
        gr.endFill();
        const p1 = window.game.renderer.generateTexture(gr, SCALE_MODES.LINEAR, 72);
        gr.clear();

        this.keyboardBkg = new Sprite(p1);
        this.keyboardBkg.interactive = true;
        this.setChild('keyboard_bkg2', this.keyboardBkg);
    }

    private buildKeyboard(): void {
        this.keyboard = new KeyboardView();
        this.setChild('keyboard2', this.keyboard);
    }

    private onStatusUpdate(status: AdStatus): void {
        switch (status) {
            case AdStatus.Game:
                this.build();
                break;

            case AdStatus.PreCta:
                //
                break;

            default:
                break;
        }
    }

    private onHintUpdate(hint: HintModel | null): void {
        hint ? this.buildHint() : this.destroyHint();
    }

    private buildHint(): void {
        this.hint = new HintView();
        this.addChild(this.hint);
    }

    private destroyHint(): void {
        this.hint?.destroy();
        this.hint = null;
    }

    private onGameStateUpdateCommand(state: GameState): void {
        switch (state) {
            case GameState.Typing:
                this.showKeyboard();
                break;
            case GameState.Completed:
                this.hideKeyboard();
                break;

            default:
                break;
        }
        // card ? this.showKeyboard() : this.hideKeyboard();
    }

    public hideKeyboard(): void {
        this.keyboard.canType(false);

        tweenToCell(this, this.keyboard, 'keyboard2');
        tweenToCell(this, this.keyboardBkg, 'keyboard_bkg2');
    }

    private showKeyboard(): void {
        tweenToCell(this, this.keyboard, 'keyboard', () => {
            this.keyboard.canType(true);
        });
        tweenToCell(this, this.keyboardBkg, 'keyboard_bkg');
    }
}
