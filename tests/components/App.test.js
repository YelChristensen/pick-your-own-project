import React from 'react';
import App from '../../src/components/App';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

global.fetch = require('jest-fetch-mock');
const QUESTIONS = {
  'category': "General Knowledge",
  'correct_answer': "False",
  'difficulty': "easy",
  'incorrect_answers': ["True"],
  'question': "Video streaming website YouTube was purchased in it&#039;s entirety by Facebook for US$1.65 billion in stock.",
  'type': "boolean"
}

describe('App', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('matches the snapshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('updates the state with results', () => {
    fetch.mockResponseOnce(
      JSON.stringify({ results: [QUESTIONS]})
    )
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    
    return instance.fetchQuestions(5, 9, 'easy')
      .then(() => {
        expect (fetch).toHaveBeenCalledWith(`https://opentdb.com/api.php?amount=5&category=9&difficulty=easy`);
        const questionsState = wrapper.state('questionArr');
        expect(questionsState.length).toBe(1);
        expect(questionsState[0]).toMatchObject(QUESTIONS)
      })
  })
});
