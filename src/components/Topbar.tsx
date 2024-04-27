import { Button, ButtonGroup } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginState, signout } from "../store/slices/loginSlice";
import { StateType } from "../store/store";
import { useCookies } from "react-cookie";

interface User {
  email: string;
  userId: number;
  nickname: string;
}

const redirectData = [
  { url: "/signin", name: "로그인" },
  { url: "/signup", name: "회원가입" },
  { url: "/diet", name: "식단 관리 AI" },
  { url: "/live", name: "라이브 PT" },
];

const redirectDataLogin = [
  { url: `/mypage`, name: "마이페이지" },
  { url: "/diet", name: "식단 관리 AI" },
  { url: "/live", name: "라이브 PT" },
];

export default () => {
  const [user, setUser] = useState<User | undefined>();
  const [cookies, setCookie, removeCookie] = useCookies(["Authorization"]);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = useSelector((state: StateType) => {
    return state.login.isLogin;
  });
  const dispatch = useDispatch();

  const redirect = (url: string): void => {
    navigate(url);
  };
  const goHome = (): void => {
    navigate("/");
  };
  const handleLogout = () => {
    dispatch(signout());
    // if ()
  };

  return (
    <div className="flex flex-row justify-between px-8 py-2 shadow-md w-screen bg-white h-14 fixed z-50 opacity-100">
      <button className="flex text-2xl font-extrabold items-center" onClick={goHome}>
        YOU PT
      </button>
      {isLogin ? (
        <div className="flex flex-row">
          <ButtonGroup
            variant="outlined"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Button
              children={"로그아웃"}
              onClick={handleLogout}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            {redirectDataLogin.map((data) => (
              <Button
                children={data.name}
                onClick={() => redirect(data.url)}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            ))}
          </ButtonGroup>
        </div>
      ) : (
        <div className="flex flex-row">
          <ButtonGroup
            variant="outlined"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {redirectData.map((data) => (
              <Button
                children={data.name}
                onClick={() => redirect(data.url)}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            ))}
          </ButtonGroup>
        </div>
      )}
    </div>
  );
};
