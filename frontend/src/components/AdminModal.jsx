import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";

import Button from "./Button";
import { useState, useEffect } from "react";

const AdminModal = ({
  open,
  user,
  onClose,
  onSave,
}) => {
  const [role, setRole] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (user) {
      setRole(user.role);
      setActive(user.active);
    }
  }, [user]);

  const handleSubmit = () => {
    onSave({
      id: user.id,
      role,
      active,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>User Actions</DialogTitle>

      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Role</InputLabel>

          <Select
            value={role}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          sx={{ mt: 2 }}
          control={
            <Switch
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
          }
          label="Active"
        />
      </DialogContent>

      <DialogActions>
        <Button name="Cancel" onClick={onClose} />
        <Button name="Save" onClick={handleSubmit} />
      </DialogActions>
    </Dialog>
  );
};

export default AdminModal;