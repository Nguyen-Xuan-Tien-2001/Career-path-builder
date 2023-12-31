import { Routes, Route } from "react-router-dom";
import Map from "../Map/map";
import StaffReview from "../StaffReview/staffReview";
import CompareUser from "../CompareUser/compareUser";
import EmployeeReviewInformation from "../EmployeeReviewInformation/employeeReviewInformation";
import ReviewPeriod from "../ReviewPeriod/ReviewPeriod";
import ReviewDetail from "../ReviewDetail/ReviewDetail";
function Rout() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Map />} />
        <Route path={"/so-sanh-nhan-vien"} element={<CompareUser />} />
        <Route
          path={"/thong-tin-nhan-vien-danh-gia"}
          element={<EmployeeReviewInformation />}
        />
        <Route path={"/danh-gia-nhan-vien"} element={<StaffReview />} />
        <Route path={"/khai-bao-dot-danh-gia"} element={<ReviewPeriod />} />
        <Route
          path={"/khai-bao-dot-danh-gia/chi-tiet-dot-danh-gia/:reviewId"}
          element={<ReviewDetail />}
        />
      </Routes>
    </>
  );
}
export default Rout;
