import { useEffect, useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

function Base() {
	const [name, setName] = useState([]);
	const queryClient = useQueryClient();
	const query = useQuery({
		queryKey: ["name"],
		refetchInterval: 5000,
	});
	queryClient.setQueryData(["name"], name);
	const mutation = useMutation(
		(newName) => {
			setName(newName);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries();
			},
		}
	);
	useEffect(() => {
		setName([{ id: 1, text: "curlynux" }]);
	}, []);

	function modifyText() {
		mutation.mutate([{ text: "HEHEHEE" }]);
	}
	return (
		<div>
			{query.data?.map((blaze) => {
				return <p>salut, moi c'est {blaze.text}</p>;
			})}
			<button onClick={modifyText}>modify</button>
		</div>
	);
}

export default Base;
