import { Card, Button, Typography, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { InputType, handleSubmit, useInputs } from "../utils/inputUtils";
import { useEffect } from "react";
import axios from "axios";

export default () => {
  const [inputs, handleInputs] = useInputs({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignInBtn = async () => {
    const res = await axios({
      method: "POST",
      url: "user/login",
      headers:{
        "Content-Type": "application/json",
      },
      data: inputs
    })
  };

  return (
    <div className="flex justify-center">
      <Card
        color="transparent"
        shadow={false}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          variant="h4"
          color="blue-gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          로그인
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              이메일
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="email"
              onChange={handleInputs as React.ChangeEventHandler}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              비밀번호
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="password"
              onChange={handleInputs as React.ChangeEventHandler}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <Button
            className="mt-6"
            fullWidth
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={handleSignInBtn}
          >
            로그인
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-normal"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            회윈이 아니신가요?{" "}
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="font-medium text-gray-900"
            >
              회원가입
            </button>
          </Typography>
        </form>
      </Card>
    </div>
  );
};
