
export class Card {
    constructor (suit, number) {
        this.suit = suit;
        this.number = number;
    }

    show() {
        return this.number + "of" + this.suit;
    }
}
