import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import axios from "axios";
import { useMemo } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ResponsiveGridLayout = WidthProvider(Responsive);

const dayToCol = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Saturday",
  "Friday",
];

export default function CalendarComp({
  schedId,
  sessions,
  setSessions,
  personal = false,
}) {
  const auth = useAuth();

  const [toAbsent, setToAbsent] = useState(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();

  const layout = useMemo(() => {
    return sessions.map((session) => {
      const start = session.StartTime.split(":");
      const startHour = parseInt(start[0]);
      const startMin = parseInt(start[1]);
      const end = session.EndTime.split(":");
      const endHour = parseInt(end[0]);
      const endMin = parseInt(end[1]);
      return {
        i: session.id.toString(),
        x: dayToCol.indexOf(session.Day),
        y: (startHour - 7) * 4 + startMin / 15,
        w: 1,
        h: (endHour - startHour) * 4 + (endMin - startMin) / 15,
        static: true,
      };
    });
  }, [sessions]);

  const handleDelete = async (id) => {
    const url = `http://localhost:3000/schedules/${schedId}/seances/${id}`;
    await axios.delete(url);
    setSessions(sessions.filter((session) => session.id !== id));
    toast.success("Session deleted successfully!");
  };

  const markAsAbsent = async () => {
    const profId = sessions.find((session) => session.id === toAbsent).ProfId;

    const url = `http://localhost:3000/users/${profId}/absences`;

    await axios.post(url, {
      Date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      SeanceId: toAbsent,
    });

    toast.success("Marked session as absent");
    setOpen(false);
    setDate(null);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="px-0 py-3 border-gray-200">
        <div className="relative text-center text-gray-700 flex font-medium items-center w-full">
          <p className="border-gray-200 border-r-[1px] text-xs w-20 h-4"></p>
          <div className="grid grid-cols-5 text-sm flex-1">
            <p className="border-gray-200 border-r-[1px]">Sunday</p>
            <p className="border-gray-200 border-r-[1px]">Monday</p>
            <p className="border-gray-200 border-r-[1px]">Tuesday</p>
            <p className="border-gray-200 border-r-[1px]">Wednesday</p>
            <p>Thursday</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex items-stretch">
          <div className="w-20 text-gray-500 text-xs text-right px-4 border-gray-200">
            <p className="h-14 relative -top-2"></p>
            <p className="h-14 relative -top-2">8 AM</p>
            <p className="h-14 relative -top-2">9 AM</p>
            <p className="h-14 relative -top-2">10 AM</p>
            <p className="h-14 relative -top-2">11 AM</p>
            <p className="h-14 relative -top-2">12 PM</p>
            <p className="h-14 relative -top-2">1 PM</p>
            <p className="h-14 relative -top-2">2 PM</p>
            <p className="h-14 relative -top-2">3 PM</p>
            <p className="h-14 relative -top-2">4 PM</p>
            <p className="h-14 relative -top-2">5 PM</p>
          </div>
          <div className="relative flex-1">
            <div className="absolute h-full left-0 right-0 top-0 bg-grid-pattern bg-grid-size"></div>
            <ResponsiveGridLayout
              className="layout"
              layouts={{ lg: layout }}
              cols={{ xxs: 5, xs: 5, sm: 5, md: 5, lg: 5, xl: 5, xxl: 5 }}
              rowHeight={14}
              maxRows={11 * 4}
              margin={[4, 0]}
              compactType={null}
              preventCollision
            >
              {sessions.map((session) => (
                <div key={session.id.toString()}>
                  <AlertDialog open={open}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Mark session as absent
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Please enter the date of the absence.
                        </AlertDialogDescription>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? (
                                format(date, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => {
                            setDate(null);
                            setOpen(false);
                          }}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={markAsAbsent}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <div className="bg-primary h-full text-primary-foreground rounded-xl shadow-lg px-4 py-2 select-none">
                        <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                          {session.Type} {session.Module}
                        </h4>
                        <h5 className="scroll-m-20 text-xs font-semibold tracking-tight">
                          {personal
                            ? `${session.schedule.Promotion} G${session.Group} - ${session.Location}`
                            : `${session.firstName} ${session.lastName}`}
                        </h5>
                        <p className="leading-7 text-xs font-medium">
                          {session.StartTime.slice(0, 5)} -{" "}
                          {session.EndTime.slice(0, 5)}
                        </p>
                      </div>
                    </ContextMenuTrigger>
                    {!personal && (
                      <ContextMenuContent>
                        <ContextMenuItem
                          onSelect={() => {
                            setToAbsent(session.id);
                            setOpen(true);
                          }}
                        >
                          Mark as Absent
                        </ContextMenuItem>
                        <ContextMenuItem
                          onSelect={() => handleDelete(session.id)}
                        >
                          Delete
                        </ContextMenuItem>
                      </ContextMenuContent>
                    )}
                  </ContextMenu>
                </div>
              ))}
            </ResponsiveGridLayout>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
