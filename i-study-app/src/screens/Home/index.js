import React, { useEffect, useState } from "react";
import SubjectCard from "./components/SubjectCard";
import { useDispatch, useSelector } from "react-redux";
import * as studentSelectors from "../../selectors/student";
import * as teacherSelectors from "../../selectors/teacher";
import * as subjectSelectors from "../../selectors/subject";
import { USER_TYPE_NUMBER } from "../../utilities/constants";
import { getStudentSubjectList } from "../../thunks/student";
import { getTeacherSubjectList } from "../../thunks/teacher";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studentModal = useSelector((state) => state.student);
  const teacherModal = useSelector((state) => state.teacher);
  const [userType, setUserType] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    const storedUserType = parseInt(localStorage.getItem("userType"));
    if (storedUserType === USER_TYPE_NUMBER.STUDENT) {
      dispatch(getStudentSubjectList());
    } else if (storedUserType === USER_TYPE_NUMBER.TEACHER) {
      dispatch(getTeacherSubjectList());
    }
    setUserType(storedUserType);
    setName(localStorage.getItem("name"));
  }, []);

  const subjectList =
    userType === USER_TYPE_NUMBER.STUDENT
      ? studentSelectors.getSubjectList(studentModal)
      : teacherSelectors.getSubjectList(teacherModal);

  const onClickSubject = (subject) => {
    localStorage.setItem("subject", JSON.stringify(subject));
    navigate(
      "/dashboard/subject/" + subjectSelectors.getClassSubjectId(subject)
    );
  };
  return (
    <>
      <div className="pagetitle">
        <h1>Welcome, {name}</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Home</li>
          </ol>
        </nav>
      </div>

      {userType !== 3 && (
        <>
          <h5>Subject List</h5>
          <div className="row align-items-top">
            {subjectList.map((subject, index) => (
              <SubjectCard
                index={index}
                onClick={() => onClickSubject(subject)}
                subjectName={subjectSelectors.getSubjectName(subject)}
                taughtBy={subjectSelectors.getTeacherName(subject)}
                className={subjectSelectors.getClassName(subject)}
                key={subjectSelectors.getClassSubjectId(subject)}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
