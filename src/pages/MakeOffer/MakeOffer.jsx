import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const MakeOffer = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()

    const [property, setProperty] = useState([])
    useEffect(() => {
        axiosSecure.get(`/property-details?id=${id}`)
            .then(res => setProperty(res.data))
    }, [axiosSecure, id])

    const { price_range } = property
    const [priceRangeError, setPriceRangeError] = useState("")
    const handleMakeOffer = (e) => {
        e.preventDefault()
        setPriceRangeError("")
        const form = e.target
        const property_title = form.property_title.value;
        const property_location = form.property_location.value;
        const agent_name = form.agent_name.value;
        const agent_email = property.agent_email;
        const offered_amount = form.offered_amount.value;
        const splitedPriceRange = price_range.split("-");
        if (offered_amount < parseInt(splitedPriceRange[0]) || offered_amount > parseInt(splitedPriceRange[1])) {
            setPriceRangeError(`please select a price between ${price_range}`)
            return
        }
        const buyer_email = form.buyer_email.value;
        const buyer_name = form.buyer_name.value;
        const buying_date = form.buying_date.value;
        const data = {
            property_id: property._id,
            property_title,
            property_image: property.property_image,
            property_location,
            agent_name,
            agent_email,
            offered_amount,
            buyer_email,
            buyer_name,
            buying_date,
            verification_status: "pending"
        }
        axiosSecure.post("/make-offer", data)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Offer send",
                })
            })
    }

    return (
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleMakeOffer} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Property title</span>
                    </label>
                    <input type="text" name="property_title" disabled defaultValue={property.property_title} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Property location</span>
                    </label>
                    <input type="text" name="property_location" disabled defaultValue={property.property_location} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Agent name</span>
                    </label>
                    <input type="text" name="agent_name" disabled defaultValue={property.agent_name} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Offered amount</span>
                    </label>
                    <input type="text" name="offered_amount" placeholder={price_range} className="input input-bordered" required />
                    <p className="text-red-600">{priceRangeError}</p>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">buyer email</span>
                    </label>
                    <input type="text" name="buyer_email" disabled defaultValue={user.email} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">buyer name</span>
                    </label>
                    <input type="text" name="buyer_name" disabled defaultValue={user.displayName} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">buying date</span>
                    </label>
                    <input type="date" name="buying_date" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Offer</button>
                </div>
            </form>
        </div>
    );
};

export default MakeOffer;