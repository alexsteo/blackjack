import {useEffect, useState} from "react";
import {Card} from "../objects/card";
import {io} from "socket.io-client";

const socket = io("ws://localhost:3001", {autoConnect: false});

export const MainScreen = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [message, setMessage] = useState(null);
    const [username, setUsername] = useState("");

    const [cards, setCards] = useState([]);

    useEffect(() => {

        socket.onAny((event, ...args) => {
            // console.log(event, args);
        });

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

        socket.on("connect_error", (err) => {
            if (err.message === "invalid username") {
                console.log(err)
            }
        });

        return () => {
            socket.off('connect');
            socket.off('message');
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
        socket.emit("stay");
    }

    const hi = () => {
        socket.emit("hi");
    }

    return (
        <div>
            <input value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <br/>
            <button onClick={() => connect()}>Connect</button>
            <br/>
            <button onClick={() => draw()}>DRAW</button>
            <br/>
            <button onClick={() => stay()}>Stay</button>
            <br/>
            <button onClick={() => hi()}>HI</button>
            <br/>
            {cards.map(card => <p>{card.number + " " + card.suit}</p>)}
        </div>
    )
}
