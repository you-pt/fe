import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import { aiReportType } from "./Index";

interface propType {
  aiReport: any;
}

interface dataType {
  "Food name": string;
  "Energy (kcal)": string;
  "Carbohydrate(g)": string;
  "Fat(g)": string;
  "Protein (g)": string;
}

function Dining({ dining }: { dining: dataType }) {
  const foodName = dining?.["Food name"];
  const energy = dining?.["Energy (kcal)"];
  const carbohydrate = dining?.["Carbohydrate(g)"];
  const fat = dining?.["Fat(g)"];
  const protein = dining?.["Protein (g)"];
  return (
    <tr>
      <td>{foodName}</td>
      <td>{energy}</td>
      <td>{carbohydrate}</td>
      <td>{protein}</td>
      <td>{fat}</td>
    </tr>
  );
}

function NutritionalInfo({ nutritionalInfo }: { nutritionalInfo: Partial<dataType> }) {
  console.log(nutritionalInfo)
  const energy = nutritionalInfo?.["Energy (kcal)"];
  const carbohydrate = nutritionalInfo?.["Carbohydrate(g)"];
  const fat = nutritionalInfo?.["Fat(g)"];
  const protein = nutritionalInfo?.["Protein (g)"];
  return (
    <div>
      <div>전체 열량 : {energy}</div>
      <div>전체 탄수화물 : {carbohydrate}</div>
      <div>전체 단백질 : {protein}</div>
      <div>전체 지방 : {fat}</div>
    </div>
  );
}

export default ({ aiReport }: propType) => {
  const dining = aiReport?.["Dining"];
  const nutritionalInfo = aiReport?.["Nutritional Information"];
  const evaluation = aiReport?.["Evaluation of diet"];

  return (
    <Card
      className="w-full"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {aiReport && <div>
          <table>
            <tr>
              <th>음식 이름</th>
              <th>열량 (kcal)</th>
              <th>탄수화물</th>
              <th>단백질</th>
              <th>지방</th>
            </tr>
            {aiReport && dining.map((c: dataType) => <Dining dining={c} />)}
          </table>
          <NutritionalInfo nutritionalInfo={nutritionalInfo} />
          <div>결과 : {evaluation}</div>
        </div>}
      </CardBody>
    </Card>
  );
};

// 예시 데이터
// {
//   "Dining": [
//       {
//           "Food name": "Fried rice with ham",
//           "Energy (kcal)": "400",
//           "Carbohydrate(g)": "50",
//           "Fat(g)": "15",
//           "Protein (g)": "20"
//       },
//       {
//           "Food name": "Green grapes",
//           "Energy (kcal)": "100",
//           "Carbohydrate(g)": "25",
//           "Fat(g)": "0.5",
//           "Protein(g)": "1"
//       },
//       {
//           "Food name": "Kimchi",
//           "Energy (kcal)": "30",
//           "Carbohydrate(g)": "5",
//           "Fat(g)": "0.1",
//           "Protein(g)": "2"
//       },
//       {
//           "Food name": "Skewered fish cake",
//           "Energy (kcal)": "150",
//           "Carbohydrate(g)": "10",
//           "Fat(g)": "7",
//           "Protein(g)": "12"
//       },
//       {
//           "Food name": "Spicy stir-fried noodles",
//           "Energy (kcal)": "350",
//           "Carbohydrate(g)": "40",
//           "Fat(g)": "12",
//           "Protein(g)": "15"
//       },
//       {
//           "Food name": "Vegetable soup with meat",
//           "Energy (kcal)": "200",
//           "Carbohydrate(g)": "15",
//           "Fat(g)": "8",
//           "Protein(g)": "10"
//       }
//   ],
//   "Nutritional Information": {
//       "Energy (kcal)": "1230",
//       "Carbohydrate(g)": "145",
//       "Fat(g)": "42.6",
//       "Protein (g)": "60"
//   },
//   "Evaluation of diet": "Looks like they need to improve."
// }
