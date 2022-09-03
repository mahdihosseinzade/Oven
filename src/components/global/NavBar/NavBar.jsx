import React from "react";
import { Container, Navbar, Nav, Offcanvas, Dropdown } from "react-bootstrap";
import logoG from "../../../assets/image/logo-green.png";
import logo from "../../../assets/image/logo.png";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryHooks from "../../hooks/queryHooks";
import { useUser } from "../../hooks/useUser";
import {
  faUserCircle,
  faHome,
  faStar,
  faBookmark,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

import "./NavBar.scss";

const NavBar = () => {
  const { data, isSuccess } = queryHooks.useGetUser();
  const { logout } = useUser();

  const menu = [
    {
      id: uuidv4(),
      path: "/home",
      name: "صفحه اصلی",
      icon: faHome,
    },
    {
      id: uuidv4(),
      path: "/events",
      name: "ایونت ها",
      icon: faStar,
    },
    {
      id: uuidv4(),
      path: "/profile",
      name: "پروفایل",
      icon: faUserCircle,
    },
    {
      id: uuidv4(),
      path: "/myorders",
      name: "سفارشات",
      icon: faBookmark,
    },
    {
      id: uuidv4(),
      path: "/messages",
      name: "تیکت ها",
      icon: faCommentDots,
    },
  ];

  return (
    <Navbar className="NavBar" bg="light" expand="md" variant="light">
      <Container fluid>
        <Navbar.Toggle aria-controls="nav-bar" />

        <Navbar.Offcanvas className="NavBar-sidebar" dir="rtl" placement="end">
          <Offcanvas.Header closeButton closeVariant="white">
            <img src={logo} alt="oven" />
          </Offcanvas.Header>
          <hr />
          <Offcanvas.Body id="nav-bar">
            <Nav>
              {menu.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="d-flex flex-row align-items-center">
                      <label htmlFor={item.id}>
                        <FontAwesomeIcon
                          className="nav-icon"
                          icon={item.icon}
                        />
                      </label>

                      <Nav.Link
                        className="NavBar-link"
                        href={item.path}
                        id={item.id}
                      >
                        {item.name}
                      </Nav.Link>
                    </div>

                    <hr />
                  </div>
                );
              })}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <Navbar.Collapse className="NavBar-collapse">
          <Nav className="NavBar-nav">
            {menu.map((item) => (
              <Nav.Link className="NavBar-link" key={item.id} href={item.path}>
                {item.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>

        <div className="NavBar-user align-items-center">
          <FontAwesomeIcon className="NavBar-icon" icon={faUserCircle} />
          <Dropdown className="NavBar-dropdown">
            <Dropdown.Toggle className="NavBar-name">
              {isSuccess &&
                (data.data.firstName || data.data.lastName || "کاربر")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => logout()}>خروج</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Navbar.Brand className="NavBar-brand" href="#">
          <img src={logoG} alt="oven" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
