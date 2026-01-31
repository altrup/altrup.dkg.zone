import { Element } from "react-scroll";

import { isImageList, SubSection } from "../../util/get-sections";

import styles from "./section-page.module.css";
import transitionStyles from "../transitions.module.css";

import Project from "./components/project";
import ImageScroller from "./components/image-scroller";

function SectionPage({
  name,
  title,
  description,
  subSections,
}: {
  name: string;
  title: string;
  description?: string;
  subSections: SubSection[];
}) {
  return (
    <Element id={styles["sections-page"]} name={name}>
      <div
        id={styles["sections-page-child"]}
        className={transitionStyles["interactive"]}
      >
        <h1
          id={styles["sections-label"]}
          className={transitionStyles["interactive"]}
        >
          {title}
        </h1>
        {description ? (
          <p
            id={styles["sections-description"]}
            className={transitionStyles["interactive"]}
          >
            {description}
          </p>
        ) : null}

        {subSections.map((section, index) => (
          <div
            key={index}
            className={[
              styles["section-type-div"],
              transitionStyles["interactive"],
            ].join(" ")}
          >
            <h2
              className={[
                styles["section-type-label"],
                transitionStyles["interactive"],
              ].join(" ")}
            >
              {section.title}
            </h2>
            {"description" in section && section.description ? (
              <p
                className={[
                  styles["section-type-description"],
                  transitionStyles["interactive"],
                ].join(" ")}
              >
                {typeof section.description === "string"
                  ? section.description
                  : section.description.map((desc, index) => (
                      <span key={index}>
                        {typeof desc === "string" ? (
                          desc
                        ) : (
                          <a
                            className={[
                              transitionStyles["interactive"],
                              transitionStyles["clickable"],
                              transitionStyles["rounded-square"],
                            ].join(" ")}
                            target="_blank"
                            rel="noreferrer"
                            href={desc.href}
                          >
                            {desc.text}
                          </a>
                        )}
                      </span>
                    ))}
              </p>
            ) : undefined}
            {"projects" in section &&
            Object.prototype.toString.call(section.projects) ===
              "[object Array]" &&
            section.projects.length > 0 ? (
              <div className={styles["sections-div"]}>
                {section.projects.map((project, index) => (
                  <Project
                    key={index}
                    name={project.name}
                    description={project.description}
                    imageScroller={
                      "imageScroller" in project &&
                      isImageList(project.imageScroller)
                        ? project.imageScroller
                        : undefined
                    }
                    image={"image" in project ? project.image : undefined}
                    links={"links" in project ? project.links : undefined}
                  />
                ))}
              </div>
            ) : undefined}
            {"imageScroller" in section &&
            isImageList(section.imageScroller) ? (
              <ImageScroller
                height={section.imageScroller.height}
                images={section.imageScroller.images}
                centerFirstImage={section.imageScroller.centerFirstImage}
                arrowNavigation
              />
            ) : undefined}
          </div>
        ))}
      </div>
    </Element>
  );
}

export default SectionPage;
