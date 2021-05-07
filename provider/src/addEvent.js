import React from "react";
import {create} from "analytics-sdk";
let URL = "http://analytics:3000/api/events";

export default function AddEvent() {
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const max = 10000;
    const event = {
      date: new Date().toISOString(),
      origin: "provider",
      entityId: Math.floor(Math.random() * Math.floor(max)),
      device: "CHROME",
      data: {
        category: "category",
        action: "action",
        label: "label",
        value: "value",
      },
    };
    await create("", event);
    // await fetch(URL, {
    //   method: "POST",
    //   body: JSON.stringify(event),
    //   headers: {"Content-Type": "application/json"},
    // });
  };

  return (
    <div>
      <form>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
