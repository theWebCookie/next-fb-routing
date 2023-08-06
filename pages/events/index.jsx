import { getAllEvents } from '@/helpers/api-utils';
import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { useRouter } from 'next/router';
import Head from 'next/head';

const EventsPage = ({ events }) => {
  const router = useRouter();
  const findEventHandlers = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot of great events that allow you to evolve...' />
      </Head>
      <EventsSearch onSearch={findEventHandlers} />
      <EventList items={events} />
    </>
  );
};

export default EventsPage;

export const getStaticProps = async () => {
  const events = await getAllEvents();
  return {
    props: { events },
    revalidate: 60,
  };
};
