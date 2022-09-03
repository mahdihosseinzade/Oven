import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAlt,
  faMapMarkerAlt,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Modal } from "react-bootstrap";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import "./Profile.scss";
import Location from "../Location/Location";
import AddAddress from "../AddAddress/AddAddress";
import Select from "react-select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [markerLocation, setMarkerLocation] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 16,
  });
  const [showMap, setShowMap] = useState(false);
  const [form, setForm] = useState({
    name: "",
    family: "",
    email: "",
    gender: "",
    mobile: "",
  });

  const [selectedDay, setSelectedDay] = useState(null);
  const handleChangeForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <section className="Profile" dir="rtl">
      <Modal
        className="Cartemp-modal"
        show={showMap}
        onHide={() => setShowMap(false)}
      >
        <Location
          setShowMap={setShowMap}
          setMarkerLocation={setMarkerLocation}
          markerLocation={markerLocation}
        />
      </Modal>
      <section className="Profile-info">
        <div className="Profile-info-header d-flex flex-row justify-content-between align-items-center">
          <div>
            <FontAwesomeIcon
              className="Profile-info-header-icon"
              icon={faUserAlt}
            />
            اطلاعات شخصی
          </div>
          <Button
            className="Profile-info-header-btn"
            onClick={() => navigate("/orders")}
          >
            {" "}
            تاریخچه سفارشات
          </Button>
        </div>
        <Form className="Profile-info-form d-flex flex-row flex-wrap justify-content-between">
          <Form.Group className="Profile-info-form-name d-flex flex-column align-items-start mb-4 w-100">
            <Form.Label htmlFor="name">نام</Form.Label>
            <Form.Control
              id="name"
              type="text"
              placeholder="نام "
              value={form.name}
              onChange={handleChangeForm}
            />
          </Form.Group>
          <Form.Group className="Profile-info-form-family d-flex flex-column align-items-start mb-4 w-100">
            <Form.Label htmlFor="family">نام خانوادگی</Form.Label>
            <Form.Control
              id="family"
              type="text"
              placeholder="نام خانوادگی"
              value={form.family}
              onChange={handleChangeForm}
            />
          </Form.Group>
          <Form.Group className="Profile-info-form-email d-flex flex-column align-items-start mb-4 w-100">
            <Form.Label htmlFor="email">ایمیل</Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="ایمیل"
              value={form.email}
              onChange={handleChangeForm}
            />
          </Form.Group>

          <Form.Group className="Profile-info-form-mobile d-flex flex-column align-items-start mb-4 w-100">
            <Form.Label htmlFor="mobile">شماره همراه</Form.Label>
            <Form.Control
              id="mobile"
              type="tel"
              placeholder="شماره همراه"
              value={form.mobile}
              onChange={handleChangeForm}
            />
          </Form.Group>

          <Form.Group className="Profile-info-form-birthday d-flex flex-column align-items-start mb-4">
            <Form.Label htmlFor="birthday">تاریخ تولد</Form.Label>
            <DatePicker
              id="birthday"
              value={selectedDay}
              onChange={setSelectedDay}
              inputPlaceholder="تاریخ تولد"
              shouldHighlightWeekends
              locale="fa"
            />
          </Form.Group>

          <Form.Group className="Profile-info-form-gender d-flex flex-column align-items-start mb-4">
            <Form.Label htmlFor="gender">جنسیت</Form.Label>
            <Select
              id="gender"
              options={[
                { value: "", label: "جنسیت" },
                { value: "men", label: "آقا" },
                { value: "women", label: "خانم" },
              ]}
              isSearchable={false}
              isClearable={false}
              defaultValue={gender}
              placeholder={"جنسیت"}
              onChange={(e) => setGender(e.value)}
            />
          </Form.Group>

          <Button className="Profile-info-form-btn">ذخیره اطلاعات</Button>
        </Form>
      </section>
      <section className="Profile-address">
        <div className="Profile-address-title d-flex justify-content-start align-items-center">
          <FontAwesomeIcon
            className="Profile-address-title-icon"
            icon={faMapMarkerAlt}
          />
          آدرس های من
        </div>
        <AddAddress />
      </section>
      <div className="Profile-code">
        <div className="Profile-code-text">
          <FontAwesomeIcon icon={faThumbsUp} className="Profile-code-icon" />
          کد معرف
        </div>
        <Button className="Profile-code-btn">
          <span>9TYPZ</span>
        </Button>
      </div>
    </section>
  );
};

export default Profile;
