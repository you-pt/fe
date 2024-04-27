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
import { aiReportType } from "./Index";

interface propType {
  img: File | null;
  imgUrl: string | null;
  handleUpload: (e: React.MouseEvent) => void;
  setImg: React.Dispatch<React.SetStateAction<File | null>>;
  setImgUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setAIReport: React.Dispatch<React.SetStateAction<aiReportType | null>>;
}

const ImageUpload = ({ img, imgUrl, handleUpload, setImg, setImgUrl, setAIReport }: propType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<any>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      console.log("nothing")
      return;
    }
    console.log('image update')
    setImg(e.target.files[0]);
  }

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

  const removeImage = () => {
    console.log("remove")
    setImg(null);
    setAIReport(null);
  };

  return (
    <div>
      <Card
        className="w-72 h-[calc(100vh-5rem)] flex flex-col justify-between"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardHeader
          shadow={false}
          floated={false}
          className="pb-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {img && <Button
            className="w-full shadow-none hover:scale-105 hover:shadow-none"
            children={"이미지 변경하기"}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={() => {
              inputRef.current?.click();
            }}
          />}
          
          
        </CardHeader>
        <CardBody
        className="h-full"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <figure className={`relative h-96 w-full ${img ? "block" : "hidden"}`}>
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
            className={`w-full h-full hover:scale-105 hover:shadow-none ${
              !img ? "block" : "hidden"
            }`}
            children={"+ 이미지 첨부"}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={() => {
              inputRef.current?.click();
            }}
          />
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
