import React from "react";
import Question from "./Question";

function Questions({ questionArr, addCorrectAnswers }) {
  const questionArrID = [...questionArr];
  for (let i = 0; i < questionArrID.length; i++) {
    questionArrID.id = i;
  }
  return (
    <div className="questions">
      {questionArrID.map(question => (
        <Question
          key={question.question}
          question={question}
          addCorrectAnswers={addCorrectAnswers}
        />
      ))}
    </div>
  );
}

export default Questions;
