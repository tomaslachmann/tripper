
import './App.css';
import PublicIndex from "./Pages/Public/test";
import ProtectedIndex from './Pages/Protected/Index';
import { useSelector } from "react-redux";
import { selectUser } from "./features/auth";

function App() {
  const user = useSelector(selectUser);
  return (
    <div className={user.isLoggedIn ? "App LoggedIn" : "App"}>
     {!user.isLoggedIn ? <PublicIndex  /> : <ProtectedIndex />}
    </div>
  );
}

export default App;
