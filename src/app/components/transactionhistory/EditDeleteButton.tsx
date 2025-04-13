import { useRouter } from "next/navigation";

type Props = {
    transactionId : string;
}

export default function EditDeleteButton({ transactionId }: Props) {
    const router = useRouter()
    async function handleDelete() {
        try {
            const response = await fetch(`/api/transactions/${transactionId}`, {
                method: 'DELETE',
            });
            
            if(!response.ok) {
                throw new Error("Failed to delete transaction");
            }
            window.location.reload();
        } catch (error) {
            console.error("Error deleting transaction: ", error);
        }
    }

    return (
        <div className="edit-delete-button-container">
            <button className="bg-gray-200 rounded-md px-2.5 border p-1 hover:bg-black hover:text-white m-1.5">Edit</button>
            <button onClick={handleDelete} className="bg-gray-200 rounded-md px-2.5 border p-1 hover:bg-black hover:text-white m-1.5">Delete</button>
        </div>
    )
}