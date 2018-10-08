import React from "react";
import PropTypes from "prop-types";

import "../styles/components/question.scss";

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      correct_answers: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const correctAnswer = this.props.question.correct_answer
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&shy;/g, "-")
      .replace(/&oacute;/g, "ó")
      .replace(/&rsquo;/g, "'");
    if (event.target.value === correctAnswer) {
      this.props.addCorrectAnswers(1);
    }
  }

  render() {
    const correctAnswer = this.props.question.correct_answer
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&shy;/g, "-")
      .replace(/&oacute;/g, "ó")
      .replace(/&rsquo;/g, "'");

    const incorrectAnswers = this.props.question.incorrect_answers.map(answer =>
      answer
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&shy;/g, "-")
        .replace(/&shy;/g, "-")
        .replace(/&oacute;/g, "ó")
        .replace(/&rsquo;/g, "'")
    );

    const answerArr = incorrectAnswers.concat(correctAnswer).sort();

    const question = this.props.question.question
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&shy;/g)
      .replace(/&shy;/g, "-")
      .replace(/&oacute;/g, "ó")
      .replace(/&rsquo;/g, "'");

    return (
      <div className="question">
        <h4 className="question-text">{question}</h4>
        <form>
          {answerArr.map(answer => (
            <React.Fragment>
              <input
                key={answer}
                type="radio"
                value={answer}
                name={question}
                checked={this.state.value}
                onChange={this.handleChange}
              />
              {answer}
            </React.Fragment>
          ))}
        </form>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object,
  addCorrectAnswers: PropTypes.func
};
export default Question;
