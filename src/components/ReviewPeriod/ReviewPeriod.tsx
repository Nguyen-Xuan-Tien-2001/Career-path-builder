import { Row, Col, Input, Select, Button, Modal, Space, DatePicker, DatePickerProps, Table, Form, message } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
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
import { GetAllPath } from '../../ApiServices/ReviewPeriodApi/GetAllPath';
import { GetReviewByPathService } from '../../ApiServices/ReviewPeriodApi/GetReviewByPath';
import { GetAllReview } from '../../ApiServices/ReviewPeriodApi/GetAllReview';
import moment from 'moment';
import { AddReviewPeriodService } from '../../ApiServices/ReviewPeriodApi/AddReviewPeriod';
import { useForm } from 'antd/es/form/Form';


const dateFormat = 'YYYY-MM-DD';
const ReviewPeriod = () => {
    const {
        getAllPathResponse,
    } = GetAllPath();
    const {
        GetReviewByPathResponse,
        callGetReviewByPathRefetch,
    } = GetReviewByPathService();
    const {
        getAllReviewResponse,
        getAllReviewIsLoading,
        getAllReviewError,
        getAllReviewRefetch,
    } = GetAllReview();

    const {
        addReviewPeriodResponse,
        addReviewPeriodIsLoading,
        addReviewPeriodError,
        callReviewPeriodRefetch,
    } = AddReviewPeriodService();
    useEffect(() => {
        if (getAllReviewResponse) {
            setDataSelectReview(getAllReviewResponse!.data!.map((val: any, index: number) => {
                return {
                    value: val.reviewid,
                    label: val.reviewname
                }
            }))
        }
    }, [getAllReviewResponse])
    const [form] = Form.useForm();
    const [dataSelectReview, setDataSelectReview] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [path, setPath] = useState<any>('Chọn lộ trình')
    const [reviewName, setReviewName] = useState<any>()
    const [timestart, setTimeStart] = useState<any>(dayjs('2023-12-01', dateFormat))
    const [timeend, setTimeEnd] = useState<any>(dayjs('2023-12-01', dateFormat))
    const [dataReviewTable, setDataReviewTable] = useState<any>()
    const [optionReviewPeriod, setOptionReviewPeriod] = useState<any>(0)
    const [review, setReview]=useState(0)
    const dataSelectPath = getAllPathResponse?.data?.map((val: any, index: number) => {
        return {
            value: val.pathid,
            label: val.pathname
        }
    });
    console.log('review', review)
    const [messageApi, contextHolder] = message.useMessage();
    const success = (message:string) => {
        messageApi.open({
          type: 'success',
          content: message,
        });
      };
    
      const error = (message:string) => {
        messageApi.open({
          type: 'error',
          content: message,
        });
      };

    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleOk = () => {
        if(timeend-timestart>=0){
            let data = {
                reviewname: reviewName,
                timestart: timestart,
                timeend: timeend,
                pathid: path,
                pathname: 'pathname'
            }
            callReviewPeriodRefetch(data);
            setPath(null);
            setReviewName("")
            setTimeStart(dayjs('2023-12-01', dateFormat));
            setTimeEnd(dayjs('2023-12-01', dateFormat));
            setIsModalOpen(false);
        }else{
            error('Ngày kết thúc phải sau ngày bắt đầu!');
        }
        
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onChangeStart: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date);
        
        setTimeStart(dayjs(dateString, dateFormat))
    };
    const onChangeEnd: DatePickerProps['onChange'] = (date, dateString) => {
        setTimeEnd(dayjs(dateString, dateFormat))
    };
    interface DataType {
        key: string;
        reviewperiod: string;
        startDate: string;
        endDate: string;
        pathName: string;
    }
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
            render: (i: any) => {
                const formatdate = moment(i).format('DD/MM/YYYY');
                return (
                    <>{formatdate}</>
                )
            }
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (i: any) => {
                const formatdate = moment(i).format('DD/MM/YYYY');
                return (
                    <>{formatdate}</>
                )
            }
        },
        {
            title: 'Lộ trình',
            dataIndex: 'pathName',
            key: 'pathName',
            // render: (_) => (
            //     <>
            //          {_.map((value: any) => (
            //             <Space size="middle">
            //                 <a>Invite {value.pathname}</a>
            //             </Space>
            //         ))}
            //         <Space size="middle">
            //             <a>{_.pathname}</a>
            //         </Space>
            //     </>
            // )
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <Space direction='vertical'>
                <ButtonBase label='Sửa' icon={<EditOutlined />} className={'btn_edit'} />
                <ButtonBase label='Chi tiết' icon={<IssuesCloseOutlined />} className={'btn_detail'} />
                <ButtonBase label='Xóa' icon={<CloseOutlined />} className={'btn_delete'} />
            </Space>,
        },
    ];

    useEffect(() => {
        if (GetReviewByPathResponse) {
            setOptionReviewPeriod(GetReviewByPathResponse.data);
        }
    }, [GetReviewByPathResponse])
    function handleOnselect(e: any) {
        callGetReviewByPathRefetch(e);
        setPath(e)
    }
    function handleOnselectReview(e: any) {
        setReview(e)
        console.log(e)
    }
    function handleOnsubmitSearch() {
        callGetReviewByPathRefetch(path);
        console.log('path', GetReviewByPathResponse)
        setDataReviewTable(GetReviewByPathResponse?.data)
    }

    return (
        <div className='review'>
             {contextHolder}
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
                                options={dataSelectPath}
                                onSelect={(e) => handleOnselect(e)}
                            />
                        </Col>
                        <Col >
                            <Row>Đợt đánh giá:</Row>
                            <Select
                                style={{ width: 300 + 'px', marginTop: 10, marginRight: '40px' }}
                                placeholder="---Chọn đợt đánh giá---"
                                optionFilterProp="children"
                                options={optionReviewPeriod ? optionReviewPeriod.map((value: any, i: number) => {
                                    return {
                                        label: value.reviewname,
                                        value: value.reviewid
                                    }
                                }) : dataSelectReview}
                                onSelect={(e) => handleOnselectReview(e)}
                            />
                        </Col>
                    </Row>
                    <div className='review_btn'>
                        <ButtonBase onClick={handleOnsubmitSearch} icon={<SearchOutlined />} label='Tìm kiếm' />
                        <ButtonBase onClick={showModal} icon={<PlusOutlined />} className='btn_add' label='Khai báo mới' />
                    </div>
                </div>
                <div className='review_data'>
                    <div>
                        <span style={{ color: '#055586', fontSize: 30 + 'px' }}>Kết quả khai báo:</span>
                    </div>
                    <div>
                        <Table dataSource={dataReviewTable?.map((value: any, i: number) => {
                            return {
                                key: value.reviewid,
                                reviewperiod: value.reviewname,
                                startDate: value.timestart,
                                endDate: value.timeend,
                                pathName: value.pathname
                            }
                        })} columns={columns} />
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
                                <Row>Lộ trình:</Row>
                                <Select
                                    style={{ width: '100%', marginTop: 10 }}
                                    placeholder="---Lộ trình---"
                                    optionFilterProp="children"
                                    options={dataSelectPath}
                                    onSelect={(e) => setPath(e)}
                                    value={path}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Row>Đợt đánh giá:</Row>
                                <Input style={{ marginTop: 10 }} onChange={(e: any) => setReviewName(e.target.value)}
                                    placeholder="Nhập đợt đánh giá"
                                    value={reviewName}
                                     />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Row>Ngày bắt đầu đánh giá:</Row>
                                <DatePicker style={{ marginTop: 10, width: '100%' }}
                                    onChange={onChangeStart}
                                    placeholder='Ngày bắt đầu đánh giá' 
                                    value={timestart}
                                    />
                                    
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Row>Ngày kết thúc đánh giá:</Row>
                                <DatePicker style={{ marginTop: 10, width: '100%' }}
                                    onChange={onChangeEnd}
                                    placeholder='Ngày kết thúc đánh giá' 
                                    value={timeend}
                                    status={(timeend-timestart)<0?'error':''}
                                    />
                            </Col>
                        </Row>
                    
                </div>
            </Modal>
        </div>
    )
}
export default ReviewPeriod;
