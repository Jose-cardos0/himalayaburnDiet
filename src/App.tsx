import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Response from "./pages/Response";
import Oferta from "./pages/Oferta";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/response" element={<Response />} />
          <Route path="/oferta" element={<Oferta />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
