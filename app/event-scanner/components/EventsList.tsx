import { ApiSuccessResponse } from "../typings/antropic-api";

export default function EventsList({ events }: ApiSuccessResponse) {
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
              <a
                href={event.gcal_link}
                className="btn btn-primary"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
                </svg>
                Add to Calendar
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
