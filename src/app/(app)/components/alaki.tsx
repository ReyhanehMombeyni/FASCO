"use client";
import { useUserStore } from "@/src/store";

const Alaki = () => {
  const userMe = useUserStore((state) => state.user);
console.log(userMe);

  return <div>
    Alaki
  </div>//<div>{userMe && <div>{userMe}</div>}</div>;
};

export default Alaki;
