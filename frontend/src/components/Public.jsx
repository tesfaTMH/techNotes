import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  return (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">TMH Repairs!</span>
        </h1>
      </header>

      <main className="public__main">
        <p>
          Located in Beautiful Downtown Helsinki, TMH Repairs provides a trained
          staff ready to meet your tech repair needs.
        </p>
        <address className="public__addr">
          TMH Repairs <br />
          123 street <br />
          Helsinki, 00001
          <a href="tel: +123-3456-7899">123 456-7899</a>
        </address>
        <br />
        <p>Contact Person: TMH</p>
      </main>
      <footer>
        <Link to={"/login"}>Employee Login</Link>
      </footer>
    </section>
  );
};

export default Public;
