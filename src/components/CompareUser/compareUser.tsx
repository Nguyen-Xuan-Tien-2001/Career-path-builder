import { Row, Col, Select, Button } from 'antd';
import './compareUser.css'
function CompareUser() {
    return (
        <>
            <div className="compareuser">
                <div className="compareuser-information">
                    <div className="compare">
                        <h1>So sánh chi tiết hai nhân viên:</h1>
                        <Row>
                            <Col span={4}>
                                <Row>
                                    <Col span={7} style={{ marginTop: 3 }}>
                                        Đợt đánh giá:
                                    </Col>
                                    <Col span={12}>
                                        <Select
                                            placeholder="Chọn đợt"
                                            style={{ width: 200 }}
                                            allowClear
                                            options={[{ value: '1', label: 'đợt 1' }, { value: '2', label: 'đợt 2' }, { value: '3', label: 'đợt 3' }]}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={7}>
                                <Row>
                                    <Col span={4} style={{ marginTop: 3 }}>
                                        Nhân viên:
                                    </Col>
                                    <Col span={18}>
                                        <Select
                                            mode="multiple"
                                            placeholder="Chọn nhân viên so sánh"
                                            style={{ width: 450 }}
                                            allowClear
                                            options={[{ value: '222037', label: '222037 - Nguyễn Chí Lợi' }, { value: '2', label: '227358 - Nguyễn Xuân Tiến' }]}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6} offset={1}>
                                <Button type='primary'>So sánh</Button>
                            </Col>
                        </Row>

                    </div>

                </div>
            </div>
        </>
    )
}
export default CompareUser;