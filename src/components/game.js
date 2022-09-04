import {useEffect, useState} from "react";
import {Card} from "./card";


export const Game = ({socket, username}) => {

    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState("");
    const [score, setScore] = useState(0);
    const [otherScore, setOtherScore] = useState(0);
    const [cards, setCards] = useState([]);
    const [opponentCardCount, setOpponentCardCount] = useState(0);
    const [opponentCards, setOpponentCards] = useState([]);

    useEffect(() => {

        socket.on("nextHand", () => {
            setCards([]);
            setOpponentCardCount(0);
            setShowResults(true);
            setOtherScore(0);
            setScore(0);
            setResults("");
            setOpponentCards([]);
        });


        socket.on('draw', (message) => {
            setCards(message)
        });

        socket.on("results", (message) => {
            setShowResults(true);
            setOtherScore(message.other);
            setScore(message.score);
            setResults(message.result);
            setOpponentCards(message.otherCards);
        });

        socket.on("opponentDraw", () => {
            setOpponentCardCount(opponentCards => opponentCards + 1);
        });

        return () => {
            socket.off("players");
            socket.off("draw");
            socket.off("results");
            socket.off("opponentDraw");
            socket.off("nextHand");
        }

    }, [username])

    const draw = () => {
        socket.emit("draw");
    }

    const stay = () => {
        socket.emit("stay");
    }

    const nextHand = () => {
        socket.emit("nextHand");
    }

    const renderOpponentCards = () => {
        if(opponentCards.length > 0) {
            return opponentCards.map(card => <Card key={card.suit + card.sign} suit={card.suit} number={card.sign}></Card>)
        } else {
            return Array.from({length: opponentCardCount}, (_, i) => <Card key={i + 1} suit={"card"} number={"back"}></Card>)
        }
    }

    const renderResultText = () => {
        if(results === 'draw') {
            return <p> It's a draw! </p>
        } else if (results === 'win' || results === 'lose') {
            return <p>You {results}!</p>
        }
    }

    const calculateHandScore = () => {
        const score = cards.sort((a, b) => a.value - b.value).reduce((acc, current) => {
            if (current.value === 11 && acc >= 11) {
                return acc + 1;
            } else {
                return acc + current.value;
            }
        }, 0);
        return <p> Your hand value: {score}</p>
    }

    return (
        <div>
            <div className="cards">
                <div>
                    {cards.length > 0 && <p>Your Cards:</p>}
                    {cards.map(card => <Card key={card.suit + card.sign} suit={card.suit} number={card.sign}></Card>)}
                </div>
                <div>
                    {opponentCardCount > 0 && <p>Opponent cards</p>}
                    {renderOpponentCards()}
                </div>
            </div>
            {results && <div className="results">
                {renderResultText()}
                <p>Your score: {score}</p>
                <p>Other score: {otherScore}</p>
            </div>}
            <div>
                {!results && calculateHandScore()}
            </div>
            <div className="buttons">
                {!results && <button onClick={() => draw()}>DRAW</button>}
                {!results && <button onClick={() => stay()}>Stay</button>}
                {results && <button onClick={() => nextHand()}>NextHand</button>}
            </div>
        </div>
    )
}
