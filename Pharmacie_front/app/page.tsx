import React from "react";
import Landing from "./Landing";
import Products from "./products";
import Animation from "./landAnimation";
import SellButton from "./sellButton";
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen mb-20">
      <Landing />
      <Animation/>
      <Products />
      <SellButton/>
    </main>
  );
}



