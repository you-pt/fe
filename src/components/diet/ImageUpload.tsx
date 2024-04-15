import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface propType {
  img: File | null;
  imgUrl: string | null;
  handleUpload: (e: React.MouseEvent) => void;
  setImg: React.Dispatch<React.SetStateAction<File | null>>;
  setImgUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageUpload = ({ img, imgUrl, handleUpload, setImg, setImgUrl }: propType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<any>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setImg(e.target.files[0]);
  }, []);

  // 이미지 추가되면 img에 보이기
  useLayoutEffect(() => {
    if (img) {
      const reader = new FileReader();
      if (imgRef && imgRef.current) {
        reader.onload = (event) => {
          imgRef.current.src = event.target?.result;
        };
      }

      reader.readAsDataURL(img);
    }
  }, [img]);

  return (
    <div>
      <Card
        className="w-96 h-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardHeader
          shadow={false}
          floated={false}
          className="h-96 p-1"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <figure className={`relative h-96 w-full ${img ? "block": "hidden"}`}>
            <img
              ref={imgRef}
              className={`h-full w-full rounded-xl object-center object-contain`}
              alt="no image"
            />
            <figcaption
              className={`absolute top-5 -right-3 flex -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 px-0.5 py-0.5 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm
              ${img ? "block" : "hidden"}
              `}
            >
              <Button
                className=""
                children={"X"}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                onClick={() => {
                  setImg(null);
                }}
              />
              <Typography
                variant="h5"
                color="blue-gray"
                children={undefined}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </figcaption>
          </figure>
          <Button
            variant="outlined"
            className={`w-full h-full hover:scale-105 hover:shadow-none ${!img ? "block": "hidden"}`}
            children={"+ 이미지 첨부"}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={() => {
              inputRef.current?.click();
            }}
          />
        </CardHeader>
        <CardBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <input
            className="hidden"
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onChange}
          />
        </CardBody>
        <CardFooter
          className="pt-0"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none"
            children="식단 분석하기"
            onClick={handleUpload}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ImageUpload;
