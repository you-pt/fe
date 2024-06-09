import { Card, Button, Typography, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { InputType, handleSubmit, useInputs } from "../utils/inputUtils";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../store/slices/loginSlice";
import { StateType } from "../store/store";
import { requestForToken } from "../utils/firebase";
import { setUser } from "../store/slices/userSlice";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

export default () => {
  const isLogin = useSelector((state: StateType) => state.login.isLogin);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onInvalid = (errors: any) => console.error(errors)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const token: any = await requestForToken();
      const res = await axios({
        method: "POST",
        url: "user/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: { ...data, token },
        withCredentials: true,
      });
      if (res.status === 201) {
        dispatch(signin());
        const res = await axios({
          method: "GET",
          url: "/user/info",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        const user = res.data;
        dispatch(setUser(user));
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    }
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
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
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
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              })}
              name="email"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {errors.email && <span style={{color: "#f00"}}>이메일 형식으로 작성해주세요.</span>}
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
              placeholder="대문자와 특수문자를 넣어주세요"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("password", {
                required: true,
                maxLength: 40,
                pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_-])[A-Za-z0-9!@#$%^&*()_-]{8,40}$/g,
              })}
              name="password"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {errors.password && <span style={{color: "#f00"}}>대문자와 소문자, 특수문자를 포함해 8자리 이상 작성해주세요.</span>}
          </div>
          <Input
            type="submit"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
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
