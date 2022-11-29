import { confirmAlert } from 'react-confirm-alert';

const handleVertical = (
  userId,
  writerId,
  title1,
  title1Fc,
  title2,
  title2Fc
) => {
  if (userId === writerId) {
    confirmAlert({
      title: title1,
      buttons: [
        {
          label: '확인',
          onClick: () => {
            title1Fc();
          },
        },
        {
          label: '취소',
        },
      ],
    });
  } else {
    confirmAlert({
      title: title2,
      buttons: [
        {
          label: '확인',
          onClick: () => {
            title2Fc(writerId);
          },
        },
        {
          label: '취소',
        },
      ],
    });
  }
};

export default handleVertical;
