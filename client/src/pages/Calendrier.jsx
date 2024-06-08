import "aos/dist/aos.css";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import Calendar from "@/components/calendar";

const daysMap = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Saturday",
  "Friday",
];

const grades = [
  "Professeur",
  "Enseignant",
  "Assistant Master A",
  "Assistant Master B",
  "Lecturer A",
  "Lecturer B",
];

export const Calendrier = () => {
  const [seances, setSeances] = useState([]);

  const auth = useAuth();
  useEffect(() => {
    const url = `http://localhost:3000/users/${auth.authData.id}/seances`;
    axios.get(url).then((r) => {
      const sorted = r.data.seances.sort((a, b) => {
        if (a.Day !== b.Day)
          return daysMap.indexOf(a.Day) - daysMap.indexOf(b.Day);

        return a.StartTime < b.StartTime ? -1 : 1;
      });

      setSeances(sorted);
    });
  }, []);

  return (
    <section className="Calendrier">
      <div className="overlay"></div>
      <div className="CalendrierContent container">
        <div className=" bg-white h-screen">
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link to="/Accueil">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <BreadcrumbPage className="text-blue-500">
                      Schedule
                    </BreadcrumbPage>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center pb-4">
            <div className="flex flex-col items-center justify-center mr-auto w-screen">
              <div className="text-2xl font-bold tracking-tight pb-2">
                Individual Calendar
              </div>

              <p className="font-bold pb-1">
                <span className="font-medium">School Year :</span>
                2023/2024
              </p>
              <p className="font-bold pb-1">
                <span className="font-medium">Position :</span>
                {grades[auth.authData.grade]}
              </p>
            </div>
          </div>
          <div className="px-15 py-5">
            <p className="font-bold text-blue-500 pb-1">
              <span className="font-medium text-black">
                Number of Cours Hours :
              </span>
              {seances.filter((s) => s.Type === "Cours").length}H
            </p>
            <p className="font-bold  text-blue-500 pb-1">
              <span className="font-medium text-black">
                Number of TD Hours :
              </span>
              {seances.filter((s) => s.Type === "TD").length}H
            </p>
            <p className="font-bold  text-blue-500 pb-1">
              <span className="font-medium text-black">
                Number of TP Hours :
              </span>
              {seances.filter((s) => s.Type === "TP").length}H
            </p>
          </div>

          <Calendar sessions={seances} personal />
        </div>
      </div>
    </section>
  );
};
