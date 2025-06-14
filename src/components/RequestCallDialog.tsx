
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface RequestCallDialogProps {
  traderName: string;
  callCharge?: string;
  className?: string;
  triggerClassName?: string;
}

const TIME_WINDOWS = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 01:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
  "07:00 PM - 08:00 PM",
];

export function RequestCallDialog({
  traderName,
  callCharge = "₹499 per 30 min",
  className,
  triggerClassName,
}: RequestCallDialogProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [date, setDate] = useState<Date>();
  const [timeWindow, setTimeWindow] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const handleRequestCall = () => {
    setSubmitting(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitting(false);
      setReason("");
      setDate(undefined);
      setTimeWindow("");
      // Show a toast or perform actual request here
    }, 900);
  };

  const handleCancel = () => {
    setOpen(false);
    setReason("");
    setDate(undefined);
    setTimeWindow("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={triggerClassName}>
          Request Call
        </Button>
      </DialogTrigger>
      <DialogContent className={className || "max-w-md"}>
        <DialogHeader>
          <DialogTitle>
            Request a Call with <span className="text-blue-600">{traderName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="block font-medium text-gray-800 mb-1">Reason for Call <span className="text-red-500">*</span></label>
            <Textarea
              placeholder="Describe your query or what you’d like to discuss"
              value={reason}
              onChange={e => setReason(e.target.value)}
              required
              rows={3}
              className="resize-none"
              maxLength={200}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-800 mb-1">Call Charge</label>
            <input
              type="text"
              className="w-full bg-gray-100 border border-gray-200 rounded px-3 py-2 text-gray-700"
              value={callCharge}
              disabled
              readOnly
            />
          </div>
          <div>
            <label className="block font-medium text-gray-800 mb-1">Date and Time <span className="text-red-500">*</span></label>
            {!date ? (
              <div>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal mb-2"
                  onClick={() => {}}
                  type="button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-60" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
                <div className="p-3 rounded-lg bg-gray-50 border mt-1">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-0 pointer-events-auto"
                    disabled={d => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-700 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    {format(date, "PPP")}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 px-2 py-0 h-7"
                    onClick={() => setDate(undefined)}
                  >
                    Change date
                  </Button>
                </div>
                <Select value={timeWindow} onValueChange={setTimeWindow}>
                  <SelectTrigger className="w-full mt-2 rounded border border-gray-200 shadow-sm text-base">
                    <SelectValue placeholder="Select a time window" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_WINDOWS.map((tw) => (
                      <SelectItem
                        key={tw}
                        value={tw}
                        className="py-2 px-3 cursor-pointer text-gray-800 hover:bg-blue-50 rounded"
                      >
                        {tw}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex-row gap-2 mt-2">
          <Button
            onClick={handleRequestCall}
            disabled={
              submitting ||
              !reason.trim() ||
              !date ||
              !timeWindow
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            {submitting ? "Requesting..." : "Request Call"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" className="w-full" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
