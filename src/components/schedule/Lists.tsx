import { Card, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface ListPropType {
  trainerId: number;
  content: string;
  ptDate: string;
  ptTime: string;
}

function ListComponent({ trainerId, content, ptDate, ptTime }: ListPropType) {
  return (
    <Card
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <List
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <ListItem
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {content}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {ptDate} {ptTime}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              트레이너: {trainerId}
            </Typography>
          </div>
        </ListItem>
      </List>
    </Card>
  );
}

interface PropType {
  schedules: any[];
}

export default ({ schedules }: PropType) => {
  return (
    <div>
      {schedules.map((schedule) => (
        <ListComponent
          trainerId={schedule.trainerId}
          content={schedule.content}
          ptDate={schedule.ptDate}
          ptTime={schedule.ptTime}
        />
      ))}
    </div>
  );
};
