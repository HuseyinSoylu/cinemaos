import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
// import { useNavigate, HashRouter } from "react-router-dom";
import { useRouter } from "next/navigation";
import "./Days.css";
import Link from "next/link";
import Buy from "@/app/buy/page";
import crypto from "crypto-js";

const Days = ({ selectedCinemas, id }) => {
  const router = useRouter();
  const [key, setKey] = useState();
  const [days, setDays] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const HandleDate = () => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const today = new Date();
    let currentDay = today.getDay();
    let currentDate = today.getDate();
    let currentMonth = today.getMonth();

    if (currentDay === 0) {
      currentDay = 7;
    }

    let dayCount = daysInMonth(currentMonth + 1, 2022);

    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }
    console.log(dayCount);
    const calender = [];
    calender.push({
      day: days[currentDay - 1],
      date: currentDate,
      month: months[currentMonth],
    });
    console.log(months[currentMonth], currentMonth);
    for (let i = 0; i < 6; i++) {
      if (currentDay > 6) {
        currentDay = 0;
      }
      calender.push({
        day: days[currentDay],
        date: currentDate < dayCount ? ++currentDate : (currentDate = 1),
        month:
          currentDate === 1 && currentMonth < 11
            ? months[++currentMonth]
            : currentMonth === 11
            ? months[0]
            : months[currentMonth],
      });
      currentDay++;
    }
    console.log(calender);
    return calender;
  };
  useEffect(() => {
    const days = HandleDate();
    setDays(days);
    setKey(days[0].day);
  }, []);

  const HandleBuyTicket = (element, hour) => {
    const cinemaId = selectedCinemas[0].id;
    setSelectedDateTime({
      filmId: id,
      cinema: cinemaId,
      month: element.month,
      date: element.date,
      time: hour,
    });

    const selectedData = {
      filmId: id,
      cinema: cinemaId,
      month: element.month,
      date: element.date,
      time: hour,
    };

    const encryptedData = crypto.AES.encrypt(
      JSON.stringify(selectedData),
      "huseyin1234" // Burada kendi şifreleme anahtarınızı kullanmalısınız
    ).toString();

    // Local Storage'da saklama
    localStorage.setItem("selectedDateTime", encryptedData);

    router.push("/buy");
  };

  return (
    <div className="container">
      {selectedDateTime && (
        <Buy
          filmId={selectedDateTime.filmId}
          cinema={selectedDateTime.cinema}
          month={selectedDateTime.month}
          date={selectedDateTime.date}
          time={selectedDateTime.time}
        />
      )}
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        {days.map((element, index) => (
          <Tab
            eventKey={element.day}
            key={index}
            title={`${element.date} ${element.month} ${element.day}`}
            className="text-start"
          >
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={() => HandleBuyTicket(element, "13:00")}
            >
              13.00
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={() => HandleBuyTicket(element, "16:00")}
            >
              16.00
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={() => HandleBuyTicket(element, "20:00")}
            >
              20.00
            </button>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default Days;
