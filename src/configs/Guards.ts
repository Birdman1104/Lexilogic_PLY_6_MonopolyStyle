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

export const activeCardCompleted = (): boolean => {
    return Head.gameModel?.board?.activeCard?.completed || false;
};

export const isTutorialMode = (): boolean => {
    return !!Head.gameModel?.isTutorial;
};

export const isTutorialCard = (title: string): boolean => {
    return title === GAME_CONFIG.HintOnCard;
};

export const isRightAnswerGuard = (): boolean => {
    return Head.gameModel?.board?.isRightAnswer() || false;
};

export const isGuessedAnswerGuard = (): boolean => {
    return Head.gameModel?.board?.isGuessedAnswer() || false;
};

export const isRightKeyGuard = (key): boolean => {
    return Head.gameModel?.board?.activeCard?.rightAnswers[0].toLowerCase() === KEYS[key].toLowerCase();
};
