import { Button, Col, Input, Row, Select, Space, Table} from 'antd'
import './ReviewDetail.scss'
import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import {SearchOutlined, CloudUploadOutlined, HomeOutlined, CaretRightOutlined} from '@ant-design/icons';
const ReviewDetail = () => {
    const styledFilterInput = {
        width: 300,
        marginTop: 10
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    interface DataType {
        key: number;
        path: {
            id: number,
            pathname: string,
        };
        userReview: {
            id: number,
            userId: number,
            fullName: string,
        }
        userReviewed: {
            id: number,
            userId: number,
            fullName: string,
        }
    }
    const dataSource: DataType[] = [
        {
            key: 1,
            path: {
                id: 1,
                pathname: 'Lộ trình Dev',
            },
            userReview: {
                id: 1,
                userId: 222222,
                fullName: 'Nguyễn Văn A',
            },
            userReviewed: {
                id: 1,
                userId: 222222,
                fullName: 'Nguyễn Văn B',
            }
        }
    ];
    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Lộ trình',
            dataIndex: 'path',
            key: 'path',
            render: (_) => (
                <>
                    <Space size="middle">
                        <span>{_.pathname}</span>
                    </Space>
                </>
            )
        },
        {
            title: 'Người đánh giá',
            dataIndex: 'userReview',
            key: 'userReview',
            render: (_) => (
                <>
                    <Space size="middle">
                        <span>{_.userId} - {_.fullName}</span>
                    </Space>
                </>
            )
        },
        {
            title: 'Người được đánh giá',
            dataIndex: 'userReviewed',
            key: 'userReviewed',
            render: (_) => (
                <>
                    <Space size="middle">
                        <span>{_.userId} - {_.fullName}</span>
                    </Space>
                </>
            )
        },
    ];
    return (
        <div className="review_detail">
            <div className='review_detail_container'>
            <div className='review_header'>
                    <HomeOutlined className='icon_home' />
                    <CaretRightOutlined className='icon_navigateNext' />
                    <span>Khai báo đợt đánh giá</span>
                </div>
                <div className='review_detail_filter'>
                    <Row>
                        <Col span={6}>
                            <Row>Đợt đánh giá:</Row>
                            <Select
                                style={styledFilterInput}
                                placeholder="---Chọn đợt đánh giá---"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                    {
                                        value: '1',
                                        label: 'Not Identified',
                                    },
                                    {
                                        value: '2',
                                        label: 'Closed',
                                    },
                                    {
                                        value: '3',
                                        label: 'Communicated',
                                    },
                                    {
                                        value: '4',
                                        label: 'Identified',
                                    },
                                    {
                                        value: '5',
                                        label: 'Resolved',
                                    },
                                    {
                                        value: '6',
                                        label: 'Cancelled',
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={6}>
                            <Row>Lộ trình:</Row>
                            <Select
                                style={styledFilterInput}
                                placeholder="---Chọn Lộ trình---"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                    {
                                        value: '1',
                                        label: 'Not Identified',
                                    },
                                    {
                                        value: '2',
                                        label: 'Closed',
                                    },
                                    {
                                        value: '3',
                                        label: 'Communicated',
                                    },
                                    {
                                        value: '4',
                                        label: 'Identified',
                                    },
                                    {
                                        value: '5',
                                        label: 'Resolved',
                                    },
                                    {
                                        value: '6',
                                        label: 'Cancelled',
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={6}>
                            <Row>Người đánh giá:</Row>
                            <Input style={styledFilterInput}
                                placeholder="Nhập mã user người đánh giá" />
                        </Col>
                        <Col span={6}>
                            <Row>Người được đánh giá:</Row>
                            <Input style={styledFilterInput}
                                placeholder="Nhập mã user người được đánh giá" />
                        </Col>
                    </Row>
                    <div className='review_btn'>
                        <Button type="primary"><SearchOutlined />Tìm kiếm</Button>
                        <Button onClick={showModal} style={{ backgroundColor: '#167F21' }} type="primary"><CloudUploadOutlined />Import</Button>
                    </div>
                </div>
                <div className='review_data'>
                    <div>
                        <span className='review_data_title'>Danh sách chi tiết đợt đánh giá:</span>
                    </div>
                    <div>
                        <Table dataSource={dataSource} columns={columns} pagination={false}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ReviewDetail