import { useLogoutMutation } from "../../common/store/slice/api/slice"

export const useSettingsData = () => {
  const[logout, {  isLoading: isLoadingLogout, isError: isLogoutError }]= useLogoutMutation({});

  const handleLogout = async (detail:string) => {
    try {
      await logout(detail);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  return{
    handleLogout,
    isLoadingLogout
  }
}
