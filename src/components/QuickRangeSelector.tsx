import { Button } from "@mui/material";
import classNames from "classnames";
import React from "react";

interface ToolbarButtonProps {
  label: string;
  selected?: boolean;
  action: string;
  onActionClick: (action: string) => void;
  className?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  label,
  selected = false,
  action,
  onActionClick,
  className,
}) => {
  return (
    <Button
      onClick={() => onActionClick(action)}
      className={classNames(className, "toolbar-button", {
        selected: selected,
      })}
      data-testid="quick-range-item"
    >
      {label}
    </Button>
  );
};

export default ToolbarButton;
