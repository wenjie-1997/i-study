import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClassList } from "../../thunks/class";
import * as classSelectors from "../../selectors/class";
import _ from "lodash";
import {
  IoChevronUpOutline,
  IoChevronDownOutline,
  IoAddCircleOutline,
} from "react-icons/io5";

const ManageClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classModal = useSelector((state) => state.class);

  const classList = classSelectors.getClassList(classModal);
  const [openCollapse, setOpenCollapse] = useState([]);

  useEffect(() => {
    dispatch(getClassList());
  }, []);

  const onClickView = (c) => {
    localStorage.setItem("class", JSON.stringify(c));
    navigate(`../view_class/${classSelectors.getClassId(c)}`);
  };

  return (
    <>
      <div className="pagetitle">
        <h1>Manage Class</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Class</li>
          </ol>
        </nav>
      </div>

      <Card>
        <Card.Body className="pt-4">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <p className="card-title m-0 p-0">Available Classes</p>
            <div
              className="d-flex flew-row align-items-center justify-content-center"
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("../add_class")}
            >
              <IoAddCircleOutline style={{ margin: "0 8px" }} />
              <b>Add Class</b>
            </div>
          </div>

          <div>
            {Object.keys(classList).map((form) => {
              const isOpened = openCollapse.includes(form);
              return (
                <Card
                  key={form}
                  className="my-2 py-3 px-4 d-flex justtify-content-center"
                >
                  <div
                    className="d-flex align-items-center justify-content-between"
                    onClick={() => {
                      let newOpenCollapse = _.clone(openCollapse);
                      if (isOpened) {
                        newOpenCollapse = openCollapse.filter(
                          (v) => v !== form
                        );
                      } else newOpenCollapse.push(form);
                      setOpenCollapse(newOpenCollapse);
                    }}
                  >
                    <h5 className="p-0 m-0">Form {form}</h5>
                    {isOpened ? (
                      <IoChevronUpOutline size={20} />
                    ) : (
                      <IoChevronDownOutline size={20} />
                    )}
                  </div>
                  <Collapse in={isOpened}>
                    <div className="my-2">
                      <hr className="m-0" />
                      {classList[form].map((c) => (
                        <div key={classSelectors.getClassId(c)}>
                          <div
                            className="py-3 px-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => onClickView(c)}
                          >
                            {classSelectors.getName(c)}
                          </div>
                          <hr className="m-0" />
                        </div>
                      ))}
                    </div>
                  </Collapse>
                </Card>
              );
            })}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ManageClass;
