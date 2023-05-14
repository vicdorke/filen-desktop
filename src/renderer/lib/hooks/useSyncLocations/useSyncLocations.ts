import { useEffect, useState } from "react"
import useDb from "../useDb"
import { Location } from "../../../../types"

const useSyncLocations = (): Location[] => {
	let asyncUserId = 0
	const [data, setData] = useState<Location[]>([])
	const syncLocations: Location[] = useDb("syncLocations:" + asyncUserId, [])
	const userId: number = useDb("userId", 0)

	useEffect(() => {
		if (typeof userId === "number" && userId !== 0) {
			asyncUserId = userId
		}
	}, [userId])

	useEffect(() => {
		if (Array.isArray(syncLocations)) {
			setData(syncLocations)
		}
	}, [syncLocations])

	return data
}

export default useSyncLocations
