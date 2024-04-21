import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import Navbar from "./components/Navbar";
import Chat from "./pages/Chat";
import UploadPhoto from "./pages/UploadPhoto";
import ProgramsPage from "./pages/ProgramsPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddProgramPage from "./pages/AddProgramPage";
import SingleProgramView from "./views/SingleProgramView";
import ProfilPage from "./pages/ProfilPage";
import EditUserPage from "./pages/EditUserPage";
import ParticipatePage from "./pages/ParticipatePage";
import CaptchaPage from "./pages/CaptchaPage";
import DiaryPage from "./pages/DiaryPage";
import ChatAdvisor from "./pages/ChatAdvisor";
function NavbarWithConditionalRendering() {
  const location = useLocation();
  if (location.pathname === "/captcha") {
    return null;
  }
  return <Navbar />;
}
function App() {
  return (
    <Router>
      <NavbarWithConditionalRendering />

      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/add-user" element={<RegisterPage />} />
        <Route exact path="/confirm-email" element={<ConfirmEmailPage />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/programs" element={<ProgramsPage />} />
        <Route exact path="/programs/:id" element={<SingleProgramView />} />
        <Route exact path="/users/:userId" element={<ProfilPage />} />
        <Route
          exact
          path="/participate/:userId"
          element={<ParticipatePage />}
        />
        <Route exact path="/users/edit/:userId" element={<EditUserPage />} />
        <Route exact path="/programs/add" element={<AddProgramPage />} />
        <Route exact path="/photos/upload/:id" element={<UploadPhoto />} />
        <Route exact path="/captcha" element={<CaptchaPage />} />
        <Route exact path="/diary" element={<DiaryPage />} />
        <Route exact path="/chat/advisor" element={<ChatAdvisor />} />
      </Routes>
    </Router>
  );
}

export default App;
