import { lego } from '@armathai/lego';
import { AdStatus } from '../models/AdModel';
import { GameState } from '../models/GameModel';
import Head from '../models/HeadModel';
import { HintState } from '../models/HintModel';
import { unMapCommands } from './EventCommandPairs';
import {
    activeCardCompleted,
    canClickEnterGuard,
    ctaModelGuard,
    gameModelGuard,
    hasActiveCardGuard,
    hintModelGuard,
    hintParamGuard,
    isGameOverGuard,
    isGuessedAnswerGuard,
    isRightAnswerGuard,
    isRightKeyGuard,
    isTutorialModeGuard,
    soundParamGuard,
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
const startHintVisibilityTimerCommand = (time?: number): void => Head.ad?.hint?.startVisibilityTimer(time);
const stopHintVisibilityTimerCommand = (): void => Head.ad?.hint?.stopVisibilityTimer();

const initializeModelsCommand = (): void => {
    lego.command

        .execute(initializeGameModelCommand)

        .execute(initializeCtaModelCommand)

        .guard(soundParamGuard)
        .execute(initializeSoundModelCommand)

        .guard(hintParamGuard)
        .execute(initializeHintModelCommand)

        .guard(hintParamGuard, lego.not(isGameOverGuard))
        .payload(0.0001)
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

export const onCardClickCommand = (uuid: string): void => {
    lego.command
        //
        .guard(isGameOverGuard)
        .execute(takeToStoreCommand)

        .guard(lego.not(isGameOverGuard))
        .payload(uuid)
        .execute(setActiveCardCommand)

        .guard(lego.not(isGameOverGuard))
        .payload(GameState.Typing)
        .execute(setGameStateCommand);
};

const updateTypedTextCommand = (char: string): void => Head.gameModel?.board?.updateTypedText(char);
const setActiveCardCommand = (uuid: string): void => Head.gameModel?.board?.setActiveCard(uuid);
const clearActiveCardCommand = (title: string): void => Head.gameModel?.board?.clearActiveCard();
const clearTypedTextCommand = (): void => Head.gameModel?.board?.clearTypedText();
const clearLastChar = (): void => Head.gameModel?.board?.clearLastChar();
const decreaseRightAnswersRemainingCommand = (): void => Head.gameModel?.board?.activeCard?.decreaseAnswersRemaining();
const setGameStateCommand = (state: GameState): void => Head.gameModel?.setState(state);
const showCtaCommand = (): void => Head.ad?.cta?.show();

const turnOffTutorialModeCommand = (): void => Head.gameModel?.turnOffTutorialMode();

const completeActiveCardCommand = (): void => Head.gameModel?.board?.completeActiveCard();

export const onRightAnimationCompleteCommand = (): void => {
    lego.command

        .execute(clearTypedTextCommand)

        .guard(activeCardCompleted)
        .payload(GameState.Completed)
        .execute(setGameStateCommand)

        .guard(lego.not(activeCardCompleted))
        .payload(GameState.Typing)
        .execute(setGameStateCommand);
};

export const onWrongAnimationCompleteCommand = (): void => {
    lego.command
        .execute(clearTypedTextCommand)

        .payload(GameState.Typing)
        .execute(setGameStateCommand);
};

export const onCardCompleteAnimationCompleteCommand = (): void => {
    Head.gameModel?.board?.activateNextCard();
};

const addAnswerToGuessedListCommand = (): void => Head.gameModel?.board?.addAnswerToList();

const rightAnswerDetectedCommand = (): void => {
    lego.command
        //
        .execute(addAnswerToGuessedListCommand)
        .execute(turnOffTutorialModeCommand)
        .execute(decreaseRightAnswersRemainingCommand);
};

const wrongAnswerDetectedCommand = (): void => {
    // lego.command
    //     //
    //     .payload(GameState.WrongAnswer)
    //     .execute(setGameStateCommand);
};

export const onKeyClickedCommand = (key: KEYS): void => {
    lego.command
        //
        .payload(key)
        .guard(isTutorialModeGuard)
        .execute(tutorialKeyClickedCommand)

        .payload(key)
        .guard(lego.not(isTutorialModeGuard))
        .execute(usualKeyClickedCommand);
};

const usualKeyClickedCommand = (key: KEYS): void => {
    lego.command

        .guard(lego.not(activeCardCompleted))
        .payload(key)
        .execute(processKeyPress)

        .guard(hintModelGuard)
        .execute(hideHintCommand)
        .guard(hintModelGuard)
        .execute(stopHintVisibilityTimerCommand)

        .guard(hintModelGuard, lego.not(isGameOverGuard))
        .execute(startHintVisibilityTimerCommand);
};

const tutorialKeyClickedCommand = (key: KEYS): void => {
    lego.command

        .payload(key)
        .guard(lego.not(activeCardCompleted))
        .execute(processKeyPress)

        .guard(hintModelGuard)
        .execute(hideHintCommand)
        .guard(hintModelGuard)
        .execute(stopHintVisibilityTimerCommand)

        .guard(hintModelGuard, lego.not(isGameOverGuard))
        .payload(0.001)
        .execute(startHintVisibilityTimerCommand);
};

const processKeyPress = (key: KEYS): void => {
    switch (key) {
        case KEYS.SPACE:
            lego.command
                //
                .payload(' ')
                .guard(hasActiveCardGuard, isTutorialModeGuard, isRightKeyGuard)
                .execute(updateTypedTextCommand)
                //
                .payload(' ')
                .guard(hasActiveCardGuard, lego.not(isTutorialModeGuard))
                .execute(updateTypedTextCommand);
            break;
        case KEYS.CLOSE:
            lego.command
                //
                .execute(clearActiveCardCommand);
            break;
        case KEYS.BACKSPACE:
            lego.command
                //
                .guard(hasActiveCardGuard, lego.not(isTutorialModeGuard))
                .execute(clearLastChar);
            break;
        case KEYS.ENTER:
            lego.command
                .guard(
                    lego.not(isRightAnswerGuard),
                    isTutorialModeGuard,
                    lego.not(isGuessedAnswerGuard),
                    canClickEnterGuard,
                )
                .payload(GameState.WrongAnswer)
                .execute(setGameStateCommand)

                .guard(isRightAnswerGuard, isTutorialModeGuard, canClickEnterGuard)
                .payload(GameState.RightAnswer)
                .execute(setGameStateCommand)

                .guard(lego.not(isRightAnswerGuard), lego.not(isTutorialModeGuard), lego.not(isGuessedAnswerGuard))
                .payload(GameState.WrongAnswer)
                .execute(setGameStateCommand)

                .guard(isRightAnswerGuard, lego.not(isTutorialModeGuard))
                .payload(GameState.RightAnswer)
                .execute(setGameStateCommand);

            break;
        default:
            lego.command
                //
                .payload(key)
                .guard(hasActiveCardGuard, isTutorialModeGuard, isRightKeyGuard)
                .execute(updateTypedTextCommand)

                .payload(key)
                .guard(hasActiveCardGuard, lego.not(isTutorialModeGuard))
                .execute(updateTypedTextCommand);
            break;
    }
};

export const onGameStateUpdateCommand = (state: GameState): void => {
    switch (state) {
        case GameState.Idle:
            lego.command
                .execute(rightAnswerDetectedCommand)

                .guard(hintModelGuard)
                .execute(hideHintCommand)
                .guard(hintModelGuard)
                .execute(stopHintVisibilityTimerCommand)

                .guard(hintModelGuard, lego.not(isGameOverGuard), isTutorialModeGuard)
                .payload(0.21)
                .execute(startHintVisibilityTimerCommand)

                .guard(hintModelGuard, lego.not(isGameOverGuard), lego.not(isTutorialModeGuard))
                .execute(startHintVisibilityTimerCommand);
            break;
        case GameState.Typing:
            lego.command
                //
                .guard(hintModelGuard)
                .payload(HintState.Letter)
                .execute(setHintStateCommand)

                .guard(hintModelGuard)
                .execute(hideHintCommand)

                .guard(hintModelGuard)
                .execute(stopHintVisibilityTimerCommand)

                .guard(hintModelGuard, lego.not(isGameOverGuard), isTutorialModeGuard)
                .payload(0.21)
                .execute(startHintVisibilityTimerCommand)

                .guard(hintModelGuard, lego.not(isGameOverGuard), lego.not(isTutorialModeGuard))
                .execute(startHintVisibilityTimerCommand);
            break;
        case GameState.RightAnswer:
            lego.command
                .execute(rightAnswerDetectedCommand)

                .guard(hintModelGuard)
                .execute(hideHintCommand)
                .guard(hintModelGuard)
                .execute(stopHintVisibilityTimerCommand);
            break;
        case GameState.WrongAnswer:
            lego.command
                .execute(wrongAnswerDetectedCommand)

                .guard(hintModelGuard)
                .execute(hideHintCommand)
                .guard(hintModelGuard)
                .execute(stopHintVisibilityTimerCommand);
            break;
        case GameState.Completed:
            lego.command.execute(completeActiveCardCommand);
            //
            break;

        default:
            break;
    }
};

export const resizeCommand = (): void => {
    lego.command
        //
        .guard(hintModelGuard)
        .execute(hideHintCommand)

        .guard(hintModelGuard)
        .execute(stopHintVisibilityTimerCommand)

        .guard(hintModelGuard, lego.not(isGameOverGuard))
        .execute(startHintVisibilityTimerCommand);
};

export const takeToStoreCommand = (): void => {
    // TODO после окончания игры все клики идут сюда
    // console.warn(' TAKE ME TO STORE');
};
