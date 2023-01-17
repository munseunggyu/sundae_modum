import { confirmAlert } from "react-confirm-alert";
import { IHandleVertical } from "../types/utils";

const handleVertical = ({
  userId,
  writerId,
  title1,
  deleteFc,
  title2,
  setDM,
}: IHandleVertical) => {
  if (userId === writerId) {
    confirmAlert({
      title: title1,
      buttons: [
        {
          label: "확인",
          onClick: () => {
            deleteFc();
          },
        },
        {
          label: "취소",
        },
      ],
    });
  } else {
    confirmAlert({
      title: title2,
      buttons: [
        {
          label: "확인",
          onClick: () => {
            if (writerId && userId)
              setDM({ otherUser: writerId, userId: userId });
          },
        },
        {
          label: "취소",
        },
      ],
    });
  }
};

export default handleVertical;
