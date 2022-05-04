import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteClass, getClassList } from "../../thunks/class";
import * as classSelectors from "../../selectors/class";
import _ from "lodash";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";

const ManageClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classModal = useSelector((state) => state.class);

  const classList = classSelectors.getClassList(classModal);
  const [openCollapse, setOpenCollapse] = useState([]);

  useEffect(() => {
    dispatch(getClassList());
  }, []);

  const onClickView = (classId) => {
    navigate(`../view_class/${classId}`);
  };

  return (
    <div className="mx-auto my-4 w-75">
      <Row className="d-flex align-items-center">
        <Col>
          <h3 className="my-2">Manage Class</h3>
        </Col>
        <Col />
        <Col xs sm="auto">
          <Button variant="primary" as={Link} to="../add_class">
            Add Class
          </Button>
        </Col>
      </Row>

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
                    newOpenCollapse = openCollapse.filter((v) => v !== form);
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
                  {classList[form].map((c) => (
                    <Card
                      className="py-2 px-3 mb-1"
                      key={classSelectors.getClassId(c)}
                      onClick={() => onClickView(classSelectors.getClassId(c))}
                    >
                      <Col>{classSelectors.getName(c)}</Col>
                    </Card>
                  ))}
                </div>
              </Collapse>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ManageClass;
