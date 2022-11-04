/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Cards from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Card, Progress } from "antd";
import MDButton from "components/MDButton";

import noIMG from "../../assets/images/noIMG.png";

function InvestDashboard() {
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [countdownDate] = useState(new Date("11/4/2022").getTime());

  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();

      const distanceToDate = countdownDate - currentTime;
      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distanceToDate % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      days = `${days}`;
      if (numbersToAddZeroTo.includes(hours)) {
        hours = `0${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }

      setState({ days, hours, minutes, seconds });
    }
  };

  useEffect(() => {
    setInterval(() => setNewTime(), 1000);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox style={{ minHeight: "500px" }} pt={7}>
        <Cards>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="error"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white" textAlign="center">
              Invest Dashboard
            </MDTypography>
          </MDBox>
          <Grid container spacing={1} py={5} px={1}>
            <Grid
              item
              xs={12}
              xl={4}
              md={6}
              sm={6}
              mt={3}
              style={{
                justifyContent: "center",
                width: "100%",
                display: "flex",
              }}
            >
              <Card
                hoverable
                style={{
                  boxShadow: "0 0 30px 0 rgb(0 0 0 / 5%)",
                  border: "0",
                  width: 340,
                  borderRadius: "10px",
                }}
              >
                <MDBox style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <img alt="example" src={noIMG} style={{ width: "150px", borderRadius: "10px" }} />
                </MDBox>
                <MDTypography variant="h4" color="error" textAlign="center" mt={1}>
                  Healer Token (HT)
                </MDTypography>
                <Grid container spacing={1} py={1}>
                  <Grid
                    item
                    xs={6}
                    xl={6}
                    md={6}
                    sm={6}
                    mt={3}
                    style={{
                      justifyContent: "start",
                      width: "100%",
                      display: "flex",
                    }}
                  >
                    <MDButton color="error" mt={3}>
                      Finished
                    </MDButton>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    xl={6}
                    md={6}
                    sm={6}
                    mt={3}
                    style={{
                      justifyContent: "end",
                      width: "100%",
                      display: "flex",
                    }}
                  >
                    <MDButton color="light" mt={3}>
                      Verified
                    </MDButton>
                  </Grid>
                </Grid>
                <Progress percent={50} status="active" />
                <MDTypography variant="h6" color="error" textAlign="center" mt={2}>
                  0 / 1BNB
                </MDTypography>
                <MDBox coloredShadow="light" borderRadius="7px" p={1} m={1}>
                  <MDTypography variant="h6" color="dark" textAlign="center" mt={2}>
                    End {state.days || "0"}d {state.hours || "0"}h {state.minutes || "0"}m{" "}
                    {state.seconds || "0"}s
                  </MDTypography>
                </MDBox>
                <MDButton color="error" mt={3} style={{ width: "100%" }}>
                  <Link to="/presale">
                    {" "}
                    <MDTypography variant="h7" color="light">
                      See Project All
                    </MDTypography>
                  </Link>
                </MDButton>
              </Card>
            </Grid>
          </Grid>
        </Cards>
      </MDBox>
    </DashboardLayout>
  );
}

export default InvestDashboard;
