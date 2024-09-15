import React from "react";
import { Button, Icon, IconButton } from "@mui/material";
import { Moment } from "moment";
import { DateView } from "@mui/x-date-pickers";
import { SlideDirection } from "@mui/x-date-pickers/DateCalendar/PickersSlideTransition";

interface CustomCalendarHeaderProps {
  date: Moment;
  onMonthChange: (date: Moment, slideDirection: SlideDirection) => void;
  onViewChange?: (view: DateView) => void;
}

const CustomCalendarHeader: React.FC<CustomCalendarHeaderProps> = ({
  date,
  onMonthChange,
  onViewChange,
}) => {
  const handleMonthOrYearChange = (
    unit: "year" | "month",
    amount: number,
    direction: SlideDirection
  ) => {
    onMonthChange(date.clone().add(amount, unit), direction);
  };

  return (
    <div className="calendar-header-container">
      <IconButton
        onClick={() => handleMonthOrYearChange("year", -1, "left")}
        data-testid="prev-year-btn"
      >
        {`<<`}
      </IconButton>
      <IconButton
        onClick={() => handleMonthOrYearChange("month", -1, "left")}
        data-testid="prev-month-btn"
      >
        {`<`}
      </IconButton>
      <Button
        className="year-label"
        onClick={() => onViewChange?.("month")}
        data-testid="select-year-btn"
      >
        {date.format("MMMM YYYY")}
      </Button>
      <IconButton
        onClick={() => handleMonthOrYearChange("month", 1, "right")}
        data-testid="next-month-btn"
      >
        {` >`}
      </IconButton>
      <IconButton
        onClick={() => handleMonthOrYearChange("year", 1, "right")}
        data-testid="next-year-btn"
      >
        {`>>`}
      </IconButton>
    </div>
  );
};

export default CustomCalendarHeader;
