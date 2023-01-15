import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { useAuthContext } from "./useAuthContext";
export const usePreview = (isProfile: any) => {
  // const userInfo = useSelector((state) => state.user.currentUser);
  const { state } = useAuthContext();
  const [dbFile, setDbFile] = useState(
    isProfile && state.currentUser?.photoURL
  );
  const [prevFile, setPrevFile] = useState(
    isProfile && state.currentUser?.photoURL
  );
  const [metadata, setMetadata] = useState({});

  const preview = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const compressionImg = await imageCompression(files[0], {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 340,
    });
    const reader = new FileReader();
    reader.onload = (finish: any) => {
      console.log(finish);

      setPrevFile(finish.target.result);
    };
    reader.readAsDataURL(compressionImg);
    setDbFile(compressionImg);
    setMetadata({ contentType: compressionImg.type });
  };

  return { dbFile, prevFile, metadata, setPrevFile, preview, setDbFile };
};
