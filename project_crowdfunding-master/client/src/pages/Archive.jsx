import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";

const Archive = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    setIsLoading(false);
  };
  let arsivedCampaigns = [
    {
      amountCollected: "0.0",
      deadline: 1689292800000,
      description:
        "Once upon a time, there was an artist living in the city. This artist was searching for a way to explore the enchanting beauties of the digital world. One day, they came across the world of crypto art and discovered the magic of NFTs.",
      image:
        "https://anadoluefes.com.tr/Admin/images/ContentImage/nft-dijital-sanat.jpg",
      owner: "0xEB92668aAfEAc62C0809A57B669C1c308c67F603",
      pId: 8,
      target: "0.004",
      title: "Light Damn",
    },
  ];

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="All Archived Collecitons"
      isLoading={isLoading}
      campaigns={arsivedCampaigns}
      archivedData={true}
    />
  );
};

export default Archive;
