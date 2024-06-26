export const AdModelEvents = {
    StatusUpdate: 'AdModelStatusUpdate',
    CtaUpdate: 'AdModelCtaUpdate',
    SoundUpdate: 'AdModelSoundUpdate',
    HintUpdate: 'AdModelHintUpdate',
};

export const BoardModelEvents = {
    CardsUpdate: 'BoardModelCardsUpdate',
    ActiveCardUpdate: 'BoardModelActiveCardUpdate',
    TypedTextUpdate: 'BoardModelTypedTextUpdate',
};

export const CardModelEvents = { CompletedUpdate: 'CardModelCompletedUpdate' };

export const CtaModelEvents = { VisibleUpdate: 'CtaModelVisibleUpdate' };

export const GameModelEvents = {
    StateUpdate: 'GameModelStateUpdate',
    RightsUpdate: 'GameModelRightsUpdate',
    IsTutorialUpdate: 'GameModelIsTutorialUpdate',
    WrongsUpdate: 'GameModelWrongsUpdate',
    BoardUpdate: 'GameModelBoardUpdate',
};

export const HeadModelEvents = { GameModelUpdate: 'HeadModelGameModelUpdate', AdUpdate: 'HeadModelAdUpdate' };

export const HintModelEvents = { StateUpdate: 'HintModelStateUpdate', VisibleUpdate: 'HintModelVisibleUpdate' };

export const SoundModelEvents = { StateUpdate: 'SoundModelStateUpdate' };
