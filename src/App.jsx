import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import './styles/main.scss';
import {FavoriteProvider} from "./contexts/FavoriteContext"
function App() {
  return (
    <FavoriteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </FavoriteProvider>
  );
}

export default App;
