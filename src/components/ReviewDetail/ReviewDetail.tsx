import { Col, Input, Row, Select, Space, Table, Modal } from 'antd'
import './ReviewDetail.scss'
import { useState } from 'react';


import { SearchOutlined, CloudUploadOutlined, HomeOutlined, CaretRightOutlined } from '@ant-design/icons';
import { ExcelRenderer } from 'react-excel-renderer';

import ButtonBase from '../ButtonBase/ButtonBase';

interface IDataFile {
    path?: string,
    userReview?: string,
    userReviewed?: string
}

const initData = [
    {
        assessorid: "Chưa có dữ liệu",
        userid: "Chưa có dữ liệu",
        ratingcoefficient: "Chưa có dữ liệu"
    }
];



const ReviewDetail = () => {
    const styledFilterInput = {
        width: 300,
        marginTop: 10
    }



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataExcel, setDataExcel] = useState<Array<IDataFile>>(initData);
    const [title, setTitle] = useState([]);
    const [rows, setRows] = useState([]);
    const reviewid = 1;


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleImport = () => {
        let data = rows.map((row) => {
            let temp = {};
            (title.map((title, j) => {
                return temp = {
                    ...temp,
                    [title]: row[j],
                    reviewid: reviewid
                }
            }));
            return (temp);
        })

        setDataExcel(data);
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const fileHandler = (event: any) => {
        console.log(event.target.files[0]);
        let fileObj = event.target.files[0];

        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err: any, resp: any) => {
            if (err) {
                console.log(err);
            }
            else {
                setTitle(resp.rows[0]);
                resp.rows.shift();
                setRows(resp.rows);
            }
        });
    }


    const columns = [
        {
            title: 'Mã người đánh giá',
            dataIndex: 'assessorid',
            key: 'assessorid',
        },
        {
            title: 'Mã Nhân Viên',
            dataIndex: 'userid',
            key: 'userid',

        },
        {
            title: 'Hệ số đánh giá',
            dataIndex: 'ratingcoefficient',
            key: 'ratingcoefficient',
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
                        <ButtonBase label={'Tìm kiếm'} icon={<SearchOutlined />} />
                        <ButtonBase onClick={showModal} className='btn_add' label={'Import'} icon={<CloudUploadOutlined />} />
                    </div>
                </div>
                <div className='review_data'>
                    <div>
                        <span className='review_data_title'>Danh sách chi tiết đợt đánh giá:</span>
                    </div>
                    <div>
                        <Table dataSource={dataExcel} columns={columns} pagination={false} />
                    </div>
                </div>
            </div>
            <Modal title="Import danh sách đánh giá"
                open={isModalOpen}
                onOk={handleImport}
                onCancel={handleCancel}
                closeIcon={false}
                okText="Import"
                cancelText="Đóng"
            >
                <div className='review_modal'>
                    <Input type="file" onChange={fileHandler} accept=".xlsx,.xls" style={{ "padding": "10px" }} />
                </div>
            </Modal>
        </div>
    )
}
export default ReviewDetail