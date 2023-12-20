import { Col, Input, Row, Select, Space, Table, Modal, message } from "antd";
import "./ReviewDetail.scss";
import { useEffect, useState } from "react";

import {
  SearchOutlined,
  CloudUploadOutlined,
  HomeOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { ExcelRenderer } from "react-excel-renderer";

import ButtonBase from "../ButtonBase/ButtonBase";
import { AddAssessorService } from "../../ApiServices/ReviewDetail/AddListAssessors";
import { GetListAssessorByReviewId } from "../../ApiServices/ReviewDetail/GetListAssessorByReviewId";
import { useParams } from "react-router";

interface IDataFile {
  assessorid: number;
  userid: number;
  ratingcoefficient: number;
  reviewid: number;
}

const ReviewDetail = () => {
  const styledFilterInput = {
    width: 300,
    marginTop: 10,
  };
  const { reviewId } = useParams();
  const {
    getListAssessorByReviewIdResponse,
    getListAssessorByReviewIdRefetch,
  } = GetListAssessorByReviewId(Number(reviewId));
  const { addAssessorResponse, callAddAssessorRefetch } = AddAssessorService();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState([]);
  const [rows, setRows] = useState([]);

  const success = (message: string) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const error = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleImport = () => {
    const data: Array<IDataFile> = rows.map((row) => {
      let temp: IDataFile = {
        assessorid: 0,
        userid: 0,
        ratingcoefficient: 0,
        reviewid: 0,
      };
      title.map((title, j) => {
        return (temp = {
          ...temp,
          [title]: row[j],
          reviewid: Number(reviewId),
        });
      });
      return temp;
    });
    callAddAssessorRefetch(data);
  };

  useEffect(() => {
    if (addAssessorResponse) {
      if (addAssessorResponse.status === "success") {
        success(addAssessorResponse.message);
        getListAssessorByReviewIdRefetch();
        setIsModalOpen(false);
      }
      if (addAssessorResponse.status === "error") {
        error(addAssessorResponse.message);
      }
    }
  }, [addAssessorResponse]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fileHandler = (event: any) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err: any, resp: any) => {
      if (err) {
        console.log(err);
      } else {
        setTitle(resp.rows[0]);
        resp.rows.shift();
        setRows(resp.rows);
      }
    });
  };

  const columns = [
    {
      title: "STT",
      key: "id",
      render: (id: any, record: any, index: any) => {
        ++index;
        return index;
      },
    },
    {
      title: "Mã người đánh giá",
      dataIndex: "assessorid",
      key: "assessorid",
    },
    {
      title: "Mã người được đánh giá",
      dataIndex: "userid",
      key: "userid",
    },
    {
      title: "Hệ số đánh giá",
      dataIndex: "ratingcoefficient",
      key: "ratingcoefficient",
    },
  ];
  return (
    <div className="review_detail">
      {contextHolder}
      <div className="review_detail_container">
        <div className="review_header">
          <HomeOutlined className="icon_home" />
          <CaretRightOutlined className="icon_navigateNext" />
          <span>Chi tiết đợt đánh giá</span>
        </div>
        <div className="review_detail_filter">
          <Row>
            <Col span={6}>
              <Row>Đợt đánh giá:</Row>
              <Select
                style={styledFilterInput}
                placeholder="---Chọn đợt đánh giá---"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "Not Identified",
                  },
                  {
                    value: "2",
                    label: "Closed",
                  },
                  {
                    value: "3",
                    label: "Communicated",
                  },
                  {
                    value: "4",
                    label: "Identified",
                  },
                  {
                    value: "5",
                    label: "Resolved",
                  },
                  {
                    value: "6",
                    label: "Cancelled",
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
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "Not Identified",
                  },
                  {
                    value: "2",
                    label: "Closed",
                  },
                  {
                    value: "3",
                    label: "Communicated",
                  },
                  {
                    value: "4",
                    label: "Identified",
                  },
                  {
                    value: "5",
                    label: "Resolved",
                  },
                  {
                    value: "6",
                    label: "Cancelled",
                  },
                ]}
              />
            </Col>
            <Col span={6}>
              <Row>Người đánh giá:</Row>
              <Input
                style={styledFilterInput}
                placeholder="Nhập mã user người đánh giá"
              />
            </Col>
            <Col span={6}>
              <Row>Người được đánh giá:</Row>
              <Input
                style={styledFilterInput}
                placeholder="Nhập mã user người được đánh giá"
              />
            </Col>
          </Row>
          <div className="review_btn">
            <ButtonBase label={"Tìm kiếm"} icon={<SearchOutlined />} />
            <ButtonBase
              onClick={showModal}
              className="btn_add"
              label={"Import"}
              icon={<CloudUploadOutlined />}
            />
          </div>
        </div>
        <div className="review_data">
          <div>
            <span className="review_data_title">
              Danh sách chi tiết đợt đánh giá:
            </span>
          </div>
          <div>
            <Table
              dataSource={getListAssessorByReviewIdResponse?.data}
              columns={columns}
              pagination={false}
            />
          </div>
        </div>
      </div>
      <Modal
        title="Import danh sách đánh giá"
        open={isModalOpen}
        onOk={handleImport}
        onCancel={handleCancel}
        closeIcon={false}
        okText="Import"
        cancelText="Đóng"
      >
        <div className="review_modal">
          <Input
            type="file"
            onChange={fileHandler}
            accept=".xlsx,.xls"
            style={{ padding: "10px" }}
          />
        </div>
      </Modal>
    </div>
  );
};
export default ReviewDetail;
