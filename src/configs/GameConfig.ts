export const GAME_CONFIG = Object.freeze({
    HintOnIdle: 15, // Seconds
    Hint: true,
    Sound: true,

    IdleTime: 80, // Seconds. Если игрок бездействует столько секунд,игра идет в стор

    // Параметры для разных версий
    //

    // 1action
    // CardsToSolve: 1,
    // TopText: false,

    // 2action
    // CardsToSolve: 2,
    // TopText: false,

    // 3action
    CardsToSolve: 3,
    TopText: false,

    // 1action
    // CardsToSolve: 1,
    // TopText: true,

    // 2action
    // CardsToSolve: 2,
    // TopText: true,

    // 3action
    // CardsToSolve: 3,
    // TopText: true,
});

export const DEFAULT_FONT = 'Arial';
