
import * as React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export interface RequestCallDialogProps {
  buttonClassName?: string;
  traderName: string;
}

export const RequestCallDialog: React.FC<RequestCallDialogProps> = ({ traderName, buttonClassName }) => {
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  // For demo purposes, a fixed call charge
  const CALL_CHARGE = 499;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can wire this up to logic/api as needed
    setOpen(false);
    // For now, just close and potentially show a toast here if app supports
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
          <div className="space-y-2">
            <Label htmlFor="call-date">Select Date and Time</Label>
            <div className="flex gap-2 items-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3 pointer-events-auto bg-background rounded"
              />
              {/* For demo, a notice. In real app, a time-picker would also be used */}
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {date ? (
                  <span>Chosen: {format(date, "PPP")}</span>
                ) : (
                  <span>Pick a date</span>
                )}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1 pl-1">
              (Time selection feature can be enhanced if needed)
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={!reason || !date}>Request Call</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
