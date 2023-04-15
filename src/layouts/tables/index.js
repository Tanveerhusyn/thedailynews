/* eslint-disable */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {useState} from 'react'

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
import projectsTableData from "layouts/tables/data/projectsTableData";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
} from "@material-ui/core";

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

  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                display="flex"
                justifyContent="space-between"
                variant="gradient"
                bgColor="success"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Published Reports
                </MDTypography>
                {/* <Link to="/epaper"> */}
                {/* <MDButton variant="gradient" color="white" onClick={handleOpen}>
                  Create Newspaper
                </MDButton> */}
                {/* </Link> */}
                <>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="md"
                    PaperProps={{ style: { maxWidth: "35%", width: "35%", height: "45%" } }}
                  >
                    <DialogTitle className={classes.title}>
                      Select a date to generate Newspaper
                    </DialogTitle>
                    <DialogContent>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className={classes.input}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        // onClick={handleGenerate}
                        className={classes.button}
                        sx={{ margin: "20px" }}
                      >
                        Generate
                      </Button>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
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
