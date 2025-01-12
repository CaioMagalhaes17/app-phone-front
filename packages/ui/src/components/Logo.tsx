import { ComponentProps } from "react";

export function Logo({...props} : ComponentProps<"img">){
  return (
    <img
      alt="logo"
      src="https://static-cdn.jtvnw.net/jtv_user_pictures/759e208d-95f0-448f-a42f-5c0289697c46-profile_image-70x70.png"
      {...props}
    />
  );
}