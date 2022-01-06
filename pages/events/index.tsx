// noinspection JSUnusedGlobalSymbols

import React from "react";
import axios from "axios";
import qs from "qs";

import { EventData, EventDataResponse } from "./event.types";

import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL, PAGE_SIZE } from "@/config/index";
import Pagination from "@/components/Pagination";

const Index = ({
  events,
  page,
  pageCount,
}: {
  events: EventData[];
  page: number;
  pageCount: number;
}) => {
  return (
    <Layout isPrivateRoute={false}>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination pageCount={pageCount} page={page} />
    </Layout>
  );
};

export default Index;

interface GetStaticProps {
  query: { page: number; pageSize: number };
}
export async function getServerSideProps({
  query: { page = 1, pageSize = PAGE_SIZE },
}: GetStaticProps) {
  const query = qs.stringify(
    {
      pagination: {
        page,
        pageSize,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const { data } = await axios.get<EventDataResponse>(`${API_URL}/api/events/?${query}`, {
    params: { populate: "*", sort: ["date:desc"] },
  });

  return {
    props: {
      events: data.data,
      page: data.meta.pagination.page,
      pageCount: data.meta.pagination.pageCount,
    },
  };
}
