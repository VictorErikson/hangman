import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, createElement } from "react";
import { playSFX, addHoverSoundEffect } from "./Utils";

function Ingame() {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioWrong = new Audio("assets/Music/wrong.wav");
  const audioSelectCorrect = new Audio("assets/Music/select_correct.wav");
  const audioHover = "assets/SFX/select/hoverCategory.mp3";
  const audioSelect = new Audio("assets/Music/select_correct.wav");
  const audioLost = new Audio("assets/SFX/lost/lost.mp3");
  const audioWon = new Audio("assets/SFX/win/winning.mp3");
  const audioSelectMenu = new Audio(
    "assets/SFX/select/selectCategory/correct-2-46134.mp3"
  );

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Initialize states with values from localStorage, if available
  const [word, setWord] = useState(
    localStorage.getItem("savedWord") ||
      location.state?.selectedItem?.name ||
      ""
  );
  const [revealedLetters, setRevealedLetters] = useState<string[]>(
    JSON.parse(localStorage.getItem("revealedLetters") || "[]")
  );
  const [usedButtons, setUsedButtons] = useState<string[]>(
    JSON.parse(localStorage.getItem("usedButtons") || "[]")
  );
  const [error, setError] = useState<number>(
    parseInt(localStorage.getItem("errorCount") || "0")
  );

  // Update localStorage when states change
  useEffect(() => {
    localStorage.setItem("savedWord", word);
    localStorage.setItem("revealedLetters", JSON.stringify(revealedLetters));
    localStorage.setItem("usedButtons", JSON.stringify(usedButtons));
    localStorage.setItem("errorCount", error.toString());
  }, [word, revealedLetters, usedButtons, error]);

  useEffect(() => {
    const healthBar = document.querySelector(".healthLeft") as HTMLElement;
    if (healthBar && error > 0) {
      healthBar.classList.add(`error${error}`);
    }
  }, [error]);

  // Set volume and play the music if previously playing
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.05;
      const isPlaying = localStorage.getItem("isPlaying") === "true";
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, []);

  // Save audio playback state to localStorage on pause/play
  useEffect(() => {
    const handlePlay = () => localStorage.setItem("isPlaying", "true");
    const handlePause = () => localStorage.setItem("isPlaying", "false");
    audioRef.current?.addEventListener("play", handlePlay);
    audioRef.current?.addEventListener("pause", handlePause);
    return () => {
      audioRef.current?.removeEventListener("play", handlePlay);
      audioRef.current?.removeEventListener("pause", handlePause);
    };
  }, []);

  // Handle keyboard button click
  const handleKeyboardClick = (letterBtn: string) => {
    if (usedButtons.includes(letterBtn)) return; // Avoid reusing buttons

    const keyWordButtons = document.querySelectorAll(".keyWord");
    let foundMatch = false;

    keyWordButtons.forEach((button) => {
      if (button.classList.contains(letterBtn)) {
        button.classList.remove("hidden");
        setRevealedLetters((prev) => [...prev, letterBtn]);
        foundMatch = true;
        playSFX(audioSelectCorrect);
        //trigger won if all words are shown
        const letters = document.querySelectorAll(".keyWord");
        if (letters) {
          const noneAreHidden = Array.from(letters).every(
            (letter) => !letter.classList.contains("hidden")
          );
          if (noneAreHidden) {
            playSFX(audioWon, 0.1);
            showMenu("won");
            localStorage.setItem("menu", "won");
          }
        }
      }
    });

    if (!foundMatch) {
      playSFX(audioWrong);
      setError((prev) => prev + 1);
    }

    setUsedButtons((prev) => [...prev, letterBtn]);
  };

  //mall för meny
  // const menuLogo: HTMLElement = document.createElement("h2");

  const menuLogo: HTMLImageElement = document.createElement("img");
  menuLogo.classList.add("menuHeader");
  menuLogo.alt = "logo";
  menuLogo.draggable = false;

  const containerMenuBtns: HTMLDivElement = document.createElement("div");
  containerMenuBtns.classList.add("containerMenuBtns");

  const menu: HTMLDivElement = document.createElement("div");
  menu.classList.add("menuBackground");

  const continueBtn: HTMLButtonElement = document.createElement("button");
  continueBtn.classList.add("blueBtn", "menuBtn");
  continueBtn.textContent = "CONTINUE";
  continueBtn.addEventListener("click", () => {
    const menuMode = localStorage.getItem("menu");
    if (menuMode === "lost" || menuMode === "won") {
      document.querySelector("main")?.classList.add("disabled");
    }
    document.querySelector(".container")?.classList.remove("disabled");
    document.querySelector(".ingameContainer")?.removeChild(menu);
    playSFX(audioSelectMenu, 0.3);
  });

  const newCatBtn: HTMLButtonElement = document.createElement("button");
  newCatBtn.classList.add("blueBtn", "menuBtn");
  newCatBtn.textContent = "NEW CATEGORY";
  newCatBtn.addEventListener("click", () => {
    navigate("/Category");
    playSFX(audioSelectMenu, 0.3);
  });

  const quitBtn: HTMLButtonElement = document.createElement("button");
  quitBtn.classList.add("purpleBtn", "menuBtn");
  quitBtn.textContent = "QUIT GAME";
  quitBtn.addEventListener("click", () => {
    navigate("/");
    playSFX(audioSelectMenu, 0.3);
  });

  containerMenuBtns.append(continueBtn, newCatBtn, quitBtn);
  menu.append(menuLogo, containerMenuBtns);
  const [menuUpdated, setMenuUpdated] = useState(false);

  const showMenu = (gameStatus: string) => {
    const container = document.querySelector(".ingameContainer");
    menuLogo.src = `assets/images/${gameStatus}.svg`;

    if (!container?.querySelector(".menuBackground")) {
      container?.append(menu);
      document.querySelector(".container")?.classList.add("disabled");
      localStorage.setItem("menu", `${gameStatus}`);
    }
    setMenuUpdated((prev) => !prev);
    playSFX(audioSelect);
  };
  // load menu on refresh
  useEffect(() => {
    const menuMode = localStorage.getItem("menu");

    if (menuMode === "lost") {
      showMenu("lost");
    } else if (menuMode === "won") {
      showMenu("won");
    } else if (menuMode === "pause") {
      showMenu("pause");
    }
  }, []);

  //loose
  useEffect(() => {
    if (error === 8) {
      playSFX(audioLost);
      showMenu("lost");
    }
  }, [error]);

  const [isImageOne, setIsImageOne] = useState(true);

  const toggleImage = (): void => {
    setIsImageOne((prevState: boolean) => !prevState);
  };
  if (audioRef.current) {
    !isImageOne ? audioRef.current.pause() : audioRef.current.play();
  }

  // Apply hover sound effect
  useEffect(() => {
    const cleanup = addHoverSoundEffect(
      ".key:not(.used), .menu:not(.used), .menuBtn",
      audioHover,
      100,
      0.2
    );
    return cleanup;
  }, [menuUpdated]);

  return (
    <div className="containerBackground">
      <div className="ingameContainer">
        <div className="container">
          <header className="headerIngame">
            <div className="left">
              <a
                className="menu"
                onClick={() => {
                  const menuMode = localStorage.getItem("menu");
                  menuMode === "won"
                    ? showMenu("won")
                    : menuMode === "lost"
                    ? showMenu("lost")
                    : showMenu("pause");
                  console.log(menuMode);
                }}
              >
                <img
                  src="assets/images/icon-menu.svg "
                  alt="menu"
                  className="menuSymbol"
                />
              </a>
            </div>
            <div className="right">
              <div className="healthbar">
                <div className="healthLeft"></div>
              </div>
              <div className="heartContainer">
                <div className="heart"></div>
              </div>
              <button className="volume" onClick={toggleImage}>
                {isImageOne ? (
                  <img src="assets/symbols/volume_on.svg" alt="volumeIsOn" />
                ) : (
                  <img src="assets/symbols/volume_off.svg" alt="volumeIsOff" />
                )}
              </button>
            </div>
          </header>
          <main>
            <audio ref={audioRef} autoPlay loop>
              <source
                src="assets/Music/High_ES_WaitinLineMartinKlem.wav"
                type="audio/wav"
              />
            </audio>
            <h1 className="headline">{`${location.state?.category || ""}`}</h1>
            <div className="wordContainer">
              {word
                .toUpperCase()
                .split(" ")
                .map((word: string, wordIndex: number) => (
                  <div key={wordIndex} className="word">
                    {word.split("").map((letter, letterIndex) => (
                      <button
                        key={letterIndex}
                        className={`keyWord ${
                          revealedLetters.includes(letter) || letter === "'"
                            ? ""
                            : "hidden"
                        } ${letter}`}
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                ))}
            </div>

            <div className="keyboard">
              {alphabet.map((letterBtn) => (
                <button
                  key={letterBtn}
                  className={`key ${
                    usedButtons.includes(letterBtn) ? "used" : ""
                  }`}
                  data-letter={letterBtn}
                  onClick={() => handleKeyboardClick(letterBtn)}
                >
                  {letterBtn}
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
