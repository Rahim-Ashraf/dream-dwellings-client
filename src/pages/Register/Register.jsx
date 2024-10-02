import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Register = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { emailRegister, updateUser } = useAuth();
    const [showPass, setShowPass] = useState(true);
    const [registerError, setRegisterError] = useState("")
    const [regisLoading, setRegisLoading] = useState(false)

    const handleEmailRegister = async (e) => {
        e.preventDefault();
        setRegisterError("");
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;

        if (password.length < 6) {
            setRegisterError("password should be atlest 6 charecter");
            return
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError("password should have atlast 1 capital letter");
            return
        } else if (!/[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(password)) {
            setRegisterError("password should have atlast 1 special charecter");
            return
        }
        setRegisLoading(true);
        const photo = e.target.photo.files[0];
        const formData = new FormData()
        formData.set('key', 'c2fde89598db76e7697f8f2bf3f338ec')
        formData.append("image", photo)
        const res = await axios.post("https://api.imgbb.com/1/upload", formData)
        const photoURL = res.data.data.image.url;

        emailRegister(email, password)
            .then((res) => {
                updateUser(name, photoURL)
                    .then(() => console.log("user updated"))
                    .catch(() => console.log("user not updated"))
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registration Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                setRegisLoading(false);
                axiosPublic.post("/users", { email: res.user.email, userName: name })
                navigate("/")
            })
            .catch(() => {
                setRegisLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Registration failed",
                    text: "Please try with another email"
                });
                console.log("error")
            })
    }
    return (
        <div className="card mt-10 shadow-2xl shadow-teal-200 max-w-screen-xl w-full md:w-2/3 lg:w-1/2 mx-auto">
            <div className="card-body">
                <form onSubmit={handleEmailRegister}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Photo</span>
                        </label>
                        <input type="file" name="photo" placeholder="Photo" className="file-input input-bordered" required />
                    </div>
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
                        <div className="relative">
                            <span onClick={() => setShowPass(!showPass)} className="absolute right-2 top-4">{showPass ? <FaEye className="cursor-pointer w-10" /> : <IoMdEyeOff className="cursor-pointer w-10" />}</span>
                            <input type={showPass ? "password" : "text"} name="password" placeholder="password" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    <p className="text-red-600">
                        {registerError}
                    </p>
                    <div className="form-control mt-6">
                        <button type="submit" disabled={regisLoading} className="btn bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">Register</button>
                    </div>
                </form>


                <div className="flex justify-between">
                    <div>
                        <span className="font-bold">Alredy Have an Account?</span>
                        <Link to="/login" className="text-blue-600 font-bold"> Login</Link>
                    </div>
                    <div>
                        <span className="font-bold">Go to </span><Link to="/" className="btn bg-gradient-to-br from-teal-500 to-[#0060f0] text-white font-semibold"> Home Page</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;