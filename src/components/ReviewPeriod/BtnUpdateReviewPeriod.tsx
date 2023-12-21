import { EditOutlined } from "@ant-design/icons";
import ButtonBase from "../ButtonBase/ButtonBase";
import {
  Col,
  DatePicker,
  DatePickerProps,
  Input,
  Modal,
  Row,
  Select,
  message,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./ReviewPeriod.scss";
import { UpdateReviewPeriodService } from "../../ApiServices/ReviewPeriodApi/UpdateReviewPeriod";
import moment from "moment";
interface PropsDt {
  data?: any;
  dataSelectPath?: any;
  callGetReviewByPathRefetch?: any;
  path?: any;
  setDataReviewTable?: any;
  getAllReviewRefetch?: any;
}

const BtnUpdateReviewPeriod = (props: PropsDt) => {
  const { updateReviewPeriodResponse, callUpdateReviewPeriodRefetch } =
    UpdateReviewPeriodService();
  const {
    dataSelectPath,
    data,
    callGetReviewByPathRefetch,
    getAllReviewRefetch,
  } = props;
  const dateFormat = "YYYY-MM-DD";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [path, setPath] = useState<any>(data.pathname);
  const [reviewName, setReviewName] = useState<string>(data.reviewname);
  const [timestart, setTimeStart] = useState<any>(
    dayjs(data.timestart, dateFormat)
  );
  const [timeend, setTimeEnd] = useState<any>(dayjs(data.timeend, dateFormat));
  const [dataselect, setDataSelect] = useState<any>(dataSelectPath);

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

  const handleOk = () => {
    if (timeend - timestart >= 0) {
      let update = {
        reviewid: data.reviewid,
        reviewname: reviewName,
        timestart: moment(timestart).format("YYYY-MM-DD"),
        timeend: moment(timeend).format("YYYY-MM-DD"),
      };
      callUpdateReviewPeriodRefetch(update);
      setIsModalOpen(false);
    } else {
      error("Ngày kết thúc phải sau ngày bắt đầu!");
    }
  };
  const HandleOpenModal = () => {
    setIsModalOpen(true);
    setReviewName(data.reviewname);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChangeStart: DatePickerProps["onChange"] = (date, dateString) => {
    setTimeStart(dayjs(dateString, dateFormat));
  };
  const onChangeEnd: DatePickerProps["onChange"] = (date, dateString) => {
    setTimeEnd(dayjs(dateString, dateFormat));
  };

  useEffect(() => {
    if (updateReviewPeriodResponse) {
      if (updateReviewPeriodResponse.status === "success") {
        if (data.pathid !== 0) {
          callGetReviewByPathRefetch(data.pathid);
        } else {
          getAllReviewRefetch();
        }
      }
    }
  }, [updateReviewPeriodResponse]);
  return (
    <>
      {contextHolder}
      <ButtonBase
        label="Sửa"
        icon={<EditOutlined />}
        className={"btn_edit"}
        onClick={HandleOpenModal}
      />
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
                options={dataselect?.dataSelectPath}
                onSelect={(e) => setPath(e)}
                value={data.pathname}
                disabled
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row>Đợt đánh giá:</Row>
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
    </>
  );
};
export default BtnUpdateReviewPeriod;
