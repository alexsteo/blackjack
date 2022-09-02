import {useEffect, useState} from "react";
import {Card} from "../objects/card";
import {io} from "socket.io-client";

export const MainScreen = ({socket}) => {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [message, setMessage] = useState(null);
    const [username, setUsername] = useState("");

    const [staying, setStaying] = useState(false);

    const [cards, setCards] = useState([]);
    const [opponentCards, setOpponentCards] = useState(0);

    useEffect(() => {

        socket.onAny((event, ...args) => {
            // console.log(event, args);
        });

        socket.on("nextHand", () => {
            setCards([]);
            setStaying(false);
            setOpponentCards(0);
        })

        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('msg', (message) => {
            setMessage(message);
        });

        socket.on('draw', (message) => {
            setCards(message)
        })

        socket.on("resultsw", (message) => {
            console.log("w", message)
        })

        socket.on("resultsl", (message) => {
            console.log("l", message)
        })

        socket.on("resultsd", (message) => {
            console.log("d", message)
        })

        socket.on("hello", (message) => {
            console.log("h", message)
        })

        socket.on("opponentDraw", () => {
            setOpponentCards(opponentCards => opponentCards + 1);
        })

        socket.on("connect_error", (err) => {
            if (err.message === "invalid username") {
                console.log(err)
            }
        });

        return () => {
            socket.off("opponentDraw");
        };
    }, []);

    const connect = () => {

        socket.auth = {username};
        socket.connect();
    }

    const draw = () => {
        socket.emit("draw");
    }

    const stay = () => {
        setStaying(true);
        socket.emit("stay");
    }

    const hi = () => {
        socket.emit("hi");
    }

    const nextHand = () => {
        socket.emit("nextHand");
    }

    return (
        <div>
            <br/>
            <p>opponent cards: {opponentCards}</p>
            <input value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <br/>
            <button onClick={() => connect()}>Connect</button>
            <br/>
            <button onClick={() => draw()}>DRAW</button>
            <br/>
            <button onClick={() => stay()}>Stay</button>
            <br/>
            {staying && <button onClick={() => nextHand()}>NextHand</button>}
            <br/>
            <button onClick={() => hi()}>HI</button>
            <br/>
            {cards.map(card => <p>{card.sign + " " + card.suit}</p>)}
        </div>
    )
}
