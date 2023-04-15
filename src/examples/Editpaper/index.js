import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { EditorState,ContentState  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Modal from 'react-modal';
import {IconButton,Box} from '@mui/material'
import {EditOutlined} from '@mui/icons-material'
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditPaper({author,content,left,top}) {
  const [open, setOpen] = React.useState(false);
  const [pop, setPop] = React.useState(false);
  const initialContent = ContentState.createFromText(content);

  const [editorState, setEditorState] = useState(EditorState.createWithContent(initialContent));


  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
 
  const handleClickPop = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setPop(false);
  };

  return (
    <div>
        


        <IconButton
        onClick={handleClickPop} 
                  variant="outlined"
                  style={{
                    position: "absolute",
                    top: `${top}%`,
                    color: "green",
                    backgroundColor: "white",
                    left: `${left}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <EditIcon />
                </IconButton>
     
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullScreen
        onClose={handleClose2}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit News"}</DialogTitle>
        <DialogContent>
        <Box sx={{padding:'20px',display:'flex'}}>{author}</Box>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorStateChange}
        />
        </DialogContent>
        <DialogActions>
          <Button sx={{color:'black'}} onClick={handleClose}>Cancel</Button>
          <MDButton variant="gradient" onClick={handleClose} color="success">
          <Icon sx={{ fontWeight: "bold" }}>update</Icon>
          &nbsp;Update
        </MDButton>
        </DialogActions>
      </Dialog>
     
 </div>
);
}