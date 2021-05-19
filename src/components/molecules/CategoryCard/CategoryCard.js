import React from 'react';
import './CategoryCard.scss';
import { useHistory } from 'react-router-dom';
const CategoryCard = (props) => {
    const history = useHistory();
    const handleClicks = (value) => {
        const state = { id: value };
        history.push({
            pathname: '/products',
            state
        });
    };

    return (<>
        <div className="category-card">
            <div className="card-image">
                <img
                    src={props.imgUrl}
                    alt={props.categoryName}
                    aria-label={props.categoryName + "image"}
                    loading="lazy"
                    width="100"
                />
            </div>
            <div className="card-content">
                <h3
                    aria-label={"category name is" + props.categoryName}>
                    {props.categoryName}
                </h3>
                <p
                    aria-label={props.desc}>
                    {props.desc}
                </p>
                <button
                    className="btn-primary"
                    aria-label={props.categoryName + 'category button, click to explore the products of this category'}
                    onClick={() => handleClicks(props.id)}>
                    Explore {props.name}
                </button>
            </div>
        </div>
    </>)
}

export default CategoryCard;