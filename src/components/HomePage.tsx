import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { playSFX, addHoverSoundEffect } from "./Utils";

function HomePage() {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSelect = new Audio("/src/assets/Music/select_correct.wav");
  const audioHover = "/src/assets/SFX/select/hoverCategory.mp3";
  const startGame = new Audio("/src/assets/SFX/logo/STARTLOGO.mp3");

  const goToRulesPage = () => {
    playSFX(audioSelect);
    navigate("/RulesPage");
  };

  const goToCategory = () => {
    playSFX(startGame, 0.6);
    navigate("/Category");
  };

  useEffect(() => {
    const cleanup = addHoverSoundEffect(
      ".playButton, .howToPlay",
      audioHover,
      100,
      0.2
    );

    return cleanup;
  }, []);

  return (
    <div className="containerBackground containerBackgroundHome">
      <div className="menuBackground">
        <img
          className="logo"
          src="src/assets/images/logo.svg"
          alt="logo"
          draggable="false"
        />
        <a onClick={goToCategory} className="playButton">
          <img
            className="playSymbol"
            src="src/assets/images/icon-play.svg"
            draggable="false"
            alt="playSymbol"
          />
        </a>
        <button onClick={goToRulesPage} className="howToPlay">
          how to play
        </button>
      </div>
    </div>
  );
}

export default HomePage;
