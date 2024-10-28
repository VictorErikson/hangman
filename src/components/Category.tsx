import { useNavigate } from "react-router-dom";

function Category() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  const goToIngame = () => {
    navigate("/Ingame");
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
            <button onClick={goToIngame} className="categoryButton">
              Movies
            </button>
            <button className="categoryButton">TV Shows</button>
            <button className="categoryButton">Countries</button>
            <button className="categoryButton">Capital Cities</button>
            <button className="categoryButton">Animals</button>
            <button className="categoryButton">Sports</button>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Category;
