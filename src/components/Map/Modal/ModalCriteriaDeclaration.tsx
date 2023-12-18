import React, { useState } from "react";
import { Button, Modal, Table } from "antd";

const columns = [
  {
    title: "STT",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Têt tiêu chí",
    dataIndex: "criterianame",
    key: "criterianame",
  },
  {
    title: "Điểm kỳ vọng",
    dataIndex: "point",
    key: "point",
  },
  {
    title: "Hệ số",
    dataIndex: "coefficien",
    key: "coefficien",
  },
];

function ModalCriteriaDeclaration(param: any) {
  const tabNode = param.tabNode;
  const open = param.open;
  const setOpen = param.setOpen;

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  return (
    <>
      <Modal
        title={`Khai báo bộ tiêu chí của ${tabNode?.data?.levelname}`}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        keyboard={true}
      >
        <Table columns={columns} />
      </Modal>
    </>
  );
}

export default ModalCriteriaDeclaration;
