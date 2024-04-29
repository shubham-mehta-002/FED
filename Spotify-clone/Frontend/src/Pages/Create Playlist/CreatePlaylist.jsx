import { CreatePlaylistForm } from "../../Pages";
import { Navigate } from "react-router-dom";

export function CreatePlaylist() {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <div className="h-full w-full flex item-center flex-col text-white">
      <div className="login-header border-b-2 border-solid border-gray-400  p-4 gap-3 flex flex-row items-center justify-center">
        <div className="text-5xl font-bold my-4">Enter playlist Details </div>
      </div>

      <div className="login-details flex  items-center flex-col w-full">
        <div className="form w-1/3">
          <CreatePlaylistForm />
        </div>
      </div>
    </div>
  );
}
