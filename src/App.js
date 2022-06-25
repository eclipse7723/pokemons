import Header from "./components/Header";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import PokemonsPage from "./pages/PokemonsPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import MyProfilePage from "./pages/MyProfilePage";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (<>
    
    <AuthProvider>
    <Header/>
    
    <Router>
      <Routes>
        <Route index element={<PokemonsPage/>} />
        <Route path="/auth/*" element={<AuthPage/>} />
        <Route path="/profile" element={<MyProfilePage/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </Router>
    </AuthProvider>

    </>);
}

export default App;
