import {useEffect, useState} from "react";
import {Card} from "../objects/card";

export const A = () => {

    const suits = ["H", "C", "D", "S"];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]


    const [cards, setCards] = useState([]);
    const [hand, setHand] = useState([]);

    useEffect(() => {
        smth();
    }, []);

    const smth = () => {
        let deck = []
        for (let suit of suits) {
            for (let num of numbers) {
                deck.push(new Card(suit, num));
            }
        }
        deck = deck
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
        setCards(deck);
        setHand([]);
    }

    const draw = () => {
        setHand(hand => [...hand, cards[0]]);
        setCards(cards.slice(1));
    }

    const score = () => {
        const score = hand.map(card => card.number).reduce((acc, curr) => {
                if(acc + curr > 21 && curr === 11) {
                    return acc + 1;
                } else {
                    return acc + curr;
                }
            },
            0
        );

        return (score > 21 ? "bad    "  + score : "good    "  + score)
    }

    return (
        <div>
            {cards.map(card => card.show())}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            {hand.map(card => card.show())}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={() => draw()}>Press ME!!!!</button>
            <br/>
            <button onClick={() => smth()}>Reset!!!!</button>
            <br/>
            <button onClick={() => setHand([])}>ResetHand!!!!</button>
            {score()}
        </div>
    )
}
