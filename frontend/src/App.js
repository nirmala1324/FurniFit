import './App.css';
import { useState, useEffect } from 'react';
import { Deploy } from './Component/Deploy/Deploy';

function App() {
  const [state, setState] = useState({})

  useEffect(() => {
    fetch("/api").then(response => {
      if(response.status === 200){
        return response.json()
      }
    }).then(data => setState(data))
    .then(error => console.log(error))
  }, []) //[] so that the fetch data only done once, if you don't use the empty array, the process fetch will be done in a loop

  return (
    <div className="App">
      {/* Set fetched data as the parameter in Deploy component*/}
      <Deploy prop={state} /> 
    </div>
  );
}

export default App;
