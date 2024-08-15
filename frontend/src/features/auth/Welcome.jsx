import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
  return (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome</h1>
      <p>
        <Link to={"/tmh/notes"}>View techNotes</Link>
      </p>
      <p>
        <Link to={"/tmh/users"}>View User Settings</Link>
      </p>
    </section>
  );
};

export default Welcome;
