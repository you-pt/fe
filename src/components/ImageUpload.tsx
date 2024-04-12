import axios from "axios";
import React, { useCallback, useState } from "react";

const ImageUpload = () => {
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setImg(e.target.files[0]);
  }, []);

  const handleUpload = async () => {
    if (!img) return;
    const formData = new FormData();
    formData.append("file", img);
    try {
      const res = await axios({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        baseURL: process.env.REACT_APP_BASE_URL,
        url: "/image/upload",
        data: formData,
      });
      if (res) {
        setImgUrl(res.data.url);
        const ai = await axios({
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          baseURL: process.env.REACT_APP_BASE_URL,
          url: "/gpt/processImageAndManageDietDB",
          data: {imageUrl: res.data.url},
        });
        console.log(ai);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        // ref={inputRef}
        onChange={onChange}
      />
      <button onClick={handleUpload}>업로드 버튼</button>
      <div>
        {imgUrl && `url : `}
        <u>
          <a className="text-red-500" href={`${imgUrl}`}>
            {imgUrl}
          </a>
        </u>
      </div>
    </div>
  );
};

export default ImageUpload;
