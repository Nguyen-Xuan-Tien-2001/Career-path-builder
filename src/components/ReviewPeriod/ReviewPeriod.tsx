import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Modal,
  Space,
  DatePicker,
  DatePickerProps,
  Table,
  Form,
  message,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";
import {
  HomeOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  IssuesCloseOutlined,
  CloseOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";

import "./ReviewPeriod.scss";
import ButtonBase from "../ButtonBase/ButtonBase";
import { GetAllPath } from "../../ApiServices/ReviewPeriodApi/GetAllPath";
import { GetReviewByPathService } from "../../ApiServices/ReviewPeriodApi/GetReviewByPath";
import { GetAllReview } from "../../ApiServices/ReviewPeriodApi/GetAllReview";
import moment from "moment";
import { AddReviewPeriodService } from "../../ApiServices/ReviewPeriodApi/AddReviewPeriod";
import BtnUpdateReviewPeriod from "./BtnUpdateReviewPeriod";
import { useNavigate } from "react-router";
interface DataType {
  key: string;
  reviewperiod: string;
  startDate: string;
  endDate: string;
  pathName: string;
}
const dateFormat = "YYYY-MM-DD";
const ReviewPeriod = () => {
  const navigate = useNavigate();
  const { getAllPathResponse } = GetAllPath();
  const { GetReviewByPathResponse, callGetReviewByPathRefetch } =
    GetReviewByPathService();
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

  const [dataSelectReview, setDataSelectReview] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [path, setPath] = useState<any>("Chọn lộ trình");
  const [reviewName, setReviewName] = useState<any>();
  const [timestart, setTimeStart] = useState<any>(
    dayjs()
  );
  const [timeend, setTimeEnd] = useState<any>(dayjs("2023-12-01", dateFormat));
  const [dataReviewTable, setDataReviewTable] = useState<any>();
  const [optionReviewPeriod, setOptionReviewPeriod] = useState<any>(0);
  const [review, setReview] = useState(0);
  useEffect(() => {
    if (getAllReviewResponse) {
      setDataReviewTable(getAllReviewResponse.data);
      setDataSelectReview(
        getAllReviewResponse!.data!.map((val: any, index: number) => {
          return {
            value: val.reviewid,
            label: val.reviewname,
          };
        })
      );
    }
  }, [getAllReviewResponse]);
  useEffect(() => {
    if (GetReviewByPathResponse) {
      if (GetReviewByPathResponse.status === "success") {
        setOptionReviewPeriod(GetReviewByPathResponse.data);
        setDataReviewTable(GetReviewByPathResponse.data);
      }
    }
  }, [GetReviewByPathResponse]);
  const dataSelectPath = getAllPathResponse?.data?.map(
    (val: any, index: number) => {
      return {
        value: val.pathid,
        label: val.pathname,
      };
    }
  );
  const [messageApi, contextHolder] = message.useMessage();
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

  useEffect(() => {
    if (addReviewPeriodResponse) {
      console.log('response', addReviewPeriodResponse);
      
      if (addReviewPeriodResponse.status === "success") {
        success("Thêm mới đợt đánh giá thành công");
        callGetReviewByPathRefetch(path);
      }
    }
  }, [addReviewPeriodResponse]);

  const handleOk = () => {
    if (timeend - timestart <= 0) {
      error("Ngày kết thúc phải sau ngày bắt đầu!");
    }
    else if(!reviewName){
      error("Tên đợt đánh giá không được trống!");
    }
    else {
      let data = {
        reviewname: reviewName,
        timestart: moment(timestart).format("YYYY-MM-DD"),
        timeend: dayjs(timeend).format("YYYY-MM-DD"),
        pathid: path,
        pathname: "pathname",
      };
      callReviewPeriodRefetch(data);
      setPath(path);
      setReviewName("");
      setTimeStart(dayjs());
      setTimeEnd(dayjs());
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChangeStart = (date:any) => {

    setTimeStart(date);
    
    
  };
  // console.log('timestart', timestart);
  const onChangeEnd = (date:any) => {
    
    
    setTimeEnd(date);
  };
  useEffect(()=>{
    console.log(timeend);
  },[timeend])
  // console.log('timeend', timeend);
  const dataColumn: ColumnsType<DataType> = [
    {
      title: "STT",
      key: "key",
      render: (_,i: any, index: number) => {return index+1}
    },
    {
      title: "Đợt đánh giá",
      dataIndex: "reviewname",
      key: "reviewperiod",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "timestart",
      key: "timestart",
      render: (i: any) => {
        const formatdate = moment(i).format("DD/MM/YYYY");
        return <>{formatdate}</>;
      },
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "timeend",
      key: "timeend",
      render: (i: any) => {
        const formatdate = moment(i).format("DD/MM/YYYY");
        return <>{formatdate}</>;
      },
    },
    {
      title: "Lộ trình",
      dataIndex: "pathname",
      key: "pathName",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (index: any) => {
        return (
          <>
            <Space direction="vertical" id={index.key}>
              <BtnUpdateReviewPeriod
                callGetReviewByPathRefetch={callGetReviewByPathRefetch}
                setDataReviewTable={setDataReviewTable}
                dataSelectPath={dataSelectPath}
                data={index}
                getAllReviewRefetch={getAllReviewRefetch}
              />
              <ButtonBase
                label="Chi tiết"
                icon={<IssuesCloseOutlined />}
                className={"btn_detail"}
                onClick={() => {
                  navigate(
                    `/khai-bao-dot-danh-gia/chi-tiet-dot-danh-gia/${index.reviewid}`
                  );
                }}
              />
              {/* <ButtonBase label='Xóa' icon={<CloseOutlined />} className={'btn_delete'} /> */}
            </Space>
          </>
        );
      },
    },
  ];

  function handleOnselect(e: any) {
    setPath(e);
  }
  function handleOnselectReview(e: any) {
    setReview(e);
  }
  function handleOnsubmitSearch() {
    callGetReviewByPathRefetch(path);
  }

  return (
    <div className="review">
      {contextHolder}
      <div className="review_container">
        <div className="review_header">
          <HomeOutlined className="icon_home" />
          <CaretRightOutlined className="icon_navigateNext" />
          <span>Khai báo đợt đánh giá</span>
        </div>
        <div className="review_filter">
          <Row>
            <Col>
              <Row>Tìm kiếm:</Row>
              <Input
                style={{
                  width: 300 + "px",
                  marginTop: 10,
                  marginRight: "40px",
                }}
                placeholder="Nhập từ khoá để tìm kiếm"
              />
            </Col>

            <Col>
              <Row>Lộ trình:</Row>
              <Select
                style={{
                  width: 300 + "px",
                  marginTop: 10,
                  marginRight: "40px",
                }}
                placeholder="---Lộ trình---"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={dataSelectPath}
                onSelect={(e) => handleOnselect(e)}
                value={path}
              />
            </Col>
          </Row>
          <div className="review_btn">
            <ButtonBase
              onClick={handleOnsubmitSearch}
              icon={<SearchOutlined />}
              label="Tìm kiếm"
            />
            <ButtonBase
              onClick={showModal}
              icon={<PlusOutlined />}
              className="btn_add"
              label="Khai báo mới"
            />
          </div>
        </div>
        <div className="review_data">
          <div>
            <span style={{ color: "#055586", fontSize: 30 + "px" }}>
              Kết quả khai báo:
            </span>
          </div>
          <div>
            <Table dataSource={dataReviewTable} columns={dataColumn} />
          </div>
        </div>
      </div>
      <Modal
        title="Khai báo đợt đánh giá"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={false}
        okText="Lưu"
        cancelText="Đóng"
      >
        <div className="review_modal">
          <Row>
            <Col span={24}>
              <Row>Lộ trình:</Row>
              <Select
                style={{ width: "100%", marginTop: 10 }}
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
              <Row>Tên đợt đánh giá:</Row>
              <Input
                style={{ marginTop: 10 }}
                onChange={(e: any) => setReviewName(e.target.value)}
                placeholder="Nhập đợt đánh giá"
                value={reviewName}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row>Ngày bắt đầu đánh giá:</Row>
              <DatePicker
                style={{ marginTop: 10, width: "100%" }}
                onChange={onChangeStart}
                placeholder="Ngày bắt đầu đánh giá"
                value={timestart}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row>Ngày kết thúc đánh giá:</Row>
              <DatePicker
                style={{ marginTop: 10, width: "100%" }}
                onChange={onChangeEnd}
                placeholder="Ngày kết thúc đánh giá"
                value={timeend}
                status={timeend - timestart < 0 ? "error" : ""}
              />
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};
export default ReviewPeriod;
