import axios from "axios";
import React, { useCallback, useRef, useState } from "react";

const ImageUpload = () => {
  const [img, setImg] = useState<File | null>(null)

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setImg(e.target.files[0])
  }, []);

  const handleUpload = () => {
    if (!img) return;
    const formData = new FormData();
    formData.append("image", img);
    axios({
      method: "post",
      baseURL: "http://172.22.0.2:3001",
      url: "/images",
      data: formData,
    })
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        // ref={inputRef}
        onChange={onChange}
      />
      <button onClick={handleUpload}>업로드 버튼</button>
    </div>
  );
};

export default ImageUpload;
