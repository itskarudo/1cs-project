import Calendar from "@/components/calendar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const ScheduleDetails = () => {
  let { id } = useParams();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const url = `http://localhost:3000/schedules/${id}/seances`;
    axios.get(url).then((r) => setSessions(r.data.seances));
  }, []);

  return (
    <div className="px-20 py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/Schedule">Schedule</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-blue-500">Details</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Calendar sessions={sessions} setSessions={setSessions} schedId={id} />
    </div>
  );
};

export default ScheduleDetails;
