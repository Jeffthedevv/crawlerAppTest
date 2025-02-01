import React, { Component } from "react";
import axios from "axios";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
     exampleMessage:"",
    };
    this.exampleMessage = this.exampleMessage.bind(this);
  }

  componentWillMount() {
    this.exampleMessage();
  }

  async exampleMessage()
  {
    const promise = await axios.get("/getexample");
    const status = promise.status;
    
    if(status===200) {
      const data = promise.data;
      this.setState({exampleMessage:data});
    }
  }

  render() {
    return(
      <div>
        <h1>Hi!</h1>
        <h4>The Example Controller Response Below: </h4>
        <p>{this.state.exampleMessage}</p>
      </div>
    )
  }
}
