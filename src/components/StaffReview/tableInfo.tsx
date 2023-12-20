import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { GetCriteriaDetailByCriteriaID } from "./../../ApiServices/StaffReviewApi";

interface DataType {
    criteriaid: number;
    criterianame: string;
    description: string;
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    level5: string;
}
interface ICriteria {
    criteriaid: number;
    criterianame: string;
    unit: string;
    description: string;
    capacityid: number;
}

interface IProps {
    criteria?: ICriteria;
}

const TableInfo = (props: IProps) => {
    const [detail, setDetail] = useState<DataType>();

    useEffect(() => {
        async function fetchData() {
            const res = await GetCriteriaDetailByCriteriaID(
                props.criteria?.criteriaid || 0
            );
            setDetail({
                ...res?.data.data[0],
                description: props?.criteria?.description || "",
                criterianame: props?.criteria?.criterianame || "",
            });
        }
        fetchData();
    }, [props?.criteria]);

    const columns: ColumnsType<DataType> = [
        {
            title: "Năng lực",
            dataIndex: "criterianame",
            key: "criterianame",
            render: (text) => <p style={{ fontWeight: 600 }}>{text}</p>,
            align: "center",
            width: 50,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            align: "center",
            width: 150,
        },
        {
            title: "1-2",
            dataIndex: "level1",
            key: "level1",
            align: "center",
            width: 150,
        },
        {
            title: "3-4",
            dataIndex: "level2",
            key: "level2",
            align: "center",
            width: 150,
        },
        {
            title: "5-6",
            dataIndex: "level3",
            key: "level3",
            align: "center",
            width: 150,
        },
        {
            title: "7-8",
            dataIndex: "level4",
            key: "level4",
            align: "center",
            width: 150,
        },
        {
            title: "9-10",
            dataIndex: "level5",
            key: "level5",
            align: "center",
            width: 150,
        },
    ];

    const data: DataType[] = [
        {
            criteriaid: detail?.criteriaid || 0,
            criterianame: detail?.criterianame || "",
            description: detail?.description || "",
            level1: detail?.level1 || "",
            level2: detail?.level2 || "",
            level3: detail?.level3 || "",
            level4: detail?.level4 || "",
            level5: detail?.level5 || "",
        },
    ];
    return (
        <>
            <Table pagination={false} columns={columns} dataSource={data} />
        </>
    );
};

export default TableInfo;
