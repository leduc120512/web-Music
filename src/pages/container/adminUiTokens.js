export const adminUiTokens = {
  radius: {
    card: 3,
    table: 3,
    input: 2,
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
}

export const adminTableSx = {
  minWidth: 980,
  "& .MuiTableCell-head": {
    fontSize: 13,
    fontWeight: 700,
    color: "#e2e8f0",
  },
  "& .MuiTableCell-body": {
    fontSize: 13,
    color: "#cbd5e1",
    verticalAlign: "middle",
  },
  "& .MuiTableRow-root": {
    transition: adminUiTokens.transition,
  },
  "& .MuiTableRow-hover:hover": {
    transform: "translateY(-1px)",
    backgroundColor: "rgba(14, 165, 233, 0.08)",
  },
}

export const adminActionButtonSx = {
  transition: adminUiTokens.transition,
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

