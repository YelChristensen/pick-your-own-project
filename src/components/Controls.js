import React from "react";
import PropTypes from 'prop-types';

import "../styles/components/controls.scss";

class Controls extends React.Component {
  constructor() {
    super();

    this.state = {
      rounds: "",
      category: "",
      difficulty: ""
    };

    this.handleRoundsChange = this.handleRoundsChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRoundsChange(event) {
    this.setState(
      {
        rounds: event.target.value
      },
      () => this.props.setRounds(this.state.rounds)
    );
  }

  handleCategoryChange(event) {
    switch (event.target.value) {
      case "general knowledge":
        this.setState({
          category: 9
        });
        break;

      case "science & nature":
        this.setState({
          category: 17
        });
        break;

      case "sport":
        this.setState({
          category: 21
        });
        break;

      case "geography":
        this.setState({
          category: 22
        });
        break;

      case "history":
        this.setState({
          category: 23
        });
        break;

      case "art":
        this.setState({
          category: 25
        });
        break;
    }
  }

  handleDifficultyChange(event) {
    this.setState({
      difficulty: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.fetchQuestions(
      this.state.rounds,
      this.state.category,
      this.state.difficulty
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="controls">
        <div className="controls-divs">
          <label>Number of Questions:</label>
          <select
            value={this.state.value}
            onChange={this.handleRoundsChange}
            className="rounds__list"
          >
            <option value="" />
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </div>
        <div className="controls-divs">
          <label>Select Category:</label>
          <select
            onChange={this.handleCategoryChange}
            value={this.state.value}
            className="category__list"
          >
            <option value="" />
            <option value="general knowledge">general knowledge</option>
            <option value="science & nature">science & nature</option>
            <option value="sport">sport</option>
            <option value="geography">geography</option>
            <option value="history">history</option>
            <option value="art">art</option>
          </select>
        </div>

        <div className="controls-divs">
          <label>Select Difficulty:</label>
          <select
            onChange={this.handleDifficultyChange}
            className="difficulty__list"
          >
            <option value="" />
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="difficult">difficult</option>
          </select>
        </div>

        <button id="go" type="submit">
          Go!
        </button>
      </form>
    );
  };
}

Controls.propTypes = {
    setRounds: PropTypes.func,
    fetchQuestions: PropTypes.func
}

export default Controls;
