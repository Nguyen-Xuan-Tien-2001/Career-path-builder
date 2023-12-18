import React, { memo, useState } from "react";
import { Button, Modal, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";

import { GetCriteriaByCapacityId } from "../../../ApiServices/MapApi/GetCriteriaByCapacity";
import { AddCriteriaToLevelService } from "../../../ApiServices/MapApi/AddCriteriaToLevel";

interface DataType {
  key: React.Key;
  id: number;
  criterianame: string;
  point: number;
  unit: string;
  coefficien: number;
}

const columns: ColumnsType<DataType> = [
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

function ModalCriteriaDeclaration(param: any) {
  const tabNode = param.tabNode;
  const open = param.open;
  const setOpen = param.setOpen;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { getCriteriaByCapacityResponse } = GetCriteriaByCapacityId();
  const {
    addCriteriaToLevelResponse,
    addCriteriaToLevelIsLoading,
    addCriteriaToLevelError,
    callAddCriteriaToLevelRefetch,
  } = AddCriteriaToLevelService();

  const data: DataType[] = [];
  getCriteriaByCapacityResponse?.data.map((val: any, i: any) => {
    data.push({
      key: i,
      id: val.id,
      criterianame: val.criterianame,
      point: val.point,
      unit: val.unit,
      coefficien: val.coefficien,
    });
  });

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  console.log(getCriteriaByCapacityResponse);

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    console.log(addCriteriaToLevelResponse);

    // callAddCriteriaToLevelRefetch(data);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
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
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Modal>
    </>
  );
}

export default memo(ModalCriteriaDeclaration);
