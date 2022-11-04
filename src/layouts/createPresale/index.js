/* eslint-disable no-loss-of-precision */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from "react";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
//  Customize the DoodNftStaking CSS
import TextField from "@mui/material/TextField";
import { DatePicker, Checkbox, Modal, Spin } from "antd";

import config from "config/config";
import STANDARDPRESALEFACTORYABI from "../../assets/abi/STANDARDPRESALEFACTORYABI.json";

const ethers = require("ethers");

function CreatePresale() {
  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = Provider.getSigner();

  const StandardPresaleFactoryContract = new ethers.Contract(
    config.StandardPresaleFactory,
    STANDARDPRESALEFACTORYABI.abi,
    Signer
  );

  const [loading, setLoading] = useState(false);
  const [contributionState, setContributionState] = useState(true);
  const [dateState, setDateState] = useState(true);
  const [createState, setCreateState] = useState(true);
  const [dateValidation, setDateValidation] = useState(true);
  const [contributionValidation, setContributionValidation] = useState(true);

  const [tokenPrice, setTokenPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [minContributionAmount, setMinContributionAmount] = useState(0);
  const [maxContributionAmount, setMaxContributionAmount] = useState(0);
  const [startDateStamp, setStartDateStamp] = useState("");
  const [startDate, setStartDate] = useState(0);
  const [endDateStamp, setEndDateStamp] = useState("");
  const [endDate, setEndDate] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const showModal = () => {
    const token_Price = document.getElementById("tokenPrice").value;
    const total_Amount = document.getElementById("totalAmount").value;
    const min_contribute_Amount = document.getElementById("minContribution").value;
    const max_contribute_Amount = document.getElementById("maxContribution").value;
    const checkbox_contribute = document.getElementById("contrubutioncheckbox");

    if (checkbox_contribute.checked) {
      if (min_contribute_Amount === null) {
        setMinContributionAmount(0);
      } else if (max_contribute_Amount === null) {
        setMaxContributionAmount(
          115792089237316195423570985008687907853269984665640564039457584007913129639935
        );
      } else {
        setMinContributionAmount(min_contribute_Amount);
        setMaxContributionAmount(max_contribute_Amount);
      }
    } else {
      setMaxContributionAmount(
        115792089237316195423570985008687907853269984665640564039457584007913129639935
      );
      setMinContributionAmount(0);
    }

    setTokenPrice(token_Price);
    setTotalAmount(total_Amount);

    startDate > endDate && endDateStamp !== ""
      ? setDateValidation(false)
      : min_contribute_Amount > max_contribute_Amount
      ? setContributionValidation(false)
      : setIsModalOpen(true);
    startDate < endDate && endDate !== ""
      ? setDateValidation(true)
      : min_contribute_Amount < max_contribute_Amount
      ? setContributionValidation(true)
      : "";
  };

  // eslint-disable-next-line no-unused-vars
  const onChangeStartDate = (value, dateString) => {
    // eslint-disable-next-line radix
    const datum = parseInt((new Date(dateString).getTime() / 1000).toFixed(0));
    // eslint-disable-next-line no-const-assign
    const event = new Date(datum * 1000).toString();
    setStartDate(datum);
    setStartDateStamp(event);
  };

  const onChangeEndDate = (value, dateString) => {
    // eslint-disable-next-line radix
    const datum = parseInt((new Date(dateString).getTime() / 1000).toFixed(0));
    const event = new Date(datum * 1000).toString();

    setEndDate(datum);
    setEndDateStamp(event);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsSuccessModalOpen(false);
  };

  const settingContribution = (e) => {
    setContributionState(!e.target.checked);
  };

  const settingDate = (e) => {
    setDateState(!e.target.checked);
    if (!e.target.checked) {
      setEndDate(0);
      setEndDateStamp("");
    }
  };

  const createSaleState = () => {
    const token_Price = document.getElementById("tokenPrice").value;
    const total_Amount = document.getElementById("totalAmount").value;

    token_Price !== "" && total_Amount !== "" && token_Price > 0 && total_Amount > 0
      ? setCreateState(false)
      : setCreateState(true);
  };

  const confirmFunc = async () => {
    setLoading(true);
    if (minContributionAmount === "" && maxContributionAmount) {
      // eslint-disable-next-line no-const-assign
      minContributionAmount = 0;
      // eslint-disable-next-line no-const-assign
      maxContributionAmount = 0;
    }
    const isNative = true;
    // eslint-disable-next-line
    console.log(
      tokenPrice,
      totalAmount,
      minContributionAmount,
      maxContributionAmount,
      startDate,
      endDate,
      isNative
    );
    await StandardPresaleFactoryContract.create(
      ethers.BigNumber.from(tokenPrice * 1000000),
      ethers.BigNumber.from(totalAmount * 1000000),
      ethers.BigNumber.from(startDate),
      ethers.BigNumber.from(endDate - startDate),
      ethers.BigNumber.from(minContributionAmount),
      ethers.BigNumber.from(maxContributionAmount),
      isNative,
      {
        gasLimit: 3000000,
        value: ethers.utils.parseEther("0.01"),
      }
    ).then(() => {
      setLoading(false);
      setIsModalOpen(false);
      setIsSuccessModalOpen(true);
    });
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
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white" textAlign="center">
              Create LaunchPad
            </MDTypography>
          </MDBox>
          <Grid container spacing={1} py={5}>
            <Grid item xs={12} xl={8} md={8} mt={3} m={3} style={{ justifyContent: "center" }}>
              <TextField
                style={{ width: "100%", marginTop: "5%" }}
                id="tokenPrice"
                label="Token Price"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={createSaleState}
              />
              <TextField
                style={{ width: "100%", marginTop: "5%" }}
                id="totalAmount"
                label="Total Amount"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={createSaleState}
              />
              <Checkbox
                id="contrubutioncheckbox"
                style={{ marginTop: "3%" }}
                onChange={settingContribution}
              >
                <MDTypography variant="h7" textAlign="center" style={{ width: "100%" }}>
                  Setting Min & Max Contribution
                </MDTypography>
              </Checkbox>
              <Grid container spacing={1}>
                <Grid item xs={12} xl={6} md={6} mt={1} style={{ justifyContent: "center" }}>
                  <TextField
                    style={{ width: "100%", marginTop: "5%" }}
                    id="minContribution"
                    label="Min.Contribution (BNB)"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled={contributionState}
                  />
                </Grid>
                <Grid item xs={12} xl={6} md={6} mt={1} style={{ justifyContent: "center" }}>
                  <TextField
                    style={{ width: "100%", marginTop: "5%" }}
                    id="maxContribution"
                    label="Max.Contribution (BNB)"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled={contributionState}
                  />
                </Grid>
                {!contributionValidation && (
                  <MDTypography variant="h6" textAlign="left" color="error">
                    Please enter the correct date (Startdate, EndDate)
                  </MDTypography>
                )}
              </Grid>
              <Checkbox id="endtimecheckbox" style={{ marginTop: "3%" }} onChange={settingDate}>
                <MDTypography variant="h7" textAlign="center" style={{ width: "100%" }}>
                  Setting Date
                </MDTypography>
              </Checkbox>
              <Grid container spacing={1}>
                <Grid item xs={12} xl={6} md={6} mt={3} style={{ justifyContent: "center" }}>
                  <DatePicker
                    showTime
                    placeholder="Start Date"
                    id="startDate"
                    onChange={onChangeStartDate}
                    onOk={onOk}
                    style={{ width: "100%", padding: "10px", borderRadius: "7px" }}
                  />
                </Grid>
                <Grid item xs={12} xl={6} md={6} mt={3} style={{ justifyContent: "center" }}>
                  <DatePicker
                    showTime
                    placeholder="End Date"
                    onChange={onChangeEndDate}
                    onOk={onOk}
                    style={{ width: "100%", padding: "10px", borderRadius: "7px" }}
                    disabled={dateState}
                  />
                </Grid>
                {!dateValidation && (
                  <MDTypography variant="h6" textAlign="left" color="error">
                    Please enter the correct date (Startdate, EndDate)
                  </MDTypography>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              xl={3}
              md={3}
              mt={3}
              mx={3}
              style={{ width: "90%", justifyContent: "center" }}
            >
              <MDTypography variant="h2" textAlign="center" style={{ width: "100%" }}>
                Cost : 0.1BNB
              </MDTypography>

              <MDButton
                mx={2}
                px={2}
                color="info"
                style={{ width: "100%" }}
                disabled={createState}
                onClick={showModal}
              >
                <MDTypography
                  variant="h6"
                  color="white"
                  textAlign="center"
                  style={{ width: "100%" }}
                >
                  Create LaunchPad
                </MDTypography>
              </MDButton>
            </Grid>
          </Grid>
        </Card>
      </MDBox>
      <Modal
        style={{ zIndex: "999999" }}
        closable={false}
        open={isModalOpen}
        width={600}
        footer={[
          <>
            {loading ? (
              <>
                <MDButton color="info" disabled="true">
                  <Spin style={{ width: "60px" }} />
                </MDButton>
                <MDButton onClick={handleCancel}>Cancel</MDButton>
              </>
            ) : (
              <>
                <MDButton color="info" onClick={confirmFunc}>
                  Confirm
                </MDButton>
                <MDButton onClick={handleCancel}>Cancel</MDButton>
              </>
            )}
          </>,
        ]}
        className="createPresaleModal"
      >
        <MDTypography variant="h3" color="dark" textAlign="left" style={{ width: "100%" }} pb={2}>
          Create LaunchPad
        </MDTypography>
        <MDTypography
          variant="h7"
          color="info"
          textAlign="left"
          fontWeight="bold"
          style={{ width: "100%", display: "flex" }}
        >
          Token Amount :
          <MDTypography variant="h7" color="dark" textAlign="left" px={3} fontWeight="regular">
            {tokenPrice}
          </MDTypography>
        </MDTypography>
        <MDTypography
          variant="h7"
          color="info"
          textAlign="left"
          fontWeight="bold"
          style={{ width: "100%", display: "flex" }}
        >
          Total Supply :
          <MDTypography variant="h7" color="dark" textAlign="left" px={3} fontWeight="regular">
            {totalAmount}
          </MDTypography>
        </MDTypography>
        <MDTypography
          variant="h7"
          color="info"
          textAlign="left"
          style={{ width: "100%", display: "flex" }}
          fontWeight="bold"
        >
          Min.Contribution (BNB) :
          <MDTypography variant="h7" color="dark" textAlign="left" px={3} fontWeight="regular">
            {minContributionAmount}
          </MDTypography>
        </MDTypography>
        <MDTypography
          variant="h7"
          color="info"
          fontWeight="bold"
          textAlign="left"
          style={{ width: "100%", display: "flex" }}
        >
          Max.Contribution (BNB) :
          <MDTypography variant="h7" color="dark" textAlign="left" px={3} fontWeight="regular">
            {maxContributionAmount}
          </MDTypography>
        </MDTypography>
        <MDTypography
          variant="h7"
          color="info"
          fontWeight="bold"
          textAlign="left"
          style={{ width: "100%", display: "flex" }}
        >
          Start Date :
          <MDTypography variant="h7" color="dark" textAlign="left" px={3} fontWeight="regular">
            {startDateStamp}
          </MDTypography>
        </MDTypography>

        <MDTypography
          variant="h7"
          color="info"
          fontWeight="bold"
          textAlign="left"
          style={{ width: "100%", display: "flex" }}
        >
          End Date :
          <MDTypography variant="h7" color="dark" textAlign="left" px={3} fontWeight="regular">
            {endDateStamp}
          </MDTypography>
        </MDTypography>
      </Modal>

      <Modal
        style={{ zIndex: "999999" }}
        closable={false}
        open={isSuccessModalOpen}
        width={500}
        footer={[<MDButton onClick={handleCancel}>Ok</MDButton>]}
      >
        <MDTypography
          variant="h3"
          color="success"
          textAlign="center"
          style={{ width: "100%" }}
          pb={2}
        >
          Created Successful !
        </MDTypography>
      </Modal>
    </DashboardLayout>
  );
}

export default CreatePresale;
