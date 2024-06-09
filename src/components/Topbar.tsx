import { Button, ButtonGroup } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginState, signout } from "../store/slices/loginSlice";
import { StateType } from "../store/store";
import { useCookies } from "react-cookie";
import { setUser as setUserLocal } from "../store/slices/userSlice";

const redirectData = [
  { url: "/signin", name: "로그인" },
  { url: "/signup", name: "회원가입" },
  { url: "/diet", name: "식단 관리 AI" },
];

const redirectDataLogin = [
  { url: `/schedule`, name: "PT 신청" },
  { url: "/diet", name: "식단 관리 AI" },
];

export default React.memo(() => {
  const [cookies, setCookie, removeCookie] = useCookies(["Authorization"]);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = useSelector((state: StateType) => {
    return state.login.isLogin;
  });
  const user = useSelector((state: StateType) => state.user)
  const dispatch = useDispatch();

  const redirect = (url: string): void => {
    navigate(url);
  };
  const goHome = (): void => {
    navigate("/");
  };
  const handleLogout = () => {
    dispatch(signout());
    dispatch(setUserLocal({email: "", nickname: "", role: "user"}))
  };

  return (
    <div className="flex flex-row justify-between px-8 py-2 shadow-md w-screen bg-white h-14 fixed z-50 opacity-100">
      <button
        className="flex text-2xl font-extrabold items-center"
        onClick={goHome}
      >
        YOU PT
      </button>
      {isLogin ? (
        <div className="flex flex-row">
          <div className="self-center mr-2">{user.nickname} 님</div>
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
})
