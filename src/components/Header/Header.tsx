import './Header.css'
import { AppstoreOutlined, UserOutlined, DollarOutlined } from '@ant-design/icons';

const Header = () => {
  return (
    <div className='header__container'>
      <div className='LogoHome'>
        <a href='/'><img src="https://newinsite.thegioididong.com/content/bcnb2019/images/logo.png" alt="LogoHome" /></a>
      </div>
      <div className='nav__menu'>
        <ul>
          <li><span><AppstoreOutlined /></span>Office</li>
          <li><span><UserOutlined /></span>HRM</li>
          <li><span><DollarOutlined /></span>Payroll</li>

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
