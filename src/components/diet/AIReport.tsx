import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { aiReportType } from "./Index";

interface propType {
  reportAI: any;
  loading: 0 | 1 | 2;
}

interface dataType {
  FoodName: string;
  Energy: string;
  Carbohydrate: string;
  Fat: string;
  Protein: string;
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
            <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-black-300">
              영양 정보
            </th>
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
function TableRow({ label, value }: { label: string; value: string | undefined }) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap bg-gray-100 text-gray-800 font-semibold border-b border-gray-200">
        {label}
      </td>
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
        {value ?? "-"} {/* 값이 없을 경우 대체 문자열('-') 표시 */}
      </td>
    </tr>
  );
}

export default ({ reportAI, loading }: propType) => {
  console.log(reportAI?.reportAI?.["Diet"]);
  const dining = reportAI?.reportAI?.["Diet"];
  const nutritionalInfo = reportAI?.reportAI?.["Nutritional Info"];
  const evaluation = reportAI?.reportAI?.["Evaluation"];

  return (
    <Card
      className="w-full h-[calc(100vh-5rem)] overflow-auto"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {loading === 0 && reportAI && (
          <div>
            <table className="min-w-full leading-normal">
              <tr>
                <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-gray-300">
                  음식 이름
                </th>
                <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-gray-300">
                  열량 (kcal)
                </th>
                <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-gray-300">
                  탄수화물
                </th>
                <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-gray-300">
                  단백질
                </th>
                <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-gray-300">
                  지방
                </th>
              </tr>
              {reportAI && dining.map((c: dataType) => <Dining dining={c} />)}
            </table>
            <NutritionalInfo nutritionalInfo={nutritionalInfo} />
            <div className="">
              <div className="flex flex-row">
                <div className="w-24 bg-gray-200 p-6">AI 평가</div>
                <div className="p-6">{evaluation}</div>
              </div>
            </div>
          </div>
        )}
        {loading === 1  &&
          (<div className="max-w-full animate-pulse">
            <div>분석 중...</div>
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-56 rounded-full bg-gray-300"
              children={" "}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            ></Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              children={" "}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            ></Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              children={" "}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            ></Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              children={" "}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            ></Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              children={" "}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            ></Typography>
          </div>
        )}
        {loading === 2 && (
          <div>분석이 실패했습니다. 다시 시도해주세요.</div>
        )}
      </CardBody>
    </Card>
  );
};
