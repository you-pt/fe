import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";

function List() {
  return (
    <Card
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <Typography
        variant="h5"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        안녕
      </Typography>
      <Typography
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        안녕
      </Typography>
    </Card>
  );
}

export default () => {
  const [lists, setLists] = useState([])

  // useEffect(() => {
  //   const findSchedule = async () => {
  //     const res: any[] = await axios({
  //       method: "GET",
  //       url: "/schedule"
  //     })
  //     setLists(res)
  //   }
  // }, []);

  return (
    <div>
      <List />
    </div>
  );
};
