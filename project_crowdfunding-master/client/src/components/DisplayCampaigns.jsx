import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import FundCard from "./FundCard";
import { archive, loader } from "../assets";
import moment from "moment";

const DisplayCampaigns = ({ title, isLoading, campaigns, archivedData }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };
  const currentDate = new Date().getTime();
  const count = campaigns.filter((obj) => obj.deadline > currentDate).length;
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({count})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any collections yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns
            .filter((d) => moment(d.deadline).isAfter(moment()))
            .filter((d) => {
              return (
                (d.title || "")
                  .toLocaleLowerCase()
                  .includes(searchParams.get("search") || "") ||
                (d.description || "")
                  .toLocaleLowerCase()
                  .includes(searchParams.get("search") || "")
              );
            })
            .map((campaign) => (
              <FundCard
                key={campaign.pId}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
                archivedData={archivedData}
              />
            ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
