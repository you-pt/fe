import { Card, CardBody, CardHeader } from "@material-tailwind/react"
import { aiReportType } from "./Index"

interface propType {
  aiReport: aiReportType | undefined
}

export default ({aiReport}: propType) => {
  const dining = aiReport?.['Dining']
  const nutritionInfo = aiReport?.["Nutrition Information"]
  const Evaluation=aiReport?.["Evaluation of diet"]

  return(
    <Card className="w-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardHeader children={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></CardHeader>
      <CardBody children={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></CardBody>
    </Card>
  )
}