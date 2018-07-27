import React from "react";
import axios from "axios";

class ActionProject extends React.Component {
  constructor() {
    super();
    this.state = {
      actions: [
        {
          description: "",
          notes: ""
        }
      ]
    };
  }
  componentDidMount() {
    let id = window.location.pathname.split("/");
    id = id[2];
    axios
      .get(`http://localhost:8000/api/projects/${id}/actions`)
      .then(response => {
        this.setState({ actions: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    console.log("this.state.actions is: ", this.state.actions);
    return (
      <div>
        {this.state.actions.map(action => {
          return (
            <div key={Math.random()}>
              <p>
                <strong>Description:</strong> {action.description}
              </p>
              <p>
                <strong>Notes:</strong> {action.notes}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ActionProject;
