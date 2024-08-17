"use client";
import React, {useState} from "react";

//todo: better typing, inferred typing right???? need to watch that video again....
type paramsType = {
    name: string, onClickHandler: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button(params: paramsType) {
    // const classes = tailwind();

    const buttonBG = "#40c94b";
    const buttonTextColor = "#000000";

    return (
        <button className={`text-[#000000] bg-[#40c94b] p-1 rounded-[4px]`}
                onClick={params.onClickHandler}>{params.name}</button>
    );
}
