import React, { useState, useEffect, useContext } from "react";
import "./ChooseTicket.css";
import { faPlus, faMinus, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TicketContext } from "../../Contexts/TicketContext";

const ChooseTicket = () => {
  const {
    price,
    setPrice,
    count,
    setCount,
    studentCount,
    setStudentCount,
    adultCount,
    setAdultCount,
  } = useContext(TicketContext);
  const [adult, setAdult] = useState(100);
  const [student, seStudent] = useState(90);
  const handlePlus = (value) => {
    adult === value
      ? setAdultCount(adultCount + 1)
      : setStudentCount(studentCount + 1);
    setCount(count + 1);
  };
  const handleMinus = (value) => {
    adult === value
      ? setAdultCount(adultCount - 1)
      : setStudentCount(studentCount - 1);
    setCount(count - 1);
  };
  const handlePrice = () => {
    count === 0
      ? setPrice(0)
      : setPrice(adult * adultCount + student * studentCount);
  };
  useEffect(() => {
    handlePrice();
  }, [count]);

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center cs-ticket-box mt-3">
        <span style={{ width: "60%" }}>
          <i className="me-2 ms-3 cs-ticket-icon">
            <FontAwesomeIcon icon={faTicket} />
          </i>
          Adult
        </span>
        <span style={{ width: "20%" }}>100 ₺</span>
        <span
          style={{ width: "20%" }}
          className="d-flex justify-content-around"
        >
          <button
            className="plus-minus"
            disabled={adultCount === 0}
            onClick={(e) => handleMinus(adult)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>{adultCount}</span>
          <button className="plus-minus" onClick={(e) => handlePlus(adult)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </span>
      </div>
      <div className="d-flex justify-content-between align-items-center cs-ticket-box mt-3">
        <span style={{ width: "60%" }}>
          <i className="me-2 ms-3 cs-ticket-icon">
            <FontAwesomeIcon icon={faTicket} />
          </i>
          Student
        </span>
        <span style={{ width: "20%" }}>90 ₺</span>
        <span
          style={{ width: "20%" }}
          className="d-flex justify-content-around"
        >
          <button
            className="plus-minus"
            disabled={studentCount === 0}
            onClick={(e) => handleMinus(student)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>{studentCount}</span>
          <button className="plus-minus" onClick={(e) => handlePlus(student)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </span>
      </div>
      <div className="mt-5 text-end">{`Total Cost: ${price},00 ₺`}</div>
    </div>
  );
};

export default ChooseTicket;
