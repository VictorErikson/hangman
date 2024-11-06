import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AudioProvider } from "./components/AudioContext";
import HomePage from "./components/HomePage";

import RulesPage from "./components/RulesPage";
import Category from "./components/Category";
import Ingame from "./components/Ingame";

function App() {
  return (
    <Router>
      <AudioProvider>
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/RulesPage" element={<RulesPage />} />
            <Route path="/Category" element={<Category />} />
            <Route path="/Ingame" element={<Ingame />} />
          </Routes>
        </>
      </AudioProvider>
    </Router>
  );
}

export default App;
