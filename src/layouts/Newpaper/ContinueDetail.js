import React from "react";
import "./newspaper.css";
import { Grid, Button, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import EditPaper from "../../examples/Editpaper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import { useMaterialUIController,updateData } from "context";
export function AlertDialog({ top, left,title,category }) {
  const [open, setOpen] = React.useState(false);
  const [controller, dispatch] = useMaterialUIController();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDelete = () => {
    let res;
    if(category=="frontPage"){
      
        res = controller.newsdata.frontPage.filter((el)=>el.title!=title)
    }
    else if(category=="business"){
      
        res = controller.newsdata.business.filter((el)=>el.title!=title)
    }
    else if(category=="sports"){
      
        res = controller.newsdata.sports.filter((el)=>el.title!=title)
    }
    else if(category=="entertainment"){
      
        res = controller.newsdata.entertainment.filter((el)=>el.title!=title)
    }
    else if(category=="politics"){
      
        res = controller.newsdata.politics.filter((el)=>el.title!=title)
    }
   
    updateData(dispatch,{category:category,data:res})
    setOpen(false);

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        variant="outlined"
        style={{
          position: "absolute",
          top: `${top}%`,
          color: "red",
          backgroundColor: "white",
          left: `${left}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Do You Want To Delete the News?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All the data will be permenently deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const ContinueDetail = ({
  title,
  date,
  headofficeAddress,
  websiteURL,
  content,
  imageUrl,
  category,
  order1,
  order2,
  ctnNum,
  order3,
  order4,
}) => {
  const [visibleID, setVisibleID] = React.useState(null);
  const [controller, dispatch] = useMaterialUIController();


  return (
    <div style={{margin:`${controller.print?"0":"10%"}`,boxSizing:'border-box'}} className="newspaper">
      <div className="newspaper-header">
        <div className="header-left">
          <div className="header-right">
            <p className="newspaper-date">{date}</p>
            <p className="headoffice-address">{headofficeAddress}</p>
            <p className="website-url">{websiteURL}</p>
          </div>
          <h1 className="newspaper-title">{title}</h1>
          <p className="newspaper-category">{category.toUpperCase()}</p>
        </div>
      </div>

      <Grid style={{ width: "100%" }} container spacing={1}>
        {
           content && content.length > 0?(
          <>
           <Grid
          onMouseEnter={() => setVisibleID(1)}
          onMouseLeave={() => setVisibleID(null)}
          style={{
            maxWidth:'min-content',
            position: "relative",
            textAlign: "justify",
        
            opacity: `${visibleID == 1 ? 0.6 : 1}`,
          }}
          xs={12}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              position: "relative",
            }}
          >
            <h2>{content[0]?.title}</h2>
            <div style={{ display: "flex",flexDirection:`${order1%2==0?"row-reverse":"row"}` }}>
            <div style={{ width:'700px', height:'100%', position:'relative' }}>
            <span style={{ fontSize:'12px', fontWeight:'bold' }}>{`Continue of Page ${ctnNum}`}</span>
    
    <p style={{
       
      textAlign: "justify",
      textJustify: "inter-word",
      overflow: "hidden",
      display: "-webkit-box",
      
       
    }}>{content[0]?.description} </p>
  </div>
              
                {/* <img
                  style={{ width: "200px", height: "auto",margin:'1px 20px', }}
                  src={content[0]?.image}
                  alt="newspaper"
                /> */}
              
            </div>
          </div>
          {content[0] && visibleID === 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "white",
              }}
            >
              <Link
                to="/detail"
                state={{
                  news: content[0],
                }}
              >
                <IconButton
                  variant="outlined"
                  style={{
                    position: "absolute",
                    top: `50%`,
                    color: "green",
                    backgroundColor: "white",
                    left: `50%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Link>

              {/* <EditPaper top={50} left={50} content={content} /> */}
              <AlertDialog top={50} left={57} title={content[0]?.title} category={category}/>
            </div>
          )}
        </Grid>
        <Grid
          item
          onMouseEnter={() => setVisibleID(2)}
          onMouseLeave={() => setVisibleID(null)}
          xs={12}
          sm={6}
          order={{ sm: order1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth:'700px',
            position: "relative",
                      opacity: `${visibleID == 2 ? 0.6 : 1}`,
          }}
        >
          {/* <figure style={{ marginBottom: "10px" }}>
            <img
              style={{ width: "373px", height: "auto" }}
              src={content[1]?.image}
              alt="newspaper"
            />
          </figure> */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <h3>{content[1]?.title}</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            {content[2] && <p style={{ textAlign: "start" }}>By: Tanveer Hussain</p> }
            <hr style={{ width: "100%", borderTop: "1px solid black" }} />
          </div>
          <span style={{ fontSize:'12px', fontWeight:'bold',padding:'5px' }}>{`Continue of Page ${ctnNum}`}</span>

          <p
           style={{
            columnCount:4,
            // set a fixed width for the container element

    textAlign: "justify",
    textJustify: "inter-word",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 12,

    textOverflow: "ellipsis",
          }}
          >
            {content[1]?.description}
          </p>
          <p> {`[${content[1]?.category}. Page 4]`}</p>
          {content[1] && visibleID === 2 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "white",
              }}
            >
              {/* <EditPaper top={67} left={40} content={content} /> */}

              <Link
                to="/detail"
                state={{
                  news: content[1],
                }}
              >
                <IconButton
                  variant="outlined"
                  style={{
                    position: "absolute",
                    top: `67%`,
                    color: "green",
                    backgroundColor: "white",
                    left: `40%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Link>

              <AlertDialog top={67} left={55} title={content[1]?.title} category={category}/>
            </div>
          )}
        </Grid>
        
        <Grid
          onMouseEnter={() => setVisibleID(5)}
          onMouseLeave={() => setVisibleID(null)}
          item
          sx={12}
          order={{ sm: order3 }}
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            minWidth:'700px',
            maxWidth:'710px',
            opacity: `${visibleID == 5 ? 0.6 : 1}`,
          }}
        >
          <div>
            {/* <img style={{ width: "200px", height: "auto" }} src={imageUrl} alt="newspaper" /> */}
            <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
              <h4 style={{ textAlign: "justify" }}>{content[2]?.title}</h4>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              {content[2] && <p style={{ textAlign: "start" }}>By: Tanveer Hussain</p> }
              <hr style={{ width: "80%", borderTop: "1px solid black" }} />
            </div>
            <span style={{ fontSize:'12px', fontWeight:'bold', }}>{`Continue of Page ${ctnNum}`}</span>

            <p style={{
                 columnCount:7,
                 // set a fixed width for the container element
                 
         textAlign: "justify",
         textJustify: "inter-word",
         overflow: "hidden",
         display: "-webkit-box",
         WebkitBoxOrient: "vertical",
         WebkitLineClamp: 20,
         textOverflow: "clip",
            }}>{content[2]?.description}</p>
            
          </div>

          {visibleID === 5 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "white",
              }}
            >
              {/* <EditPaper top={60} left={48} content={content} /> */}

              <Link
                to="/detail"
                state={{
                  news: content[2],
                }}
              >
                <IconButton
                  variant="outlined"
                  style={{
                    position: "absolute",
                    top: `60%`,
                    color: "green",
                    backgroundColor: "white",
                    left: `48%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Link>
              <AlertDialog top={60} left={55} title={content[2]?.title} category={category}/>
            </div>
          )}
        </Grid>
        <Grid sx= {12} style={{ display: "flex"  ,opacity: `${visibleID == 6 ? 0.6 : 1}`,}} order={{ sm: order4 }}>
     
       
          <Grid
            onMouseEnter={() => setVisibleID(8)}
            onMouseLeave={() => setVisibleID(null)}
            xs={12}
            sm={4}
            style={{ margin: "5px",position:'relative',  minWidth:'700px',
            maxWidth:'710px', opacity: `${visibleID == 8 ? 0.6 : 1}`, }}
          >
            <span>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <h5>{content[3]?.title}</h5>
              </div>
              <p >{content[3]?.description}</p>
            </span>
            {content[3] && visibleID === 8 && (
             
               <>
               <Link
                      to="/detail"
                      state={{
                        news: content[3],
                      }}
                    >
                      <IconButton
                        variant="outlined"
                        style={{
                          position: "absolute",
                          top: `50%`,
                          color: "green",
                          backgroundColor: "white",
                          left: `35%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Link>

                    <AlertDialog top={50} left={60} title={content[3]?.title} category={category}/>
              </>
             
            )}
          </Grid>
         
        </Grid> 
          </>
            ):<Grid style={{width:'700px',height:'100vh'}} ></Grid>
        }
      
      </Grid>
    </div>
  );
};


export default ContinueDetail;