import DateInput from "@/components/common/dateInput/DateInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import {
  type WorkExperienceData,
  WorkExperienceValidator,
} from "@/validators/user/profile/workExperienceSchema";
import { DateTime } from "luxon";
import { useState } from "react";

interface WorkExperienceFormProps {
  initialData?: WorkExperienceData;
}

const WorkExperienceForm = ({ initialData }: WorkExperienceFormProps) => {
  const [isCurrentEmployment, setIsCurrentEmployment] = useState(false);
  const form = useExtendedForm<WorkExperienceData>(WorkExperienceValidator, {
    defaultValues: initialData,
  });

  const onSubmit = (values: WorkExperienceData) => {
    console.info(values);
  };

  return (
    <Form {...form}>
      <div className="flex items-center gap-2">
        <Switch
          checked={isCurrentEmployment}
          onCheckedChange={(checked) => {
            setIsCurrentEmployment(checked);
            if (checked) {
              form.setValue("endDate", "");
            }
          }}
        />
        <Label>Current Employment</Label>
      </div>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employer</FormLabel>
              <FormControl>
                <Input type="text" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <DateInput
                    ref={field.ref}
                    onChange={field.onChange}
                    value={field.value}
                    format={DateTime.DATE_MED}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <DateInput
                    ref={field.ref}
                    onChange={field.onChange}
                    value={field.value || ""}
                    format={DateTime.DATE_MED}
                    placeholder={isCurrentEmployment ? "Present" : undefined}
                    disabled={isCurrentEmployment}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input type="text" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  className="resize-none"
                  rows={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default WorkExperienceForm;
