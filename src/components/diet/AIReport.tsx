import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import { aiReportType } from "./Index";

interface propType {
  reportAI:any
}

interface dataType {
  "FoodName": string;
  "Energy": string;
  "Carbohydrate": string;
  "Fat": string;
  "Protein": string;
}

function Dining({ dining }: { dining: dataType }) {
  const foodName = dining?.["FoodName"];
  const energy = dining?.["Energy"];
  const carbohydrate = dining?.["Carbohydrate"];
  const fat = dining?.["Fat"];
  const protein = dining?.["Protein"];
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
  console.log(nutritionalInfo);
  const energy = nutritionalInfo?.["Energy"];
  const carbohydrate = nutritionalInfo?.["Carbohydrate"];
  const fat = nutritionalInfo?.["Fat"];
  const protein = nutritionalInfo?.["Protein"];

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-black-300">영양 정보</th>
            <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-black-300">값</th>
          </tr>
        </thead>
        <tbody>
          <TableRow label="전체 열량" value={energy} />
          <TableRow label="전체 탄수화물" value={carbohydrate} />
          <TableRow label="전체 단백질" value={protein} />
          <TableRow label="전체 지방" value={fat} />
        </tbody>
      </table>
    </div>
  );
}

// 각 행을 렌더링하는 TableRow 컴포넌트
function TableRow({ label, value }: { label: string; value: string |undefined}) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap bg-gray-100 text-gray-800 font-semibold border-b border-gray-200">
        {label}
      </td>
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
        {value ?? '-'} {/* 값이 없을 경우 대체 문자열('-') 표시 */}
      </td>
    </tr>
  );
}

export default ({reportAI }: propType) => {
  console.log(reportAI)
  const dining = reportAI?.reportAI?.["Diet"];
  const nutritionalInfo = reportAI?.reportAI?.["Nutritional Info"];
  const evaluation = reportAI?.reportAI?.["Evaluation"];

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
        {reportAI && <div>
          <table className="min-w-full leading-normal">
            <tr>
              <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-gray-300">음식 이름</th>
              <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-gray-300">열량 (kcal)</th>
              <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-gray-300">탄수화물</th>
              <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-gray-300">단백질</th>
              <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-gray-300">지방</th>
            </tr>
            {reportAI && dining.map((c: dataType) => <Dining dining={c} />)}
          </table>
          <NutritionalInfo nutritionalInfo={nutritionalInfo} />
          <div>
          <table className="min-w-full leading-normal">
            <tr>
              <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-gray-300"> AI 평가</th>
              <th className="px-6 py-4 whitespace-nowrap border-b border-black-200 w-1/2"> {evaluation}</th>
            </tr>
            </table>
            </div>
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
