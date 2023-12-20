import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";

import { GetCriteriaByLevelId } from "../../../ApiServices/MapApi/GetCriteriaByLevel";

const columns = [
  {
    title: "STT",
    key: "id",
    render: (id: any, record: any, index: any) => {
      ++index;
      return index;
    },
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

function ModalListCriteria(param: any) {
  const { getCriteriaByLevelResponse, getCriteriaByLevelRefetch } =
    GetCriteriaByLevelId(param.tabNode.id);

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    param.setOpenModalKhaibao(true);
    param.setOpen(false);
  };

  const handleClickKhaiBao = (e: React.MouseEvent<HTMLElement>) => {
    param.setOpen(false);
  };

  return (
    <>
      <Modal
        title={`Danh sách tiêu chí của ${param.tabNode?.data?.levelname}`}
        open={param.open}
        onOk={handleOk}
        onCancel={handleClickKhaiBao}
        keyboard={true}
        okText={"Khai báo bộ tiêu chí"}
        okButtonProps={{
          disabled: getCriteriaByLevelResponse?.data.length != 0,
        }}
      >
        <Table
          pagination={false}
          columns={columns}
          dataSource={getCriteriaByLevelResponse?.data}
        />
      </Modal>
    </>
  );
}

export default ModalListCriteria;
