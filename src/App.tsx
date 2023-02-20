import Header from "Components/Layout/Header";
import Sidebar from "Components/Layout/Sidebar";
import StaffPage from "Pages/StaffPage";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="flex pt-16 min-h-screen">
          <Sidebar />
          <StaffPage />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
