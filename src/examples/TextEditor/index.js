/* eslint-disable */

import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { EditorState, ContentState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Modal from "react-modal";
import { IconButton, Box, Input } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import { db } from "../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { NewsContext } from "examples/Timeline/context/mycontext";
import { useMaterialUIController, addCategoryData,setRefresh } from "context";
import { Menu, MenuItem } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopupModel({ author, newsID, reporterID, title, category }) {
  const [controller, dispatch] = useMaterialUIController();
  const [singleNews, setSNews] = useState(null);
  const [reporter, setReporter] = useState({});
  const [trigger, setTrigger] = useState(false);
  const [trigger2, setTrigger2] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const[addTrigger, setAddTrigger] = useState(false)


  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleClose3 = () => {
    setOpen3(false);
  };
  const [pop, setPop] = React.useState(false);
  const [titleTrigger, setTitleTrigger] = useState(false);

  useEffect(() => {
    const index = findIdx();
    if(index && index!==-1){
      setSelectedIndex(index);
    }
    
  }, [title]);
  useEffect(() => {
    const NewData = () => {
      db.collection("news")
        .doc(newsID)
        .get()
        .then((querySnapshot) => {
          setSNews(querySnapshot.data());
          const plainText = querySnapshot?.data().description;
          const contentState = ContentState.createFromText(plainText);
          const newEditorState = EditorState.createWithContent(contentState);
          setEditorState(newEditorState);
          setTrigger(true);
        });
    };

    NewData();

    const reporterData = () => {
      db.collection("reportor")
        .doc(reporterID)
        .get()
        .then((querySnapshot) => {
          setReporter(querySnapshot.data());
          setTrigger2(true);
        });
    };
    reporterData();
  }, [trigger,addTrigger, pop, open, trigger2, titleTrigger]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [plainText, setPlainText] = useState("");

  const handleEditorStateChange = (newEditorState) => {
    console.log("EDITOR STATE",editorState)
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const newPlainText = rawContentState.blocks.map((block) => block.text).join("\n");
    setPlainText(newPlainText);
  };

  const findIdx = () => {
    const index = controller.newsdata[`${category}`]?.findIndex((ele) => ele.title == title); // find the index of the element that satisfies the condition
    if (index !== -1) {
      console.log("index", index);
      return index;
    }
    return -1;
  };
  function moveElementInArray(newIdx) {
    const index = controller.newsdata[`${category}`].findIndex((ele) => ele.title == title); // find the index of the element that satisfies the condition

    const arr = controller.newsdata[`${category}`];
    if (index !== -1) {
      // if the element is found in the array
      const [removed] = arr.splice(index, 1); // remove the element from its current position
      arr.splice(newIdx, 0, removed); // insert the removed element at the new position

      console.log("Arr",arr,category)
    }

    return arr; // return the updated array
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClickPop = () => {
    setPop(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setPop(false);
  };

  const navigate = useNavigate();

  function EditNews() {
    var sNews = db.collection("news").doc(newsID);
    return sNews
      .update({
        body: plainText,
      })
      .then(() => {
        console.log("News Edited successfully updated!");
        handleClose();
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  const [newTitle, setNewTitle] = useState("");
  function EditTitle() {
    var sNews = db.collection("news").doc(newsID);
    return sNews
      .update({
        title: newTitle,
      })
      .then(() => {
        console.log("News Title updated successfully!");
        setTitleTrigger(!titleTrigger);
        handleClose3();
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  const { newsData, setNewsData } = useContext(NewsContext);

  function handleAddNews() {
    // setNewsData([...newsData, singleNews]);
    const index = controller.newsdata[`${category}`].findIndex((ele) => ele.title == title); // find the index of the element that satisfies the condition

    const arr = controller.newsdata[`${category}`];
    if (index == -1) {
      // if the element is found in the array
      singleNews["author"] = reporter?.reporterName || "";
      addCategoryData(dispatch, { category: singleNews.category, data: singleNews });
      setOpen(false);
      setAddTrigger(true)
      setPop(false);
      setRefresh(dispatch,!controller.refresh);

    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    moveElementInArray(index);
    setAnchorEl(null);
  };

  const handleClose11 = () => {
    setAnchorEl(null);
  };
  const options = ["auto", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div>
      <div>
        <MDButton variant="gradient" onClick={handleClickPop} color="success">
          &nbsp;view
        </MDButton>
      </div>

      {pop && !open ? (
        <Dialog
          open={pop}
          TransitionComponent={Transition}
          keepMounted
          maxWidth={maxWidth}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Display News"}</DialogTitle>
          <DialogContent>
            <Card sx={{ maxWidth: 600, maxHeight: 700 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ py: 2 }}>
                  {singleNews?.title}{" "}
                  <Icon
                    onClick={handleClickOpen3}
                    sx={{ color: "grey", paddingTop: "1px", marginLeft: "10px", cursor: "pointer" }}
                  >
                    edit
                  </Icon>
                </Typography>

                <Dialog
                  open={open3}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose3}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{"Edit Title"}</DialogTitle>
                  <DialogContent>
                    <Input type="text" onChange={(e) => setNewTitle(e.target.value)} />
                  </DialogContent>
                  <DialogActions>
                    <Button sx={{ color: "black" }} onClick={handleClose3}>
                      Cancel
                    </Button>
                    <MDButton variant="gradient" onClick={EditTitle} color="success">
                      <Icon sx={{ fontWeight: "bold" }}>update</Icon>
                      &nbsp;Update Title
                    </MDButton>
                  </DialogActions>
                </Dialog>

                <Box
                  sx={{
                    padding: "10px 0",
                    display: "flex",
                    justifyContent: "flext-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ paddingRight: 2, fontSize: "15px", fontStyle: "italic" }}
                  >
                    Author:
                  </Typography>{" "}
                  {reporter?.reporterName}
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {singleNews?.body}
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ maxWidth: 600, maxHeight: 700, marginTop: 2 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ py: 1 }}>
                  Spoken Text
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {singleNews?.speechText}
                </Typography>
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "black" }} onClick={handleClose2}>
              Close
            </Button>
            <MDButton variant="gradient" onClick={handleAddNews} color="success">
              &nbsp;Add to Newspaper
            </MDButton>
            <Button
              variant="contained"
              color="success"
              onClick={handleClick}
              style={{
                marginLeft: "10px",
                backgroundImage: "linear-gradient(195deg, #66BB6A, #43A047)",
                color: "white",
                width: "180px",
              }}
            >
              {`Set Priority: ${options[selectedIndex]}`}
            </Button>
            <Menu
              id="priority-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose11}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>

            <MDButton variant="gradient" onClick={handleClickOpen} color="success">
              &nbsp;Edit
            </MDButton>
          </DialogActions>
        </Dialog>
      ) : (
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
            <Box sx={{ padding: "20px", display: "flex" }}>{author}</Box>
            <Editor editorState={editorState} onEditorStateChange={handleEditorStateChange} />
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "black" }} onClick={handleClose}>
              Cancel
            </Button>
            <MDButton variant="gradient" onClick={EditNews} color="success">
              <Icon sx={{ fontWeight: "bold" }}>update</Icon>
              &nbsp;Update
            </MDButton>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
