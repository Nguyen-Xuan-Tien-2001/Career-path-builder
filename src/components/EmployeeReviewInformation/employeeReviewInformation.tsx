import { Col, Form, Row, Table } from 'antd';
import './employeeReviewInformation.css'
import {
    HomeOutlined,
    CaretRightOutlined
} from '@ant-design/icons';
import { getAllReviewResultUserId } from '../../ApiServices/EmployeeReviewInformationApi/getAllReviewResultUserId';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { getAllInformationUserId } from '../../ApiServices/EmployeeReviewInformationApi/getAllInformationUserId';
interface DataType {
    key?: number;
    criteria?: string;
    point?: number;
    comment?: string;
}
function EmployeeReviewInformation() {
    const [dataUser, setDataUser] = useState<any>([]);
    const [userInformation, setUserInformation] = useState<any>([]);
    const {
        getAllResponse,
        // getAllIsLoading,
        // getAllError,
        // getAllRefetch,
    } = getAllReviewResultUserId(5, 5, 3);
    const {
        getAllUserInfResponse,
    } = getAllInformationUserId(5, 2, 5);
    useEffect(() => {
        setDataUser(getAllResponse);
        setUserInformation(getAllUserInfResponse);
    }, [getAllResponse, getAllUserInfResponse]);
    // const [datav, setDataV] = useState([]);//tự đánh giá
    // const [dataKhac, setDataKhac] = useState([]);//tự đánh giá
    // useEffect(()=>{
    //    if(dataUser && dataUser.data){
    //     if(dataUser.data && dataUser.data.length > 0){

    //         const arr:any = []//bản thân
    //         const arr2:any = []//data khác

    //         dataUser.data.map((value: any)=>{
    //             value?.dataReview.map((item: any)=>{
    //                 if(value.userdanhgia === item.userduocdanhgia){
    //                     arr.push(item)
    //                 }
    //                 else{
    //                     arr2.push(item)//còn lại là data khác ở đây
    //                 }
    //             })
    //         })
    //         setDataV(arr)
    //         setDataKhac(arr2)
    //     }
    //    }
    // },[dataUser])
    const columns: ColumnsType<DataType> = [
        {
            title: `Bản thân`,
            dataIndex: 'criterianame',
            key: 'criteria',
            render: (text) => <p style={{ fontWeight: 600 }}>{text}</p>,
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
            dataIndex: 'note',
            key: 'comment',
        },
    ];
    const columnsI: ColumnsType<DataType> = [
        {
            title: `Ẩn danh`,
            dataIndex: 'criterianame',
            key: 'criteria',
            render: (text) => <p style={{ fontWeight: 600 }}>{text}</p>,
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
            dataIndex: 'note',
            key: 'comment',
        },
    ];
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
                                {userInformation?.data?.userid} - {userInformation?.data?.staffname}
                            </Col>
                            <Col className='information-css'>
                                Kì đánh giá:
                            </Col>
                            <Col className='information-css'>
                                {userInformation?.data?.reviewname}
                            </Col>
                        </Row>
                        <Row justify={'center'} gutter={[16, 0]}>
                            <Col className='information-css'>
                                Level:
                            </Col>
                            <Col span={3} className='information-css'>
                                {userInformation?.data?.positionjob}
                            </Col>
                            <Col className='information-css' style={{ marginLeft: 40 }}>
                                Kết quả:
                            </Col>
                            <Col className='information-css'>
                                {userInformation?.data?.levelname}
                            </Col>
                        </Row>
                    </Form>
                    <h2>Chi tiết đánh giá:</h2>
                    {
                        dataUser?.data?.map((item: any) => {
                            let isTrue = false;
                            let tempTable = item.dataReview.map((value: any) => {
                                if (item.userdanhgia === value.userduocdanhgia) {
                                    isTrue = true
                                }
                                return value;

                            })
                            return (
                                <>
                                    <div className='orther'>
                                        <Table pagination={false} columns={isTrue ? columns : columnsI} dataSource={tempTable} />
                                    </div>
                                </>
                            );
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default EmployeeReviewInformation;