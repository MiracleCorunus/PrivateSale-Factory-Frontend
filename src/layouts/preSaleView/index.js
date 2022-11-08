/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
import {
  TwitterCircleFilled,
  FacebookFilled,
  EllipsisOutlined,
  DribbbleCircleFilled,
} from "@ant-design/icons";
import { Progress, Switch, Spin, message, Skeleton } from "antd";
// eslint-disable-next-line no-unused-vars
import { useWeb3React } from "@web3-react/core";
import config from "config/config";
import STANDARDPRESALEABI from "../../assets/abi/STANDARDPRESALEABI.json";
import BUSDABI from "../../assets/abi/BUSDABI.json";

import noIMG from "../../assets/images/noIMG.png";

const ethers = require("ethers");

function PreSaleView() {
  const { account } = useWeb3React();
  const { contractAddress } = useParams();
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [loading, setLoading] = useState(false);
  const [liveState, setLiveState] = useState();

  const [getDataLoading, setGetDataLoading] = useState(true);

  const [presaleArray, setPresaleArray] = useState([]);

  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = Provider.getSigner();
  const standardFactoryContract = new ethers.Contract(contractAddress, STANDARDPRESALEABI, Signer);
  const BusdTokenContract = new ethers.Contract(config.BusdAddress, BUSDABI, Signer);

  const array = [];
  const getData = async () => {
    // eslint-disable-next-line no-underscore-dangle
    const start_Time = await standardFactoryContract._startTime();
    // eslint-disable-next-line no-underscore-dangle
    const period = await standardFactoryContract._period();
    // eslint-disable-next-line no-underscore-dangle
    const privateTitle = await standardFactoryContract._title();
    // eslint-disable-next-line no-underscore-dangle
    const token_owner = await standardFactoryContract._owner();
    // eslint-disable-next-line no-underscore-dangle
    const token_price = await standardFactoryContract._tokenPrice();
    // eslint-disable-next-line no-underscore-dangle
    const total_amount = await standardFactoryContract._totalMaxAmount();
    const remain_amount = await standardFactoryContract.getRemainingTokens();
    // eslint-disable-next-line no-underscore-dangle
    const min_contribute_Amount = await standardFactoryContract._minInvestAmount();
    // eslint-disable-next-line no-underscore-dangle
    const max_contribute_Amount = await standardFactoryContract._maxInvestAmount();

    const startDateEvent = new Date(Number(start_Time) * 1000).toString();
    // eslint-disable-next-line camelcase
    const endDateEvent = new Date(Number(start_Time) * 1000 + Number(period) * 1000).toString();
    // eslint-disable-next-line no-underscore-dangle
    const logo_url = await standardFactoryContract._logoUrl();
    // eslint-disable-next-line no-underscore-dangle
    const facebook_url = await standardFactoryContract._facebookUrl();
    // eslint-disable-next-line no-underscore-dangle
    const website_url = await standardFactoryContract._extraUrl();
    // eslint-disable-next-line no-underscore-dangle
    const twitter_url = await standardFactoryContract._twitterUrl();
    // eslint-disable-next-line no-underscore-dangle
    const other_url = await standardFactoryContract._maxInvestAmount();
    // eslint-disable-next-line no-underscore-dangle
    const is_Native = await standardFactoryContract._isNative();

    array.push({
      // eslint-disable-next-line camelcase
      startTime: startDateEvent,
      // eslint-disable-next-line camelcase
      title: privateTitle.toString(),
      endTime: endDateEvent,
      owner: token_owner.toString(),
      periods: Number(period),
      startTimeStamp: Number(start_Time),
      endTimeStamp: Number(start_Time) + Number(period),
      tokenPrice: Number(token_price) / 1000000,
      totalAmount: Number(total_amount) / 1000000,
      remainAmount: Number(remain_amount) / 1000000,
      minContriAmount: Number(ethers.utils.formatEther(min_contribute_Amount)),
      maxContriAmount: Number(ethers.utils.formatEther(max_contribute_Amount)),
      logoUrl: logo_url.toString(),
      websiteUrl: website_url.toString(),
      twitterUrl: twitter_url.toString(),
      facebookUrl: facebook_url.toString(),
      otherUrl: other_url.toString(),
      isNative: is_Native,
    });
    setPresaleArray(array[0]);
    setGetDataLoading(false);
  };

  const setNewTime = () => {
    const currentTime = new Date().getTime();
    if (array.length !== 0 && array[0].remainAmount !== 0) {
      if (currentTime < array[0].endTimeStamp * 1000) {
        let countDown;
        if (currentTime < Number(array[0].startTimeStamp * 1000)) {
          setLiveState(false);
          countDown = Number(array[0].startTimeStamp * 1000 + 10000);
        } else {
          // eslint-disable-next-line no-unused-vars
          countDown = Number(array[0].endTimeStamp * 1000 + 10000);
          setLiveState(true);
        }

        const distanceToDate = countDown - currentTime;
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
      } else {
        setState(0, 0, 0, 0);
        if (array[0].startTimeStamp === array[0].endTimeStamp) {
          // eslint-disable-next-line no-unused-expressions
          array[0].remainAmount === 0 ? setLiveState(false) : setLiveState(true);
        } else {
          setLiveState(false);
        }
      }
    } else {
      setState(0, 0, 0, 0);
      setLiveState(false);
    }
  };

  const investToken = async () => {
    setLoading(true);
    const tokenAmountValue = document.getElementById("investAmount").value;
    if (tokenAmountValue > presaleArray.totalAmount) {
      message.error("Please enter the correct value (value < Max.Contribution)");
    } else {
      presaleArray.isNative
        ? standardFactoryContract
            .investWithNativeToken({
              value: ethers.utils.parseEther(tokenAmountValue.toString()),
            })
            .then((tx) => {
              tx.wait().then(() => {
                setLoading(false);
                message.success("Invested Successful");
                window.location.reload();
              });
            })
        : BusdTokenContract.approve(
            contractAddress,
            ethers.utils.parseEther(tokenAmountValue.toString())
          ).then((tx) => {
            tx.wait().then(() => {
              standardFactoryContract
                .investWithToken(ethers.utils.parseEther(tokenAmountValue.toString()), {})
                .then((tx2) => {
                  tx2.wait().then(() => {
                    setLoading(false);
                    message.success("Invested Successful");
                    window.location.reload();
                  });
                });
            });
          });
    }
  };

  useEffect(async () => {
    account && getData();
  }, [account]);

  useEffect(() => {
    account && setInterval(() => setNewTime(), 1000);
  }, [account]);

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
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white" textAlign="center">
              PrivateSale
            </MDTypography>
          </MDBox>
          <Grid container spacing={1} py={5} px={3}>
            <Grid
              item
              xs={12}
              xl={4}
              md={4}
              mt={3}
              style={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              {getDataLoading ? (
                <Skeleton.Avatar
                  active="true"
                  style={{ width: "250px", height: "250px", borderRadius: "10%" }}
                />
              ) : (
                <img
                  alt="example"
                  src={presaleArray.logoUrl === "" ? noIMG : presaleArray.logoUrl}
                  style={{ width: "70%", borderRadius: "10%", objectPosition: "cover" }}
                />
              )}
            </Grid>
            <Grid item xs={12} xl={8} md={8} mt={3}>
              <MDBox style={{ width: "100%" }} coloredShadow="light" borderRadius="10px" p={3}>
                <MDTypography variant="h4" color="dark" textAlign="left">
                  PrivateSale Title : {presaleArray.title}
                </MDTypography>
                <MDTypography variant="h4" color="dark" textAlign="left" py={3}>
                  {contractAddress}
                </MDTypography>
                <MDTypography variant="h6" color="dark" textAlign="left" py={1}>
                  1 {presaleArray.isNative ? "BNB" : "BUSD"} ={" "}
                  {presaleArray && presaleArray.tokenPrice} Token(s)
                </MDTypography>
                <MDTypography variant="h6" color="success" textAlign="left" py={1}>
                  <MDButton color="info" mt={3}>
                    Verified
                  </MDButton>{" "}
                </MDTypography>
                <MDBox style={{ width: "100%", display: "flex" }} borderRadius="10px" pt={1}>
                  <a
                    href={presaleArray.websiteUrl}
                    style={{ marginRight: "1%" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    <DribbbleCircleFilled style={{ fontSize: "25px" }} />
                  </a>
                  <a
                    href={
                      presaleArray.twitterUrl === ""
                        ? `https://twitter.com`
                        : presaleArray.twitterUrl
                    }
                    style={{ marginRight: "1%" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    <TwitterCircleFilled style={{ fontSize: "25px" }} />
                  </a>
                  <a
                    href={presaleArray.facebookUrl}
                    style={{ marginRight: "1%" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    <FacebookFilled style={{ fontSize: "25px" }} />{" "}
                  </a>
                  <a
                    href={presaleArray.otherUrl}
                    style={{ marginRight: "1%" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    <EllipsisOutlined style={{ fontSize: "25px" }} />{" "}
                  </a>
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={1} py={5} px={3}>
            <Grid item xs={12} xl={8} md={8} mt={3} style={{ justifyContent: "center" }}>
              <MDBox style={{ width: "100%" }} coloredShadow="light" borderRadius="10px" p={3}>
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
                    <Switch checkedChildren="On" unCheckedChildren="Off" checked={liveState} />
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
                  You can send {presaleArray.isNative ? "BNB" : "BUSD"} to the PrivateSale address
                  (if transaction fails increase gas limit to 200K-1M) or use a button below Make
                  sure that you use Binance Smart Chain (BSC) Testnet <br />
                  Make sure that you use Binance Smart Chain (BSC) Testnet
                </MDTypography>
                {getDataLoading ? (
                  <Skeleton.Input active="true" block="true" />
                ) : (
                  <>
                    <Progress
                      percent={parseFloat(
                        ((presaleArray.totalAmount - presaleArray.remainAmount) /
                          presaleArray.totalAmount) *
                          100
                      ).toFixed(4)}
                      status="active"
                      style={{ padding: "30px" }}
                    />
                    <MDTypography variant="h6" color="dark" textAlign="center">
                      {presaleArray.totalAmount - presaleArray.remainAmount}/
                      {presaleArray.totalAmount} Token(s)
                    </MDTypography>
                  </>
                )}

                <Grid container spacing={1} py={1} px={1}>
                  <Grid item xs={12} xl={6} md={6} mt={3} style={{ justifyContent: "center" }}>
                    <MDBox
                      style={{ width: "100%" }}
                      coloredShadow="light"
                      borderRadius="10px"
                      p={3}
                      bgColor="white"
                    >
                      {getDataLoading ? (
                        <>
                          <Skeleton.Input active="true" block="true" />
                          <Skeleton.Input active="true" />
                        </>
                      ) : (
                        <>
                          <MDTypography
                            variant="h6"
                            color="dark"
                            textAlign="left"
                            style={{ width: "100%", display: "flex" }}
                          >
                            Start : {presaleArray.startTime}
                          </MDTypography>
                          <MDTypography
                            variant="h6"
                            color="dark"
                            textAlign="left"
                            style={{ width: "100%", display: "flex" }}
                          >
                            Min : {presaleArray.minContriAmount}{" "}
                            {presaleArray.isNative ? "BNB" : "BUSD"}
                          </MDTypography>
                        </>
                      )}
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
                      {getDataLoading ? (
                        <>
                          <Skeleton.Input active="true" block="true" />
                          <Skeleton.Input active="true" />
                        </>
                      ) : (
                        <>
                          <MDTypography
                            variant="h6"
                            color="dark"
                            textAlign="left"
                            style={{ width: "100%", display: "flex" }}
                          >
                            End :{" "}
                            {presaleArray.endTime === presaleArray.startTime
                              ? "No Limit"
                              : presaleArray.endTime}
                          </MDTypography>
                          <MDTypography
                            variant="h6"
                            color="dark"
                            textAlign="left"
                            style={{ width: "100%", display: "flex" }}
                          >
                            Max : {presaleArray.maxContriAmount}{" "}
                            {presaleArray.isNative ? "BNB" : "BUSD"}
                          </MDTypography>
                        </>
                      )}
                    </MDBox>
                  </Grid>
                </Grid>
                <Grid container spacing={1} py={1} px={1}>
                  <Grid item xs={12} xl={6} md={6} mt={3} style={{ justifyContent: "center" }}>
                    <TextField
                      style={{ width: "100%" }}
                      id="investAmount"
                      label="Invest Amount"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} xl={6} md={6} mt={3} style={{ justifyContent: "center" }}>
                    <MDButton
                      color="info"
                      style={{ width: "100%" }}
                      onClick={() => investToken()}
                      disabled={!liveState}
                    >
                      <MDTypography
                        variant="h6"
                        color="white"
                        textAlign="center"
                        style={{ width: "100%" }}
                      >
                        {!loading ? "Invest" : <Spin />}
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
                bgColor="info"
              >
                <MDTypography variant="h4" color="light" textAlign="center">
                  My Tokens
                </MDTypography>
                {getDataLoading ? (
                  <Skeleton.Input active="true" block="true" />
                ) : (
                  <MDTypography variant="h6" color="light" textAlign="left">
                    Invested:{" "}
                    {parseFloat(presaleArray.totalAmount - presaleArray.remainAmount).toFixed(2)}{" "}
                    Token(s) ={" "}
                    {parseFloat(
                      (presaleArray.totalAmount - presaleArray.remainAmount) /
                        presaleArray.tokenPrice
                    ).toFixed(2)}
                    {presaleArray.isNative ? "BNB" : "BUSD"}
                  </MDTypography>
                )}
              </MDBox>
            </Grid>
          </Grid>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default PreSaleView;
