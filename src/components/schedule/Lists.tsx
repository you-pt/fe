import { Card, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

interface ListPropType {
  trainerId: number;
  content: string;
  ptDate: string;
  ptTime: string;
  currentTime: Date;
}

function ListComponent({ trainerId, content, ptDate, ptTime, currentTime }: ListPropType) {
  const time: Date = new Date(ptTime)
  const [left, setLeft] = useState({
    hour: 0,
    min: 0
  })

  useEffect(()=>{
    const whole = (time.valueOf() - currentTime.valueOf())/(1000*60*60)
    const hour = Math.floor(whole)
    const min = Math.round((whole - hour) * 60)
    setLeft({hour, min})
  },[currentTime])

  return (
    <Card
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <List
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <ListItem
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {content}
            </Typography>
            <Typography
              variant="paragraph"
              color="black"
              className="font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {left.hour >= 0 ? `남은 시간: ${left.hour}시간 ${left.min}분` : "이미 지난 일정 입니다."}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {new Date(ptTime).toLocaleString()}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              트레이너: {trainerId}
            </Typography>
          </div>
        </ListItem>
      </List>
    </Card>
  );
}

interface PropType {
  schedules: any[];
}

export default ({ schedules }: PropType) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(()=>{
    const time = setInterval(() => {
      const newDate = new Date()
      console.log(newDate);
      setCurrentTime(newDate)
    }, 60000)
    return () => {
      clearInterval(time)
    }
  },[])

  return (
    <div>
      {schedules.map((schedule) => (
        <ListComponent
          trainerId={schedule.trainerId}
          content={schedule.content}
          ptDate={schedule.ptDate}
          ptTime={schedule.ptTime}
          currentTime={currentTime}
        />
      ))}
    </div>
  );
};
