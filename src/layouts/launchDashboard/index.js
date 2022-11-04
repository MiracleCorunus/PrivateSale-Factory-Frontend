/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
//  Customize the DoodNftStaking CSS
import MDButton from "components/MDButton";

import { Modal, Input, Switch, Spin } from "antd";

import config from "config/config";
import STANDARDPRESALEABI from "../../assets/abi/STANDARDPRESALEABI.json";
import PRESALEFACTORYMANAGERABI from "../../assets/abi/PRESALEFACTORYMANAGERABI.json";

const ethers = require("ethers");

const { TextArea } = Input;
function LaunchDashboard() {
  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = Provider.getSigner();
  const { account } = useWeb3React();

  const [presaleArray, setPresaleArray] = useState([]);
  const [modalpresaleArray, setModalPresaleArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [linkCreateState, setLinkCreateState] = useState(false);
  // const [liveState, getLiveState] = useState();

  const presaleFactoryContract = new ethers.Contract(
    config.PresaleFactoryManager,
    PRESALEFACTORYMANAGERABI,
    Signer
  );

  const getPresaleData = async () => {
    setLoading(true);
    const array = [];
    await presaleFactoryContract.getAllPresales(account).then(async (data) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; i++) {
        const standardFactoryContract = new ethers.Contract(data[i], STANDARDPRESALEABI, Signer);
        // eslint-disable-next-line no-await-in-loop, camelcase
        const live_state = await standardFactoryContract.getIsLive();
        // eslint-disable-next-line no-await-in-loop, camelcase, no-underscore-dangle
        const start_Time = await standardFactoryContract._startTime();
        // eslint-disable-next-line no-underscore-dangle
        const period = await standardFactoryContract._period();
        // eslint-disable-next-line no-underscore-dangle, camelcase
        const token_price = await standardFactoryContract._tokenPrice();
        // eslint-disable-next-line no-underscore-dangle, camelcase
        const total_amount = await standardFactoryContract._totalMaxAmount();
        // eslint-disable-next-line no-underscore-dangle, camelcase
        const min_contribute_Amount = await standardFactoryContract._minInvestAmount();
        // eslint-disable-next-line no-underscore-dangle, camelcase
        const max_contribute_Amount = await standardFactoryContract._maxInvestAmount();
        array.push({
          contractAddress: data[i],
          liveState: live_state,
          // eslint-disable-next-line camelcase
          startTime: Date(start_Time * 1000).toString(),
          // eslint-disable-next-line camelcase
          endTime: Date((start_Time + period) * 1000).toString(),
          tokenPrice: Number(token_price),
          totalAmount: Number(total_amount),
          minContriAmount: Number(min_contribute_Amount),
          maxContriAmount: Number(max_contribute_Amount),
        });
      }
    });
    setPresaleArray(array);
    setLoading(false);
  };

  const publishInfo = async () => {
    setPublishLoading(true);
    const logoLink = document.getElementById("logoLink").value;
    const websiteLink = document.getElementById("websiteLink").value;
    const telegramLink = document.getElementById("telegramLink").value;
    const twitterLink = document.getElementById("twitterLink").value;
    const facebookLink = document.getElementById("facebookLink").value;
    const otherLink = document.getElementById("otherLink").value;
    const description = document.getElementById("description").value;
    const presaleContract = new ethers.Contract(
      modalpresaleArray.contractAddress,
      STANDARDPRESALEABI,
      Signer
    );

    await presaleContract
      .setInformation(
        logoLink,
        websiteLink,
        telegramLink,
        twitterLink,
        facebookLink,
        otherLink,
        description
      )
      .then(() => {
        setPublishLoading(false);
        // eslint-disable-next-line no-use-before-define
        setIsSuccessModalOpen(true);
        setLinkCreateState(true);
      });
  };

  useEffect(async () => {
    account && (await getPresaleData());
  }, [account]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSuccessCancel = () => {
    setIsSuccessModalOpen(false);
  };

  const showModal = (index) => {
    setModalPresaleArray(presaleArray[index]);
    setIsModalOpen(true);
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
              My sale contracts
            </MDTypography>
          </MDBox>
          {account ? (
            <>
              {loading ? (
                <Spin style={{ margin: "4%" }} />
              ) : (
                <Grid container spacing={1} py={1} px={1}>
                  {presaleArray.map((presale, index) => (
                    <Grid
                      item
                      xs={12}
                      xl={6}
                      md={6}
                      mt={3}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <MDBox coloredShadow="light" borderRadius="8px">
                        <MDButton
                          mx={2}
                          px={2}
                          color="white"
                          onClick={() => showModal(index)}
                          style={{ display: "flex", width: "100%", justifyContent: "start" }}
                        >
                          <MDTypography
                            variant="h6"
                            color="dark"
                            textAlign="center"
                            style={{ width: "100%" }}
                          >
                            <Switch
                              checkedChildren="Live"
                              unCheckedChildren="End"
                              defaultChecked={!presale.liveState}
                            />{" "}
                            {presale.contractAddress}
                          </MDTypography>
                          <MDTypography
                            variant="h6"
                            color="dark"
                            textAlign="center"
                            style={{ width: "100%" }}
                          >
                            {presale.startTime}
                            <br />
                          </MDTypography>
                        </MDButton>
                      </MDBox>
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          ) : (
            <MDTypography variant="h6" color="dark" textAlign="center" style={{ width: "100%" }}>
              Please Connect Wallet
              <br />
            </MDTypography>
          )}
        </Card>
      </MDBox>
      <Modal
        closable={false}
        open={isModalOpen}
        width={800}
        footer={[<MDButton onClick={handleCancel}>Cancel</MDButton>]}
        className="launchdasboardModal"
      >
        <MDTypography variant="h4" color="dark" textAlign="left" style={{ width: "80%" }} pb={1}>
          Presale
        </MDTypography>
        <MDTypography
          variant="h7"
          fontWeight="bold"
          color="info"
          textAlign="left"
          style={{ width: "100%", display: "flex" }}
        >
          Presale Address :
          <MDTypography variant="h7" color="dark" textAlign="left" px={1} fontWeight="regular">
            {modalpresaleArray.contractAddress}...
          </MDTypography>
        </MDTypography>

        <Grid container spacing={1} mt={3}>
          <Grid item xs={12} xl={6} md={6} mt={1} style={{ justifyContent: "center" }}>
            <MDTypography
              variant="h5"
              color="dark"
              textAlign="left"
              style={{ width: "100%" }}
              pb={1}
            >
              Presale Status
            </MDTypography>
            <MDTypography
              variant="h7"
              fontWeight="bold"
              color="info"
              textAlign="left"
              style={{ width: "100%", display: "flex" }}
            >
              Status :
              <MDTypography variant="h7" color="dark" textAlign="left" px={3} fontWeight="regular">
                {modalpresaleArray.liveState ? "Live" : "End"}
              </MDTypography>
            </MDTypography>
            <MDTypography variant="h5" color="dark" textAlign="left" fontWeight="bold" py={3}>
              PreSale Parameters
            </MDTypography>
            <MDTypography
              variant="h7"
              fontWeight="bold"
              color="info"
              pb={2}
              textAlign="left"
              style={{ width: "100%", display: "flex" }}
            >
              TokenPrice :
              <MDTypography variant="h7" color="dark" textAlign="left" px={3} fontWeight="regular">
                {modalpresaleArray.tokenPrice}
              </MDTypography>
            </MDTypography>
            <MDTypography
              variant="h7"
              fontWeight="bold"
              color="info"
              pb={2}
              textAlign="left"
              style={{ width: "100%", display: "flex" }}
            >
              TotalAmount :
              <MDTypography variant="h7" color="dark" textAlign="left" px={3} fontWeight="regular">
                {modalpresaleArray.totalAmount}
              </MDTypography>
            </MDTypography>
            <MDTypography
              variant="h7"
              fontWeight="bold"
              color="info"
              textAlign="left"
              style={{ width: "100%", display: "flex" }}
            >
              Min. / Max.Contribution :
              <MDTypography variant="h7" color="dark" textAlign="left" px={3} fontWeight="regular">
                {modalpresaleArray.minContriAmount} / {modalpresaleArray.maxContriAmount} BNB
              </MDTypography>
            </MDTypography>

            <MDTypography
              variant="h7"
              fontWeight="bold"
              color="info"
              pb={2}
              textAlign="left"
              style={{ width: "100%", display: "flex" }}
            >
              StartDate :
              <MDTypography variant="h7" color="dark" textAlign="left" px={3} fontWeight="regular">
                {modalpresaleArray.startTime}
              </MDTypography>
            </MDTypography>
            <MDTypography
              variant="h7"
              fontWeight="bold"
              color="info"
              textAlign="left"
              mb={4}
              style={{ width: "100%", display: "flex" }}
            >
              EndDate :
              <MDTypography variant="h7" color="dark" textAlign="left" px={3} fontWeight="regular">
                {modalpresaleArray.endTime}
              </MDTypography>
            </MDTypography>

            {linkCreateState && (
              <MDTypography variant="h7" color="white" textAlign="center" style={{ width: "100%" }}>
                <Link to={`${modalpresaleArray.contractAddress}`}>
                  https://localhost:3000/ {modalpresaleArray.contractAddress}
                </Link>
              </MDTypography>
            )}
          </Grid>
          <Grid item xs={12} xl={6} md={6} mt={1} style={{ justifyContent: "center" }}>
            <MDTypography
              variant="h4"
              color="dark"
              textAlign="left"
              style={{ width: "100%" }}
              pb={3}
            >
              Edit Description
            </MDTypography>
            <TextField
              style={{ width: "100%", marginBottom: "8%" }}
              id="logoLink"
              label="Logo IMG Link"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ width: "100%", marginBottom: "8%" }}
              id="websiteLink"
              placeholder="https://.."
              label="Website"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ width: "100%", marginBottom: "8%" }}
              id="telegramLink"
              placeholder="https://t.me/.."
              label="Telegram"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />{" "}
            <TextField
              style={{ width: "100%", marginBottom: "8%" }}
              id="twitterLink"
              placeholder="https://twitter/.."
              label="Twitter"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />{" "}
            <TextField
              style={{ width: "100%", marginBottom: "8%" }}
              id="facebookLink"
              placeholder="https://Facebook/.."
              label="Facebook"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />{" "}
            <TextField
              style={{ width: "100%", marginBottom: "8%" }}
              id="otherLink"
              label="OtherLink"
              placeholder="https://.."
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />{" "}
            <TextArea
              rows={4}
              id="description"
              style={{ borderRadius: "8px", marginBottom: "5%" }}
              placeholder="Description"
            />
            {!publishLoading ? (
              <MDButton color="info" onClick={() => publishInfo()}>
                <MDTypography
                  variant="h7"
                  color="white"
                  textAlign="center"
                  style={{ width: "100%" }}
                >
                  Publish
                </MDTypography>
              </MDButton>
            ) : (
              <MDButton color="info" disabled="true">
                <MDTypography
                  variant="h7"
                  color="white"
                  textAlign="center"
                  style={{ width: "100%" }}
                >
                  <Spin />
                </MDTypography>
              </MDButton>
            )}
          </Grid>
        </Grid>
      </Modal>
      <Modal
        style={{ zIndex: "999999" }}
        closable={false}
        open={isSuccessModalOpen}
        width={500}
        footer={[<MDButton onClick={handleSuccessCancel}>Ok</MDButton>]}
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

export default LaunchDashboard;
