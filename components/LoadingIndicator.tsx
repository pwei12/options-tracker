import React, { ComponentProps } from "react";
import { Skeleton } from "./ui/skeleton";

const LoadingIndicator = (props: ComponentProps<typeof Skeleton>) => {
  const { className, ...rest } = props;

  return (
    <Skeleton
      variant="rounded"
      className={`w-full h-12 rounded-md bg-muted ${className}`}
      {...rest}
    />
  );
};

export default LoadingIndicator;
