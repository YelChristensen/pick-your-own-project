import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {

    render() { 
        const answerArr = this.props.question.incorrect_answers.concat(this.props.question.correct_answer).sort();

        return ( 
            <div className='question'>   
                 <h4 className='question-text'>{this.props.question.question}</h4>
                 {
                   this.props.question.type === 'boolean' ? (<p>
                       <label >True</label>
                       <input type="radio" value='true' />
                       <label >False</label>
                       <input type="radio" value='false'/></p>) :
                
                        answerArr.map(answer=>
                        <p>
                            <label>{answer}</label>
                        <input type='radio' value={answer} />
                        </p>
                        )
                }
            </div>
         );
    }
}
 
Question.propTypes = {
    question: PropTypes.object
}
export default Question;