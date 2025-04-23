import { detectConflictingPaths } from "next/dist/build/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
    transactionId : string;
}

export default function EditDeleteButton({ transactionId }: Props) {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleDelete() {
        setLoading(true);
        setError('');
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
            setError("Error deleting transaction. ");
        } finally {
            setLoading(false);
        }
    }

    async function handleEdit() {
        router.push(`editTransaction/${transactionId}`);

    }

    return (
        <div className="edit-delete-button-container">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button onClick={handleEdit} disabled={loading} className="bg-gray-200 rounded-md px-2.5 border p-1 hover:bg-black hover:text-white m-1.5">Edit</button>
            <button onClick={handleDelete} disabled={loading} className="bg-gray-200 rounded-md px-2.5 border p-1 hover:bg-black hover:text-white m-1.5">
                {loading ? "deleting..." : "Delete"}
                </button>
        </div>
    )
}