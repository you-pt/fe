import ImageUpload from "./ImageUpload";
import { useEffect, useState } from "react";
import AIReport from "./AIReport";
import axios from "axios";

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
  Evaluation: string;
}

export default () => {
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [aiReport, setAIReport] = useState<aiReportType | any>();
  const [mealId, setMealId] = useState<number>(0);
  const [newReport, setNewReport] = useState<string>("");
  const [loading, setLoading] = useState<0 | 1 | 2>(0); // 0: 로딩 x | 1: 로딩 중 | 2: 실패

  useEffect(() => {
    setLoading(0);
  }, [aiReport]);

  const handleUpload = async () => {
    if (!img) return;
    setLoading(1);
    const formData = new FormData();
    formData.append("file", img);
    try {
      const res = await axios({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        url: "/image/upload",
        data: formData,
      });
      if (res) setImgUrl(res.data.url);
      await handleAI(res.data.url);
    } catch (error) {
      setLoading(2);
      console.log(error);
    }
  };

  const handleAI = async (url: string) => {
    try {
      const ai = await axios({
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        url: "/gpt/processImageAndManageDietDB",
        data: { imageUrl: url },
      });
      if (ai) {
        setAIReport(ai.data);
      }
      console.log(ai.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveMeal = async () => {
    if (!aiReport) return;
    try {
      const response = await axios({
        method: "POST",
        url: "/gpt/saveMeal",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        data: { reportAI: aiReport },
      });
      if (response) {
        console.log("Meal saved:", response.data);
      }
    } catch (error) {
      console.error("Save meal error:", error);
    }
  };

  const reportMeal = async () => {
    if (!newReport || !mealId) return;
    try {
      const response = await axios({
        method: "PATCH",
        url: `/gpt/reportMeal/${mealId}`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        data: { report: newReport },
      });
      if (response) {
        console.log("Meal updated:", response.data);
      }
    } catch (error) {
      console.error("Update meal error:", error);
    }
  };

  return (
    <div className="flex flex-row gap-6">
      <ImageUpload
        img={img}
        setImg={setImg}
        handleUpload={handleUpload}
        imgUrl={imgUrl}
        setImgUrl={setImgUrl}
        setAIReport={setAIReport}
      />
      <AIReport reportAI={aiReport} loading={loading} saveMeal={saveMeal} reportMeal={reportMeal}/>
    </div>
  );
};
