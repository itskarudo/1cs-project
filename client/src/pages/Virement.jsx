import "./Virement.css";
import "aos/dist/aos.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

export const Virement = () => {
  const auth = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = `http://localhost:3000/users/${auth.authData.id}/payement`;
    axios.get(url).then((r) => setData(r.data));
  }, []);

  if (!data) return null;
  return (
    <section className="Virement">
      <div className="overlay"></div>
      <div className="VirementContent container">
        <div className="h-screen">
          <div>
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
                    <BreadcrumbPage className="text-blue-500">
                      Payment
                    </BreadcrumbPage>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center pb-4">
            <div className="flex flex-col items-center justify-center mr-auto w-screen">
              <Card className="w-2/3">
                <CardHeader>
                  <CardTitle></CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment for current session</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Total Weeks :
                          <span className="text-gray-900 font-bold ms-auto space-x-4  d-flex justify-content-end">
                            {" "}
                            {data.TotalWeeks}
                          </span>
                        </p>
                        <p className="text-gray-600">
                          Total Supplementary Hours :
                          <span className="text-gray-900 font-bold ms-auto space-x-4  d-flex justify-content-end">
                            {" "}
                            {data.TotalSuppHours}h
                          </span>
                        </p>
                        <p className="text-gray-600">
                          Total Supplementary Hours - Absences :
                          <span className="text-gray-900 font-bold ms-auto space-x-4  d-flex justify-content-end">
                            {" "}
                            {data.PureSuppHoursNumber}h
                          </span>
                        </p>
                        <p className="text-gray-600">
                          Total Amount:{" "}
                          <span className="text-blue-600 ms-auto font-bold d-flex justify-content-end">
                            {data.PureAmount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "DZD",
                            })}
                          </span>
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
