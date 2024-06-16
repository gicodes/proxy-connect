import { alertService } from "@/components/alert/services";
import Spinner from "@/components/templates/spinner";
import { useState } from "react";

export default function ImageForm() {
  const [file, setFile] = useState<File | null>(null);
  const [options, setOptions] = useState({
    autoClose: false,
    keepAfterRouteChange: false,
  });

  async function handleSubmit() {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          filename: file.name,
        },
      });

      if (response.ok) {
        console.log("Picture uploaded successfully");
      } else {
        console.error("Failed to upload picture");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    <Spinner />;
    alertService.success(
      "Your profile photo is updated",
      setOptions({ autoClose: true, keepAfterRouteChange: false })
    );
  }

  function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  return (
    <>
      <form method="post">
        <div>
          <label
            htmlFor="image"
            className="mt-5 mb-2 block text-sm font-medium leading-6 text-white-900"
          >
            Upload your Image{" "}
          </label>
          <input
            id="image"
            className="block w-full focus:ring-2 focus:ring-inset"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageFile}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Save
        </button>
      </form>
    </>
  );
}
