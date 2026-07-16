"use client";

import { getAllSkladAndInfo } from "@/Services/skladService";
import {
  Box,
  LinearProgress,
  Stack,
  linearProgressClasses,
  useTheme,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import SkladItemCard_Small from "../Cards/SItem_CardSmall";
import { checkFinishedProductions } from "@/Services/productionService";
import { useEffect } from "react";

const SkladItemsView = () => {
  const theme = useTheme();
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["sklad_items"],
    queryFn: () => getAllSkladAndInfo(),
    select: (data) => data.sort((a, b) => a.id - b.id),
  });

  const { mutate } = useMutation({
    mutationFn: checkFinishedProductions,
  });

  useEffect(() => {
    mutate();
  }, []);
  return (
    <Stack
      direction={"row"}
      maxHeight={"90vh"}
      p={2}
      ml={2}
      flexWrap={"wrap"}
      rowGap={2}
      // columnGap={ 2 }
      justifyContent={"space-between"}
      // spacing={ 1 }
      overflow={"auto"}
    >
      {isLoading && (
        <Box width={"100%"}>
          <LinearProgress
            variant="indeterminate"
            sx={() => ({
              height: 10,
              borderRadius: 5,
              [`&.${linearProgressClasses.colorPrimary}`]: {
                backgroundColor: theme.palette.grey[200],
                ...theme.applyStyles("dark", {
                  backgroundColor: theme.palette.grey[800],
                }),
              },
              [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: "#1a90ff",
                ...theme.applyStyles("dark", {
                  backgroundColor: "#308fe8",
                }),
              },
            })}
          />
        </Box>
      )}
      {isSuccess &&
        data.map((item) => <SkladItemCard_Small key={item.id} item={item} />)}
    </Stack>
  );
};

export default SkladItemsView;
