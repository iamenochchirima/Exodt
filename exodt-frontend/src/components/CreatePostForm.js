import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "./constants";

class NewPostForm extends React.Component {
  state = {
    pk: 0,
    content: "",
    image: "",
  };

  componentDidMount() {
    if (this.props.post) {
      const { pk, content} = this.props.post;
      this.setState({ pk, content, image,});
    }
  }

  onChange = e => {
    this.setState({ [e.target.content]: e.target.value });
  };

  createPost = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editPost = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.post ? this.editPost : this.createPost}>
        <FormGroup>
          <Label for="content">Post:</Label>
          <Input
            type="text"
            content="content"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.content)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="image">Image:</Label>
          <Input
            type="file"
            content="file"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.image)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewPostForm;