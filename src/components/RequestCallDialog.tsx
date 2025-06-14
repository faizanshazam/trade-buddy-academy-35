
import * as React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export interface RequestCallDialogProps {
  buttonClassName?: string;
  traderName: string;
}

const TIME_WINDOWS = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
];

export const RequestCallDialog: React.FC<RequestCallDialogProps> = ({ traderName, buttonClassName }) => {
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [timeWindow, setTimeWindow] = React.useState<string>("");

  // For demo purposes, a fixed call charge
  const CALL_CHARGE = 499;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    // You can show toast or handle further actions here
  };

  const handleChangeDate = () => {
    setDate(undefined);
    setTimeWindow("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={buttonClassName}>Request Call</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Request Call with {traderName}</DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="call-reason">Reason for Call</Label>
            <Textarea
              id="call-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe your query or reason to request a call..."
              required
              className="min-h-[70px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Call Charge</Label>
            <div className="bg-muted px-4 py-2 rounded text-lg font-semibold text-blue-600 select-none">
              ₹{CALL_CHARGE}
            </div>
          </div>

          {/* DatePicker and Custom Time Window */}
          <div className="space-y-2">
            {!date ? (
              <>
                <Label htmlFor="call-date">Select Date</Label>
                <div className="flex gap-2 items-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-3 pointer-events-auto bg-background rounded"
                  />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {date ? <span>Chosen: {format(date, "PPP")}</span> : <span>Pick a date</span>}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Selected Date:</Label>
                    <span className="ml-2 text-base font-medium">{format(date, "PPP")}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleChangeDate}
                    className="text-xs px-2 py-0 h-8"
                  >
                    Change Date
                  </Button>
                </div>
                <div className="mt-2">
                  <Label htmlFor="call-time">Preferred Time Window</Label>
                  <Select
                    value={timeWindow}
                    onValueChange={setTimeWindow}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Select a time window"
                        className="text-base"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_WINDOWS.map((slot) => (
                        <SelectItem
                          key={slot}
                          value={slot}
                          className="text-base"
                        >
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={!reason || !date || !timeWindow}>Request Call</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
