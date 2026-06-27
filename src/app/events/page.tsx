import {
  getArchiveYears,
  getEvents,
  getFinishedEvents,
  getMatchResults,
  getNationalRankings,
  getUpcomingEvents,
} from "@/lib/data/site-data.server";
import EventsPage from "@/views/events";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [initialUpcoming, initialFinished, initialEvents, initialMatchResults, initialRankings, initialArchiveYears] =
    await Promise.all([
      getUpcomingEvents(),
      getFinishedEvents(),
      getEvents(),
      getMatchResults(),
      getNationalRankings(),
      getArchiveYears(),
    ]);

  return (
    <EventsPage
      initialUpcoming={initialUpcoming}
      initialFinished={initialFinished}
      initialEvents={initialEvents}
      initialMatchResults={initialMatchResults}
      initialRankings={initialRankings}
      initialArchiveYears={initialArchiveYears}
    />
  );
}
