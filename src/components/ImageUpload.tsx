import axios from "axios";
import React, { useCallback, useState } from "react";

const ImageUpload = () => {
  const [img, setImg] = useState<File | null>(null);

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
      try{
        await axios({
          headers: {
            "Content-Type": "multipart/form-data",
          },
          method: "POST",
          baseURL: "http://127.0.0.1:3001",
          url: "/image/upload",
          data: formData,
        });
      }catch(error){
        console.log(error)
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
    </div>
  );
};

export default ImageUpload;
