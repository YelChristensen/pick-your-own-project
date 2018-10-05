import React from 'react';
import Controls from './Controls'
import Questions from './Questions'
import cx from "classnames";
import '../styles/components/app.scss';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      questionArr: [],
      correct_answers: 0,
      correct_answer_scale: 0,
      rounds: 0,
      result: '',
      on: false
    }

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.addCorrectAnswers = this.addCorrectAnswers.bind(this);
    this.correctAnswerRatio = this.correctAnswerRatio.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setRounds = this.setRounds.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  fetchQuestions(rounds, category, difficulty){
    fetch(`https://opentdb.com/api.php?amount=${rounds}&category=${category}&difficulty=${difficulty}`)
      .then(response => response.json())
      .then(body=> {
        this.setState({questionArr: body.results});
      })
  }

  setRounds(rounds){
    this.setState({
      rounds: rounds
    })
  }

  correctAnswerRatio(){
    const scale = this.state.correct_answers / this.state.rounds * 10
    this.setState({
      correct_answer_scale: scale
    })
  }

  handleSubmit(event){
    event.preventDefault();
    this.displayResults(this.state.correct_answer_scale);
  }

  displayResults(scale){
    let result = '';
    switch(true){
      case (scale ===10):
        result = '100%';
        break;
      
      case (scale >= 9): 
        result = '90%';
        break;

      case (scale >= 8): 
        result = '80%';
        break;

      case (scale >= 7): 
        result = '70%';
        break;

      case (scale >= 6):
        result = '60%';
        break;
      
      case (scale >= 5):
        result = '50%';
        break;
      
      case (scale >= 4):
        result = '40%';
        break;
      
      case (scale >= 3):
        result = '30%';
        break;
      
      case (scale >= 2):
        result = '20%';
        break;

      case (scale >= 1):
        result = '10%';
        break;
      
      default:
        result = `0%. Oh dear!`
        break;
    }
    this.setState({
      result: `You scored ${result}. You are:`
    }, () => {console.log(`you have scored ${this.state.result}`); this.displayModal()})
  }

  addCorrectAnswers(num){
    this.setState({
      correct_answers: this.state.correct_answers + num
    }, ()=> this.correctAnswerRatio())
  }

  displayModal(){
    this.setState({
      on: !this.state.on
    })
  }

  closeModal(){
    this.setState({
      on: !this.state.on
    })
  }

  render(){
    const classes = cx('.modal', {
      'modal--active': this.state.on
    });

    return (
      <div className="app">
        <header className='header'>
          <div className="header__name">Quiz Hero</div>
        </header>
        <main>
          <section className='controls' >
            <Controls fetchQuestions={this.fetchQuestions} setRounds={this.setRounds}/>
          </section>
          <section className='questions'>
            <h3>Your Questions</h3>
            <Questions addCorrectAnswers={this.addCorrectAnswers} questionArr={this.state.questionArr} />
          </section>
          <button onClick={this.handleSubmit} type="submit">Submit answers</button>

          <div id='resultsModal' className={classes}>
              <span onClick={this.closeModal} className="close">&times;</span>
              <p>{this.state.result}</p>
          </div>

        </main>
      </div>
    )
  }
}

export default App;
