"use client";

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import { ThemeContext } from "../../root";

const darkModeIcon = "/icons/dark-mode.svg";
const lightModeIcon = "/icons/light-mode.svg";
const systemModeIcon = "/icons/system-mode.svg";

import styles from "./theme-changer.module.css";
import transitionStyles from "../../transitions.module.css";

// Make typescript happy
declare const themeManager: EventTarget & {
  updateTheme: (theme: string) => void;
  themeSetting: string;
  theme: string;
};

// NOTE: the logic for this component runs Client side only
function ThemeChanger() {
  const [isClient] = useState(typeof window !== "undefined");

  // import context
  const { theme, themeSetting } = useContext(ThemeContext);

  // store order of buttons, too, to swap order when setting theme (feels more natural)
  const [order, dispatchOrder] = useReducer(
    (state: string[], theme: string) => {
      return [theme].concat(state.filter((val) => val !== theme));
    },
    ["light", "dark", "system"],
  );
  // cssOrder is one frame behind order, to make animations work properly
  const [cssOrder, setCssOrder] = useState(["light", "dark", "system"]);
  useEffect(() => {
    requestAnimationFrame(() => {
      setCssOrder(order);
    });
  }, [order]);
  // initialize order
  useEffect(() => {
    dispatchOrder(themeManager.themeSetting);
  }, []);

  const getButtonIcon = useCallback((buttonTheme: string) => {
    if (buttonTheme === "light") return lightModeIcon;
    if (buttonTheme === "dark") return darkModeIcon;
    if (buttonTheme === "system") return systemModeIcon;
  }, []);

  // for mobile devices, instead of opening on hover, we want to open menu on click
  const [isOpen, setIsOpen] = useState(false);
  const updateIsOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  // store the nextTheme we switch to when html order updates
  const [nextTheme, setNextTheme] = useState(theme);
  const onButtonClick = useCallback(
    (theme: string) => {
      if (!isClient) return; // do nothing
      dispatchOrder(theme);
      setNextTheme(theme);
      updateIsOpen();
    },
    [isClient, updateIsOpen],
  );
  // only update theme after we've reordered elements
  useEffect(() => {
    if (nextTheme)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          themeManager.updateTheme(nextTheme);
        }),
      );
  }, [nextTheme]);

  const transitionClass = useMemo(
    () =>
      [
        transitionStyles["interactive"],
        transitionStyles["clickable"],
        transitionStyles["rounded-square"],
      ].join(" "),
    [],
  );
  return (
    <div id={styles["theme-changer-wrapper"]}>
      <div
        id={styles["theme-changer"]}
        className={isOpen ? styles["open"] : undefined}
      >
        {order.map((buttonTheme, index) => (
          <div
            key={buttonTheme}
            style={{ zIndex: order.length - index }}
            className={[
              styles[`pos-${String(1 + cssOrder.indexOf(buttonTheme))}`],
              transitionClass,
            ].join(" ")}
          >
            <button
              onClick={() => {
                onButtonClick(buttonTheme);
              }}
              className={[
                themeSetting === buttonTheme ? styles["selected"] : undefined,
              ].join(" ")}
            >
              <img
                key={buttonTheme}
                src={getButtonIcon(buttonTheme)}
                className={theme === "dark" ? styles["inverted"] : undefined}
                draggable="false"
                alt={`${buttonTheme} mode`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThemeChanger;
