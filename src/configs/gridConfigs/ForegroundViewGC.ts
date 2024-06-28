import { CellScale } from '@armathai/pixi-grid';
import { lp } from '../../utils';

export const getForegroundGridConfig = () => {
    return lp(getForegroundGridLandscapeConfig, getForegroundGridPortraitConfig).call(null);
};

const getForegroundGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'foreground',
        // debug: { color: 0xff5027 },
        bounds,
        cells: [
            {
                name: 'title',
                bounds: { x: 0.025, y: 0.3, width: 0.3, height: 0.4 },
            },
            {
                name: 'keyboard',
                bounds: { x: 0.05, y: 0.6, width: 0.9, height: 0.39 },
            },
            {
                name: 'keyboard_bkg',
                scale: CellScale.fill,
                bounds: { x: 0, y: 0.59, width: 1, height: 0.41 },
            },
            {
                name: 'keyboard2',
                bounds: { x: 0.05, y: 1, width: 0.9, height: 0.39 },
            },
            {
                name: 'keyboard_bkg2',
                scale: CellScale.fill,
                bounds: { x: 0, y: 1, width: 1, height: 0.41 },
            },
        ],
    };
};

const getForegroundGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'foreground',
        // debug: { color: 0xff5027 },
        bounds,
        cells: [
            {
                name: 'title',
                bounds: { x: 0.05, y: 0, width: 0.9, height: 0.29 },
            },
            {
                name: 'keyboard',
                bounds: { x: 0.05, y: 0.7, width: 0.9, height: 0.29 },
            },
            {
                name: 'keyboard_bkg',
                scale: CellScale.fill,
                bounds: { x: 0, y: 0.69, width: 1, height: 0.31 },
            },
            {
                name: 'keyboard2',
                bounds: { x: 0.05, y: 1, width: 0.9, height: 0.29 },
            },
            {
                name: 'keyboard_bkg2',
                scale: CellScale.fill,
                bounds: { x: 0, y: 1, width: 1, height: 0.31 },
            },
        ],
    };
};
