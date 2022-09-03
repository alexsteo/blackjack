import {useEffect, useState} from "react";
import {Card} from "./card";

export const MainScreen = ({socket}) => {

    const [username, setUsername] = useState("");
    const [usernameText, setUsernameText] = useState("");
    const [otherUsername, setOtherUsername] = useState("");
    const [id, setId] = useState("");

    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState("");
    const [score, setScore] = useState(0);
    const [otherScore, setOtherScore] = useState(0);

    const [cards, setCards] = useState([]);
    const [opponentCardCount, setOpponentCardCount] = useState(0);
    const [opponentCards, setOpponentCards] = useState([]);

    useEffect(() => {

        socket.onAny((event, ...args) => {
            // console.log(event, args);
        });

        socket.on("nextHand", () => {
            setCards([]);
            setOpponentCardCount(0);
            setShowResults(true);
            setOtherScore(0);
            setScore(0);
            setResults("");
            setOpponentCards([]);
        })

        socket.on("conId", (message) => {
            setId(message)
        })

        socket.on("players", (message) => {
            console.log(username, message)
            setOtherUsername(message.filter(player => player !== username)[0])
        })

        socket.on('draw', (message) => {
            setCards(message)
        })

        socket.on("results", (message) => {
            setShowResults(true);
            setOtherScore(message.other);
            setScore(message.score);
            setResults(message.result);
            setOpponentCards(message.otherCards);
        })

        socket.on("opponentDraw", () => {
            setOpponentCardCount(opponentCards => opponentCards + 1);
        })

        socket.on("connect_error", (err) => {
            if (err.message === "invalid username") {
                console.log(err)
            }
        });

        return () => {
            socket.off("nextHand");
            socket.off("conId");
            socket.off("players");
            socket.off("draw");
            socket.off("results");
            socket.off("opponentDraw");
            socket.off("connect_error");
        };
    }, []);

    const connect = () => {
        setUsername(usernameText);
        socket.auth = {username: usernameText};
        socket.connect();
    }

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
            return opponentCards.map(card => <Card suit={card.suit} number={card.sign}></Card>)
        } else {
            return Array(opponentCardCount).fill(<Card suit={"card"} number={"back"}></Card>)
        }
    }

    return (
        <div>
            {!id && <div>
                <input value={usernameText} onChange={(e) => setUsernameText(e.target.value)}></input>
                <button onClick={() => connect()}>Connect</button>
            </div>}
            {
                id && <div>
                    <div>
                        {!results && <button onClick={() => draw()}>DRAW</button>}
                        {!results && <button onClick={() => stay()}>Stay</button>}
                        {results && <button onClick={() => nextHand()}>NextHand</button>}
                    </div>
                    <div>
                        <div>
                            {cards.length > 0 && <p>Your Cards:</p>}
                            {cards.map(card => <Card suit={card.suit} number={card.sign}></Card>)}
                        </div>
                        <div>
                            {otherUsername && opponentCardCount > 0 && <p>{otherUsername}'s cards</p>}
                            {renderOpponentCards()}
                        </div>
                    </div>
                    <div>
                        <p>{results}</p>
                        <p>Your score: {score}</p>
                        <p>Other score: {otherScore}</p>
                    </div>
                </div>
            }
        </div>
    )
}
