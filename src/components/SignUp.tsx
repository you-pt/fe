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
import { InputType, handleSubmit, useInputs } from "../utils/inputUtils";
import { useEffect } from "react";

const options = [
  { value: "user", label: "일반 사용자" },
  { value: "admin", label: "관리자" },
  { value: "trainer", label: "트레이너" },
];

export default () => {
  const [inputs, handleInputs] = useInputs({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "",
  });


  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  const navigate = useNavigate();
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
              닉네임
            </Typography>
            <Input
              onChange={handleInputs as React.ChangeEventHandler}
              name="nickname"
              size="lg"
              placeholder="nickname"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
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
              이메일
            </Typography>
            <Input
              onChange={handleInputs as React.ChangeEventHandler}
              name="email"
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
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
              onChange={handleInputs as React.ChangeEventHandler}
              name="password"
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
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
              비밀번호 확인
            </Typography>
            <Input
              onChange={handleInputs as React.ChangeEventHandler}
              name="passwordConfirm"
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
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
              역할
            </Typography>
            <Select
              size="lg"
              label="역할 선택"
              name="role"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {options.map((option) => (
                <Option
                  key={option.value}
                  onClick={(e) => handleInputs(e, { name: "role", value: option.value })}
                >
                  {option.label}
                </Option>
              ))}
              {/* <Option value="user">사용자</Option>
              <Option value="biz">사업자</Option>
              <Option value="trainer">트레이너</Option> */}
            </Select>
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
                  name="gender"
                  label="남성"
                  value="male"
                  onChange={handleInputs as React.ChangeEventHandler}
                  defaultChecked
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
                <Radio
                  name="gender"
                  label="여성"
                  value="female"
                  onChange={handleInputs as React.ChangeEventHandler}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
            </div>
          </div>
          {/* <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                I agree the
                <a href="#" className="font-medium transition-colors hover:text-gray-900">
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          /> */}
          <Button
            className="mt-6"
            fullWidth
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={() => handleSubmit("/user/register", inputs as InputType)}
          >
            회원가입
          </Button>
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
