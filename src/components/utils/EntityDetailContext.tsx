import { UserType } from "@/components/Form/interface";
import { ReactNodeProps } from "@/components/layout/interface";
import { createContext, useContext, useEffect, useState } from "react";

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
