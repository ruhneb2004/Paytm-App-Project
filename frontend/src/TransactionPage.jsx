import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  firstNameAtom,
  recipientFirstNameAtom,
  recipientUserIdAtom,
  showModalAtom,
  tokenAtom,
} from "./store/token";
import axios from "axios";

export const TransactionPage = () => {
  const userName = useRecoilValue(firstNameAtom);
  const recipientName = useRecoilValue(recipientFirstNameAtom);
  const [amount, setAmount] = useState("");
  const recipientUserId = useRecoilValue(recipientUserIdAtom);

  const setShowModal = useSetRecoilState(showModalAtom);
  const token = useRecoilValue(tokenAtom);
  return (
    <div className="fixed inset-0 bg-black h-screen w-screen backdrop-blur-md bg-opacity-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] min-h-1/2 min-w-1/2 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-inner shadow-slate-500 flex  justify-center ">
        <div className="flex flex-col gap-11 mt-11 mb-11 w-full items-center">
          <div className="flex flex-col gap-4">
            <div className="text-3xl text-slate-100">Pay {recipientName}?</div>
            <div className="flex flex-col items-center text-slate-500">
              <div>from {userName}'s account</div>
              {/* <div>21/12/2004 Tuesday</div> */}
            </div>
          </div>

          <div className="w-full flex justify-center ">
            <div className="h-16 rounded-sm bg-slate-500 text-slate-200 text-2xl font-semibold w-9 flex items-center pl-2">
              Rs
            </div>
            <input
              type="text"
              className="h-16 w-3/4 outline-none px-2 rounded-sm bg-slate-500 text-slate-200 text-2xl font-semibold"
              onChange={async (e) => {
                await setAmount(e.target.value);
              }}
            />
          </div>
          <div className="w-full flex justify-between h-16 ">
            <button
              className="ml-[80px] text-slate-400 hover:underline active:text-slate-200"
              onClick={async () => {
                await setShowModal(false);
              }}
            >
              cancel
            </button>

            <button
              className="bg-slate-900 w-1/3 text-white rounded-lg shadow-inner shadow-slate-700 hover:bg-slate-800 transition-all active:w-[170px] font-semibold mr-[75px]"
              onClick={async () => {
                await setShowModal(false);

                axios.post(
                  "http://localhost:3000/api/v1/account/transfer",
                  {
                    to: recipientUserId,
                    amount,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
              }}
            >
              pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
