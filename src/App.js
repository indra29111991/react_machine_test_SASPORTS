import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Header";
import moment from "moment";

//import playerImg from "../src/player-images/";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [Players, setPlayers] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["TName", "PFName"]);
  const [filterParam] = useState(["All"]);

  useEffect(() => {
    fetch("https://api.npoint.io/20c1afef1661881ddc9c")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);

          setPlayers(
            result.playerList.filter((imgId) => imgId?.Id !== "99690")
          );
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  function Search(Players) {
    return Players.filter((item) => {
      if (item.PFName == filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

  if (error) {
    return <>{error.message}</>;
  } else if (!isLoaded) {
    return <>loading...</>;
  } else {
    return (
      /* here we map over the element and display each item as a card  */
      <div className="wrapper">
        <Header text="N A SPORTS" />
        <div className="search-wrapper mt-4">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input form-control"
              placeholder="Search player..."
              value={q}
              /*
                                // set the value of our useState q
                                //  anytime the user types in the search box
                                */
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
        </div>
        <ul className="card-grid">
          {Search(Players).map((item) => (
            <li>
              <article className="card" key={item.TID}>
                <div className="card-image">
                  <img
                    src={require(`../src/player-images/${item.Id}.jpg`)}
                    alt={item.ShortName}
                  />
                </div>
                <div className="card-content">
                  <h4 className="card-name">{item.PFName}</h4>
                  <ol className="card-list">
                    <li>
                      Skills: <span>{item.SkillDesc}</span>
                    </li>
                    <li>
                      $ <span>{item.Value}</span>
                    </li>
                    <li>
                      UpComing Match:{" "}
                      <span>
                        {item.UpComingMatchesList[0].CCode} VS{" "}
                        {item.UpComingMatchesList[0].VsCCode}
                      </span>
                    </li>
                    <li>
                      Match Time:{" "}
                      <span>{item.UpComingMatchesList[0].MDate}</span>
                    </li>
                  </ol>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
