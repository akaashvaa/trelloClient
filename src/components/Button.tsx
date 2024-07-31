import { memo } from "react";
import Spinner from "./Spinner";
export enum ButtonType {
  primary,
  secondry,
}
function Button({
  title,
  loading = false,
  btnType,
  disable,
}: {
  loading?: boolean;
  title: string;
  btnType: ButtonType;
  disable: boolean;
}) {
  // console.log({ loading, title, btnType, disable });
  return (
    <button
      disabled={disable || loading}
      className={`${
        btnType === ButtonType.primary
          ? disable
            ? "bg-btn-secondary-deem-disable"
            : "bg-gradient-to-t from-btn-primary to-btn-primary-deem"
          : "bg-gradient-to-t from-btn-secondary to-btn-secondary-deem"
      }  text-white flex justify-center items-center rounded-md py-3 select-none  shadow-inner-xl drop-shadow-md`}
      type="submit"
    >
      {loading ? <Spinner /> : title}
    </button>
  );
}

export default memo(Button);
