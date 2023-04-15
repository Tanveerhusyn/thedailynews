import React, { useEffect } from "react";
import "../Newpaper/newspaper.css";
import { Grid, Button, IconButton } from "@mui/material";
import { useMaterialUIController,setPrint } from "context";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

const View = ({
  title,
  date,
  headofficeAddress,
  websiteURL,
  content,
  imageUrl,
  category,
  order1,
  order2,
  order3,
  order4,
  isFirst
}) => {
  const [visibleID, setVisibleID] = React.useState(null);
  const [controller, dispatch] = useMaterialUIController();
  const navigate = useNavigate()
  useEffect(()=>{
    setPrint(dispatch,true)
  },[])

  return (
  <>
  <div style={{margin:20}}>
 {
  isFirst &&  <MDButton color="success" onClick={()=>{
    setPrint(dispatch,false)
    navigate('/newspapers')
  }}>Back</MDButton>
 }
  </div>
  <div style={{margin:'40px 240px'}} className="newspaper">

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
      width: "768px",
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
        <p style={{
             // set a fixed width for the container element
             width:'400px',
             
            textAlign: "justify",
            textJustify: "inter-word",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 10,
            textOverflow: "ellipsis",
        }}>{content[0]?.description} </p>
        
          {
           content[0]?.image && <img
            style={{ width: "300px", height: "auto",margin:'1px 20px', }}
            src={content[0]?.image}
            alt="newspaper"
          />
          }
        
      </div>
    </div>
    
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
      position: "relative",
      height:'500px',
       
      opacity: `${visibleID == 2 ? 0.6 : 1}`,
    }}
  >
   {
    content[1]?.image &&  <figure style={{ marginBottom: "10px" }}>
    <img
      style={{ width: "373px", height: "auto" }}
      src={content[1]?.image}
      alt="newspaper"
    />
  </figure>
   }
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <h3>{content[1]?.title}</h3>
    </div>
    {
      content[2]?.author && <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
      {content[2] && <p style={{ textAlign: "start" }}>By: {content[2].author}</p> }
      <hr style={{ width: "100%", borderTop: "1px solid black" }} />
    </div>
    }
    <p
     style={{
      width: "370px", // set a fixed width for the container element
textAlign: "justify",
textJustify: "inter-word",
overflow: "hidden",
display: "-webkit-box",
WebkitBoxOrient: "vertical",
WebkitLineClamp: 15,
textOverflow: "ellipsis",
    }}
    >
      {content[1]?.description}
    </p>
    {content[1]?.category && <p> {`[${content[1].category}. Page 4]`}</p>}
  
  </Grid>
  <Grid item xs={12} sm={6} order={{ sm: order2 }}>
    <Grid item sx={12}>
      <figure style={{ display: "flex" }}>
        {/* <img style={{ width: '200px', height: 'auto' }} src={imageUrl} alt="newspaper" /> */}
        <span
          onMouseEnter={() => setVisibleID(3)}
          onMouseLeave={() => setVisibleID(null)}
          style={{
            display: "flex",
            position: "relative",
            opacity: `${visibleID == 3 ? 0.6 : 1}`,
            flexDirection: "column",
            height:'500px',
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-start", width: "140px" }}>
            <h4 style={{ textAlign: "justify" }}>{content[2]?.title}</h4>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            {content[2]?.author && <p style={{ textAlign: "start" }}>By: {content[2].author}</p> }
           {content[2]?.author &&  <hr style={{ width: "80%", borderTop: "1px solid black" }} />}
          </div>
          <p
            style={{
              textAlign: "justify",
              width: "150px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 23,
              textOverflow:'ellipsis',
              marginBottom: "5px",
              marginRight: "12px",
            }}
          >
            {content[2]?.description}{" "}
          </p>
          {content[4]?.category && <p>{`[${content[2]?.category}. Page 4]`}</p>}
        
        </span>
        <span
          onMouseEnter={() => setVisibleID(4)}
          onMouseLeave={() => setVisibleID(null)}
          style={{
            display: "flex",
            position: "relative",
            height:'500px',
            opacity: `${visibleID == 4 ? 0.6 : 1}`,
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-start", width: "140px" }}>
            <h4 style={{ textAlign: "justify" }}>{content[3]?.title}</h4>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            {content[3]?.author && <p style={{ textAlign: "start" }}>By:{content[3].author}</p> }
            {content[3]?.author && 
            <hr style={{ width: "50%", borderTop: "1px solid black" }} />
          }
          </div>
          <p
            style={{
              textAlign: "justify",
              width: "190px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 21,
              marginBottom: "5px",
            }}
          >
            {content[3]?.description}
          </p>

          {content[4]?.category && <p>{`[${content[3]?.category}. Page 5]`}</p>}
        
        </span>
      </figure>
    </Grid>
    {/* <Grid sx={12}>
        <img style={{ width: "350px", height: "200px" }} src={imageUrl} alt="newspaper" />
      </Grid> */}
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
      opacity: `${visibleID == 5 ? 0.6 : 1}`,
    }}
  >
    <div>
      {/* <img style={{ width: "200px", height: "auto" }} src={imageUrl} alt="newspaper" /> */}
      <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
        <h4 style={{ textAlign: "justify" }}>{content[4]?.title}</h4>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {content[4]?.author && <p style={{ textAlign: "start" }}>By: {content[4].author}</p> }
       {content[4]?.author &&  <hr style={{ width: "50%", borderTop: "1px solid black" }} />}

      </div>

      <p className="bottom-articles">{content[4]?.description}</p>
     {content[4]?.category &&  <p>{`[${content[4].category}. Page 4]`}</p>}
    </div>

  
  </Grid>
  <Grid style={{ display: "flex"  ,opacity: `${visibleID == 6 ? 0.6 : 1}`,}} order={{ sm: order4 }}>
    <Grid
      onMouseEnter={() => setVisibleID(6)}
      onMouseLeave={() => setVisibleID(null)}
      xs={4}
      sm={4}
      style={{ margin: "5px",position:'relative' }}
    >
      <span>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <h5>{content[5]?.title}</h5>
        </div>
        <p className="bottom-articles">{content[5]?.description}</p>
      </span>
    
    </Grid>
    <Grid
      onMouseEnter={() => setVisibleID(7)}
      onMouseLeave={() => setVisibleID(null)}
      xs={4}
      sm={4}
      style={{ margin: "5px",position:'relative', opacity: `${visibleID == 7 ? 0.6 : 1}`, }}
    >
      <span>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <h5>{content[6]?.title}</h5>
        </div>
        <p className="bottom-articles">{content[6]?.description}</p>
      </span>
    
    </Grid>
    <Grid
      onMouseEnter={() => setVisibleID(8)}
      onMouseLeave={() => setVisibleID(null)}
      xs={4}
      sm={4}
      style={{ margin: "5px",position:'relative', opacity: `${visibleID == 8 ? 0.6 : 1}`, }}
    >
      <span>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <h5>{content[7]?.title}</h5>
        </div>
        <p className="bottom-articles">{content[7]?.description}</p>
      </span>
    
    </Grid>
   
  </Grid> 
    </>
      ):<Grid style={{width:'700px',height:'100vh'}} ></Grid>
  }

</Grid>
</div>
  </>
  );
};

export default View;