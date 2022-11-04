/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */
import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";

// eslint-disable-next-line import/no-extraneous-dependencies
import { YoutubeFilled, TwitterCircleFilled, FacebookFilled } from "@ant-design/icons";
import { Progress } from "antd";

import noIMG from "../../assets/images/noIMG.png";

// //  Customize the DoodNftStaking CSS
// import TextField from "@mui/material/TextField";
// import { DatePicker, Checkbox } from "antd";

function PreSaleView() {
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [countdownDate] = useState(new Date("11/4/2022").getTime());

  useEffect(() => {
    setInterval(() => setNewTime(), 1000);
  }, []);

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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox style={{ minHeight: "500px" }} pt={7}>
        <Card>
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
              Presale
            </MDTypography>
          </MDBox>
          <Grid container spacing={1} py={5} px={3}>
            <Grid item xs={12} xl={4} md={4} mt={3} style={{ justifyContent: "center" }}>
              <MDBox style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <img alt="example" src={noIMG} style={{ width: "150px", borderRadius: "7px" }} />
              </MDBox>
            </Grid>
            <Grid item xs={12} xl={8} md={8} mt={3}>
              <MDBox style={{ width: "100%" }} coloredShadow="light" borderRadius="10px" p={3}>
                <MDTypography variant="h4" color="dark" textAlign="left" py={3}>
                  HARDIK (HDK)
                </MDTypography>
                <MDTypography variant="h6" color="success" textAlign="left" py={1}>
                  <MDButton color="success" mt={3}>
                    Verified
                  </MDButton>{" "}
                  - the token was minted by Sandwich
                </MDTypography>
                <MDTypography variant="h5" color="dark" textAlign="left">
                  <a
                    href="https://testnet.bscscan.com/token/0xDDE5fd47800a4ff35816791987bF6df6fCC69eD5"
                    target="_blank"
                    rel="noreferrer"
                  >
                    0xDDE5fd47800a4ff3581679....
                  </a>
                </MDTypography>
                <MDBox style={{ width: "100%", display: "flex" }} borderRadius="10px" pt={3}>
                  <YoutubeFilled
                    style={{ fontSize: "30px", marginRight: "1%", borderRadius: "8px" }}
                  />
                  <TwitterCircleFilled style={{ fontSize: "30px", marginRight: "1%" }} />
                  <FacebookFilled style={{ fontSize: "30px", marginRight: "1%" }} />
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={1} py={5} px={3}>
            <Grid item xs={12} xl={8} md={8} mt={3} style={{ justifyContent: "center" }}>
              <MDBox style={{ width: "100%" }} coloredShadow="light" borderRadius="10px" p={3}>
                <MDTypography variant="h4" color="dark" textAlign="left">
                  HARDIK (HDK)
                </MDTypography>
                <MDBox style={{ width: "100%", display: "flex", justifyContent: "start" }} pt={3}>
                  <MDTypography
                    variant="h6"
                    color="dark"
                    textAlign="center"
                    style={{
                      padding: "2%",
                      borderRadius: "7px",
                      marginRight: "1%",
                    }}
                  >
                    Ends
                  </MDTypography>
                  <MDTypography
                    variant="h6"
                    color="dark"
                    textAlign="center"
                    style={{
                      border: "1px solid rgba(0,0,0,0.2)",
                      padding: "2%",
                      borderRadius: "7px",
                      marginRight: "1%",
                    }}
                  >
                    {state.days || "0"} d
                  </MDTypography>
                  <MDTypography
                    variant="h6"
                    color="dark"
                    textAlign="center"
                    style={{
                      border: "1px solid rgba(0,0,0,0.2)",
                      padding: "2%",
                      borderRadius: "7px",
                      marginRight: "1%",
                    }}
                  >
                    {state.hours || "00"} h
                  </MDTypography>
                  <MDTypography
                    variant="h6"
                    color="dark"
                    textAlign="center"
                    style={{
                      border: "1px solid rgba(0,0,0,0.2)",
                      padding: "2%",
                      borderRadius: "7px",
                      marginRight: "1%",
                    }}
                  >
                    {state.minutes || "00"} m
                  </MDTypography>
                  <MDTypography
                    variant="h6"
                    color="dark"
                    textAlign="center"
                    style={{
                      border: "1px solid rgba(0,0,0,0.2)",
                      padding: "2%",
                      borderRadius: "7px",
                      marginRight: "1%",
                    }}
                  >
                    {state.seconds || "00"} s
                  </MDTypography>
                </MDBox>
                <MDTypography variant="h6" color="success" textAlign="left" py={3}>
                  You can send BNB to the presale address (if transaction fails increase gas limit
                  to 200K-1M) or use a button below Make sure that you use Binance Smart Chain (BSC)
                  Testnet <br />
                  Make sure that you use Binance Smart Chain (BSC) Testnet
                </MDTypography>

                <Progress percent={50} status="active" />
                <MDTypography variant="h6" color="dark" textAlign="center">
                  2/10 BNB
                </MDTypography>
                <Grid container spacing={1} py={1} px={1}>
                  <Grid item xs={12} xl={6} md={6} mt={3} style={{ justifyContent: "center" }}>
                    <MDBox
                      style={{ width: "100%" }}
                      coloredShadow="light"
                      borderRadius="10px"
                      p={3}
                      bgColor="white"
                    >
                      <MDTypography
                        variant="h6"
                        color="dark"
                        textAlign="left"
                        style={{ width: "100%", display: "flex" }}
                      >
                        Start :
                        <MDTypography variant="h6" color="dark" textAlign="left">
                          2022 00:20:00
                        </MDTypography>
                      </MDTypography>
                      <MDTypography
                        variant="h6"
                        color="dark"
                        textAlign="left"
                        style={{ width: "100%", display: "flex" }}
                      >
                        Min :
                        <MDTypography variant="h6" color="dark" textAlign="left">
                          1 BNB
                        </MDTypography>
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} xl={6} md={6} mt={3} style={{ justifyContent: "center" }}>
                    <MDBox
                      style={{ width: "100%" }}
                      coloredShadow="light"
                      borderRadius="10px"
                      p={3}
                      bgColor="white"
                    >
                      <MDTypography
                        variant="h6"
                        color="dark"
                        textAlign="left"
                        style={{ width: "100%", display: "flex" }}
                      >
                        End :
                        <MDTypography variant="h6" color="dark" textAlign="left">
                          2022 00:20:00
                        </MDTypography>
                      </MDTypography>
                      <MDTypography
                        variant="h6"
                        color="dark"
                        textAlign="left"
                        style={{ width: "100%", display: "flex" }}
                      >
                        Max :
                        <MDTypography variant="h6" color="dark" textAlign="left">
                          10 BNB
                        </MDTypography>
                      </MDTypography>
                    </MDBox>
                  </Grid>
                </Grid>
                <Grid container spacing={1} py={1} px={1}>
                  <Grid item xs={12} xl={6} md={6} mt={3} style={{ justifyContent: "center" }}>
                    <TextField
                      style={{ width: "100%" }}
                      id="tokenAddress"
                      label="Amount BNB"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} xl={6} md={6} mt={3} style={{ justifyContent: "center" }}>
                    <MDButton color="error" style={{ width: "100%" }}>
                      <MDTypography
                        variant="h6"
                        color="white"
                        textAlign="center"
                        style={{ width: "100%" }}
                      >
                        Invest
                      </MDTypography>
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
            <Grid item xs={12} xl={4} md={4} mt={3}>
              <MDBox
                style={{ width: "100%" }}
                coloredShadow="light"
                borderRadius="10px"
                p={3}
                bgColor="error"
              >
                <MDTypography variant="h4" color="light" textAlign="center">
                  Please connect wallet on Binance Smart Chain (BSC) Testnet
                </MDTypography>
              </MDBox>
            </Grid>
          </Grid>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default PreSaleView;
