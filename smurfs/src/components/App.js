import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import axios from 'axios';
import "./App.css";

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
    .get('http://localhost:3333/smurfs')
    .then(response => {
      console.log(response.data);
      updateSmurfs(response.data);
    })
    .catch(error => {
      console.log("there was an error", error)
    })
  },[])

  const updateSmurfs = smurflist => {
    dispatch({ type: "SMURF_UPDATE", payload: smurflist});
  }

  return (
    <div className="App">
      <h1>Smurf Village</h1>
      <div className="smurf-list">
        {props.smurfs.map(smurf => (
          <div key={smurf.id}>
            <h2>{smurf.name}</h2>
            <p>Age: {smurf.age}</p>
            <p>Height: {smurf.height}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  smurfs: state.smurfs,
});

export default connect(
  mapStateToProps,
)(App);