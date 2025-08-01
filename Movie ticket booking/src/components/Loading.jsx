import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-2 border-t-primary"></div>
    </div>
  );
};

export default Loading;
