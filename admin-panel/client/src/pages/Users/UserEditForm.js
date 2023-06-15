import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { Page, Search, Toolbar, Edit } from "@syncfusion/ej2-react-grids";

const UserEditForm = ({ isOpen, employeeData, onSave, onCancel }) => {
  const handleSave = (args) => {
    onSave(args);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={`edit-form ${isOpen ? "open" : ""}`}>
      <h2>Edit Employee</h2>
      <GridComponent
        dataSource={[employeeData]}
        allowPaging
        allowSorting
        editSettings={{
          allowEditing: true,
          allowAdding: true,
          allowDeleting: true,
        }}
        toolbar={["Update", "Cancel"]}
        actionBegin={handleSave}
        actionComplete={handleCancel}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="id"
            headerText="ID"
            isPrimaryKey={true}
            textAlign="Right"
            width="90"
          />
          <ColumnDirective field="name" headerText="Name" width="120" />
          <ColumnDirective
            field="designation"
            headerText="Designation"
            width="150"
          />
          <ColumnDirective
            field="salary"
            headerText="Salary"
            textAlign="Right"
            width="100"
          />
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, Edit]} />
      </GridComponent>
    </div>
  );
};

export default UserEditForm;
