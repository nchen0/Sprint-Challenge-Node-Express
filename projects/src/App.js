import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import ActionProject from "./ActionProject";

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [
        {
          name: "",
          description: ""
        }
      ]
    };
  }

  componentDidMount() {
    console.log("component did mount firing");
    axios
      .get("http://localhost:8000/api/projects")
      .then(response => {
        console.log("response is: ", response);
        this.setState({ projects: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    console.log("this.state.projects is: ", this.state.projects);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">List of Projects</h1>
        </header>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              {this.state.projects.map(project => {
                return (
                  <Link to={`/project/${project.id}`}>
                    <p>{project.name}</p>
                  </Link>
                );
              })}
            </div>
          )}
        />
        <Route path="/project/:id" component={ActionProject} />
      </div>
    );
  }
}

export default App;
