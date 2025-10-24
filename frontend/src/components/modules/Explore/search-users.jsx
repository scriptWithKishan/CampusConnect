import { useState } from "react"

import { SearchIcon } from "lucide-react"

import { getSearchedUsers } from "@/actions/get-users"
import { EachUser } from "../each-user"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const SearchUsers = () => {
    const [searchResults, setSearchResults] = useState([])
    const [searchContent, setSearchContent] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = await getSearchedUsers(searchContent);

        setSearchResults(data)
    }

    return (
        <div className="space-y-4">
            <form className="flex items-center gap-2" onSubmit={onSubmit}>
                <Input type="search" placeholder="Search" value={searchContent} onChange={(e) => setSearchContent(e.target.value)} required />
                <Button type="submit" variant="elevated" size="icon" className="bg-transparent">
                    <SearchIcon />
                </Button>
            </form>
            <div className="flex flex-col gap-y-4 p-2">
                {searchResults.map((user) => (
                    <EachUser key={user._id} userDetails={user} />
                ))}
            </div>
        </div>
    )
}