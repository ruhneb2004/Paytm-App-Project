import axios from "axios";
import { User } from "./UserComponent";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { firstNameAtom, showModalAtom, tokenAtom } from "./store/token";
import { TransactionPage } from "./TransactionPage";

export const Dashboard = () => {
  const showModal = useRecoilValue(showModalAtom);
  const [filter, setFilter] = useState("");
  // const currentUser = useRecoilValue(userSelector);
  const [users, setUsers] = useState([]);
  const token = useRecoilValue(tokenAtom);
  const firstName = useRecoilValue(firstNameAtom);

  const [balanceDecimal, setBalanceDecimal] = useState(0);
  // console.log("🚀 ~ Dashboard ~ balanceDecimal:", balanceDecimal);
  const balance = balanceDecimal.toFixed(2);
  // console.log("🚀 ~ Dashboard ~ balance:", balance);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        // console.log("🚀 ~ .then ~ res:", res);
        await setUsers(res.data.user);
        // console.log("🚀 ~ .then ~ setUsers:", users);
      });
  }, [filter]);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`http://localhost:3000/api/v1/account/balance`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (res) => {
          // console.log("🚀 ~ .then ~ res:", res.data.balance);
          await setBalanceDecimal(res.data.balance);
          // console.log("🚀 ~ .then ~ setUsers:", users);
        });
    }, 2000);
  }, [showModal, token, balanceDecimal]);

  return (
    <div className="px-[200px] py-11  h-full min-h-screen flex flex-col gap-8 bg-gradient-to-b from-slate-300 to-slate-800">
      <div className="border-b-2 flex justify-between  items-baseline overflow-y-auto">
        <div
          className="font-kolkar text-6xl text-slate-900"
          style={{ fontFamily: "Kolker Brush" }}
        >
          Kunher's App
        </div>
        <div className="flex gap-2 font-kolkar items-center mb-3">
          {/* {console.log("firstName " + firstName)} */}
          <div className="text-slate-900">Hello, {firstName}</div>
          <div className="bg-slate-700 w-12 h-12 rounded-full "></div>
        </div>
      </div>
      <div className=" w-1/2 min-h-[250px] min-w-[500px] h-1/4 flex flex-col items-center justify-center relative rounded-3xl shadow-inner shadow-white bg-slate-600 bg-opacity-25">
        <div className="absolute top-10 left-[60px] text-zinc-500">balance</div>
        <div className="text-6xl flex items-baseline">
          <div className=" text-slate-800">$</div>
          <div className="text-9xl text-slate-800">{balance}</div>
        </div>
      </div>
      <div className="flex justify-center">
        <input
          onChange={async (e) => {
            await setFilter(e.target.value);
          }}
          className=" w-3/4 h-16 rounded-lg p-5 outline-none bg-slate-500 shadow-lg text-xl transition-all focus:bg-slate-600 text-white"
          type="text"
          placeholder="search user"
        />
      </div>
      <div className=" divide-y divide-slate-900">
        {users.map((user, key) => {
          return (
            <User
              firstName={user.firstName}
              lastName={user.lastName}
              key={key}
              userId={user._id}
            />
          );
        })}
      </div>
      {showModal ? <TransactionPage /> : null}
    </div>
  );
};
