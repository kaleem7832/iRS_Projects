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
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);
  const [msg, setMsg] = useState("");

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
        setClients(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    setLoading(true);
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
        if (data) {
          setLoading(false);
        }
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
    document.getElementById("my_modal_1").open = false;
    try {
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
        setOk(true);
        setMsg("Project deleted!");
        setTimeout(() => {
          setOk(false);
          setMsg("");
          router.push("/");
        }, 3000);
      } else {
        console.log("Deleting project failed.");
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
        setOk(true);
        setMsg("Project updated!");
        setTimeout(() => {
          setOk(false);
          setMsg("");
        }, 3000);
      } else {
        console.log("updating project failed.");
      }
    } catch (error) {
      console.log("Error during updating: ", error);
    }
  };

  if (loading)
    return (
      <div className="text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  return (
    <div>
      <div className="toast">
        <div
          role="alert"
          className={ok ? "alert bg-neutral text-white mx-auto" : "hidden"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{msg}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="">
        <div className="flex  gap-3 mx-auto mt-5 justify-center">
          <div className="w-80">
            <div className="flex flex-col gap-1 mb-2">
              <label>Recieved date</label>
              <input
                onChange={(e) => setReceived(formated(e.target.value))}
                type="date"
                value={received}
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Client</label>
              <select
                onChange={(e) => setClient(e.target.value)}
                value={client}
                className="select select-sm select-bordered w-full max-w-xs"
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
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Methodolofy</label>
              <select
                onChange={(e) => setMethodology(e.target.value)}
                value={methodology}
                className="select select-sm select-bordered w-full max-w-xs"
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
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <label>Primary programmer</label>
              <select
                onChange={(e) => setProgrammer1(e.target.value)}
                value={programmer1}
                className="select select-sm select-bordered w-full max-w-xs"
              >
                <option>Please select one</option>
                <option value="Kaleem">Kaleem</option>
                <option value="Karishma">Karishma</option>
                <option value="Ketan">Ketan</option>
                <option value="Janhavi">Janhavi</option>
                <option value="Bhakti">Bhakti</option>
                <option value="Priti">Priti</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <label>Secondary programmer</label>
              <select
                onChange={(e) => setProgrammer2(e.target.value)}
                value={programmer2}
                className="select select-sm select-bordered w-full max-w-xs"
              >
                <option>Please select one</option>
                <option value="Kaleem">Kaleem</option>
                <option value="Karishma">Karishma</option>
                <option value="Ketan">Ketan</option>
                <option value="Janhavi">Janhavi</option>
                <option value="Bhakti">Bhakti</option>
                <option value="Priti">Priti</option>
              </select>
            </div>
          </div>
          <div className="w-80">
            <div className="flex flex-col gap-1 mb-2">
              <label>Delivery date</label>
              <input
                onChange={(e) => setDelivery(formated(e.target.value))}
                type="date"
                value={delivery}
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Tested by</label>
              <select
                onChange={(e) => setTester(e.target.value)}
                value={tester}
                className="select select-sm select-bordered w-full max-w-xs"
              >
                <option>Please select one</option>
                <option value="Samiksha">Samiksha</option>
                <option value="Adil">Adil</option>
                <option value="Kaleem">Kaleem</option>
                <option value="Karishma">Karishma</option>
                <option value="Ketan">Ketan</option>
                <option value="Janhavi">Janhavi</option>
                <option value="Bhakti">Bhakti</option>
                <option value="Priti">Priti</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Script QC</label>
              <select
                onChange={(e) => setScriptqc(e.target.value)}
                value={scriptqc}
                className="select select-sm select-bordered w-full max-w-xs"
              >
                <option>Please select one</option>
                <option value="Kaleem">Kaleem</option>
                <option value="Karishma">Karishma</option>
                <option value="Ketan">Ketan</option>
                <option value="Janhavi">Janhavi</option>
                <option value="Bhakti">Bhakti</option>
                <option value="Priti">Priti</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Launch date</label>
              <input
                onChange={(e) => setLaunch(formated(e.target.value))}
                type="date"
                value={launch}
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Manager</label>
              <input
                onChange={(e) => setManger(e.target.value)}
                type="text"
                value={manager}
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Sample size</label>
              <input
                onChange={(e) => setSize(e.target.value)}
                type="numeric"
                value={size}
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Status</label>
              <select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="select select-sm select-bordered w-full max-w-xs"
              >
                <option>Please select one</option>
                <option value="Programming">Programming</option>
                <option value="Delivered">Delivered</option>
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
              // onClick={handleDelete}
              onClick={() => document.getElementById("my_modal_1").showModal()}
              type="button"
              className="btn btn-neutral btn-sm w-80"
            >
              Delete Project
            </button>
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <label>&nbsp;</label>
            <button type="submit" className="btn btn-neutral btn-sm w-80">
              Update Project
            </button>
          </div>
        </div>
      </form>
      {error}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-md">Delete</h3>
          <p className="py-4">Do you want to delete {title}?</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-neutral mr-1">Cancel</button>
              <button className="btn btn-sm btn-neutral" onClick={handleDelete}>
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
