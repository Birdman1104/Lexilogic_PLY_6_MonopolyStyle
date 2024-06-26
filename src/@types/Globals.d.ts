interface Window {
    game: any;
}

type AssetNameAndPath = {
    name: string;
    path: string;
};

declare namespace GlobalMixins {
    interface DisplayObjectEvents {
        hideComplete: [string];
        showComplete: [string];
        click: [string];
    }
}

type SpriteConfig = {
    texture: string;
    tint?: number;
    scale?: PIXI.Point;
    anchor?: PIXI.Point;
    position?: PIXI.Point;
};

type CardConfig = {
    question: string;
    answers: string[];
};
