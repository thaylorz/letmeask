import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

export function useCreateRoom() {
	const [newRoom, setNewRoom] = useState("");
	const { user } = useAuth();
	const history = useHistory();

	useEffect(() => {
		async function createNewRoom() {
			const roomRef = database.ref("rooms");

			const firebaseRoom = await roomRef.push({
				title: newRoom,
				authorId: user?.uid,
			});

			history.push(`/admin/room/${firebaseRoom.key}`);
		}

		if (newRoom) {
			createNewRoom();
		}
	}, [history, newRoom, user?.uid]);

	return { setNewRoom };
}
