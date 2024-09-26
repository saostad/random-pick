
type Props = {
    events: {
        name: string;
        date: string;
        time: string;
        location: string;
        gcal_link: string;
    }[];
}

export default function EventsList({ events }: Props) {
    return (
        <div>
            {events.map((event) => (
                <div className="card my-4 bg-base-100 w-96 shadow-xl" key={event.name}>
                    <div className="card-body">
                        <h2 className="card-title">{event.name}</h2>
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                        <p>{event.location}</p>
                        <div className="card-actions justify-end">
                            <a href={event.gcal_link} className="btn btn-primary" target="_blank">Add to Calendar</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

