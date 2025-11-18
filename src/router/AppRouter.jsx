import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import FilePage from "../pages/project/[id]/file";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/project/:id/file" element={<FilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
