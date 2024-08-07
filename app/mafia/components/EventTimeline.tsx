import React, { use } from "react";
import { GameEvent, useGameContext } from "../contexts/GameContext";
import Animation from "./Animation";
import { useTranslations } from "next-intl";

const EventTimeline: React.FC = () => {
  const { gameState } = useGameContext();
  const { events } = gameState;

  // Group and sort events by day/night number and timestamp
  const groupedEvents = events.reduce((acc, event) => {
    const key = event.eventAt;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(event);
    return acc;
  }, {} as Record<string, GameEvent[]>);

  Object.values(groupedEvents).forEach((group) => {
    group.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  });

  const t = useTranslations("Mafia");

  return events.length === 0 ? (
    <div className="flex flex-col items-center mt-10">
      <p className="text-xl font-bold my-4">{t("noEventToShow")}</p>
      <Animation
        className=""
        src="mafia/animation/bored.lottie"
        loop={true}
        autoplay={true}
      />
    </div>
  ) : (
    <ul className="timeline timeline-snap-icon timeline-compact timeline-vertical">
      {Object.entries(groupedEvents).map(([key, group], index) => (
        <li key={index}>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start md:text-end mb-10">
            <time className="font-mono italic">{key}</time>
            <ul>
              {group.map((event, eventIndex) => (
                <li key={eventIndex}>{event.description}</li>
              ))}
            </ul>
          </div>
          <div className="divider"></div>
        </li>
      ))}
    </ul>
  );
};

export default EventTimeline;
