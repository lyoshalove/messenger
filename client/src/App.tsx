import { useLocation } from "react-router-dom";
import "./assets/styles/global.sass";
import { Router } from "./router/Router";
import { MainTemplate } from "./templates/MainTemplate";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === "/login" ||
      location.pathname === "/authorization" ? (
        <Router />
      ) : (
        <MainTemplate>
          <Router />
        </MainTemplate>
      )}
    </div>
  );
}

export default App;
