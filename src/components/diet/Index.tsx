import ImageUpload from "./ImageUpload";
import { useState } from "react";
import AIReport from "./AIReport";
import axios from 'axios'

export interface diningType {
  "Carbohydrate(g)": string;
  "Energy (kcal)": string;
  "Fat(g)": string;
  "Food name": string;
  "Protein (g)": string;
}

export interface aiReportType {
  Dining: diningType[];
  "Nutrition Information": diningType[];
  "Evaluation of diet": string;
}

export default () => {
  const [img, setImg] = useState<File | null>(null)
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [aiReport, setAIReport] = useState<aiReportType | null>(null);

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
      if (res) setImgUrl(res.data.url);
      await handleAI(res.data.url)
    } catch (error) {
      console.log(error);
    }
  };

  const handleAI = async (url: string) => {
    try{
      const ai = await axios({
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        baseURL: process.env.REACT_APP_BASE_URL,
        url: "/gpt/processImageAndManageDietDB",
        data: { imageUrl: url },
      });
      if (ai) {
        setAIReport(ai.data);
      }
      console.log(ai.data)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="flex flex-row gap-6">
      <ImageUpload img={img} setImg={setImg} handleUpload={handleUpload} imgUrl={imgUrl} setImgUrl={setImgUrl} setAIReport={setAIReport}/>
      <AIReport aiReport={aiReport} />
    </div>
  );
};
