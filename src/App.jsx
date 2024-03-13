import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "../src/layouts";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
    </Routes>
  );
}

export default App;
