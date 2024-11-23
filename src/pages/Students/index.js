import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/";

import { get } from "lodash";
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from "react-icons/fa";

import { toast } from "react-toastify";
import { Container } from "../../styles/GlobalStyles";
import { ProfilePicture, StudentContainer } from "./styled";

import axios from "../../services/axios";

import Loading from "../../components/Loading";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get("/students");
      setStudents(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteConfirm = (e) => {
    e.preventDefault();
    const exclamationIcon = e.currentTarget.nextSibling;
    exclamationIcon.setAttribute("display", "block");
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id) => {
    try {
      await axios.delete(`/students/${id}`);
      e.target.parentElement.remove();
    } catch (err) {
      const errors = get(err, "response.data.errors", []);
      errors.map((error) => toast.error(error));
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Students</h1>
      <StudentContainer>
        {students.map((student) => (
          <div key={String(student.id)}>
            <ProfilePicture>
              {get(student, "StudentPhotos[0].url", false) ? (
                <img src={student.StudentPhotos[0].url} alt="Profile" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{student.name}</span>
            <span>{student.email}</span>

            <Link to={`/student/${student.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link
              onClick={handleDeleteConfirm}
              to={`/student/${student.id}/delete`}
            >
              <FaWindowClose size={16} />
            </Link>

            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, student.id)}
            />
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
