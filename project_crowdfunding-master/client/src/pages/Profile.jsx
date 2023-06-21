import React, { useState, useEffect } from "react";
import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <>
      <div className="address-container">
        <p className="wallet-address">This is your wallet addres : </p>
        <p className="neon-frame">{address}</p>
      </div>
      <DisplayCampaigns
        title="My Collections"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </>
  );
};

export default Profile;
