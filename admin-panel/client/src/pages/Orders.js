import React from 'react';
import {Header} from "../components";
import {
   GridComponent, Inject, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu,
   Filter, Page, ExcelExport, Edit, PdfExport
} from "@syncfusion/ej2-react-grids";
import {ordersData, ordersGrid, contextMenuItems} from "../data/dummy";

const Orders = () => {
   const editing = {allowDeleting: true, allowEditing: true};
   const toolbarOptions = ['Search', 'Delete'];
   return (
      <div className={"mt-2 md:m-10 p-2 md:p-10  bg-white rounded-3xl"}>
         <Header category={"Page"} title={"Orders"}/>
         <GridComponent id={"gridcomp"} dataSource={ordersData} allowPaging allowSorting allowExcelExport allowPdfExport
                        contextMenuItems={contextMenuItems} editSettings={editing} toolbar={toolbarOptions}>
            <ColumnsDirective>
               {ordersGrid.map((item, i) => (<ColumnDirective key={i} {...item}/>))}
            </ColumnsDirective>
            <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]}/>
         </GridComponent>
      </div>
   )
}

export default Orders;