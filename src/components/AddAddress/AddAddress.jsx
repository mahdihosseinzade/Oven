import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Location from "../Location/Location";
import Map, { Marker } from "react-map-gl";
import { Button, Form, Modal } from "react-bootstrap";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Strings } from "../../assets/strings/strings";

import "./AddAddress.scss";

const AddAddress = () => {
  const [showMap, setShowMap] = useState(false);
  const [markerLocation, setMarkerLocation] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 16,
  });

  const [address, setAddress] = useState({
    place: "",
    address: "",
    pelak: "",
    vahed: "",
  });

  const handleChangeAddress = (e) => {
    setAddress((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <section className="AddAddress">
      <Modal
        className="AddAddress-modal"
        show={showMap}
        onHide={() => setShowMap(false)}
      >
        <Location
          setShowMap={setShowMap}
          setMarkerLocation={setMarkerLocation}
          markerLocation={markerLocation}
        />
      </Modal>
      <div className="AddAddress-set d-flex flex-column justify-content-center align-items-center w-100">
        <Form className="AddAddress-set-form d-flex flex-wrap justify-content-between">
          <Form.Group className="AddAddress-set-form-place mb-3 w-100">
            <Form.Label htmlFor="place">عنوان</Form.Label>
            <Form.Control
              type="text"
              id="place"
              placeholder="برای مثال : خانه"
              value={address.place}
              onChange={handleChangeAddress}
            />
          </Form.Group>
          <Form.Group className="AddAddress-set-form-address mb-3 w-100">
            <Form.Label htmlFor="address">آدرس</Form.Label>
            <Form.Control
              type="text"
              id="address"
              placeholder="برای مثال : مشهد ، بلوار کوثر ، کوثر شمالی 13"
              value={address.address}
              onChange={handleChangeAddress}
            />
          </Form.Group>
          <Form.Group className="AddAddress-set-form-pelak mb-3">
            <Form.Label htmlFor="pelak">پلاک</Form.Label>
            <Form.Control
              type="text"
              id="pelak"
              placeholder="برای مثال : پلاک 12/2"
              value={address.pelak}
              onChange={handleChangeAddress}
            />
          </Form.Group>
          <Form.Group className="AddAddress-set-form-vahed">
            <Form.Label htmlFor="vahed">واحد</Form.Label>
            <Form.Control
              type="text"
              id="vahed"
              placeholder="برای مثال : واحد 1"
              value={address.vahed}
              onChange={handleChangeAddress}
            />
          </Form.Group>
        </Form>

        {!markerLocation.longitude ? (
          <div
            className="AddAddress-set-location d-flex flex-column justify-content-center align-items-center"
            onClick={() => {
              setShowMap(true);
              setMarkerLocation({ ...markerLocation, set: false });
            }}
          >
            <FontAwesomeIcon
              className="AddAddress-set-location-icon"
              icon={faMapMarkerAlt}
            />
            انتخاب آدرس بر روی نقشه
          </div>
        ) : (
          <div
            className="AddAddress-set-location d-flex flex-column justify-content-center align-items-center"
            onClick={() => {
              setShowMap(true);
            }}
          >
            <Map
              initialViewState={markerLocation}
              mapboxAccessToken="pk.eyJ1IjoiaGFyZGJpdHRlbiIsImEiOiJja2tzZ244cm4zcDc2MnZxdHJ2ODhqZGs1In0.iqvwcWGKLnmWRiW-VDrBGw"
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              <Marker
                longitude={markerLocation?.longitude}
                latitude={markerLocation?.latitude}
                anchor="bottom"
              >
                <FontAwesomeIcon
                  className="Location-mapBox-marker"
                  icon={faMapMarkerAlt}
                />
              </Marker>
            </Map>
          </div>
        )}

        <p className="AddAddress-text">{Strings.ADD_ADDRESS.Text}</p>

        <Button className="AddAddress-set-btn">ثبت آدرس</Button>
      </div>
    </section>
  );
};

export default AddAddress;
