import React, { useState } from "react";
import { Header } from "../../components";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { employeesData, employeesGrid } from "../../data/dummy";
import UserEditFormModal from "./UserEditFormModal";
import UserEditForm from "./UserEditForm";

const Users = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);

  const handleEdit = (employeeData) => {
    setSelectedEmployeeData(employeeData);
    setIsModalOpen(true);
  };

  const handleSave = (args) => {
    // Düzenleme işlemini kaydetmek için yapılacak işlemler
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header title={"Users"} />
      <GridComponent
        dataSource={employeesData}
        allowPaging
        allowSorting
        width={"auto"}
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {employeesGrid.map((item, i) => (
            <ColumnDirective {...item} />
          ))}
          <ColumnDirective
            headerText="Edit"
            template={() => <button onClick={() => handleEdit()}>Edit</button>}
            allowFiltering={false}
            allowSorting={false}
          />
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
      <UserEditFormModal isOpen={isModalOpen} onClose={handleCancel}>
        <UserEditForm
          employeeData={selectedEmployeeData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </UserEditFormModal>
    </div>
  );
};

export default Users;
