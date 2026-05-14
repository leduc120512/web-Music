export const adminUiTokens = {
  radius: {
    card: 2,
    table: 2,
    input: 1.5,
  },
  spacing: {
    section: 2,
    card: 2,
    compact: 1,
  },
  transition: "all 0.22s cubic-bezier(0.2, 0, 0, 1)",
}

export const adminCardSx = {
  p: adminUiTokens.spacing.card,
  borderRadius: adminUiTokens.radius.card,
  border: "1px solid rgba(148, 163, 184, 0.22)",
  background: "linear-gradient(180deg, rgba(15, 23, 42, 0.82), rgba(2, 6, 23, 0.9))",
}

export const adminFilterBarSx = {
  ...adminCardSx,
  p: 1.5,
  mb: 2,
  display: "flex",
  flexWrap: "wrap",
  gap: 1.5,
  alignItems: "center",
}

export const adminTableContainerSx = {
  borderRadius: adminUiTokens.radius.table,
  border: "1px solid rgba(148, 163, 184, 0.22)",
  background: "linear-gradient(180deg, rgba(15, 23, 42, 0.82), rgba(2, 6, 23, 0.9))",
  overflowX: "auto",
  overflowY: "auto",
  maxWidth: "100%",
  maxHeight: "calc(100vh - 250px)",
  boxShadow: "0 18px 34px rgba(2, 6, 23, 0.28)",
}

export const adminTableSx = {
  minWidth: 1120,
  tableLayout: "auto",
  "& .MuiTableCell-head": {
    fontSize: "0.88rem",
    fontWeight: 800,
    color: "#e2e8f0",
    whiteSpace: "nowrap",
    backgroundColor: "rgba(30, 41, 59, 0.96)",
    position: "sticky",
    top: 0,
    zIndex: 4,
  },
  "& .MuiTableCell-body": {
    fontSize: "0.9rem",
    color: "#cbd5e1",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  "& .MuiTableRow-root": {
    transition: adminUiTokens.transition,
  },
  "& .MuiTableRow-hover:hover": {
    transform: "translateY(-1px)",
    backgroundColor: "rgba(14, 165, 233, 0.08)",
  },
}

export const stickyCellSx = (side, offset = 0, zIndex = 3) => ({
  position: "sticky",
  [side]: offset,
  zIndex,
  backgroundColor: "rgba(15, 23, 42, 0.98)",
  boxShadow:
    side === "left"
      ? "8px 0 16px -14px rgba(2, 6, 23, 0.9)"
      : "-8px 0 16px -14px rgba(2, 6, 23, 0.9)",
})

export const stickyHeadCellSx = (side, offset = 0, zIndex = 6) => ({
  ...stickyCellSx(side, offset, zIndex),
  backgroundColor: "rgba(30, 41, 59, 1)",
})

export const adminActionButtonSx = {
  transition: adminUiTokens.transition,
  minHeight: 38,
  borderRadius: 1.5,
  fontSize: "0.9rem",
  fontWeight: 700,
  textTransform: "none",
  "&:hover": {
    transform: "translateY(-1px)",
  },
}

export const adminStatusChipSx = {
  fontWeight: 600,
  transition: adminUiTokens.transition,
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 8px 20px rgba(2, 6, 23, 0.35)",
  },
}

