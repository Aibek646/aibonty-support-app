import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <>
            <header className="header">
                <div className="logo">
                    <Link to="/">Support Desk</Link>
                </div>

                <ul>
                    {/* <ul>{user ? <li></li> : <li></li>}</ul> */}
                    <>
                        <li>
                            <Link to="/login">
                                <FaSignInAlt /> Login
                            </Link>
                        </li>

                        <li>
                            <Link to="/register">
                                <FaSignOutAlt /> Register
                            </Link>
                        </li>
                    </>
                </ul>
            </header>
        </>
    );
};

export default Header;
