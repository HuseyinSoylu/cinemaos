"use client";
import React from "react";
import { useState, useEffect, useContext } from "react";
import "./BuyTicket.css";
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

interface Props {
  params: {
    filmId: string;
    cinemaId: string;
    hour: string;
  };
}

export default function Page({ params }: Props) {
  const userInfo =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userInfo ? JSON.parse(userInfo) : null;
  const userId = user ? user.id : null;
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const month = searchParams.get("month");
  const [movie, setMovie] = useState([]);
  const [cinema, setCinema] = useState([]);
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

  const fetchTasks = () => {
    axios
      .get(`http://localhost:8000/api/films/${params.filmId}`)
      .then((data) => {
        setMovie(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:8000/api/cinemas/${params.cinemaId}`)
      .then((data) => {
        setCinema(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchTasks();
  }, []);

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

  const decodedHour = decodeURIComponent(params.hour);

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
    switch (month) {
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
  }, [month]);

  return (
    <div className="cs-buyticket-container">
      <div className="d-flex">
        <div
          style={{ width: "35%" }}
          className="d-flex justify-content-end pe-4"
        >
          <div
            className="d-flex flex-column align-items-start pt-4"
            style={{ gap: "35px" }}
          >
            <h2>{movie.Title}</h2>
            <Image
              src={movie.Poster}
              alt=""
              style={{ maxWidth: "126px", width: "100%" }}
              width={126}
              height={100}
            />
            <div className="text-start">
              <div className="box">
                <FontAwesomeIcon icon={faLocationDot} />
                <span className="ms-2">{cinema.location}</span>
              </div>
              <div className="box mt-3">
                <FontAwesomeIcon icon={faCalendarDays} />
                <span className="ms-2">
                  {date} {month}
                </span>
              </div>
              <div className="box mt-3">
                <FontAwesomeIcon icon={faClockFour} />
                <span className="ms-2">{params.hour}</span>
                {/* <span className="ms-2">{params.hour time}</span> */}
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "65%", backgroundColor: "#ececec" }}>
          <div className="mainbox text-end goHome">
            <Link href="/">Return Homepage</Link>
          </div>
          {step === 0 ? (
            <>
              <div className="mainbox">
                <div className="d-flex justify-content-between">
                  <h2>Select Ticket</h2>
                  <button
                    className="btn btn-dark nextbtn"
                    onClick={goToNextStep}
                  >
                    Continue
                  </button>
                </div>

                <ChooseTicket />
              </div>
              <div className="mt-3 mainbox">
                <h2 className="disable-title">Seat</h2>
              </div>
              <div className="mt-3 mainbox">
                <h2 className="disable-title">Payment</h2>
              </div>
            </>
          ) : step === 1 ? (
            <>
              <div className="next-box mb-2">
                <h2>Tickets</h2>
                <div>
                  {adultCount > 0 && (
                    <>
                      <span className="count">{adultCount}</span> Adult
                    </>
                  )}
                  {studentCount > 0 && (
                    <>
                      <span className="count ms-3">{studentCount}</span> Student
                    </>
                  )}
                </div>
              </div>
              <div className="mainbox">
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

              <div className="mt-3 mainbox">
                <h2 className="disable-title">Payment</h2>
              </div>
            </>
          ) : step === 2 ? (
            <>
              <div className="next-box mb-2 pb-0">
                <h2>Tickets</h2>
                <div>
                  {adultCount > 0 && (
                    <>
                      <span className="count">{adultCount}</span> Adult
                    </>
                  )}
                  {studentCount > 0 && (
                    <>
                      <span className="count ms-3">{studentCount}</span> Student
                    </>
                  )}
                </div>
              </div>
              <div className="next-box mb-2">
                <h2>Seats</h2>
                <span>{getSeatDetails()}</span>
              </div>
              <div className="next-box flex-column align-items-start pb-4">
                <div
                  className="d-flex justify-content-between"
                  style={{ width: "100%" }}
                >
                  <h2>Payment</h2>
                  <h2>
                    Total <span className="price">{`${price},00 ₺`}</span>
                  </h2>
                </div>
                <Payment
                  filmId={params.filmId}
                  userId={userId}
                  seat={getSeatDetails()} // Pass the seat details here
                  price={price}
                  showtime={`2023-${selectedMonth}-${date}T${decodedHour}:00Z`}
                  //   showtime={`2023-${selectedMonth}-${state.date}T${time}:00Z`}
                  // location={params.cinemaId}
                  //   location={cinema.id}
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
