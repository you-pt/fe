import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Radio,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { InputType, useInputs } from "../utils/inputUtils";
import { useEffect } from "react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

const options = [
  { value: "", label: "선택해주세요." },
  { value: "user", label: "일반 사용자" },
  { value: "admin", label: "관리자" },
  { value: "trainer", label: "트레이너" },
];

interface Inputs {
  nickname: "";
  email: "";
  password: "";
  passwordConfirm: "";
  role: "";
  gender: "";
}

export default () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await axios({
      method: "POST",
      url: "user/register",
      data,
    });
    if (res.status === 201) {
      navigate("/signin");
    } else {
      alert("다시 시도해주세요.");
    }
  };

  const onInvalid = (error: any) => {
    console.log(error);
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
          회원가입
        </Typography>
        <Typography
          color="gray"
          className="mt-1 font-normal"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          You PT에 오신 것을 환영합니다. 사용자로 등록해주세요.
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              닉네임
            </Typography>
            <Input
              size="lg"
              placeholder="nickname"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("nickname", { required: "닉네임을 작성해주세요." })}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {errors.nickname && <span style={{ color: "#f00" }}>{errors.nickname.message}</span>}
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
                required: "이메일을 작성해주세요.",
                pattern: {
                  value: /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: "이메일 형식으로 작성해주세요.",
                },
              })}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {errors.email && <span style={{ color: "#f00" }}>{errors.email.message}</span>}

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
              {...register("password", {
                required: true,
                maxLength: {
                  value: 40,
                  message: "비밀번호는 최대 40자리까지만 작성할 수 있습니다.",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_-])[A-Za-z0-9!@#$%^&*()_-]{8,40}$/g,
                  message: "대문자, 소문자, 특수문자를 사용해 8자리로 작성해주세요.",
                },
              })}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {errors.password && <span style={{ color: "#f00" }}>{errors.password.message}</span>}
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              비밀번호 확인
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("passwordConfirm", {
                required: "비밀번호를 다시 입력해주세요.",
                maxLength: {
                  value: 40,
                  message: "비밀번호는 최대 40자리까지만 작성할 수 있습니다.",
                },
                validate: (value) =>
                  value === getValues("password") || "비밀번호를 맞게 입력해주세요.",
              })}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {errors.passwordConfirm && (
              <span style={{ color: "#f00" }}>{errors.passwordConfirm.message}</span>
            )}

            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              역할
            </Typography>
            <select
              {...register("role", {
                required: "역할을 선택하세요.",
                validate: (value) => {
                  return ["user", "admin", "trainer"].includes(value) || "역할을 선택해주세요";
                },
              })}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.role && <span style={{ color: "#f00" }}>{errors.role.message}</span>}
            <div>
              <div className="mb-6">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  성별
                </Typography>
              </div>
              <div className="flex gap-10">
                <Radio
                  label="남성"
                  value="male"
                  // onChange={handleInputs as React.ChangeEventHandler}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  {...register("gender", {
                    required: "성별을 선택해주세요",
                  })}
                />
                <Radio
                  label="여성"
                  value="female"
                  // onChange={handleInputs as React.ChangeEventHandler}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  {...register("gender", {
                    required: "성별을 선택해주세요",
                  })}
                />
              </div>
            </div>
            {errors.gender && <span style={{ color: "#f00" }}>{errors.gender.message}</span>}
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
            이미 회원이신가요?{" "}
            <button
              onClick={() => {
                navigate("/signin");
              }}
              className="font-medium text-gray-900"
            >
              로그인
            </button>
          </Typography>
        </form>
      </Card>
    </div>
  );
};
