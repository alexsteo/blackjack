import {useEffect, useState} from "react";
import {Card} from "./card";
import {Login} from "./login";
import {Game} from "./game";

export const MainScreen = ({socket}) => {

    const [username, setUsername] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {

        socket.onAny((event, ...args) => {
            // console.log(event, args);
        });

        socket.on("conId", (message) => {
            setId(message)
        })

        socket.on("connect_error", (err) => {
            if (err.message === "invalid username") {
                console.log(err)
            }
        });

        return () => {
            socket.off("conId");
            socket.off("connect_error");
        };
    }, [username]);

    const connect = (username) => {
        setUsername(username);
        socket.auth = {username};
        socket.connect();
    }

    const chooseScreen = () => {
        if(!!id) {
            return <Game socket={socket} username={username}></Game>
        } else {
            return <Login connect={connect}/>
        }
    }

    return (
        <div>
            {chooseScreen()}
        </div>
    )
}
