import { useNavigate } from "react-router-dom";

function Ingame() {
  const navigate = useNavigate();

  const goToCategory = () => {
    navigate("/Category");
  };

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="containerBackground">
      <div className="ingameContainer">
        <div className="container">
          <header className="headerIngame">
            <a className="menu">
              <img
                src="src/assets/images/icon-menu.svg "
                alt="menu"
                className="menuSymbol"
              />
            </a>
            <h1 className="headline">Pick a Category</h1>
          </header>
          <main>
            <div className="word"></div>
            <div className="keyboard">
              <p className="letters">abcdefghijklmnopqrstuvwxyz</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Ingame;
