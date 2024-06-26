import { CellScale } from '@armathai/pixi-grid';
import { lp } from '../../utils';

export const getGameViewGridConfig = () => {
    return lp(getGameViewGridLandscapeConfig, getGameViewGridPortraitConfig).call(null);
};

const getGameViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'game',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'board',
                scale: CellScale.showAll,
                bounds: { x: 0.025, y: 0.05, width: 0.95, height: 0.9 },
            },
            {
                name: 'board2',
                scale: CellScale.showAll,
                bounds: { x: 0.025, y: 0.025, width: 0.95, height: 0.55 },
            },
        ],
    };
};

const getGameViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'game',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'board',
                bounds: { x: 0.05, y: 0, width: 0.9, height: 1 },
            },
            {
                name: 'board2',
                bounds: { x: 0, y: 0.05, width: 1, height: 0.6 },
            },
        ],
    };
};
