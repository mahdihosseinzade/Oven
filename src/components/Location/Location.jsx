import { useState } from "react";
import { Button } from "react-bootstrap";
import Map, {
  Source,
  Layer,
  Marker,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";
import { Strings } from "../../assets/strings/strings";
import "./Location.scss";
import { dataLayer } from "./map-style";
import { useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "mapbox-gl/dist/mapbox-gl.css";

const Location = ({ setShowMap, setMarkerLocation, markerLocation }) => {
  const queryClient = new useQueryClient();
  const branchs = queryClient.getQueryData("branchs");
  const coordinates = branchs?.map((branch) => {
    return branch.polygon.geometry.coordinates;
  });
  const data = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: coordinates,
        },
      },
    ],
  };

  const [viewPort, setViewPort] = useState({
    longitude: 59.599457,
    latitude: 36.310699,
    zoom: 11,
  });

  const [marker, setMarker] = useState(markerLocation);

  const handleSelectLocation = (e) => {
    setMarker({
      longitude: e.lngLat.lng,
      latitude: e.lngLat.lat,
    });
  };

  const handleSubmit = () => {
    setShowMap(false);
    setMarkerLocation({
      ...marker,
      zoom: 16,
    });
  };
  return (
    <div className="Location d-flex flex-column" dir="rtl">
      <p className="Location-accessAreaText">
        {Strings.LOCATION.AccessAreaText}
      </p>

      <div className="Location-mapBox">
        <Map
          initialViewState={viewPort}
          mapboxAccessToken="pk.eyJ1IjoiaGFyZGJpdHRlbiIsImEiOiJja2tzZ244cm4zcDc2MnZxdHJ2ODhqZGs1In0.iqvwcWGKLnmWRiW-VDrBGw"
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onClick={handleSelectLocation}
        >
          <GeolocateControl position="top-right" />
          <NavigationControl position="top-right" />
          <Source id="data" type="geojson" data={data}>
            <Layer {...dataLayer} />
          </Source>

          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            anchor="bottom"
          >
            <FontAwesomeIcon
              className="Location-mapBox-marker"
              icon={faMapMarkerAlt}
            />
          </Marker>
        </Map>
      </div>
      <p className="Location-addressText">{Strings.LOCATION.AddressText}</p>
      <div className="Location-buttons">
        <Button
          className="Location-buttons-close"
          onClick={() => setShowMap(false)}
        >
          بستن
        </Button>
        <Button className="Location-buttons-submit" onClick={handleSubmit}>
          ثبت
        </Button>
      </div>
    </div>
  );
};

export default Location;
