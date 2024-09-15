import React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DatePicker,
  DatePickerProps,
  PickerValidDate,
} from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import CustomCalendarHeader from "./components/CustomCalendarHeader";
import Layout from "./components/CustomCalenderLayout";
import Day from "./components/CustomCalenderDay";
import { DateRangePickerStyled } from "./styled";

moment.updateLocale("en", {
  week: {
    dow: 1,
  },
});

export type DateRange = [Moment | null, Moment | null];

interface DateRangePickerProps
  extends Omit<
    DatePickerProps<PickerValidDate, boolean>,
    "onChange" | "value"
  > {
  value: DateRange | null;
  onChange: (value: DateRange | null) => void;
}

const CustomDatePicker = ({
  value,
  onChange,
  ...restProps
}: DateRangePickerProps) => {
  const [startDate, setStartDate] = useState<Moment | null>(value?.[0] || null);
  const [endDate, setEndDate] = useState<Moment | null>(value?.[1] || null);
  const [open, setOpen] = useState(false);

  const isInRange = (date: Moment): boolean => {
    if (!startDate || !endDate) return false;
    return date.isBetween(startDate, endDate, "day", "[]");
  };

  const selectAndCloseCalendar = (start: Moment | null, end: Moment | null) => {
    if (start && !end) {
      end = start.clone();
    }
    onChange([start, end]);
    setOpen(false);
  };

  const handleToolbarAction = (
    start: Moment | null,
    end: Moment | null,
    action: string
  ) => {
    setStartDate(start);
    setEndDate(end);
    if (action !== "reset") {
      selectAndCloseCalendar(start, end);
    }
  };

  const handleDateChange = (date: Moment | null) => {
    if (!startDate || endDate || (date && date.isBefore(startDate, "day"))) {
      setStartDate(date);
      setEndDate(null);
    } else {
      setEndDate(date);
      selectAndCloseCalendar(startDate, date);
    }
  };

  useEffect(() => {
    if (value) {
      setStartDate(value[0]);
      setEndDate(value[1]);
    }
  }, [value]);

  return (
    <DateRangePickerStyled>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          views={["month", "year", "day"]}
          reduceAnimations
          value={endDate || startDate || null}
          closeOnSelect={false}
          disableHighlightToday
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => selectAndCloseCalendar(startDate, endDate)}
          showDaysOutsideCurrentMonth
          dayOfWeekFormatter={(day) =>
            ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][day.day()]
          }
          slots={{
            day: (day) => (
              <Day
                isInRange={isInRange}
                startDate={startDate}
                endDate={endDate}
                onDateClick={handleDateChange}
                {...day}
              />
            ),
            calendarHeader: (props) => (
              <CustomCalendarHeader
                date={props.currentMonth}
                onMonthChange={props.onMonthChange}
                onViewChange={props.onViewChange}
              />
            ),
            layout: (prop) => (
              <Layout
                handleToolbarAction={handleToolbarAction}
                startDate={startDate}
                endDate={endDate}
              >
                {prop.children}
              </Layout>
            ),
          }}
          {...restProps}
        />
      </LocalizationProvider>
    </DateRangePickerStyled>
  );
};

export default CustomDatePicker;
