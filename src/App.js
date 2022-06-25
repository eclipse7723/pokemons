import Header from "./components/Header";
import PokemonsPage from "./pages/PokemonsPage";
import AuthPage from "./pages/AuthPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (<>
    <Header/>
    
    <Router>
      <Routes>
        <Route path="/" element={<PokemonsPage/>} />
        <Route path="/auth/*" element={<AuthPage/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </Router>

    </>);
}

export default App;
