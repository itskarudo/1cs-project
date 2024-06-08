import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

const classes = [
  ...Array.from({ length: 16 }).map((_, i) => ({
    value: `Class ${i + 1}`,
    label: `Class ${i + 1}`,
  })),
  {
    value: "Amphi A",
    label: "Amphi A",
  },
  {
    value: "Amphi B",
    label: "Amphi B",
  },
  {
    value: "Amphi C",
    label: "Amphi C",
  },
  {
    value: "Amphi D",
    label: "Amphi D",
  },
  {
    value: "Amphi E",
    label: "Amphi E",
  },
];

const modules = [
  {
    label: "Algorithms and Static Data Structures",
    value: "Algorithms and Static Data Structures",
  },
  {
    label: "Computer Architecture 1",
    value: "Computer Architecture 1",
  },
  {
    label: "Introduction to Operating Systems 1",
    value: "Introduction to Operating Systems 1",
  },
  {
    label: "Mathematical Analysis 1",
    value: "Mathematical Analysis 1",
  },
  {
    label: "Algebra 1",
    value: "Algebra 1",
  },
  {
    label: "Electricity",
    value: "Electricity",
  },
  {
    label: "Written Expression Technique",
    value: "Written Expression Technique",
  },
  {
    label: "Office and Web",
    value: "Office and Web",
  },
  {
    label: "Algorithms and Dynamic Data Structures",
    value: "Algorithms and Dynamic Data Structures",
  },
  {
    label: "Introduction to Operating Systems 2",
    value: "Introduction to Operating Systems 2",
  },
  {
    label: "Mathematical Analysis 2",
    value: "Mathematical Analysis 2",
  },
  {
    label: "Algebra 2",
    value: "Algebra 2",
  },
  {
    label: "Point Mechanics",
    value: "Point Mechanics",
  },
  {
    label: "Fundamental Electronics 1",
    value: "Fundamental Electronics 1",
  },
  {
    label: "Oral Expression Technique",
    value: "Oral Expression Technique",
  },
  {
    label: "English Language 1",
    value: "English Language 1",
  },
  {
    label: "File and Data Structures",
    value: "File and Data Structures",
  },
  {
    label: "Computer Architecture 2",
    value: "Computer Architecture 2",
  },
  {
    label: "Mathematical Analysis 3",
    value: "Mathematical Analysis 3",
  },
  {
    label: "Algebra 3",
    value: "Algebra 3",
  },
  {
    label: "Fundamental Electronics 2",
    value: "Fundamental Electronics 2",
  },
  {
    label: "Probability and Statistics 1",
    value: "Probability and Statistics 1",
  },
  {
    label: "English Language 2",
    value: "English Language 2",
  },
  {
    label: "Business Economics",
    value: "Business Economics",
  },
  {
    label: "Object Oriented Programming",
    value: "Object Oriented Programming",
  },
  {
    label: "Introduction to Information Systems",
    value: "Introduction to Information Systems",
  },
  {
    label: "Mathematical Analysis 4",
    value: "Mathematical Analysis 4",
  },
  {
    label: "Mathematical Logic",
    value: "Mathematical Logic",
  },
  {
    label: "Optics and Electromagnetic Waves",
    value: "Optics and Electromagnetic Waves",
  },
  {
    label: "Probability and Statistics 2",
    value: "Probability and Statistics 2",
  },
  {
    label: "English Language 3",
    value: "English Language 3",
  },
  {
    label: "Operating Systems 1",
    value: "Operating Systems 1",
  },
  {
    label: "Networking 1",
    value: "Networking 1",
  },
  {
    label: "Introduction to Software Engineering",
    value: "Introduction to Software Engineering",
  },
  {
    label: "Databases",
    value: "Databases",
  },
  {
    label: "Language Theory",
    value: "Language Theory",
  },
  {
    label: "Numerical Analysis",
    value: "Numerical Analysis",
  },
  {
    label: "Operational Research",
    value: "Operational Research",
  },
  {
    label: "English Language 1",
    value: "English Language 1",
  },
  {
    label: "Operating Systems 2",
    value: "Operating Systems 2",
  },
  {
    label: "Networking 2",
    value: "Networking 2",
  },
  {
    label: "Advanced Computer Architecture",
    value: "Advanced Computer Architecture",
  },
  {
    label: "Web Languages and Tools",
    value: "Web Languages and Tools",
  },
  {
    label: "Introduction to Computer Security",
    value: "Introduction to Computer Security",
  },
  {
    label: "Project Management",
    value: "Project Management",
  },
  {
    label: "English Language 2",
    value: "English Language 2",
  },
  {
    label: "Embedded Systems 1",
    value: "Embedded Systems 1",
  },
  {
    label: "Advanced Networking",
    value: "Advanced Networking",
  },
  {
    label: "Advanced Databases",
    value: "Advanced Databases",
  },
  {
    label: "Analysis and Design of Advanced Algorithms",
    value: "Analysis and Design of Advanced Algorithms",
  },
  {
    label: "Human-Computer Interaction",
    value: "Human-Computer Interaction",
  },
  {
    label: "Knowledge Engineering",
    value: "Knowledge Engineering",
  },
  {
    label: "Decision Support Systems",
    value: "Decision Support Systems",
  },
  {
    label: "Web Technologies and Development",
    value: "Web Technologies and Development",
  },
  {
    label: "Distributed Systems",
    value: "Distributed Systems",
  },
  {
    label: "Systems and Network Security",
    value: "Systems and Network Security",
  },
  {
    label: "Embedded Systems 2",
    value: "Embedded Systems 2",
  },
  {
    label: "Modeling and Simulation",
    value: "Modeling and Simulation",
  },
  {
    label: "Data Analysis",
    value: "Data Analysis",
  },
  {
    label: "Multimedia Systems",
    value: "Multimedia Systems",
  },
  {
    label: "Advanced Design Methods",
    value: "Advanced Design Methods",
  },
  {
    label: "Advanced Information Systems",
    value: "Advanced Information Systems",
  },
  {
    label: "Mobile Technologies and Development",
    value: "Mobile Technologies and Development",
  },
  {
    label: "Middleware and Services",
    value: "Middleware and Services",
  },
  {
    label: "Database Administration",
    value: "Database Administration",
  },
  {
    label: "Engineering and Management of Information Systems Security",
    value: "Engineering and Management of Information Systems Security",
  },
  {
    label: "Machine Learning",
    value: "Machine Learning",
  },
  {
    label: "Software Engineering for Data Science",
    value: "Software Engineering for Data Science",
  },
  {
    label: "Advanced Mathematics for Data Science",
    value: "Advanced Mathematics for Data Science",
  },
  {
    label: "Complexity and Problem Solving",
    value: "Complexity and Problem Solving",
  },
  {
    label: "Deep Learning",
    value: "Deep Learning",
  },
  {
    label: "Natural Language Processing",
    value: "Natural Language Processing",
  },
  {
    label: "High Performance Computing",
    value: "High Performance Computing",
  },
  {
    label: "Big Data Technologies",
    value: "Big Data Technologies",
  },
  {
    label: "IT Security",
    value: "IT Security",
  },
  {
    label: "Modeling and Simulation",
    value: "Modeling and Simulation",
  },
  {
    label: "Virtual Reality and Augmented Reality",
    value: "Virtual Reality and Augmented Reality",
  },
];
export function AddSeance() {
  const [profs, setProfs] = useState([]);
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3000/enseignants"),
      axios.get("http://localhost:3000/admins"),
    ]).then(([ens, admins]) => {
      setProfs([...ens.data.enseignants, ...admins.data.admins]);
    });
  }, []);

  const { id } = useParams();

  const [group, setGroup] = useState("");
  const [module, setModule] = useState("");
  const [type, setType] = useState("");
  const [classe, setClasse] = useState("");
  const [teacher, setTeacher] = useState("");
  const [day, setDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = () => {
    const url = `http://localhost:3000/schedules/${id}/seances`;
    axios
      .post(url, {
        Day: day,
        StartTime: start + ":00",
        EndTime: end + ":00",
        Location: classe,
        Type: type,
        Module: module,
        Group: parseInt(group),
        ProfId: teacher,
      })
      .then(() => {
        toast.success("Session added successfully");
      });
  };

  return (
    <div>
      <Separator className="mx-4" />
      <Breadcrumb className="mx-20 ">
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
            <BreadcrumbPage className="text-blue-500">
              Add Session
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="pl-[100px] ">
        <h2 className="text-2xl font-bold tracking-tight">Add Session</h2>
      </div>
      <div className="flex justify-center items-center h-scree py-8 ">
        <Card className="w-[1100px]">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="area">Group</Label>
                <Select value={group} onValueChange={setGroup}>
                  <SelectTrigger id="Semestre">
                    <SelectValue placeholder="Select a group..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Group 1</SelectItem>
                    <SelectItem value="2">Group 2</SelectItem>
                    <SelectItem value="3">Group 3</SelectItem>
                    <SelectItem value="4">Group 4</SelectItem>
                    <SelectItem value="5">Group 5</SelectItem>
                    <SelectItem value="6">Group 6</SelectItem>
                    <SelectItem value="7">Group 7</SelectItem>
                    <SelectItem value="8">Group 8</SelectItem>
                    <SelectItem value="9">Group 9</SelectItem>
                    <SelectItem value="10">Group 10</SelectItem>
                    <SelectItem value="11">Group 11</SelectItem>
                    <SelectItem value="12">Group 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Module</Label>
              <Select value={module} onValueChange={setModule}>
                <SelectTrigger id="module">
                  <SelectValue placeholder="Select a module..." />
                </SelectTrigger>
                <SelectContent>
                  {modules.map((module, i) => (
                    <SelectItem key={i} value={module.value}>
                      {module.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="Type">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select a session type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Cours</SelectItem>
                  <SelectItem value="2">TD</SelectItem>
                  <SelectItem value="3">TP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Class</Label>
              <Select value={classe} onValueChange={setClasse}>
                <SelectTrigger id="module">
                  <SelectValue placeholder="Select a class..." />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Teacher</Label>

              <Select value={teacher} onValueChange={setTeacher}>
                <SelectTrigger id="enseignant">
                  <SelectValue placeholder="Select a teacher..." />
                </SelectTrigger>
                <SelectContent>
                  {profs.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.firstName} {p.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>Day</Label>
                <Select value={day} onValueChange={setDay}>
                  <SelectTrigger id="jour">
                    <SelectValue placeholder="Select a day..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sunday">Sunday</SelectItem>
                    <SelectItem value="Monday">Monday</SelectItem>
                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                    <SelectItem value="Thursday">Thursday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Start Time</Label>
                <Input
                  type="time"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  placeholder="from"
                />
              </div>
              <div className="grid gap-2">
                <Label>End Time</Label>
                <Input
                  type="time"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  placeholder="from"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button
              variant="outline"
              className="bg-blue-500 text-white"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
