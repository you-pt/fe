import ImageUpload from "./ImageUpload";
import { useState } from "react";
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
  const [aiReport, setAIReport] = useState<aiReportType | null>(null);
  const [mealId, setMealId] = useState<number>(0);
  const [newReport, setNewReport] = useState<string>("");

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
        url: "/image/upload",
        data: formData,
      });
      if (res) setImgUrl(res.data.url);
      await handleAI(res.data.url);
    } catch (error) {
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
      const response = await axios.post(
        `/saveMeal`,
        { reportAI: aiReport },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Meal saved:", response.data);
    } catch (error) {
      console.error("Save meal error:", error);
    }
  };

  const reportMeal = async () => {
    try {
      const response = await axios.patch(
        `/reportMeal/${mealId}`,
        { report: newReport },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Meal updated:", response.data);
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
      <AIReport reportAI={aiReport} />
      <button
        onClick={saveMeal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save Meal Report
      </button>
      <button
        onClick={reportMeal}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Update Meal Report
      </button>
    </div>
  );
};
