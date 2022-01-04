// noinspection JSUnusedGlobalSymbols

import React from "react";
import qs from "qs";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";

import { EventData } from "./event.types";

import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";

const Slug = ({ evt }: { evt: EventData }) => {
  const deleteEvent = () => {
    console.log(55);
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {evt.attributes.date} at {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        {evt.attributes.image && (
          <div className={styles.image}>
            <Image
              src={evt.attributes.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
              alt={"image event"}
            />
          </div>
        )}
        <h3>Performers</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue: {evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>

        <Link href={"/events"}>
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Slug;

// query all event and create path
export async function getStaticPaths() {
  const { data: res } = await axios.get(`${API_URL}/api/event`);
  const paths = res.data.map((evt: EventData) => {
    return {
      params: { slug: evt.attributes.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }: { params: { slug: string } }) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const { data: res } = await axios.get(`${API_URL}/api/event?${query}`, {
    params: { populate: "*" },
  });

  return {
    props: {
      evt: res.data[0],
    },
  };
}
