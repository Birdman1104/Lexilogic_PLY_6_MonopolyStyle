import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { GameModelEvents, HintModelEvents } from '../events/ModelEvents';
import { BoardModel } from '../models/BoardModel';
import { CardModel } from '../models/CardModel';
import { HintState } from '../models/HintModel';
import { BoardView } from './BoardView';

export class GameView extends PixiGrid {
    private board: BoardView;
    private hintOnCard = true;

    private elapsed = Date.now();

    constructor() {
        super();

        lego.event
            .on(GameModelEvents.BoardUpdate, this.onBoardUpdate, this)
            .on(HintModelEvents.StateUpdate, this.onHintStateUpdate, this);
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getGameViewGridConfig();
    }

    public update(): void {
        const now = Date.now();
        this.elapsed = now;
    }

    public rebuild(config?: ICellConfig | undefined): void {
        this.hintOnCard && this.board?.rebuild();
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        //
    }

    private onHintStateUpdate(state: HintState): void {
        this.hintOnCard = state !== HintState.Letter && state !== HintState.Disabled;
    }

    private onBoardUpdate(board: BoardModel | null): void {
        board ? this.buildBoard() : this.destroyBoard();
    }

    private buildBoard() {
        this.board = new BoardView();
        this.setChild('board', this.board);
    }

    private destroyBoard(): void {
        this.board.destroy();
    }

    private onActiveCardUpdate(card: CardModel): void {
        // this.board.setActiveCard(card?.uuid);
    }
}
