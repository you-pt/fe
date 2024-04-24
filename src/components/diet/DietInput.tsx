import { Button, Input } from "@material-tailwind/react";
import React, { useRef, useState } from "react";

interface Menus {
  [key: string]: string;
}

function DietInput() {
  const dietRef = useRef(4);

  const [menus, setMenus] = useState<Menus>({
    식단1: "",
    식단2: "",
    식단3: "",
  });

  const addDiet = () => {
    setMenus((prev) => ({ ...prev, [`식단${dietRef.current++}`]: "" }));
  };

  const deleteDiet = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { name } = e.target as HTMLButtonElement;
    setMenus((prev) => {
      const { [name]: deleted, ...rest } = prev;
      return { ...rest };
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMenus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Button
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        onClick={addDiet}
        variant="outlined"
      >
        추가
      </Button>
      <Button
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        variant="outlined"
      >
        Submit
      </Button>
      {Object.keys(menus).map((menu: string) => {
        return (
          <div className="flex w-96 mb-2">
            <div className="w-16">{`${menu} `}</div>
            <Input
              variant="static"
              value={menus[menu]}
              placeholder="식단을 입력하세요"
              name={menu}
              onChange={onChange}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Button
              name={menu}
              className="w-20"
              onClick={deleteDiet}
              variant="outlined"
              size="sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              삭제
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default DietInput;
