/* eslint-disable */
// @mui material components
import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Link } from "react-router-dom";
// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
// import authorsTableData1 from "layouts/tables/data/authorsTableData1";ss
import projectsTableData from "layouts/tables/data/projectsTableData";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
} from "@material-ui/core";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function FullWidthTabs({ children1, children2, children3, children4 }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          sx={{
            "MuiTabs-root": {
              background: "red",
            },
          }}
          aria-label="full width tabs example"
        >
          <Tab label="Business" {...a11yProps(0)} />
          <Tab label="Sports" {...a11yProps(1)} />
          <Tab label="Entertainment" {...a11yProps(2)} />
          <Tab label="Politics" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {children1}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {children2}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {children3}
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          {children4}
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

function Tables() {
  const useStyles = makeStyles((theme) => ({
    dialog: {
      maxWidth: "35%",
      width: "35%",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "80%",
        width: "80%",
      },
    },
    title: {
      textAlign: "center",
    },
    input: {
      display: "block",
      margin: "0 auto",
      marginBottom: theme.spacing(2),
      width: "70%",
      padding: theme.spacing(1),
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "1.2rem",
      [theme.breakpoints.down("sm")]: {
        width: "90%",
        fontSize: "1rem",
      },
    },
    button: {
      display: "block",
      margin: "10px auto",
      marginTop: theme.spacing(2),
    },
  }));

  const [selectedDate, setSelectedDate] = useState(new Date());
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const {
    columns,
    rows,
    rows2,
    rows3,
    rows4,
    sportsNews,
    entertainmentNews,
    businessNews,
    politicsNews,
    selectedRows,
  } = authorsTableData();
  // const { columns1, rows } = authorsTableData1();

  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [selectedCategory, setSelectedCategory] = useState("business");

  // console.log("Outside",selectedRows)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
                <FullWidthTabs
                  children1={
                    <DataTable
                      cat="business"
                      table={{ columns, rows, allData: businessNews, selectedRows: selectedRows }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                  }
                  children2={
                    <DataTable
                      cat="sports"
                      table={{
                        columns,
                        rows: rows3,
                        allData: sportsNews,
                        selectedRows: selectedRows,
                      }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                  }
                  children3={
                    <DataTable
                      cat="entertainment"
                      table={{
                        columns,
                        rows: rows2,
                        allData: entertainmentNews,
                        selectedRows: selectedRows,
                      }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                  }
                  children4={
                    <DataTable
                      cat="politics"
                      table={{
                        columns,
                        rows: rows4,
                        allData: politicsNews,
                        selectedRows: selectedRows,
                      }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                  }
                />

                {/* <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
