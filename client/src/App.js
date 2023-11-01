import React, {useState, useEffect} from "react";
import './App.css';

function App() {
  const [message, setmessage] = useState("")

  useEffect(() => {
    fetch("/message")
      .then(res => res.json())
      .then(data => setmessage(data.message))
      // .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <h1>Message received from Node Backend!</h1>
      <div>Message: {message}</div>
    </div>
  );
}

export default App;
