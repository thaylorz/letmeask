import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type RoomType = {
	id: string;
	authorId: string;
	title: string;
};

export function useRooms() {
	const [rooms, setRooms] = useState<RoomType[]>([]);

	useEffect(() => {
		const roomsRef = database.ref("rooms");

		roomsRef.once("value", (rooms) => {
			const databaseRooms: RoomType[] = rooms.val();
			const parsedRooms = Object.entries(databaseRooms).map(
				([key, value]) => {
					return {
						id: key,
						authorId: value.authorId,
						title: value.title,
					};
				}
			);

			setRooms(parsedRooms);
		});

		return () => {
			roomsRef.off("value");
		};
	}, []);

	return { rooms };
}
