import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Tickets from "./pages/Tickets";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tickets" element={<Tickets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;