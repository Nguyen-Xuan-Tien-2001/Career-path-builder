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

function ModalListTieuChi(param: any) {
  const tabNode = param.tabNode;
  const open = param.open;
  const setOpen = param.setOpen;

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    param.setOpenModalKhaibao(true);
    setOpen(false);
  };

  const handleClickKhaiBao = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title={`Danh sách tiêu chí của ${tabNode?.data?.levelname}`}
        open={open}
        onOk={handleOk}
        onCancel={handleClickKhaiBao}
        keyboard={true}
        okText={"Khai báo bộ tiêu chí"}
      >
        <Table columns={columns} />
      </Modal>
    </>
  );
}

export default ModalListTieuChi;
