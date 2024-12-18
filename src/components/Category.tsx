import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { playSFX, addHoverSoundEffect } from "./Utils";

function Category() {
  const navigate = useNavigate();
  const audioSelect = new Audio("/src/assets/Music/select_correct.wav");
  const audioHover = "/src/assets/SFX/select/hoverCategory.mp3";
  const audioSelectCat = new Audio(
    "/src/assets/SFX/select/selectCategory/correct-2-46134.mp3"
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

    fetch("/data.json")
      .then((response) => response.json())
      .then((jsonData) => {
        // Access the specific category array inside "categories"
        const categoryData = jsonData.categories[category];
        const randomItem =
          categoryData[Math.floor(Math.random() * categoryData.length)];
        // Navigate to /Ingame with the category data
        playSFX(audioSelectCat, 0.3);
        navigate("/Ingame", { state: { selectedItem: randomItem, category } });
      })
      .catch((error) => console.error("Error loading data:", error));
  };

  useEffect(() => {
    // Apply hover sound to all elements with the class .categoryButton
    const cleanup = addHoverSoundEffect(
      ".categoryButton, .back",
      audioHover,
      100,
      0.2
    );

    // Cleanup event listeners when component unmounts
    return cleanup;
  }, []); // Empty dependency array ensures this runs once after component mounts

  return (
    <div className="containerBackground">
      <div className="categoryContainer">
        <div className="container">
          <header>
            <a onClick={goToHomePage} className="back">
              <img
                src="src/assets/images/icon-back.svg "
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
