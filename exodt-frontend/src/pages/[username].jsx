import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLogoutMutation } from "@/redux/api/authApi";
import { useDispatch } from "react-redux";
import { setLogoutState} from "@/redux/slices/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { username } = router.query || {};
  const [logout, { isSuccess: logoutSuccess }] = useLogoutMutation();

  const handleLogout = () => {
    logout();
    dispatch(setLogoutState());
  };

  useEffect(() => {
    if (logoutSuccess) {
      router.push('/');
    }
  }, [logoutSuccess])

  return (
    <div>
      {username}
      <div className="">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;
