import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Login = () => {
    const axiosPublic = useAxiosPublic();
    const { emailLogin, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation()

    const handleEmailLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        emailLogin(email, password)
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Loged In Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location.state ? `${location.state}` : "/");

            })
            .catch(error => {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email or Password incorrect"
                });
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then((res) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Loged In Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                axiosPublic.post("/users", { email: res.user.email, userName: res.user.displayName })
                navigate(location.state ? `${location.state}` : "/");
            })
            .catch(error => {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Login failed"
                });

            })

    }

    return (
        <div className="card mt-10 shadow-2xl shadow-teal-200 max-w-screen-xl w-full md:w-2/3 lg:w-1/2 mx-auto">
            <div className="card-body">
                <form onSubmit={handleEmailLogin}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">Login</button>
                    </div>
                </form>
                <div>
                    <p className="flex gap-4">
                        <span className="font-bold">Login with</span> <button onClick={handleGoogleLogin} className="text-4xl"><FcGoogle /></button>
                    </p>
                </div>
                <div className="flex justify-between">
                    <div>
                        <span className="font-bold">New here?</span>
                        <Link to="/register" className="text-blue-600 font-bold"> Register Now</Link>
                    </div>
                    <div>
                        <span className="font-bold">Go to </span><Link to="/" className="btn bg-gradient-to-br from-teal-500 to-[#0060f0] text-white font-semibold"> Home Page</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;