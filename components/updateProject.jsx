"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UpdateProject({ projectID }) {
  const [received, setReceived] = useState("");
  const [client, setClient] = useState("");
  const [clients, setClients] = useState([]);
  const [title, setTitle] = useState("");
  const [confirmit, setConfirmit] = useState("");
  const [programmer1, setProgrammer1] = useState("");
  const [programmer2, setProgrammer2] = useState("");
  const [tester, setTester] = useState("");
  const [scriptqc, setScriptqc] = useState("");
  const [status, setStatus] = useState("");
  const [manager, setManger] = useState("");
  const [launch, setLaunch] = useState("");
  const [size, setSize] = useState(0);
  const [delivery, setDelivery] = useState("");
  const [methodology, setMethodology] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  function formated(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("../../api/client");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setClients(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch("../../api/project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ confirmit: projectID }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setReceived(formated(data.received));
        setTitle(data.title);
        setConfirmit(data.confirmit);
        setClient(data.client);
        setProgrammer1(data.programmer1);
        setProgrammer2(data.programmer2);
        setLaunch(formated(data.launch));
        setDelivery(formated(data.delivery));
        setScriptqc(data.scriptqc);
        setTester(data.tester);
        setSize(data.size);
        setManger(data.manager);
        setMethodology(data.methodology);
        setStatus(data.status);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProject();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!confirmit) {
      console.log("all fields are required");
      return;
    }

    try {
      if (confirm("Do you want to delete: " + title)) {
        const res = await fetch("../../api/deleteProject", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            confirmit,
          }),
        });

        if (res.ok) {
          setError("");
          router.push("/");
        } else {
          console.log("Deleting project failed.");
        }
      }
    } catch (error) {
      console.log("Error during deleting: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!received || !client || !title || !confirmit) {
      console.log("all fields are required");
      return;
    }

    try {
      const res = await fetch("../../api/updateProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          received,
          client,
          title,
          programmer1,
          programmer2,
          tester,
          scriptqc,
          manager,
          launch,
          delivery,
          size,
          confirmit,
          methodology,
          status,
        }),
      });

      if (res.ok) {
        setError("");
        router.push("dashboard");
      } else {
        console.log("updating project failed.");
      }
    } catch (error) {
      console.log("Error during updating: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <div className="flex  gap-3 mx-auto mt-5 justify-center">
          <div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Recieved date</label>
              <input
                onChange={(e) => setReceived(formated(e.target.value))}
                type="date"
                value={received}
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Client</label>
              <select
                onChange={(e) => setClient(e.target.value)}
                value={client}
              >
                <option>Please select client</option>
                {clients.map((c) => {
                  return (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Project title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                value={title}
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Methodolofy</label>
              <select
                onChange={(e) => setMethodology(e.target.value)}
                value={methodology}
              >
                <option>Please select one</option>
                <option value="Online">Online</option>
                <option value="CATI">CATI</option>
                <option value="Online & CATI">Online & CATI</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>ConfirmIT ID</label>
              <input
                onChange={(e) => setConfirmit(e.target.value)}
                type="text"
                value={confirmit}
                disabled
              />
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <label>Primary programmer</label>
              <select
                onChange={(e) => setProgrammer1(e.target.value)}
                value={programmer1}
              >
                <option>Please select one</option>
                <option value="Kaleem">Kaleem</option>
                <option value="Karishma">Karishma</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <label>Secondary programmer</label>
              <input
                onChange={(e) => setProgrammer2(e.target.value)}
                type="text"
                value={programmer2}
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Delivery date</label>
              <input
                onChange={(e) => setDelivery(formated(e.target.value))}
                type="date"
                value={delivery}
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Tested by</label>
              <input
                onChange={(e) => setTester(e.target.value)}
                type="text"
                value={tester}
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Script QC</label>
              <input
                onChange={(e) => setScriptqc(e.target.value)}
                type="text"
                value={scriptqc}
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Launch date</label>
              <input
                onChange={(e) => setLaunch(formated(e.target.value))}
                type="date"
                value={launch}
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Manager</label>
              <input
                onChange={(e) => setManger(e.target.value)}
                type="text"
                value={manager}
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Sample size</label>
              <input
                onChange={(e) => setSize(e.target.value)}
                type="numeric"
                value={size}
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Status</label>
              <select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option>Please select one</option>
                <option value="Programming">Programming</option>
                <option value="Changes">Changes</option>
                <option value="Live">Live</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <div className="flex flex-col gap-1 mb-2">
            <label>&nbsp;</label>
            <button
              onClick={handleDelete}
              type="button"
              className="w-[400px] p-2 rounded-sm bg-slate-800 text-red-600  border border-red-600"
            >
              Delete Project
            </button>
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <label>&nbsp;</label>
            <button
              type="submit"
              className="p-2 rounded-sm bg-slate-800 text-white w-full border border-slate-600"
            >
              Update Project
            </button>
          </div>
        </div>
      </form>
      {error}
    </div>
  );
}
