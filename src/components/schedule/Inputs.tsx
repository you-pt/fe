/**
 * ptDate
 * ptTime
 * content
 * userId
 */

import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useInputs } from "../../utils/inputUtils";
import { useCallback, useEffect, useState } from "react";

interface InputType {
  ptDate: string;
  ptTime: string;
  content: string;
  userId: string;
}

interface TrainerType {
  id: number;
  nickname: string;
}

interface PropType {
  getSchedule: () => void;
  schedules: any[]
}

export default ({schedules, getSchedule}: PropType) => {
  const [inputs, handleInputs] = useInputs({
    ptDate: "",
    ptTime: "",
    content: "",
    userId: "",
  });
  const [trainers, setTrainers] = useState<TrainerType[] | never[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios({
      method: "POST",
      url: "/schedule",
      data: inputs,
      withCredentials: true,
    });
    if (res.status === 201) {
      getSchedule();
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      const res = await axios({
        method: "GET",
        url: "user/trainers",
        withCredentials: true,
      });
      console.log(res.data);
      setTrainers(res.data);
    };
    asyncFunc();
    getSchedule();
  }, []);

  return (
    <Card
      className="w-96 h-[calc(100vh-5rem)] p-10"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardHeader
        className="p-2"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          variant="h6"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          PT 신청하기
        </Typography>
        <Typography
          variant="small"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          10분 전에 알림이 옵니다.
        </Typography>
      </CardHeader>
      <CardFooter
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <Select
              variant="outlined"
              label="트레이너 선택"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {trainers.map((trainer: TrainerType) => (
                <Option
                  children={trainer.nickname}
                  onClick={(e) => handleInputs(e, { name: "userId", value: trainer.id })}
                />
              ))}
            </Select>
          </div>
          <div className="mb-4">
            <Input
              type="date"
              onChange={handleInputs}
              name="ptDate"
              label="스케줄 날짜"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="mb-4">
            <Input
              type="time"
              onChange={handleInputs}
              name="ptTime"
              label="스케줄 시간"
              placeholder="예) 10:30 or 15:40"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="mb-4">
            <Input
              onChange={handleInputs}
              name="content"
              label="PT 내용"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <Button
            className="w-full"
            type="submit"
            size="sm"
            color="cyan"
            children={"PT 신청하기"}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </form>
      </CardFooter>
    </Card>
  );
};
