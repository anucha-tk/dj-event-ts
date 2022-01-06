// noinspection JSUnusedGlobalSymbols

import React from "react";
import axios from "axios";
import Link from "next/link";
import qs from "qs";
import { useRouter } from "next/router";

import { EventData } from "./event.types";

import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";

const Search = ({ events }: { events: EventData[] }) => {
  const router = useRouter();

  return (
    <Layout title={"Search Result"} isPrivateRoute={false}>
      <Link href={"/events"}>Go Back</Link>
      <h1>Search Result for {router.query.term}</h1>

      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem evt={evt} key={evt.id} />
      ))}
    </Layout>
  );
};

export default Search;

interface GetServerSidePropsParams {
  query: { term: string };
}
export async function getServerSideProps({ query: { term } }: GetServerSidePropsParams) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $contains: term,
            },
          },
          {
            venue: {
              $contains: term,
            },
          },
          {
            performers: {
              $contains: term,
            },
          },
          {
            description: {
              $contains: term,
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const { data } = await axios.get(`${API_URL}/api/events?${query}`, {
    params: { populate: "*" },
  });

  return {
    props: { events: data.data },
  };
}
