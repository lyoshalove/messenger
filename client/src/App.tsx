import "./assets/styles/global.sass";
import { Router } from "./router/Router";
import { MainTemplate } from "./templates/MainTemplate";

function App() {
  return (
    <div className="App">
      <MainTemplate>
        <main className="main">
          <Router />
        </main>
      </MainTemplate>
    </div>
  );
}

export default App;
