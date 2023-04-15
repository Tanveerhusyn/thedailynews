/*eslint-disable */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import PopupModel from "../../../examples/TextEditor";

import React, { useState, useEffect } from "react";

import { db } from "../../../utils/firebaseConfig";
import { useMaterialUIController } from "context";

export default function data() {
  const [news, setNews] = useState([]);
  const [controller, dispatch] = useMaterialUIController();
  
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fireBaseData = () => {
      // let result = [];
      db.collection("news")
        .get()
        .then(async (querySnapshot) => {
          const promises = querySnapshot.docs.map(async (doc) => {
            const report = await db.collection("reportor").doc(doc.data().reporterID).get();
            return { id: doc.id, data: doc.data(), reporter: report.data() };
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
  }, [trigger,controller.refresh]);

  const handleObjecCheck = (a,t)=>{

   
    // console.log('category',a)
    const res = a.newsdata[`${t.data.category}`]

    // const isObjectContained = res.some(obj => obj.title === objToCheck.title);
   if(res){
    const index = res?.findIndex(obj => obj.title === t.data.title );
    const isObjectContained = index !== -1;
    return isObjectContained;
   }
    

    // if(t && t?.data){
    //   const res = controller.newsdata[`${t.data.category}`]?.some((ob)=>ob.title==item.title)
    // console.log(res)
    // }

    return false;
  }

  // console.log("Data IN AUTHORS TABLE: ...", news);

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const [rows, setRows] = useState([]);

  // console.log("Controller in authorstable:",controller)

  useEffect(() => {
    if (news) {
      news &&
        setRows((prevRows) =>
          news.map((item) => ({
            reporter: <MDBox>{item?.reporter?.reporterName}</MDBox>,

            // <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
            category: <MDBox>{item?.data?.category}</MDBox>,
            date: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {formatFirebaseTimestamp(
                  parseInt(item?.data?.date?.seconds),
                  parseInt(item?.data?.date?.nanoseconds)
                )}
              </MDTypography>
            ),
            isPublished: 
            // <MDTypography variant="caption" color="text" fontWeight="medium">False</MDTypography>,
            <MDTypography  variant="caption" color="text" fontWeight="medium" >{handleObjecCheck(controller,item)==true?"True":"false"} </MDTypography>,
            action: (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <PopupModel
                  newsID={item?.id}
                  reporterID={item?.data?.reporterID}
                  title = {item?.data.title}
                  category = {item?.data.category}
                  author={
                    <Author image={team2} name="John Michael" email="john@creative-tim.com" />
                  }
                />
              </div>
            ),
          }))
        );
    }
  }, [news.length != 0,controller.refresh]);

  function formatFirebaseTimestamp(seconds, nanoseconds) {
    const timestamp = new Date(seconds * 1000 + nanoseconds / 1000000); // Convert to milliseconds
    const dateString = timestamp.toLocaleDateString(); // Format date to string
    const timeString = timestamp.toLocaleTimeString(); // Format time to string
    return `${dateString} ${timeString}`; // Combine date and time strings
  }

  return {
    columns: [
      { Header: "reporter", accessor: "reporter", width: "20%", align: "left" },
      { Header: "category", accessor: "category", align: "left" },
      { Header: "Uploaded", accessor: "date", align: "center" },
      { Header: "Published", accessor: "isPublished", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows,
  };
}
