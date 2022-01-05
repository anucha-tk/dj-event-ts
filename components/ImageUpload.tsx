import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import styles from "@/styles/Form.module.css";
import { API_URL } from "@/config/index";

interface ImageUploadProps {
  evtId: string;
  imageUploaded: () => void;
  token?: string;
}

const ImageUpload = ({ evtId, imageUploaded }: ImageUploadProps) => {
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image) {
      const formData = await new FormData();
      formData.append("files", image);
      formData.append("ref", "api::event.event");
      formData.append("refId", evtId);
      formData.append("field", "image");

      try {
        await axios.post(`${API_URL}/api/upload`, formData, {
          // todo auth
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        imageUploaded();
      } catch (e) {
        if (axios.isAxiosError(e)) {
          let error = "Something went wrong!";
          if (e.response) {
            error = e.response.data.error.message;
          }

          toast.error(`${error}`);
        }
      }
    } else {
      toast("image not must be empty");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.file}>
          <input type="file" onChange={(e) => handleFileChange(e)} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
};

export default ImageUpload;
