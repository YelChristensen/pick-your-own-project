import React from "react";
import Controls from "./Controls";
import Questions from "./Questions";
import cx from "classnames";
import "../styles/components/app.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      questionArr: [],
      correct_answers: 0,
      correct_answer_scale: 0,
      rounds: 0,
      result: "",
      on: false,
      character: "",
      image: "",
      description: ""
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.addCorrectAnswers = this.addCorrectAnswers.bind(this);
    this.correctAnswerRatio = this.correctAnswerRatio.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setRounds = this.setRounds.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  fetchQuestions(rounds, category, difficulty) {
    fetch(
      `https://opentdb.com/api.php?amount=${rounds}&category=${category}&difficulty=${difficulty}`
    )
      .then(response => response.json())
      .then(body => {
        this.setState({ questionArr: body.results });
      });
  }

  setRounds(rounds) {
    this.setState({
      rounds: rounds
    });
  }

  correctAnswerRatio() {
    const scale = (this.state.correct_answers / this.state.rounds) * 10;
    this.setState({
      correct_answer_scale: scale
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.displayResults(this.state.correct_answer_scale);
  }

  displayResults(scale) {
    let result = "";
    let char = "";
    let img = "";
    let descr = "";

    switch (true) {
      case scale === 10:
        result = "100%.";
        char = "Superman";
        img = "../../../images/superman.png";
        descr =
          "Rocketed to Earth as an infant from the doomed planet Krypton, Kal-El was adopted by the loving Kent family and raised in America's heartland as Clark Kent. Using his immense solar-fueled powers, he became Superman to defend mankind against all manner of threats while championing truth, justice and the American way!";
        break;

      case scale >= 9:
        result = "90%.";
        char = "Batman";
        img = "../../../images/batman.png";
        descr =
          "Bruce Wayne, who witnessed the murder of his multi-millionaire parents as a child, swore to avenge their deaths. He trained extensively to achieve mental and physical perfection, mastering martial arts, detective skills, and criminal psychology. Costumed as a bat to prey on the fears of criminals, and utilizing a high-tech arsenal, he became the legendary Batman.";
        break;

      case scale >= 8:
        result = "80%.";
        char = "Wonder Woman";
        img = "../../../images/wonderwoman.png";
        descr =
          "The princess of the Amazons, armed with powers of a god, Wonder Woman is one of Earth's most powerful defenders of peace and equality and a member of the Justice League. She is often considered an archetype for the comic book superheroine. She stands for Love, peace, and above all else, truth! Her original origin depicted her as a clay figure brought to life by the gods, but in recent years she has been depicted as the daughter of Zeus and the Amazon queen Hippolyta.";
        break;

      case scale >= 7:
        result = "70%.";
        char = "Green Lantern";
        img = "../../../images/greenlantern.png";
        descr =
          "With the ability to overcome great fear and harness the power of will, test-pilot Hal Jordan was chosen to be the Green Lantern of Sector 2814 inheriting the ring of the dying alien Green Lantern, Abin Sur. Through sheer will power and determination, Hal has established an impressive record of heroism across the galaxy with the help of his fellow Green Lanterns as well as his peers in the Justice League.";
        break;

      case scale >= 6:
        result = "60%.";
        char = "Damian Wayne";
        img = "../../../images/damian.png";
        descr =
          "Damian Wayne is the son of Bruce Wayne and Talia al Ghul. Trained by the League of Assassins all his life, Damian joined his father’s side in the war against crime by becoming the fifth Robin.";
        break;

      case scale >= 5:
        result = "50%.";
        char = "Barry Allen The Flash";
        img = "../../../images/flash.png";
        descr =
          "Having discovered his mother murdered and his father blamed for the act, forensic scientist Barry Allen sought to clear his father's name and find the real killer. After being doused in chemicals and struck by lightning, Barry was granted the gift of super-speed. Now he protects his hometown of Central City as The Flash, the fastest man alive and founding member of the Justice League.";
        break;

      case scale >= 4:
        result = "40%.";
        char = "Catwoman";
        img = "../../../images/catwoman.png";
        descr =
          "Catwoman, the costumed alias persona of Selina Kyle, is a cat burglar with an on-again, off-again, romantic relationship with Batman. She is shown as a woman who is very strong-willed, independent and morally dubious.";
        break;

      case scale >= 3:
        result = "30%.";
        char = "Billy Batson Shazam";
        img = "../../../images/shazam.png";
        descr =
          "Deemed worthy of becoming the champion of the ancient Wizard Mamaragan, whenever he utters the word 'Shazam', young Billy Batson is struck by a magical thunderbolt and gains vast divine powers and abilities, transforming him into Magic's Champion, the World's Mightiest Mortal, Shazam!";
        break;

      case scale >= 2:
        result = "20%.";
        char = "Aquaman";
        img = "../../../images/aquaman.png";
        descr =
          "The son of an Atlantean queen and a lighthouse keeper from the town of Amnesty Bay, Arthur Curry would grow up to become the superhero Aquaman, and later take on his birthright as the King of Atlantis. He is a founding member of the Justice League and is among DC Comics' most recognized heroes.";
        break;

      case scale >= 1:
        result = "10%.";
        char = "SwampThing";
        img = "../../../images/swampthing.png";
        descr =
          "Botanist Alec Holland became the avatar of the Green, known as the Swamp Thing, following his death in a swamp as a result of a horrific accident. With the ability to control any form of plant life, Swamp Thing uses his powers to protect both the human and the plant worlds.";
        break;

      default:
        result = `0%. Oh dear!`;
        char = "Bat-Cow";
        img = "../../../images/batcow.png";
        descr =
          "A cow, meant to be used for meat, that was saved by the current Robin and son of Batman, Damian Wayne.";
        break;
    }
    this.setState(
      {
        result: `You scored ${result} You are:`,
        character: char,
        image: img,
        description: descr
      },
      () => this.displayModal()
    );
  }

  addCorrectAnswers(num) {
    this.setState(
      {
        correct_answers: this.state.correct_answers + num
      },
      () => this.correctAnswerRatio()
    );
  }

  displayModal() {
    this.setState({
      on: !this.state.on
    });
  }

  closeModal() {
    this.setState(
      {
        on: !this.state.on,
        result: "",
        character: "",
        image: "",
        description: "",
        rounds: 0
      },
      () => this.fetchQuestions()
    );
  }

  render() {
    const classes = cx(".modal", {
      "modal--active": this.state.on
    });

    return (
      <div className="app">
        <header className="header">
          <div className="header__name">Quiz Hero</div>
        </header>
        <main>
          <section className="controls">
            <Controls
              fetchQuestions={this.fetchQuestions}
              setRounds={this.setRounds}
            />
          </section>
          <section className="questions">
            <h3>Your Questions</h3>
            <Questions
              addCorrectAnswers={this.addCorrectAnswers}
              questionArr={this.state.questionArr}
            />
          </section>
          <button onClick={this.handleSubmit} type="submit">
            Submit answers
          </button>

          <div id="resultsModal" className={classes}>
            <span onClick={this.closeModal} className="close">
              &times;
            </span>
            <p className="modal__result">{this.state.result}</p>
            <h4>{this.state.character}</h4>
            <div className="modal__info">
              <img src={this.state.image} />
              <p className="modal__descr">{this.state.description}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
