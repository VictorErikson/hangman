import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const goToRulesPage = () => {
    navigate("/RulesPage");
  };

  const goToCategory = () => {
    navigate("/Category");
  };

  return (
    <div className="containerBackground containerBackgroundHome">
      <div className="menuBackground">
        <img className="logo" src="src/assets/images/logo.svg" alt="logo" />
        <a onClick={goToCategory} className="playButton">
          <img
            className="playSymbol"
            src="src/assets/images/icon-play.svg"
            alt="playSymbol"
          />
        </a>
        <button onClick={goToRulesPage} className="howToPlay">
          how to play
        </button>
        {/* <button onClick={} className="howToPlay">
            how to play
          </button> */}
      </div>
    </div>
  );
}

export default HomePage;
