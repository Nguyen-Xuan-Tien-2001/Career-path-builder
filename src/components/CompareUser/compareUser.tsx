import { Row, Col, Select, Typography, Form } from 'antd';
import './compareUser.css'
import ButtonBase from '../ButtonBase/ButtonBase';
import {
    HomeOutlined,
    CaretRightOutlined
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getAllReview } from '../../ApiServices/CompareUserApi/getAllReview';
import { getAllUser } from '../../ApiServices/CompareUserApi/getAllUser';
import { getCompareUser } from '../../ApiServices/CompareUserApi/getCompareUser';

function CompareUser() {
    const [form] = Form.useForm();
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedValuesReview, setSelectedValuesReview] = useState(0);

    const handleSelect = (selectedOptions: any) => {
        form.setFieldsValue({
            username_userid: form.getFieldValue('username_userid').slice(0, 2),
        });
        if (selectedOptions.length > 2) {
            setSelectedValues(selectedOptions.slice(0, 2));
        } else {
            setSelectedValues(selectedOptions);
        }
    };
    const handleSelectReview = (selectecOption: any) => {
        setSelectedValuesReview(selectecOption);
    }

    const [dataReview, setDataReview] = useState<any>([]);
    const [dataUser, setDataUser] = useState<any>([]);
    const [dataCompareUser, setCompareUser] = useState<any>([]);
    const {
        getAllReviewResponse,
        // getAllIsLoading,
        // getAllError,
        // getAllRefetch,
    } = getAllReview();
    const {
        getAllUserResponse,
        // getAllIsLoading,
        // getAllError,
        // getAllRefetch,
    } = getAllUser();
    const {
        getCompareUserResponse,
        // getCompareUserIsLoading,
        // getCompareUserError,
        // getCompareUserRefetch,
    } = getCompareUser(2, selectedValuesReview, selectedValues[0], selectedValues[1]);
    useEffect(() => {
        if (getAllReviewResponse) {
            setDataReview(getAllReviewResponse);
        }
        if (getAllUserResponse) {
            setDataUser(getAllUserResponse)
        }
        if (getCompareUserResponse) {
            setCompareUser(getCompareUserResponse)
        }
    }, [getAllReviewResponse, getAllUserResponse, getCompareUserResponse])


    const handleSubmit = () => {
        console.log(dataCompareUser);
    }

    console.log(dataCompareUser?.data?.user1.dataReview?.map((value: any) => {
        return (
            value.point
        )
    }));


    return (
        <>
            <div className='review_header'>
                <HomeOutlined className='icon_home' />
                <CaretRightOutlined className='icon_navigateNext' />
                <span>So sánh chi tiết nhân viên</span>
            </div>
            <div className="compareuser">
                <div className="compareuser-information">
                    <div className="compare">
                        <Form form={form}>
                            <h1>So sánh chi tiết hai nhân viên:</h1>
                            <Row gutter={[16, 0]}>
                                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                                    <Row>
                                        <Typography.Title level={5} style={{ margin: 0 }}>Đợt đánh giá:</Typography.Title>
                                        <Form.Item name="evaluationsession" style={{ marginLeft: 15 }} >
                                            <Select placeholder='Chọn đợt đánh giá' style={{ width: 200 }} value={selectedValuesReview} options={
                                                dataReview?.data?.map((v: any) => (
                                                    {
                                                        label: v.reviewname,
                                                        value: v.reviewid
                                                    }
                                                ))
                                            } onChange={handleSelectReview} />
                                        </Form.Item>
                                    </Row>
                                </Col>
                                <Col xl={10} lg={6} md={8} sm={12} xs={24}>
                                    <Row>
                                        <Typography.Title level={5} style={{ margin: 0 }}>Nhân viên:</Typography.Title>
                                        <Form.Item name="username_userid" style={{ marginLeft: 15 }}>
                                            <Select placeholder='Chọn nhân viên cần so sánh' onChange={handleSelect} value={selectedValues} style={{ width: 500 }} mode={'tags'}
                                                options={dataUser?.data?.map((v: any) => ({
                                                    label: v.staffName,
                                                    value: v.userId
                                                }))} />
                                        </Form.Item>
                                    </Row>
                                </Col>
                                <Col xl={4} lg={6} md={8} sm={12} xs={24} style={{ bottom: 5 }}>
                                    <ButtonBase className={'btn_detail'} label='So sánh' onClick={handleSubmit} />
                                </Col>
                            </Row>
                        </Form>
                    </div>

                </div>
                <div className='compare-user'>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                            <div className='information-frame'>
                                <div className='userid-name'>
                                    User - Họ tên nhân viên
                                </div>
                                <div className='userid-name'>
                                    Chức vụ
                                </div>
                                <div className='userid-name underlined'>
                                    Phòng ban
                                </div>
                                <div className='Criteria'>
                                    Engagement Level
                                </div>
                                <div className='Criteria'>
                                    Algorithm/ Architecture level
                                </div>
                                <div className='Criteria'>
                                    Making product level
                                </div>
                                <div className='Criteria'>
                                    Operation Responsibility level
                                </div>
                                <div className='Criteria'>
                                    Improvement level
                                </div>
                                <div className='Criteria'>
                                    Project
                                </div>
                            </div>

                        </Col>
                        <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                            <div className='information-frame'>
                                <div className='userid-name'>
                                    {dataCompareUser?.data?.user1?.staff?.userId} - {dataCompareUser?.data?.user1?.staff?.staffName}
                                </div>
                                <div className='userid-name'>
                                    {dataCompareUser?.data?.user1?.staff?.positionjob}
                                </div>
                                <div className='userid-name underlined'>
                                    {dataCompareUser?.data?.user1?.staff?.department}
                                </div>
                                {dataCompareUser?.data?.user1.dataReview?.map((value: any) => {
                                    return (
                                        <div className='Criteria example-1'>
                                            {value.point}
                                        </div>
                                    )

                                })}

                            </div>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                            <div className='userid-name'>
                                {dataCompareUser?.data?.user2?.staff?.userId} - {dataCompareUser?.data?.user2?.staff?.staffName}
                            </div>
                            <div className='userid-name'>
                                {dataCompareUser?.data?.user2?.staff?.positionjob}
                            </div>
                            <div className='userid-name underlined'>
                                {dataCompareUser?.data?.user2?.staff?.department}
                            </div>
                            <div className='Criteria example-2'>
                                3
                            </div>
                            <div className='Criteria example-1'>
                                2
                            </div>
                            <div className='Criteria example-0'>
                                2
                            </div>
                            <div className='Criteria example-0'>
                                0
                            </div>
                            <div className='Criteria example-0'>
                                0
                            </div>
                            <div className='Criteria example-2'>
                                3
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default CompareUser;