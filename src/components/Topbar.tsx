import { Button, ButtonGroup } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  userId: number;
  nickname: string;
}

const redirectData = [
  { url: "/signin", name: "로그인" },
  { url: "/signup", name: "회원가입" },
  { url: "/diet", name: "식단 관리 AI" },
  { url: "/live", name: "라이브 PT"}
];

export default () => {
  const [user, setUser] = useState<User | undefined>();
  const navigate = useNavigate();
  useEffect(() => {
    // 유저 정보 확인
  }, []);

  const redirectMyPage = () => {
    navigate("mypage");
  };
  const redirect = (url: string): void => {
    navigate(url);
  };
  const goHome = (): void => {
    navigate('/')
  }

  return (
    <div className="flex flex-row justify-between px-8 py-2 shadow-md w-screen bg-white h-14 fixed z-50 opacity-100">
      <button 
        className="flex text-2xl font-extrabold items-center"
        onClick={goHome}
      >YOU PT</button>
      {user ? (
        <div>
          <div onClick={redirectMyPage}>마이페이지</div>
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
