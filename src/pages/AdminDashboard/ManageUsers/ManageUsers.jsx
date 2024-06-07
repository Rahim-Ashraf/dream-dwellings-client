import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const ManageUsers = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        }
    })

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users?id=${user._id}`, { role: "admin" })
            .then(res => {
                console.log(res.data)
                refetch();
            })
    }
    const handleMakeagent = (user) => {
        axiosSecure.patch(`/users?id=${user._id}`, { role: "agent" })
            .then(res => {
                console.log(res.data)
                refetch();
            })
    }
    const handleDeleteUser = (user) => {
        axiosSecure.delete(`/users?id=${user._id}`)
            .then(res => {
                console.log(res.data)
                refetch();
            })
    }
    const handleMarkFraud = (user) => {
        axiosSecure.patch(`/fraud-users?id=${user._id}`, { is_fraud: "fraud" })
            .then(res => {
                console.log(res.data)
                refetch();
            })
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>User name</th>
                        <th>User email</th>
                        <th>Role</th>
                        <th className="text-center">Change role</th>
                        <th>Price range</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, idx) => <tr key={user._id}>
                            <th>{idx + 1}</th>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td className="font-bold">{user.role ? user.role : "User"}</td>
                            <td className="space-y-1">
                                {user.is_fraud ? <h4 className="font-bold text-red">Fraud</h4> : <>
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm bg-[#0055ff] text-white">Make Admin</button>
                                        <button onClick={() => handleMakeagent(user)} className="btn btn-errorf btn-sm bg-[#0055ff] text-white">Make Agent</button>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        {user.role === "agent" && <button onClick={() => handleMarkFraud(user)} className="btn btn-errorf btn-sm btn-error">Mark as fraud</button>}
                                        <button onClick={() => handleDeleteUser(user)} className="btn btn-errorf btn-sm btn-error">Delete User</button>
                                    </div>
                                </>}
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;