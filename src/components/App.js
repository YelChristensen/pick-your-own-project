import React from 'react';
import Controls from './Controls'
import Questions from './Questions'
import '../styles/components/app.scss';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      questionArr: [],
    }

    this.fetchQuestions = this.fetchQuestions.bind(this);
  }


  fetchQuestions(rounds, category, difficulty){
    fetch(`https://opentdb.com/api.php?amount=${rounds}&category=${category}&difficulty=${difficulty}`)
      .then(response => response.json())
      .then(body=> {
        this.setState({questionArr: body.results});
        console.log(body.results)
      })
  
  }


  render(){
    return (
      <div className="app">
        <header className='header'>
          <div className="header__name">Quiz Hero</div>
        </header>
        <main>
          <Controls fetchQuestions={this.fetchQuestions}/>
          <Questions questionArr={this.state.questionArr} />
        </main>
      </div>
    )
  }
}

export default App;
