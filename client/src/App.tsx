import "@assets/styles/global.sass";
import { checkLocation } from "@/features/helpers";
import { Router } from "@/components/Router";
import { MainTemplate } from "@/templates";

function App() {
  const isAuthLocation = checkLocation(["/login", "/authorization"]);

  if (isAuthLocation) {
    return <Router />;
  }

  return (
    <div className="App">
      <MainTemplate>
        <Router />
      </MainTemplate>
    </div>
  );
}

export default App;
