// noinspection JSUnusedGlobalSymbols

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { FaImage } from "react-icons/fa";
import Image from "next/image";

import { EventDataResponse, EventData } from "../event.types";

import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import { API_URL } from "@/config/index";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

const EditEventPage = ({ evt }: { evt: EventData }) => {
  // todo: edit image mode, when update image if exist not working
  const [values, setValues] = useState({
    name: evt.attributes.name,
    performers: evt.attributes.performers,
    venue: evt.attributes.venue,
    address: evt.attributes.address,
    date: evt.attributes.date,
    time: evt.attributes.time,
    description: evt.attributes.description,
  });

  const [imagePreview, setImagePreview] = useState(
    evt.attributes.image.data ? evt.attributes.image.data.attributes.formats.medium.url : null,
  );

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async () => {
    try {
      const { data } = await axios.get<EventDataResponse>(`${API_URL}/api/events/${evt.id}`, {
        params: { populate: "*" },
      });
      setImagePreview(data.data.attributes.image.data.attributes.formats.medium.url);
      setShowModal(false);
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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate
    const hasEmptyFields = Object.values(values).some((e) => e === "");
    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    } else {
      try {
        const { data } = await axios.put<EventDataResponse>(`${API_URL}/api/events/${evt.id}`, {
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

  return (
    <Layout title={"Edit  Event"}>
      <Link href={"/events"}>Go Back</Link>
      <h1>Update Event</h1>

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
              value={moment(values.date).format("yyyy-MM-DD")}
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
        <input type="submit" value="Update Event" className={"btn"} />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} alt={"Image Event"} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}
      <div>
        <button onClick={() => setShowModal(true)} className="btn-secondary btn-icon">
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          // token={token}
        />
      </Modal>
    </Layout>
  );
};

export default EditEventPage;

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
  const { data } = await axios.get(`${API_URL}/api/events/${id}`, {
    params: { populate: "*" },
  });

  return {
    props: { evt: data.data },
  };
}
