import React from 'react';
import Controls from './Controls'
import Questions from './Questions'
import '../styles/components/app.scss';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      questionArr: [],
      correct_answers: 0,
      correct_answer_scale: 0,
      rounds: 0
    }

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.addCorrectAnswers = this.addCorrectAnswers.bind(this);
    this.correctAnswerRatio = this.correctAnswerRatio.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setRounds = this.setRounds.bind(this)
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
    switch(true){
      case (scale ===10):
        console.log('Smashed it!');
        break;
      
      case (scale >= 9): 
        console.log('9');
        break;

      case (scale >= 8): 
        console.log('8');
        break;

      case (scale >= 7): 
        console.log('7');
        break;

      case (scale >= 6):
        console.log('6');
        break;
      
      case (scale >= 5):
        console.log('5');
        break;
      
      case (scale >= 4):
        console.log('4');
        break;
      
      case (scale >= 3):
        console.log('3');
        break;
      
      case (scale >= 2):
        console.log('2');
        break;

      case (scale >= 1):
        console.log('1');
        break;
      
      default:
        console.log("can't handle fractions");
        break;
    }
  }

  addCorrectAnswers(num){
    this.setState({
      correct_answers: this.state.correct_answers + num
    }, ()=> this.correctAnswerRatio())
  }


  render(){
    return (
      <div className="app">
        <header className='header'>
          <div className="header__name">Quiz Hero</div>
        </header>
        <main>
          <Controls fetchQuestions={this.fetchQuestions} setRounds={this.setRounds}/>
          <Questions addCorrectAnswers={this.addCorrectAnswers} questionArr={this.state.questionArr} />
          <button onClick={this.handleSubmit} type="submit">Submit answers</button>
        </main>
      </div>
    )
  }
}

export default App;
