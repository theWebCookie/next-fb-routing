import EventList from '@/components/events/event-list';
import NewsletterRegistration from '@/components/input/newsletter-registration';
import { getFeaturedEvents } from '@/helpers/api-utils';
import Head from 'next/head';

const HomePage = ({ events }) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot of great events that allow you to evolve...' />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: { events: featuredEvents },
    revalidate: 1800,
  };
};
