import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";


const Register = () => {
    const navigate = useNavigate()
    const { emailRegister, updateUser } = useAuth();
    const [showPass, setShowPass] = useState(true);
    const [registerError, setRegisterError] = useState("")

    const handleEmailRegister = async (e) => {
        e.preventDefault();
        setRegisterError("");
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.files[0];
        const formData = new FormData()
        formData.set('key', 'c2fde89598db76e7697f8f2bf3f338ec')
        formData.append("image", photo)
        console.log(photo, formData)
        const res = await axios.post("https://api.imgbb.com/1/upload", formData)
        const photoURL = res.data.data.image.url;

        if (password.length < 6) {
            setRegisterError("password should be atlest 6 charecter");
            return
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError("password should have atlast 1 capital letter");
            return
        } else if (!/[0-9]/.test(password)) {
            setRegisterError("password should have atlast 1 numeric character");
            return
        } else if (!/[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(password)) {
            setRegisterError("password should have atlast 1 special charecter");
            return
        }

        emailRegister(email, password)
            .then(async () => {
                updateUser(name, await photoURL)
                    .then(() => console.log("user updated"))
                    .catch(() => console.log("user not updated"))
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registration Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/")
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Registration failed"
                });
                console.log("error")
            })
    }
    return (
        <div data-aos="fade-up" data-aos-duration="2000" className="card mt-10 shadow-2xl bg-base-100 w-full md:w-2/3 lg:w-1/2 mx-auto">
            <div className="card-body">
                <form onSubmit={handleEmailRegister}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input type="file" name="photo" placeholder="Photo" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
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
                        <button type="submit" className="btn bg-[#0055ff] text-white">Register</button>
                    </div>
                </form>


                <div className="flex justify-between">
                    <div>
                        <span className="font-semibold">Alredy Have an Account?</span>
                        <Link to="/login" className="text-blue-600 font-bold"> Login</Link>
                    </div>
                    <div>
                        <span className="font-bold">Go to </span><Link to="/" className="btn bg-[#0055ff] text-white font-semibold"> Home Page</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;