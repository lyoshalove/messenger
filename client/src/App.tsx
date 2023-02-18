import "./assets/styles/global.sass";
import { checkLocation } from "./features/helpers/checkLocation";
import { Router } from "./router/Router";
import { MainTemplate } from "./templates/MainTemplate";

function App() {

  return (
    <div className="App">
      {checkLocation(["/login", "/authorization"]) ? (
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
