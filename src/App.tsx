import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { RatingPage } from "./pages/rating/rating.page";
import { NavBar } from "./components/nav/nav.component";
import { observer } from "mobx-react-lite";
import { ProfilePage } from "./pages/profile/profile.page";
import { useContext, useEffect } from "react";
import { Context } from "./context/context";
import { WelcomePage } from "./pages/welcome/welcome.page";
import { CafePage } from "./pages/cafe/cafe.page";
import { CatalogPage } from "./pages/catalog/catalog.page";

function App() {
  const {
    userStore: { getUser, user },
  } = useContext(Context);

  useEffect(() => {
    getUser();
  }, []);

  if (user?.city && user?.criteria) {
    return (
      <HashRouter>
        <div className="app" id="app">
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<RatingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cafe/:id" element={<CafePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    );
  } else {
    return (
      <HashRouter>
        <div className="app" id="app">
          <main className="main-content">
            <Routes>
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="*" element={<Navigate to="/welcome" replace />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    );
  }
}

export default observer(App);
