import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserRole from "../../../hooks/useUserRole";
import useAuth from "../../../hooks/useAuth";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { role: loggedInRole } = useUserRole(user?.email);
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Confirm dialog helper
  const confirmAction = async (title, text, confirmButtonText) => {
    const result = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: "Cancel",
    });
    return result.isConfirmed;
  };

  // Make Admin mutation
  const { mutate: makeAdmin, isLoading: loadingAdmin } = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.patch(`/users/admin/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "User is now an Admin.", "success");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to make admin.",
        "error"
      );
    },
  });

  // Make Agent mutation
  const { mutate: makeAgent, isLoading: loadingAgent } = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.patch(`/users/agent/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "User promoted to Agent.", "success");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to make agent.",
        "error"
      );
    },
  });

  // Delete User mutation
  const { mutate: deleteUser, isLoading: loadingDelete } = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.delete(`/users/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "User has been deleted.", "success");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to delete user.",
        "error"
      );
    },
  });

  // Mark Fraud mutation
  const { mutate: markFraud, isLoading: loadingFraud } = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.patch(`/users/fraud/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "User marked as Fraud.", "success");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to mark fraud.",
        "error"
      );
    },
  });

  // Handle button click with confirmation
  const handleAction = async (
    actionFn,
    userId,
    confirmTitle,
    confirmText,
    confirmBtnText
  ) => {
    const confirmed = await confirmAction(
      confirmTitle,
      confirmText,
      confirmBtnText
    );
    if (confirmed) {
      actionFn(userId);
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">User Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4 flex flex-wrap gap-2">
                <button
                  disabled={loadingAdmin}
                  className="btn btn-sm btn-success"
                  onClick={() =>
                    handleAction(
                      makeAdmin,
                      user._id,
                      "Make Admin?",
                      "Are you sure you want to make this user an admin?",
                      "Yes, Make Admin"
                    )
                  }
                >
                  {loadingAdmin ? "Updating..." : "Make Admin"}
                </button>

                <button
                  disabled={loadingAgent}
                  className="btn btn-sm btn-info"
                  onClick={() =>
                    handleAction(
                      makeAgent,
                      user._id,
                      "Make Agent?",
                      "Are you sure you want to promote this user to agent?",
                      "Yes, Make Agent"
                    )
                  }
                >
                  {loadingAgent ? "Updating..." : "Make Agent"}
                </button>
                {loggedInRole === "admin" && user.role === "agent" && (
                  <button
                    disabled={loadingFraud}
                    className="btn btn-sm btn-warning"
                    onClick={() =>
                      handleAction(
                        markFraud,
                        user._id,
                        "Mark as Fraud?",
                        "Are you sure you want to mark this user as fraud?",
                        "Yes, Mark Fraud"
                      )
                    }
                  >
                    {loadingFraud ? "Updating..." : "Mark Fraud"}
                  </button>
                )}
                <button
                  disabled={loadingDelete}
                  className="btn btn-sm btn-error"
                  onClick={() =>
                    handleAction(
                      deleteUser,
                      user._id,
                      "Delete User?",
                      "Are you sure you want to delete this user? This action cannot be undone.",
                      "Yes, Delete"
                    )
                  }
                >
                  {loadingDelete ? "Deleting..." : "Delete User"}
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="3" className="py-4 text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
