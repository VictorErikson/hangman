import { useNavigate } from "react-router-dom";

function RulesPage() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="containerBackground">
      <div className="rulesContainer">
        <div className="contaier">
          <header>
            <a onClick={goToHomePage} className="back">
              <img
                src="src/assets/images/icon-back.svg"
                alt="back arrow"
                className="backArrow"
              />
            </a>
            <h1 className="headline">How to Play</h1>
          </header>
          <main>
            <section>
              <div className="sectionContent">
                <div className="sectionCaption">
                  <h2>01</h2>
                  <h3>Choose a category</h3>
                </div>
                <p>
                  First, choose a word category, like animals or movies. The
                  computer then randomly selects a secret word from that topic
                  and shows you blanks for each letter of the word.
                </p>
              </div>
            </section>
            <section>
              <div className="sectionContent">
                <div className="sectionCaption">
                  <h2>02</h2>
                  <h3>Guess letters</h3>
                </div>
                <p>
                  Take turns guessing letters. The computer fills in the
                  relevant blank spaces if your guess is correct. If it's wrong,
                  you lose some health, which empties after eight incorrect
                  guesses.
                </p>
              </div>
            </section>
            <section>
              <div className="sectionContent">
                <div className="sectionCaption">
                  <h2>03</h2>
                  <h3>Win or lose</h3>
                </div>
                <p>
                  You win by guessing all the letters in the word before your
                  health runs out. If the health bar empties before you guess
                  the word, you lose.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default RulesPage;
