// noinspection JSUnusedGlobalSymbols

import React from "react";
import axios from "axios";

import { EventData } from "./event.types";

import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

const Index = ({ events }: { events: EventData[] }) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const { data } = await axios.get(`${API_URL}/api/event?pagination[limit]=3`, {
    params: { populate: "*", sort: ["date:desc"] },
  });

  return {
    props: { events: data.data },
    revalidate: 1,
  };
}
