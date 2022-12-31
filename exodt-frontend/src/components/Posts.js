import React, { Component } from "react";

import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.resetState();
  }

  getPosts = () => {
    axios.get(API_URL).then(res => this.setState({ posts: res.data }));
  };

  resetState = () => {
    this.getPosts();
  };

  render() {
    return (
        students={this.state.students}
      <h1>Posts load</h1>
    );
  }
}

export default Posts;