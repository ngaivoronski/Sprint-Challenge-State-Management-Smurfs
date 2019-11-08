import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import axios from 'axios';
import "./App.scss";

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
    if (props.editing === '') {
      axios.post('http://localhost:3333/smurfs', props.formSmurf)
      .then(function (response) {
        updateSmurfs(response.data);
      })
      .catch(error => {
        console.log("there was a POST error", error)
      });
      dispatch({ type: "RESET_FORM"});
    } else {
      axios.put(`http://localhost:3333/smurfs/${props.editing}`, props.formSmurf)
      .then(function (response) {
        updateSmurfs(response.data);
      })
      .catch(error => {
        console.log("there was a POST error", error)
      });
      dispatch({ type: "RESET_FORM"});
    }
    
  };

  const deleteSmurf = smurf => {
    axios.delete(`http://localhost:3333/smurfs/${smurf.id}`)
    .then(response => {
      updateSmurfs(response.data);
    })
    .catch(error => {
      console.log("there was a DELETE error", error)
    })
    dispatch({ type: "RESET_FORM"});
  }

  const editSmurf = smurf => {
    console.log(smurf);
    dispatch({ type: "FORM_SMURF_NAME_CHANGE", payload: smurf.name});
    dispatch({ type: "FORM_SMURF_AGE_CHANGE", payload: smurf.age});
    dispatch({ type: "FORM_SMURF_HEIGHT_CHANGE", payload: smurf.height});
    dispatch({ type: "EDIT_MODE", payload: smurf.id});
    console.log(props.editing);
  }

  useEffect(() => {
    console.log("editing:", props.editing);
  },)

  return (
    <div className="App">
      <h1>Smurf Village</h1>

      <form onSubmit={submitForm} className="smurf-form">

        <h2>Welcome! Please populate our village with Smurfs!</h2>

        <div className="input-div">
          <label htmlFor="name">Smurf Name:</label>
          <input name="name" type="text" value={props.formSmurf.name} onChange={formSmurfName}></input>
        </div>

        <div className="input-div">
          <label htmlFor="age">Smurf Age:</label>
          <input name="age" type="text" value={props.formSmurf.age} onChange={formSmurfAge}></input>
        </div>
        

        <div className="input-div">
          <label htmlFor="height">Smurf Height:</label>
          <input name="height" type="text" value={props.formSmurf.height} onChange={formSmurfHeight}></input>
        </div>

        <button type="submit">{props.editing === '' ? 'Add Smurf' : 'Edit Smurf'}</button>

      </form>

      <div className="smurf-list">
        {props.smurfs.map(smurf => (
          <div key={smurf.id} className="smurf-card">
            <h2>{smurf.name}</h2>
            <p>Age: {smurf.age}</p>
            <p>Height: {smurf.height}</p>
            <button onClick={() => editSmurf(smurf)}>Edit</button>
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
  editing: state.editing,
});

export default connect(
  mapStateToProps,
)(App);