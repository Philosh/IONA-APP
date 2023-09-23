import DropDown from "./Components/DropdownComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const client = new QueryClient();
  return (
    <div className="App">
      <h1>Cat Browser</h1>
      <p>Breed</p>
      <QueryClientProvider client={client}>
        <DropDown></DropDown>
      </QueryClientProvider>
    </div>
  );
}

export default App;
