import React, {useState} from 'react';
import {Button, Form, Input, Select, notification} from 'antd';
import {updateUser} from "../../services/userService";

const UserEditForm = ({record}) => {
   const [selectedStatus, setSelectedStatus] = useState(record.isBlocked ? 'Blocked' : 'Unblocked');

   const onFinish = async (values) => {
      try {
         const updatedUserData = {
            walletNumber: values.walletNumber,
            isBlocked: values.isBlocked,
         };
         await updateUser(record._id, updatedUserData);
         notification.success({
            message: 'Success',
            description: 'This operation was successful',
         }, {duration: "3seconds"});
      } catch (error) {
         console.error('Error updating user:', error);
      }
   };

   const onFinishFailed = (errorInfo) => {
      notification.error({
         message: 'Error',
         description: "This operation wasn't successful",
      }, {duration: "3seconds"});
      console.log('Failed:', errorInfo);
   };

   const handleStatusChange = (value) => {
      setSelectedStatus(value);
   };
   return (
      <Form
         name="basic"
         labelCol={{span: 6}}
         wrapperCol={{span: 24}}
         style={{maxWidth: 800, float: 'center'}}
         initialValues={{remember: true, walletNumber: record.walletNumber, isBlocked: selectedStatus === 'Blocked'}}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         autoComplete="off"
      >
         <Form.Item label="Wallet Number" name="walletNumber">
            <Input disabled/>
         </Form.Item>
         <Form.Item label="Block Status" name="isBlocked">
            <Select defaultValue={record.isBlocked ? "Blocked" : "Unblocked"} onChange={handleStatusChange}>
               <Select.Option value={true}>Blocked</Select.Option>
               <Select.Option value={false}>Unblocked</Select.Option>
            </Select>
         </Form.Item>
         <Form.Item wrapperCol={{offset: 12, span: 16}}>
            <Button type="primary" htmlType="submit">
               Save
            </Button>
         </Form.Item>
      </Form>
   );
};

export default UserEditForm;
