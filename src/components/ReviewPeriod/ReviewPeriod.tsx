import { Row, Col, Input, Select, Button, Modal, Space, DatePicker, DatePickerProps, Table } from 'antd';
import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import {
    HomeOutlined,
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    IssuesCloseOutlined,
    CloseOutlined,
    CaretRightOutlined
} from '@ant-design/icons';

import './ReviewPeriod.scss'
import ButtonBase from '../ButtonBase/ButtonBase';

const ReviewPeriod = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    interface DataType {
        key: string;
        reviewperiod: string;
        startDate: string;
        endDate: string;
        path: {
            id: number,
            pathname: string,
        };
    }
    const dataSource: DataType[] = [
        {
            key: '1',
            reviewperiod: 'Đợt đánh giá 1',
            startDate: '2023-11-08',
            endDate: '2023-11-08',
            path: {
                id: 1,
                pathname: 'Lo trinh dev',
            },
        },
        {
            key: '2',
            reviewperiod: 'Đợt đánh giá 1',
            startDate: '2023-11-08',
            endDate: '2023-11-08',
            path: {
                id: 1,
                pathname: 'Lo trinh dev',
            },
        },
        {
            key: '3',
            reviewperiod: 'Đợt đánh giá 1',
            startDate: '2023-11-08',
            endDate: '2023-11-08',
            path: {
                id: 1,
                pathname: 'Lo trinh Dev',
            },
        },
    ];
    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Đợt đánh giá',
            dataIndex: 'reviewperiod',
            key: 'reviewperiod',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Lộ trình',
            dataIndex: 'path',
            key: 'path',
            render: (_) => (
                <>
                    {/* {_.map((value: any) => (
                        <Space size="middle">
                            <a>Invite {value.pathname}</a>
                        </Space>
                    ))} */}
                    <Space size="middle">
                        <a>{_.pathname}</a>
                    </Space>
                </>
            )
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <Space direction='vertical'>
                <ButtonBase label='Sửa' icon={<EditOutlined />} className={'btn_edit'}/>
                <ButtonBase label='Chi tiết' icon={<IssuesCloseOutlined />} className={'btn_detail'}/>
                <ButtonBase label='Xóa' icon={<CloseOutlined />} className={'btn_delete'}/>
            </Space>,
        },
    ];

    return (
        <div className='review'>
            <div className='review_container'>
                <div className='review_header'>
                    <HomeOutlined className='icon_home' />
                    <CaretRightOutlined className='icon_navigateNext' />
                    <span>Khai báo đợt đánh giá</span>
                </div>
                <div className='review_filter'>
                    <Row>
                        <Col >
                            <Row>Tìm kiếm:</Row>
                            <Input style={{ width: 300 + 'px', marginTop: 10, marginRight: '40px' }}
                                placeholder="Nhập từ khoá để tìm kiếm" />
                        </Col>
                        <Col >
                            <Row>Đợt đánh giá:</Row>
                            <Select
                                style={{ width: 300 + 'px', marginTop: 10, marginRight: '40px' }}
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
                        <Col>
                            <Row>Lộ trình:</Row>
                            <Select
                                style={{ width: 300 + 'px', marginTop: 10, marginRight: '40px' }}
                                placeholder="---Lộ trình---"
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
                    </Row>
                    <div className='review_btn'>
                        <ButtonBase icon={<SearchOutlined />} label='Tìm kiếm' />
                        <ButtonBase onClick={showModal} icon={<PlusOutlined />} className='btn_add' label='Khai báo mới' />
                    </div>
                </div>
                <div className='review_data'>
                    <div>
                        <span style={{ color: '#055586', fontSize: 30 + 'px' }}>Kết quả khai báo:</span>
                    </div>
                    <div>
                        <Table dataSource={dataSource} columns={columns} />
                    </div>
                </div>
            </div>
            <Modal title="Khai báo đợt đánh giá"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                closeIcon={false}
                okText="Lưu"
                cancelText="Đóng"
            >
                <div className='review_modal'>
                    <Row>
                        <Col span={24}>
                            <Row>Đợt đánh giá:</Row>
                            <Input style={{ marginTop: 10 }}
                                placeholder="Nhập đợt đánh giá" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Row>Ngày bắt đầu đánh giá:</Row>
                            <DatePicker style={{ marginTop: 10, width: '100%' }}
                                onChange={onChange}
                                placeholder='Ngày bắt đầu đánh giá' />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Row>Ngày kết thúc đánh giá:</Row>
                            <DatePicker style={{ marginTop: 10, width: '100%' }}
                                onChange={onChange}
                                placeholder='Ngày kết thúc đánh giá' />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Row>Đợt đánh giá:</Row>
                            <Select
                                style={{ width: '100%', marginTop: 10 }}
                                placeholder="---Lộ trình---"
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
                    </Row>
                </div>
            </Modal>
        </div>
    )
}
export default ReviewPeriod;
