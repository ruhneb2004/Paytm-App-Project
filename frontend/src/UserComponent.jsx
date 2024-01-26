import { useSetRecoilState } from "recoil";
import {
  recipientFirstNameAtom,
  recipientUserIdAtom,
  showModalAtom,
} from "./store/token";

export const User = ({ firstName, userId, lastName }) => {
  const setRecipientUserId = useSetRecoilState(recipientUserIdAtom);
  const setShowModal = useSetRecoilState(showModalAtom);
  const setRecipientName = useSetRecoilState(recipientFirstNameAtom);

  // console.log(userId);
  return (
    <div className="flex -b-2 border-slate-700 h-24 items-center p-7 justify-between ">
      <div className="flex items-center gap-4">
        <div className="bg-slate-800 w-16 h-16 rounded-full"></div>
        <div className="text-xl text-black">
          {firstName} {lastName}
        </div>
      </div>
      <div>
        <button
          className="bg-slate-800 text-white px-10 py-4 rounded-lg transition hover:bg-slate-900 active:bg-slate-950 font-semibold"
          onClick={async () => {
            try {
              // console.log("button clicked");
              await setShowModal(true);
              // console.log("setShowModal executed");
              await setRecipientUserId(userId);
              // console.log("setRecipientUserId executed");
              await setRecipientName(firstName);
              // console.log("setRecipientName executed");
              // console.log(firstName);
            } catch (error) {
              console.error("Error in onClick handler:", error);
            }
          }}
        >
          send money
        </button>
      </div>
    </div>
  );
};
