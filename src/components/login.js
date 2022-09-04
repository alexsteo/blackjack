import {useState} from "react";


export const Login = ({connect}) => {

    const [usernameText, setUsernameText] = useState("");

    return (<div>
        <input value={usernameText} onChange={(e) => setUsernameText(e.target.value)}></input>
        <button onClick={() => connect(usernameText)}>Connect</button>
    </div>)
}
