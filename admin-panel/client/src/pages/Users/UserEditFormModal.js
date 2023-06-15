import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    outline: "none",
  },
}));

const UserEditFormModal = ({ isOpen, onClose, children }) => {
  const classes = useStyles();

  return (
    <Modal className={classes.modal} open={isOpen} onClose={onClose}>
      <div className={classes.content}>{children}</div>
    </Modal>
  );
};

export default UserEditFormModal;
