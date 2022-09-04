import logo from './logo.svg';
import './App.css';
import {A} from "./components/a";
import {MainScreen} from "./components/mainscreen";
import {io} from "socket.io-client";

const socket = io("wss://blackjack-server-teo.herokuapp.com/", {autoConnect: false});
console.log(socket);

function App() {
  return (
    <div className="App">
      <MainScreen socket={socket}></MainScreen>
    </div>
  );
}

export default App;
