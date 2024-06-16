import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import w from "../reviewCss/write.module.css";

const ViewStarRating = ({ rating }) => {
    const renderStar = (value) => {
        if (value <= rating) {
            return <FontAwesomeIcon icon={solidStar} className={`${w.starIcon} ${w.gold}`} />;
        } else if (value - 0.5 <= rating) {
            return (
                <span className={w.halfStar}>
          <FontAwesomeIcon icon={solidStar} className={`${w.starIcon} ${w.gold}`} />
        </span>
            );
        } else {
            return <FontAwesomeIcon icon={solidStar} className={w.starIcon} />;
        }
    };

    return (
        <div className={w.starRating}>
            {[...Array(5)].map((_, index) => (
                <span key={index} className={w.star}>
          {renderStar(index + 1)}
        </span>
            ))}
        </div>
    );
};

export default ViewStarRating;