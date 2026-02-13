import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/main.scss';
import Home from './pages/HomePage';
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;