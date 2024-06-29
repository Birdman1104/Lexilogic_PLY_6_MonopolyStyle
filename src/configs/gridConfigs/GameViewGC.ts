import { CellScale } from '@armathai/pixi-grid';
import { isNarrowScreen, isSquareLikeScreen, lp } from '../../utils';

export const getGameViewGridConfig = () => {
    return lp(getGameViewGridLandscapeConfig, getGameViewGridPortraitConfig).call(null);
};

const getGameViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };

    let boardH = 0.9;
    let boardY = 0.05;

    if (isNarrowScreen()) {
        boardH = 0.8;
        boardY = 0.1;
    }
    return {
        name: 'game',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'board',
                scale: CellScale.showAll,
                bounds: { x: 0.275, y: boardY, width: 0.7, height: boardH },
            },
        ],
    };
};

const getGameViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };

    let boardY = 0.1;

    if (isSquareLikeScreen()) {
        boardY = 0.15;
    }
    return {
        name: 'game',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'board',
                bounds: { x: 0.025, y: boardY, width: 0.95, height: 0.8 },
            },
        ],
    };
};
