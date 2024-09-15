import classNames from "classnames";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { CalenderLayoutContainer } from "../styled";
import ToolbarButton from "./QuickRangeSelector";
import React from "react";

interface LayoutProps {
  handleToolbarAction: (
    startDate: Moment | null,
    endDate: Moment | null,
    action: string
  ) => void;
  children: React.ReactNode;
  startDate: Moment | null;
  endDate: Moment | null;
}

const today = moment();

const quickRanges = [
  {
    label: "Today",
    action: "today",
    start: today.clone().startOf("day"),
    end: today.clone().endOf("day"),
  },
  {
    label: "Yesterday",
    action: "yesterday",
    start: today.clone().subtract(1, "day").startOf("day"),
    end: today.clone().subtract(1, "day").endOf("day"),
  },
  {
    label: "Last week",
    action: "lastWeek",
    start: today.clone().subtract(1, "week").startOf("week"),
    end: today.clone().subtract(1, "week").endOf("week"),
  },
  {
    label: "Last month",
    action: "lastMonth",
    start: today.clone().subtract(1, "month").startOf("month"),
    end: today.clone().subtract(1, "month").endOf("month"),
  },
  {
    label: "Last quarter",
    action: "lastQuarter",
    start: today.clone().subtract(1, "quarter").startOf("quarter"),
    end: today.clone().subtract(1, "quarter").endOf("quarter"),
  },
] as const;

const Layout = ({
  handleToolbarAction,
  children,
  startDate,
  endDate,
}: LayoutProps) => {
  const [selectedToolbarAction, setSelectedToolbarAction] = useState<
    string | null
  >(null);

  const handleQuickRangeChange = (action: string) => {
    const range = quickRanges.find((range) => range.action === action);
    handleToolbarAction(range?.start || null, range?.end || null, action);
  };

  useEffect(() => {
    const selectedRange = quickRanges.find(
      ({ start, end }) =>
        startDate?.isSame(start, "day") && endDate?.isSame(end, "day")
    );
    setSelectedToolbarAction(selectedRange?.action || null);
  }, [startDate, endDate]);

  return (
    <CalenderLayoutContainer>
      <div className="toolbar-container" data-testid="quick-range-container">
        <div>
          {quickRanges.map(({ label, action }) => (
            <ToolbarButton
              key={action}
              label={label}
              selected={selectedToolbarAction === action}
              action={action}
              onActionClick={handleQuickRangeChange}
            />
          ))}
        </div>
        <ToolbarButton
          className={classNames("reset-button", {
            disabled: !startDate && !endDate,
          })}
          label="Reset"
          action="reset"
          onActionClick={handleQuickRangeChange}
        />
      </div>
      {children}
    </CalenderLayoutContainer>
  );
};

export default Layout;
