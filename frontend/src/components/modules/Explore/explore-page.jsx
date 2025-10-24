import React from "react";

import { Separator } from "@/components/ui/separator";

import { SearchUsers } from "./search-users";

const ExplorePage = () => {
  return (
    <div className="flex gap-2 min-h-screen h-full">
      <div className="w-1/4 p-10 hidden lg:block space-y-4">
        <h1 className="text-2xl font-semibold">Search</h1>
        <SearchUsers />
      </div>
      <Separator className="hidden lg:block" orientation="vertical" />
      <div className="p-5 lg:p-10 space-y-8 lg:w-2/4">
        <h1 className="text-2xl lg:text-4xl font-semibold">Trending Posts</h1>
      </div>
      <Separator className="hidden lg:block" orientation="vertical" />
      <div className="w-1/4 p-10 hidden lg:block">
        <h1 className="text-2xl font-semibold">Suggestion</h1>
      </div>
    </div>
  )
};

export default ExplorePage;
