"use client";
import React from "react";
import { useState, useEffect, useContext } from "react";
// import "./BuyTicket.css";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClockFour,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Chairs from "@/app/components/Chairs/Chairs";
import ChooseTicket from "@/app/components/Ticket/ChooseTicket";
import { TicketContext } from "@/app/Contexts/TicketContext";
import Payment from "@/app/components/Payment/Payment";
import { ChairContext } from "@/app/Contexts/ChairContext";
import Image from "next/image";
import Link from "next/link";
import crypto from "crypto-js";
import classes from "./page.module.css";
import classNames from "classnames";
interface Props {
  params: {
    filmId: string;
    cinemaId: string;
    hour: string;
  };
}
export default function Page() {
  const [decryptedData, setDecryptedData] = useState(null);
  const userInfo =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userInfo ? JSON.parse(userInfo) : null;
  const userId = user ? user.id : null;
  const [movie, setMovie] = useState([]);
  const [cinemaSalon, setCinemaSalon] = useState([]);
  const { selectedChair, setSelectedChair } = useContext<any>(ChairContext);
  const {
    price,
    count,
    setCount,
    adultCount,
    studentCount,
    setAdultCount,
    setStudentCount,
  } = useContext<any>(TicketContext);
  const [step, setStep] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    // Local Storage'dan veriyi alın
    const encryptedData = localStorage.getItem("selectedDateTime");

    if (encryptedData) {
      // Şifreli veriyi çözümleyin
      const decryptedBytes = crypto.AES.decrypt(encryptedData, "huseyin1234");
      const decryptedJson = decryptedBytes.toString(crypto.enc.Utf8);
      const decryptedData = JSON.parse(decryptedJson);

      console.log(decryptedData);

      // Çözümlenen veriyi state'e kaydedin
      setDecryptedData(decryptedData);
      setSelectedMonth(decryptedData?.month);
    }
  }, []);

  useEffect(() => {
    if (decryptedData) {
      axios
        .get(`http://localhost:8000/api/films/${decryptedData.filmId}`)
        .then((data) => {
          setMovie(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(`http://localhost:8000/api/cinemas/${decryptedData.cinema}`)
        .then((data) => {
          setCinemaSalon(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [decryptedData]);

  const goToNextStep = () => {
    if (count > 0) {
      setStep(step + 1);
    } else alert("Select at least one ticket");
  };
  const goToPayment = () => {
    if (selectedChair.length < count || selectedChair.length > count) {
      alert(`Choose ${count} seat.`);
    } else setStep(step + 1);
  };

  useEffect(() => {
    return () => {
      setAdultCount(0);
      setStudentCount(0);
      setSelectedChair([]);
      setCount(0);
    };
  }, []);

  const decodedHour = decodeURIComponent(decryptedData?.time);

  const getSeatDetails = () => {
    const chairData = JSON.parse(localStorage.getItem("chair"));
    console.log({ chairData });
    if (chairData && chairData.length > 0) {
      const selectedSeatDetails = chairData
        .filter((chair) => chair.isSelected)
        .map((chair) => `${chair.letter}${chair.num}`);
      console.log(selectedSeatDetails.join(", "));
      return selectedSeatDetails.join(", ");
    }
    return "";
  };

  useEffect(() => {
    switch (selectedMonth) {
      case "January":
        setSelectedMonth("01");
        break;
      case "February":
        setSelectedMonth("02");
        break;
      case "March":
        setSelectedMonth("03");
        break;
      case "April":
        setSelectedMonth("04");
        break;
      case "May":
        setSelectedMonth("05");
        break;
      case "June":
        setSelectedMonth("06");
        break;
      case "July":
        setSelectedMonth("07");
        break;
      case "August":
        setSelectedMonth("08");
        break;
      case "September":
        setSelectedMonth("09");
        break;
      case "October":
        setSelectedMonth("10");
        break;
      case "November":
        setSelectedMonth("11");
        break;
      case "December":
        setSelectedMonth("12");
        break;
      default:
        break;
    }
  }, [selectedMonth]);

  return (
    <div
      className={classNames(
        classes.csBuyticketContainer,
        "background: linear-gradient(13deg, #ec2938 0%, #e6017c 99%)"
      )}
      style={{
        background: "linear-gradient(13deg, #ec2938 0%, #e6017c 99%)",
        color: "#ffffff",
      }}
    >
      <div className="d-flex" style={{ color: "#000" }}>
        <div
          style={{ width: "35%" }}
          className="d-flex justify-content-end pe-4"
        >
          <div
            className="d-flex flex-column align-items-start pt-4"
            style={{ gap: "35px" }}
          >
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt="poster" width={200} height={350} />
            <div className="text-start">
              <div className={classes.box}>
                <FontAwesomeIcon icon={faLocationDot} />
                <span className="ms-2">{cinemaSalon.location}</span>
              </div>
              <div className={classNames("mt-3", classes.box)}>
                <FontAwesomeIcon icon={faCalendarDays} />
                <span className="ms-2">
                  {decryptedData?.date} {decryptedData?.month}
                </span>
              </div>
              <div className={classNames("mt-3", classes.box)}>
                <FontAwesomeIcon icon={faClockFour} />
                <span className="ms-2">{decryptedData?.time}</span>
                {/* <span className="ms-2">{params.hour time}</span> */}
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "65%", backgroundColor: "#ececec" }}>
          <div
            className={classNames("text-end", classes.mainbox, classes.goHome)}
          >
            <Link href="/">Return Homepage</Link>
          </div>
          {step === 0 ? (
            <>
              <div className={classes.mainbox}>
                <div className="d-flex justify-content-between">
                  <h2>Select Ticket</h2>
                  <button
                    className={classNames("btn", "btn-dark", classes.nextbtn)}
                    onClick={goToNextStep}
                  >
                    Continue
                  </button>
                </div>

                <ChooseTicket />
              </div>
              <div className={classNames("mt-3", classes.mainbox)}>
                <h2 className={classes.disableTitle}>Seat</h2>
              </div>
              <div className={classNames("mt-3", classes.mainbox)}>
                <h2 className={classes.disableTitle}>Payment</h2>
              </div>
            </>
          ) : step === 1 ? (
            <>
              <div className={classNames("mb-2", classes.nextBox)}>
                <h2>Tickets</h2>
                <div>
                  {adultCount > 0 && (
                    <>
                      <span className={classes.count}>{adultCount}</span> Adult
                    </>
                  )}
                  {studentCount > 0 && (
                    <>
                      <span className={classNames("ms-3", classes.count)}>
                        {studentCount}
                      </span>{" "}
                      Student
                    </>
                  )}
                </div>
              </div>
              <div className={classes.mainbox}>
                <div className="d-flex justify-content-between mb-2">
                  <h2>Select Seat</h2>
                  <button
                    className="btn btn-dark nextbtn"
                    onClick={goToPayment}
                  >
                    Continue
                  </button>
                </div>
                <Chairs />
              </div>

              <div className={classNames("ms-3", classes.mainbox)}>
                <h2 className={classes.disableTitle}>Payment</h2>
              </div>
            </>
          ) : step === 2 ? (
            <>
              <div className={classNames("mb-2", "pb-0", classes.nextBox)}>
                <h2>Tickets</h2>
                <div>
                  {adultCount > 0 && (
                    <>
                      <span className={classes.count}>{adultCount}</span> Adult
                    </>
                  )}
                  {studentCount > 0 && (
                    <>
                      <span className={classNames("ms-3", classes.count)}>
                        {studentCount}
                      </span>{" "}
                      Student
                    </>
                  )}
                </div>
              </div>
              <div className={classNames("mb-2", classes.nextBox)}>
                <h2>Seats</h2>
                <span>{getSeatDetails()}</span>
              </div>
              <div
                className={classNames(
                  "flex-column",
                  "align-items-start",
                  "pb-4",
                  classes.nextBox
                )}
              >
                <div
                  className="d-flex justify-content-between"
                  style={{ width: "100%" }}
                >
                  <h2>Payment</h2>
                  <h2>
                    Total{" "}
                    <span className={classes.price}>{`${price},00 ₺`}</span>
                  </h2>
                </div>
                <Payment
                  filmId={decryptedData?.filmId}
                  userId={userId}
                  seat={getSeatDetails()} // Pass the seat details here
                  price={price}
                  showtime={`2023-${selectedMonth}-${decryptedData?.date}T${decodedHour}:00Z`}
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
