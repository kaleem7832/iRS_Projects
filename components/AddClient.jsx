"use client";

import { useState } from "react";

export default function AddClient() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      console.log("all fields are required");
      return;
    }

    try {
      const resUserExists = await fetch("../api/clientExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("Client already exists.");
        return;
      }

      const res = await fetch("../api/addClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        setError("");
      } else {
        console.log("Adding client failed.");
      }
    } catch (error) {
      console.log("Error during adding client: ", error);
    }
  };

  return (
    <div className=" flex justify-center items-center">
      <form onSubmit={handleSubmit} className="">
        <div className="flex  gap-3 mx-auto mt-5 justify-center">
          <div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Client name</label>
              <input onChange={(e) => setName(e.target.value)} type="text" />
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <label>&nbsp;</label>
              <button
                type="submit"
                className="p-2 rounded-sm bg-slate-800 text-white w-full border border-slate-600"
              >
                Add Client
              </button>
            </div>
            <div>{error}</div>
          </div>
        </div>
      </form>
    </div>
  );
}
