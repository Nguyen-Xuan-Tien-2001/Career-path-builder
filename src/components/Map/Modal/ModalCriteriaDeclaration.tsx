import React, { memo, useEffect, useState } from "react";
import { Button, Input, InputNumber, Modal, Table } from "antd";
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
    criteriaid: number;
    nodeid: number;
}

function ModalCriteriaDeclaration(param: any) {
    const tabNode = param.tabNode;
    const open = param.open;
    const setOpen = param.setOpen;
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const { getCriteriaByCapacityResponse } = GetCriteriaByCapacityId();
    const { addCriteriaToLevelResponse, callAddCriteriaToLevelRefetch } =
        AddCriteriaToLevelService();

    const data: DataType[] = [];
    const [dataTable, setDataTable] = useState(data);

    useEffect(() => {
        if (getCriteriaByCapacityResponse) {
            getCriteriaByCapacityResponse.data?.map((val: any, i: any) => {
                data.push({
                    key: i,
                    id: val.id,
                    criterianame: val.criterianame,
                    point: val.point,
                    unit: val.unit,
                    coefficien: val.coefficien,
                    criteriaid: val.criteriaid,
                    nodeid: +tabNode.id,
                });
            });
            setDataTable(data);
        }
    }, [getCriteriaByCapacityResponse, tabNode.id]);

    useEffect(() => {
        if (addCriteriaToLevelResponse) {
            if (addCriteriaToLevelResponse.status === "success") {
                param.success(addCriteriaToLevelResponse.message);
                param.setTabNode(0);
                setOpen(false);
                setSelectedRowKeys([]);
            }
        }
    }, [addCriteriaToLevelResponse]);

    const [inputPoint, setInputPoint] = useState<boolean>(false);
    const [inputCoefficien, setInputCoefficien] = useState<boolean>(false);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleOnchangeCoefficien = (
        e: any,
        criteriaid: number,
        index: number
    ) => {
        if (e < 0 || e > 10) {
            setInputCoefficien(true);
        } else {
            setInputCoefficien(false);
            dataTable[index].coefficien = e;
            dataTable[index].id = criteriaid;
        }
    };
    const handleOnchangePoint = (e: any, criteriaid: number, index: number) => {
        if (e < 0 || e > 10) {
            setInputPoint(true);
        } else {
            setInputPoint(false);
            dataTable[index].point = e;
            dataTable[index].id = criteriaid;
        }
    };

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
            title: "Tên tiêu chí",
            dataIndex: "criterianame",
            key: "criterianame",
        },
        {
            title: "Điểm kỳ vọng",
            dataIndex: "point",
            key: "point",
            render: (id: any, record: any, index: any) => {
                return (
                    <InputNumber
                        status={inputPoint ? "error" : ""}
                        onChange={(e) =>
                            handleOnchangePoint(e, record.criteriaid, index)
                        }
                        disabled={
                            selectedRowKeys.find((val: any) => {
                                return val === record.key;
                            }) === undefined
                                ? true
                                : false
                        }
                        defaultValue={0}
                        name="point"
                        type="number"
                        placeholder="Nhập điểm"
                    />
                );
            },
        },
        {
            title: "Hệ số",
            dataIndex: "coefficien",
            key: "coefficien",
            render: (value: any, record: any, index: any) => {
                return (
                    <InputNumber
                        status={inputCoefficien ? "error" : ""}
                        onChange={(e) =>
                            handleOnchangeCoefficien(
                                e,
                                record.criteriaid,
                                index
                            )
                        }
                        disabled={
                            selectedRowKeys.find((val: any) => {
                                return val === record.key;
                            }) === undefined
                                ? true
                                : false
                        }
                        defaultValue={0}
                        name="coefficien"
                        type="number"
                        placeholder="Nhập hệ số"
                    />
                );
            },
        },
        {
            title: "Đơn vị tính",
            dataIndex: "unit",
            key: "unit",
        },
    ];

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        if (inputCoefficien && inputPoint) {
            param.error("Nhập giá trị trong khoảng từ 0 đến 10");
        } else {
            let tempInput = selectedRowKeys.map((value: any) => {
                return dataTable[value];
            });
            callAddCriteriaToLevelRefetch(tempInput);
        }
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setSelectedRowKeys([]);
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
                    newSelectedRowKeys = changeableRowKeys.filter(
                        (_, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        }
                    );
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: "even",
                text: "Select Even Row",
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter(
                        (_, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        }
                    );
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
                width={"800px"}
            >
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataTable}
                    pagination={false}
                />
            </Modal>
        </>
    );
}

export default memo(ModalCriteriaDeclaration);
