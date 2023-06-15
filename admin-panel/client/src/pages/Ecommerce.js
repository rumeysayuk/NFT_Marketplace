import React from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { dropdownData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Ecommerce = () => {
  const { currentMode } = useStateContext();

  return (
    <div className="mt-24">
      <div className="flex gap-10 m-4 flex-wrap justify-start">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-start items-start gap-2">
            {/* <p className="text-xl font-semibold">Recent Transactions</p> */}
            {/* <DropDown currentMode={currentMode} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
