import { Dropdown, MenuProps } from 'antd';
import './Header.css'
import { AppstoreOutlined, UserOutlined, DollarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Header = () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to={'/so-sanh-nhan-vien'} style={{color: 'black'}}>So sánh nhân viên</Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to={'/thong-tin-nhan-vien-danh-gia'} style={{color: 'black'}}>Thông tin nhân viên đánh giá</Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to={'/khai-bao-dot-danh-gia'} style={{color: 'black'}}>Khai báo đợt đánh giá</Link>
      ),
    },
  ];
  return (
    <div className='header__container'>
      <div className='LogoHome'>
        <a href='/'><img src="https://newinsite.thegioididong.com/content/bcnb2019/images/logo.png" alt="LogoHome" /></a>
      </div>
      <div className='nav__menu'>
        <ul>
          <Dropdown menu={{ items }} placement="bottomLeft" arrow>
            <li><span><AppstoreOutlined /></span>Lộ trình phát triển nghề nghiệp

            </li>
          </Dropdown>

        </ul>
      </div>
      <div className='nav__user'>

      </div>

      <div className='sub_menu'>
        <ul>
          <li><span><AppstoreOutlined /></span>Office</li>
          <li><span><UserOutlined /></span>HRM</li>
          <li><span><DollarOutlined /></span>Payroll</li>

        </ul>
      </div>
    </div>
  )
}
export default Header;
