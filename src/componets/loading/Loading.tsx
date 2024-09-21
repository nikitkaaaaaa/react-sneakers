import React from "react";

import style from "../../style/loading.module.css";

interface LoadingProps {}

const Loading = (props: LoadingProps) => {
  return (
    <div className="h-[100vh] flex flex-col  items-center ml-[55px]">
      <div className={style.loader}></div>
    </div>
  );
};

export default Loading;
