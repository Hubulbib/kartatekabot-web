import {
  setDebug,
  backButton,
  miniApp,
  initData,
  viewport,
  init,
} from "@telegram-apps/sdk-react";

export const initTGMiniApp = (debug: boolean): void => {
  setDebug(debug);

  init();

  if (!backButton.isSupported() || !miniApp.isSupported()) {
    throw new Error("ERR_NOT_SUPPORTED");
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
