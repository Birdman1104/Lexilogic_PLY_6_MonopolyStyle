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

export const isTutorialModeGuard = (): boolean => {
    return !!Head.gameModel?.isTutorial;
};

export const isRightAnswerGuard = (): boolean => {
    return Head.gameModel?.board?.isRightAnswer() || false;
};

export const isGuessedAnswerGuard = (): boolean => {
    return Head.gameModel?.board?.isGuessedAnswer() || false;
};

export const isRightKeyGuard = (key: KEYS | string): boolean => {
    if (key === ' ') return false;

    if (!Head.gameModel?.board) return false;
    const { activeCard, typedText } = Head.gameModel?.board;
    if (!activeCard?.hintWord[typedText.length]) return false;
    return activeCard?.hintWord[typedText.length].toLowerCase() === KEYS[key].toLowerCase();
};

export const canClickEnterGuard = (): boolean => {
    if (!Head.gameModel?.board) return false;
    const { activeCard, typedText } = Head.gameModel?.board;
    return activeCard?.hintWord.length === typedText.length;
};

export const isGameOverGuard = (): boolean => {
    return Head.gameModel?.board?.isGameOver || false;
};
