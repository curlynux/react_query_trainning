import { useEffect, useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

function Base() {
	const [name, setName] = useState([]);
	const [input, setInput] = useState(String);
	const [editMode, setEditMode] = useState(Boolean);
	const queryClient = useQueryClient();
	const queryFn = () => {
		return null;
	};
	const query = useQuery({
		queryKey: ["name"],
		queryFn: queryFn,
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
		setName([
			{ id: 1, text: "curlynux" },
			{ id: 2, text: "test" },
		]);
		setEditMode(false);
		console.log(editMode);
	}, []);

	function modifyText(Event) {
		console.log("id", parseInt(Event.target.parentNode.id));
		name.map((data) => {
			if (parseInt(Event.target.parentNode.id) === data.id) {
				mutation.mutate([{ text: input }]);
			}

			console.log(data);
		});
	}

	function editText(Event) {
		name.map((data) => {
			parseInt(Event.target.parentNode.id);
		});
		if (editMode === false) {
			setEditMode(true);
			console.log(typeof editMode);
			console.log(editMode);
		} else {
			setEditMode(false);
			console.log(editMode);
		}
	}
	return (
		<div className="container">
			{query.data?.map((data) => {
				return (
					<div key={data.id} id={data.id} className="data">
						<span>edit mode: {editMode.toString()}</span>
						<button onClick={editText} editprop={editMode.toString()}>
							edit
						</button>
						{editMode ? (
							<div key={data.id} id={data.id}>
								<input
									type="text"
									placeholder="type some text"
									value={input}
									onChange={(Event) => setInput(Event.target.value)}
								/>
								<button onClick={modifyText}>modify</button>
							</div>
						) : (
							<p>
								{" "}
								<span>id: {data.id}</span> salut, moi c'est {data.text}
							</p>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default Base;
