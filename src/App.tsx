import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RatingPage } from "./pages/rating/rating.page";
import { NavBar } from "./components/nav/nav.component";
import { observer } from "mobx-react-lite";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<RatingPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default observer(App);
