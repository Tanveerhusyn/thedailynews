 
import PropTypes from "prop-types";

import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import { db } from "utils/firebaseConfig";
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import './style.css'
// Material Dashboard 2 React context
import { useMaterialUIController,setPrint } from "context";


import View from "layouts/view";
import axios from "axios";

import PLimit from "p-limit";
import PrintIcon from "@mui/icons-material/Print";
import { IconButton } from "@mui/material";
import "../Newpaper/news.css";
import findMatchingObjects from "utils/algorithm";
const Viewhelper = ({news}) => {
  const [controller, dispatch] = useMaterialUIController();

  // const printFunction = () => {
  //   setPrint(dispatch, true);

  //   setTimeout(() => {
  //     window.print();
  //   }, 1000);
  // };
  // const limit = PLimit(2); 

  // const fetchNews = (category) => {
  //   const API_KEY = "2fc52b2c506f42a38727e09b0ac6dbf7";
  //   const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&category=${category}`;

  //   return axios.get(API_URL).then((response) => response.data);
  //   // axios.get(API_URL)
  //   //   .then(response => {
  //   //     console.log("Report",response.data);
  //   //     // Handle the response data here
  //   //   })
  //   //   .catch(error => {
  //   //     console.log(error);
  //   //     // Handle the error here
  //   //   });
  // };

  // const runAlgo = async (newsData) => {
   
  //   const resultArr = await Promise.all(
  //     newsData.map(async (item) => {
  //       const tagsA = controller.newsdata[`${
  //         item.category.toLowerCase() == "general" ? "politics" : item.category.toLowerCase()
  //       }`]
  //       const matchingObjects = await findMatchingObjects(item.data.articles, tagsA);
  //       return {
  //         [`${
  //           item.category.toLowerCase() == "general" ? "politics" : item.category.toLowerCase()
  //         }`]: matchingObjects,
  //       };
  //     })
  //   );

  //   const myObject = Object.assign({}, ...resultArr);
  //   const frontPageData = [
  //     myObject.business[0],
  //     myObject.politics[0],
  //     myObject.sports[0],
  //     myObject.entertainment[0],
  //   ].filter(Boolean);

  //   const myUpdatedObject = {
  //     ...myObject,
  //     frontPage: frontPageData,
  //   };
  //   // console.log("result", myUpdatedObject);
  //   // setNewsData(dispatch,myUpdatedObject);

  // };

  // const [news, setNews] = React.useState([]);
  // React.useEffect(() => {
  //   setFrontPageData(dispatch, "dsfs");
  //   setNews(controller.newsdata);

  //   const handleAfterPrint = () => {
  //     setPrint(dispatch, false);
  //   };

  //   const categories = ["Business", "General", "Entertainment", "Sports"];
  //   const fetchAllData = async () => {
  //     const allData = await Promise.all(categories.map((category) => fetchNews(category)));
  //     const newsData = categories.map((category, index) => ({ category, data: allData[index] }));
  //     // setNews(newsData);
  //     console.log("All categories fetched!", newsData);
  //     runAlgo(newsData);
  //   };
  //   fetchAllData();

  //   window.addEventListener("afterprint", handleAfterPrint);
  //   return () => {
  //     window.removeEventListener("afterprint", handleAfterPrint);
  //   };
  // }, []);


  const title = "The Daily News";
  const date = "March 19, 2023";
  const headofficeAddress = "Hostel City, Islamabad";
  const websiteURL = "www.newspaper.com";

  const imageUrl = "https://images.pexels.com/photos/4416260/pexels-photo-4416260.jpeg";

  const handleScroll = (e) => {
    e.preventDefault();

    const category = e.target.dataset.category;
    const categorySection = document.getElementById(category);

    if (categorySection) {
      window.scrollTo({
        top: categorySection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {!controller.print && (
        <div className="mycontainer app-bar">
          <div className="categories">
            <a href="#" className="button" data-category="frontPage" onClick={handleScroll}>
              Front Page
            </a>
            <a href="#" className="button" data-category="sports" onClick={handleScroll}>
              Sports
            </a>
            <a href="#" className="button" data-category="entertainment" onClick={handleScroll}>
              Entertainment
            </a>
            <a href="#" className="button" data-category="business" onClick={handleScroll}>
              Business
            </a>
            <a href="#" className="button" data-category="politics" onClick={handleScroll}>
              Politics
            </a>
          </div>
          <IconButton >
            <PrintIcon style={{ color: "white" }} />
          </IconButton>
        </div>
      )}

      {news ? (
        <>
          <section id="frontPage">
            <View
              title={title}
              date={date}
              isFirst={true}
              category="frontPage"
              headofficeAddress={headofficeAddress}
              websiteURL={websiteURL}
              content={news.paper.frontPage}
              imageUrl={imageUrl}
              order1={1}
              order2={2}
              order3={3}
              order4={4}
            />
          </section>
          <section id="sports">
            <View
              title={title}
              date={date}
              category="sports"
              headofficeAddress={headofficeAddress}
              websiteURL={websiteURL}
              content={news.paper.sports}
              imageUrl={imageUrl}
              order1={4}
              order2={3}
              order3={1}
              order4={2}
            />
          </section>
          <section id="entertainment">
            <View
              title={title}
              date={date}
              category="entertainment"
              headofficeAddress={headofficeAddress}
              websiteURL={websiteURL}
              content={news.paper.entertainment}
              imageUrl={imageUrl}
              order1={1}
              order2={2}
              order3={4}
              order4={3}
            />
          </section>
          <section id="business">
            <View
              title={title}
              date={date}
              category="business"
              headofficeAddress={headofficeAddress}
              websiteURL={websiteURL}
              content={news.paper.business}
              imageUrl={imageUrl}
              order1={2}
              order2={3}
              order3={1}
              order4={4}
            />
          </section>
          <section id="politics">
            <View
              title={title}
              date={date}
              category="politics"
              headofficeAddress={headofficeAddress}
              websiteURL={websiteURL}
              content={news.paper.politics}
              imageUrl={imageUrl}
              order1={3}
              order2={4}
              order3={3}
              order4={2}
            />
          </section>
        </>
      ) : null}
    </>
  );
};




function Billing() {
  const [controller,dispatch] = useMaterialUIController();
  const { darkMode } = controller;

 

  const [trigger, setTrigger] = React.useState()
  const [news, setNews] = React.useState([])
  const [currentView, setCurrentView] = React.useState()
  useEffect(() => {
    const fireBaseData = () => {
      // let result = [];
      db.collection("archive")
        .get()
        .then(async (querySnapshot) => {
          const promises = querySnapshot.docs.map(async (doc) => {
           
            return { data:doc.data() };
          });
          const result = await Promise.all(promises);

          setNews([...result]);
          setTrigger(true);
        });
    };
    fireBaseData();
    if (!news) {
      setTrigger(!trigger);
    }
  }, [trigger]);


  console.log("Archieve",news)
  return (
  <>
  {
    controller.print ? (
     <Viewhelper news={currentView}/>
    ):(
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
  <Grid container spacing={2}>
  {news?.map((_, index) => {
    console.log("Array",_)

    return (
      <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ maxWidth: 345 }}>
         
          {/* <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={_?.data.imageUrl}
          /> */}
          <CardContent>
            <Typography variant="caption">
              {}
            </Typography>
            <Typography sx={{display:'flex',justifyContent:'center',paddingTop:'30px'}} gutterBottom variant="h5" component="div">
              {_?.data.date}
            </Typography>
            <p className="card-description" style={{
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': 3,
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }} color="text.secondary">
              {_?.data.description}
            </p>
          </CardContent>
          <CardActions sx={{display:'flex',justifyContent:'center'}}>
            {/* <Button size="small">Share</Button> */}
            <MDButton variant="gradient" color="success" onClick={()=>{
              setCurrentView(_.data)
              setPrint(dispatch,true)
            }} >View</MDButton>
          </CardActions>
        </Card>
      </Grid>
    )
  })}
</Grid>
</DashboardLayout>
    )
  }
  </>
  );
}

 

export default Billing;


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
