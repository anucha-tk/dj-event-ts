// noinspection JSUnusedGlobalSymbols

import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";

import { EventDataResponse } from "./event.types";

import styles from "@/styles/Form.module.css";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

const Add = () => {
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate
    const hasEmptyFields = Object.values(values).some((e) => e === "");
    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    } else {
      try {
        const { data } = await axios.post<EventDataResponse>(`${API_URL}/api/events`, {
          data: values,
        });
        toast.success("Create Event Successful");
        // noinspection ES6MissingAwait
        router.push(`/events/${data.data.attributes.slug}`);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          let error = "Something went wrong!";
          if (e.response) {
            error = e.response.data.error.details.errors.map(
              (e: { path: string; message: string; name: string }) => `${e.path}: ${e.message}`,
            );
          }

          toast.error(`${error}`);
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title={"Add New Event"}>
      <Link href={"/events"}>Go Back</Link>
      <h1>Add Event</h1>

      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id={"name"}
              name={"name"}
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id={"performers"}
              name={"performers"}
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id={"venue"}
              name={"venue"}
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id={"address"}
              name={"address"}
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id={"date"}
              name={"date"}
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id={"time"}
              name={"time"}
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={10}
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="Add Event" className={"btn"} />
      </form>
    </Layout>
  );
};

export default Add;
