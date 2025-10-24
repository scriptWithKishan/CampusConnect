import { useContext, useState } from "react"

import UserContext from "@/context/user-context"
import { toggleFollow } from "@/actions/toggle-follow"

import { Button } from "@/components/ui/button"

export const EachUser = ({ userDetails }) => {
    const {user} = useContext(UserContext)

    const [isFollowing, setIsFollowing] = useState(user?.following?.includes(userDetails._id))

    const onClickFollow = async () => {
        const result = await toggleFollow(userDetails._id)

        setIsFollowing(result)
    }

    return (
        <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-x-2">
                <img className="rounded-full w-8 h-8" src={userDetails.profilePic ?  userDetails.profilePic : "./profile-pic.jpg"} alt={userDetails.username} />
                <h1>{userDetails.username}</h1>
            </div>
            <Button onClick={onClickFollow} className="bg-transparent hover:bg-cyan-400" variant="elevated" size="sm">{isFollowing ? "Unfollow" : "Follow"}</Button>
        </div>
    )
}