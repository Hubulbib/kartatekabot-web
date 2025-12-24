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
import { CafeLocationsPage } from "./pages/cafe-locations/cafe-locations.page";
import { CafeReviewsPage } from "./pages/cafe-reviews/cafe-reviews.page";
import { PostPage } from "./pages/post/post.page";
import { PromotionPage } from "./pages/promotion/promotion.page";
import { Header } from "./components/header/header.component";
import { BusinessRequestPage } from "./pages/business-request/business-request.page";
import { CreateBusinessRequest } from "./pages/create-business-request/create-business-request.page";

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
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<RatingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/my-reviews" element={<ProfileReviewsPage />} />
                <Route path="/cafe/:id" element={<CafePage />} />
                <Route
                  path="/cafe/:id/locations"
                  element={<CafeLocationsPage />}
                />
                <Route path="/cafe/:id/reviews" element={<CafeReviewsPage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/choose-city" element={<ChooseCity />} />
                <Route
                  path="/choose-priorities"
                  element={<ChoosePriorities />}
                />
                <Route path="/posts/:id" element={<PostPage />} />
                <Route path="/promotions/:id" element={<PromotionPage />} />
                <Route
                  path="/business/requests/create"
                  element={<CreateBusinessRequest />}
                />
                <Route
                  path="/business/requests"
                  element={<BusinessRequestPage />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
          <NavBar />
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
