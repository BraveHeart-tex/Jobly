import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import workExperienceSchema, {
  type WorkExperienceSchema,
} from "@/schemas/user/profile/workExperienceSchema";
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
import DateInput from "@/components/common/dateInput/DateInput";
import { DateTime } from "luxon";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const WorkExperienceForm = () => {
  const [isCurrentEmployment, setIsCurrentEmployment] = useState(false);
  const form = useExtendedForm<WorkExperienceSchema>(workExperienceSchema);

  const onSubmit = (values: WorkExperienceSchema) => {
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
                <Input type="text" {...field} />
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
                    value={field.value}
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
                <Input type="text" {...field} />
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
                <Textarea {...field} className="resize-none" rows={10} />
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
