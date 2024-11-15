import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/";

import { get } from "lodash";
import { FaUserCircle, FaEdit, FaWindowClose } from "react-icons/fa";

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

            <Link to={`/student/${student.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
