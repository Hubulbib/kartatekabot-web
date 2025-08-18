import {
  setDebug,
  backButton,
  miniApp,
  initData,
  viewport,
  init,
  retrieveLaunchParams,
  postEvent,
} from "@telegram-apps/sdk-react";

export const initTGMiniApp = (debug: boolean): void => {
  setDebug(debug);

  init();

  if (!backButton.isSupported() || !miniApp.isSupported()) {
    throw new Error("ERR_NOT_SUPPORTED");
  }

  var lp = retrieveLaunchParams();

  // Some versions of Telegram don't need the classes above.
  if (
    !["macos", "tdesktop", "weba", "web", "webk"].includes(lp.tgWebAppPlatform)
  ) {
    // Expand the application.
    postEvent("web_app_expand");

    document.body.classList.add("mobile-body");
    document.getElementById("root")?.classList?.add("mobile-wrap");
    document.getElementById("app")?.classList?.add("mobile-content");

    if (["ios"].includes(lp.tgWebAppPlatform)) {
      document.getElementById("root")?.classList?.add("ios-content");
    }
  }

  backButton.mount();
  miniApp.mountSync();
  initData.restore();
  viewport.expand();
  void viewport
    .mount()
    .catch((e) => {
      console.error("Something went wrong mounting the viewport", e);
    })
    .then(() => {
      viewport.bindCssVars();
    });

  miniApp.bindCssVars();
};
