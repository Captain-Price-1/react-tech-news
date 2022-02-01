import React from "react";
import { useGlobalContext } from "./context";
import { AnimateSharedLayout, motion } from "framer-motion";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const News = () => {
  const { isLoading, hits, removeStory } = useGlobalContext();
  if (isLoading) {
    return <div className="loading"></div>;
  }
  return (
    <TransitionGroup className="stories">
      {hits.map((story) => {
        const { objectID, title, num_comments, url, points, author } = story;

        return (
          <CSSTransition key={title} timeout={200} classNames="alert">
            {/* <AnimateSharedLayout> */}
            <motion.article
              className="story"
              key={objectID}
              layout
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              // transition={{ delay: 0.1, type: "tween" }}
            >
              <h4 className="title">{title}</h4>
              <p className="info">
                {points} by <span>{author} | </span>
                {num_comments}{" "}
              </p>
              <div>
                <a
                  href={url}
                  className="read-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  read more
                </a>
                <button
                  className="remove-btn"
                  onClick={() => removeStory(objectID)}
                >
                  remove
                </button>
              </div>
            </motion.article>
            {/* </AnimateSharedLayout> */}
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};
export default News;
