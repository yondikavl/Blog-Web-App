import { UserType } from "@/components/Form/interface";
import { ReactNode, createContext, useContext, useState } from "react";

interface ReactNodeProps {
  children: ReactNode;
}

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
