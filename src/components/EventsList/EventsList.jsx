import "./EventsList.scss";
import EventImg01 from "../../assets/image/event-01.png";
import EventImg02 from "../../assets/image/event-02.png";
import EventImg03 from "../../assets/image/event-03.png";
import EventImg04 from "../../assets/image/event-04.png";
import EventImg05 from "../../assets/image/event-05.png";
import SingleEvent from "../SingleEvent/SingleEvent";
import { Strings } from "../../assets/strings/strings";

const EventList = () => {
  const Events = [
    {
      name: "نام ایونت",
      date: "99.4.5",
      img: EventImg01,
      discount: "%62",
      discription: Strings.lorem,
    },
    {
      name: "نام ایونت",
      date: "99.4.5",
      img: EventImg01,
      discount: "%62",
      discription: Strings.lorem,
    },
    {
      name: "نام ایونت",
      date: "99.4.5",
      img: EventImg01,
      discount: "%62",
      discription: Strings.lorem,
    },
    {
      name: "نام ایونت",
      date: "99.4.5",
      img: EventImg01,
      discount: "%62",
      discription: Strings.lorem,
    },
    {
      name: "نام ایونت",
      date: "99.4.5",
      img: EventImg01,
      discount: "%62",
      discription: Strings.lorem,
    },
    {
      name: "نام ایونت",
      date: "99.4.5",
      img: EventImg01,
      discount: "%62",
      discription: Strings.lorem,
    },
    {
      name: "نام ایونت",
      date: "99.4.5",
      img: EventImg01,
      discount: "%62",
      discription: Strings.lorem,
    },
    {
      name: "نام ایونت",
      date: "99.4.5",
      img: EventImg01,
      discount: "%62",
      discription: Strings.lorem,
    },
    {
      name: "نام ایونت",
      date: "99.4.5",
      img: EventImg01,
      discount: "%62",
      discription: Strings.lorem,
    },
    {
      name: "نام ایونت",
      date: "99.4.5",
      img: EventImg01,
      discount: "%62",
      discription: Strings.lorem,
    },
  ];
  return (
    <section className="EventList d-flex flex-column align-items-end p-3">
      {Events.map((event) => {
        return (
          <>
            <SingleEvent
              name={event.name}
              date={event.date}
              img={event.img}
              discount={event.discount}
              description={event.discription}
            />
            <hr />
          </>
        );
      })}
    </section>
  );
};

export default EventList;
