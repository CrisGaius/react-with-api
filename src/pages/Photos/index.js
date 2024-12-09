import React from "react";

import PropTypes from "prop-types";
import { get } from "lodash";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Container } from "../../styles/GlobalStyles";
import Loading from "../../components/Loading";
import { Title, Form } from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";

export default function Photos({ match }) {
  const dispatch = useDispatch();
  const id = match.params.id || 0;
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = React.useState(false);
  const [photo, setPhoto] = React.useState("");

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        const Photo = get(data, "StudentPhotos[0].url", "");
        setPhoto(Photo);
        setIsLoading(false);
      } catch (err) {
        toast.error("Error to obtain the image!");
        setIsLoading(false);
        history.push("/");
      }
    };

    getData();
  }, [id]);

  const handleChange = async (e) => {
    const selectedPhoto = e.target.files[0];
    const selectedPhotoUrl = URL.createObjectURL(selectedPhoto);

    setPhoto(selectedPhotoUrl);

    const formData = new FormData();
    formData.append("id_student", id);
    formData.append("photo", selectedPhoto);

    try {
      setIsLoading(true);
      await axios.post("/photos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Photo successfully sent.");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, "response", "");
      toast.error("Couldn't send the photo");

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Photos</Title>
      <Form>
        <label htmlFor="photo">
          {photo ? <img src={photo} alt="Student pic" /> : "Choose pic"}
          <input type="file" id="photo" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Photos.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
