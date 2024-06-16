import w from "../reviewCss/write.module.css"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';

// npm install 후 에도 import 안될 시
// npm install --save @fortawesome/react-fontawesome
// npm install --save @fortawesome/free-solid-svg-icons

// WriteReview 컴퍼넌트에서 호출함.
// 별점을 기록하는 컴퍼넌트
const StarRating = ({ onChange }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (value) => {
        setRating(value);
        onChange(value);
    };

    const handleMouseEnter = (value) => {
        setHoverRating(value);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className={w.starRating}>
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                const isGold = ratingValue <= rating || ratingValue <= hoverRating;
                const isHalf = ratingValue - 0.5 === rating || ratingValue - 0.5 === hoverRating;

                return (
                    <span
                        key={index}
                        className={w.star}
                        onMouseLeave={handleMouseLeave}
                    >
            <FontAwesomeIcon
                icon={solidStar}
                className={`${w.starIcon} ${isGold ? w.fullStar : ''} ${isHalf ? w.halfStar : ''}`}
            />
            <span
                className={`${w.half} ${w.leftHalf}`}
                onMouseEnter={() => handleMouseEnter(ratingValue - 0.5)}
                onClick={() => handleClick(ratingValue - 0.5)}
            />
            <span
                className={`${w.half} ${w.rightHalf}`}
                onMouseEnter={() => handleMouseEnter(ratingValue)}
                onClick={() => handleClick(ratingValue)}
            />
          </span>
                );
            })}
        </div>
    );
};

export default StarRating;






