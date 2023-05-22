/*eslint-disable */

// Material Dashboard 3 React co3ponents
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
import { Checkbox } from "@material-ui/core";

// import { useMaterialUIController, addCategoryDataSelected, setRefresh } from "context";

export default function data() {
  // const [checked, setChecked] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const handleChange = (event, item) => {
    const isChecked = event.target.checked;
    console.log("ITEM", item);
    setSelectedRows((prevSelectedRows) => {
      if (isChecked) {
        const isItemPresent = prevSelectedRows.some((row) => row.id === item.id);
        if (isItemPresent) {
          return prevSelectedRows;
        }
        return [...prevSelectedRows, item.data];
      } else {
        return prevSelectedRows.filter((row) => row.id !== item.id);
      }
    });
  };

  // console.log("Selected Rows: ", selectedRows)
  // const handleAdd = () => {
  //   const dataArray = table.allData.map((obj) => obj.data);

  //   console.log("ALLLL Data", table.allData);
  //   addCategoryDataAll(dispatch, { category: cat, data: dataArray });
  // };

  console.log("Selected Rows: ", selectedRows);

  const [news, setNews] = useState([]);
  const [controller, dispatch] = useMaterialUIController();

  const [trigger, setTrigger] = useState(false);

  const [politicsNews, setPoliticsNews] = useState([]);
  const [sportsNews, setSportsNews] = useState([]);
  const [entertainmentNews, setEntertainmentNews] = useState([]);
  const [businessNews, setBusinessNews] = useState([]);



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
          // categorizeNews(result);

          setNews([...result]);

          setTrigger(true);
        });
    };
    fireBaseData();
    if (!news) {
      setTrigger(!trigger);
    }
  }, [trigger, controller.refresh]);

  const handleObjecCheck = (a, t) => {
    // console.log('category',a)
    const res = a.newsdata[`${t.data.category}`];

    // const isObjectContained = res.some(obj => obj.title === objToCheck.title);
    if (res) {
      const index = res?.findIndex((obj) => obj.title === t.data.title);
      const isObjectContained = index !== -1;
      return isObjectContained;
    }

    // if(t && t?.data){
    //   const res = controller.newsdata[`${t.data.category}`]?.some((ob)=>ob.title==item.title)
    // console.log(res)
    // }

    return false;
  };

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
  const [rows2, setRows2] = useState([]);
  const [rows3, setRows3] = useState([]);
  const [rows4, setRows4] = useState([]);

  // console.log("Controller in authorstable:",controller)

  useEffect(() => {
    if (news) {
      const politics = news.filter((el) => el.data.category == "politics");
      const sports = news.filter((el) => el.data.category == "sports");
      const entertainment = news.filter((el) => el.data.category == "entertainment");
      const business = news.filter((el) => el.data.category == "business");
      setSportsNews(sports);
      setBusinessNews(business);
      setPoliticsNews(politics);
      setEntertainmentNews(entertainment);

      business &&
        setRows((prevRows) =>
          business.map((item) => ({
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
            isPublished: (
              // <MDTypography variant="caption" color="text" fontWeight="medium">False</MDTypography>,
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {handleObjecCheck(controller, item) == true ? "True" : "false"}{" "}
              </MDTypography>
            ),
            action: (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <PopupModel
                  newsID={item?.id}
                  reporterID={item?.data?.reporterID}
                  title={item?.data.title}
                  category={item?.data.category}
                  author={
                    <Author image={team2} name="John Michael" email="john@creative-tim.com" />
                  }
                />
              </div>
            ),
            add: <Checkbox onChange={(e) => handleChange(e, item)} color="tertiary" />,
          }))
        );

      entertainment &&
        setRows2((prevRows) =>
          entertainment.map((item) => ({
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
            isPublished: (
              // <MDTypography variant="caption" color="text" fontWeight="medium">False</MDTypography>,
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {handleObjecCheck(controller, item) == true ? "True" : "false"}{" "}
              </MDTypography>
            ),
            action: (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <PopupModel
                  newsID={item?.id}
                  reporterID={item?.data?.reporterID}
                  title={item?.data.title}
                  category={item?.data.category}
                  author={
                    <Author image={team2} name="John Michael" email="john@creative-tim.com" />
                  }
                />
              </div>
            ),
            add: <Checkbox onChange={(e) => handleChange(e, item)} color="tertiary" />,
          }))
        );

      sports &&
        setRows3((prevRows) =>
          sports.map((item) => ({
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
            isPublished: (
              // <MDTypography variant="caption" color="text" fontWeight="medium">False</MDTypography>,
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {handleObjecCheck(controller, item) == true ? "True" : "false"}{" "}
              </MDTypography>
            ),
            action: (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <PopupModel
                  newsID={item?.id}
                  reporterID={item?.data?.reporterID}
                  title={item?.data.title}
                  category={item?.data.category}
                  author={
                    <Author image={team2} name="John Michael" email="john@creative-tim.com" />
                  }
                />
              </div>
            ),
            add: <Checkbox onChange={(e) => handleChange(e, item)} color="tertiary" />,
          }))
        );

      politics &&
        setRows4((prevRows) =>
          politics.map((item) => ({
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
            isPublished: (
              // <MDTypography variant="caption" color="text" fontWeight="medium">False</MDTypography>,
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {handleObjecCheck(controller, item) == true ? "True" : "false"}{" "}
              </MDTypography>
            ),
            action: (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <PopupModel
                  newsID={item?.id}
                  reporterID={item?.data?.reporterID}
                  title={item?.data.title}
                  category={item?.data.category}
                  author={
                    <Author image={team2} name="John Michael" email="john@creative-tim.com" />
                  }
                />
              </div>
            ),
            add: <Checkbox onChange={(e) => handleChange(e, item)} color="tertiary" />,
          }))
        );
    }
  }, [news.length != 0, controller.refresh]);

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
      { Header: "select", accessor: "add", align: "center" },
    ],

    rows,
    rows2,
    rows3,
    rows4,
    sportsNews,
    businessNews,
    entertainmentNews,
    politicsNews,
    selectedRows,
  };
}
