import React from "react";

class Controls extends React.Component {
    constructor(){
        super();
        
        this.state = {
            rounds:'',
            category:'',
            difficulty: ''
        }

        this.handleRoundsChange=this.handleRoundsChange.bind(this);
        this.handleCategoryChange=this.handleCategoryChange.bind(this);
        this.handleDifficultyChange=this.handleDifficultyChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }


    handleRoundsChange(event){
        this.setState({
            rounds: event.target.value
        }, () => console.log(this.state.rounds))
    }

    handleCategoryChange(event){
        switch(event.target.value){
            case 'general knowledge':
                this.setState({
                    category: 9
                });
                break;
            
            case 'science & nature':
                this.setState({
                    category: 17
                });
                break;

            case 'sport':
                this.setState({
                    category: 21
                });
                break;
                
            case 'geography':
                this.setState({
                    category: 22
                });
                break;

            case 'history':
                this.setState({
                    category: 23
                });
                break;

            case 'art':
                this.setState({
                    category: 25
                });
                break;
        }
        console.log(this.state.category)
    }

    handleDifficultyChange(event){
        this.setState({
            difficulty: event.target.value
        }, () => console.log(this.state.difficulty))
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.fetchQuestions(this.state.rounds, this.state.category, this.state.difficulty)
    }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="controls">
       
            <label>Number of Questions:</label>
            <select value={this.state.value} onChange={this.handleRoundsChange} className='rounds__list'>
                <option value=''></option>
                <option value='1' >1</option>
                <option value='2' >2</option>
                <option value='3' >3</option>
                <option value='4' >4</option>
                <option value='5' >5</option>
            </select>
    
            <label>Select Category:</label>
                <select onChange={this.handleCategoryChange} value={this.state.value} className='category__list'>
                    <option value=''></option>
                    <option value='general knowledge' >general knowledge</option>
                    <option value='science & nature' >science & nature</option>
                    <option value='sport' >sport</option>
                    <option value='geography' >geography</option>
                    <option value='history' >history</option>
                    <option value='art' >art</option>
                </select>

            <label>Select Difficulty:</label>
                <select onChange={this.handleDifficultyChange} className='difficulty__list'>
                    <option value=''></option>
                    <option value='easy' >easy</option>
                    <option value='medium'>medium</option>
                    <option value='difficult'>difficult</option>
                </select>
      
        <button  type="submit">Go!</button>
      </form>
    );
  }
}

export default Controls;
