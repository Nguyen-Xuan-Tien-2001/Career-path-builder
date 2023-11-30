import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: number;
    criteria: string;
    point: number;
    comment: string;
}
function TableERI() {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Bản thân',
            dataIndex: 'criteria',
            key: 'criteria',
            render: (text) => <p style={{fontWeight: 600}}>{text}</p>,
            align: "center",
            width: 400
        },
        {
            title: 'Mức điểm',
            dataIndex: 'point',
            key: 'pont',
            align: "center",
            width: 300
        },
        {
            title: 'Nhận xét',
            dataIndex: 'comment',
            key: 'comment',
        },
    ];

    const data: DataType[] = [
        {
            key: 1,
            criteria: "Engagement Level",
            point: 2,
            comment: "",
        },
        {
            key: 2,
            criteria: "Algorithm/ Architecture level",
            point: 3,
            comment: "",
        },
        {
            key: 3,
            criteria: "Making product level",
            point: 2,
            comment: "",
        },
        {
            key: 4,
            criteria: "Operation Responsibility level",
            point: 0,
            comment: "",
        },
        {
            key: 5,
            criteria: "Improvement level",
            point: 0,
            comment: "",
        },
        {
            key: 6,
            criteria: "Project",
            point: 3,
            comment: "",
        },
    ];
    return (
        <>
            <Table pagination={false} columns={columns} dataSource={data} />
        </>
    )
}

export default TableERI;
