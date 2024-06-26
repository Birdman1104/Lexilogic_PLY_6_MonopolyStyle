import { Container, Graphics, Sprite, Text } from 'pixi.js';

export class Card extends Container {
    private bkg: Sprite;
    private titleText: Text;
    private typedText: Text;
    private typedTextCopy: Text;
    private question: Text;
    private indicator: Text;
    private bkgTint: Graphics;
    private isSolved = false;

    constructor(private config) {
        super();

        this.build();
    }

    public destroy(
        options?:
            | { children?: boolean | undefined; texture?: boolean | undefined; baseTexture?: boolean | undefined }
            | undefined,
    ): void {
        super.destroy(options);
    }

    public solvedAnimation(cb?): void {
        // this.isSolved = true;
    }

    public setTypedText(text: string): void {
        // this.typedText.text = text;
        // this.indicator.x = this.typedText.x + this.typedText.width / 2 + (text.length === 0 ? 0 : 5);
    }

    public deactivate(): void {
        //
    }

    public activate(): void {
        //
    }

    private build(): void {
        this.buildBkg();
    }

    private buildBkg(): void {
        //
    }

    private buildTitle(): void {
        // this.titleText = new Text(this.config.title, { fontFamily: DEFAULT_FONT, fontSize: 32, fontWeight: 600 });
        // this.titleText.anchor.set(0.5);
        // this.titleText.position.set(0, -this.bkg.height / 2 + this.titleText.height);
        // this.bkg.addChild(this.titleText);
    }

    private buildTypedText(): void {
        // this.typedText = new Text('', { fontFamily: DEFAULT_FONT, fontSize: 32, fontWeight: 600 });
        // this.typedText.anchor.set(0.5);
        // this.typedText.position.set(0, -this.bkg.height / 2 + 85);
        // this.bkg.addChild(this.typedText);
    }

    private buildIndicator(): void {
        // this.indicator = new Text('I', { fontFamily: DEFAULT_FONT, fontSize: 48, fontWeight: 700, fill: '#999999' });
        // this.indicator.anchor.set(0.5);
        // this.indicator.position.set(0, -this.bkg.height / 2 + 85);
        // this.indicator.visible = false;
        // this.bkg.addChild(this.indicator);
    }

    private buildQuestion(): void {
        // if (!this.config.question) return;
        // this.question = new Text(this.config.question, {
        //     fontFamily: DEFAULT_FONT,
        //     fontSize: 28,
        //     fontWeight: 600,
        //     align: 'center',
        // });
        // this.question.anchor.set(0.5);
        // this.question.position.set(0, 45);
        // this.bkg.addChild(this.question);
    }
}
