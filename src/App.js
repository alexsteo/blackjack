import logo from './logo.svg';
import './App.css';
import {A} from "./components/a";
import {MainScreen} from "./components/mainscreen";
import {io} from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_SERVER, {autoConnect: false});

function App() {
  return (
    <div className="App">
      <MainScreen socket={socket}></MainScreen>
    </div>
  );
}

export default App;
