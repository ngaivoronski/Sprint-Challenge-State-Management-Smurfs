import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import axios from 'axios';
import "./App.css";

function App(props) {
  const dispatch = useDispatch();

  // Get inital data
  useEffect(() => {
    axios
    .get('http://localhost:3333/smurfs')
    .then(response => {
      console.log(response.data);
      updateSmurfs(response.data);
    })
    .catch(error => {
      console.log("there was a GET error", error)
    });
  },[])

  const updateSmurfs = smurflist => {
    dispatch({ type: "SMURF_UPDATE", payload: smurflist});
  }

  const formSmurfName = event => {
    dispatch({ type: "FORM_SMURF_NAME_CHANGE", payload: event.target.value});
  }

  const formSmurfAge = event => {
    dispatch({ type: "FORM_SMURF_AGE_CHANGE", payload: event.target.value});
  }

  const formSmurfHeight = event => {
    dispatch({ type: "FORM_SMURF_HEIGHT_CHANGE", payload: event.target.value});
  }

  const submitForm = event => {
    event.preventDefault();
    console.log(props.formSmurf);
    axios.post('http://localhost:3333/smurfs', props.formSmurf)
    .then(function (response) {
      updateSmurfs(response.data);
    })
    .catch(error => {
      console.log("there was a POST error", error)
    });
  };

  const deleteSmurf = smurf => {
    axios.delete(`http://localhost:3333/smurfs/${smurf.id}`)
    .then(response => {
      updateSmurfs(response.data);
    })
    .catch(error => {
      console.log("there was a DELETE error", error)
    })
  }

  return (
    <div className="App">
      <h1>Smurf Village</h1>

      <form onSubmit={submitForm}>
        <label htmlFor="name">Smurf Name:</label>
        <input name="name" type="text" value={props.formSmurf.name} onChange={formSmurfName}></input>

        <label htmlFor="age">Smurf Age:</label>
        <input name="age" type="text" value={props.formSmurf.age} onChange={formSmurfAge}></input>

        <label htmlFor="height">Smurf Height:</label>
        <input name="height" type="text" value={props.formSmurf.height} onChange={formSmurfHeight}></input>

        <button type="submit">Add Smurf</button>

      </form>

      <div className="smurf-list">
        {props.smurfs.map(smurf => (
          <div key={smurf.id}>
            <h2>{smurf.name}</h2>
            <p>Age: {smurf.age}</p>
            <p>Height: {smurf.height}</p>
            <button onClick={() => deleteSmurf(smurf)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  smurfs: state.smurfs,
  formSmurf: state.formSmurf,
});

export default connect(
  mapStateToProps,
)(App);