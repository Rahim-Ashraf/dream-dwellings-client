import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";


const Register = () => {
    const navigate = useNavigate()
    const { emailRegister, updateUser } = useAuth();
    const [showPass, setShowPass] = useState(true);
    const [registerError, setRegisterError] = useState("")
    const handleEmailRegister = (e) => {
        e.preventDefault();
        setRegisterError("");
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photoURL = e.target.photoURL.value;

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
            .then(() => {
                updateUser(name, photoURL)
                    .then(() => console.log("user updated"))
                    .catch(() => console.log("user not updated"))
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Loged In Successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                navigate("/")
            })
            .catch(() => {
                // toast.error("Emai already exist");
                // console.log("error")
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
                            <span className="label-text">photoURL</span>
                        </label>
                        <input type="text" name="photoURL" placeholder="photoURL" className="input input-bordered" required />
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
                        <button type="submit" className="btn bg-emerald-600 text-white">Register</button>
                    </div>
                </form>


                <div>
                    <span>Alredy Have an Account?</span>
                    <Link to={"/login"} className="text-blue-600 font-bold"> Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;