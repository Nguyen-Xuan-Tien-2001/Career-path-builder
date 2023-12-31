import { Col, Form, Row, Table } from "antd";
import "./employeeReviewInformation.css";
import { HomeOutlined, CaretRightOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { getAllReviewResultUserId } from "../../ApiServices/EmployeeReviewInformationApi/getAllReviewResultUserId";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { getAllInformationUserId } from "../../ApiServices/EmployeeReviewInformationApi/getAllInformationUserId";
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
  } = getAllReviewResultUserId(1, 1, 1);
  const {
    getAllUserInfResponse,
  } = getAllInformationUserId(1, 1, 1,5);

  //Hàm để set dữ liệu vào biến
  useEffect(() => {
    setDataUser(getAllResponse);
    setUserInformation(getAllUserInfResponse);
  }, [getAllResponse, getAllUserInfResponse]);

  //Hàm để xuất dữ liệu ra cột của bản thân
  const columns: ColumnsType<DataType> = [
    {
      title: `Bản thân`,
      dataIndex: "criterianame",
      key: "criteria",
      render: (text) => <p style={{ fontWeight: 600 }}>{text}</p>,
      width: 300,
    },
    {
      title: "Mức điểm",
      dataIndex: "point",
      key: "pont",
      align: "center",
      width: 300,
    },
    {
      title: "Nhận xét",
      dataIndex: "note",
      key: "comment",
    },
  ];
  //Hàm để xuất dữ liệu ra cột của người khác
  const columnsI: ColumnsType<DataType> = [
    {
      title: `Ẩn danh`,
      dataIndex: "criterianame",
      key: "criteria",
      render: (text) => <p style={{ fontWeight: 600 }}>{text}</p>,
      width: 300,
      
    },
    {
      title: "Mức điểm",
      dataIndex: "point",
      key: "pont",
      align: "center",
      width: 300,
    },
    {
      title: "Nhận xét",
      dataIndex: "note",
      key: "comment",
    },
  ];
  return (
    <>
      <div className="review_header">
        <HomeOutlined className="icon_home" />
        <CaretRightOutlined className="icon_navigateNext" />
        <span>Thông tin kết quả đánh giá của nhân viên</span>
      </div>
      <div className="information">
        <div className="information-user">
          <h1>Thông tin kết quả đánh giá của nhân viên</h1>
          <Form>
            {userInformation?.data === null ?
              <h3 style={{ textAlign: "center" }}>Điểm của bạn không đạt để có kết quả đánh giá nhân viên</h3>
              : <>
                <Row justify={"center"} gutter={[16, 0]}>
                  <Col className="information-css">Nhân viên:</Col>
                  <Col span={4} className="information-css">
                    {userInformation?.data?.userid} -{" "}
                    {userInformation?.data?.staffname}
                  </Col>
                  <Col className="information-css">Kì đánh giá:</Col>
                  <Col className="information-css">
                    {userInformation?.data?.reviewname}
                  </Col>
                </Row>
                <Row justify={"center"} gutter={[16, 0]}>
                  <Col className="information-css">Level:</Col>
                  <Col span={3} className="information-css">
                    {userInformation?.data?.positionjob}
                  </Col>
                  <Col className="information-css" style={{ marginLeft: 45 }}>
                    Kết quả:
                  </Col>
                  <Col className="information-css">
                    {userInformation?.data?.levelname}
                  </Col>
                </Row></>}
          </Form>
          <h2>Chi tiết đánh giá:</h2>
          {dataUser?.data?.map((item: any) => {
            let isTrue = false;
            let tempTable = item.dataReview.map((value: any) => {
              if (item.userdanhgia === value.userduocdanhgia) {
                isTrue = true;
              }
              return value;
            });
            return (
              <>
                <div className="orther">
                  <Table
                    pagination={false}
                    columns={isTrue ? columns : columnsI}
                    dataSource={tempTable}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default EmployeeReviewInformation;
