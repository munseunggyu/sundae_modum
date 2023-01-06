import { useState } from "react";
import { useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
export const usePreview = (isProfile) => {
  const userInfo = useSelector((state) => state.user.currentUser);
  const [dbFile, setDbFile] = useState(isProfile && userInfo.photoURL);
  const [prevFile, setPrevFile] = useState(isProfile && userInfo.photoURL);
  const [metadata, setMetadata] = useState({});

  const preview = async (e) => {
    const files = e.target.files;
    console.log(files[0]);
    const file = await imageCompression(files[0], {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 340,
    });
    console.log(file);
    const reader = new FileReader();
    reader.onload = (finish) => {
      setPrevFile(finish.target.result);
    };
    reader.readAsDataURL(file);
    setDbFile(file);
    setMetadata({ contentType: file.type });
  };

  return { dbFile, prevFile, metadata, setPrevFile, preview, setDbFile };
};
