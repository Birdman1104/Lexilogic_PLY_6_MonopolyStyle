import { lego } from '@armathai/lego';
import { BoardEvents, KeyboardEvents, MainGameEvents, TakeMe } from '../events/MainEvents';
import { AdModelEvents, GameModelEvents } from '../events/ModelEvents';
import {
    onAdStatusUpdateCommand,
    onCardClickCommand,
    onGameStateUpdateCommand,
    onKeyClickedCommand,
    onMainViewReadyCommand,
    onRightAnimationCompleteCommand,
    onWrongAnimationCompleteCommand,
    resizeCommand,
    takeToStoreCommand,
} from './Commands';

export const mapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.on(event, command);
    });
};

export const unMapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.off(event, command);
    });
};

const eventCommandPairs = Object.freeze([
    {
        event: MainGameEvents.MainViewReady,
        command: onMainViewReadyCommand,
    },
    {
        event: AdModelEvents.StatusUpdate,
        command: onAdStatusUpdateCommand,
    },
    {
        event: BoardEvents.CardClick,
        command: onCardClickCommand,
    },
    {
        event: KeyboardEvents.KeyClicked,
        command: onKeyClickedCommand,
    },
    {
        event: GameModelEvents.StateUpdate,
        command: onGameStateUpdateCommand,
    },
    {
        event: BoardEvents.RightAnimationComplete,
        command: onRightAnimationCompleteCommand,
    },
    {
        event: BoardEvents.WrongAnimationComplete,
        command: onWrongAnimationCompleteCommand,
    },
    {
        event: MainGameEvents.Resize,
        command: resizeCommand,
    },
    {
        event: TakeMe.ToStore,
        command: takeToStoreCommand,
    },
]);
