export const GAME_CONFIG = Object.freeze({
    HintOnIdle: 1, // Seconds
    Hint: false,

    // Параметры для разных версий
    // WrongsCount: 3, // количество допускаемых ошибок
    // RightsCount: 2, // количество правильных ответов

    // v1
    // WrongsCount: 3,
    // RightsCount: 1,

    // v2
    WrongsCount: 3,
    RightsCount: 2,

    // v3
    // WrongsCount: 3,
    // RightsCount: 3,

    HintOnCard: 'A1', // на какую карту показывать подсказку

    Sound: true,
});

export const DEFAULT_FONT = 'Arial';
