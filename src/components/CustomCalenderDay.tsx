import React from "react";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { Moment } from "moment";
import classNames from "classnames";
import { StyledDayContainer } from "../styled";

interface DayProps extends Omit<PickersDayProps<Moment>, "onClick"> {
  isInRange: (date: Moment) => boolean;
  startDate: Moment | null;
  endDate: Moment | null;
  onDateClick: (date: Moment | null) => void;
}

const Day = ({
  day,
  isInRange,
  startDate,
  endDate,
  onDateClick,
  ...pickersDayProps
}: DayProps) => {
  const isHighlighted = isInRange(day);
  const isStart = !!startDate?.isSame(day, "day");
  const isEnd = !!endDate?.isSame(day, "day");

  return (
    <StyledDayContainer
      className={classNames({
        "day-start": isStart,
        "day-end": isEnd,
        "day-range": isHighlighted,
        rounded: isStart && isEnd,
        "highlighted-text": isStart || isEnd,
      })}
      key={day.toString()}
    >
      <PickersDay
        {...pickersDayProps}
        day={day}
        onClick={() => onDateClick(day)}
      />
    </StyledDayContainer>
  );
};

export default Day;
