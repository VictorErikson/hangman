import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { playSFX, addHoverSoundEffect } from "./Utils";

function Category() {
  const navigate = useNavigate();
  const audioSelect = new Audio("assets/Music/select_correct.wav");
  const audioHover = "assets/SFX/select/hoverCategory.mp3";
  const audioSelectCat = new Audio(
    "assets/SFX/select/selectCategory/correct-2-46134.mp3"
  );

  const goToHomePage = () => {
    playSFX(audioSelect);
    navigate("/");
  };

  const handleCategoryClick = (category: string) => {
    [
      "savedWord",
      "revealedLetters",
      "usedButtons",
      "errorCount",
      "isPlaying",
      "menu",
    ].forEach((key) => localStorage.removeItem(key));

    fetch(`${import.meta.env.BASE_URL}/data.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        const categoryData = jsonData.categories[category];
        const randomItem =
          categoryData[Math.floor(Math.random() * categoryData.length)];

        playSFX(audioSelectCat, 0.3);
        navigate("/Ingame", { state: { selectedItem: randomItem, category } });
      })
      .catch((error) => console.error("Error loading data:", error));
  };

  useEffect(() => {
    const cleanup = addHoverSoundEffect(
      ".categoryButton, .back",
      audioHover,
      100,
      0.2
    );

    return cleanup;
  }, []);

  return (
    <div className="containerBackground">
      <div className="categoryContainer">
        <div className="container">
          <header>
            <a onClick={goToHomePage} className="back">
              <img
                src="assets/images/icon-back.svg "
                alt="back arrow"
                className="backArrow"
              />
            </a>
            <h1 className="headline">Pick a Category</h1>
          </header>
          <main>
            <button
              onClick={() => handleCategoryClick("Movies")}
              className="categoryButton"
            >
              Movies
            </button>
            <button
              onClick={() => handleCategoryClick("TV Shows")}
              className="categoryButton tvShows"
            >
              TV Shows
            </button>
            <button
              onClick={() => handleCategoryClick("Countries")}
              className="categoryButton countries"
            >
              Countries
            </button>
            <button
              onClick={() => handleCategoryClick("Capital Cities")}
              className="categoryButton capitalCities"
            >
              Capital Cities
            </button>
            <button
              onClick={() => handleCategoryClick("Animals")}
              className="categoryButton animals"
            >
              Animals
            </button>
            <button
              onClick={() => handleCategoryClick("Sports")}
              className="categoryButton sports"
            >
              Sports
            </button>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Category;
