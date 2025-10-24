import { useEffect, useState } from "react"

import { getFollowDetails } from "@/actions/get-users"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export const FollowDetails = () => {
    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])

    useEffect(() => {
        const fetchFollowDetails = async () => {
            const data = await getFollowDetails();

            setFollowers(data.followers);
            setFollowing(data.following);
        }
        fetchFollowDetails();
    })

    return (
        <div className="flex flex-row gap-x-4">
            <Button asChild variant="elevated" className="bg-transparent">
                <h1 className="text-xl">{followers.length} Followers</h1>
            </Button>
            <Separator orientation="vertical" />
            <Button variant="elevated" asChild className="bg-transparent">
                <h1 className="text-xl">{following.length} Following</h1>
            </Button>
        </div>
    )
}

