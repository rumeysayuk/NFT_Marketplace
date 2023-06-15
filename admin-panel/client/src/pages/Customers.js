import React from 'react';
import {Header} from "../components";
import {
   GridComponent, ColumnsDirective, ColumnDirective,
   Page, Inject, Toolbar, Edit, Selection, Sort, Filter
} from "@syncfusion/ej2-react-grids";
import {customersData, customersGrid} from "../data/dummy";

const Customers = () => {
   const selectionSettings = {persistSelection: true};
   const toolbarOptions = ['Delete', 'Search'];
   const editing = {allowDeleting: true, allowEditing: true};
   return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
         <Header category="Page" title="Customers"/>
         <GridComponent
            dataSource={customersData} enableHover={false} allowPaging
            pageSettings={{pageCount: 5}} selectionSettings={selectionSettings}
            toolbar={toolbarOptions} editSettings={editing} allowSorting>
            <ColumnsDirective>
               {customersGrid.map((item, i) => (<ColumnDirective key={i} {...item}/>))}
            </ColumnsDirective>
            <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
         </GridComponent>
      </div>
   )
}

export default Customers;