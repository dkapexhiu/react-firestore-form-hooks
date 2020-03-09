import React from "react";
import countries from "./countries";
import firebase from "firebase";
// eslint-disable-next-line no-unused-vars
import config from "./firebaseConfig";
import 'firebase/firestore';

export default function App() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);

  const handleSubmit = event => {
    console.log(`
      Email: ${email}
      Password: ${password}
      Country: ${country}
      Accepted Terms: ${acceptedTerms}
    `);

    let uid = Math.random().toString(36).substring(7);

    const db = firebase.firestore();
    const rootRef = db.collection("clients").doc(uid);

    rootRef.set({ email, password, country, acceptedTerms }).then(res => {
      alert("Data Saved");
      return {};
    }).then(success => {
        console.log('success',success);
    },
    error => {
        console.log('error',error);
    }
    );

    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Account</h1>

      <label>
        Email:
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Password:
        <input
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>

      <label>
        Country:
        <select
          name="country"
          value={country}
          onChange={e => setCountry(e.target.value)}
          required
        >
          <option key="" />
          {countries.map(country => (
            <option key={country}>{country}</option>
          ))}
        </select>
      </label>

      <label>
        <input
          name="acceptedTerms"
          type="checkbox"
          onChange={e => setAcceptedTerms(e.target.value)}
          required
        />
        I accept the terms of service
      </label>

      <button>Submit</button>
    </form>
  );
}
