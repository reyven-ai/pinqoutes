import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { Router } from "./router/Router";

function App() {
  return (
    <ReactQueryProvider>
      <Router />
    </ReactQueryProvider>
  );
}

export default App;
