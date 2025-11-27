import { Link } from 'react-router-dom'

function OccasionCard(props) {
    return (
        <>
        <div className="occasion-grid-item">
            <Link to={`/details/${props.OccasionId}`}>
                <img src={props.Filename} alt={props.Title} />
                <div className="label">{props.Title}</div>
            </Link>
        </div>
        </>
    );
}

export default OccasionCard;