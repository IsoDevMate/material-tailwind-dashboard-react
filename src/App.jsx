import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "../src/layouts";
import routes from "./routes";
function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
