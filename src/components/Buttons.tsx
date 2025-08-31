
import React from "react";
import { clsx } from "clsx";
export function PillButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={clsx(
    "px-3 py-2 rounded-full text-sm border border-white/30",
    "active:scale-[0.99]",
    props.className
  )}/>;
}
export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={clsx(
    "w-full bg-white text-black rounded-md py-3 font-semibold",
    "active:scale-[0.99]",
    props.className
  )}/>;
}
export function SecondaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={clsx(
    "w-full border border-white/30 text-white rounded-md py-3",
    "active:scale-[0.99]",
    props.className
  )}/>;
}
