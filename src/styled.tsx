import { Box, styled } from "@mui/material";

export const DateRangePickerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  ".MuiInputBase-root": {
    cursor: "pointer",
  },
  ".MuiOutlinedInput-notchedOutline": {
    borderWidth: "1px !important",
    // borderColor: `${theme.palette.border.inactive} !important`,
  },
  ".Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: `${'#0186BE'} !important`,
  },
}));

export const CalenderLayoutContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  paddingLeft: 2,
  marginTop: 8,
  height: "320px",
  ".MuiDateCalendar-root": {
    height: "unset",
    ".MuiPickersDay-root, .MuiDayCalendar-weekDayLabel": {
      fontSize: "14px",
    },
    ".MuiPickersDay-dayOutsideMonth": {
      color: "#798191",
    },
  },
  ".toolbar-container": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    button: {
      textTransform: "unset",
      display: "block",
      minWidth: "unset",
    },
    ".toolbar-button": {
      margin: "4px",
      border: "none",
      background: "none",
      color: theme.palette.grey[900],
      fontSize: 14,
      "&.disabled": {
        color: '#D5D5D5',
      },
      "&.selected": {
        borderRadius: "4px",
        backgroundColor: "##DBF4FF",
      },
      "&.reset-button": {
        color: '#0186BE',
        fontWeight: 700,
        fontSize: 18,
      },
    },
  },
  ".calendar-header-container": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    button: { color: theme.palette.grey[900], svg: { fontSize: 14 } },
    ".year-label": {
      fontSize: 18,
      fontWeight: 700,
      textTransform: "capitalize",
      width: "160px",
    },
    ".month-change-btn": {
      fontSize: "16px",
    },
  },
  ".MuiPickersMonth-monthButton , .MuiPickersYear-yearButton": {
    "&.Mui-selected": {
      backgroundColor: '#0186BE',
      color: '#ffffff',
    },
  },
}));

export const StyledDayContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 0,
  "&.day-range": {
    backgroundColor: '#DBF4FF',
  },
  "&.day-start": {
    borderRadius: "18px 0 0 18px",
  },
  "&.day-end": {
    borderRadius: "0 18px 18px 0",
  },
  "&.rounded": {
    borderRadius: "18px",
    backgroundColor: "transparent",
  },
  "&.highlighted-text": {
    ".MuiPickersDay-root": {
      backgroundColor: '#0186BE',
      color: '#ffffff',
    },
  },
}));
