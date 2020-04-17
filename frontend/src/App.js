import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      collections: [],
      title: null,
      description: null,
      url: null,
      cover: null,
    };
  }
  componentWillMount() {
    const url = "http://localhost:1337/collections";
    axios.get(url).then((data) => {
      this.setState({
        collections: data.data,
      });
    });
  }
  saveDataToAPI(e) {
    e.preventDefault();
    const apiUrl = "http://localhost:1337/collections";
    const listCollections = {
      title: this.state.title,
      description: this.state.description,
      url: this.state.url,
    };
    axios.post(apiUrl, listCollections).then((resp) => {
      let collections = this.state.collections;
      collections.push(resp.data);
      this.setState({ collections });
    });
  }
  render() {
    const { collections } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1> Tambah data Link </h1>
          <form method="post" onSubmit={(e) => this.saveDataToAPI(e)}>
            <label style={styles.space}>Title</label>
            <input
              type="text"
              name="title"
              onChange={(e) => {
                this.setState({ title: e.target.value });
              }}
            />
            <label style={styles.space}>Link</label>
            <input
              type="text"
              name="url"
              onChange={(e) => {
                this.setState({ url: e.target.value });
              }}
            />
            <label style={styles.space}>description</label>
            <textarea
              type="text"
              name="description"
              onChange={(e) => {
                this.setState({ description: e.target.value });
              }}
            />
            <br/>
            <button type="submit">Tambah</button>
            <br />

            <h1>Daftar Link</h1>
            {collections.length < 2 && <div>loading</div>}
            {this.state.collections.map((user, idx) => (
              <div key={idx}>{user.title}</div>
            ))}
          </form>
        </header>
      </div>
    );
  }
}

const styles = {
  space: {
    display: "block",
    padding: "20px",
  },
};

export default HomePage;
