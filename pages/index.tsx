// noinspection JSUnusedGlobalSymbols

import Link from "next/link";
import axios from "axios";

import { EventData } from "./events/event.types";

import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";

const Home = ({ events }: { events: EventData[] }) => {
  return (
    <Layout>
      <ul>
        <h1>Up coming Events</h1>

        {events.length === 0 && <h3>No events to show</h3>}

        {events.map((evt) => (
          <EventItem evt={evt} key={evt.id} />
        ))}

        {events.length > 0 && (
          <Link href={"/events"}>
            <a className={"btn-secondary"}>View All Events</a>
          </Link>
        )}
      </ul>
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const { data } = await axios.get(`${API_URL}/api/event?pagination[limit]=3`, {
    params: { populate: "*", sort: ["date:desc"] },
  });

  return {
    props: { events: data.data },
    revalidate: 1,
  };
}
