// component for links when we need to save some space
import { useCallback, useContext, useMemo, useReducer } from "react";

import { Link, scroller } from "react-scroll";

import styles from "./slim-links.module.css";
import transitionStyles from "../../transitions.module.css";

import arrow from "/icons/arrow.svg";

import { ThemeContext } from "../../root";
import unFocus from "../../../util/un-focus";

function SlimLinks({
  updatePageInfo,
}: {
  updatePageInfo: (pageName: string) => void;
}) {
  // import context
  const { theme } = useContext(ThemeContext);

  const [showLinks, toggleShowLinks] = useReducer((state: boolean) => {
    return !state;
  }, false);

  const onLinkClick = useCallback(
    (name: string) => {
      updatePageInfo(name);

      // NOTE: can't use offset in Link because it affects both spy and scroll
      scroller.scrollTo(name, {
        containerId: "main-page",
        smooth: true,
        duration: 500,
        offset: name == "home" ? 0 : 5, // Scroll extra to fix spy not correctly updating on mobile chrome
      });

      unFocus();
    },
    [updatePageInfo],
  );

  const transitionClass = useMemo(
    () =>
      [transitionStyles["interactive"], transitionStyles["clickable"]].join(
        " ",
      ),
    [],
  );
  const roundedSquareTransitionClass = useMemo(
    () => [transitionClass, transitionStyles["rounded-square"]].join(" "),
    [transitionClass],
  );
  return (
    <div id={styles["links-parent"]}>
      <div id={styles["links"]}>
        <div
          id={styles["logo-parent"]}
          className={roundedSquareTransitionClass}
        >
          <Link
            id={styles["logo"]}
            spy={true}
            containerId="main-page"
            onClick={() => {
              onLinkClick("home");
            }}
            href="/"
            to="home"
          >
            <img src="/icon-small.png"></img>
          </Link>
        </div>
        <div id={styles["hidden-links-parent"]}>
          <div
            id={styles["hidden-links"]}
            className={showLinks ? styles["showing"] : undefined}
          >
            <div className={transitionClass}>
              <Link
                activeClass={styles["selected"]}
                spy={true}
                containerId="main-page"
                onClick={() => {
                  onLinkClick("home");
                }}
                href="/"
                to="home"
              >
                Home
              </Link>
            </div>
            {__SECTIONS__.map((section) => (
              <div className={transitionClass} key={section.name}>
                <Link
                  activeClass={styles["selected"]}
                  spy={true}
                  containerId="main-page"
                  onClick={() => {
                    onLinkClick(section.name);
                  }}
                  href={`/${section.name}`}
                  to={section.name}
                >
                  {section.title}
                </Link>
              </div>
            ))}
            <div className={transitionClass}>
              <Link
                activeClass={styles["selected"]}
                spy={true}
                containerId="main-page"
                onClick={() => {
                  onLinkClick("contacts");
                }}
                href="/contacts"
                to="contacts"
              >
                Contacts
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={roundedSquareTransitionClass}>
        <button
          id={styles["toggle-show-links-button"]}
          className={showLinks ? styles["showing"] : undefined}
          onClick={toggleShowLinks}
        >
          <img
            src={arrow}
            id={styles["arrow-img"]}
            className={theme === "dark" ? styles["inverted"] : undefined}
            draggable="false"
          />
        </button>
      </div>
    </div>
  );
}

export default SlimLinks;
