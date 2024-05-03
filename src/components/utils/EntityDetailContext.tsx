import { UserType } from "@/components/Form/interface";
import { createContext, useContext, useState } from "react";
import { ReactNodeProps } from "../layout/interface";

const EntityDetailContext = createContext<any>({});

export const useEntityDetailHook = () => useContext(EntityDetailContext);

export const EntityDetailContextProvider: React.FC<ReactNodeProps> = ({
  children,
}) => {
  const [postDetails, setPostDetails] = useState(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  return (
    <EntityDetailContext.Provider
      value={{
        postDetails,
        setPostDetails,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </EntityDetailContext.Provider>
  );
};
