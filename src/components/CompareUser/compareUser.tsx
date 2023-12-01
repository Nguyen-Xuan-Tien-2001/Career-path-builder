import { Row, Col, Select,  Typography, Form } from 'antd';
import './compareUser.css'
import ButtonBase from '../ButtonBase/ButtonBase';
import {
    HomeOutlined,
    CaretRightOutlined
} from '@ant-design/icons';

function CompareUser() {
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
                        <Form>
                            <h1>So sánh chi tiết hai nhân viên:</h1>
                            <Row gutter={[16, 0]}>
                                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                                    <Row>
                                        <Typography.Title level={5} style={{ margin: 0 }}>Đợt đánh giá:</Typography.Title>
                                        <Form.Item name="evaluationsession" style={{ marginLeft: 15 }} >
                                            <Select placeholder='Chọn đợt đánh giá' style={{ width: 200 }} options={[
                                                {
                                                    value: '1',
                                                    label: 'Đợt 1',
                                                },
                                                {
                                                    value: '2',
                                                    label: 'Đợt 2',
                                                },
                                                {
                                                    value: '3',
                                                    label: 'Đợt 3',
                                                },
                                            ]} />
                                        </Form.Item>
                                    </Row>
                                </Col>
                                <Col xl={10} lg={6} md={8} sm={12} xs={24}>
                                    <Row>
                                        <Typography.Title level={5} style={{ margin: 0 }}>Nhân viên:</Typography.Title>
                                        <Form.Item name="username_userid" style={{ marginLeft: 15 }}>
                                            <Select placeholder='Chọn nhân viên cần so sánh' style={{ width: 500 }} mode="multiple" options={[
                                                {
                                                    value: '1',
                                                    label: '222037-Nguyễn Chí Lợi',
                                                },
                                                {
                                                    value: '2',
                                                    label: '227358-Nguyễn Xuân Tiến',
                                                },
                                                {
                                                    value: '3',
                                                    label: '227431-Lê Phước Đạt',
                                                },
                                            ]} />
                                        </Form.Item>
                                    </Row>
                                </Col>
                                <Col xl={4} lg={6} md={8} sm={12} xs={24} style={{bottom: 5}}>
                                    <ButtonBase className={'btn_detail'} label='So sánh' />
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
                                    222037 - Nguyễn Chí Lợi
                                </div>
                                <div className='userid-name'>
                                    Front-End Level 1
                                </div>
                                <div className='userid-name underlined'>
                                    HRM - Báo cáo nội bộ
                                </div>
                                <div className='Criteria example-1'>
                                    2
                                </div>
                                <div className='Criteria example-2'>
                                    3
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
                                <div className='Criteria example-1'>
                                    2
                                </div>
                            </div>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                            <div className='userid-name'>
                                227358 - Nguyễn Xuân Tiến
                            </div>
                            <div className='userid-name'>
                                Front-End Level 1
                            </div>
                            <div className='userid-name underlined'>
                                HRM - Báo cáo nội bộ
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