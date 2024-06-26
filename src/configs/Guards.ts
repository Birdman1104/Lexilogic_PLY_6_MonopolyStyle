import Head from '../models/HeadModel';
import { GAME_CONFIG } from './GameConfig';
import { KEYS } from './KeyboardViewConfig';

export const hintParamGuard = (): boolean => {
    return GAME_CONFIG.Hint;
};

export const hintModelGuard = (): boolean => {
    return !!Head.ad?.hint;
};

export const soundParamGuard = (): boolean => {
    return GAME_CONFIG.Sound;
};

export const soundModelGuard = (): boolean => {
    return !!Head.ad?.sound;
};

export const ctaModelGuard = (): boolean => {
    return !!Head.ad?.cta;
};

export const ctaVisibleGuard = (): boolean => {
    return !!Head.ad?.cta?.visible;
};

export const gameModelGuard = (): boolean => {
    return !!Head.gameModel;
};

export const hasActiveCardGuard = (): boolean => {
    return !!Head.gameModel?.board?.activeCard;
};

export const wrongsCountReached = (): boolean => {
    return Head.gameModel?.wrongs === GAME_CONFIG.WrongsCount;
};

export const rightsCountReached = (): boolean => {
    return Head.gameModel?.rights === GAME_CONFIG.RightsCount;
};

export const isTutorialMode = (): boolean => {
    return !!Head.gameModel?.isTutorial;
};

export const isTutorialCard = (title: string): boolean => {
    return title === GAME_CONFIG.HintOnCard;
};

export const isRightAnswerGuard = (): boolean => {
    return (
        Head.gameModel?.board?.typedText.toLowerCase() === Head.gameModel?.board?.activeCard?.rightAnswer.toLowerCase()
    );
};

export const isRightKeyGuard = (key): boolean => {
    return Head.gameModel?.board?.activeCard?.rightAnswer[0].toLowerCase() === KEYS[key].toLowerCase();
};
