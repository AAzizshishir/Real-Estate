import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";

const RequestedProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all offers where agentEmail = current agent's email
  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["requestedProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?agentEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Accept mutation
  const { mutate: acceptOffer } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/offers/accept/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requestedProperties", user?.email]);
      Swal.fire("Accepted!", "The offer has been accepted.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to accept offer.", "error");
    },
  });

  // Reject mutation
  const { mutate: rejectOffer } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/offers/reject/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requestedProperties", user?.email]);
      Swal.fire("Rejected!", "The offer has been rejected.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to reject offer.", "error");
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Requested Properties</h2>

      {offers.length === 0 ? (
        <p className="text-gray-500">No requested properties yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Property Title</th>
                <th>Location</th>
                <th>Buyer Email</th>
                <th>Buyer Name</th>
                <th>Offered Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer._id}>
                  <td>{offer.title}</td>
                  <td>{offer.location}</td>
                  <td>{offer.buyerEmail}</td>
                  <td>{offer.buyerName}</td>
                  <td>${offer.offerAmount}</td>
                  <td>
                    <span
                      className={`
      px-2 py-1 rounded text-xs font-semibold
      ${offer.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
      ${offer.status === "accepted" ? "bg-green-100 text-green-800" : ""}
      ${offer.status === "rejected" ? "bg-red-100 text-red-800" : ""}
    `}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className="flex gap-2 mt-3.5">
                    <button
                      onClick={() => acceptOffer(offer._id)}
                      className="btn btn-success btn-sm"
                      disabled={
                        offer.status === "accepted" ||
                        offer.status === "rejected"
                      }
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectOffer(offer._id)}
                      className="btn btn-error btn-sm"
                      disabled={
                        offer.status === "accepted" ||
                        offer.status === "rejected"
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestedProperties;
