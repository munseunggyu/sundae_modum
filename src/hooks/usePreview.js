import { useState } from "react";
import { useSelector } from "react-redux";

export const usePreview = (isProfile) => {
  const userInfo = useSelector((state) => state.user.currentUser);
  const [dbFile, setDbFile] = useState(isProfile && userInfo.photoURL);
  const [prevFile, setPrevFile] = useState(isProfile && userInfo.photoURL);
  const [metadata, setMetadata] = useState({});

  const preview = (e) => {
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = (finish) => {
      setPrevFile(finish.target.result);
    };
    reader.readAsDataURL(files[0]);
    setDbFile(files[0]);
    setMetadata({ contentType: files[0].type });
  };

  return { dbFile, prevFile, metadata, setPrevFile, preview, setDbFile };
};
