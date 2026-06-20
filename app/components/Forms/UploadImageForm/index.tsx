import { useState } from 'react';
import { useFetcher } from 'react-router';

export const UPLOAD_IMAGE_FORM_ID = 'upload-image-form';

const UploadImageForm = () => {
  const formId = UPLOAD_IMAGE_FORM_ID;
  const fetcher = useFetcher({ key: formId });
  const busy = fetcher.state !== 'idle';
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      throw new Error('Please select a file to upload.');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/admin/image/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });

    if (!response.ok) {
      throw new Error('Failed to get pre-signed URL.');
    }

    const { url, fields } = (await response.json()) as { url: string; fields: Record<string, string> };

    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('file', file);

    const uploadResponse = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      console.error('S3 Upload Error:', uploadResponse);
      throw new Error('Upload failed.');
    }
  };

  return (
    <fetcher.Form id={formId} method="post" action="/admin/image/upload" onSubmit={onSubmit}>
      <fieldset disabled={busy}>
        <label className="mb-24">
          <p className="w-full mb-2">File</p>
          <input
            className="h-12 w-full border-2 rounded-sm p-2 mb-4"
            name="file"
            placeholder="File"
            type="file"
            onChange={(e) => {
              const files = e.target.files;
              setFile(files?.[0] ?? null);
            }}
            required
          />
        </label>
        <label className="mb-24">
          <p className="w-full mb-2">Title</p>
          <input
            className="h-12 w-full border-2 rounded-sm p-2 mb-4"
            name="title"
            placeholder="Title"
            type="text"
            autoComplete="none"
            required
          />
        </label>
        <label>
          <p className="w-full mb-2">Caption</p>
          <input
            className="h-12 w-full border-2 rounded-sm p-2 mb-4"
            name="caption"
            placeholder="Caption"
            type="text"
            autoComplete="none"
            required
          />
        </label>
      </fieldset>
    </fetcher.Form>
  );
};

export default UploadImageForm;
