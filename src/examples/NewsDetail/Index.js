import React from "react";
import "./detail.css";
import { Grid } from "@mui/material";
import { useLocation } from 'react-router-dom';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
const Newspaper = () => {
  const location = useLocation();

  // console.log("LOCATION STATE",location.state)
  const {news } = location?.state
  const title = "The Daily News";
  const date = "March 19, 2023";
  const headofficeAddress="Islamabad";
  const websiteURL = "www.newspaper.com";
  const content =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id velit vel velit convallis tincidunt. Suspendisse potenti. Sed vel arcu enim. Maecenas eget dui at mauris ultricies finibus. Donec euismod aliquet enim quis lobortis. Sed gravida diam eget diam scelerisque venenatis. Nullam eu nisl a dolor pretium sodales. Cras pellentesque dolor vel quam consequat placerat.vel arcu enim. Maecenas eget dui at mauris ultricies finibus. Donec euismod aliquet enim quis lobortis. Sed gravida diam eget diam scelerisque venenatis. Nullam eu nisl a dolor pretium sodales. Cras pellentesque dolor vel quam consequat placerat.vel arcu enim. Maecenas eget dui at mauris ultricies finibus. Donec euismod aliquet enim quis lobortis. Sed gravida diam eget diam scelerisque venenatis. Nullam eu nisl a dolor pretium sodales. Cras pellentesque dolor vel quam consequat placerat.vel arcu enim. Maecenas eget dui at mauris ultricies finibus. Donec euismod aliquet enim quis lobortis. Sed gravida diam eget diam scelerisque venenatis. Nullam eu nisl a dolor pretium sodales. Cras pellentesque dolor vel quam consequat placerat.vel arcu enim. Maecenas eget dui at mauris ultricies finibus. Donec euismod aliquet enim quis lobortis. Sed gravida diam eget diam scelerisque venenatis. Nullam eu nisl a dolor pretium sodales. Cras pellentesque dolor vel quam consequat placerat.";
  const imageUrl = "https://images.pexels.com/photos/4416260/pexels-photo-4416260.jpeg";
  const editorial =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id velit vel velit convallis tincidunt. Suspendisse potenti. Sed vel arcu enim. Maecenas eget dui at mauris ultricies finibus.";
  return (
    <DashboardLayout>
      <div className="newspaper">
      <div className="newspaper-header">
  <div className="header-left">
  <div className="header-right">
    <p className="newspaper-date">{date}</p>
    <p className="headoffice-address">{headofficeAddress}</p>
    <p className="website-url">{websiteURL}</p>
  </div>
    <h1 className="newspaper-title">{title}</h1>
  </div>

</div>

        <Grid style={{width:'700px'}} container spacing={1}>
          
       

          
          <Grid item sx={12}>
            {imageUrl && 
            (
                <img style={{ width: "100%", height: "auto" }} src={news?.image} alt="newspaper" />

            )}
              <div style={{ display: "flex" ,flexDirection:'column'}}>
                {/* <img style={{ width: "200px", height: "auto" }} src={imageUrl} alt="newspaper" /> */}
                <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
                    <h4 style={{ textAlign: "justify" }}>
                      {news?.title}
                    </h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    <p style={{ textAlign: "start" }}>{news?.author}</p>
                    <hr style={{ width: "80%", borderTop: "1px solid black" }} />
                  </div>
               
                <p
                className="bottom-article"
                >
                  {news?.description}
                </p>
              </div>
            </Grid>
            
    
        </Grid>
      </div>
    </DashboardLayout>
  );
};

export default Newspaper;