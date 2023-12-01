import { Routes, Route } from "react-router-dom";
import Map from "../Map/map";
import StaffReview from "../StaffReview/staffReview";

function Rout() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Map/>}/>
                <Route path={'/so-sanh-nhan-vien'} />
                <Route path={'/thong-tin-nhan-vien-danh-gia'}/>
                <Route path={'/danh-gia-nhan-vien'} element={<StaffReview/>}/>
                <Route path={'/khai-bao-dot-danh-gia'}/>
                <Route path={'/khai-bao-dot-danh-gia/chi-tiet-dot-danh-gia'}/>
            </Routes>
        </>
    )
}
export default Rout;