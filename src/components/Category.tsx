import { useNavigate } from "react-router-dom";

function Category() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  // const goToIngame = () => {
  //   navigate("/Ingame");
  // };
  const handleCategoryClick = (category: string) => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((jsonData) => {
        // Access the specific category array inside "categories"
        const categoryData = jsonData.categories[category];
        const randomItem =
          categoryData[Math.floor(Math.random() * categoryData.length)];
        // Navigate to /Ingame with the category data
        navigate("/Ingame", { state: { selectedItem: randomItem } });
      })
      .catch((error) => console.error("Error loading data:", error));
  };

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
