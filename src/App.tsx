import { useContext, useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "./context";
import { ThemeContext } from "./context/theme.context";
import { RatingPage } from "./pages/rating/rating.page";
import { NavBar } from "./components/nav/nav.component";
import { ProfilePage } from "./pages/profile/profile.page";
import { WelcomePage } from "./pages/welcome/welcome.page";
import { CafePage } from "./pages/cafe/cafe.page";
import { CatalogPage } from "./pages/catalog/catalog.page";
import { ChooseCity } from "./pages/choose-city/choose-city.page";
import { getTheme, type Themes, ThemeStorageKey } from "./utils/theme";
import { ChoosePriorities } from "./pages/choose-priorities/choose-priorities.page";
import { ProfileReviewsPage } from "./pages/profile-reviews/profile-reviews.page";

function App() {
  const {
    userStore: { getUser, user },
  } = useContext(Context);

  const [theme, setTheme] = useState<Themes>(getTheme);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    localStorage.setItem(ThemeStorageKey, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (user?.city && user?.criteria) {
    return (
      <HashRouter>
        <ThemeContext.Provider value={{ themeSetting: { theme, setTheme } }}>
          <div className="app" id="app">
            <NavBar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<RatingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/my-reviews" element={<ProfileReviewsPage />} />
                <Route path="/cafe/:id" element={<CafePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/choose-city" element={<ChooseCity />} />
                <Route
                  path="/choose-priorities"
                  element={<ChoosePriorities />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </ThemeContext.Provider>
      </HashRouter>
    );
  } else {
    return (
      <HashRouter>
        <ThemeContext.Provider value={{ themeSetting: { theme, setTheme } }}>
          <div className="app" id="app">
            <main className="main-content">
              <Routes>
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/choose-city" element={<ChooseCity />} />
                <Route
                  path="/choose-priorities"
                  element={<ChoosePriorities />}
                />
                <Route path="*" element={<Navigate to="/welcome" replace />} />
              </Routes>
            </main>
          </div>
        </ThemeContext.Provider>
      </HashRouter>
    );
  }
}

export default observer(App);
