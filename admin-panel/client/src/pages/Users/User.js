import React, {useState, useEffect} from "react";
import {Header, Loading} from "../../components";
import {Table, Modal, Menu, Dropdown } from "antd";
import {CheckOutlined, CloseOutlined, EditOutlined, SettingOutlined} from '@ant-design/icons';
import moment from 'moment';
import UserEditForm from './UserEditForm';
import {getUsers} from "../../services/userService";

const Users = () => {
   const [data, setData] = useState(null);
   const [editRecord, setEditRecord] = useState(null);
   const [isModalVisible, setIsModalVisible] = useState(false);

   const handleEdit = (record) => {
      setEditRecord(record);
      setIsModalVisible(true);
   };

   const handleCancel = () => {
      setIsModalVisible(false);
   };

   const renderActionMenu = (record) => (
      <Menu>
         <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
         </Menu.Item>
      </Menu>
   );


   const columns = [
      {
         title: 'Action',
         dataIndex: 'operation',
         render: (_, record) => (
            <Dropdown overlay={renderActionMenu(record)} trigger={['click']}>
               <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                  <SettingOutlined />
               </a>
            </Dropdown>
         ),
      },
      {
         title: 'Wallet Number',
         dataIndex: 'walletNumber',
         key: 'walletNumber',
         sorter: (a, b) => a - b
      },
      {
         title: 'Registration Date',
         dataIndex: 'createdAt',
         key: 'createdAt',
         sorter: (a, b) => a - b,
         render: (createdAt) => moment(createdAt).format('DD/MM/YYYY HH:mm'),
      },
      {
         title: 'Blocked Status',
         dataIndex: 'isBlocked',
         key: 'isBlocked',
         sorter: (a, b) => a - b,
         render: (isBlocked) =>
            isBlocked === true ? <CheckOutlined style={{color: 'green'}}/> : <CloseOutlined style={{color: 'red'}}/>,
      },
   ];

   useEffect(() => {
      getUsers().then(res => {
         setData(res.data)
      });
   }, [data]);

   if (!data) return <Loading/>;

   return (
      <div className="md:m-3 md:p-2 bg-white rounded-3xl">
         <Header title="Users"/>
         <Table dataSource={data || []} columns={columns} rowKey={(record) => record._id} />
         <Modal
            title="Edit User"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
         >
            {editRecord && (
               <UserEditForm record={editRecord}/>
            )}
         </Modal>
      </div>
   );
};

export default Users;
