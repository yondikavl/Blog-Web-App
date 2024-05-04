import React, { useState } from "react";
import { createUser, updateUser } from "@/pages/api";
import { useRouter } from "next/router";
import { FormUserProps, NewUserType, UserType } from "./interface";
import { useEntityDetailHook } from "@/components/utils";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import Head from "next/head";

const FormUserComponent: React.FC<FormUserProps> = ({ type, oldData }) => {
  const INIT_USER_DATA: NewUserType = {
    name: "",
    email: "",
    status: "",
    gender: "",
  };
  const [data, setData] = useState<NewUserType | UserType>(
    oldData ? oldData : INIT_USER_DATA,
  );
  const { setSelectedUser } = useEntityDetailHook();
  const { push, back } = useRouter();
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
  formattedType === "Create" && setSelectedUser(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: UserType | NewUserType) => ({ ...prev, [name]: value }));
  };

  const areObjectsEqual = (objA: any, objB: any): boolean => {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (let key of keysA) {
      if (objA[key] !== objB[key]) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formattedType === "Create") {
      const result = await createUser(data);
      if (result?.status === 201) {
        push({ pathname: "/users", query: { page: 1 } });
        setData(INIT_USER_DATA);
        return alert("User created successfully!");
      } else {
        alert("Failed to create user. Please try again.");
      }
    }

    if (formattedType === "Update") {
      if (areObjectsEqual(oldData, data)) {
        return alert("No changes were made.");
      }

      const result = await updateUser(data, oldData!.id);
      if (result?.status === 200) {
        push({ pathname: "/users", query: { page: 1 } });
        setData(INIT_USER_DATA);
        setSelectedUser(null);
        return alert("User information updated successfully!");
      } else {
        alert("Failed to update user information. Please try again.");
      }
    }
  };

  const handleBack = () => {
    setSelectedUser(null);
    back();
  };

  return (
    <>
      <Head>
        <title>{`Synap | ${formattedType} User`}</title>
      </Head>
      <div className="mx-4 mt-28 rounded-lg border-2 bg-slate-100 p-4 md:mx-48 md:mt-24">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 rounded-lg border-2 border-slate-400 bg-blue-800 px-6 py-3 text-white hover:bg-blue-900"
        >
          <FaArrowLeft className="fill-white" />
          Back
        </button>

        <form onSubmit={handleSubmit}>
          <div>
            <h3 className="my-4 text-2xl font-bold">
              {formattedType} User Form
            </h3>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <label className="w-24">Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border-2 px-6 py-3"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="w-24">Email address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border-2 px-6 py-3"
                />
              </div>

              <div className="flex items-center gap-4">
                <label htmlFor="gender" className="w-24">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={data.gender}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border-2 px-6 py-3 focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label htmlFor="status" className="w-24">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border-2 px-6 py-3 focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-12 flex items-center gap-2 rounded-lg border-2 border-slate-400 bg-green-700 px-6 py-3 text-white hover:bg-green-900"
              >
                <FaSave className="fill-white" />
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormUserComponent;
