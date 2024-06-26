import { lego } from '@armathai/lego';
import { BoardEvents, KeyboardEvents, MainGameEvents, TakeMe } from '../events/MainEvents';
import { AdModelEvents, GameModelEvents } from '../events/ModelEvents';
import {
    onAdStatusUpdateCommand,
    onBoardPointerDownCommand,
    onBoardPointerUpCommand,
    onCardCheckMarkCompleteCommand,
    onCardClickCommand,
    onGameStateUpdateCommand,
    onKeyClickedCommand,
    onMainViewReadyCommand,
    onRightsUpdateCommand,
    onWrongAnimationCompleteCommand,
    onWrongsUpdateCommand,
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
        event: BoardEvents.CheckMarkAnimationComplete,
        command: onCardCheckMarkCompleteCommand,
    },
    {
        event: BoardEvents.WrongAnimationComplete,
        command: onWrongAnimationCompleteCommand,
    },
    {
        event: GameModelEvents.WrongsUpdate,
        command: onWrongsUpdateCommand,
    },
    {
        event: GameModelEvents.StateUpdate,
        command: onGameStateUpdateCommand,
    },
    {
        event: GameModelEvents.RightsUpdate,
        command: onRightsUpdateCommand,
    },
    {
        event: BoardEvents.PointerDown,
        command: onBoardPointerDownCommand,
    },
    {
        event: BoardEvents.PointerUp,
        command: onBoardPointerUpCommand,
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
