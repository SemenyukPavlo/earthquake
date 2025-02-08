import { useQuery, gql, useMutation } from "@apollo/client";
import { useState } from "react";

const GET_EARTHQUAKES = gql`
  query {
    earthquakes {
      id
      location
      magnitude
      date
    }
  }
`;

const ADD_EARTHQUAKE = gql`
  mutation AddEarthquake($location: String!, $magnitude: Float!, $date: String!) {
    addEarthquake(location: $location, magnitude: $magnitude, date: $date) {
      id
      location
      magnitude
      date
    }
  }
`;

const UPDATE_EARTHQUAKE = gql`
  mutation UpdateEarthquake($id: ID!, $location: String, $magnitude: Float, $date: String) {
    updateEarthquake(id: $id, location: $location, magnitude: $magnitude, date: $date) {
      id
      location
      magnitude
      date
    }
  }
`;

const DELETE_EARTHQUAKE = gql`
  mutation DeleteEarthquake($id: ID!) {
    deleteEarthquake(id: $id)
  }
`;

export default function Home() {
  const {loading, error, data} = useQuery(GET_EARTHQUAKES);
  const [addEarthquake] = useMutation(ADD_EARTHQUAKE, {
    refetchQueries: [{query: GET_EARTHQUAKES}],
  });
  const [updateEarthquake] = useMutation(UPDATE_EARTHQUAKE, {
    refetchQueries: [{query: GET_EARTHQUAKES}],
  });
  const [deleteEarthquake] = useMutation(DELETE_EARTHQUAKE, {
    refetchQueries: [{query: GET_EARTHQUAKES}],
  });

  const [id, setId] = useState("");
  const [location, setLocation] = useState("");
  const [magnitude, setMagnitude] = useState("");
  const [date, setDate] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading earthquakes</p>;

  const editEarthquake = (quake) => {
    const date = new Date(+quake.date);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);

    setId(quake.id);
    setLocation(quake.location);
    setMagnitude(quake.magnitude);
    setDate(`${year}-${month}-${day}`);
  }

  const addEarthquakeAction = () => id ? updateEarthquake({
    variables: {
      id,
      location,
      magnitude: parseFloat(magnitude),
      date
    }
  }) : addEarthquake({
    variables: {
      location,
      magnitude: parseFloat(magnitude),
      date
    }
  });

  const clearEarthquake = () => {
    setId("");
    setLocation("");
    setMagnitude("");
    setDate("");
  }

  return (<div>
      <h2>Add Earthquake</h2>
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Location' />
      <input value={magnitude} onChange={(e) => setMagnitude(e.target.value)} placeholder='Magnitude' type='number' />
      <input value={date} onChange={(e) => setDate(e.target.value)} placeholder='Date' type='date' />
      <button onClick={addEarthquakeAction}>{!id ? "Add" : "Update"} Earthquake</button>
      {!!id && <span style={{color: "blue", cursor: "pointer"}} onClick={() => clearEarthquake()}>CLEAR</span>}

    <h1>Earthquake List</h1>
      <ul>
        {data.earthquakes.slice(0, 100).map((quake) => (<li key={quake.id}>
            {quake.location} - Magnitude: {quake.magnitude} - Date: {new Date(+quake.date).toDateString()}
          {" "}<span style={{color: "blue", cursor: "pointer"}} onClick={() => editEarthquake(quake)}>EDIT</span>
          {" "}<span style={{color: "red", cursor: "pointer"}} onClick={() => deleteEarthquake({
          variables: { id: quake.id }
        })}>DELETE</span>
          </li>))}
      </ul>
    </div>);
}
