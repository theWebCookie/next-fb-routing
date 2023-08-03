import { getAllEvents } from '@/mock-data';
import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { useRouter } from 'next/router';

const EventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();
  const findEventHandlers = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };
  return (
    <>
      <EventsSearch onSearch={findEventHandlers} />
      <EventList items={events} />
    </>
  );
};

export default EventsPage;
