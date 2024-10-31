import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Ingame() {
  const navigate = useNavigate();
  const location = useLocation();

  // Access the selected item from the state
  const selectedItem = location.state?.selectedItem;

  // State variable to store the selected word
  const [word, setWord] = useState("");

  // Set the word from selectedItem when the component mounts
  useEffect(() => {
    if (selectedItem) {
      setWord(selectedItem.name); // Store the name of the selected item
    }
  }, [selectedItem]);

  const goToCategory = () => {
    navigate("/Category");
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="containerBackground">
      <div className="ingameContainer">
        <div className="container">
          <header className="headerIngame">
            <div className="left">
              <a className="menu">
                <img
                  src="src/assets/images/icon-menu.svg "
                  alt="menu"
                  className="menuSymbol"
                />
              </a>
              <h1 className="headline">Countries</h1>
            </div>
            <div className="right">
              <div className="healthbar">
                <div className="healthLeft"></div>
              </div>
              <div className="heartContainer">
                <div className="heart"></div>
              </div>
            </div>
          </header>
          <main>
            <div className="wordContainer">
              {word
                .toUpperCase()
                .split(" ")
                .map((word, wordIndex) => (
                  <div key={wordIndex} className="word">
                    {word.split("").map((letter, letterIndex) => (
                      <button key={letterIndex} className="keyWord">
                        {letter}
                      </button>
                    ))}
                  </div>
                ))}
            </div>

            <div className="keyboard">
              {alphabet.map((letter) => (
                <button key={letter} className="key">
                  {letter}
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Ingame;
