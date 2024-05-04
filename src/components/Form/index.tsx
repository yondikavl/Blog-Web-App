import React, { useState } from "react";
import { INIT_USER_DATA } from "./const";
import { createUser, updateUser } from "@/pages/api";
import { useRouter } from "next/router";
import { FormUserProps, NewUserType, UserType } from "./interface";
import { useEntityDetailHook } from "@/components/utils";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import Head from "next/head";

const FormUserComponent: React.FC<FormUserProps> = ({ type, oldData }) => {
  const [data, setData] = useState<NewUserType | UserType>(
    oldData ? oldData : INIT_USER_DATA
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
      <div className="mx-4 md:mx-48 mt-28 md:mt-24 bg-slate-100 border-2 p-4 rounded-lg">
        <button
          onClick={handleBack}
          className="bg-blue-800 text-white px-6 py-3 rounded-lg border-2 border-slate-400 hover:bg-blue-900 flex items-center gap-2"
        >
          <FaArrowLeft className="fill-white" />
          Back
        </button>

        <form onSubmit={handleSubmit}>
          <div>
            <h3 className="text-2xl font-bold my-4">
              {formattedType} User Form
            </h3>

            <div className="flex flex-col gap-2">
              <div className="flex gap-4 items-center">
                <label className="w-24">Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="border-2 px-6 py-3 rounded-lg w-full"
                />
              </div>

              <div className="flex gap-4 items-center">
                <label className="w-24">Email address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="border-2 px-6 py-3 rounded-lg w-full"
                />
              </div>

              <div className="flex gap-4 items-center">
                <label htmlFor="gender" className="w-24">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={data.gender}
                  onChange={handleChange}
                  required
                  className="border-2 px-6 py-3 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>

              <div className="flex gap-4 items-center">
                <label htmlFor="status" className="w-24">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                  required
                  className="border-2 px-6 py-3 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500"
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
                className="bg-green-700 text-white px-6 py-3 rounded-lg border-2 border-slate-400 hover:bg-green-900 flex items-center gap-2 mt-12"
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
