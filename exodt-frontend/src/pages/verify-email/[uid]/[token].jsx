import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useVerifyEmailMutation } from "@/redux/api/generalApi";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";
import { useTheme } from "next-themes";
import { MdOutlineClose } from "react-icons/md";

const EmailVeryfication = () => {
  const router = useRouter();
  const { uid, token } = router.query || {};
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [verifyUser, { isLoading, isSuccess, isError, error }] =
    useVerifyEmailMutation();

  useEffect(() => {
    verifyUser({ uid, token });
  }, [uid, token, verifyUser]);

  useEffect(() => {
    if (error) console.log(error);
  }, [isError, error]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed z-20 inset-0 overflow-y-auto bg-black bg-opacity-50">
      <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div
          className={`${
            theme === "dark" ? `bg-gray-600` : `bg-white`
          }  w-full px-6 py-2 h-[300px] rounded-2xl max-w-md space-y-8`}
        >
          <div className="flex justify-end">
            <Link className="justify-end" href="/">
              <MdOutlineClose
                className={`${
                  theme === "light" ? `text-black` : `text-white`
                } text-2xl  mt-2`}
              />
            </Link>
          </div>
          <div className="flex  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {isLoading && (
              <span className="">
                <ThreeDots
                  height="60"
                  width="60"
                  radius="9"
                  color="#black"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </span>
            )}
            {isSuccess && (
              <div className="flex flex-col space-y-5">
                <span>Email verified successfully!</span>
                <Link
                  href="/login"
                  className="px-4 py-2 bg-blue-500 text-white"
                >
                  Continue to login
                </Link>
              </div>
            )}
            {isError && error.data.error === "Invalid verification token" && (
              <div className="flex flex-col space-y-5">
                <span>
                  Invalid verification token, failed to verifying your email
                  address.{" "}
                </span>
                <Link
                  href="/login"
                  className="px-4 py-2 bg-blue-500  text-white"
                >
                  Try to login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVeryfication;
