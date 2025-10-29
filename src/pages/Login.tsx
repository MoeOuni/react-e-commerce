import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    function navigateToSignup() {
        navigate('/sign-up');
    }

    return (
    <div>Login Page
        <button onClick={navigateToSignup}>Signup</button>
    </div>)
}

export default Login;