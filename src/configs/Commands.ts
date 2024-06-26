import { lego } from '@armathai/lego';
import { AdStatus } from '../models/AdModel';
import { GameState } from '../models/GameModel';
import Head from '../models/HeadModel';
import { HintState } from '../models/HintModel';
import { unMapCommands } from './EventCommandPairs';
import { GAME_CONFIG } from './GameConfig';
import {
    ctaModelGuard,
    gameModelGuard,
    hintModelGuard,
    hintParamGuard,
    rightsCountReached,
    soundParamGuard,
    wrongsCountReached,
} from './Guards';
import { KEYS } from './KeyboardViewConfig';

export const initAdModelCommand = (): void => Head.initializeADModel();

export const onMainViewReadyCommand = (): void => {
    lego.command
        //
        .execute(initAdModelCommand)

        .payload(AdStatus.Game)
        .execute(setAdStatusCommand);
};

const initializeGameModelCommand = (): void => Head.initializeGameModel();
const initializeCtaModelCommand = (): void => Head.ad?.initializeCtaModel();
const initializeSoundModelCommand = (): void => Head.ad?.initializeSoundModel();
const initializeHintModelCommand = (): void => Head.ad?.initializeHintModel();
const setHintStateCommand = (state: HintState): void => Head.ad?.hint?.setState(state);
const startHintVisibilityTimerCommand = (): void => Head.ad?.hint?.startVisibilityTimer();
const stopHintVisibilityTimerCommand = (): void => Head.ad?.hint?.stopVisibilityTimer();

const initializeModelsCommand = (): void => {
    lego.command

        .execute(initializeGameModelCommand)

        .execute(initializeCtaModelCommand)

        .guard(soundParamGuard)
        .execute(initializeSoundModelCommand)

        .guard(hintParamGuard)
        .execute(initializeHintModelCommand)

        .guard(hintParamGuard)
        .execute(startHintVisibilityTimerCommand);
};

const hideHintCommand = (): void => {
    lego.command.payload(false).execute(setHintVisibleCommand);
};

const setHintVisibleCommand = (value: boolean): void => {
    Head.ad?.hint?.setVisibility(value);
};

const destroyGameModelCommand = (): void => Head.destroyGameModel();
const destroyCtaModelCommand = (): void => Head.ad?.destroyCtaModel();
const destroySoundModelCommand = (): void => Head.ad?.destroySoundModel();
const destroyHintModelCommand = (): void => Head.ad?.destroyHintModel();
const setAdStatusCommand = (status: AdStatus): void => Head.ad?.setAdStatus(status);

const shutdownModelsCommand = (): void => {
    lego.command

        .guard(gameModelGuard)
        .execute(destroyGameModelCommand)

        .guard(ctaModelGuard)
        .execute(destroyCtaModelCommand)

        .guard(soundParamGuard)
        .execute(destroySoundModelCommand)

        .guard(hintModelGuard)
        .execute(destroyHintModelCommand);
};

export const onAdStatusUpdateCommand = (status: AdStatus): void => {
    switch (status) {
        case AdStatus.Game:
            lego.command
                //
                .execute(initializeModelsCommand);

            break;
        case AdStatus.PreCta:
            lego.command
                //
                .execute(unMapCommands)

                .guard(hintModelGuard)
                .execute(destroyHintModelCommand);
            break;
        case AdStatus.Cta:
            lego.command.guard(gameModelGuard).execute(destroyGameModelCommand);

            break;
        default:
            break;
    }
};

export const onCardClickCommand = (title: string): void => {
    // if (rightsCountReached() || wrongsCountReached()) {
    //     lego.command.execute(takeToStoreCommand);
    //     return;
    // }
    // if (Head.gameModel?.state === GameState.WrongAnswer) return;

    // lego.command
    //     //
    //     .guard(isTutorialMode)
    //     .execute(turnOffTutorialModeCommand)

    //     .payload(title)
    //     .guard(isTutorialCard, () => Head.ad?.hint?.state !== HintState.Letter)
    //     .execute(hideHintCommand)

    //     .execute(clearTypedTextCommand)

    //     .payload(GameState.Typing)
    //     .execute(setGameStateCommand);

    if (title !== GAME_CONFIG.HintOnCard) {
        lego.command

            .guard(hintModelGuard)
            .execute(hideHintCommand)
            .guard(hintModelGuard)
            .execute(stopHintVisibilityTimerCommand)
            .guard(hintModelGuard)
            .execute(startHintVisibilityTimerCommand);
    }
};

// const updateTypedTextCommand = (char: string): void => Head.gameModel?.board?.updateTypedText(char);
// const setActiveCardCommand = (title: string): void => Head.gameModel?.board?.setActiveCard(title);
// const clearActiveCardCommand = (title: string): void => Head.gameModel?.board?.clearActiveCard();
// const clearTypedTextCommand = (): void => Head.gameModel?.board?.clearTypedText();
// const clearLastChar = (): void => Head.gameModel?.board?.clearLastChar();
// const increaseRightAnswersCountCommand = (): void => Head.gameModel?.increaseRightAnswersCount();
// const increaseWrongsCountCommand = (): void => Head.gameModel?.increaseWrongsCount();
// const setCardSolvedCommand = (): void => Head.gameModel?.board?.cardSolved();
const setGameStateCommand = (state: GameState): void => Head.gameModel?.setState(state);
const showCtaCommand = (): void => Head.ad?.cta?.show();

const turnOffTutorialModeCommand = (): void => Head.gameModel?.turnOffTutorialMode();

export const onKeyClickedCommand = (key: KEYS): void => {
    if (rightsCountReached() || wrongsCountReached()) {
        lego.command.execute(takeToStoreCommand);
        return;
    }
    lego.command
        .guard(hintModelGuard)
        .execute(hideHintCommand)
        .guard(hintModelGuard)
        .execute(stopHintVisibilityTimerCommand)
        .guard(hintModelGuard)
        .execute(destroyHintModelCommand)

        .payload(key)
        .execute(processKeyPress);
};

const processKeyPress = (key: KEYS): void => {
    switch (key) {
        case KEYS.SPACE:
            // lego.command
            //     //
            //     .guard(hasActiveCardGuard)
            //     .payload(' ')
            //     .execute(updateTypedTextCommand);
            break;
        case KEYS.CLOSE:
            // lego.command
            //     //
            //     .execute(clearActiveCardCommand);
            break;
        case KEYS.BACKSPACE:
            // lego.command
            //     //
            //     .guard(hasActiveCardGuard)
            //     .execute(clearLastChar);
            break;
        case KEYS.ENTER:
            // lego.command
            //     .guard(lego.not(isRightAnswerGuard))
            //     .execute(wrongAnswerDetectedCommand)

            //     .guard(isRightAnswerGuard)
            //     .execute(rightAnswerDetectedCommand);

            break;
        default:
            // lego.command
            //     //
            //     .guard(hasActiveCardGuard)
            //     .payload(KEYS[key])
            //     .execute(updateTypedTextCommand);
            break;
    }
};

export const onGameStateUpdateCommand = (state: GameState): void => {
    if (state === GameState.Typing && hintModelGuard()) {
        lego.command
            //
            .guard(hintModelGuard)
            .payload(HintState.Letter)
            .execute(setHintStateCommand)

            .guard(hintModelGuard)
            .execute(hideHintCommand)

            .guard(hintModelGuard)
            .execute(stopHintVisibilityTimerCommand)

            .guard(hintModelGuard)
            .execute(startHintVisibilityTimerCommand);
    }
};

export const resizeCommand = (): void => {
    lego.command
        //
        .guard(hintModelGuard)
        .execute(hideHintCommand)

        .guard(hintModelGuard)
        .execute(stopHintVisibilityTimerCommand)

        .guard(hintModelGuard)
        .execute(startHintVisibilityTimerCommand);
};

export const takeToStoreCommand = (): void => {
    // TODO после окончания игры все клики идут сюда
    console.warn(' TAKE ME TO STORE');
};
