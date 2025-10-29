import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div style={{
            display: "flex",
            gap: "10px"
        }}>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/sign-up'>Sign Up</Link>
        </div>
    )
}

export default NavBar;