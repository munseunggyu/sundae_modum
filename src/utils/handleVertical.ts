import { confirmAlert } from "react-confirm-alert";

const handleVertical = (
  userId: any,
  writerId: any,
  title1: any,
  title1Fc: any,
  title2: any,
  title2Fc: any
) => {
  if (userId === writerId) {
    confirmAlert({
      title: title1,
      buttons: [
        {
          label: "확인",
          onClick: () => {
            title1Fc();
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
            title2Fc({ otherUser: writerId, userId: userId });
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
