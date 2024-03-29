import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IEventCalendarFormProps {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>, title: string) => void;
  onCancelClick: () => void;
  selectedEventId: string | null;
  loading: boolean;
}

const EventCalendarForm = ({ handleFormSubmit, onCancelClick, selectedEventId, loading }: IEventCalendarFormProps) => {
  const [title, setTitle] = useState("");
  return (
    <form onSubmit={(e) => handleFormSubmit(e, title)}>
      <div className="flex flex-col gap-[3px]">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event Title" min={1} max={52} />
        <div className="mt-2 flex items-center gap-1 self-end">
          <Button
            type="button"
            variant="secondary"
            disabled={loading}
            onClick={() => {
              onCancelClick();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-facebook hover:bg-facebook-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            {selectedEventId ? "Update" : "Add"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EventCalendarForm;
