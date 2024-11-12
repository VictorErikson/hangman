import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, createElement } from "react";
import { playSFX, addHoverSoundEffect } from "./Utils";

function Ingame() {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioWrong = new Audio("/src/assets/Music/wrong.wav");
  const audioSelectCorrect = new Audio("/src/assets/Music/select_correct.wav");
  const audioHover = "/src/assets/SFX/select/hoverCategory.mp3";

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
      }
    });

    if (!foundMatch) {
      playSFX(audioWrong);
      setError((prev) => prev + 1);
    }

    setUsedButtons((prev) => [...prev, letterBtn]);
  };

  const lost = () => {
    const [isGameOver, setIsGameOver] = useState(false);

    const handleGameOver = () => {
      setIsGameOver(true);
      // Clear localStorage on game over to reset game state
      localStorage.clear();
    };
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
  continueBtn.classList.add("blueBtn");
  continueBtn.textContent = "CONTINUE";

  const newCatBtn: HTMLButtonElement = document.createElement("button");
  newCatBtn.classList.add("blueBtn");
  newCatBtn.textContent = "NEW CATEGORY";

  const quitBtn: HTMLButtonElement = document.createElement("button");
  quitBtn.classList.add("purpleBtn");
  quitBtn.textContent = "QUIT GAME";

  containerMenuBtns.append(continueBtn, newCatBtn, quitBtn);
  menu.append(menuLogo, containerMenuBtns);

  if (error === 8) {
    const container = document.querySelector(".ingameContainer");
    menuLogo.src = "src/assets/images/YouLose.svg";
    if (!container?.querySelector(".menuBackground")) {
      container?.append(menu);
      // menuLogo.textContent = "You Lose";
    }
  }

  //sound toggle icon
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
      ".key:not(.used), .menu:not(.used)",
      audioHover,
      100,
      0.2
    );
    return cleanup;
  }, []);

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
                  <img
                    src="/src/assets/symbols/volume_on.svg"
                    alt="volumeIsOn"
                  />
                ) : (
                  <img
                    src="/src/assets/symbols/volume_off.svg"
                    alt="volumeIsOff"
                  />
                )}
              </button>
            </div>
          </header>
          <main>
            <audio ref={audioRef} autoPlay loop>
              <source
                src="/src/assets/Music/High_ES_WaitinLineMartinKlem.wav"
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
                          revealedLetters.includes(letter) ? "" : "hidden"
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

//OLD CODE

// import { useNavigate, useLocation } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import { playSFX, addHoverSoundEffect } from "./Utils";

// function Ingame() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const audioRef = useRef<HTMLAudioElement>(null);

//   const audioWrong = new Audio("/src/assets/Music/wrong.wav");
//   const audioSelectCorrect = new Audio("/src/assets/Music/select_correct.wav");
//   const audioHover = "/src/assets/SFX/select/hoverCategory.mp3";

//   const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
//   let error = 0;

//   // Access the selected item from the state
//   const selectedItem = location.state?.selectedItem;
//   const category = location.state?.category;

//   // State variable to store the selected word
//   const [word, setWord] = useState("");

//   // Set the word from selectedItem when the component mounts
//   useEffect(() => {
//     if (selectedItem) {
//       setWord(selectedItem.name); // Store the name of the selected item
//     }
//   }, [selectedItem]);

//   //Nav

//   const goToCategory = () => {
//     navigate("/Category");
//   };

//   const goToHomePage = () => {
//     navigate("/");
//   };

//   const handleKeyboardClick = (letterBtn: string) => {
//     const keyWordButtons = document.querySelectorAll(".keyWord");
//     let foundMatch = false;

//     keyWordButtons.forEach((button) => {
//       if (button.classList.contains(letterBtn)) {
//         button.classList.remove("hidden");
//         foundMatch = true;
//         playSFX(audioSelectCorrect);
//       }
//     });

//     if (!foundMatch) {
//       const healthBar = document.querySelector(
//         ".healthLeft"
//       ) as HTMLElement | null;
//       playSFX(audioWrong);

//       if (healthBar) {
//         // Increment the error count
//         error += 1;
//         healthBar.classList.add(`error${error}`);
//       }
//     }

//     document
//       .querySelector(`.key[data-letter="${letterBtn}"]`)
//       ?.classList.add("used");
//   };

//   const lost = () => {
//     const [isGameOver, setIsGameOver] = useState(false);

//     const handleGameOver = () => {
//       setIsGameOver(true);
//     };
//   };

//   if (error === 8) {
//     lost();
//   }

//   //Musik
//   // Set volume to 50% when the component mounts
//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = 0.05;
//     }
//   }, []);

//   useEffect(() => {
//     // Apply hover sound to all elements with the class .categoryButton
//     const cleanup = addHoverSoundEffect(".key, .menu", audioHover, 100, 0.2);

//     // Cleanup event listeners when component unmounts
//     return cleanup;
//   }, []); // Empty dependency array ensures this runs once after component mounts

//   return (
//     <div className="containerBackground">
//       <div className="ingameContainer">
//         {/* {isGameOver && (
//           <div className="menu-overlay">
//             <h1>Game Over</h1>
//             <button onClick={() => setIsGameOver(false)}>Restart</button>
//           </div>
//         )} */}
//         <div className="container">
//           <header className="headerIngame">
//             <div className="left">
//               <a className="menu">
//                 <img
//                   src="src/assets/images/icon-menu.svg "
//                   alt="menu"
//                   className="menuSymbol"
//                 />
//               </a>
//               <h1 className="headline">{`${category}`}</h1>
//             </div>
//             <div className="right">
//               <div className="healthbar">
//                 <div className="healthLeft"></div>
//               </div>
//               <div className="heartContainer">
//                 <div className="heart"></div>
//               </div>
//             </div>
//           </header>
//           <main>
//             <audio ref={audioRef} autoPlay loop>
//               <source
//                 src="/src/assets/Music/High_ES_WaitinLineMartinKlem.wav"
//                 type="audio/wav"
//               />
//             </audio>
//             <div className="wordContainer">
//               {word
//                 .toUpperCase()
//                 .split(" ")
//                 .map((word, wordIndex) => (
//                   <div key={wordIndex} className="word">
//                     {word.split("").map((letter, letterIndex) => (
//                       <button
//                         key={letterIndex}
//                         className={`keyWord hidden ${letter}`}
//                       >
//                         {letter}
//                       </button>
//                     ))}
//                   </div>
//                 ))}
//             </div>

//             <div className="keyboard">
//               {alphabet.map((letterBtn) => (
//                 <button
//                   key={letterBtn}
//                   className="key"
//                   data-letter={letterBtn}
//                   onClick={() => handleKeyboardClick(letterBtn)}
//                 >
//                   {letterBtn}
//                 </button>
//               ))}
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Ingame;

<li id=""></li>;
