import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

interface PropType {
  roomDefaultValue: string;
  userNameDefaultValue: string;
  joinSession: () => void;
  handleChangeSessionId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeUserName: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default ({
  roomDefaultValue,
  userNameDefaultValue,
  joinSession,
  handleChangeSessionId,
  handleChangeUserName,
}: PropType) => {

  return (
    <form onSubmit={joinSession}>
      <Card
        className="w-96"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            variant="h3"
            color="white"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            라이브 PT 접속
          </Typography>
        </CardHeader>
        <CardBody
          className="flex flex-col gap-4"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Input
            label="Room Name"
            size="lg"
            value={roomDefaultValue}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            onChange={handleChangeSessionId}
          />
          <Input
            label="User Name"
            size="lg"
            value={userNameDefaultValue}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            onChange={handleChangeUserName}
          />
        </CardBody>
        <CardFooter
          className="pt-0"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="gradient"
            fullWidth
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            type="submit"
          >
            접속
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
