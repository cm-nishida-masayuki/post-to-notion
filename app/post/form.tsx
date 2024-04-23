"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type FormProps = {
  create: (formData: FormData) => Promise<void>;
};

export default function Form(props: FormProps) {
  const { create } = props;
  const [title, setTitle] = useState("");

  return (
    <form
      action={async (formData) => {
        await create(formData);
        setTitle("");
      }}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col w-full">
        <input
          type="text"
          id="notion"
          name="title"
          className="border rounded-lg p-2 w-full text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <button
          type="submit"
          className="rounded bg-slate-600 text-white py-2 px-4"
        >
          Save
        </button>
      </div>
    </form>
  );
}
