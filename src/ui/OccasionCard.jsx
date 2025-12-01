import { Link } from 'react-router-dom'

function OccasionCard(props) {

    const formattedDate = props.Date
    ? (() => {
        const date = new Date(props.Date);
        return isNaN(date.getTime()) ? props.Date : date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
      })()
    : '';

    const formattedTime = props.Time
    ? (() => {
        const time = String(props.Time).trim();
        let parsedDate = new Date(time);
        // If parsing failed, try parsing time-only formats like "18:30" or "6:30 PM"
        if (isNaN(parsedDate.getTime())) {
        const timeOnly = /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM|am|pm)?$/;
        const timeMatchResults = time.match(timeOnly);
        if (timeMatchResults) {
            parsedDate = new Date();
            let hour = parseInt(timeMatchResults[1], 10);
            const minute = parseInt(timeMatchResults[2], 10);
            const sec = timeMatchResults[3] ? parseInt(timeMatchResults[3], 10) : 0;
            const ampm = timeMatchResults[4];
            if (ampm) {
            const up = ampm.toUpperCase();
            if (up === 'PM' && hour < 12) hour += 12;
            if (up === 'AM' && hour === 12) hour = 0;
            }
            d.setHours(hour, minute, sec, 0);
        }
        }
        
        if (isNaN(parsedDate.getTime())) return props.Time;

          // Format as 12-hour with uppercase AM/PM (no dots)
          let hours = parsedDate.getHours();
          const minutes = parsedDate.getMinutes();
          const ampmLabel = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12 || 12;
          const minuteStr = String(minutes).padStart(2, '0');
          return `${hours}:${minuteStr} ${ampmLabel}`;
        })()
    : '';

    return (
        <>
        <div className="occasion-grid-item">
            <Link to={`/details/${props.OccasionId}`}>
                <img src={props.Filename} alt={props.Title} />
                <div className="labels">
                    <div className="label title"><h2>{props.Title}</h2></div>
                    <div className="label date">
                        <span className="label-text">Date:</span>
                        <span className="date-value"> {formattedDate}</span>
                    </div>
                    <div className="label time">
                        <span className="label-text">Time:</span>
                        <span className="time-value"> {formattedTime}</span>
                    </div>
                    <div className="label location"><h4>Location:</h4>{props.Location}</div>
                    <div className="label price"><h4>Price:</h4>${props.Price}</div>
                </div>
            </Link>
        </div>
        </>
    );
}

export default OccasionCard;