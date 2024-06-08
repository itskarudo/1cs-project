"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

export function ComboboxModule() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[1050px] justify-between"
        >
          {value
            ? modules.find((module) => module.value === value)?.label
            : "Selectioner un module..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search subject..." className="h-9" />
          <CommandList>
            <CommandEmpty>No subject found.</CommandEmpty>
            <CommandGroup>
              {modules.map((module) => (
                <CommandItem
                  key={module.value}
                  value={module.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {module.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === module.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
