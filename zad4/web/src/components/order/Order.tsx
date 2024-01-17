import React from 'react';
import Table from '../table/Table';

function Order({ orders }) {
  const headerRow = ['Order ID', 'User Name', 'Email', 'Phone Number', 'Order Status', 'Approval Date', 'Products'];
  const columnSizes = [1, 2, 2, 2, 2, 2, 4];

  const formatProducts = (products) => {
    return products.map((product) => `${product.quantity} x ${product.product.name}`).join(', ');
  };

  const getOrderDataToView = (order) => {
    return [
      order.id,
      order.userName,
      order.email,
      order.phoneNumber,
      order.orderStatus,
      order.approvalDate,
      formatProducts(order.products),
    ];
  };

  const rows = orders.map((order) => getOrderDataToView(order));

  return (
    <div>
      <h2>Orders</h2>
      {orders.length > 0 ? (
        <Table headerRow={headerRow} columnSizes={columnSizes} rows={rows} />
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
}

export default Order;