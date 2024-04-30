/**
 * ptDate
 * ptTime
 * content
 * userId
 */

import { Button, Card, Input, Option, Select } from "@material-tailwind/react";
import axios from "axios";
import { useInputs } from "../../utils/inputUtils";
import { useEffect, useState } from "react";
import { div } from "@tensorflow/tfjs";

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

export default () => {
  const [inputs, handleInputs] = useInputs({
    ptDate: "",
    ptTime: "",
    content: "",
    userId: "",
  });
  const [trainers, setTrainers] = useState<TrainerType[] | never[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios({
      method: "POST",
      url: "/schedule",
      data: inputs,
      withCredentials: true,
    });
  };

  useEffect(() => {
    const asyncFunc = async () => {
      const res = await axios({
        method: "GET",
        url: "user/trainers",
      });
      console.log(res.data);
      setTrainers(res.data);
    };
    asyncFunc();
  }, []);

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  return (
    <Card
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div>10분 전에 알림이 옵니다.</div>
      <form onSubmit={(e) => handleSubmit(e)}>
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
              onClick={(e) =>
                handleInputs(e, { name: "userId", value: trainer.id })
              }
            />
          ))}
        </Select>
        <Input
          type="date"
          onChange={handleInputs}
          name="ptDate"
          label="스케줄 날짜"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
        />
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
        <Input
          onChange={handleInputs}
          name="content"
          label="제목"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
        />
        <Button
          type="submit"
          size="sm"
          color="cyan"
          children={"스케줄 작성하기"}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </form>
    </Card>
  );
};
