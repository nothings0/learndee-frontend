"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";

interface OtpInputProps {
  length?: number;
  onOtpSubmit?: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 4,
  onOtpSubmit = () => {},
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (isNaN(parseInt(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(() => newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        return;
      }
      if (index > 0 && inputRefs.current[index - 1])
        inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
      {otp.map((value, index) => (
        <div className="w-16 h-16" key={index}>
          <Input
            key={index}
            ref={(input) =>
              (inputRefs.current[index] = input as HTMLInputElement)
            }
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
            type="text"
          />
        </div>
      ))}
    </div>
  );
};

export default OtpInput;
