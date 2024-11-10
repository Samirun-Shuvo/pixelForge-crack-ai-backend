const getImgData = async (prompt) => {
  const form = new FormData();
  form.append("prompt", prompt);
  const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
    method: "POST",
    headers: {
      "x-api-key": process.env.CLIPDROP_API_KEY,
    },
    body: form,
  });

  const buffer = await response.arrayBuffer();
  return buffer;
};
module.exports = getImgData;
