import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const initialData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "a@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "b@gmail.com",
    role: "User",
    status: "Inactive",
  },
];

const roles = ["Admin", "User", "Manager"];
const statuses = ["Active", "Inactive"];

export default function ManagerForm() {
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setForm({ name: "", email: "", role: "User", status: "Active" });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleEdit = (row) => {
    setForm(row);
    setEditingId(row.id);
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    if (isAdding) {
      setData([...data, { ...form, id: Date.now() }]);
    } else {
      setData(data.map((item) => (item.id === editingId ? form : item)));
    }
    setForm({ name: "", email: "", role: "User", status: "Active" });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setForm({ name: "", email: "", role: "User", status: "Active" });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2} color="primary">
          Quản lý thành viên
        </Typography>
        <Box mb={2}>
          <Button
            variant="contained"
            color="success"
            onClick={handleAdd}
            sx={{ borderRadius: 2 }}
          >
            Thêm mới
          </Button>
        </Box>
        {(isAdding || editingId) && (
          <Box mb={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tên"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Vai trò</InputLabel>
                  <Select
                    name="role"
                    value={form.role}
                    label="Vai trò"
                    onChange={handleChange}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Trạng thái</InputLabel>
                  <Select
                    name="status"
                    value={form.status}
                    label="Trạng thái"
                    onChange={handleChange}
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="flex-end"
                gap={1}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  sx={{ borderRadius: 2 }}
                >
                  Lưu
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  sx={{ borderRadius: 2 }}
                >
                  Hủy
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
        <Box>
          <Grid
            container
            spacing={1}
            sx={{ fontWeight: 600, mb: 1, color: "#555" }}
          >
            <Grid item xs={3}>
              Tên
            </Grid>
            <Grid item xs={3}>
              Email
            </Grid>
            <Grid item xs={2}>
              Vai trò
            </Grid>
            <Grid item xs={2}>
              Trạng thái
            </Grid>
            <Grid item xs={2} textAlign="center">
              Hành động
            </Grid>
          </Grid>
          {data.map((row) => (
            <Grid
              container
              spacing={1}
              key={row.id}
              alignItems="center"
              sx={{
                borderRadius: 2,
                mb: 1,
                background: "#fafafa",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                p: 1,
              }}
            >
              <Grid item xs={3}>
                {row.name}
              </Grid>
              <Grid item xs={3}>
                {row.email}
              </Grid>
              <Grid item xs={2}>
                {row.role}
              </Grid>
              <Grid item xs={2}>
                {row.status}
              </Grid>
              <Grid item xs={2} textAlign="center">
                <IconButton color="primary" onClick={() => handleEdit(row)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(row.id)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
