import React from "react";
import EventList from "../../components/EventsList/EventsList";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./EventRouter.scss";

const EventRouter = () => {
  return (
    <div className="EventRouter d-flex flex-column justify-content-center align-items-center">
      <EventList />
    </div>
  );
};

export default EventRouter;
