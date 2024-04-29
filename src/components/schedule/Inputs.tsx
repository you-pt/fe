/**
 * ptDate
 * ptTime
 * content
 * userId
 */

import { Button, Input, Option, Select } from "@material-tailwind/react";
import axios from "axios";
import { useInputs } from "../../utils/inputUtils";
import { useEffect } from "react";

interface InputType {
  ptDate: string,
  ptTime: string,
  content: string,
  userId: string
}

export default () => {
  const [inputs, handleInputs] = useInputs({
    ptDate: "",
    ptTime: "",
    content: "",
    userId: ""
  });

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
    console.log(inputs);
  }, [inputs]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Select
        variant="outlined"
        label="수강생 선택"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Option children={"수강생 1"} onClick={(e) => handleInputs(e, {name: "userId", value: "수강생 1"})} />
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
        size='sm'
        color="cyan"
        children={"스케줄 작성하기"}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
    </form>
  );
};
