 /*eslint-disable*/

 
import PropTypes from "prop-types";

import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function NewsDetail() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [archive,setArchive] = useState([])
 
  const getData = ()=>{
    db.collection('archive').get()
    .then((querySnapshot)=>{
        let result = []
        querySnapshot.docs.forEach((data)=>{
              result.push(data)
        })

        console.log("res",result)

        setArchive(result)
    })
  }

  useEffect(()=>{
    getData()
  },[])
  return (
    <DashboardLayout>
        <MDBox
                
                 
                mb={3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="success"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Newspaper Archive
                </MDTypography>
              </MDBox>
    <Grid sx={{width:'1200px',height:'100%'}} container spacing={2}>
    
      <Grid item  xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ maxWidth: 345 }}>
         
          {/* <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={_.imageUrl}
          /> */}
          <CardContent>
            <Typography variant="caption">
              {archive.date}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {""}
            </Typography>
            <p className="card-description" style={{
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': 3,
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }} color="text.secondary">
              {archive.description}
            </p>
          </CardContent>
          <CardActions sx={{display:'flex',justifyContent:'space-between'}}>
            <Button size="small">Share</Button>
            <MDButton variant="gradient" color="success" >View</MDButton>
          </CardActions>
        </Card>
      </Grid>
  </Grid>
  </DashboardLayout>
  );
}

 

export default NewsDetail;


// import React, { useState } from "react";
// import axios from 'axios';

// function ImageVerifier() {
//   const [image1, setImage1] = useState("");
//   const [image2, setImage2] = useState("");

//   const handleImage1Change = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setImage1(reader.result);
//     };
//   };

//   const handleImage2Change = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setImage2(reader.result);
//     };
//   };
//   let data = {
    
//         "img1_path":image1,
//         "img2_path":image2
      
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log("DATA",data)
//     await axios.post("http://3.238.41.255:5000/verify",data,{headers:{"Content-Type" : "application/json"}})
//      .then((res)=>{
// console.log("response:",res)
 
//      })
//      .catch((err)=>{
//        console.log(err)
//      })
//   };

//   return (
//     <form style={{marginLeft:'300px'}} onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="image1">Image 1:</label>
//         <input type="file" accept="image/*" onChange={handleImage1Change} />
//       </div>
//       <div>
//         <label htmlFor="image2">Image 2:</label>
//         <input type="file" accept="image/*" onChange={handleImage2Change} />
//       </div>
//       <button type="submit">Verify</button>
//     </form>
//   );
// }

// export default ImageVerifier;
