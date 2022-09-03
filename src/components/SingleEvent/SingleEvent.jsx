import "./SingleEvent.scss";

const SingleEvent = ({ img, name, date, discount, description }) => {
  return (
    <article className="SingleEvent d-flex flex-row" dir="rtl">
      <div className="SingleEvent-box-img">
        <img className="SingleEvent-img" src={img} alt={name} />
      </div>
      <div className="SingleEvent-box-content d-flex flex-column justify-content-around align-items-start">
        <div className="SingleEvent-box d-flex flex-row justify-content-center align-items-center">
          <h2 className="SingleEvent-title">{name}</h2>
          تاریخ ایونت
          <p className="SingleEvent-date m-0">{date}</p>
        </div>
        <div className="SingleEvent-box d-flex flex-row justify-content-center">
          درصد تخفیف
          <p className="SingleEvent-discount">{discount}</p>
        </div>
        <div className="SingleEvent-box-description d-none">
          توضیحات
          <p className="SingleEvent-description">{description}</p>
        </div>
      </div>
    </article>
  );
};

export default SingleEvent;
