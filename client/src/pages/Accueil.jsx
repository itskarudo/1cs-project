import React, { useEffect } from "react";
import "./Accueil.css";
import "./Calendrier";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useState } from "react";

export const Accueil = () => {
  const auth = useAuth();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [hours, setHours] = useState([]);

  useEffect(() => {
    const url = `http://localhost:3000/users/${auth.authData.id}/seances/supplementary`;
    axios.get(url).then((r) => setHours(r.data.supplementary));
  }, []);

  return (
    <section className="Accueil">
      <div className="overlay"></div>
      <div className="AccueilContent container">
        <div className="textDiv">
          <h3 data-aos="fade up" className="text-muted-foreground py-2">
            Hello Mr
          </h3>
          <h1
            data-aos="fade up"
            className="AccueilTitle font-bold tracking-tight pb-2"
          >
            {auth.authData.firstName} {auth.authData.lastName}
          </h1>
        </div>
        <div data-aos="fade up" className="AccueilTitleD mb-4">
          Your supplementary hours for this <span>month</span>
        </div>
        <div className="px-20">
          <Card>
            <CardHeader className="">
              <CardTitle className="flex title-left">
                supplementary Hours
              </CardTitle>
              <CardDescription>
                Your weekly supplementary hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Hour</TableCell>
                    <TableCell>Class Type</TableCell>
                    <TableCell>Module</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hours.map((item) => (
                    <TableRow key={item.id} style={{ height: "50px" }}>
                      <TableCell>{item.Day}</TableCell>
                      <TableCell>
                        {item.StartTime.slice(0, 5)} -{" "}
                        {item.EndTime.slice(0, 5)}
                      </TableCell>

                      <TableCell>{item.Type}</TableCell>
                      <TableCell>{item.Module}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Accueil;
