import { Col, Form, Row } from 'antd';
import './employeeReviewInformation.css'
import TableERI from './tableEmployeeReviewInformation';
import TableERIO from './tableEmployeeReviewInformationOrther';
import {
    HomeOutlined,
    CaretRightOutlined
} from '@ant-design/icons';
function EmployeeReviewInformation() {
    return (
        <>
            <div className='review_header'>
                <HomeOutlined className='icon_home' />
                <CaretRightOutlined className='icon_navigateNext' />
                <span>Thông tin nhân viên đánh giá</span>
            </div>
            <div className='information'>
                <div className='information-user'>
                    <h1>Thông tin nhân viên đánh giá</h1>
                    <Form>
                        <Row justify={'center'} gutter={[16, 0]}>
                            <Col className='information-css'>
                                Nhân viên:
                            </Col>
                            <Col span={4} className='information-css'>
                                222037 - Nguyễn Chí Lợi
                            </Col>
                            <Col className='information-css'>
                                Kì đánh giá:
                            </Col>
                            <Col className='information-css'>
                                Kì 1
                            </Col>
                        </Row>
                        <Row justify={'center'} gutter={[16, 0]}>
                            <Col className='information-css'>
                                Level:
                            </Col>
                            <Col span={3} className='information-css'>
                                Front-End Level 1
                            </Col>
                            <Col className='information-css' style={{ marginLeft: 25 }}>
                                Kết quả:
                            </Col>
                            <Col className='information-css'>
                                Front-End Level 2
                            </Col>
                        </Row>
                    </Form>
                    <h2>Chi tiết đánh giá:</h2>
                    <div className='self'>
                        <TableERI />
                    </div>
                    <div className='orther'>
                        <TableERIO />
                    </div>
                </div>
            </div>
        </>
    )
}
export default EmployeeReviewInformation;