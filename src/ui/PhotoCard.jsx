function PhotoCard(props) {
    return (
        <>
            <div className="masonry-grid-item">
                <a href="/">
                    <img src={props.imageSrc} alt={props.title} />
                    <div className="label">{props.title}</div>
                </a>
            </div>
        </>
    );
}

export default PhotoCard;