import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    criteria: string;
    description: string;
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    level5: string;
}

function TableInfo() {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Năng lực',
            dataIndex: 'criteria',
            key: 'criteria',
            render: (text) => <p style={{ fontWeight: 600 }}>{text}</p>,
            align: "center",
            width: 50
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            align: "center",
            width: 150
        },
        {
            title: '1-2',
            dataIndex: 'level1',
            key: 'level1',
            align: "center",
            width: 150
        },
        {
            title: '3-4',
            dataIndex: 'level2',
            key: 'level2',
            align: "center",
            width: 150
        },
        {
            title: '5-6',
            dataIndex: 'level3',
            key: 'level3',
            align: "center",
            width: 150
        },
        {
            title: '7-8',
            dataIndex: 'level4',
            key: 'level4',
            align: "center",
            width: 150
        },
        {
            title: '9-10',
            dataIndex: 'level5',
            key: 'level5',
            align: "center",
            width: 150
        },
    ];

    const data: DataType[] = [
        {
            criteria: 'Engagement Level',
            description: 'Khả năng chủ động, trách nhiệm trong việc đeo bám, phối hợp, tìm tòi, xử lý sự cố để tạo ra kết quả cuối cùng: Sản phẩm. Khả năng chủ động, trách nhiệm trong việc quan sát, lắng nghe - phân tích - xử lý - ghi nhận để tạo ra kết quả cuối cùng: Sản phẩm',
            level1: 'Lắng nghe ,Ghi chú, Nắm bắt đầy đủ nhu cầu, Mong đợi khách hàng',
            level2: 'Phân tích như cầu của khách, Đặt câu hỏi, Phân tích thực trạng nguồn lực của khách hàng, Biết vấn đề khách hàng gặp phải, Có lộ trình cho khách hàng, Nắm bắt được những điều diễn ra trong công việc thực tế của khác hàng, Nhận được yêu cầu và trao đổi với cấp trên',
            level3: 'Nắm rõ chuyên môn và công việc của khách hàng, Mô tả công việc, Đối tượng phục vụ, Đối tượng sử dụng, Mục đích sử dụng, Giá trị tạo ra cho khách hàng',
            level4: 'Có nguyên tắc đàm phán, Xây dựng thang đo, Khả năng đánh giá nhu cầu của khách hàng, Thời gian và chi phí thực hiện, Chất lượng của sản phẩm/dự án',
            level5: ''
        }
    ];
    return (
        <>
            <Table pagination={false} columns={columns} dataSource={data} />
        </>
    )
}

export default TableInfo;
