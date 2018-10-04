import React from 'react';
import Question from './Question'

class Questions extends React.Component {

    render() { 
        const questionArrID = [...this.props.questionArr];
        for (let i = 0; i < questionArrID.length; i++){
            questionArrID.id = i;
        }
        return ( 
            <div className='questions'>
                {
                    questionArrID.map(question =>
                    <Question 
                        key={question.question}
                        question={question}
                        addCorrectAnswers={this.props.addCorrectAnswers}
                    />
                    )
                }
            </div>
         );
    }
}
 
export default Questions;